import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { PROFILE } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";

export function ContactPage() {
  usePageMetadata({
    title: "Contact",
    description: "Contactez Frédéric Tischler pour vos projets web : formulaire et email direct.",
  });

  return (
    <div className="space-y-24 pb-20 pt-36">
      <Section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Contact</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Parlons de votre prochain produit.</h1>
          <p className="text-muted-foreground">
            Besoin d’une refonte, d’un outil interne ou d’un accompagnement long terme ? Laissez un message
            et je reviens vers vous sous 24h. Mentionnez le contexte, les objectifs et le délai envisagé.
          </p>
        </div>
        <div className="rounded-[2rem] border border-border/60 bg-background/80 p-8 shadow-lg">
          <ContactForm mailto={PROFILE.socials.email} />
        </div>
      </Section>
    </div>
  );
}

export default ContactPage;
