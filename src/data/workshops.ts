import type { Locale } from "@/i18n/config";

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

const BASE_RESOURCES: Record<string, WorkshopResource | undefined> = {
  "angular-bootcamp": {
    image: "/assets/workshops/angular-bootcamp-cover.svg",
    buttons: [
      {
        label: "Télécharger le pack complet",
        href: "/assets/workshops/angular-bootcamp-pack.zip",
      },
    ],
  },
  "modernisation-legacy": {
    image: "/assets/workshops/modernisation-legacy-cover.svg",
    buttons: [
      {
        label: "Télécharger le pack complet",
        href: "/assets/workshops/modernisation-legacy-pack.zip",
      },
    ],
  },
  "ci-cd-qualite": {
    image: "/assets/workshops/ci-cd-cover.svg",
    buttons: [
      {
        label: "Télécharger le pack complet",
        href: "/assets/workshops/ci-cd-pack.zip",
      },
    ],
  },
};

const WORKSHOPS_BY_LOCALE: Record<Locale, Workshop[]> = {
  fr: [
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
      resources: BASE_RESOURCES["angular-bootcamp"],
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
      resources: BASE_RESOURCES["modernisation-legacy"],
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
      resources: BASE_RESOURCES["ci-cd-qualite"],
    },
  ],
  en: [
    {
      slug: "angular-bootcamp",
      title: "Angular Component Library Bootcamp",
      duration: "Half-day",
      objectives: [
        "Build a typed Angular component foundation",
        "Factorise complex forms",
        "Lock in coding conventions",
      ],
      program: [
        "Audit of the existing design system",
        "Set up a shared Angular module",
        "Targeted unit tests",
      ],
      deliverables: [
        "Angular starter kit",
        "Naming guidelines",
        "CI integration checklist",
      ],
      audience: "Front-end squad, tech lead",
      resources: {
        image: BASE_RESOURCES["angular-bootcamp"]?.image,
        buttons: [
          {
            label: "Download the full pack",
            href: "/assets/workshops/angular-bootcamp-pack.zip",
          },
        ],
      },
    },
    {
      slug: "modernisation-legacy",
      title: "Legacy Modernisation → Web",
      duration: "2h",
      objectives: [
        "Assess an AS400/Java Swing application",
        "Define the target architecture (Hexagonal, Spring Boot, Angular)",
      ],
      program: [
        "Flow mapping",
        "Identifying quick wins",
        "DB2 → MySQL migration plan",
      ],
      deliverables: [
        "Target architecture mind map",
        "Three-iteration roadmap",
      ],
      audience: "Backend team, architect, project lead",
      resources: {
        image: BASE_RESOURCES["modernisation-legacy"]?.image,
        buttons: [
          {
            label: "Download the full pack",
            href: "/assets/workshops/modernisation-legacy-pack.zip",
          },
        ],
      },
    },
    {
      slug: "ci-cd-qualite",
      title: "CI/CD & Quality",
      duration: "1h30",
      objectives: [
        "Roll out lint/test/build pipelines",
        "Define coding standards",
        "Produce actionable documentation",
      ],
      program: [
        "Review an existing pipeline",
        "Define key metrics (coverage, reviews)",
        "Code review checklist",
      ],
      deliverables: [
        "GitHub Actions template",
        "Review guide",
        "Kanban follow-up board",
      ],
      audience: "Full-stack team, tech lead, QA",
      resources: {
        image: BASE_RESOURCES["ci-cd-qualite"]?.image,
        buttons: [
          {
            label: "Download the full pack",
            href: "/assets/workshops/ci-cd-pack.zip",
          },
        ],
      },
    },
  ],
};

export function getWorkshops(locale: Locale): Workshop[] {
  return WORKSHOPS_BY_LOCALE[locale] ?? WORKSHOPS_BY_LOCALE.fr;
}

export const WORKSHOPS = WORKSHOPS_BY_LOCALE.fr;

export const WORKSHOP_LOCALES = WORKSHOPS_BY_LOCALE;
