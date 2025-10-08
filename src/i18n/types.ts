export type SkillCategoryKey = "languages" | "frontend" | "backendDevops" | "databases";

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

export type Messages = {
  home: HomeMessages;
};
