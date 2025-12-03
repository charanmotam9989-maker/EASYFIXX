import type { APIRoute } from 'astro';

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

interface SendGridEmailRequest {
  personalizations: Array<{
    to: Array<{ email: string }>;
    subject: string;
  }>;
  from: {
    email: string;
    name: string;
  };
  content: Array<{
    type: string;
    value: string;
  }>;
  replyTo?: {
    email: string;
  };
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

    // Send email via SendGrid
    const emailSent = await sendViaSendGrid(body);

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

// Send email via SendGrid
async function sendViaSendGrid(emailData: EmailRequest): Promise<boolean> {
  const sendGridApiKey = import.meta.env.SENDGRID_API_KEY;
  
  // Fallback to environment variable if not set
  if (!sendGridApiKey) {
    console.warn('SendGrid API key not configured. Falling back to console logging.');
    console.log('Email notification:', {
      to: emailData.to,
      subject: emailData.subject,
      timestamp: new Date().toISOString(),
    });
    return true;
  }

  const sendGridRequest: SendGridEmailRequest = {
    personalizations: [
      {
        to: [{ email: emailData.to }],
        subject: emailData.subject,
      },
    ],
    from: {
      email: 'noreply@easyfix.com',
      name: 'EASYFIX',
    },
    content: [
      {
        type: 'text/html',
        value: emailData.html,
      },
    ],
  };

  if (emailData.replyTo) {
    sendGridRequest.replyTo = {
      email: emailData.replyTo,
    };
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendGridApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendGridRequest),
    });

    if (response.ok) {
      console.log(`✓ Email sent to ${emailData.to}`);
      console.log(`  Subject: ${emailData.subject}`);
      return true;
    } else {
      const errorData = await response.text();
      console.error('SendGrid error:', response.status, errorData);
      return false;
    }
  } catch (error) {
    console.error('Error sending email via SendGrid:', error);
    return false;
  }
}
