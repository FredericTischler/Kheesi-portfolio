import { Building2, Calendar, Sparkles } from "lucide-react";

import { Section } from "@/components/Section";
import { TechBadge } from "@/components/TechBadge";
import { PROFILE } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";

export function ExperiencePage() {
  const { company } = PROFILE;
  usePageMetadata({
    title: "Expérience",
    description: "Expérience chez WeNégoce : développement React/TypeScript, modernisation d’applications métier.",
  });

  return (
    <div className="space-y-24 pb-20 pt-36">
      <Section className="space-y-10">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Expérience</p>
          <h1 className="text-4xl font-semibold md:text-5xl">WeNégoce</h1>
          <p className="max-w-3xl text-muted-foreground">
            Je rejoins l’équipe WeNégoce pour construire des outils métier fiables et intuitifs. Mon rôle couvre
            la création de composants partagés, la modernisation d’applications et l’amélioration continue des
            performances.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Building2 className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold text-foreground">{company.name}</p>
                <p className="text-xs uppercase tracking-[0.3em]">{company.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> Depuis {new Date(company.start).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
            </div>
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">Ce que je construis</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {company.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <Sparkles className="mt-1 h-4 w-4 text-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
            <h2 className="text-lg font-semibold">Stack principale</h2>
            <div className="flex flex-wrap gap-3">
              {company.stack.map((tech, index) => (
                <TechBadge key={tech} label={tech} index={index} />
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default ExperiencePage;
