// src/app/api/contact/pageRoute.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Make sure these are properly exported
export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Add OPTIONS method to handle CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

// The main POST handler
export async function POST(request: Request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    // Check for Resend API key
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500, headers }
      );
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Parse the request body
    const body = await request.json();

    // Validate required fields
    if (!body.email || !body.name || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400, headers }
      );
    }

    // Send email
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: 'saiyanacfa@gmail.com', // Your email address
      subject: `New Contact Form Submission from ${body.name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong> ${body.message}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500, headers }
      );
    }

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
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