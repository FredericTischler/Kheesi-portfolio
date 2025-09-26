import { useCallback, useEffect, useMemo, useState } from "react";
import {Link} from "react-router-dom";
import {motion, useReducedMotion} from "framer-motion";
import {ArrowRight, Download, ExternalLink, Github, Link as LinkIcon} from "lucide-react";

import {Section} from "@/components/Section";
import {StatCard} from "@/components/StatCard";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Skeleton} from "@/components/ui/skeleton";
import {PROFILE} from "@/data/profile";
import {PROJECTS, type Project} from "@/data/projects";
import type {RBCategory, RBItem, RBFormat, RBPalette} from "@/data/print-on-demand";
import {useClipboard} from "@/lib/clipboard";
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

const FORMAT_LABELS: Record<RBFormat, string> = {
    poster: "Poster",
    sticker: "Stickers",
    textile: "Textile",
};

const PALETTE_LABELS: Record<RBPalette, string> = {
    pastel: "Pastel",
    vibrant: "Vibrant",
    monochrome: "Monochrome",
};

const PROJECT_PLACEHOLDER_CLASSES =
    "flex h-48 w-full items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-secondary/40 via-secondary/20 to-secondary/40 text-xs uppercase tracking-[0.35em] text-muted-foreground";
type FeaturedDesign = {
    category: Pick<RBCategory, "id" | "name" | "description">;
    item: RBItem;
};

