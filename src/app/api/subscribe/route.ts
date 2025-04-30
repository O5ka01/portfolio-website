import { NextRequest, NextResponse } from 'next/server';
import { serverConfig } from '@/utils/config';
import { createApiError, handleApiError } from '@/utils/errorHandler';

// Rate limiting configuration (reuse contact rate limit config for now)
const { windowMs, maxRequests } = serverConfig.rateLimits.contact;

// Simple in-memory storage for email addresses (in production, use a database)
const subscribers: Set<string> = new Set();

// Simple in-memory rate limiting (in production, use Redis or similar)
const ipRequestCount: Record<string, { count: number; resetTime: number }> = {};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
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
      throw createApiError('Rate limit exceeded. Please try again later.', 429, 'warning', { ip });
    }

    // Parse request body
    const { email, language = 'de' } = await request.json();
    
    // Validate required fields
    if (!email) {
      throw createApiError('Email is required.', 400, 'info');
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
      throw createApiError('Please provide a valid email address.', 400, 'info');
    }
    
    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase().substring(0, 100);
    
    // Check if email is already subscribed
    if (subscribers.has(sanitizedEmail)) {
      return NextResponse.json(
        { 
          success: true, 
          message: language === 'de' 
            ? 'Diese E-Mail-Adresse ist bereits angemeldet.' 
            : 'This email is already subscribed.'
        },
        { status: 200 }
      );
    }
    
    // Add email to subscribers list
    subscribers.add(sanitizedEmail);
    
    // Here you would normally add the email to your newsletter service
    // For example, using a service like Mailchimp, SendGrid, etc.
    // This is just a placeholder implementation
    
    console.log(`New newsletter subscription: ${sanitizedEmail}`);
    
    // Return success response based on language
    return NextResponse.json(
      { 
        success: true, 
        message: language === 'de' 
          ? 'Vielen Dank für deine Anmeldung! Du erhältst eine Bestätigungs-E-Mail.' 
          : 'Thank you for subscribing! You will receive a confirmation email.'
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store'
        } 
      }
    );
  } catch (error) {
    // Use our centralized error handler
    return handleApiError(error, { path: '/api/subscribe', method: 'POST' });
  }
}

// Get the list of subscribers (protected route for admin use)
export async function GET(request: NextRequest) {
  try {
    // In a real implementation, you would check authentication here
    // For example, check for an API key or admin session
    const apiKey = request.headers.get('x-api-key');
    
    // This is just a placeholder validation - NEVER use hardcoded keys in production
    if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) {
      throw createApiError('Unauthorized', 401, 'warning');
    }
    
    // Return the list of subscribers
    return NextResponse.json(
      { 
        success: true, 
        count: subscribers.size,
        subscribers: Array.from(subscribers)
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiError(error, { path: '/api/subscribe', method: 'GET' });
  }
}
