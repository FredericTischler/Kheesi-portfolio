import { Instagram, Linkedin, Mail } from "lucide-react";

import { useMemo } from "react";

import { getProfile } from "@/data/profile";
import { GitHubIcon } from "@/components/icons";
import { useLocale } from "@/i18n/LocaleProvider";
import { useTranslations } from "@/i18n/useTranslations";

export function Footer() {
  const { locale } = useLocale();
  const profile = useMemo(() => getProfile(locale), [locale]);
  const copy = useTranslations("footer");
  const socials = [
    { label: "GitHub", href: profile.socials.github, icon: GitHubIcon },
    { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
    { label: "Instagram", href: profile.socials.instagram, icon: Instagram },
    { label: "Email", href: profile.socials.email, icon: Mail },
  ].filter((social) => Boolean(social.href));

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/70 py-10 backdrop-blur-xl">
      <div className="container flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-lg text-foreground">Frédéric Tischler</p>
          <p className="text-xs text-muted-foreground">{copy.rights.replace("{{year}}", String(year))}</p>
        </div>
        <div className="flex items-center gap-3">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition hover:-translate-y-0.5 hover:text-primary"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
