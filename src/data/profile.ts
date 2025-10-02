import type { Locale } from "@/i18n/config";

const socialInstagram = "";

type SocialLinks = {
  github: string;
  linkedin: string;
  instagram?: string;
  email: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  stack: string[];
  description: string;
  highlights: string[];
  impact_metrics: string[];
};

export type Profile = {
  name: string;
  role: string;
  tagline_short: string;
  location: string;
  socials: SocialLinks;
  skills_primary: string[];
  skills_secondary: string[];
  interests: string[];
  bio_short: string;
  bio_long: string;
  seo_keywords: string[];
  skills: string[];
  experiences: Experience[];
};

const SOCIALS: SocialLinks = {
  github: "https://github.com/FredericTischler",
  linkedin: "https://www.linkedin.com/in/fr%C3%A9d%C3%A9ric-tischler-64b588305/",
  instagram: socialInstagram,
  email: "mailto:contact@frederictischler.dev",
};

const PROFILE_BY_LOCALE: Record<Locale, Profile> = {
  fr: {
    name: "Frédéric Tischler",
    role: "Développeur Full-Stack (Angular • Go • TypeScript • Java)",
    tagline_short: "Je conçois des applications web modernes, performantes et maintenables.",
    location: "France",
    socials: SOCIALS,
    skills_primary: ["Angular", "TypeScript", "Go", "Java", "SQL (SQLite/PostgreSQL)", "Docker", "HTML/CSS"],
    skills_secondary: ["WebSockets", "Architecture modulaire", "Tests", "CI/CD", "UX pragmatique"],
    interests: ["IA appliquée", "produits web", "optimisation perf/UX", "outillage développeur"],
    bio_short:
      "Développeur full-stack en alternance chez WeNégoce (Java/Angular). Je modernise des applications métier en applications web robustes, en privilégiant une architecture claire et des composants génériques réutilisables.",
    bio_long:
      "Alternant chez WeNégoce et étudiant à l’école Zone01, je conçois des applications web modernes en Java/Angular et Go/TypeScript. J’accorde une place centrale à la lisibilité du code, à la réutilisabilité des composants et à la performance côté front comme back. Mes projets d’école m’ont formé au temps réel (WebSockets), aux algorithmes de graphes, ainsi qu’au prototypage rapide d’outils.",
    seo_keywords: [
      "Frédéric Tischler",
      "Développeur full-stack",
      "Angular",
      "Go",
      "TypeScript",
      "Java",
      "WeNégoce",
      "Zone01",
    ],
    skills: [
      "Angular",
      "TypeScript",
      "Go",
      "Java",
      "SQL (SQLite/PostgreSQL)",
      "Docker",
      "HTML/CSS",
      "React",
      "Python",
      "MySql",
      "DB2",
      "AS400",
      "WebSockets",
      "Architecture modulaire",
      "Tests",
      "CI/CD",
      "UX pragmatique",
      "Documentation",
      "Conception",
    ],
    experiences: [
      {
        id: "wenegoce",
        company: "WeNégoce",
        role: "Alternant Développeur Full-Stack",
        period: "Juin 2025 — présent",
        stack: [
          "Angular",
          "TypeScript",
          "Java",
          "Spring Boot",
          "Architecture hexagonale",
          "AS400",
          "DB2",
          "SQL",
          "Kanban",
          "Chiffrage",
          "Études fonctionnelles",
          "Études techniques",
          "CI/CD",
          "Documentation",
          "Git",
        ],
        description:
          "Modernisation d’une application métier en Angular/Java avec une base de composants réutilisables et des conventions partagées.",
        highlights: [
          "Modernisation d’une application métier en application web Angular/Java, architecture modulaire et composants génériques réutilisables.",
          "Améliorations UX/performance (chargements asynchrones, pagination, formulaires typés, accessibilité).",
          "Mise en place de conventions de code et de composants partagés pour accélérer le développement.",
        ],
        impact_metrics: [
          "Réduction du temps de développement des écrans récurrents grâce aux composants génériques.",
          "Diminution des erreurs de saisie via formulaires typés et validations.",
        ],
      },
      {
        id: "dii",
        company: "Développement Informatique International",
        role: "Stagiaire (2 mois) puis CDD (1 mois) — Développeur",
        period: "Avril 2023 — Juillet 2023",
        stack: [
          "Java",
          "Angular",
          "Spring Boot",
          "DB2 AS400",
          "MySql",
          "Conception",
          "Documentation",
          "Intégration",
          "Git",
        ],
        description:
          "Début de refonte de l’application métier en application web Java/Angular avec connexion DB2 AS400 et création d’une base MySql dédiée. Travail de conception en amont du développement et rédaction de documentation.",
        highlights: [
          "Participation à la refonte d’écrans clés en Angular/Java.",
          "Contribution à une base de composants partagés (grilles, formulaires, modales).",
          "Revue de code et documentation d’usage.",
        ],
        impact_metrics: ["Uniformisation des écrans et meilleure maintenabilité grâce à la factorisation de composants."],
      },
      {
        id: "zone01",
        company: "Zone01",
        role: "Parcours développeur — Go, JavaScript/Web, Rust (spécialisations Java, IA, cloud/devops...)",
        period: "Formation en cours",
        stack: [
          "Go",
          "JavaScript",
          "Rust",
          "Java",
          "Cloud",
          "Méthodes agiles",
          "Spring Boot",
          "React",
          "Algorithmique",
          "DevOps",
          "Documentation",
          "Architecture logicielle",
          "Base de données",
          "Git",
        ],
        description:
          "Parcours intensif axé projets : temps réel, graphes, programmation orientée objet et outillage développeur.",
        highlights: [
          "Pratique intensive par projets: temps réel (WebSockets), algorithmes, POO Java, outillage.",
          "Méthodologies agiles, revues de code, documentation.",
        ],
        impact_metrics: [],
      },
      {
        id: "licence",
        company: "Licence Informatique",
        role: "Parcours universitaire (3 ans)",
        period: "2019 — 2022",
        stack: [
          "Algorithmique",
          "Programmation impérative",
          "C",
          "Java",
          "Bases de données",
          "POO",
          "Programmation fonctionnelle",
          "Théorie des langages",
          "Théorie des graphes",
          "Architecture logicielle",
        ],
        description:
          "Formation initiale alliant algorithmique, POO Java, structures de données et bases de données pour poser un socle solide.",
        highlights: [
          "Conception et développement d’applications Java en mode projet.",
          "Travaux dirigés sur structures de données, graphes et complexité.",
          "Projets C, Python et Ocaml mêlant théorie des langages, compilation et programmation fonctionnelle.",
          "Mise en pratique des bases de données relationnelles à travers des projets complets.",
        ],
        impact_metrics: [],
      },
    ],
  },
  en: {
    name: "Frédéric Tischler",
    role: "Full-Stack Developer (Angular • Go • TypeScript • Java)",
    tagline_short: "I build modern, reliable web applications with a pragmatic full-stack mindset.",
    location: "France",
    socials: SOCIALS,
    skills_primary: ["Angular", "TypeScript", "Go", "Java", "SQL (SQLite/PostgreSQL)", "Docker", "HTML/CSS"],
    skills_secondary: ["WebSockets", "Modular architecture", "Testing", "CI/CD", "Pragmatic UX"],
    interests: ["Applied AI", "Web products", "Performance & UX optimisation", "Developer tooling"],
    bio_short:
      "Full-stack developer apprentice at WeNégoce (Java/Angular). I modernise legacy business apps into robust web platforms with clear architecture and reusable components.",
    bio_long:
      "Apprentice at WeNégoce and student at Zone01, I design modern web applications in Java/Angular and Go/TypeScript. I focus on readability, reusable components and performance on both front-end and back-end. School projects trained me on real-time systems (WebSockets), graph algorithms and rapid tooling.",
    seo_keywords: [
      "Frédéric Tischler",
      "Full-stack developer",
      "Angular",
      "Go",
      "TypeScript",
      "Java",
      "WeNégoce",
      "Zone01",
    ],
    skills: [
      "Angular",
      "TypeScript",
      "Go",
      "Java",
      "SQL (SQLite/PostgreSQL)",
      "Docker",
      "HTML/CSS",
      "React",
      "Python",
      "MySQL",
      "DB2",
      "AS400",
      "WebSockets",
      "Modular architecture",
      "Testing",
      "CI/CD",
      "Pragmatic UX",
      "Documentation",
      "System design",
    ],
    experiences: [
      {
        id: "wenegoce",
        company: "WeNégoce",
        role: "Full-Stack Developer Apprentice",
        period: "June 2025 — present",
        stack: [
          "Angular",
          "TypeScript",
          "Java",
          "Spring Boot",
          "Hexagonal architecture",
          "AS400",
          "DB2",
          "SQL",
          "Kanban",
          "Estimation",
          "Business analysis",
          "Technical analysis",
          "CI/CD",
          "Documentation",
          "Git",
        ],
        description:
          "Modernising a business-critical Angular/Java application with reusable components and shared conventions.",
        highlights: [
          "Turned the legacy business app into a modular Angular/Java web solution with reusable generic components.",
          "Improved UX and performance (async loading, pagination, typed forms, accessibility).",
          "Introduced coding standards and shared components to speed up delivery.",
        ],
        impact_metrics: [
          "Cut recurrent screen delivery time thanks to generic component patterns.",
          "Reduced data-entry errors via typed forms and validation rules.",
        ],
      },
      {
        id: "dii",
        company: "Développement Informatique International",
        role: "Intern (2 months) then fixed-term contract (1 month) — Developer",
        period: "April 2023 — July 2023",
        stack: [
          "Java",
          "Angular",
          "Spring Boot",
          "DB2 AS400",
          "MySQL",
          "Design",
          "Documentation",
          "Integration",
          "Git",
        ],
        description:
          "Kickstarted the migration of a business system to a Java/Angular web app with DB2 AS400 integration and a dedicated MySQL base, with upfront design work and documentation.",
        highlights: [
          "Rebuilt key screens with Angular/Java components.",
          "Helped shape a shared component library (grids, forms, modals).",
          "Contributed to code reviews and user-facing documentation.",
        ],
        impact_metrics: ["Unified UI and improved maintainability through component factorisation."],
      },
      {
        id: "zone01",
        company: "Zone01",
        role: "Developer track — Go, JavaScript/Web, Rust (Java, AI, cloud/devops specialisations)",
        period: "Ongoing training",
        stack: [
          "Go",
          "JavaScript",
          "Rust",
          "Java",
          "Cloud",
          "Agile methods",
          "Spring Boot",
          "React",
          "Algorithms",
          "DevOps",
          "Documentation",
          "Software architecture",
          "Databases",
          "Git",
        ],
        description:
          "Project-driven bootcamp with real-time systems, graph algorithms, object-oriented design and developer tooling.",
        highlights: [
          "Hands-on projects: real-time WebSockets, algorithms, Java OOP, tooling.",
          "Agile rituals, code reviews and documentation practice.",
        ],
        impact_metrics: [],
      },
      {
        id: "licence",
        company: "Bachelor in Computer Science",
        role: "Three-year academic curriculum",
        period: "2019 — 2022",
        stack: [
          "Algorithms",
          "Imperative programming",
          "C",
          "Java",
          "Databases",
          "OOP",
          "Functional programming",
          "Language theory",
          "Graph theory",
          "Software architecture",
        ],
        description:
          "Academic foundation covering algorithms, Java OOP, data structures and databases for a solid baseline.",
        highlights: [
          "Designed and developed Java applications in project settings.",
          "Workshops on data structures, graph theory and complexity.",
          "Projects in C, Python and OCaml touching compilers and functional programming.",
          "Hands-on relational database projects end-to-end.",
        ],
        impact_metrics: [],
      },
    ],
  },
};

export function getProfile(locale: Locale): Profile {
  return PROFILE_BY_LOCALE[locale] ?? PROFILE_BY_LOCALE.fr;
}

export const PROFILE = PROFILE_BY_LOCALE.fr;

export const PROFILE_LOCALES = PROFILE_BY_LOCALE;
