// src/app/api/contact/pageRoute.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

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

export async function POST(request: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Server configuration error' },
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

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'abhinav.kotta@gmail.com',
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