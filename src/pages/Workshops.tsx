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
import { useTranslations } from "@/i18n/useTranslations";

const WORKSHOP_PDF_DEMO = "/assets/workshops/demo.pdf";
const PROCESS_ICONS = [Search, Sparkles, ClipboardCheck] as const;

export default function WorkshopsPage() {
  const { locale, buildPath } = useLocale();
  const copy = useTranslations("workshops");
  const steps = copy.process.steps;
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
          <h2 className="text-3xl font-semibold md:text-4xl">{copy.process.heading}</h2>
          <p className="mt-3 text-sm text-muted-foreground">{copy.process.description}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = PROCESS_ICONS[index] ?? Search;
            return (
              <div
                key={step.title}
                className="rounded-[2rem] border border-border/60 bg-background/80 p-6 text-left shadow-lg"
              >
                <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
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
