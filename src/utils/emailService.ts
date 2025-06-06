/**
 * Email service utility with multiple provider support
 * Supports SendGrid, Resend, and Mailgun
 */

interface EmailData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Email templates
const getContactEmailTemplate = (data: EmailData) => ({
  subject: `New Contact Form Submission from ${data.name}`,
  html: `
    <div style="font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">From your portfolio website</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Contact Details</h3>
        <p style="margin: 8px 0; color: #555;"><strong>Name:</strong> ${data.name}</p>
        <p style="margin: 8px 0; color: #555;"><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #667eea; text-decoration: none;">${data.email}</a></p>
      </div>
      
      <div style="background: white; padding: 25px; border: 1px solid #e9ecef; border-radius: 8px;">
        <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Message</h3>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea;">
          <p style="margin: 0; color: #555; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
        <p style="margin: 0; color: #888; font-size: 14px;">
          Sent from <a href="https://oleoskarheinrichs.com" style="color: #667eea; text-decoration: none;">oleoskarheinrichs.com</a>
        </p>
      </div>
    </div>
  `,
  text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
Sent from oleoskarheinrichs.com
  `.trim()
});

const getAutoReplyTemplate = (name: string) => ({
  subject: 'Thank you for your message - Ole Oskar Heinrichs',
  html: `
    <div style="font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; text-align: center; margin-bottom: 30px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Thank You!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Your message has been received</p>
      </div>
      
      <div style="padding: 20px 0;">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">Hi ${name},</p>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
          Thank you for reaching out! I've received your message and will get back to you as soon as possible, 
          typically within 24-48 hours.
        </p>
        
        <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
          In the meantime, feel free to check out my latest music releases and connect with me on social media:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY" style="display: inline-block; margin: 0 10px; padding: 12px 24px; background: #1DB954; color: white; text-decoration: none; border-radius: 25px; font-weight: 500;">🎵 Spotify</a>
          <a href="https://www.instagram.com/oska.hayati/" style="display: inline-block; margin: 0 10px; padding: 12px 24px; background: #E4405F; color: white; text-decoration: none; border-radius: 25px; font-weight: 500;">📸 Instagram</a>
        </div>
        
        <p style="color: #555; line-height: 1.6;">
          Best regards,<br>
          <strong>Ole Oskar Heinrichs (O$ka)</strong><br>
          <span style="color: #888; font-size: 14px;">Musician, Producer & Marketing Professional</span>
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
        <p style="margin: 0; color: #888; font-size: 14px;">
          <a href="https://oleoskarheinrichs.com" style="color: #667eea; text-decoration: none;">oleoskarheinrichs.com</a>
        </p>
      </div>
    </div>
  `,
  text: `
Hi ${name},

Thank you for reaching out! I've received your message and will get back to you as soon as possible, typically within 24-48 hours.

In the meantime, feel free to check out my latest music releases:
- Spotify: https://open.spotify.com/intl-de/artist/4BTWTI3mEAVmYQbe94r0MY
- Instagram: https://www.instagram.com/oska.hayati/

Best regards,
Ole Oskar Heinrichs (O$ka)
Musician, Producer & Marketing Professional

---
oleoskarheinrichs.com
  `.trim()
});

// SendGrid implementation
async function sendWithSendGrid(data: EmailData): Promise<EmailResponse> {
  try {
    const { default: sgMail } = await import('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

    const contactTemplate = getContactEmailTemplate(data);
    const autoReplyTemplate = getAutoReplyTemplate(data.name);

    // Send notification email to you
    const notificationMsg = {
      to: process.env.SENDGRID_TO_EMAIL || 'info@about-us-records.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@oleoskarheinrichs.com',
      subject: contactTemplate.subject,
      text: contactTemplate.text,
      html: contactTemplate.html,
    };

    // Send auto-reply to user
    const autoReplyMsg = {
      to: data.email,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@oleoskarheinrichs.com',
      subject: autoReplyTemplate.subject,
      text: autoReplyTemplate.text,
      html: autoReplyTemplate.html,
    };

    const [notificationResult] = await Promise.all([
      sgMail.send(notificationMsg),
      sgMail.send(autoReplyMsg)
    ]);

    return {
      success: true,
      messageId: notificationResult[0]?.headers?.['x-message-id'] || 'sent'
    };
  } catch (error) {
    console.error('SendGrid error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}

// Resend implementation (recommended alternative)
async function sendWithResend(data: EmailData): Promise<EmailResponse> {
  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const contactTemplate = getContactEmailTemplate(data);
    const autoReplyTemplate = getAutoReplyTemplate(data.name);

    // Send notification email
    const notificationResult = await resend.emails.send({
      from: 'Ole Oskar Heinrichs <noreply@oleoskarheinrichs.com>',
      to: [process.env.SENDGRID_TO_EMAIL || 'info@about-us-records.com'],
      subject: contactTemplate.subject,
      html: contactTemplate.html,
      text: contactTemplate.text,
    });

    // Send auto-reply
    await resend.emails.send({
      from: 'Ole Oskar Heinrichs <noreply@oleoskarheinrichs.com>',
      to: [data.email],
      subject: autoReplyTemplate.subject,
      html: autoReplyTemplate.html,
      text: autoReplyTemplate.text,
    });

    return {
      success: true,
      messageId: notificationResult.data?.id || 'sent'
    };
  } catch (error) {
    console.error('Resend error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}

// Main email sending function
export async function sendContactEmail(data: EmailData): Promise<EmailResponse> {
  // Try Resend first (recommended), then fallback to SendGrid
  if (process.env.RESEND_API_KEY) {
    return await sendWithResend(data);
  } else if (process.env.SENDGRID_API_KEY) {
    return await sendWithSendGrid(data);
  } else {
    console.warn('No email service configured. Add RESEND_API_KEY or SENDGRID_API_KEY to environment variables.');
    return {
      success: false,
      error: 'Email service not configured'
    };
  }
}

// Validate email service configuration
export function validateEmailConfig(): { isConfigured: boolean; service: string; error?: string } {
  if (process.env.RESEND_API_KEY) {
    return { isConfigured: true, service: 'Resend' };
  } else if (process.env.SENDGRID_API_KEY) {
    if (!process.env.SENDGRID_FROM_EMAIL || !process.env.SENDGRID_TO_EMAIL) {
      return {
        isConfigured: false,
        service: 'SendGrid',
        error: 'SENDGRID_FROM_EMAIL and SENDGRID_TO_EMAIL are required'
      };
    }
    return { isConfigured: true, service: 'SendGrid' };
  }
  
  return {
    isConfigured: false,
    service: 'None',
    error: 'No email service API key found. Add RESEND_API_KEY or SENDGRID_API_KEY to environment variables.'
  };
}
