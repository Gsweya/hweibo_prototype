"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const canSubmit =
    name.trim().length >= 2 &&
    email.includes("@") &&
    message.trim().length >= 10 &&
    agree &&
    !isSubmitting;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6">
        <p className="text-lg font-semibold">Thank you</p>
        <p className="mt-1 text-sm text-zinc-600">
          Message received. For the demo, this form does not send emails yet.
        </p>
        <div className="mt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setName("");
              setEmail("");
              setCompany("");
              setMessage("");
              setAgree(false);
            }}
          >
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="contact-name">Full name *</Label>
        <Input
          id="contact-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="First and last name"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-email">Email address *</Label>
        <Input
          id="contact-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="me@company.com"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-company">Company name</Label>
        <Input
          id="contact-company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company name"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="contact-message">Your message *</Label>
        <Textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message"
          className="min-h-28 resize-none"
        />
      </div>

      <div className="flex items-start gap-2">
        <Checkbox checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
        <div className="text-sm text-zinc-600">I agree to the terms and conditions</div>
      </div>

      <div className="flex justify-end pt-2">
        <Button size="sm" disabled={!canSubmit}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}

