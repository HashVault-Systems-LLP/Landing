"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-frame py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
        <div>
          <p className="section-kicker">Start a conversation</p>
          <h2 className="mt-5 max-w-md text-3xl leading-tight text-foreground sm:text-4xl">
            Tell us the cohort, the context, and what your current program is missing.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">
            A useful first brief includes learner seniority, session format, timing constraints, and whether you need a single event or a recurring track.
          </p>
        </div>

        <div className="hash-panel p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <label htmlFor="name" className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                Name
              </label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Aparna Rao"
                required
                value={formData.name}
                onChange={handleChange}
                className="h-11 border-border bg-background/30 px-3 text-sm text-foreground placeholder:text-muted-foreground/70"
              />
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="email" className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                Work email
              </label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="team@institution.edu"
                required
                value={formData.email}
                onChange={handleChange}
                className="h-11 border-border bg-background/30 px-3 text-sm text-foreground placeholder:text-muted-foreground/70"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="institution" className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                Institution or team
              </label>
              <Input
                id="institution"
                type="text"
                name="institution"
                placeholder="School of Computing, internal security program, or technical community"
                required
                value={formData.institution}
                onChange={handleChange}
                className="h-11 border-border bg-background/30 px-3 text-sm text-foreground placeholder:text-muted-foreground/70"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-2 block text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                What are you trying to build?
              </label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Describe the audience, delivery format, and the capability gap you want the program to address."
                value={formData.message}
                onChange={handleChange}
                className="min-h-36 border-border bg-background/30 px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground/70"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col items-start gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-6 text-muted-foreground">
                We usually respond with a scoped recommendation, a suggested format, and next-step logistics.
              </p>
              <Button
                type="submit"
                size="lg"
                className={`h-11 border px-6 text-[0.76rem] uppercase tracking-[0.18em] ${
                  submitted
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {submitted ? "Brief received" : "Send brief"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
