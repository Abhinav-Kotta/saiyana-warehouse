// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Add OPTIONS method handler
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

interface ContactFormData {
  name: string;
  email: string;
  companyName: string;
  serviceType: string;
  shipmentVolume?: string;
  startDate?: string;
  requirements: string;
}

// Initialize Resend with error handling
const initResend = () => {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY environment variable');
  }
  return new Resend(process.env.RESEND_API_KEY);
};

const generateAdminEmailHtml = (data: ContactFormData) => `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #0ea5e9;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background-color: #f8fafc;
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 0 0 5px 5px;
        }
        .field {
          margin-bottom: 15px;
        }
        .label {
          font-weight: bold;
          color: #0369a1;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Quote Request</h1>
        </div>
        <div class="content">
          <div class="field">
            <p class="label">Company Name:</p>
            <p>${data.companyName}</p>
          </div>
          <div class="field">
            <p class="label">Contact Person:</p>
            <p>${data.name}</p>
          </div>
          <div class="field">
            <p class="label">Email:</p>
            <p>${data.email}</p>
          </div>
          <div class="field">
            <p class="label">Service Type:</p>
            <p>${data.serviceType}</p>
          </div>
          ${data.startDate ? `
            <div class="field">
              <p class="label">Desired Start Date:</p>
              <p>${new Date(data.startDate).toLocaleDateString()}</p>
            </div>
          ` : ''}
          <div class="field">
            <p class="label">Requirements:</p>
            <p>${data.requirements}</p>
          </div>
        </div>
      </div>
    </body>
  </html>
`;

const generateCustomerEmailHtml = (data: ContactFormData) => `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #0ea5e9;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background-color: #f8fafc;
          padding: 20px;
          border: 1px solid #e2e8f0;
          border-radius: 0 0 5px 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Interest</h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>Thank you for requesting a quote from Saiyana Logistics. We've received your inquiry and our team will review your requirements promptly.</p>
          <p>Here's what happens next:</p>
          <ol>
            <li>Our team will review your requirements within 24 hours</li>
            <li>We'll prepare a customized quote based on your needs</li>
            <li>A dedicated representative will contact you to discuss the details</li>
          </ol>
          <p>If you have any immediate questions, please don't hesitate to reach out to us.</p>
          <p>Best regards,<br>The Saiyana Logistics Team</p>
        </div>
      </div>
    </body>
  </html>
`;

export async function POST(req: Request) {
  // Add CORS headers to all responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  console.log('Received contact form submission');
  
  try {
    // Initialize Resend
    const resend = initResend();
    
    // Parse request body
    const body: ContactFormData = await req.json();
    console.log('Form data received:', {
      name: body.name,
      email: body.email,
      serviceType: body.serviceType
    });

    // Validate required fields
    if (!body.email || !body.name || !body.companyName || !body.serviceType || !body.requirements) {
      console.log('Missing required fields');
      return NextResponse.json(
        { 
          success: false, 
          error: 'All fields are required' 
        },
        { status: 400, headers }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      console.log('Invalid email format');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400, headers }
      );
    }

    // Send email to admin
    console.log('Sending admin notification email');
    const { error: adminEmailError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL || 'test@resend.dev',
      replyTo: body.email,
      subject: `New Quote Request from ${body.companyName}`,
      html: generateAdminEmailHtml(body),
    });

    if (adminEmailError) {
      console.error('Error sending admin email:', adminEmailError);
      return NextResponse.json(
        { success: false, error: 'Failed to send notification email' },
        { status: 500, headers }
      );
    }

    // Send confirmation email to customer
    console.log('Sending customer confirmation email');
    const { error: customerEmailError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: [body.email],
      subject: 'Your Quote Request - Saiyana Logistics',
      html: generateCustomerEmailHtml(body),
    });

    if (customerEmailError) {
      console.error('Error sending customer email:', customerEmailError);
      return NextResponse.json({ 
        success: true,
        warning: 'Quote received, but confirmation email could not be sent'
      },
      { headers });
    }

    console.log('Both emails sent successfully');
    return NextResponse.json({ 
      success: true,
      message: 'Quote request received and confirmation emails sent'
    },
    { headers });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers }
    );
  }
}