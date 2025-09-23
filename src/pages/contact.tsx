import { motion } from "framer-motion";
import { CheckCircle2, Mail } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const initialState: FormData = {
  name: "",
  email: "",
  message: "",
};

export function ContactPage() {
  const [form, setForm] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Contact portfolio RedBubble");
    const body = encodeURIComponent(`Bonjour,\n\nJe souhaite en savoir plus.\n\n${form.name}`);
    return `mailto:hello@kheesi.design?subject=${subject}&body=${body}`;
  }, [form.name]);

  const validate = () => {
    const nextErrors: Partial<FormData> = {};
    if (!form.name.trim()) nextErrors.name = "Merci d’indiquer votre prénom.";
    if (!form.email.trim()) {
      nextErrors.email = "L’email est requis.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Format d’email invalide.";
    }
    if (!form.message.trim()) nextErrors.message = "Ajoutez un message pour contextualiser.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <div className="container grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6"
      >
        <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">Contact</p>
        <h1 className="text-balance text-4xl font-semibold md:text-5xl">
          Parlons de vos prochains produits RedBubble.
        </h1>
        <p className="max-w-2xl text-balance text-muted-foreground">
          Besoin d’un pack de designs, d’une refonte complète ou d’un accompagnement créatif ? Laissez-moi
          un message et je vous réponds sous 24h. Utilisez le formulaire ou écrivez directement par email.
        </p>
        <a
          href={mailto}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary"
        >
          <Mail className="h-4 w-4" /> hello@kheesi.design
        </a>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="rounded-[2rem] border border-border/60 bg-background/80 p-8 shadow-lg backdrop-blur-xl"
      >
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? <p className="text-xs text-destructive">{errors.name}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message ? <p className="text-xs text-destructive">{errors.message}</p> : null}
          </div>

          <div className="flex flex-col gap-4">
            <Button type="submit" size="lg" className="gap-2">
              Envoyer
            </Button>
            {submitted ? (
              <div className="flex items-center gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary">
                <CheckCircle2 className="h-5 w-5" />
                Votre message est prêt à être envoyé. Vous pouvez aussi écrire via le mailto ci-dessus.
              </div>
            ) : null}
          </div>
        </form>
      </motion.section>
    </div>
  );
}
