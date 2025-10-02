import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Mail } from "lucide-react";

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
  fallbackNotice: string;
  sending: string;
  error: string;
  mailtoHint: string;
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
    fallbackNotice: "Si l’envoi direct n’est pas disponible, votre client mail s’ouvrira pour finaliser le message.",
    sending: "Envoi en cours...",
    error: "Impossible d’envoyer le message. Réessayez ou utilisez le lien email.",
    mailtoHint: "Une fenêtre email vient de s’ouvrir avec votre message pré-rempli.",
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
    fallbackNotice: "If direct sending isn’t available, your email client will open with a pre-filled draft.",
    sending: "Sending...",
    error: "The message could not be sent. Please try again or use the email link.",
    mailtoHint: "An email window opened with your message pre-filled.",
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
  const [status, setStatus] = useState<"idle" | "success" | "error" | "mailto">("idle");
  const [submitting, setSubmitting] = useState(false);
  const copy = CONTACT_FORM_COPY[locale];
  const hasEndpoint = Boolean(import.meta.env.VITE_CONTACT_FORM_ENDPOINT);

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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    if (typeof window === "undefined") return;

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

    if (!endpoint) {
      window.open(mailtoHref, "_blank", "noopener,noreferrer");
      setStatus("mailto");
      return;
    }

    try {
      setSubmitting(true);
      setStatus("idle");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setStatus("success");
      setForm(INITIAL_STATE);
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
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
        <ActionButton
          type="submit"
          size="md"
          variant="primary"
          className="gap-2 btn-cta"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>{copy.sending}</span>
            </>
          ) : (
            copy.button
          )}
        </ActionButton>
        {!hasEndpoint ? <p className="text-xs text-muted-foreground">{copy.fallbackNotice}</p> : null}
        <a
          href={mailtoHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          <Mail className="h-4 w-4" /> {copy.directEmail}
        </a>
        <div className="space-y-2" aria-live="polite" aria-atomic="true">
          {status === "success" ? (
            <div className="flex items-center gap-2 rounded-[1.5rem] border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              <span>{copy.success}</span>
            </div>
          ) : null}
          {status === "mailto" ? (
            <div className="flex items-center gap-2 rounded-[1.5rem] border border-border/40 bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
              <Mail className="h-5 w-5" aria-hidden="true" />
              <span>{copy.mailtoHint}</span>
            </div>
          ) : null}
          {status === "error" ? (
            <div className="flex items-center gap-2 rounded-[1.5rem] border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              <span>{copy.error}</span>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  );
}
