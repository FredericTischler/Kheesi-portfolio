import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Link as LinkIcon } from "lucide-react";

import { ModalPreview } from "@/components/ModalPreview";
import { ProjectPreviewCard } from "@/components/ProjectPreviewCard";
import { Section } from "@/components/Section";
import { SectionIntro } from "@/components/SectionIntro";
import { SkillPill } from "@/components/SkillPill";
import { StatCard } from "@/components/StatCard";
import { ActionButton, ActionButtonGroup } from "@/components/ActionButtons";
import { Dialog } from "@/components/ui/dialog";
import { GitHubIcon } from "@/components/icons";
import { getProjects, type Project } from "@/data/projects";
import { useClipboard } from "@/lib/clipboard";
import { useModalSelection } from "@/hooks/useModalSelection";
import { usePageMetadata } from "@/lib/metadata";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";

type SkillItem = {
  name: string;
  icon: string;
  initials: string;
  color: string;
  category: Record<Locale, string>;
};

const SKILL_ITEMS: SkillItem[] = [
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    initials: "TS",
    color: "#3178c6",
    category: { fr: "Langages", en: "Languages" },
  },
  {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    initials: "NG",
    color: "#dd0031",
    category: { fr: "Frontend", en: "Frontend" },
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    initials: "JA",
    color: "#f89820",
    category: { fr: "Langages", en: "Languages" },
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    initials: "JS",
    color: "#f7df1e",
    category: { fr: "Langages", en: "Languages" },
  },
  {
    name: "Go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    initials: "GO",
    color: "#00add8",
    category: { fr: "Langages", en: "Languages" },
  },
  {
    name: "HTML/CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    initials: "HT",
    color: "#e44d26",
    category: { fr: "Frontend", en: "Frontend" },
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    initials: "RE",
    color: "#61dafb",
    category: { fr: "Frontend", en: "Frontend" },
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    initials: "ND",
    color: "#539e43",
    category: { fr: "Backend & DevOps", en: "Backend & DevOps" },
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    initials: "DK",
    color: "#0db7ed",
    category: { fr: "Backend & DevOps", en: "Backend & DevOps" },
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    initials: "PG",
    color: "#336791",
    category: { fr: "Bases de données", en: "Databases" },
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    initials: "MY",
    color: "#00618a",
    category: { fr: "Bases de données", en: "Databases" },
  },
  {
    name: "SQLite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    initials: "SQ",
    color: "#003b57",
    category: { fr: "Bases de données", en: "Databases" },
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    initials: "PY",
    color: "#3776ab",
    category: { fr: "Langages", en: "Languages" },
  },
  {
    name: "Langage C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    initials: "C",
    color: "#283593",
    category: { fr: "Langages", en: "Languages" },
  },
];

const HIGHLIGHTED_SLUGS = ["mellow", "turing-machine", "real-time-forum", "lem-in", "forum"] as const;

