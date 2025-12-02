import type { APIRoute } from 'astro';

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Only accept POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body: EmailRequest = await request.json();

    // Validate required fields
    if (!body.to || !body.subject || !body.html) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, html' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.to)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Integrate with your email service provider
    // Options:
    // 1. SendGrid
    // 2. Mailgun
    // 3. AWS SES
    // 4. Nodemailer
    // 5. Wix Email API (if available)

    // For now, we'll log the email details and return success
    console.log('Email notification:', {
      to: body.to,
      subject: body.subject,
      replyTo: body.replyTo,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending
    // In production, replace this with actual email service integration
    const emailSent = await simulateSendEmail(body);

    if (emailSent) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Email sent successfully',
          recipient: body.to 
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

// Simulate email sending - replace with actual email service
async function simulateSendEmail(emailData: EmailRequest): Promise<boolean> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      console.log(`✓ Email sent to ${emailData.to}`);
      console.log(`  Subject: ${emailData.subject}`);
      resolve(true);
    }, 500);
  });
}
