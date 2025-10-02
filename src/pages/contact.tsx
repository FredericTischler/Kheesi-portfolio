import { CalendarDays, Check, Clock, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { PROFILE } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";

const CONTACT_FOCUS_AREAS = [
  {
    title: "Modernisation d’app métier",
    description: "Audit de vos écrans existants, architecture cible Angular/Java et roadmap de migration progressive.",
  },
  {
    title: "Base de composants Angular",
    description: "Design tokens, composants factorisés, conventions de revue et documentation prête à diffuser.",
  },
  {
    title: "CI/CD pragmatique",
    description: "Pipelines lint/test/build, automatisation des releases et checklist qualité activable rapidement.",
  },
] as const;

const CONTACT_PREP_ITEMS = [
  "Votre stack actuelle et la taille de l’équipe",
  "L’objectif ou l’irritant principal à résoudre",
  "L’échéance ou jalon business à tenir",
] as const;

export function ContactPage() {
  usePageMetadata({
    title: "Contact — Frédéric Tischler",
    description: "Parlons de votre projet: Angular, Go, TypeScript, Java, temps réel, modernisation d’apps métier.",
    image: "/assets/social/contact.svg",
  });

  const emailAddress = PROFILE.socials.email.replace(/^mailto:/, "");

  const linkedinUrl = PROFILE.socials.linkedin;
  let linkedinDisplay: string | undefined;

  if (linkedinUrl) {
    try {
      const { host, pathname } = new URL(linkedinUrl);
      linkedinDisplay = decodeURIComponent(`${host}${pathname}`).replace(/\/$/, "");
    } catch {
      linkedinDisplay = linkedinUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
    }
  }

  const contactDetails: Array<{
    label: string;
    value: string;
    icon: LucideIcon;
    href?: string;
  }> = [
    {
      label: "Email direct",
      value: emailAddress,
      href: PROFILE.socials.email,
      icon: Mail,
    },
    {
      label: "Réponse",
      value: "Sous 48h ouvrées",
      icon: Clock,
    },
    {
      label: "Basé à",
      value: PROFILE.location,
      icon: MapPin,
    },
    {
      label: "Disponibilités",
      value: "Créneaux 9h – 18h CET",
      icon: CalendarDays,
    },
  ];

  if (linkedinUrl && linkedinDisplay) {
    contactDetails.splice(1, 0, {
      label: "LinkedIn",
      value: linkedinDisplay,
      href: linkedinUrl,
      icon: Linkedin,
    });
  }

  return (
    <div className="space-y-24 pb-20 pt-36">
      <Section className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-10">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Contact</p>
            <h1 className="text-4xl font-semibold md:text-5xl">Travaillons ensemble</h1>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Modernisation d’app legacy, base de composants Angular, pipelines CI/CD pragmatiques ou intégration temps
                réel : parlons de votre contexte et de la valeur à délivrer rapidement.
              </p>
              <p>
                Dites-m’en plus sur votre équipe, les irritants rencontrés et l’impact recherché. Je reviens vers vous
                avec une première analyse et des pistes d’actions concrètes.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-border/60 bg-background/80 p-6 shadow-sm md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                Ce que je débloque rapidement
              </p>
              <ul className="mt-4 space-y-4">
                {CONTACT_FOCUS_AREAS.map((focus) => (
                  <li key={focus.title} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{focus.title}</p>
                      <p className="text-sm text-muted-foreground">{focus.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-border/60 bg-background/80 p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Pour préparer notre échange
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {CONTACT_PREP_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-[6px] h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-border/60 bg-background/80 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Coordonnées</p>
              <dl className="mt-4 space-y-4">
                {contactDetails.map((detail) => (
                  <div key={detail.label} className="flex items-start gap-3">
                    <detail.icon className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                    <div>
                      <dt className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{detail.label}</dt>
                      <dd className="text-sm text-foreground">
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="underline underline-offset-4 hover:opacity-80"
                            target={detail.href.startsWith("http") ? "_blank" : undefined}
                            rel={detail.href.startsWith("http") ? "noreferrer" : undefined}
                          >
                            {detail.value}
                          </a>
                        ) : (
                          detail.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] border border-border/60 bg-background/80 p-8 shadow-lg">
          <ContactForm mailto={PROFILE.socials.email} />
        </div>
      </Section>
    </div>
  );
}

export default ContactPage;
