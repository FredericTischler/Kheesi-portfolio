import { lazy, Suspense, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { Section } from "@/components/Section";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/data/profile";
import { getHighlightedProjects, PROJECTS, type Project } from "@/data/projects";
import { REDBUBBLE_ITEMS } from "@/data/redbubble";
import { usePageMetadata } from "@/lib/metadata";

const ProjectModal = lazy(() => import("@/components/ProjectModal"));

export function HomePage() {
  usePageMetadata({
    title: "Accueil",
    description:
      "Frédéric Tischler, développeur full-stack : créations d’applications web modernes, projets en Go, TypeScript et React.",
  });

  const prefersReducedMotion = useReducedMotion();
  const highlightedProjects = useMemo(() => getHighlightedProjects(), []);
  const featuredDesigns = useMemo(() => REDBUBBLE_ITEMS.slice(0, 3), []);
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

  const skills = useMemo(() => {
    const list = [...PROFILE.skills];
    const javaIndex = list.findIndex((skill) => skill.toLowerCase() === "java");
    if (javaIndex > 0) {
      const [java] = list.splice(javaIndex, 1);
      list.unshift(java);
    }
    return list;
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
              Passionné par les stacks Go, TypeScript et React, je conçois des architectures fiables,
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
            <div className="flex flex-wrap items-center gap-3 rounded-[2rem] border border-border/60 bg-background/80 p-5 shadow-lg backdrop-blur-xl">
              {skills.map((skill, index) => (
                <span
                  key={skill}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.35em] ${
                    index === 0
                      ? "border border-primary/50 bg-primary/15 text-primary"
                      : "border border-border/40 bg-secondary/40 text-muted-foreground"
                  }`}
                >
                  {skill}
                </span>
              ))}
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
            Entre deux sprints de développement, j’explore l’illustration pour RedBubble. Voici trois designs qui
            reflètent le style de ma boutique : couleurs lumineuses, typographies affirmées et atmosphères immersives.
          </p>
        </div>
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: "easeOut" }}
        >
          {featuredDesigns.map((design) => (
            <motion.article
              key={design.id}
              className="group flex h-full flex-col rounded-[2rem] border border-border/60 bg-background/80 shadow-lg"
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : { scale: 1.02, y: -6, transition: { duration: 0.3, ease: "easeOut" } }
              }
            >
              <div className="relative overflow-hidden rounded-t-[2rem] bg-secondary/30">
                <img
                  src={design.src}
                  srcSet={design.src2x ? `${design.src2x} 2x` : undefined}
                  alt={design.title}
                  loading="lazy"
                  className="aspect-square w-full object-contain p-4 transition duration-500 ease-out group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{design.title}</h3>
                  {design.createdAt ? (
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {new Date(design.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  {design.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs uppercase tracking-[0.25em]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-auto">
                  <Button asChild variant="outline" size="sm" className="w-full gap-2">
                    <a href={design.rbLink} target="_blank" rel="noreferrer">
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
