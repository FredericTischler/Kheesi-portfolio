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

const FORMATION = [
  {
    title: "Licence Informatique",
    description:
      "Bases solides en algorithmique, conception objet et Java — mon langage principal depuis mes études.",
  },
  {
    title: "Zone01",
    description:
      "Formation par projets intensifs : pair-programming, sprints et mise en production rapide d’applications web.",
  },
];

export function AboutPage() {
  usePageMetadata({
    title: "À propos",
    description:
      "Parcours de Frédéric Tischler : licence informatique, Zone01, modernisation d’applications Java/Angular.",
  });

  const orderedSkills = (() => {
    const list = [...PROFILE.skills];
    const javaIndex = list.findIndex((skill) => skill.toLowerCase() === "java");
    if (javaIndex > 0) {
      const [java] = list.splice(javaIndex, 1);
      list.unshift(java);
    }
    return list;
  })();

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
              Après une licence d’informatique axée sur la théorie et l'algorithmie, j’ai intégré Zone01 pour renforcer mes
              réflexes projet : pair-programming, feedback continu et livraison incrémentale. Cette double culture me
              permet de plonger dans les détails métier tout en gardant une vision produit.
            </p>
            <p className="text-muted-foreground">
              Aujourd’hui, je modernise des applications métier en Java + Angular chez WeNégoce et j’ai amorcé la même
              transition chez Développement Informatique International. Je compose des bibliothèques de composants,
              structure des API en lecture seule et garantis la cohérence UX entre les modules.
            </p>
            <p className="text-muted-foreground">
              J’aime croiser design system, data visualisation et performance. Mes inspirations viennent autant des
              dashboards financiers que des expériences d’IA et des produits craftés autour des besoins utilisateurs.
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
                {orderedSkills.map((skill, index) => (
                  <TechBadge key={skill} label={skill} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">Parcours en deux temps</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {FORMATION.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
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
