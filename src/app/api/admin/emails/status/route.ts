import { NextResponse } from "next/server";

export async function GET() {
  const hasResend = !!(process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith("re_"));
  const hasGmail = !!((process.env.GMAIL_USER || process.env.EMAIL_USER) && (process.env.GMAIL_APP_PASSWORD || process.env.EMAIL_PASS));

  return NextResponse.json({
    configured: hasResend || hasGmail,
    provider: hasResend ? "Resend" : hasGmail ? "Gmail SMTP" : "None",
    details: hasResend
      ? "Resend API key is connected"
      : hasGmail
      ? `Gmail SMTP is connected (${process.env.GMAIL_USER || process.env.EMAIL_USER})`
      : "No email service configured in .env.local",
  });
}
