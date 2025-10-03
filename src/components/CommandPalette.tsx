import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Command, Search, SquareArrowOutUpRight } from "lucide-react";

import { NAV_LINKS } from "@/data/navigation";
import { getProjects } from "@/data/projects";
import { cn } from "@/lib/utils";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type CommandResultType = "page" | "project";

type CommandResult = {
  id: string;
  domId: string;
  type: CommandResultType;
  title: string;
  subtitle: string;
  action: () => void;
};

const COMMAND_COPY = {
  fr: {
    placeholder: "Rechercher projets ou pages...",
    empty: "Aucun résultat. Essayez un autre mot-clé.",
    resultCount: (count: number) =>
      count === 0 ? "Aucun résultat" : count === 1 ? "1 résultat" : `${count} résultats`,
    listLabel: "Résultats de la palette de commandes",
    optionType: {
      page: "Page",
      project: "Projet",
    },
  },
  en: {
    placeholder: "Search projects or pages...",
    empty: "No results. Try another keyword.",
    resultCount: (count: number) =>
      count === 0 ? "No results" : count === 1 ? "1 result" : `${count} results`,
    listLabel: "Command palette results",
    optionType: {
      page: "Page",
      project: "Project",
    },
  },
} satisfies Record<Locale, {
  placeholder: string;
  empty: string;
  resultCount: (count: number) => string;
  listLabel: string;
  optionType: Record<CommandResultType, string>;
}>;

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const { locale, buildPath } = useLocale();
  const copy = COMMAND_COPY[locale];
  const listboxId = "command-palette-results";

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

  const results = useMemo<CommandResult[]>(() => {
    const normalized = query.trim().toLowerCase();
    const pageResults = NAV_LINKS.map((page) => ({
      id: page.id,
      domId: `command-option-page-${page.id}`,
      type: "page" as const,
      title: page.labels[locale],
      subtitle: buildPath(page.path),
      action: () => {
        navigate(buildPath(page.path));
        onOpenChange(false);
      },
    })).filter((item) =>
      normalized ? item.title.toLowerCase().includes(normalized) : true,
    );

    const projectResults = getProjects(locale)
      .map((project) => ({
        id: project.slug,
        domId: `command-option-project-${project.slug}`,
        type: "project" as const,
        title: project.name,
        subtitle: project.tech.slice(0, 6).join(" · ") || project.description,
        action: () => {
          window.open(project.url, "_blank", "noopener,noreferrer");
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
  }, [buildPath, locale, navigate, onOpenChange, query]);

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

  const activeOptionId = results[activeIndex]?.domId;
  const resultsAnnouncement = copy.resultCount(results.length);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(92vw,640px)] border-none bg-background/95 p-0 shadow-elevated">
        <div className="flex items-center gap-3 border-b border-border/50 px-6 py-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            autoFocus
            placeholder={copy.placeholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-12 border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={listboxId}
            aria-activedescendant={activeOptionId}
            aria-autocomplete="list"
          />
          <span className="hidden items-center gap-1 rounded-full border border-border/40 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground lg:flex">
            <Command className="h-3 w-3" />K
          </span>
        </div>
        <div className="max-h-[400px] overflow-y-auto px-2 py-3">
          <div className="sr-only" role="status" aria-live="polite">
            {resultsAnnouncement}
          </div>
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-muted-foreground" role="status">
              {copy.empty}
            </p>
          ) : null}
          <ul
            id={listboxId}
            role="listbox"
            aria-activedescendant={activeOptionId}
            aria-label={copy.listLabel}
            className="space-y-1"
          >
            {results.map((item, index) => (
              <li key={item.domId}>
                <button
                  type="button"
                  onClick={item.action}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition",
                    index === activeIndex ? "bg-secondary/60" : "hover:bg-secondary/40",
                  )}
                  role="option"
                  id={item.domId}
                  aria-selected={index === activeIndex}
                  aria-label={`${copy.optionType[item.type]} · ${item.title}`}
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
