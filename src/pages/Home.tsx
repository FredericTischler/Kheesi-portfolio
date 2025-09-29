import { useMemo } from "react";
import {Link} from "react-router-dom";
import {motion, useReducedMotion} from "framer-motion";
import {ArrowRight, Download, Link as LinkIcon} from "lucide-react";

import {ModalPreview} from "@/components/ModalPreview";
import {ProjectPreviewCard} from "@/components/ProjectPreviewCard";
import {Section} from "@/components/Section";
import {SectionIntro} from "@/components/SectionIntro";
import {SkillPill} from "@/components/SkillPill";
import {StatCard} from "@/components/StatCard";
import {ActionButton, ActionButtonGroup} from "@/components/ActionButtons";
import {Dialog} from "@/components/ui/dialog";
import {GitHubIcon} from "@/components/icons";
import {PROFILE} from "@/data/profile";
import {PROJECTS, type Project} from "@/data/projects";
import {useClipboard} from "@/lib/clipboard";
import {useModalSelection} from "@/hooks/useModalSelection";
import {usePageMetadata} from "@/lib/metadata";

type SkillItem = {
    name: string;
    icon: string;
    initials: string;
    color: string;
    category: string;
};

const SKILL_ITEMS: SkillItem[] = [
    {
        name: "Java",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        initials: "JA",
        color: "#f89820",
        category: "Langages",
    },
    {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        initials: "TS",
        color: "#3178c6",
        category: "Langages",
    },
    {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        initials: "JS",
        color: "#f7df1e",
        category: "Langages",
    },
    {
        name: "Go",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
        initials: "GO",
        color: "#00add8",
        category: "Langages",
    },
    {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        initials: "RE",
        color: "#61dafb",
        category: "Frontend",
    },
    {
        name: "HTML/CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
        initials: "HT",
        color: "#e44d26",
        category: "Frontend",
    },
    {
        name: "Angular",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
        initials: "NG",
        color: "#dd0031",
        category: "Frontend",
    },
    {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        initials: "ND",
        color: "#539e43",
        category: "Backend & DevOps",
    },
    {
        name: "Docker",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        initials: "DK",
        color: "#0db7ed",
        category: "Backend & DevOps",
    },
    {
        name: "PostgreSQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        initials: "PG",
        color: "#336791",
        category: "Bases de données",
    },
    {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
        initials: "MY",
        color: "#00618a",
        category: "Bases de données",
    },
    {
        name: "SQLite",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
        initials: "SQ",
        color: "#003b57",
        category: "Bases de données",
    },
    {
        name: "Python",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        initials: "PY",
        color: "#3776ab",
        category: "Langages",
    },
    {
        name: "Langage C",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        initials: "C",
        color: "#283593",
        category: "Langages",
    },
];

