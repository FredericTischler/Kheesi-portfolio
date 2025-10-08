import type { Locale } from "@/i18n/config";

export type SkillCategoryKey = "languages" | "frontend" | "backendDevops" | "databases";

export type NavLinkId = "home" | "about" | "experience" | "projects" | "workshops" | "contact";

export type HomeMessages = {
  head: {
    title: string;
    description: string;
  };
  hero: {
    title: string;
    lead: string;
    ctaProjects: string;
    ctaContact: string;
  };
  stats: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  skillsSection: {
    eyebrow: string;
    title: string;
    description: string;
    ariaList: string;
    ariaMarquee: string;
    categories: Record<SkillCategoryKey, string>;
  };
  pillars: Array<{
    title: string;
    description: string;
  }>;
  projectsIntro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  projectActions: {
    preview: string;
    viewOnGitHub: string;
    badgesTitle: string;
    copyLink: string;
    linkCopied: string;
  };
};

export type AboutMessages = {
  head: {
    title: string;
    description: string;
  };
  eyebrow: string;
  heroTitle: string;
  intro: string[];
  formationTitle: string;
  formation: Array<{
    title: string;
    description: string;
  }>;
  valuesTitle: string;
  values: Array<{
    title: string;
    description: string;
  }>;
  interestsTitle: string;
  skillsTitle: string;
};

export type ExperienceMessages = {
  head: {
    title: string;
    description: string;
  };
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  highlightsTitle: string;
  impactTitle: string;
  stackTitle: string;
  periodLabels: {
    since: string; // expects {{date}}
    separator: string;
  };
};

export type ProjectsMessages = {
  head: {
    title: string;
    description: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  searchPlaceholder: string;
  reset: string;
  filtersAria: string;
  allProjects: string;
  resultsLabel: {
    zero: string;
    one: string;
    other: string;
  };
  noResultsTitle: string;
  noResultsDescription: string;
  listAria: string;
  cardViewLabel: string; // expects {{name}}
  viewButton: string;
  modalPlaceholder: string;
  projectActions: {
    preview: string;
    viewOnGitHub: string;
    badgesTitle: string;
    copyLink: string;
    linkCopied: string;
  };
  sortLabels: Record<"recent" | "alphabetical", string>;
};

export type WorkshopsMessages = {
  head: {
    title: string;
    description: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
  };
  focusLabel: string;
  deliverablesIncluded: string;
  cardCta: string;
  process: {
    heading: string;
    description: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  planCta: string;
  modal: {
    durationLabel: string;
    badgesTitle: string;
    placeholder: string;
    program: string;
    deliverables: string;
    audience: string;
    fallbackDownload: string;
  };
};

export type ContactMessages = {
  head: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  paragraphs: string[];
  focusTitle: string;
  focusAreas: Array<{
    title: string;
    description: string;
  }>;
  prepTitle: string;
  prepItems: string[];
  coordsTitle: string;
  responseValue: string;
  availabilityValue: string;
  contactLabels: {
    email: string;
    linkedin: string;
    response: string;
    location: string;
    availability: string;
  };
};

export type ContactFormMessages = {
  labels: {
    name: string;
    email: string;
    message: string;
  };
  button: string;
  directEmail: string;
  success: string;
  fallbackNotice: string;
  sending: string;
  error: string;
  mailtoHint: string;
  errors: {
    name: string;
    emailRequired: string;
    emailInvalid: string;
    message: string;
  };
  mailSubject: string;
  mailGreeting: string;
};

export type NavbarMessages = {
  openCommand: string;
  openMenu: string;
  closeMenu: string;
  mobileCommand: string;
};

export type NavigationMessages = Record<NavLinkId, string>;

export type CommandPaletteMessages = {
  placeholder: string;
  empty: string;
  listLabel: string;
  resultCount: {
    zero: string;
    one: string;
    other: string;
  };
  optionType: Record<"page" | "project", string>;
};

export type FooterMessages = {
  rights: string; // expects {{year}}
};

export type LocaleSwitcherMessages = {
  aria: Record<Locale, string>;
};

export type Messages = {
  home: HomeMessages;
  about: AboutMessages;
  experience: ExperienceMessages;
  projects: ProjectsMessages;
  workshops: WorkshopsMessages;
  contact: ContactMessages;
  contactForm: ContactFormMessages;
  navbar: NavbarMessages;
  navigation: NavigationMessages;
  commandPalette: CommandPaletteMessages;
  footer: FooterMessages;
  localeSwitcher: LocaleSwitcherMessages;
};

