import { motion } from "framer-motion";
import { Code2, Palette, Sparkle } from "lucide-react";

const skills = [
  {
    icon: Palette,
    title: "Direction artistique",
    items: ["Moodboards", "Cohérence visuelle", "Design systems"],
  },
  {
    icon: Code2,
    title: "Front-end",
    items: ["React + TypeScript", "Motion design", "Optimisation Lighthouse"],
  },
  {
    icon: Sparkle,
    title: "Merchandising",
    items: ["RedBubble", "Print on demand", "Branding vibrant"],
  },
];

const stack = [
  "React",
  "TypeScript",
  "Vite",
  "Tailwind",
  "Framer Motion",
  "Figma",
  "shadcn/ui",
  "Lottie",
];

export function AboutPage() {
  return (
    <div className="container space-y-16">
      <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">À propos</p>
          <h1 className="text-balance text-4xl font-semibold md:text-5xl">
            Designer & front-end developer passionné par les expériences immersives.
          </h1>
          <p className="max-w-2xl text-balance text-muted-foreground">
            J’accompagne les créateurs et marques dans la mise en avant de leurs visuels et collections.
            Mes designs RedBubble mêlent textures organiques, gradients futuristes et typographies audacieuses
            pour créer des produits qui se démarquent vraiment.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="rounded-full border border-border/60 px-4 py-2">+7 ans d’expérience</span>
            <span className="rounded-full border border-border/60 px-4 py-2">
              Basé entre Paris & Berlin
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative rounded-[3rem] border border-border/50 bg-background/80 p-10 shadow-elevated backdrop-blur-2xl">
            <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
              Manifesto
            </p>
            <p className="mt-4 text-balance text-lg text-muted-foreground">
              « Chaque visuel doit raconter une histoire et donner envie d’être porté ou affiché. Je conçois des
              univers cohérents, du premier moodboard jusqu’aux mockups finaux. »
            </p>
          </div>
        </motion.div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        {skills.map(({ icon: Icon, title, items }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-4 rounded-[2rem] border border-border/50 bg-background/80 p-8 shadow-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>

      <section className="rounded-[2.5rem] border border-border/50 bg-background/60 p-10 shadow-lg">
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Stack</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border/40 bg-secondary/40 px-4 py-2 text-sm font-medium text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
