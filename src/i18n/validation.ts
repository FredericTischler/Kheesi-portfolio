import type { Locale } from "@/i18n/config";
import type {
  AboutMessages,
  CommandPaletteMessages,
  ContactFormMessages,
  ContactMessages,
  ExperienceMessages,
  FooterMessages,
  HomeMessages,
  LocaleSwitcherMessages,
  Messages,
  NavLinkId,
  NavigationMessages,
  ProjectsMessages,
  SkillCategoryKey,
  WorkshopsMessages,
} from "@/i18n/types";

type UnknownRecord = Record<string, unknown>;

const SKILL_CATEGORIES: SkillCategoryKey[] = ["languages", "frontend", "backendDevops", "databases"];
const NAV_LINK_IDS: NavLinkId[] = ["home", "about", "experience", "projects", "workshops", "contact"];
const PROJECT_SORT_KEYS: Array<"recent" | "alphabetical"> = ["recent", "alphabetical"];

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function expectRecord(value: unknown, path: string): UnknownRecord {
  if (!isRecord(value)) {
    throw new Error(`Expected object at ${path}`);
  }
  return value;
}

function expectString(value: unknown, path: string): string {
  if (typeof value !== "string") {
    throw new Error(`Expected string at ${path}`);
  }
  return value;
}

function expectStringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Expected array at ${path}`);
  }
  return value.map((item, index) => expectString(item, `${path}[${index}]`));
}

function expectArray<T>(value: unknown, path: string, parser: (item: unknown, indexPath: string) => T): T[] {
  if (!Array.isArray(value)) {
    throw new Error(`Expected array at ${path}`);
  }
  return value.map((item, index) => parser(item, `${path}[${index}]`));
}

function parseObjectWithTitleDescription(value: unknown, path: string) {
  const record = expectRecord(value, path);
  return {
    title: expectString(record.title, `${path}.title`),
    description: expectString(record.description, `${path}.description`),
  };
}

function parseIntroSection(value: unknown, path: string) {
  const record = expectRecord(value, path);
  return {
    eyebrow: expectString(record.eyebrow, `${path}.eyebrow`),
    title: expectString(record.title, `${path}.title`),
    description: expectString(record.description, `${path}.description`),
  };
}

function validateHomeMessages(value: unknown, path: string): HomeMessages {
  const record = expectRecord(value, path);

  const skillsSection = expectRecord(record.skillsSection, `${path}.skillsSection`);
  const categoriesRecord = expectRecord(skillsSection.categories, `${path}.skillsSection.categories`);
  const categories = SKILL_CATEGORIES.reduce<Record<SkillCategoryKey, string>>((acc, category) => {
    acc[category] = expectString(categoriesRecord[category], `${path}.skillsSection.categories.${category}`);
    return acc;
  }, {} as Record<SkillCategoryKey, string>);

  return {
    head: {
      title: expectString(expectRecord(record.head, `${path}.head`).title, `${path}.head.title`),
      description: expectString(expectRecord(record.head, `${path}.head`).description, `${path}.head.description`),
    },
    hero: {
      title: expectString(expectRecord(record.hero, `${path}.hero`).title, `${path}.hero.title`),
      lead: expectString(expectRecord(record.hero, `${path}.hero`).lead, `${path}.hero.lead`),
      ctaProjects: expectString(expectRecord(record.hero, `${path}.hero`).ctaProjects, `${path}.hero.ctaProjects`),
      ctaContact: expectString(expectRecord(record.hero, `${path}.hero`).ctaContact, `${path}.hero.ctaContact`),
    },
    stats: expectArray(record.stats, `${path}.stats`, (item, itemPath) => {
      const stat = expectRecord(item, itemPath);
      return {
        label: expectString(stat.label, `${itemPath}.label`),
        value: expectString(stat.value, `${itemPath}.value`),
        description: expectString(stat.description, `${itemPath}.description`),
      };
    }),
    skillsSection: {
      eyebrow: expectString(skillsSection.eyebrow, `${path}.skillsSection.eyebrow`),
      title: expectString(skillsSection.title, `${path}.skillsSection.title`),
      description: expectString(skillsSection.description, `${path}.skillsSection.description`),
      ariaList: expectString(skillsSection.ariaList, `${path}.skillsSection.ariaList`),
      ariaMarquee: expectString(skillsSection.ariaMarquee, `${path}.skillsSection.ariaMarquee`),
      categories,
    },
    pillars: expectArray(record.pillars, `${path}.pillars`, (item, itemPath) => parseObjectWithTitleDescription(item, itemPath)),
    projectsIntro: parseIntroSection(record.projectsIntro, `${path}.projectsIntro`),
    projectActions: (() => {
      const actions = expectRecord(record.projectActions, `${path}.projectActions`);
      return {
        preview: expectString(actions.preview, `${path}.projectActions.preview`),
        viewOnGitHub: expectString(actions.viewOnGitHub, `${path}.projectActions.viewOnGitHub`),
        badgesTitle: expectString(actions.badgesTitle, `${path}.projectActions.badgesTitle`),
        copyLink: expectString(actions.copyLink, `${path}.projectActions.copyLink`),
        linkCopied: expectString(actions.linkCopied, `${path}.projectActions.linkCopied`),
      };
    })(),
  };
}

function validateAboutMessages(value: unknown, path: string): AboutMessages {
  const record = expectRecord(value, path);
  return {
    head: parseObjectWithTitleDescription(record.head, `${path}.head`),
    eyebrow: expectString(record.eyebrow, `${path}.eyebrow`),
    heroTitle: expectString(record.heroTitle, `${path}.heroTitle`),
    intro: expectStringArray(record.intro, `${path}.intro`),
    formationTitle: expectString(record.formationTitle, `${path}.formationTitle`),
    formation: expectArray(record.formation, `${path}.formation`, (item, itemPath) => parseObjectWithTitleDescription(item, itemPath)),
    valuesTitle: expectString(record.valuesTitle, `${path}.valuesTitle`),
    values: expectArray(record.values, `${path}.values`, (item, itemPath) => parseObjectWithTitleDescription(item, itemPath)),
    interestsTitle: expectString(record.interestsTitle, `${path}.interestsTitle`),
    skillsTitle: expectString(record.skillsTitle, `${path}.skillsTitle`),
  };
}

function validateExperienceMessages(value: unknown, path: string): ExperienceMessages {
  const record = expectRecord(value, path);
  const periodLabels = expectRecord(record.periodLabels, `${path}.periodLabels`);
  return {
    head: parseObjectWithTitleDescription(record.head, `${path}.head`),
    eyebrow: expectString(record.eyebrow, `${path}.eyebrow`),
    heroTitle: expectString(record.heroTitle, `${path}.heroTitle`),
    heroDescription: expectString(record.heroDescription, `${path}.heroDescription`),
    highlightsTitle: expectString(record.highlightsTitle, `${path}.highlightsTitle`),
    impactTitle: expectString(record.impactTitle, `${path}.impactTitle`),
    stackTitle: expectString(record.stackTitle, `${path}.stackTitle`),
    periodLabels: {
      since: expectString(periodLabels.since, `${path}.periodLabels.since`),
      separator: expectString(periodLabels.separator, `${path}.periodLabels.separator`),
    },
  };
}

function validateProjectsMessages(value: unknown, path: string): ProjectsMessages {
  const record = expectRecord(value, path);
  const resultsLabel = expectRecord(record.resultsLabel, `${path}.resultsLabel`);
  const projectActions = expectRecord(record.projectActions, `${path}.projectActions`);
  const sortLabels = expectRecord(record.sortLabels, `${path}.sortLabels`);

  return {
    head: parseObjectWithTitleDescription(record.head, `${path}.head`),
    intro: parseIntroSection(record.intro, `${path}.intro`),
    searchPlaceholder: expectString(record.searchPlaceholder, `${path}.searchPlaceholder`),
    reset: expectString(record.reset, `${path}.reset`),
    filtersAria: expectString(record.filtersAria, `${path}.filtersAria`),
    allProjects: expectString(record.allProjects, `${path}.allProjects`),
    resultsLabel: {
      zero: expectString(resultsLabel.zero, `${path}.resultsLabel.zero`),
      one: expectString(resultsLabel.one, `${path}.resultsLabel.one`),
      other: expectString(resultsLabel.other, `${path}.resultsLabel.other`),
    },
    noResultsTitle: expectString(record.noResultsTitle, `${path}.noResultsTitle`),
    noResultsDescription: expectString(record.noResultsDescription, `${path}.noResultsDescription`),
    listAria: expectString(record.listAria, `${path}.listAria`),
    cardViewLabel: expectString(record.cardViewLabel, `${path}.cardViewLabel`),
    viewButton: expectString(record.viewButton, `${path}.viewButton`),
    modalPlaceholder: expectString(record.modalPlaceholder, `${path}.modalPlaceholder`),
    projectActions: {
      preview: expectString(projectActions.preview, `${path}.projectActions.preview`),
      viewOnGitHub: expectString(projectActions.viewOnGitHub, `${path}.projectActions.viewOnGitHub`),
      badgesTitle: expectString(projectActions.badgesTitle, `${path}.projectActions.badgesTitle`),
      copyLink: expectString(projectActions.copyLink, `${path}.projectActions.copyLink`),
      linkCopied: expectString(projectActions.linkCopied, `${path}.projectActions.linkCopied`),
    },
    sortLabels: PROJECT_SORT_KEYS.reduce<Record<"recent" | "alphabetical", string>>((acc, key) => {
      acc[key] = expectString(sortLabels[key], `${path}.sortLabels.${key}`);
      return acc;
    }, {} as Record<"recent" | "alphabetical", string>),
  };
}

function validateWorkshopsMessages(value: unknown, path: string): WorkshopsMessages {
  const record = expectRecord(value, path);
  const process = expectRecord(record.process, `${path}.process`);
  const modal = expectRecord(record.modal, `${path}.modal`);

  return {
    head: parseObjectWithTitleDescription(record.head, `${path}.head`),
    intro: parseIntroSection(record.intro, `${path}.intro`),
    focusLabel: expectString(record.focusLabel, `${path}.focusLabel`),
    deliverablesIncluded: expectString(record.deliverablesIncluded, `${path}.deliverablesIncluded`),
    cardCta: expectString(record.cardCta, `${path}.cardCta`),
    process: {
      heading: expectString(process.heading, `${path}.process.heading`),
      description: expectString(process.description, `${path}.process.description`),
      steps: expectArray(process.steps, `${path}.process.steps`, (item, itemPath) => parseObjectWithTitleDescription(item, itemPath)),
    },
    planCta: expectString(record.planCta, `${path}.planCta`),
    modal: {
      durationLabel: expectString(modal.durationLabel, `${path}.modal.durationLabel`),
      badgesTitle: expectString(modal.badgesTitle, `${path}.modal.badgesTitle`),
      placeholder: expectString(modal.placeholder, `${path}.modal.placeholder`),
      program: expectString(modal.program, `${path}.modal.program`),
      deliverables: expectString(modal.deliverables, `${path}.modal.deliverables`),
      audience: expectString(modal.audience, `${path}.modal.audience`),
      fallbackDownload: expectString(modal.fallbackDownload, `${path}.modal.fallbackDownload`),
    },
  };
}

function validateContactMessages(value: unknown, path: string): ContactMessages {
  const record = expectRecord(value, path);
  const contactLabels = expectRecord(record.contactLabels, `${path}.contactLabels`);

  return {
    head: parseObjectWithTitleDescription(record.head, `${path}.head`),
    eyebrow: expectString(record.eyebrow, `${path}.eyebrow`),
    title: expectString(record.title, `${path}.title`),
    paragraphs: expectStringArray(record.paragraphs, `${path}.paragraphs`),
    focusTitle: expectString(record.focusTitle, `${path}.focusTitle`),
    focusAreas: expectArray(record.focusAreas, `${path}.focusAreas`, (item, itemPath) => parseObjectWithTitleDescription(item, itemPath)),
    prepTitle: expectString(record.prepTitle, `${path}.prepTitle`),
    prepItems: expectStringArray(record.prepItems, `${path}.prepItems`),
    coordsTitle: expectString(record.coordsTitle, `${path}.coordsTitle`),
    responseValue: expectString(record.responseValue, `${path}.responseValue`),
    availabilityValue: expectString(record.availabilityValue, `${path}.availabilityValue`),
    contactLabels: {
      email: expectString(contactLabels.email, `${path}.contactLabels.email`),
      linkedin: expectString(contactLabels.linkedin, `${path}.contactLabels.linkedin`),
      response: expectString(contactLabels.response, `${path}.contactLabels.response`),
      location: expectString(contactLabels.location, `${path}.contactLabels.location`),
      availability: expectString(contactLabels.availability, `${path}.contactLabels.availability`),
    },
  };
}

function validateContactFormMessages(value: unknown, path: string): ContactFormMessages {
  const record = expectRecord(value, path);
  const labels = expectRecord(record.labels, `${path}.labels`);
  const errors = expectRecord(record.errors, `${path}.errors`);

  return {
    labels: {
      name: expectString(labels.name, `${path}.labels.name`),
      email: expectString(labels.email, `${path}.labels.email`),
      message: expectString(labels.message, `${path}.labels.message`),
    },
    button: expectString(record.button, `${path}.button`),
    directEmail: expectString(record.directEmail, `${path}.directEmail`),
    success: expectString(record.success, `${path}.success`),
    fallbackNotice: expectString(record.fallbackNotice, `${path}.fallbackNotice`),
    sending: expectString(record.sending, `${path}.sending`),
    error: expectString(record.error, `${path}.error`),
    mailtoHint: expectString(record.mailtoHint, `${path}.mailtoHint`),
    errors: {
      name: expectString(errors.name, `${path}.errors.name`),
      emailRequired: expectString(errors.emailRequired, `${path}.errors.emailRequired`),
      emailInvalid: expectString(errors.emailInvalid, `${path}.errors.emailInvalid`),
      message: expectString(errors.message, `${path}.errors.message`),
    },
    mailSubject: expectString(record.mailSubject, `${path}.mailSubject`),
    mailGreeting: expectString(record.mailGreeting, `${path}.mailGreeting`),
  };
}

function validateNavbarMessages(value: unknown, path: string) {
  const record = expectRecord(value, path);
  return {
    openCommand: expectString(record.openCommand, `${path}.openCommand`),
    openMenu: expectString(record.openMenu, `${path}.openMenu`),
    closeMenu: expectString(record.closeMenu, `${path}.closeMenu`),
    mobileCommand: expectString(record.mobileCommand, `${path}.mobileCommand`),
  };
}

function validateNavigationMessages(value: unknown, path: string): NavigationMessages {
  const record = expectRecord(value, path);
  return NAV_LINK_IDS.reduce<Record<NavLinkId, string>>((acc, id) => {
    acc[id] = expectString(record[id], `${path}.${id}`);
    return acc;
  }, {} as Record<NavLinkId, string>);
}

function validateCommandPaletteMessages(value: unknown, path: string): CommandPaletteMessages {
  const record = expectRecord(value, path);
  const resultCount = expectRecord(record.resultCount, `${path}.resultCount`);
  const optionType = expectRecord(record.optionType, `${path}.optionType`);

  return {
    placeholder: expectString(record.placeholder, `${path}.placeholder`),
    empty: expectString(record.empty, `${path}.empty`),
    listLabel: expectString(record.listLabel, `${path}.listLabel`),
    resultCount: {
      zero: expectString(resultCount.zero, `${path}.resultCount.zero`),
      one: expectString(resultCount.one, `${path}.resultCount.one`),
      other: expectString(resultCount.other, `${path}.resultCount.other`),
    },
    optionType: {
      page: expectString(optionType.page, `${path}.optionType.page`),
      project: expectString(optionType.project, `${path}.optionType.project`),
    },
  };
}

function validateFooterMessages(value: unknown, path: string): FooterMessages {
  const record = expectRecord(value, path);
  return {
    rights: expectString(record.rights, `${path}.rights`),
  };
}

function validateLocaleSwitcherMessages(value: unknown, path: string): LocaleSwitcherMessages {
  const record = expectRecord(value, path);
  const aria = expectRecord(record.aria, `${path}.aria`);
  return {
    aria: {
      fr: expectString(aria.fr, `${path}.aria.fr`),
      en: expectString(aria.en, `${path}.aria.en`),
    },
  };
}

export function validateMessages(locale: Locale, raw: unknown): Messages {
  const record = expectRecord(raw, `i18n.${locale}`);

  return {
    home: validateHomeMessages(record.home, `i18n.${locale}.home`),
    about: validateAboutMessages(record.about, `i18n.${locale}.about`),
    experience: validateExperienceMessages(record.experience, `i18n.${locale}.experience`),
    projects: validateProjectsMessages(record.projects, `i18n.${locale}.projects`),
    workshops: validateWorkshopsMessages(record.workshops, `i18n.${locale}.workshops`),
    contact: validateContactMessages(record.contact, `i18n.${locale}.contact`),
    contactForm: validateContactFormMessages(record.contactForm, `i18n.${locale}.contactForm`),
    navbar: validateNavbarMessages(record.navbar, `i18n.${locale}.navbar`),
    navigation: validateNavigationMessages(record.navigation, `i18n.${locale}.navigation`),
    commandPalette: validateCommandPaletteMessages(record.commandPalette, `i18n.${locale}.commandPalette`),
    footer: validateFooterMessages(record.footer, `i18n.${locale}.footer`),
    localeSwitcher: validateLocaleSwitcherMessages(record.localeSwitcher, `i18n.${locale}.localeSwitcher`),
  };
}
