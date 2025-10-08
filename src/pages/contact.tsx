import { CalendarDays, Check, Clock, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { getProfile } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";
import { useLocale } from "@/i18n/LocaleProvider";
import { useTranslations } from "@/i18n/useTranslations";

export function ContactPage() {
  const { locale } = useLocale();
  const copy = useTranslations("contact");
  const focusAreas = copy.focusAreas;
  const prepItems = copy.prepItems;
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
          <ContactForm mailto={profile.socials.email} />
        </div>
      </Section>
    </div>
  );
}

export default ContactPage;
