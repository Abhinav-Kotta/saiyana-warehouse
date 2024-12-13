// src/app/api/contact/pageRoute/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const generateAdminEmailHtml = (data: { name: string; email: string; message: string }) => `
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
            <p class="label">Contact Person:</p>
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

const generateCustomerEmailHtml = (data: { name: string; email: string; message: string }) => `
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
          <p>Thank you for reaching out to us. We've received your message and will get back to you shortly.</p>
          <p>Here's what happens next:</p>
          <ol>
            <li>Our team will review your message within 24 hours</li>
            <li>A team member will be assigned to assist you</li>
            <li>We'll respond with detailed information based on your inquiry</li>
          </ol>
          <p>If you have any immediate questions, please don't hesitate to reach out to us.</p>
          <p>Best regards,<br>The Saiyana Logistics Team</p>
        </div>
      </div>
    </body>
  </html>
`;

export async function POST(request: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing required environment variables' },
        { status: 500, headers }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();

    if (!body.email || !body.name || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400, headers }
      );
    }

    const { error: adminEmailError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission from ${body.name}`,
      html: generateAdminEmailHtml(body),
      replyTo: body.email,
    });

    if (adminEmailError) {
      console.error('Admin email error:', adminEmailError);
      return NextResponse.json(
        { error: 'Failed to send admin notification' },
        { status: 500, headers }
      );
    }

    const { error: customerEmailError } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: body.email,
      subject: 'Thank You for Contacting Saiyana Logistics',
      html: generateCustomerEmailHtml(body),
    });

    if (customerEmailError) {
      console.error('Customer email error:', customerEmailError);
      return NextResponse.json(
        { success: true, warning: 'Message received, but confirmation email could not be sent' },
        { headers }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message received and confirmation sent' },
      { headers }
    );

  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    );
  }
}