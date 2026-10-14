import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { emails, subject, message } = body ?? {};

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return NextResponse.json(
        { success: false, error: "No recipient emails provided" },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const gmailUser = process.env.GMAIL_USER || process.env.EMAIL_USER || process.env.SMTP_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS || process.env.SMTP_PASS;

    // OPTION 1: Resend (if RESEND_API_KEY is configured)
    if (resendApiKey && resendApiKey.startsWith("re_")) {
      try {
        const resend = new Resend(resendApiKey);
        const fromAddress = process.env.RESEND_FROM || "ByteBattle Team <onboarding@resend.dev>";

        // Resend batch or single delivery
        const result = await resend.emails.send({
          from: fromAddress,
          to: emails,
          subject: subject || "ByteBattle Hackathon Notification",
          html: message || "<p>Notification from ByteBattle organizers.</p>",
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        return NextResponse.json({
          success: true,
          provider: "resend",
          count: emails.length,
          message: `Email successfully delivered to ${emails.length} recipient(s) via Resend!`,
        });
      } catch (err: any) {
        console.error("Resend API delivery error:", err);
        return NextResponse.json(
          {
            success: false,
            error: `Resend Error: ${err?.message || "Failed to deliver"}. Tip: On free tier, Resend only allows sending to your registered account email, or you can use Gmail SMTP.`,
          },
          { status: 502 }
        );
      }
    }

    // OPTION 2: Gmail SMTP / Nodemailer (if GMAIL_USER & GMAIL_APP_PASSWORD or SMTP is configured)
    if (gmailUser && gmailPass) {
      try {
        const isGmail = !process.env.SMTP_HOST || process.env.SMTP_HOST.includes("gmail");
        const transporter = nodemailer.createTransport(
          isGmail
            ? {
                service: "gmail",
                auth: {
                  user: gmailUser,
                  pass: gmailPass,
                },
              }
            : {
                host: process.env.SMTP_HOST,
                port: Number(process.env.SMTP_PORT || 587),
                secure: process.env.SMTP_SECURE === "true",
                auth: {
                  user: gmailUser,
                  pass: gmailPass,
                },
              }
        );

        const info = await transporter.sendMail({
          from: process.env.EMAIL_FROM || `"ByteBattle Hackathon" <${gmailUser}>`,
          to: emails.join(", "),
          subject: subject || "ByteBattle Hackathon Notification",
          html: message || "<p>Notification from ByteBattle organizers.</p>",
        });

        return NextResponse.json({
          success: true,
          provider: "gmail-smtp",
          messageId: info.messageId,
          count: emails.length,
          message: `Email successfully delivered to ${emails.length} recipient(s) via Gmail SMTP!`,
        });
      } catch (err: any) {
        console.error("Gmail SMTP delivery error:", err);
        return NextResponse.json(
          {
            success: false,
            error: `SMTP / Gmail Error: ${err?.message || "Authentication failed"}. Ensure you are using a 16-character Google App Password (not your normal Gmail password).`,
          },
          { status: 502 }
        );
      }
    }

    // Neither email provider configured
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error:
          "No email provider configured in .env.local. To deliver real emails to inboxes, add either: 1) RESEND_API_KEY=re_... (from resend.com), OR 2) GMAIL_USER=your_email@gmail.com and GMAIL_APP_PASSWORD=your_16_char_app_password in .env.local",
      },
      { status: 422 }
    );
  } catch (err: any) {
    console.error("Email route error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
