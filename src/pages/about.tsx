import { Section } from "@/components/Section";
import { TechBadge } from "@/components/TechBadge";
import { PROFILE } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";

const VALUES = [
  {
    title: "Privilégier des architectures explicites",
    description: "Modules, services et composants clairement définis pour garder le cap.",
  },
  {
    title: "Réutiliser intelligemment",
    description: "Librairie de composants, formulaires et grilles pour déployer vite et proprement.",
  },
  {
    title: "Optimiser l’UX",
    description: "Chargements progressifs, feedbacks clairs et accessibilité intégrée dès le départ.",
  },
  {
    title: "Soutenir la maintenance",
    description: "Standards de code, revue régulière et dette maîtrisée pour tenir dans la durée.",
  },
  {
    title: "Partager la connaissance",
    description: "Documentation utile et ateliers pour faire monter l’équipe en compétence.",
  },
  {
    title: "Communiquer clairement",
    description: "Alignement régulier avec produit, métier et design pour garder le cap commun.",
  },
];

const FORMATION = [
  {
    title: "Licence Informatique",
    description:
      "Structures de données, algorithmique et POO Java pour un socle robuste.",
  },
  {
    title: "Zone01",
    description:
      "Projets intensifs : temps réel (WebSockets), algorithmes, outillage et méthodos agiles.",
  },
];

export function AboutPage() {
  usePageMetadata({
    title: "À propos — Frédéric Tischler",
    description:
      "Full-stack: Angular, Go, TypeScript, Java. Architecture modulaire, composants génériques, performance et accessibilité.",
    image: "/assets/social/about.svg",
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
            <h1 className="text-4xl font-semibold md:text-5xl">Je suis Frédéric, développeur full-stack chez WeNégoce.</h1>
            <p className="text-muted-foreground">
              Ma licence informatique m’a donné un socle profond en algorithmique, POO Java et bases de données.
              J’y ai enchaîné avec un stage puis un CDD chez Développement Informatique International où j’ai refondu des
              écrans Angular/Java, factorisé des composants partagés et documenté les usages.
            </p>
            <p className="text-muted-foreground">
              À Zone01, je poursuis une formation intensive par projets : WebSockets temps réel, graphes, outillage
              devops, documentation. Cette cadence forge mes réflexes full-stack.
            </p>
            <p className="text-muted-foreground">
              Aujourd’hui en alternance chez WeNégoce, je modernise une application métier avec un socle Angular/Java,
              des composants réutilisables et un pipeline CI/CD solide tout en accompagnant l’équipe sur les conventions
              de code et la documentation.
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
