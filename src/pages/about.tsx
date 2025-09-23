import { Section } from "@/components/Section";
import { TechBadge } from "@/components/TechBadge";
import { PROFILE } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";

const VALUES = [
  {
    title: "Qualité",
    description:
      "Code maintenable, revues rigoureuses et automatisation des tests pour sécuriser les évolutions.",
  },
  {
    title: "Lisibilité",
    description:
      "Architecture claire, documentation concise et composants réutilisables pour accélérer les équipes.",
  },
  {
    title: "Performance",
    description:
      "Optimisation des temps de chargement, budgets Lighthouse suivis et instrumentation pour monitorer.",
  },
];

export function AboutPage() {
  usePageMetadata({
    title: "À propos",
    description:
      "Bio de Frédéric Tischler : parcours Zone01, compétences full-stack Go/TypeScript, valeurs de développement.",
  });

  return (
    <div className="space-y-24 pb-20 pt-36">
      <Section className="space-y-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">À propos</p>
            <h1 className="text-4xl font-semibold md:text-5xl">
              Curieux, orienté produit et passionné par la création d’outils utiles.
            </h1>
            <p className="text-muted-foreground">
              Formé à Zone01, je m’intéresse à la fois aux problématiques backend (scalabilité, data) et à
              l’expérience utilisateur. Les projets d’IA, de finance et d’UX me stimulent particulièrement.
              J’aime explorer les interactions entre design système, data visualisation et performance.
            </p>
            <p className="text-muted-foreground">
              Aujourd’hui je me concentre sur des stacks Go/TypeScript/React en gardant un œil sur l’outillage
              DevOps et la qualité : tests end-to-end, observabilité et documentation vivante.
            </p>
          </div>
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
              <h2 className="text-lg font-semibold">Centres d’intérêt</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {PROFILE.interests.join(" · ")}
              </p>
            </div>
            <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
              <h2 className="text-lg font-semibold">Compétences clés</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {PROFILE.skills.map((skill, index) => (
                  <TechBadge key={skill} label={skill} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Valeurs de développement</h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-3 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default AboutPage;
