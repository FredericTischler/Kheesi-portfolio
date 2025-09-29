import { useMemo, useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

import { ActionButton } from "@/components/ActionButtons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  name: string;
  email: string;
  message: string;
};

const INITIAL_STATE: FormState = { name: "", email: "", message: "" };

export function ContactForm({ mailto }: { mailto: string }) {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const mailtoHref = useMemo(() => {
    const params = new URLSearchParams({
      subject: "Contact portfolio",
      body: `Bonjour Frédéric,\n\n${form.message}\n\n${form.name}`,
    });
    return `${mailto}?${params}`;
  }, [form.message, form.name, mailto]);

  const validate = () => {
    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) nextErrors.name = "Merci d’indiquer votre nom.";
    if (!form.email.trim()) {
      nextErrors.email = "L’email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Format d’email invalide.";
    }
    if (!form.message.trim()) nextErrors.message = "Ajoutez un message.";
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
        <Label htmlFor="contact-name">Nom</Label>
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
        <Label htmlFor="contact-email">Email</Label>
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
        <Label htmlFor="contact-message">Message</Label>
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
          M’écrire
        </ActionButton>
        <a
          href={mailtoHref}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          <Mail className="h-4 w-4" /> Ou écrire directement par email
        </a>
        {submitted ? (
          <div className="flex items-center gap-2 rounded-[1.5rem] border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
            <CheckCircle2 className="h-5 w-5" /> Merci pour votre message — je reviens vers vous rapidement.
          </div>
        ) : null}
      </div>
    </form>
  );
}
