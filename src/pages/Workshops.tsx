import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ClipboardCheck, FileText, Search, Sparkles } from "lucide-react";

import { Section } from "@/components/Section";
import { SectionIntro } from "@/components/SectionIntro";
import { ActionButton } from "@/components/ActionButtons";
import { Dialog } from "@/components/ui/dialog";
import { ModalPreview } from "@/components/ModalPreview";
import { getWorkshops, type Workshop } from "@/data/workshops";
import { useModalSelection } from "@/hooks/useModalSelection";
import { usePageMetadata } from "@/lib/metadata";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";

const WORKSHOP_PDF_DEMO = "/assets/workshops/demo.pdf";

const PROCESS_STEPS: Record<Locale, Array<{ title: string; description: string; icon: typeof Search }>> = {
  fr: [
    {
      title: "Diagnostic express",
      description: "Un échange rapide pour comprendre votre contexte, vos irritants et prioriser le contenu.",
      icon: Search,
    },
    {
      title: "Préparation & personnalisation",
      description: "Je fournis un plan ajusté : exemples, livrables, supports adaptés à votre stack.",
      icon: Sparkles,
    },
    {
      title: "Animation & récap",
      description: "Workshop, Q&A, puis synthèse actionnable et livrables prêts à exploiter.",
      icon: ClipboardCheck,
    },
  ],
  en: [
    {
      title: "Express diagnostic",
      description: "Quick chat to understand context, pain points and prioritise content.",
      icon: Search,
    },
    {
      title: "Prep & tailoring",
      description: "I craft a plan with examples, deliverables and support adapted to your stack.",
      icon: Sparkles,
    },
    {
      title: "Delivery & recap",
      description: "Workshop, Q&A, then an actionable summary with ready-to-use deliverables.",
      icon: ClipboardCheck,
    },
  ],
};

const WORKSHOPS_COPY: Record<Locale, {
  head: { title: string; description: string };
  intro: { eyebrow: string; title: string; description: string };
  focusLabel: string;
  deliverablesIncluded: string;
  cardCta: string;
  processHeading: string;
  processDescription: string;
  planCta: string;
  modal: {
    durationLabel: string;
    badgesTitle: string;
    placeholder: string;
    program: string;
    deliverables: string;
    audience: string;
    fallbackDownload: string;
  };
}> = {
  fr: {
    head: {
      title: "Workshop Factory — Frédéric Tischler",
      description:
        "Workshops prêts à l’emploi : Angular Bootcamp, Modernisation Legacy, CI/CD. Objectifs clairs, livrables concrets, valeur immédiate pour vos équipes.",
    },
    intro: {
      eyebrow: "Workshops",
      title: "Workshop Factory",
      description:
        "Je propose des workshops prêts à déployer pour aider vos équipes à moderniser une app legacy, industrialiser Angular, ou aligner design et développement.",
    },
    focusLabel: "Focus",
    deliverablesIncluded: "Livrables inclus",
    cardCta: "Voir détails",
    processHeading: "Comment ça marche",
    processDescription: "Trois étapes simples pour lancer un workshop adapté à votre équipe et à vos priorités.",
    planCta: "Planifier un workshop",
    modal: {
      durationLabel: "Durée",
      badgesTitle: "Objectifs",
      placeholder: "Supports en préparation",
      program: "Programme",
      deliverables: "Livrables",
      audience: "Audience",
      fallbackDownload: "Télécharger exemple PDF",
    },
  },
  en: {
    head: {
      title: "Workshop Factory — Frédéric Tischler",
      description:
        "Ready-to-run workshops: Angular Bootcamp, Legacy Modernisation, CI/CD. Clear outcomes, concrete deliverables, quick impact for your team.",
    },
    intro: {
      eyebrow: "Workshops",
      title: "Workshop Factory",
      description:
        "I deliver ready-to-use workshops to modernise legacy apps, build Angular component foundations, or align design and engineering.",
    },
    focusLabel: "Focus",
    deliverablesIncluded: "Deliverables included",
    cardCta: "View details",
    processHeading: "How it works",
    processDescription: "Three simple steps to launch a workshop tailored to your team and priorities.",
    planCta: "Schedule a workshop",
    modal: {
      durationLabel: "Duration",
      badgesTitle: "Objectives",
      placeholder: "Materials coming soon",
      program: "Agenda",
      deliverables: "Deliverables",
      audience: "Audience",
      fallbackDownload: "Download sample PDF",
    },
  },
};

