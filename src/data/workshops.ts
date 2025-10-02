type WorkshopResource = {
  image?: string;
  buttons?: Array<{
    label: string;
    href: string;
  }>;
};

export type Workshop = {
  slug: string;
  title: string;
  duration: string;
  objectives: string[];
  program: string[];
  deliverables: string[];
  audience: string;
  resources?: WorkshopResource;
};

export const WORKSHOPS: Workshop[] = [
  {
    slug: "angular-bootcamp",
    title: "Angular Component Library Bootcamp",
    duration: "½ journée",
    objectives: [
      "Créer une base de composants Angular typés",
      "Factoriser les formulaires",
      "Définir conventions de code",
    ],
    program: [
      "Audit du design system existant",
      "Mise en place d’un module partagé",
      "Tests unitaires ciblés",
    ],
    deliverables: [
      "Starter kit Angular",
      "Guide de naming",
      "Checklist d’intégration CI",
    ],
    audience: "Équipe frontend, tech lead",
    resources: {
      image: "/assets/workshops/angular-bootcamp-cover.svg",
      buttons: [
        {
          label: "Télécharger le pack complet",
          href: "/assets/workshops/angular-bootcamp-pack.zip",
        },
      ],
    },
  },
  {
    slug: "modernisation-legacy",
    title: "Modernisation Legacy → Web",
    duration: "2h",
    objectives: [
      "Diagnostiquer une appli AS400/Java Swing",
      "Définir l’architecture cible (Hexagonale, Spring Boot, Angular)",
    ],
    program: [
      "Mapping des flux",
      "Identification des quick wins",
      "Plan de migration DB2 → MySQL",
    ],
    deliverables: [
      "Mind-map architecture cible",
      "Feuille de route en 3 itérations",
    ],
    audience: "Équipe backend, architecte, chef de projet",
    resources: {
      image: "/assets/workshops/modernisation-legacy-cover.svg",
      buttons: [
        {
          label: "Télécharger le pack complet",
          href: "/assets/workshops/modernisation-legacy-pack.zip",
        },
      ],
    },
  },
  {
    slug: "ci-cd-qualite",
    title: "CI/CD & Qualité",
    duration: "1h30",
    objectives: [
      "Mettre en place pipelines lint/test/build",
      "Définir conventions de code",
      "Produire documentation utile",
    ],
    program: [
      "Revue d’un pipeline existant",
      "Définition des métriques (coverage, revues)",
      "Checklist de code review",
    ],
    deliverables: [
      "Template GitHub Actions",
      "Guide de revue",
      "Tableau Kanban de suivi",
    ],
    audience: "Équipe full-stack, tech lead, QA",
    resources: {
      image: "/assets/workshops/ci-cd-cover.svg",
      buttons: [
        {
          label: "Télécharger le pack complet",
          href: "/assets/workshops/ci-cd-pack.zip",
        },
      ],
    },
  },
];
