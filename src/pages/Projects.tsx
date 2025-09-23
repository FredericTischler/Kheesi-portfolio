import { lazy, Suspense, useEffect, useMemo, useState } from "react";

import { ProjectGrid } from "@/components/ProjectGrid";
import { ProjectFilters, type ProjectSort } from "@/components/ProjectFilters";
import { Button } from "@/components/ui/button";
import { useGitHubProjects } from "@/lib/github";
import { useQueryParams } from "@/lib/queryParams";
import { usePageMetadata } from "@/lib/metadata";

const ProjectModal = lazy(() => import("@/components/ProjectModal"));

const DEFAULT_PARAMS = {
  search: "",
  sort: "recent" as ProjectSort,
  tech: [] as string[],
};

export function ProjectsPage() {
  usePageMetadata({
    title: "Projets",
    description: "Liste des projets GitHub de Frédéric Tischler avec filtres par techno et quick view.",
  });

  const { projects, status, error } = useGitHubProjects();
  const [params, setParams] = useQueryParams(DEFAULT_PARAMS);
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const searchParam = params.search as string;
  const sortParam = params.sort as ProjectSort;
  const selectedTech = (params.tech as string[]) ?? [];
  const techKey = selectedTech.join("|");

  useEffect(() => {
    setVisibleCount(9);
  }, [searchParam, techKey, sortParam]);

  const techList = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((project) => project.tech.forEach((tech) => set.add(tech)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filtered = useMemo(() => {
    const searchTerm = searchParam.trim().toLowerCase();
    const sort = sortParam;
    const activeTech = techKey ? techKey.split("|").filter(Boolean) : [];

    const result = projects
      .filter((project) => {
        const matchSearch = searchTerm
          ? project.name.toLowerCase().includes(searchTerm) ||
            project.description.toLowerCase().includes(searchTerm) ||
            project.tech.some((tech) => tech.toLowerCase().includes(searchTerm))
          : true;
        const matchTech = activeTech.length
          ? activeTech.every((tech) => project.tech.includes(tech))
          : true;
        return matchSearch && matchTech;
      })
      .sort((a, b) => {
        if (sort === "stars") {
          return b.stars - a.stars;
        }
        if (sort === "az") {
          return a.name.localeCompare(b.name);
        }
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      });

    return result;
  }, [projects, searchParam, sortParam, techKey]);

  const displayed = filtered.slice(0, visibleCount);

  const loading = status === "loading" && !projects.length;

  return (
    <div className="space-y-14 pb-20 pt-36">
      <section className="container space-y-6">
        <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">Projets</p>
        <h1 className="text-4xl font-semibold md:text-5xl">Sélection automatique depuis GitHub</h1>
        <p className="max-w-3xl text-muted-foreground">
          Les dépôts sont chargés depuis l’API GitHub de FredericTischler, enrichis d’overrides pour les projets
          phares. Filtrez par techno, recherchez dans les descriptions et ouvrez un aperçu rapide.
        </p>
      </section>

      <section className="container space-y-10">
        <ProjectFilters
          techList={techList}
          selectedTech={(params.tech as string[]) ?? []}
          onToggleTech={(tech) => {
            const next = selectedTech.includes(tech)
              ? selectedTech.filter((item) => item !== tech)
              : [...selectedTech, tech];
            setParams({ tech: next });
          }}
          search={searchParam}
          onSearchChange={(value) => setParams({ search: value })}
          sort={sortParam}
          onSortChange={(value) => setParams({ sort: value })}
          onReset={() =>
            setParams({ search: "", sort: "recent", tech: [] }, { replace: true })
          }
        />

        {status === "error" ? (
          <div className="rounded-[2rem] border border-destructive/40 bg-destructive/10 p-6 text-sm text-destructive">
            Impossible de charger les projets GitHub : {error}
          </div>
        ) : null}

        <ProjectGrid
          projects={displayed}
          loading={loading}
          onQuickView={(project) => {
            setSelectedProject(project);
            setModalOpen(true);
          }}
        />

        {visibleCount < filtered.length ? (
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => setVisibleCount((prev) => prev + 6)}>
              Voir plus ({filtered.length - visibleCount} restants)
            </Button>
          </div>
        ) : null}
      </section>

      <Suspense fallback={null}>
        <ProjectModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />
      </Suspense>
    </div>
  );
}

export default ProjectsPage;
