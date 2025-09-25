import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { Section } from "@/components/Section";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/data/profile";
import { getHighlightedProjects, PROJECTS, type Project } from "@/data/projects";
import { REDBUBBLE_CATEGORIES, type RBCategory, type RBItem } from "@/data/redbubble";
import { usePageMetadata } from "@/lib/metadata";

type SkillItem = {
  name: string;
  icon: string;
  color: string;
  category: string;
};

const SKILL_ITEMS: SkillItem[] = [
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    color: "#f89820",
    category: "Langages",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    color: "#3178c6",
    category: "Langages",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#f7df1e",
    category: "Langages",
  },
  {
    name: "Go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    color: "#00add8",
    category: "Langages",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "#61dafb",
    category: "Frontend",
  },
  {
    name: "HTML/CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#e44d26",
    category: "Frontend",
  },
  {
    name: "Angular",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
    color: "#dd0031",
    category: "Frontend",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#539e43",
    category: "Backend & DevOps",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    color: "#0db7ed",
    category: "Backend & DevOps",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    color: "#336791",
    category: "Bases de données",
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#00618a",
    category: "Bases de données",
  },
  {
    name: "SQLite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
    color: "#003b57",
    category: "Bases de données",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    color: "#3776ab",
    category: "Langages",
  },
  {
    name: "Langage C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    color: "#283593",
    category: "Langages",
  },
];

const ProjectModal = lazy(() => import("@/components/ProjectModal"));

export function HomePage() {
  usePageMetadata({
    title: "Accueil",
    description:
      "Frédéric Tischler, développeur full-stack : créations d’applications web modernes, projets en Go, TypeScript et React.",
  });

  const prefersReducedMotion = useReducedMotion();
  const highlightedProjects = useMemo(() => getHighlightedProjects(), []);
  const featuredDesigns = useMemo(
    () =>
      REDBUBBLE_CATEGORIES.map((category) => {
        const item = category.items.find((design) => design.featured) ?? category.items[0];
        if (!item) {
          return null;
        }
        return { category, item };
      }).filter(Boolean) as Array<{ category: RBCategory; item: RBItem }>,
    [],
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const stats = useMemo(
    () => [
      { label: "Projets", value: `${PROJECTS.length}` },
      { label: "Compétences", value: `${PROFILE.skills.length}` },
      { label: "Parcours", value: "Licence + Zone01", description: "Fondations théoriques & pratique intensive" },
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
    <div className="space-y-24 pb-20">
      <section className="pt-36">
        <div className="container grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
              <Button asChild size="lg" className="gap-2">
                <Link to="/projects">
                  Voir mes projets <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <a href="/assets/cv-frederic-tischler.pdf" download>
                  <Download className="h-4 w-4" /> Télécharger mon CV
                </a>
              </Button>
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
              {stats.map((stat, index) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} description={stat.description} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-background/80 py-12">
        <div className="container">
          <div className="space-y-8 py-10">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Stacks maîtrisées</span>
              <h2 className="text-3xl font-semibold text-foreground md:text-4xl">Compétences principales</h2>
              <p className="max-w-3xl text-sm text-muted-foreground">
                Focus sur les technologies que j’utilise au quotidien : architecture backend robuste, interfaces réactives et
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
                <div className="flex flex-wrap justify-center gap-3 py-4">
                  {SKILL_ITEMS.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-3 rounded-lg border px-4 py-3"
                      style={{
                        backgroundColor: hexToRgba(item.color, 0.12),
                        borderColor: hexToRgba(item.color, 0.35),
                        color: item.color,
                      }}
                    >
                      <img src={item.icon} alt="" loading="lazy" className="h-6 w-6" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em]">{item.name}</span>
                        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80">{item.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <motion.div
                  className="flex min-w-max gap-4 py-4 pl-2 pr-16"
                  initial={{ x: 0 }}
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ repeat: Infinity, duration: Math.max(SKILL_ITEMS.length * 3, 18), ease: "linear" }}
                >
                  {[...SKILL_ITEMS, ...SKILL_ITEMS].map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center gap-3 rounded-lg border px-4 py-3"
                      style={{
                        backgroundColor: hexToRgba(item.color, 0.12),
                        borderColor: hexToRgba(item.color, 0.35),
                        color: item.color,
                      }}
                    >
                      <img src={item.icon} alt="" loading="lazy" className="h-6 w-6" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em]">{item.name}</span>
                        <span className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground/80">{item.category}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Section className="space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">À la une</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Projets notables</h2>
          <p className="max-w-2xl text-muted-foreground">
            Un aperçu des développements récents : temps réel, interfaces immersives et outils internes. Sélection
            extraite des projets les plus représentatifs.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {highlightedProjects.slice(0, 2).map((project) => (
            <div key={project.slug}>
              <div className="flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {project.stacks.slice(0, 4).map((tech) => (
                    <span key={tech} className="rounded-full bg-secondary/40 px-3 py-1 uppercase tracking-[0.25em]">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button size="sm" onClick={() => { setSelectedProject(project); setModalOpen(true); }}>
                    Aperçu
                  </Button>
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <a
                      href={`https://github.com/FredericTischler/${project.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Designs favoris</p>
          <h2 className="text-3xl font-semibold md:text-4xl">Sélection RedBubble mise en avant</h2>
          <p className="max-w-2xl text-muted-foreground">
            Entre deux sprints de développement, j’explore l’illustration pour RedBubble. Chaque aperçu ci-dessous met en
            avant une catégorie de la boutique pour donner un panorama rapide des univers proposés.
          </p>
        </div>
        <motion.div
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
        >
          {featuredDesigns.map(({ category, item }) => (
            <motion.article
              key={item.id}
              className="group flex h-full flex-col rounded-[2rem] border border-border/60 bg-background/80 shadow-lg"
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { scale: 1.02, y: -6, transition: { duration: 0.3, ease: "easeOut" } }
              }
            >
              <div className="relative overflow-hidden rounded-t-[2rem] bg-secondary/30">
                <img
                  src={item.src}
                  srcSet={item.src2x ? `${item.src2x} 2x` : undefined}
                  alt={item.title}
                  loading="lazy"
                  className="aspect-square w-full object-contain p-4 transition duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <Badge variant="outline" className="whitespace-nowrap px-3 py-1 text-[10px] uppercase tracking-[0.3em]">
                      {category.name}
                    </Badge>
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
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-[0.25em]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto">
                  <Button asChild variant="outline" size="sm" className="w-full gap-2">
                    <a href={item.rbLink} target="_blank" rel="noreferrer">
                      Voir sur RedBubble
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Section>

      <Suspense fallback={null}>
        <ProjectModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />
      </Suspense>
    </div>
  );
}

export default HomePage;
