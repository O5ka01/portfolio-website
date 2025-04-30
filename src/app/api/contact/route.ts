import { NextRequest, NextResponse } from 'next/server';
import { serverConfig } from '@/utils/config';
import { createApiError, handleApiError } from '@/utils/errorHandler';

// Rate limiting configuration
const { windowMs, maxRequests } = serverConfig.rateLimits.contact;

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
    const { name, email, message } = await request.json();
    
    // Validate required fields
    if (!name || !email || !message) {
      throw createApiError('Name, email, and message are required.', 400, 'info');
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
      throw createApiError('Please provide a valid email address.', 400, 'info');
    }
    
    // Sanitize inputs - basic sanitization for demonstration
    const sanitizedName = name.trim().substring(0, 100); // Limit length
    const sanitizedEmail = email.trim().toLowerCase().substring(0, 100);
    const sanitizedMessage = message.trim().substring(0, 3000); // Limit message length
    
    // Here you would normally send the email using a service like SendGrid, Mailgun, etc.
    // For now, we'll just simulate a successful response
    
    // Example: Send email with SendGrid (commented out until API keys are configured)
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: 'your-email@example.com', // Change to your email
      from: 'no-reply@your-domain.com', // Change to your verified sender
      subject: `New contact form submission from ${sanitizedName}`,
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\nMessage: ${sanitizedMessage}`,
      html: `<strong>Name:</strong> ${sanitizedName}<br>
            <strong>Email:</strong> ${sanitizedEmail}<br><br>
            <strong>Message:</strong><br>${sanitizedMessage.replace(/\n/g, '<br>')}`,
    };
    
    await sgMail.send(msg);
    */
    
    // For now, log the message to the console (in production, this would be sent via email)
    console.log('Contact form submission:', { name: sanitizedName, email: sanitizedEmail, messageLength: sanitizedMessage.length });
    
    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been received. We will get back to you soon.' 
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store', // Prevent caching of form submissions
        } 
      }
    );
  } catch (error) {
    // Use our centralized error handler
    return handleApiError(error, { path: '/api/contact', method: 'POST' });
  }
}
