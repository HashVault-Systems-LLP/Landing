import { NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  email: string;
  institution: string;
  message: string;
}

interface ResendPayload {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function sendEmail(payload: ResendPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set in environment variables.");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }
}

function notificationEmailHtml(data: ContactPayload): string {
  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>New Workshop Inquiry</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0c14; font-family: ui-monospace, 'Geist Mono', 'Courier New', monospace; }
    .wrap { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
    .header { border-bottom: 1px solid #2a2236; padding-bottom: 20px; margin-bottom: 28px; }
    .logo { font-size: 22px; font-weight: 700; letter-spacing: -0.04em; color: #f0edf8; line-height: 1; }
    .logo-sub { font-size: 10px; text-transform: uppercase; letter-spacing: 0.22em; color: #5a4f70; margin-top: 4px; }
    .badge { display: inline-block; border: 1px solid #3d2f5c; background: #1c1528; color: #a37de8; font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em; padding: 3px 8px; margin-top: 6px; }
    .field { margin-bottom: 20px; }
    .field-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.22em; color: #5a4f70; margin-bottom: 5px; }
    .field-value { color: #d4cee8; font-size: 13px; line-height: 1.65; }
    .field-value a { color: #a37de8; text-decoration: none; }
    .message-box { background: #160f22; border: 1px solid #2a2236; padding: 16px; white-space: pre-wrap; word-break: break-word; }
    .divider { border: none; border-top: 1px solid #2a2236; margin: 28px 0; }
    .footer-note { color: #3d3552; font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em; }
    .cta { display: inline-block; margin-top: 14px; border: 1px solid #7c4ddc; background: #7c4ddc; color: #f0edf8; font-size: 11px; text-transform: uppercase; letter-spacing: 0.18em; padding: 10px 20px; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">HashVault</div>
      <div class="logo-sub">Systems LLP</div>
      <div class="badge">New Workshop Inquiry</div>
    </div>

    <div class="field">
      <div class="field-label">Name</div>
      <div class="field-value">${escHtml(data.name)}</div>
    </div>

    <div class="field">
      <div class="field-label">Email</div>
      <div class="field-value"><a href="mailto:${escHtml(data.email)}">${escHtml(data.email)}</a></div>
    </div>

    <div class="field">
      <div class="field-label">Institution / Team</div>
      <div class="field-value">${escHtml(data.institution)}</div>
    </div>

    <div class="field">
      <div class="field-label">Message</div>
      <div class="field-value message-box">${escHtml(data.message)}</div>
    </div>

    <div class="divider"></div>

    <a class="cta" href="mailto:${escHtml(data.email)}?subject=Re: Workshop inquiry — ${escHtml(data.institution)}">
      Reply to ${escHtml(data.name.split(" ")[0])}
    </a>

    <div class="divider"></div>
    <div class="footer-note">Received ${receivedAt} IST</div>
  </div>
</body>
</html>`;
}

function thankYouEmailHtml(data: ContactPayload): string {
  const firstName = data.name.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>We've received your inquiry</title>
  <style>
    body { margin: 0; padding: 0; background: #0f0c14; font-family: ui-monospace, 'Geist Mono', 'Courier New', monospace; }
    .wrap { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
    .header { border-bottom: 1px solid #2a2236; padding-bottom: 20px; margin-bottom: 32px; }
    .logo { font-size: 22px; font-weight: 700; letter-spacing: -0.04em; color: #f0edf8; line-height: 1; }
    .logo-sub { font-size: 10px; text-transform: uppercase; letter-spacing: 0.22em; color: #5a4f70; margin-top: 4px; }
    .heading { font-size: 22px; letter-spacing: -0.03em; color: #f0edf8; line-height: 1.2; margin-bottom: 16px; }
    .heading span { color: #a37de8; }
    .body-text { color: #8a8099; font-size: 13px; line-height: 1.8; margin-bottom: 20px; }
    .detail-row { display: flex; gap: 12px; border: 1px solid #2a2236; background: #160f22; padding: 12px 16px; margin-bottom: 8px; }
    .detail-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #5a4f70; min-width: 100px; padding-top: 2px; }
    .detail-value { color: #c4bdd8; font-size: 13px; line-height: 1.5; }
    .divider { border: none; border-top: 1px solid #2a2236; margin: 28px 0; }
    .note { border-left: 2px solid #7c4ddc; padding-left: 14px; color: #6d6080; font-size: 12px; line-height: 1.7; margin-bottom: 28px; }
    .footer { color: #3d3552; font-size: 10px; text-transform: uppercase; letter-spacing: 0.18em; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="logo">HashVault</div>
      <div class="logo-sub">Systems LLP · Bangalore, India</div>
    </div>

    <div class="heading">We've got your brief,<br/><span>${escHtml(firstName)}.</span></div>

    <p class="body-text">
      Thank you for reaching out. We've received your inquiry and will get back to you
      within <strong style="color:#d4cee8">24 hours</strong> with a scoped proposal — including
      workshop track, format, and what we'll need from your end to run it well.
    </p>

    <div class="detail-row">
      <div class="detail-label">From</div>
      <div class="detail-value">${escHtml(data.name)}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">Institution</div>
      <div class="detail-value">${escHtml(data.institution)}</div>
    </div>

    <div class="divider"></div>

    <div class="note">
      In the meantime, if you have specific dates or batch details to add, you can
      reply directly to this email — we'll pick it up.
    </div>

    <div class="footer">
      HashVault Systems LLP · contact@hashvaultsystems.com
    </div>
  </div>
</body>
</html>`;
}

/** Minimal HTML entity escaping to prevent injection in email templates */
function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  let data: ContactPayload;

  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, institution, message } = data;

  if (!name || !email || !institution || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  try {
    // ── 1. Notify HashVault ────────────────────────────────────────────────
    await sendEmail({
      // NOTE: The "from" domain (hashvaultsystems.com) must be verified in
      // your Resend dashboard at resend.com/domains before this will work.
      // For local testing, use "onboarding@resend.dev" as the from address.
      from: "HashVault Contact Form <no-reply@hashvaultsystems.com>",
      to: "contact@hashvaultsystems.com",
      subject: `New inquiry: ${name} — ${institution}`,
      html: notificationEmailHtml(data),
    });

    // ── 2. Thank-you to the sender ────────────────────────────────────────
    await sendEmail({
      from: "HashVault Systems <no-reply@hashvaultsystems.com>",
      to: email,
      subject: "We've received your inquiry — HashVault Systems",
      html: thankYouEmailHtml(data),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact route] Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send. Please email us directly at contact@hashvaultsystems.com" },
      { status: 500 }
    );
  }
}
