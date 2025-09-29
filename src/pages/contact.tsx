import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { PROFILE } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";

export function ContactPage() {
  usePageMetadata({
    title: "Contact — Frédéric Tischler",
    description: "Parlons de votre projet: Angular, Go, TypeScript, Java, temps réel, modernisation d’apps métier.",
    image: "/assets/social/contact.svg",
  });

  return (
    <div className="space-y-24 pb-20 pt-36">
      <Section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Contact</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Travaillons ensemble</h1>
          <p className="text-muted-foreground">
            Un besoin de moderniser une application métier, de structurer une base de composants Angular ou d’intégrer du
            temps réel ?
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
