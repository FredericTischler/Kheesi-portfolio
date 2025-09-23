import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command, Loader2, Search, SquareArrowOutUpRight } from "lucide-react";

import { NAV_LINKS } from "@/data/navigation";
import { useGitHubProjects } from "@/lib/github";
import { cn } from "@/lib/utils";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const { projects, status } = useGitHubProjects();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function handle(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA");
      if (isTyping && !event.metaKey && !event.ctrlKey) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(!open);
      }
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onOpenChange, open]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const pageResults = NAV_LINKS.map((page) => ({
      type: "page" as const,
      title: page.label,
      subtitle: page.path,
      action: () => {
        navigate(page.path);
        onOpenChange(false);
      },
    })).filter((item) =>
      normalized ? item.title.toLowerCase().includes(normalized) : true,
    );

    const projectResults = projects
      .map((project) => ({
        type: "project" as const,
        title: project.name,
        subtitle: project.tech.join(" · ") || project.description,
        action: () => {
          window.open(project.url, "_blank", "noopener");
          onOpenChange(false);
        },
      }))
      .filter((item) => {
        if (!normalized) return true;
        return (
          item.title.toLowerCase().includes(normalized) ||
          item.subtitle.toLowerCase().includes(normalized)
        );
      });

    const merged = [...pageResults, ...projectResults];
    return merged.slice(0, 12);
  }, [navigate, onOpenChange, projects, query]);

  useEffect(() => {
    if (activeIndex >= results.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, results.length]);

  useEffect(() => {
    if (!open) return;
    function handleKey(event: KeyboardEvent) {
      if (!results.length) return;
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % results.length);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (event.key === "Enter") {
        event.preventDefault();
        results[activeIndex]?.action();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, open, results]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,640px)] border-none bg-background/95 p-0 shadow-elevated">
        <div className="flex items-center gap-3 border-b border-border/50 px-6 py-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            autoFocus
            placeholder="Rechercher projets ou pages..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-12 border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
          />
          <span className="hidden items-center gap-1 rounded-full border border-border/40 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground lg:flex">
            <Command className="h-3 w-3" />K
          </span>
        </div>
        <div className="max-h-[400px] overflow-y-auto px-2 py-3">
          {status === "loading" ? (
            <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Chargement des projets GitHub...
            </div>
          ) : null}
          {results.length === 0 && status === "success" ? (
            <p className="px-4 py-3 text-sm text-muted-foreground">
              Aucun résultat. Essayez un autre mot-clé.
            </p>
          ) : null}
          <ul className="space-y-1">
            {results.map((item, index) => (
              <li key={`${item.type}-${item.title}`}>
                <button
                  type="button"
                  onClick={item.action}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition",
                    index === activeIndex ? "bg-secondary/60" : "hover:bg-secondary/40",
                  )}
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                  </div>
                  {item.type === "project" ? (
                    <SquareArrowOutUpRight className="h-4 w-4 text-muted-foreground" />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
