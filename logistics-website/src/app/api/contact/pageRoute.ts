// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
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
          <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
          <div class="field">
            <p class="label">Name:</p>
            <p>${data.name}</p>
          </div>
          <div class="field">
            <p class="label">Email:</p>
            <p>${data.email}</p>
          </div>
          <div class="field">
            <p class="label">Message:</p>
            <p>${data.message}</p>
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
          <h1>Thank You for Contacting Us</h1>
        </div>
        <div class="content">
          <p>Dear ${data.name},</p>
          <p>Thank you for reaching out to Saiyana Logistics. We've received your message and will get back to you shortly.</p>
          <p>Our team typically responds within 24 hours during business days.</p>
          <p>Best regards,<br>The Saiyana Logistics Team</p>
        </div>
      </div>
    </body>
  </html>
`;

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body: ContactFormData = await request.json();

    if (!body.email || !body.name || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email to admin
    const { error: adminEmailError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL || 'saiyanacfa@gmail.com',
      subject: `New Contact Form Submission from ${body.name}`,
      html: generateAdminEmailHtml(body),
      replyTo: body.email,
    });

    if (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
      return NextResponse.json(
        { error: 'Failed to send admin notification' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const { error: customerEmailError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: body.email,
      subject: 'Thank You for Contacting Saiyana Logistics',
      html: generateCustomerEmailHtml(body),
    });

    if (customerEmailError) {
      console.error('Customer email error:', customerEmailError);
      // Continue even if customer email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}