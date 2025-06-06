import { NextRequest, NextResponse } from 'next/server';
import { serverConfig } from '@/utils/config';
import { createApiError, handleApiError } from '@/utils/errorHandler';
import { sendContactEmail, validateEmailConfig } from '@/utils/emailService';
import { z } from 'zod';

// Rate limiting configuration
const { windowMs, maxRequests } = serverConfig.rateLimits.contact;

// Simple in-memory rate limiting (in production, use Redis or similar)
const ipRequestCount: Record<string, { count: number; resetTime: number }> = {};

// Enhanced validation schema using Zod
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Name contains invalid characters'),
  email: z.string()
    .email('Please provide a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(3000, 'Message must be less than 3000 characters'),
  subject: z.string().optional(),
  honeypot: z.string().optional(), // Bot detection
});

// Spam detection keywords
const spamKeywords = [
  'viagra', 'casino', 'lottery', 'winner', 'congratulations',
  'click here', 'free money', 'urgent', 'act now', 'limited time'
];

function detectSpam(text: string): boolean {
  const lowerText = text.toLowerCase();
  return spamKeywords.some(keyword => lowerText.includes(keyword));
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Check rate limit
    const now = Date.now();
    if (!ipRequestCount[ip]) {
      ipRequestCount[ip] = { count: 0, resetTime: now + windowMs };
    } else if (ipRequestCount[ip].resetTime < now) {
      // Reset if window has passed
      ipRequestCount[ip] = { count: 0, resetTime: now + windowMs };
    }
    
    // Increment count and check limit
    ipRequestCount[ip].count++;
    if (ipRequestCount[ip].count > maxRequests) {
      throw createApiError(
        'Too many requests. Please wait a moment before trying again.',
        429,
        'warning',
        { ip, count: ipRequestCount[ip].count }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Check honeypot (bot detection)
    if (body.honeypot && body.honeypot.trim() !== '') {
      throw createApiError('Spam detected', 400, 'warning', { ip });
    }

    // Validate with Zod
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(err => err.message).join(', ');
      throw createApiError(`Validation failed: ${errors}`, 400, 'info');
    }

    const { name, email, message, subject } = validationResult.data;

    // Spam detection
    if (detectSpam(message) || detectSpam(name)) {
      throw createApiError('Message flagged as spam', 400, 'warning', { ip });
    }

    // Check email service configuration
    const emailConfig = validateEmailConfig();
    if (!emailConfig.isConfigured) {
      console.error('Email service not configured:', emailConfig.error);
      // Still return success to user, but log the issue
      console.log('Contact form submission (email not sent):', { 
        name, 
        email, 
        messageLength: message.length,
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Your message has been received. We will get back to you soon.',
          debug: process.env.NODE_ENV === 'development' ? 'Email service not configured' : undefined
        },
        { 
          status: 200,
          headers: {
            'Cache-Control': 'no-store',
          } 
        }
      );
    }

    // Send email
    const emailResult = await sendContactEmail({
      name,
      email,
      message,
      subject
    });

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      
      // Log the submission for manual follow-up
      console.log('Contact form submission (email failed):', { 
        name, 
        email, 
        messageLength: message.length,
        error: emailResult.error,
        timestamp: new Date().toISOString()
      });

      // Still return success to user to avoid confusion
      return NextResponse.json(
        { 
          success: true, 
          message: 'Your message has been received. We will get back to you soon.',
          debug: process.env.NODE_ENV === 'development' ? `Email error: ${emailResult.error}` : undefined
        },
        { 
          status: 200,
          headers: {
            'Cache-Control': 'no-store',
          } 
        }
      );
    }

    // Success - email sent
    console.log('Contact form submission successful:', { 
      name, 
      email, 
      messageId: emailResult.messageId,
      service: emailConfig.service,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! I\'ll get back to you within 24-48 hours.',
        messageId: emailResult.messageId
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        } 
      }
    );

  } catch (error) {
    // Use our centralized error handler
    return handleApiError(error, { 
      path: '/api/contact', 
      method: 'POST',
      ip: request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    });
  }
}

// Health check endpoint
export async function GET() {
  const emailConfig = validateEmailConfig();
  
  return NextResponse.json({
    status: 'operational',
    emailService: {
      configured: emailConfig.isConfigured,
      service: emailConfig.service,
      error: emailConfig.error
    },
    timestamp: new Date().toISOString()
  });
}
