import { Resend } from "npm:resend@4.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const OWNER_EMAIL = "mesudpower@gmail.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, roomType, checkIn, checkOut, guests, specialRequests } = await req.json();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(resendApiKey);

    // Email to owner
    await resend.emails.send({
      from: "Azwa Hotel Booking <onboarding@resend.dev>",
      to: [OWNER_EMAIL],
      subject: `New Booking Request from ${name}`,
      html: `
        <h2>🏨 New Booking Request — Azwa Hotel</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Room</td><td style="padding:8px;">${roomType}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Check-in</td><td style="padding:8px;">${checkIn}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Check-out</td><td style="padding:8px;">${checkOut}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Guests</td><td style="padding:8px;">${guests}</td></tr>
          ${specialRequests ? `<tr><td style="padding:8px;font-weight:bold;">Special Requests</td><td style="padding:8px;">${specialRequests}</td></tr>` : ""}
        </table>
      `,
    });

    // Confirmation email to guest
    await resend.emails.send({
      from: "Azwa Hotel <onboarding@resend.dev>",
      to: [email],
      subject: "Booking Request Received — Azwa Hotel",
      html: `
        <h2>Thank you, ${name}!</h2>
        <p>We have received your booking request and will get back to you shortly.</p>
        <p><strong>Room:</strong> ${roomType}<br/>
        <strong>Check-in:</strong> ${checkIn}<br/>
        <strong>Check-out:</strong> ${checkOut}<br/>
        <strong>Guests:</strong> ${guests}</p>
        <p>If you have any questions, feel free to reach us on WhatsApp or reply to this email.</p>
        <p>— Azwa Hotel Team</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
