import { Building2, Calendar, Sparkles } from "lucide-react";

import { Section } from "@/components/Section";
import { TechBadge } from "@/components/TechBadge";
import { PROFILE } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";

function formatPeriod(start?: string, end?: string) {
  if (!start) return "";
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : null;
  const startLabel = startDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  if (!endDate) return `Depuis ${startLabel}`;
  const endLabel = endDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  return `${startLabel} – ${endLabel}`;
}

export default function ExperiencePage() {
  const experiences = PROFILE.experiences;
  usePageMetadata({
    title: "Expérience",
    description:
      "Refonte d’applications métier chez WeNégoce et Développement Informatique International (Java + Angular).",
    image: "/assets/social/experience.svg",
  });

  return (
    <div className="space-y-24 pb-20 pt-36">
      <Section className="space-y-10">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Expérience</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Modernisation d’applications métier</h1>
          <p className="max-w-3xl text-muted-foreground">
            Java est le langage que je maîtrise le plus. Je l’utilise au quotidien pour refondre des outils métiers en
            applications web full Angular/Java. Mon approche : poser un socle réutilisable, concevoir des composants
            génériques et accompagner les équipes dans la transition.
          </p>
        </div>
        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <div className="space-y-6 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Building2 className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{experience.company}</p>
                    <p className="text-xs uppercase tracking-[0.3em]">{experience.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" /> {formatPeriod(experience.period?.start, experience.period?.end)}
                </div>
                <p className="text-sm text-muted-foreground">{experience.description}</p>
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">Mission clé</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <Sparkles className="mt-1 h-4 w-4 text-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="space-y-4 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
                <h2 className="text-lg font-semibold">Stack utilisée</h2>
                <div className="flex flex-wrap gap-3">
                  {experience.stack.map((tech, badgeIndex) => (
                    <TechBadge key={`${experience.id}-${tech}`} label={tech} index={badgeIndex + index * 10} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
