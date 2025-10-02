import { useMemo } from "react";

import { Section } from "@/components/Section";
import { TechBadge } from "@/components/TechBadge";
import { getProfile } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";

const ABOUT_COPY: Record<Locale, {
  head: { title: string; description: string };
  eyebrow: string;
  heroTitle: string;
  intro: string[];
  formation: Array<{ title: string; description: string }>;
  values: Array<{ title: string; description: string }>;
  interestsTitle: string;
  skillsTitle: string;
  formationTitle: string;
  valuesTitle: string;
}> = {
  fr: {
    head: {
      title: "À propos — Frédéric Tischler",
      description:
        "Full-stack: Angular, Go, TypeScript, Java. Architecture modulaire, composants génériques, performance et accessibilité.",
    },
    eyebrow: "À propos",
    heroTitle: "Je suis Frédéric, développeur full-stack chez WeNégoce.",
    intro: [
      "Ma licence informatique m’a donné un socle profond en algorithmique, POO Java et bases de données.",
      "J’ai enchaîné avec un stage puis un CDD chez Développement Informatique International où j’ai refondu des écrans Angular/Java, factorisé des composants partagés et documenté les usages.",
      "À Zone01, je poursuis une formation intensive par projets : WebSockets temps réel, graphes, outillage devops, documentation. Cette cadence forge mes réflexes full-stack.",
      "Aujourd’hui en alternance chez WeNégoce, je modernise une application métier avec un socle Angular/Java, des composants réutilisables et un pipeline CI/CD solide tout en accompagnant l’équipe sur les conventions de code et la documentation.",
    ],
    formation: [
      {
        title: "Licence Informatique",
        description: "Structures de données, algorithmique et POO Java pour un socle robuste.",
      },
      {
        title: "Zone01",
        description: "Projets intensifs : temps réel (WebSockets), algorithmes, outillage et méthodos agiles.",
      },
    ],
    formationTitle: "Parcours en deux temps",
    valuesTitle: "Valeurs de développement",
    values: [
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
    ],
    interestsTitle: "Centres d’intérêt",
    skillsTitle: "Compétences clés",
  },
  en: {
    head: {
      title: "About — Frédéric Tischler",
      description:
        "Full-stack developer: Angular, Go, TypeScript, Java. Modular architecture, reusable components, performance & accessibility.",
    },
    eyebrow: "About",
    heroTitle: "I’m Frédéric, a full-stack developer at WeNégoce.",
    intro: [
      "My computer science degree gave me a solid foundation in algorithms, Java OOP and databases.",
      "I followed up with an internship then a short contract at Développement Informatique International modernising Angular/Java screens, building shared components and writing documentation.",
      "At Zone01, I continue an intensive project-based training: real-time WebSockets, graphs, tooling and documentation. The pace sharpens my full-stack reflexes.",
      "Today as an apprentice at WeNégoce, I modernise a business application with an Angular/Java backbone, reusable components and a reliable CI/CD pipeline while helping the team align on code conventions and documentation.",
    ],
    formation: [
      {
        title: "Bachelor in Computer Science",
        description: "Algorithms, data structures and Java OOP for a strong foundation.",
      },
      {
        title: "Zone01",
        description: "Intensive projects: real-time (WebSockets), algorithms, tooling and agile practices.",
      },
    ],
    formationTitle: "Two-phase journey",
    valuesTitle: "Delivery values",
    values: [
      {
        title: "Favour explicit architectures",
        description: "Clear modules, services and components to keep everyone aligned.",
      },
      {
        title: "Reuse smartly",
        description: "Component libraries, forms and grids to ship fast and clean.",
      },
      {
        title: "Optimise UX",
        description: "Progressive loading, clear feedback and accessibility from day one.",
      },
      {
        title: "Support maintainability",
        description: "Coding standards, regular reviews and managed debt to last over time.",
      },
      {
        title: "Share knowledge",
        description: "Practical documentation and workshops to raise the whole team.",
      },
      {
        title: "Communicate clearly",
        description: "Regular alignment with product, business and design to stay on track together.",
      },
    ],
    interestsTitle: "Areas of interest",
    skillsTitle: "Key skills",
  },
};

export function AboutPage() {
  const { locale } = useLocale();
  const copy = ABOUT_COPY[locale];
  const profile = getProfile(locale);

  usePageMetadata({
    title: copy.head.title,
    description: copy.head.description,
    image: "/assets/social/about.svg",
  });

  const orderedSkills = useMemo(() => {
    const list = [...profile.skills];
    const javaIndex = list.findIndex((skill) => skill.toLowerCase() === "java");
    if (javaIndex > 0) {
      const [java] = list.splice(javaIndex, 1);
      list.unshift(java);
    }
    return list;
  }, [profile.skills]);

  return (
    <div className="space-y-24 pb-20 pt-36">
      <Section className="space-y-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">{copy.eyebrow}</p>
            <h1 className="text-4xl font-semibold md:text-5xl">{copy.heroTitle}</h1>
            {copy.intro.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
              <h2 className="text-lg font-semibold">{copy.interestsTitle}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{profile.interests.join(" · ")}</p>
            </div>
            <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
              <h2 className="text-lg font-semibold">{copy.skillsTitle}</h2>
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
        <h2 className="text-3xl font-semibold md:text-4xl">{copy.formationTitle}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {copy.formation.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">{copy.valuesTitle}</h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {copy.values.map((value) => (
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