function ensureFeaturedDesigns(categories: RBCategory[]): FeaturedDesign[] {
    return categories
        .map((category) => {
            const item = category.items.find((design) => design.featured) ?? category.items[0];
            if (!item) {
                return null;
            }
            return {
                category: {
                    id: category.id,
                    name: category.name,
                    description: category.description,
                },
                item,
            } satisfies FeaturedDesign;
        })
        .filter(Boolean) as FeaturedDesign[];
}

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
    const [featuredDesigns, setFeaturedDesigns] = useState<FeaturedDesign[]>([]);
    const [designsStatus, setDesignsStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const {copied, copy} = useClipboard();

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const enhancedWindow = window as typeof window & {
            requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
            cancelIdleCallback?: (handle: number) => void;
        };

        let cancelled = false;
        let idleHandle: number | undefined;
        let timeoutHandle: number | undefined;

        const loadFeaturedDesigns = async () => {
            try {
                setDesignsStatus((status) => (status === "ready" ? status : "loading"));
                const {PRINT_ON_DEMAND_CATEGORIES} = await import("@/data/print-on-demand");
                if (cancelled) {
                    return;
                }

                setFeaturedDesigns(ensureFeaturedDesigns(PRINT_ON_DEMAND_CATEGORIES));
                setDesignsStatus("ready");
            } catch (error) {
                if (cancelled) {
                    return;
                }
                console.error("Impossible de charger les designs Print on demand", error);
                setDesignsStatus("error");
            }
        };

        const schedule = () => {
            if (cancelled) {
                return;
            }
            void loadFeaturedDesigns();
        };

        if (typeof enhancedWindow.requestIdleCallback === "function") {
            idleHandle = enhancedWindow.requestIdleCallback(schedule, {timeout: 1000});
        } else {
            timeoutHandle = enhancedWindow.setTimeout(schedule, 500);
        }

        return () => {
            cancelled = true;
            if (idleHandle !== undefined && typeof enhancedWindow.cancelIdleCallback === "function") {
                enhancedWindow.cancelIdleCallback(idleHandle);
            }
            if (timeoutHandle !== undefined) {
                enhancedWindow.clearTimeout(timeoutHandle);
            }
        };
    }, []);

    const stats = useMemo(
        () => [
            {label: "Projets", value: `${PROJECTS.length}`},
            {label: "Compétences", value: `${PROFILE.skills.length}`},
            {label: "Parcours", value: "Licence + Zone01", description: "Fondations théoriques & pratique intensive"},
        ],
        [],
    );

    const hexToRgba = useCallback((hex: string, alpha: number) => {
        const value = hex.replace("#", "");
        const bigint = parseInt(value, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }, []);

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
                            <Button asChild size="lg" className="gap-2 btn-cta">
                                <Link to="/projects">
                                    Voir mes projets <ArrowRight className="h-4 w-4"/>
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="gap-2 btn-cta-outline"
                            >
                                <a href="/assets/cv-frederic-tischler.pdf" download>
                                    <Download className="h-4 w-4"/> Télécharger mon CV
                                </a>
                            </Button>
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
                                        <div
                                            key={item.name}
                                            className="flex items-center gap-3 rounded-lg border px-4 py-3"
                                            role="listitem"
                                            style={{
                                                backgroundColor: hexToRgba(item.color, 0.12),
                                                borderColor: hexToRgba(item.color, 0.35),
                                                color: item.color,
                                            }}
                                        >
                                            <span
                                                className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border"
                                                style={{
                                                    borderColor: hexToRgba(item.color, 0.45),
                                                    backgroundColor: hexToRgba(item.color, 0.1),
                                                }}
                                            >
                                                <img
                                                    src={item.icon}
                                                    alt={`Logo ${item.name}`}
                                                    loading="lazy"
                                                    className="h-6 w-6 object-contain"
                                                    onError={(event) => {
                                                        const image = event.currentTarget;
                                                        image.style.display = "none";
                                                        const fallback = image.nextElementSibling as HTMLElement | null;
                                                        if (fallback) {
                                                            fallback.style.display = "block";
                                                        }
                                                    }}
                                                />
                                                <span
                                                    aria-hidden="true"
                                                    className="hidden text-xs font-semibold uppercase"
                                                    style={{ color: item.color }}
                                                >
                                                    {item.initials}
                                                </span>
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold uppercase tracking-[0.2em]">{item.name}</span>
                                                <span
                                                    className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80">{item.category}</span>
                                            </div>
                                        </div>
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
                                        <div
                                            key={`${item.name}-${index}`}
                                            className="flex items-center gap-3 rounded-lg border px-4 py-3"
                                            role="listitem"
                                            style={{
                                                backgroundColor: hexToRgba(item.color, 0.12),
                                                borderColor: hexToRgba(item.color, 0.35),
                                                color: item.color,
                                            }}
                                        >
                                            <span
                                                className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border"
                                                style={{
                                                    borderColor: hexToRgba(item.color, 0.45),
                                                    backgroundColor: hexToRgba(item.color, 0.1),
                                                }}
                                            >
                                                <img
                                                    src={item.icon}
                                                    alt={`Logo ${item.name}`}
                                                    loading="lazy"
                                                    className="h-6 w-6 object-contain"
                                                    onError={(event) => {
                                                        const image = event.currentTarget;
                                                        image.style.display = "none";
                                                        const fallback = image.nextElementSibling as HTMLElement | null;
                                                        if (fallback) {
                                                            fallback.style.display = "block";
                                                        }
                                                    }}
                                                />
                                                <span
                                                    aria-hidden="true"
                                                    className="hidden text-xs font-semibold uppercase"
                                                    style={{ color: item.color }}
                                                >
                                                    {item.initials}
                                                </span>
                                            </span>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold uppercase tracking-[0.2em]">{item.name}</span>
                                                <span
                                                    className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80">{item.category}</span>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Section className="space-y-6">
                <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">À la une</p>
                    <h2 className="text-3xl font-semibold md:text-4xl">Projets notables</h2>
                    <p className="max-w-2xl text-muted-foreground">
                        Un aperçu des développements récents : temps réel, interfaces immersives et outils internes. Sélection
                        extraite des projets les plus représentatifs.
                    </p>
                </div>
                <motion.div
                    className="grid gap-6 md:grid-cols-2"
                    initial={prefersReducedMotion ? undefined : {opacity: 0, y: 32}}
                    animate={prefersReducedMotion ? undefined : {opacity: 1, y: 0}}
                    transition={{duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut"}}
                >
                    {highlightedProjects.slice(0, 2).map((project) => (
                        <motion.article
                            key={project.slug}
                            className="group flex h-full flex-col gap-6 rounded-[2rem] border border-border/60 bg-background/80 p-6 text-left shadow-lg"
                            whileHover={
                                prefersReducedMotion
                                    ? undefined
                                    : {scale: 1.02, y: -6, transition: {duration: 0.3, ease: "easeOut"}}
                            }
                            role="listitem"
                            tabIndex={0}
                            aria-label={`Aperçu du projet ${project.name}`}
                            aria-describedby={`project-${project.slug}-summary`}
                            onClick={() => {
                                setSelectedProject(project);
                                setModalOpen(true);
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    setSelectedProject(project);
                                    setModalOpen(true);
                                }
                            }}
                        >
                            {project.thumbnail ? (
                                <img
                                    src={project.thumbnail}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    className="h-48 w-full rounded-[1.75rem] object-cover"
                                />
                            ) : (
                                <div className={PROJECT_PLACEHOLDER_CLASSES}>Aperçu indisponible</div>
                            )}
                            <div className="flex flex-1 flex-col gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.slice(0, 5).map((tech) => (
                                            <Badge
                                                key={`${project.slug}-${tech}`}
                                                variant="secondary"
                                                className="px-3 py-1 text-xs uppercase tracking-[0.3em]"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <p id={`project-${project.slug}-summary`} className="sr-only">
                                    {`Technologies principales : ${project.tech.join(", ")}.`}
                                </p>
                                <div className="mt-auto flex flex-wrap gap-3">
                                    <Button
                                        size="sm"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setSelectedProject(project);
                                            setModalOpen(true);
                                        }}
                                    >
                                        Aperçu
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        <a href={project.url} target="_blank" rel="noreferrer">
                                            <Github className="h-4 w-4" aria-hidden="true" /> Voir sur GitHub
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </Section>

      <Section className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Designs favoris</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Sélection Print on demand mise en avant</h2>
          <p className="max-w-2xl text-muted-foreground">
            Entre deux sprints de développement, j’explore l’illustration pour Print on demand. Chaque aperçu ci-dessous met en
            avant une catégorie de la boutique pour donner un panorama rapide des univers proposés.
          </p>
        </div>
        {designsStatus === "error" ? (
          <div className="rounded-[2rem] border border-border/60 bg-background/80 p-8 text-center shadow-lg">
            <h3 className="text-lg font-semibold text-foreground">Designs indisponibles pour le moment</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Le chargement des visuels Print on demand a échoué. Rechargez la page ou rendez-vous directement sur la boutique.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                variant="outline"
                asChild
                size="sm"
                className="gap-2"
              >
                <a href="https://www.print-on-demand.com/people/frederictischler" target="_blank" rel="noreferrer">
                  Ouvrir la boutique
                </a>
              </Button>
            </div>
          </div>
        ) : designsStatus !== "ready" ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex h-full flex-col rounded-[2rem] border border-border/60 bg-background/70 p-6 shadow-sm"
              >
                <Skeleton className="mb-6 h-48 w-full rounded-[1.75rem]" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="mt-3 h-4 w-2/5" />
                <div className="mt-6 flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
                <Skeleton className="mt-auto h-10 w-full rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 32 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
          >
            {featuredDesigns.map(({ category, item }) => {
              const previewImage = item.gallery && item.gallery.length > 0 ? item.gallery[0] : item.src;
              const previewFallback = (() => {
                if (item.fallback && !previewImage.includes("/assets/designs-webp/")) {
                  return item.fallback;
                }
                if (previewImage.includes("/assets/designs-webp/")) {
                  const [base, query] = previewImage.split("?");
                  const fallbackBase = base
                    .replace("/assets/designs-webp/", "/assets/designs/")
                    .replace(/\.webp$/, ".png");
                  return query ? `${fallbackBase}?${query}` : fallbackBase;
                }
                return item.fallback ?? previewImage;
              })();

              return (
                <motion.article
                  key={`${category.id}-${item.id}`}
                  className="group flex h-full flex-col rounded-[2rem] border border-border/60 bg-background/80 shadow-lg"
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { scale: 1.02, y: -6, transition: { duration: 0.3, ease: "easeOut" } }
                  }
                >
                  <div className="relative overflow-hidden rounded-t-[2rem] bg-secondary/30">
                    <picture>
                      <source srcSet={previewImage} type="image/webp" />
                      {previewFallback ? (
                        <source srcSet={previewFallback} type="image/png" />
                      ) : null}
                      <img
                        src={previewFallback ?? previewImage}
                        alt={`Illustration print on demand : ${item.title} – ${item.tags.join(", ")}`}
                        loading="lazy"
                        decoding="async"
                        className="aspect-square w-full object-contain p-4 transition duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </picture>
                  </div>
                  <div className="flex flex-1 flex-col gap-5 p-6" aria-live="polite">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                        <Badge variant="outline" className="self-start px-4 py-1 text-xs uppercase tracking-[0.25em]">
                          {category.name}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                        <span className="rounded-full bg-secondary/30 px-3 py-1 text-muted-foreground">
                          {FORMAT_LABELS[item.format]}
                        </span>
                        <span className="rounded-full bg-secondary/30 px-3 py-1 text-muted-foreground">
                          {PALETTE_LABELS[item.palette]}
                        </span>
                      </div>
                    </div>
                    {item.createdAt ? (
                      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        {new Date(item.createdAt).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    ) : null}
                    <p className="text-xs text-muted-foreground">{item.usage}</p>
                    <div className="flex flex-wrap gap-2" id={`design-${item.id}-tags`}>
                      {item.tags.slice(0, 5).map((tag, index) => (
                        <Badge
                          key={`${item.id}-${tag}`}
                          variant="outline"
                          className={`tech-badge tech-badge-${(index % 4) + 1}`}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="sr-only">{`Description : ${item.title}. Tags : ${item.tags.join(", ")}.`}</p>
                    <div className="mt-auto">
                      <Button asChild variant="outline" size="sm" className="w-full gap-2">
                        <a href={item.rbLink} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-4 w-4" /> Voir sur RedBubble
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </Section>

      <Dialog open={modalOpen && selectedProject !== null} onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) {
              setSelectedProject(null);
          }
      }}>
          {selectedProject ? (
              <DialogContent className="w-[min(92vw,720px)] border-border/70 bg-background/95 p-0 shadow-elevated">
                  <DialogHeader className="space-y-2 border-b border-border/60 px-6 py-5">
                      <DialogTitle className="text-2xl font-semibold">{selectedProject.name}</DialogTitle>
                      <DialogDescription className="text-sm text-muted-foreground">{selectedProject.description}</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 px-6 py-6">
                      {selectedProject.thumbnail ? (
                          <img
                              src={selectedProject.thumbnail}
                              alt=""
                              className="h-56 w-full rounded-[1.75rem] object-cover"
                              loading="lazy"
                              decoding="async"
                          />
                      ) : (
                          <div className="flex h-56 w-full items-center justify-center rounded-[1.75rem] bg-secondary/40 text-xs uppercase tracking-[0.35em] text-muted-foreground">
                              Aperçu indisponible
                          </div>
                      )}
                      <div className="space-y-4">
                          <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-muted-foreground">Technologies</h3>
                          <div className="flex flex-wrap gap-2">
                              {selectedProject.tech.map((tech) => (
                                  <Badge key={`${selectedProject.slug}-${tech}`} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-[0.3em]">
                                      {tech}
                                  </Badge>
                              ))}
                          </div>
                      </div>
                  </div>
                  <DialogFooter className="flex flex-col gap-3 border-t border-border/60 bg-background/90 px-6 py-5 sm:flex-row sm:justify-end">
                      <Button
                          variant="outline"
                          className="gap-2"
                          onClick={() => copy(`${window.location.origin}/projects#${selectedProject.slug}`)}
                      >
                          <LinkIcon className="h-4 w-4" aria-hidden="true" /> {copied ? "Lien copié" : "Copier le lien"}
                      </Button>
                      <Button asChild className="gap-2">
                          <a href={selectedProject.url} target="_blank" rel="noreferrer">
                              <ExternalLink className="h-4 w-4" aria-hidden="true" /> Voir sur GitHub
                          </a>
                      </Button>
                  </DialogFooter>
              </DialogContent>
          ) : null}
      </Dialog>
    </div>
  );
}

export default HomePage;