const HOME_COPY: Record<Locale, {
  head: { title: string; description: string };
  hero: { title: string; lead: string; ctaProjects: string; ctaContact: string };
  stats: Array<{ label: string; value: string; description: string }>;
  skillsSection: { eyebrow: string; title: string; description: string; ariaList: string; ariaMarquee: string };
  pillars: Array<{ title: string; description: string }>;
  projectsIntro: { eyebrow: string; title: string; description: string };
  projectActions: {
    preview: string;
    viewOnGitHub: string;
    badgesTitle: string;
    copyLink: string;
    linkCopied: string;
  };
}> = {
  fr: {
    head: {
      title: "Frédéric Tischler — Développeur Full-Stack (Angular, Go, TypeScript, Java)",
      description: "Applications web modernes et maintenables. Alternant chez WeNégoce, formé à Zone01.",
    },
    hero: {
      title: "Développeur full-stack",
      lead: "Alternant chez WeNégoce et formé à Zone01, je transforme des applications métier en plateformes Angular/Java prêtes pour la mise en production continue : composants réutilisables, performances maîtrisées, documentation utile.",
      ctaProjects: "Voir mes projets",
      ctaContact: "Me contacter",
    },
    stats: [
      { label: "Projets Zone01", value: "20+", description: "Temps réel, algorithmes, outillage" },
      { label: "Licence informatique", value: "3 ans", description: "Algorithmique, POO Java, bases de données" },
      { label: "Alternance", value: "WeNégoce", description: "Modernisation Angular/Java en continu" },
    ],
    skillsSection: {
      eyebrow: "Stacks maîtrisées",
      title: "Compétences principales",
      description: "Focus sur les technologies que j’utilise au quotidien : architecture backend robuste, interfaces réactives et industrialisation de la livraison.",
      ariaList: "Compétences principales",
      ariaMarquee: "Compétences principales défilantes",
    },
    pillars: [
      { title: "Architecture solide", description: "Modules clairs, composants génériques, dette technique maîtrisée." },
      { title: "Expérience fluide", description: "UX pragmatique, performances et accessibilité by design." },
      { title: "Livrables propres", description: "Typage strict, documentation utile et tests ciblés." },
    ],
    projectsIntro: {
      eyebrow: "À la une",
      title: "Sélection de projets",
      description: "Du temps réel aux algorithmes, en passant par la modernisation d’applications métier.",
    },
    projectActions: {
      preview: "Aperçu",
      viewOnGitHub: "Voir sur GitHub",
      badgesTitle: "Technologies",
      copyLink: "Copier le lien",
      linkCopied: "Lien copié",
    },
  },
  en: {
    head: {
      title: "Frédéric Tischler — Full-Stack Developer (Angular, Go, TypeScript, Java)",
      description: "Modern, maintainable web applications. Apprentice at WeNégoce, trained at Zone01.",
    },
    hero: {
      title: "Full-stack developer",
      lead: "Apprentice at WeNégoce and trained at Zone01, I turn business apps into Angular/Java platforms ready for continuous delivery: reusable components, controlled performance and actionable documentation.",
      ctaProjects: "Explore my projects",
      ctaContact: "Contact me",
    },
    stats: [
      { label: "Zone01 projects", value: "20+", description: "Real-time apps, algorithms, tooling" },
      { label: "Computer science degree", value: "3 years", description: "Algorithms, Java OOP, databases" },
      { label: "Apprenticeship", value: "WeNégoce", description: "Angular/Java modernisation at scale" },
    ],
    skillsSection: {
      eyebrow: "Core stacks",
      title: "Core capabilities",
      description: "Technologies I rely on every day: robust backends, reactive interfaces and industrialised delivery.",
      ariaList: "Core skills",
      ariaMarquee: "Scrolling core skills",
    },
    pillars: [
      { title: "Solid architecture", description: "Clear modules, reusable components, controlled technical debt." },
      { title: "Smooth experience", description: "Pragmatic UX, performance and accessibility by design." },
      { title: "Clean deliverables", description: "Strict typing, useful documentation and focused tests." },
    ],
    projectsIntro: {
      eyebrow: "Highlights",
      title: "Featured projects",
      description: "From real-time systems and graph algorithms to modernised business applications.",
    },
    projectActions: {
      preview: "Quick view",
      viewOnGitHub: "View on GitHub",
      badgesTitle: "Technologies",
      copyLink: "Copy link",
      linkCopied: "Link copied",
    },
  },
};

