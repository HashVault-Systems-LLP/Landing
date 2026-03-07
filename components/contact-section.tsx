"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AnimatedGridPattern } from "@/components/animated-grid-pattern";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error ?? "Something went wrong");
      }

      setStatus("success");
      // Clear the form after success
      setFormData({ name: "", email: "", institution: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Failed to send. Please email contact@hashvaultsystems.com directly."
      );
    }
  };

  const isSending = status === "sending";
  const isSuccess = status === "success";

  return (
    <section id="contact" className="section-frame relative overflow-hidden py-20 lg:py-24">
      <AnimatedGridPattern
        numSquares={20}
        maxOpacity={0.04}
        duration={5}
        width={44}
        height={44}
        className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] opacity-50"
      />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">

        {/* ── Left: copy ── */}
        <div>
          <p className="section-kicker">Start a conversation</p>
          <h2 className="mt-5 max-w-md text-3xl leading-tight text-foreground sm:text-4xl">
            Tell us the batch size, the context, and what your program is missing.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
            A useful brief includes student count, department (CS/IT/ECE), available dates,
            and whether you need a one-day session or a multi-day bootcamp. We&apos;ll come
            back with a scoped proposal.
          </p>

          {/* Direct email fallback */}
          <p className="mt-6 text-xs text-muted-foreground/60">
            Or email us directly at{" "}
            <a
              href="mailto:contact@hashvaultsystems.com"
              className="text-primary underline-offset-4 hover:underline"
            >
              contact@hashvaultsystems.com
            </a>
          </p>
        </div>

        {/* ── Right: form ── */}
        <div className="hash-panel p-6 sm:p-8">
          {isSuccess ? (
            // ── Success state ─────────────────────────────────────────────
            <div className="flex flex-col items-start gap-5 py-6">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-[0.72rem] uppercase tracking-[0.22em] text-primary">
                  Brief received
                </p>
              </div>
              <p className="text-xl leading-snug text-foreground">
                We&apos;ve got your inquiry.
              </p>
              <p className="text-sm leading-7 text-muted-foreground">
                Expect a scoped proposal from us within 24 hours. Check your inbox
                — we&apos;ve sent a confirmation to the email you provided.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            // ── Form ──────────────────────────────────────────────────────
            <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <label
                  htmlFor="name"
                  className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Priya Sharma"
                  required
                  disabled={isSending}
                  value={formData.name}
                  onChange={handleChange}
                  className="h-11 border-border bg-background/30 px-3 text-sm text-foreground placeholder:text-muted-foreground/70 disabled:opacity-50"
                />
              </div>

              <div className="sm:col-span-1">
                <label
                  htmlFor="email"
                  className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="team@institution.edu"
                  required
                  disabled={isSending}
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 border-border bg-background/30 px-3 text-sm text-foreground placeholder:text-muted-foreground/70 disabled:opacity-50"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="institution"
                  className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  Institution or team
                </label>
                <Input
                  id="institution"
                  type="text"
                  name="institution"
                  placeholder="Dept. of CSE, RV College of Engineering — or your company name"
                  required
                  disabled={isSending}
                  value={formData.institution}
                  onChange={handleChange}
                  className="h-11 border-border bg-background/30 px-3 text-sm text-foreground placeholder:text-muted-foreground/70 disabled:opacity-50"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  What are you trying to build?
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="E.g. 3rd year CS batch of 80 students, want a 2-day ethical hacking bootcamp in April. Budget is flexible. Students have basic networking knowledge."
                  disabled={isSending}
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-36 border-border bg-background/30 px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 disabled:opacity-50"
                />
              </div>

              {/* Error banner */}
              {status === "error" && (
                <div className="sm:col-span-2 border border-destructive/40 bg-destructive/10 px-4 py-3 text-xs leading-6 text-destructive">
                  {errorMsg}
                </div>
              )}

              <div className="sm:col-span-2 flex flex-col items-start gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-6 text-muted-foreground">
                  We respond within 24 hours with a scoped proposal and suggested dates.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSending}
                  className="h-11 border border-primary bg-primary px-6 text-[0.76rem] uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <span
                        className="inline-block h-3 w-3 animate-spin rounded-full border border-primary-foreground border-t-transparent"
                      />
                      Sending…
                    </span>
                  ) : (
                    "Send brief"
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
