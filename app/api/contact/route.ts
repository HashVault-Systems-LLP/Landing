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

// ─── Resend fetch helper ───────────────────────────────────────────────────────

async function sendEmail(payload: ResendPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set.");

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
    throw new Error(`Resend API ${res.status}: ${body}`);
  }
}

// ─── Shared design tokens (inline — <style> blocks are stripped by Gmail) ─────

// bg:        #0d0a14  – outer page dark
// card:      #120d1e  – content card
// card-alt:  #1a1229  – inset field rows
// border:    #261c3a  – subtle borders
// border-hi: #3d2d5c  – highlighted borders (badge, CTA)
// text-hi:   #ede8f8  – primary text
// text-mid:  #a89cc4  – secondary text
// text-dim:  #5c5175  – muted / labels
// purple:    #8b5cf6  – brand accent
// purple-dk: #6d3fd6  – CTA button bg

// ─── Admin notification email ──────────────────────────────────────────────────

function notificationEmailHtml(data: ContactPayload): string {
  const receivedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const firstName = data.name.split(" ")[0];

  // Helper: a labelled field row inside the dark card
  const field = (label: string, valueHtml: string) => `
    <tr>
      <td style="padding:0 0 20px 0;">
        <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.22em;color:#5c5175;margin-bottom:6px;">${label}</div>
        <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:13px;line-height:1.65;color:#c8bfe0;">${valueHtml}</div>
      </td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="color-scheme" content="dark"/>
  <title>New Workshop Inquiry</title>
</head>
<!--[if !mso]><!-->
<body style="margin:0;padding:0;background-color:#0d0a14;" bgcolor="#0d0a14">
<!--<![endif]-->

<!-- Outer wrapper — sets full-page dark bg for all clients -->
<table width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color:#0d0a14;margin:0;padding:0;" bgcolor="#0d0a14">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0" border="0"
             style="background-color:#120d1e;border:1px solid #261c3a;max-width:600px;width:100%;">

        <!-- ── Header ── -->
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #261c3a;">
            <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:22px;font-weight:700;letter-spacing:-0.04em;color:#ede8f8;line-height:1;">HashVault</div>
            <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.22em;color:#5c5175;margin-top:5px;">Systems LLP</div>
            <!-- Badge -->
            <div style="display:inline-block;margin-top:12px;border:1px solid #3d2d5c;background-color:#1e1530;font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#8b5cf6;padding:4px 10px;">
              New Workshop Inquiry
            </div>
          </td>
        </tr>

        <!-- ── Fields ── -->
        <tr>
          <td style="padding:28px 40px 0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              ${field("Name", escHtml(data.name))}
              ${field("Email", `<a href="mailto:${escHtml(data.email)}" style="color:#8b5cf6;text-decoration:none;">${escHtml(data.email)}</a>`)}
              ${field("Institution / Team", escHtml(data.institution))}
            </table>
          </td>
        </tr>

        <!-- ── Message box ── -->
        <tr>
          <td style="padding:0 40px 28px;">
            <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.22em;color:#5c5175;margin-bottom:8px;">Message</div>
            <div style="background-color:#0d0a14;border:1px solid #261c3a;font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:13px;line-height:1.7;color:#c8bfe0;padding:16px 18px;white-space:pre-wrap;word-break:break-word;">${escHtml(data.message)}</div>
          </td>
        </tr>

        <!-- ── Divider ── -->
        <tr>
          <td style="padding:0 40px;">
            <div style="height:1px;background-color:#261c3a;"></div>
          </td>
        </tr>

        <!-- ── CTA ── -->
        <tr>
          <td style="padding:24px 40px 32px;">
            <a href="mailto:${escHtml(data.email)}?subject=Re%3A%20Workshop%20inquiry%20%E2%80%94%20${encodeURIComponent(data.institution)}"
               style="display:inline-block;background-color:#6d3fd6;border:1px solid #8b5cf6;font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:11px;text-transform:uppercase;letter-spacing:0.2em;color:#ede8f8;padding:11px 22px;text-decoration:none;">
              Reply to ${escHtml(firstName)}
            </a>
          </td>
        </tr>

        <!-- ── Footer ── -->
        <tr>
          <td style="padding:0 40px 28px;border-top:1px solid #1a1229;">
            <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#3a2f52;padding-top:20px;">
              Received ${receivedAt} IST
            </div>
          </td>
        </tr>

      </table><!-- /Card -->
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ─── Thank-you email to submitter ─────────────────────────────────────────────

function thankYouEmailHtml(data: ContactPayload): string {
  const firstName = data.name.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="color-scheme" content="dark"/>
  <title>We&apos;ve received your inquiry</title>
</head>
<!--[if !mso]><!-->
<body style="margin:0;padding:0;background-color:#0d0a14;" bgcolor="#0d0a14">
<!--<![endif]-->

<table width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color:#0d0a14;margin:0;padding:0;" bgcolor="#0d0a14">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <!-- Card -->
      <table width="600" cellpadding="0" cellspacing="0" border="0"
             style="background-color:#120d1e;border:1px solid #261c3a;max-width:600px;width:100%;">

        <!-- ── Header ── -->
        <tr>
          <td style="padding:32px 40px 24px;border-bottom:1px solid #261c3a;">
            <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:22px;font-weight:700;letter-spacing:-0.04em;color:#ede8f8;line-height:1;">HashVault</div>
            <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.22em;color:#5c5175;margin-top:5px;">Systems LLP &middot; Bangalore, India</div>
          </td>
        </tr>

        <!-- ── Greeting ── -->
        <tr>
          <td style="padding:36px 40px 0;">
            <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:24px;letter-spacing:-0.03em;color:#ede8f8;line-height:1.25;margin-bottom:18px;">
              We&apos;ve got your brief,<br/>
              <span style="color:#8b5cf6;">${escHtml(firstName)}.</span>
            </div>
            <p style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:13px;line-height:1.8;color:#7a6f94;margin:0 0 28px;">
              Thank you for reaching out. We&apos;ve received your inquiry and will get back
              to you within&nbsp;<span style="color:#ede8f8;">24 hours</span>&nbsp;with a scoped
              proposal &mdash; including workshop track, format, and what we&apos;ll need from
              your end to run it well.
            </p>
          </td>
        </tr>

        <!-- ── Detail rows ── -->
        <tr>
          <td style="padding:0 40px 28px;">

            <!-- Row: From -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="background-color:#0d0a14;border:1px solid #261c3a;margin-bottom:6px;">
              <tr>
                <td width="120" style="padding:13px 16px;border-right:1px solid #261c3a;vertical-align:top;">
                  <span style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#5c5175;">From</span>
                </td>
                <td style="padding:13px 16px;vertical-align:top;">
                  <span style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:13px;color:#c8bfe0;">${escHtml(data.name)}</span>
                </td>
              </tr>
            </table>

            <!-- Row: Institution -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="background-color:#0d0a14;border:1px solid #261c3a;">
              <tr>
                <td width="120" style="padding:13px 16px;border-right:1px solid #261c3a;vertical-align:top;">
                  <span style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#5c5175;">Institution</span>
                </td>
                <td style="padding:13px 16px;vertical-align:top;">
                  <span style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:13px;color:#c8bfe0;">${escHtml(data.institution)}</span>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ── Divider ── -->
        <tr>
          <td style="padding:0 40px;">
            <div style="height:1px;background-color:#261c3a;"></div>
          </td>
        </tr>

        <!-- ── Side-note ── -->
        <tr>
          <td style="padding:24px 40px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="3" style="background-color:#6d3fd6;"></td>
                <td style="padding:0 0 0 16px;">
                  <p style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:12px;line-height:1.75;color:#5c5175;margin:0;">
                    In the meantime, if you have specific dates or batch details to add,
                    you can reply directly to this email &mdash; we&apos;ll pick it up.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── Footer ── -->
        <tr>
          <td style="padding:0 40px 28px;border-top:1px solid #1a1229;">
            <div style="font-family:ui-monospace,SFMono-Regular,'SF Mono',Menlo,Monaco,Consolas,'Liberation Mono','Courier New',monospace;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#3a2f52;padding-top:20px;">
              HashVault Systems LLP &middot;
              <a href="mailto:contact@hashvaultsystems.com"
                 style="color:#3a2f52;text-decoration:none;">contact@hashvaultsystems.com</a>
            </div>
          </td>
        </tr>

      </table><!-- /Card -->
    </td>
  </tr>
</table>
</body>
</html>`;
}

// ─── Minimal HTML entity escaping ─────────────────────────────────────────────

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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  try {
    // ── 1. Notify HashVault ────────────────────────────────────────────────
    await sendEmail({
      // NOTE: hashvaultsystems.com must be verified in Resend → Domains.
      // For local testing swap to: "onboarding@resend.dev"
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
      { error: "Failed to send. Please email contact@hashvaultsystems.com directly." },
      { status: 500 }
    );
  }
}
