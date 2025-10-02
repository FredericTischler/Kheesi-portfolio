import { useMemo, useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

import { ActionButton } from "@/components/ActionButtons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Locale } from "@/i18n/config";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_STATE: FormState = { name: "", email: "", message: "" };

const CONTACT_FORM_COPY: Record<Locale, {
  labels: { name: string; email: string; message: string };
  button: string;
  directEmail: string;
  success: string;
  errors: {
    name: string;
    emailRequired: string;
    emailInvalid: string;
    message: string;
  };
  mailSubject: string;
  mailGreeting: string;
}> = {
  fr: {
    labels: { name: "Nom", email: "Email", message: "Message" },
    button: "M’écrire",
    directEmail: "Ou écrire directement par email",
    success: "Merci pour votre message — je reviens vers vous rapidement.",
    errors: {
      name: "Merci d’indiquer votre nom.",
      emailRequired: "L’email est requis.",
      emailInvalid: "Format d’email invalide.",
      message: "Ajoutez un message.",
    },
    mailSubject: "Contact portfolio",
    mailGreeting: "Bonjour Frédéric,",
  },
  en: {
    labels: { name: "Name", email: "Email", message: "Message" },
    button: "Send a message",
    directEmail: "Or reach out directly by email",
    success: "Thanks for your message — I’ll get back to you shortly.",
    errors: {
      name: "Please tell me your name.",
      emailRequired: "Email is required.",
      emailInvalid: "Email format looks incorrect.",
      message: "Add a short message.",
    },
    mailSubject: "Portfolio contact",
    mailGreeting: "Hello Frédéric,",
  },
};

type ContactFormProps = {
  mailto: string;
  locale: Locale;
};

export function ContactForm({ mailto, locale }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const copy = CONTACT_FORM_COPY[locale];

  const mailtoHref = useMemo(() => {
    const params = new URLSearchParams({
      subject: copy.mailSubject,
      body: `${copy.mailGreeting}\n\n${form.message}\n\n${form.name}`,
    });
    return `${mailto}?${params.toString()}`;
  }, [copy.mailGreeting, copy.mailSubject, form.message, form.name, mailto]);

  const validate = () => {
    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = copy.errors.name;
    if (!form.email.trim()) {
      nextErrors.email = copy.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = copy.errors.emailInvalid;
    }
    if (!form.message.trim()) nextErrors.message = copy.errors.message;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3800);
    setForm(INITIAL_STATE);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-name">{copy.labels.name}</Label>
        <Input
          id="contact-name"
          name="name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? <p className="text-xs text-destructive">{errors.name}</p> : null}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-email">{copy.labels.email}</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="contact-message">{copy.labels.message}</Label>
        <Textarea
          id="contact-message"
          name="message"
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : null}
      </div>
      <div className="flex flex-col gap-4">
        <ActionButton type="submit" size="md" variant="primary" className="gap-2 btn-cta">
          {copy.button}
        </ActionButton>
        <a
          href={mailtoHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          <Mail className="h-4 w-4" /> {copy.directEmail}
        </a>
        {submitted ? (
          <div className="flex items-center gap-2 rounded-[1.5rem] border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
            <CheckCircle2 className="h-5 w-5" /> {copy.success}
          </div>
        ) : null}
      </div>
    </form>
  );
}
