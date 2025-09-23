import { Github, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const socials = [
  {
    href: "https://www.instagram.com/your-handle",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.linkedin.com/in/your-handle",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "https://github.com/your-handle",
    label: "GitHub",
    icon: Github,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-background/70 py-10 backdrop-blur-2xl">
      <div className="container flex flex-col items-center justify-between gap-6 text-sm text-muted-foreground md:flex-row">
        <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
          <Link to="/" className="font-heading text-lg text-foreground">
            Kheesi
          </Link>
          <p className="text-xs text-muted-foreground">
            Portfolio RedBubble · {year}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {socials.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
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
