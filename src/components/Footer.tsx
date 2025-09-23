import { Github, Linkedin, Mail } from "lucide-react";

import { PROFILE } from "@/data/profile";

const socials = [
  { label: "GitHub", href: PROFILE.socials.github, icon: Github },
  { label: "LinkedIn", href: PROFILE.socials.linkedin, icon: Linkedin },
  { label: "Email", href: PROFILE.socials.email, icon: Mail },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/70 py-10 backdrop-blur-xl">
      <div className="container flex flex-col gap-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-lg text-foreground">Frédéric Tischler</p>
          <p className="text-xs text-muted-foreground">© {year} · Tous droits réservés.</p>
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
