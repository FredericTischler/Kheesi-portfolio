import { useMemo } from "react";

import { Section } from "@/components/Section";
import { TechBadge } from "@/components/TechBadge";
import { getProfile } from "@/data/profile";
import { usePageMetadata } from "@/lib/metadata";
import { useLocale } from "@/i18n/LocaleProvider";
import { useTranslations } from "@/i18n/useTranslations";

export function AboutPage() {
  const { locale } = useLocale();
  const copy = useTranslations("about");
  const profile = getProfile(locale);

  usePageMetadata({
    title: copy.head.title,
    description: copy.head.description,
    image: "/assets/social/about.svg",
  });

  const orderedSkills = useMemo(() => {
    const list = [...profile.skills];
    const javaIndex = list.findIndex((skill) => skill.toLowerCase() === "java");
    if (javaIndex > 0) {
      const [java] = list.splice(javaIndex, 1);
      list.unshift(java);
    }
    return list;
  }, [profile.skills]);

  return (
    <div className="space-y-24 pb-20 pt-36">
      <Section className="space-y-12">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.45em] text-muted-foreground">{copy.eyebrow}</p>
            <h1 className="text-4xl font-semibold md:text-5xl">{copy.heroTitle}</h1>
            {copy.intro.map((paragraph) => (
              <p key={paragraph} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
              <h2 className="text-lg font-semibold">{copy.interestsTitle}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{profile.interests.join(" · ")}</p>
            </div>
            <div className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
              <h2 className="text-lg font-semibold">{copy.skillsTitle}</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {orderedSkills.map((skill, index) => (
                  <TechBadge key={skill} label={skill} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">{copy.formationTitle}</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {copy.formation.map((item) => (
            <div key={item.title} className="rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="space-y-8">
        <h2 className="text-3xl font-semibold md:text-4xl">{copy.valuesTitle}</h2>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {copy.values.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-3 rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default AboutPage;