export default function WorkshopsPage() {
  const { locale, buildPath } = useLocale();
  const copy = WORKSHOPS_COPY[locale];
  const steps = PROCESS_STEPS[locale];
  const workshops = useMemo(() => getWorkshops(locale), [locale]);

  usePageMetadata({
    title: copy.head.title,
    description: copy.head.description,
    image: "/assets/social/projects.svg",
  });

  const prefersReducedMotion = useReducedMotion();
  const {
    selected: selectedWorkshop,
    openModal,
    closeModal,
    isOpen,
  } = useModalSelection<Workshop>();

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          ease: "easeInOut" as const,
          duration: 0.4,
          staggerChildren: 0.12,
          delayChildren: 0.1,
        },
      },
    }),
    [],
  );

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.3 } },
    }),
    [],
  );

  const selectedResources = selectedWorkshop?.resources;
  const resourceButtons = selectedResources?.buttons?.length
    ? selectedResources.buttons
    : [
        {
          label: copy.modal.fallbackDownload,
          href: WORKSHOP_PDF_DEMO,
        },
      ];

  return (
    <div className="space-y-20 pb-20 pt-36">
      <Section className="space-y-12">
        <SectionIntro
          eyebrow={copy.intro.eyebrow}
          title={copy.intro.title}
          description={copy.intro.description}
        />
        <motion.div
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          initial={prefersReducedMotion ? undefined : "hidden"}
          animate={prefersReducedMotion ? undefined : "visible"}
          variants={prefersReducedMotion ? undefined : containerVariants}
        >
          {workshops.map((workshop) => (
            <motion.div key={workshop.slug} variants={prefersReducedMotion ? undefined : cardVariants}>
              <article className="flex h-full flex-col justify-between rounded-[2rem] border border-border/60 bg-background/80 p-6 shadow-lg transition duration-200 ease-in-out hover:scale-[1.03] hover:shadow-xl">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs uppercase tracking-[0.4em] text-muted-foreground">
                      {workshop.duration}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">{workshop.title}</h3>
                    <p className="text-sm text-muted-foreground">{workshop.audience}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">{copy.focusLabel}</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {workshop.objectives.slice(0, 2).map((objective) => (
                        <li key={objective} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
                  <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{copy.deliverablesIncluded}</span>
                  <ActionButton
                    size="sm"
                    variant="outline"
                    className="gap-2"
                    icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                    onClick={() => openModal(workshop)}
                  >
                    {copy.cardCta}
                  </ActionButton>
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Section className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-semibold md:text-4xl">{copy.processHeading}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{copy.processDescription}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-[2rem] border border-border/60 bg-background/80 p-6 text-left shadow-lg"
            >
              <step.icon className="h-8 w-8 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <ActionButton asChild size="lg" className="gap-2 btn-cta">
            <Link to={buildPath("/contact")}>{copy.planCta}</Link>
          </ActionButton>
        </div>
      </Section>

      <Dialog open={isOpen} onOpenChange={(open) => (open ? undefined : closeModal())}>
        {selectedWorkshop ? (
          <ModalPreview
            title={selectedWorkshop.title}
            description={`${copy.modal.durationLabel} : ${selectedWorkshop.duration}`}
            image={selectedResources?.image}
            imageAlt={selectedWorkshop.title}
            placeholderLabel={
              selectedResources?.image
                ? undefined
                : copy.modal.placeholder
            }
            badgesTitle={copy.modal.badgesTitle}
            badges={selectedWorkshop.objectives}
            motionProps={
              prefersReducedMotion
                ? undefined
                : { layout: true, transition: { duration: 0.25, ease: "easeInOut" } }
            }
            footerSlot={
              <div className="flex flex-wrap gap-3">
                {resourceButtons.map((button) => (
                  <ActionButton
                    key={button.label}
                    variant="outline"
                    className="gap-2"
                    href={button.href}
                    icon={<FileText className="h-4 w-4" aria-hidden="true" />}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {button.label}
                  </ActionButton>
                ))}
              </div>
            }
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">{copy.modal.program}</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                  {selectedWorkshop.program.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">{copy.modal.deliverables}</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {selectedWorkshop.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 text-primary" aria-hidden="true" />
                      <span>{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">{copy.modal.audience}</h3>
                <p className="text-sm text-muted-foreground">{selectedWorkshop.audience}</p>
              </div>
            </div>
          </ModalPreview>
        ) : null}
      </Dialog>
    </div>
  );
}
