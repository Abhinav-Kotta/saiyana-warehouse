// src/app/api/contact_page_route/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  companyName: string;
  serviceType: string;
  startDate?: string;
  requirements: string;
}

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

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('Missing Resend API key');
    }

    const data: ContactFormData = await request.json();

    // Validate the data
    if (!data.name || !data.email || !data.requirements || !data.companyName || !data.serviceType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email to admin
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.ADMIN_EMAIL!,
      subject: 'New Quote Request - Saiyana Logistics',
      html: generateAdminEmailHtml(data),
    });

    // Send confirmation email to customer
    await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: data.email,
      subject: `Thank you for contacting Saiyana Logistics`,
      html: generateCustomerEmailHtml(data),
    });

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: error?.message || 'Error sending email' },
      { status: 500 }
    );
  }
}