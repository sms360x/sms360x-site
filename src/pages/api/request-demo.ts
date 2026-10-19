import type { APIRoute } from 'astro';
import { MailtrapClient } from 'mailtrap';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, company, message } = body;

    if (!email) {
      return new Response(
        JSON.stringify({ message: 'Email address is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = process.env.MAILTRAP_API_TOKEN;
    if (!token) {
      return new Response(
        JSON.stringify({ message: 'Mailtrap token is missing.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = new MailtrapClient({ token });
    await client.send({
      from: {
        email: process.env.SENDER_EMAIL || 'info@sms360x.com',
        name: 'SMS360X Demo Request System',
      },
      to: [{ email: process.env.RECIPIENT_EMAIL || 'sms360x@gmail.com' }],
      subject: `New Demo Request from ${name || email}`,
      html: `
        <h2>New Demo Request</h2>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `,
    });

    return new Response(
      JSON.stringify({ message: 'Demo request sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Mailtrap Error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to send request.', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
