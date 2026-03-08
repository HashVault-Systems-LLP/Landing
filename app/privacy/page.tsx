import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Privacy Policy | HashVault Systems LLP",
  description:
    "Privacy policy for HashVault Systems LLP — how we collect, use, and protect information submitted through our website.",
};

export default function PrivacyPage() {
  const effectiveDate = "7 March 2026";

  return (
    <div className="min-h-screen bg-background">
      {/* Back nav */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon size={13} weight="bold" />
            Back to site
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        {/* Header */}
        <p className="section-kicker">Legal</p>
        <h1 className="display-title mt-4 text-[2.5rem] text-foreground sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Effective date: {effectiveDate}
        </p>

        <div className="mt-12 space-y-10 text-sm leading-[1.9] text-muted-foreground">

          {/* 1 */}
          <section>
            <h2 className="mb-3 text-base text-foreground">1. Who we are</h2>
            <p>
              HashVault Systems LLP (&ldquo;HashVault&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) is a practitioner-led
              cybersecurity training provider based in Bangalore, Karnataka, India. We deliver
              hands-on workshops and lab programmes for engineering colleges and corporate teams.
            </p>
            <p className="mt-3">
              You can contact us at{" "}
              <a
                href="mailto:contact@hashvaultsystems.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                contact@hashvaultsystems.com
              </a>
              .
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="mb-3 text-base text-foreground">2. What information we collect</h2>
            <p>
              We collect information only when you voluntarily provide it — specifically when you
              fill out the contact form on our website. This may include:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your institution or team name</li>
              <li>The content of any message you send us</li>
            </ul>
            <p className="mt-3">
              We do not collect payment information, government-issued IDs, or any sensitive
              personal data through this website.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="mb-3 text-base text-foreground">3. How we use your information</h2>
            <p>We use the information you submit to:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Respond to your inquiry and send you a scoped proposal</li>
              <li>
                Send you a confirmation email acknowledging receipt of your message
              </li>
              <li>Follow up on our correspondence regarding your training programme</li>
            </ul>
            <p className="mt-3">
              We do not use your information for advertising, automated profiling, or
              unsolicited marketing.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="mb-3 text-base text-foreground">4. How we store and protect your data</h2>
            <p>
              Form submissions are transmitted via Resend, an email delivery service, and stored
              in our team inbox. We do not maintain a separate database of contact submissions.
              Email communications are stored according to standard email provider security
              practices.
            </p>
            <p className="mt-3">
              We take reasonable precautions to protect information you send us, but no method of
              transmission over the internet is completely secure. If you have concerns, you may
              contact us directly by email.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="mb-3 text-base text-foreground">5. Sharing your information</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may
              share information with service providers who help us operate our website and
              deliver our services (for example, our email delivery provider), under confidentiality
              obligations. We will disclose information if required to do so by law.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="mb-3 text-base text-foreground">6. Cookies and analytics</h2>
            <p>
              Our website may use analytics tools (such as Google Analytics) to understand how
              visitors interact with the site. These tools may set cookies or use similar tracking
              technologies. You can opt out of Google Analytics tracking by using the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                Google Analytics opt-out browser add-on
              </a>
              .
            </p>
            <p className="mt-3">
              We do not use cookies for advertising or cross-site tracking.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="mb-3 text-base text-foreground">7. Your rights</h2>
            <p>
              You may request access to, correction of, or deletion of the personal information
              you have provided to us by emailing{" "}
              <a
                href="mailto:contact@hashvaultsystems.com"
                className="text-primary underline-offset-4 hover:underline"
              >
                contact@hashvaultsystems.com
              </a>
              . We will respond within a reasonable timeframe.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="mb-3 text-base text-foreground">8. Children&apos;s privacy</h2>
            <p>
              Our services are directed at educational institutions and professional teams. We do
              not knowingly collect personal information from individuals under the age of 18
              without the involvement of a faculty member or institutional contact.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="mb-3 text-base text-foreground">9. Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time. The effective date at the top
              of this page will reflect when the most recent update was made. Continued use of
              our website after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="mb-3 text-base text-foreground">10. Contact</h2>
            <p>
              For any questions, requests, or concerns about this privacy policy or how we handle
              your information, please contact us at:
            </p>
            <div className="mt-3 border border-border bg-card/60 px-5 py-4 text-foreground">
              <p>HashVault Systems LLP</p>
              <p className="mt-1">Bangalore, Karnataka, India</p>
              <p className="mt-1">
                <a
                  href="mailto:contact@hashvaultsystems.com"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  contact@hashvaultsystems.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