export function HomePage() {
  const { locale, buildPath } = useLocale();
  const copy = HOME_COPY[locale];

  usePageMetadata({
    title: copy.head.title,
    description: copy.head.description,
    image: "/assets/social/home.svg",
  });

  const prefersReducedMotion = useReducedMotion();
  const highlightedProjects = useMemo(() => {
    const projects = getProjects(locale);
    const bySlug = new Map(projects.map((project) => [project.slug, project] as const));
    return HIGHLIGHTED_SLUGS.map((slug) => bySlug.get(slug)).filter((project): project is Project => Boolean(project));
  }, [locale]);
  const {
    selected: selectedProject,
    openModal: openProjectModal,
    closeModal: closeProjectModal,
    isOpen: projectModalOpen,
  } = useModalSelection<Project>();
  const { copied, copy: copyLink } = useClipboard();

  return (
    <div className="space-y-14 pb-14">
      <section className="pt-36">
        <div className="container grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <h1 className="text-balance text-5xl font-semibold leading-tight md:text-6xl">{copy.hero.title}</h1>
            <p className="max-w-xl text-balance text-muted-foreground">{copy.hero.lead}</p>
            <div className="flex flex-wrap gap-4">
              <ActionButton asChild size="lg" className="gap-2 btn-cta">
                <Link to={buildPath("/projects")} className="inline-flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  <span>{copy.hero.ctaProjects}</span>
                </Link>
              </ActionButton>
              <ActionButton asChild size="lg" variant="outline" className="gap-2 btn-cta-outline">
                <Link to={buildPath("/contact")} className="inline-flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  <span>{copy.hero.ctaContact}</span>
                </Link>
              </ActionButton>
            </div>
          </motion.div>
          <motion.div
            className="relative"
            initial={prefersReducedMotion ? undefined : { opacity: 0, x: 40 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute -inset-14 rounded-full bg-primary/15 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-4">
              {copy.stats.map((stat, index) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} description={stat.description} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-background/80 py-10">
        <div className="container">
          <div className="space-y-8 py-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.45em] text-muted-foreground">{copy.skillsSection.eyebrow}</span>
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">{copy.skillsSection.title}</h2>
              <p className="max-w-3xl text-sm text-muted-foreground">{copy.skillsSection.description}</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {copy.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-[1.75rem] border border-border/60 bg-background/80 p-5 shadow-lg"
                >
                  <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{pillar.description}</p>
                </div>
              ))}
            </div>
            <div className="relative overflow-hidden">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/95 via-background/40 to-transparent"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background/95 via-background/40 to-transparent"
                aria-hidden="true"
              />
              {prefersReducedMotion ? (
                <div className="flex flex-wrap justify-center gap-3 py-4" role="list" aria-label={copy.skillsSection.ariaList}>
                  {SKILL_ITEMS.map((item) => {
                    const { category, ...rest } = item;
                    return <SkillPill key={item.name} {...rest} category={category[locale]} role="listitem" />;
                  })}
                </div>
              ) : (
                <motion.div
                  className="flex min-w-max gap-4 py-4 pl-2 pr-16"
                  role="list"
                  aria-label={copy.skillsSection.ariaMarquee}
                  initial={{ x: 0 }}
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, duration: Math.max(SKILL_ITEMS.length * 3, 18), ease: "linear" }}
                >
                  {[...SKILL_ITEMS, ...SKILL_ITEMS].map((item, index) => {
                    const { category, ...rest } = item;
                    return <SkillPill key={`${item.name}-${index}`} {...rest} category={category[locale]} role="listitem" />;
                  })}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Section className="space-y-6">
        <SectionIntro
          eyebrow={copy.projectsIntro.eyebrow}
          title={copy.projectsIntro.title}
          description={copy.projectsIntro.description}
        />
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
        >
          {highlightedProjects.map((project) => (
            <ProjectPreviewCard
              key={project.slug}
              project={project}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { scale: 1.02, y: -6, transition: { duration: 0.3, ease: "easeOut" } }
              }
              onSelect={() => openProjectModal(project)}
              actionsClassName="mt-auto"
              actions={
                <ActionButtonGroup>
                  <ActionButton
                    size="sm"
                    onClick={(event) => {
                      event.stopPropagation();
                      openProjectModal(project);
                    }}
                  >
                    {copy.projectActions.preview}
                  </ActionButton>
                  <ActionButton
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    href={project.url}
                    onClick={(event) => event.stopPropagation()}
                    icon={<GitHubIcon className="h-4 w-4" aria-hidden="true" />}
                  >
                    {copy.projectActions.viewOnGitHub}
                  </ActionButton>
                </ActionButtonGroup>
              }
            />
          ))}
        </motion.div>
      </Section>

      <Dialog open={projectModalOpen} onOpenChange={(open) => (open ? undefined : closeProjectModal())}>
        {selectedProject ? (
          <ModalPreview
            title={selectedProject.name}
            description={selectedProject.description}
            image={selectedProject.thumbnail}
            badgesTitle={copy.projectActions.badgesTitle}
            badges={selectedProject.tech}
            footerSlot={
              <ActionButtonGroup>
                <ActionButton
                  variant="outline"
                  className="gap-2"
                  onClick={() => copyLink(`${window.location.origin}${buildPath("/projects")}#${selectedProject.slug}`)}
                  icon={<LinkIcon className="h-4 w-4" aria-hidden="true" />}
                >
                  {copied ? copy.projectActions.linkCopied : copy.projectActions.copyLink}
                </ActionButton>
                <ActionButton
                  className="gap-2"
                  href={selectedProject.url}
                  icon={<GitHubIcon className="h-4 w-4" aria-hidden="true" />}
                  target="_blank"
                  rel="noreferrer"
                >
                  {copy.projectActions.viewOnGitHub}
                </ActionButton>
              </ActionButtonGroup>
            }
          />
        ) : null}
      </Dialog>
    </div>
  );
}

export default HomePage;