export function HomePage() {
    usePageMetadata({
        title: "Accueil",
        description:
            "Frédéric Tischler, développeur full-stack : créations d’applications web modernes, projets en Go, TypeScript et React.",
        image: "/assets/social/home.svg",
    });

    const prefersReducedMotion = useReducedMotion();
    const highlightedProjects = useMemo(
        () => PROJECTS.filter((project) => project.slug === "mellow" || project.slug === "turing-machine"),
        [],
    );
    const {selected: selectedProject, openModal: openProjectModal, closeModal: closeProjectModal, isOpen: projectModalOpen} =
        useModalSelection<Project>();
    const {copied, copy} = useClipboard();

    const stats = useMemo(
        () => [
            {label: "Projets", value: `${PROJECTS.length}`},
            {label: "Compétences", value: `${PROFILE.skills.length}`},
            {label: "Parcours", value: "Licence + Zone01", description: "Fondations théoriques & pratique intensive"},
        ],
        [],
    );

    return (
        <div className="space-y-14 pb-14">
            <section className="pt-36">
                <div className="container grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
                    <motion.div
                        initial={prefersReducedMotion ? undefined : {opacity: 0, y: 24}}
                        animate={prefersReducedMotion ? undefined : {opacity: 1, y: 0}}
                        transition={{duration: 0.6, ease: "easeOut"}}
                        className="space-y-8"
                    >
            <span className="text-xs uppercase tracking-[0.6em] text-muted-foreground">
              Développeur full-stack
            </span>
                        <h1 className="text-balance text-5xl font-semibold leading-tight md:text-6xl">
                            J’aide à concevoir des applications web modernes et performantes.
                        </h1>
                        <p className="max-w-xl text-balance text-muted-foreground">
                            Passionné par les stacks Java, TypeScript et Angular, je conçois des architectures fiables,
                            des interfaces soignées et des expériences réactives. De la composante UI au backend temps réel.
                        </p>
                        <p className="max-w-xl text-balance text-muted-foreground">
                            Avant d’intégrer Zone01 pour une formation en continu par projets, j’ai validé une licence en
                            informatique qui m’a donné un socle algorithmique solide et une maîtrise approfondie de Java.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <ActionButton asChild size="lg" className="gap-2 btn-cta">
                                <Link to="/projects" className="inline-flex items-center gap-2">
                                    <ArrowRight className="h-4 w-4" />
                                    <span>Voir mes projets</span>
                                </Link>
                            </ActionButton>
                            <ActionButton asChild size="lg" variant="outline" className="gap-2 btn-cta-outline">
                                <a href="/assets/cv-frederic-tischler.pdf" download className="inline-flex items-center gap-2">
                                    <Download className="h-4 w-4" />
                                    <span>Télécharger mon CV</span>
                                </a>
                            </ActionButton>
                        </div>
                    </motion.div>
                    <motion.div
                        className="relative"
                        initial={prefersReducedMotion ? undefined : {opacity: 0, x: 40}}
                        animate={prefersReducedMotion ? undefined : {opacity: 1, x: 0}}
                        transition={{duration: 0.8, ease: "easeOut"}}
                    >
                        <div className="absolute -inset-14 rounded-full bg-primary/15 blur-3xl" aria-hidden="true"/>
                        <div className="relative grid gap-4">
                            {stats.map((stat, index) => (
                                <StatCard key={stat.label} label={stat.label} value={stat.value} description={stat.description}
                                          index={index}/>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="relative bg-background/80 py-10 overflow-hidden">
                <div className="container">
                    <div className="space-y-8 py-10">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Stacks maîtrisées</span>
                            <h2 className="text-3xl font-semibold text-foreground md:text-4xl">Compétences principales</h2>
                            <p className="max-w-3xl text-sm text-muted-foreground">
                                Focus sur les technologies que j’utilise au quotidien : architecture backend robuste, interfaces réactives
                                et
                                industrialisation de la livraison.
                            </p>
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
                                <div
                                    className="flex flex-wrap justify-center gap-3 py-4"
                                    role="list"
                                    aria-label="Compétences principales"
                                >
                                    {SKILL_ITEMS.map((item) => (
                                        <SkillPill key={item.name} {...item} role="listitem" />
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    className="flex min-w-max gap-4 py-4 pl-2 pr-16"
                                    role="list"
                                    aria-label="Compétences principales défilantes"
                                    initial={{x: 0}}
                                    animate={{x: ["0%", "-50%"]}}
                                    transition={{repeat: Infinity, duration: Math.max(SKILL_ITEMS.length * 3, 18), ease: "linear"}}
                                >
                                    {[...SKILL_ITEMS, ...SKILL_ITEMS].map((item, index) => (
                                        <SkillPill key={`${item.name}-${index}`} {...item} role="listitem" />
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Section className="space-y-6">
                <SectionIntro
                    eyebrow="À la une"
                    title="Projets notables"
                    description="Un aperçu des développements récents : temps réel, interfaces immersives et outils internes. Sélection extraite des projets les plus représentatifs."
                />
                <motion.div
                    className="grid gap-6 md:grid-cols-2"
                    initial={prefersReducedMotion ? undefined : {opacity: 0, y: 32}}
                    animate={prefersReducedMotion ? undefined : {opacity: 1, y: 0}}
                    transition={{duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut"}}
                >
                    {highlightedProjects.slice(0, 2).map((project) => (
                        <ProjectPreviewCard
                            key={project.slug}
                            project={project}
                            whileHover={
                                prefersReducedMotion
                                    ? undefined
                                    : {scale: 1.02, y: -6, transition: {duration: 0.3, ease: "easeOut"}}
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
                                        Aperçu
                                    </ActionButton>
                                    <ActionButton
                                        size="sm"
                                        variant="outline"
                                        className="gap-2"
                                        href={project.url}
                                        onClick={(event) => event.stopPropagation()}
                                        icon={<GitHubIcon className="h-4 w-4" aria-hidden="true" />}
                                    >
                                        Voir sur GitHub
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
                  badgesTitle="Technologies"
                  badges={selectedProject.tech}
                  footerSlot={
                    <ActionButtonGroup>
                      <ActionButton
                        variant="outline"
                        className="gap-2"
                        onClick={() => copy(`${window.location.origin}/projects#${selectedProject.slug}`)}
                        icon={<LinkIcon className="h-4 w-4" aria-hidden="true" />}
                      >
                        {copied ? "Lien copié" : "Copier le lien"}
                      </ActionButton>
                      <ActionButton
                        className="gap-2"
                        href={selectedProject.url}
                        icon={<GitHubIcon className="h-4 w-4" aria-hidden="true" />}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Voir sur GitHub
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
