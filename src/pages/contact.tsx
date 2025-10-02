import { CalendarDays, Check, Clock, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { getProfile } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";

const CONTACT_FOCUS_AREAS: Record<Locale, Array<{ title: string; description: string }>> = {
  fr: [
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
  ],
  en: [
    {
      title: "Modernising legacy apps",
      description: "Audit existing screens, define the Angular/Java target architecture and build a progressive migration roadmap.",
    },
    {
      title: "Angular component foundations",
      description: "Design tokens, shared components, review conventions and ready-to-share documentation.",
    },
    {
      title: "Pragmatic CI/CD",
      description: "Lint/test/build pipelines, automated releases and a quality checklist your team can activate fast.",
    },
  ],
};

const CONTACT_PREP_ITEMS: Record<Locale, string[]> = {
  fr: [
    "Votre stack actuelle et la taille de l’équipe",
    "L’objectif ou l’irritant principal à résoudre",
    "L’échéance ou jalon business à tenir",
  ],
  en: [
    "Your current stack and team size",
    "The goal or main pain point to tackle",
    "Any deadline or business milestone to meet",
  ],
};

const CONTACT_COPY: Record<Locale, {
  head: { title: string; description: string };
  eyebrow: string;
  title: string;
  paragraphs: string[];
  focusTitle: string;
  prepTitle: string;
  coordsTitle: string;
  responseValue: string;
  availabilityValue: string;
  contactLabels: {
    email: string;
    linkedin: string;
    response: string;
    location: string;
    availability: string;
  };
}> = {
  fr: {
    head: {
      title: "Contact — Frédéric Tischler",
      description: "Parlons de votre projet: Angular, Go, TypeScript, Java, temps réel, modernisation d’apps métier.",
    },
    eyebrow: "Contact",
    title: "Travaillons ensemble",
    paragraphs: [
      "Modernisation d’app legacy, base de composants Angular, pipelines CI/CD pragmatiques ou intégration temps réel : parlons de votre contexte et de la valeur à délivrer rapidement.",
      "Dites-m’en plus sur votre équipe, les irritants rencontrés et l’impact recherché. Je reviens vers vous avec une première analyse et des pistes d’actions concrètes.",
    ],
    focusTitle: "Ce que je débloque rapidement",
    prepTitle: "Pour préparer notre échange",
    coordsTitle: "Coordonnées",
    responseValue: "Sous 48h ouvrées",
    availabilityValue: "Créneaux 9h – 18h CET",
    contactLabels: {
      email: "Email direct",
      linkedin: "LinkedIn",
      response: "Réponse",
      location: "Basé à",
      availability: "Disponibilités",
    },
  },
  en: {
    head: {
      title: "Contact — Frédéric Tischler",
      description: "Let’s talk about your project: Angular, Go, TypeScript, Java, real-time, legacy modernisation.",
    },
    eyebrow: "Contact",
    title: "Let’s work together",
    paragraphs: [
      "Legacy modernisation, Angular component foundations, pragmatic CI/CD or real-time features: tell me about your context and the value you want to unlock quickly.",
      "Share a bit about your team, current blockers and expected impact. I’ll follow up with an initial analysis and concrete next steps.",
    ],
    focusTitle: "Where I add value fast",
    prepTitle: "Before we talk",
    coordsTitle: "Contact details",
    responseValue: "Within 48 business hours",
    availabilityValue: "Slots 9am – 6pm CET",
    contactLabels: {
      email: "Direct email",
      linkedin: "LinkedIn",
      response: "Response time",
      location: "Based in",
      availability: "Availability",
    },
  },
};

export function ContactPage() {
  const { locale } = useLocale();
  const copy = CONTACT_COPY[locale];
  const focusAreas = CONTACT_FOCUS_AREAS[locale];
  const prepItems = CONTACT_PREP_ITEMS[locale];
  const profile = getProfile(locale);

  usePageMetadata({
    title: copy.head.title,
    description: copy.head.description,
    image: "/assets/social/contact.svg",
  });

  const emailAddress = profile.socials.email.replace(/^mailto:/, "");

  const linkedinUrl = profile.socials.linkedin;
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
      label: copy.contactLabels.email,
      value: emailAddress,
      href: profile.socials.email,
      icon: Mail,
    },
    {
      label: copy.contactLabels.response,
      value: copy.responseValue,
      icon: Clock,
    },
    {
      label: copy.contactLabels.location,
      value: profile.location,
      icon: MapPin,
    },
    {
      label: copy.contactLabels.availability,
      value: copy.availabilityValue,
      icon: CalendarDays,
    },
  ];

  if (linkedinUrl && linkedinDisplay) {
    contactDetails.splice(1, 0, {
      label: copy.contactLabels.linkedin,
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
            <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">{copy.eyebrow}</p>
            <h1 className="text-4xl font-semibold md:text-5xl">{copy.title}</h1>
            <div className="space-y-4 text-muted-foreground">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-border/60 bg-background/80 p-6 shadow-sm md:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">{copy.focusTitle}</p>
              <ul className="mt-4 space-y-4">
                {focusAreas.map((focus) => (
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
                {copy.prepTitle}
              </div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {prepItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-[6px] h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-border/60 bg-background/80 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">{copy.coordsTitle}</p>
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
          <ContactForm mailto={profile.socials.email} locale={locale} />
        </div>
      </Section>
    </div>
  );
}

export default ContactPage;
