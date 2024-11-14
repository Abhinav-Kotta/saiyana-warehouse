// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Type definitions
interface ContactFormData {
  name: string;
  email: string;
  companyName: string;
  serviceType: 'warehousing' | 'distribution' | 'supply-chain' | 'transportation';
  shipmentVolume?: string;
  startDate?: string;
  requirements: string;
}

interface EmailResponse {
  success: boolean;
  error?: string;
  warning?: string;
}

// Environment variable validation
if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Environment variables with fallbacks
const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME || 'Saiyana Logistics';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'abhinav.kotta@gmail.com';
const FROM_EMAIL = `${COMPANY_NAME} <${process.env.FROM_EMAIL || 'abhinav.kotta@ucf.edu'}>`;

// Email templates
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
          ${data.shipmentVolume ? `
            <div class="field">
              <p class="label">Shipment Volume:</p>
              <p>${data.shipmentVolume}</p>
            </div>
          ` : ''}
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
        .next-steps {
          background-color: #f0f9ff;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
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
          <p>Thank you for requesting a quote from ${COMPANY_NAME}. We've received your inquiry and our team will review your requirements promptly.</p>
          
          <div class="next-steps">
            <h2>Here's what happens next:</h2>
            <ol>
              <li>Our team will review your requirements within 24 hours</li>
              <li>We'll prepare a customized quote based on your needs</li>
              <li>A dedicated representative will contact you to discuss the details</li>
            </ol>
          </div>

          <p>Request Details:</p>
          <ul>
            <li>Service Type: ${data.serviceType}</li>
            ${data.startDate ? `<li>Desired Start Date: ${new Date(data.startDate).toLocaleDateString()}</li>` : ''}
          </ul>

          <p>If you have any immediate questions, please don't hesitate to reach out to us by replying to this email.</p>
          
          <p>Best regards,<br>The ${COMPANY_NAME} Team</p>
        </div>
      </div>
    </body>
  </html>
`;

export async function POST(req: Request): Promise<NextResponse<EmailResponse>> {
  try {
    // Parse and validate request body
    const body: ContactFormData = await req.json();
    const { name, email, companyName, serviceType, requirements } = body;

    // Basic validation
    if (!email || !name || !companyName || !serviceType || !requirements) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Required fields are missing' 
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }

    // Send notification email to admin
    const { error: adminEmailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      replyTo: email,
      subject: `New Quote Request from ${companyName}`,
      html: generateAdminEmailHtml(body),
    });

    if (adminEmailError) {
      console.error('Error sending admin notification:', adminEmailError);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send notification email' 
        },
        { status: 500 }
      );
    }

    // Send confirmation email to customer
    const { error: customerEmailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Quote Request Received - ${COMPANY_NAME}`,
      html: generateCustomerEmailHtml(body),
    });

    if (customerEmailError) {
      console.error('Error sending customer confirmation:', customerEmailError);
      return NextResponse.json({ 
        success: true,
        warning: 'Quote received, but confirmation email could not be sent' 
      });
    }

    // Success response
    return NextResponse.json({ 
      success: true 
    });
    
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}