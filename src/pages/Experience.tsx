import { useMemo } from "react";
import { Building2, Calendar, Sparkles } from "lucide-react";

import { Section } from "@/components/Section";
import { TechBadge } from "@/components/TechBadge";
import { getProfile } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";
import { useLocale } from "@/i18n/LocaleProvider";
import { useTranslations } from "@/i18n/useTranslations";
import type { Locale } from "@/i18n/config";
import type { ExperienceMessages } from "@/i18n/types";

type PeriodObject = { start?: string; end?: string };

function formatPeriod(period: unknown, locale: Locale, labels: ExperienceMessages["periodLabels"]) {
  if (!period) return "";
  if (typeof period === "string") {
    return period;
  }
  if (typeof period === "object" && period && "start" in period) {
    const { start, end } = period as PeriodObject;
    if (!start) return "";
    const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : null;
    const formatter = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", options);
    const startLabel = formatter.format(startDate);
    if (!endDate) {
      return labels.since.replace("{{date}}", startLabel);
    }
    const endLabel = formatter.format(endDate);
    return `${startLabel}${labels.separator}${endLabel}`;
  }
  return "";
}

export default function ExperiencePage() {
  const { locale } = useLocale();
  const copy = useTranslations("experience");
  const profile = getProfile(locale);
  const experiences = profile.experiences;

  usePageMetadata({
    title: copy.head.title,
    description: copy.head.description,
    image: "/assets/social/experience.svg",
  });

  const formattedExperiences = useMemo(
    () =>
      experiences.map((experience) => ({
        ...experience,
        periodLabel: formatPeriod(experience.period, locale, copy.periodLabels),
      })),
    [copy.periodLabels, experiences, locale],
  );

  return (
    <div className="space-y-24 pb-20 pt-36">
      <Section className="space-y-10">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">{copy.eyebrow}</p>
          <h1 className="text-4xl font-semibold md:text-5xl">{copy.heroTitle}</h1>
          <p className="max-w-3xl text-muted-foreground">{copy.heroDescription}</p>
        </div>
        <div className="space-y-12">
          {formattedExperiences.map((experience, index) => (
            <div key={experience.id} className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Building2 className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{experience.company}</p>
                    <p className="text-xs uppercase tracking-[0.3em]">{experience.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" /> {experience.periodLabel}
                </div>
                <p className="text-sm text-muted-foreground">{experience.description}</p>
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold">{copy.highlightsTitle}</h2>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <Sparkles className="mt-1 h-4 w-4 text-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {experience.impact_metrics && experience.impact_metrics.length > 0 ? (
                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold">{copy.impactTitle}</h2>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {experience.impact_metrics.map((metric) => (
                        <li key={metric} className="flex items-start gap-2">
                          <Sparkles className="mt-1 h-4 w-4 text-primary" />
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="space-y-4 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
                <h2 className="text-lg font-semibold">{copy.stackTitle}</h2>
                <div className="flex flex-wrap gap-3">
                  {experience.stack.map((tech, badgeIndex) => (
                    <TechBadge key={`${experience.id}-${tech}`} label={tech} index={badgeIndex + index * 10} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
