import { lazy, Suspense, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

import { Section } from "@/components/Section";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { PROFILE } from "@/data/profile";
import { useGitHubProjects, type Project } from "@/lib/github";
import { usePageMetadata } from "@/lib/metadata";

const ProjectModal = lazy(() => import("@/components/ProjectModal"));

export function HomePage() {
  usePageMetadata({
    title: "Accueil",
    description:
      "Frédéric Tischler, développeur full-stack : créations d’applications web modernes, projets en Go, TypeScript et React.",
  });

  const prefersReducedMotion = useReducedMotion();
  const { featured } = useGitHubProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const stats = useMemo(
    () => [
      { label: "Projets", value: `${Math.max(featured.length * 2, 12)}+` },
      { label: "Langages", value: `${PROFILE.skills.length}` },
      { label: "Expérience", value: "Zone01", description: "Formation & projets intensifs" },
    ],
    [featured.length],
  );

  const logos = ["Go", "TypeScript", "React", "SQLite", "Docker"];

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
              {logos.map((logo) => (
                <span
                  key={logo}
                  className="rounded-full border border-border/40 bg-secondary/40 px-4 py-2 text-xs uppercase tracking-[0.35em] text-muted-foreground"
                >
                  {logo}
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
            Un aperçu des développements récents : temps réel, interfaces immersives et outils internes. Les
            projets sont synchronisés depuis mon profil GitHub.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.slice(0, 4).map((project) => (
            <div key={project.slug}>
              <div className="flex flex-col gap-4 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    {project.updated}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  {project.tech.slice(0, 4).map((tech) => (
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
                    <a href={project.url} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {featured.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Les projets sont en cours de chargement depuis GitHub...
            </p>
          ) : null}
        </div>
      </Section>

      <Suspense fallback={null}>
        <ProjectModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />
      </Suspense>
    </div>
  );
}

export default HomePage;
