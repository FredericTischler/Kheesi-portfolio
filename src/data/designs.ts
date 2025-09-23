export type Design = {
  id: string;
  title: string;
  tags: string[];
  src: string;
  src2x?: string;
  rbLink: string;
  featured?: boolean;
  createdAt?: string;
};

export const DESIGNS: Design[] = [
  {
    id: "coffee-cat",
    title: "Coffee Cat",
    tags: ["cat", "cozy", "coffee"],
    src: "/assets/designs/coffee.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/coffee-cat",
    createdAt: "2025-02-14",
    featured: true,
  },
  {
    id: "cosmic-cat",
    title: "Cosmic Cat",
    tags: ["cat", "space", "neon"],
    src: "/assets/designs/cosmic.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/cosmic-cat",
    createdAt: "2025-02-10",
    featured: true,
  },
  {
    id: "gamer-cat",
    title: "Gamer Cat",
    tags: ["cat", "gaming", "retro"],
    src: "/assets/designs/gamer.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/gamer-cat",
    createdAt: "2025-01-27",
  },
  {
    id: "wizard-cat",
    title: "Wizard Cat",
    tags: ["cat", "fantasy", "magic"],
    src: "/assets/designs/sorcier.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/wizard-cat",
    createdAt: "2025-01-20",
  },
  {
    id: "sushi-cat",
    title: "Sushi Cat",
    tags: ["cat", "food", "kawaii"],
    src: "/assets/designs/sushi.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/sushi-cat",
    createdAt: "2025-01-15",
    featured: true,
  },
];

export const DESIGN_DETAILS: Record<
  string,
  {
    description: string;
    popularity: number;
  }
> = {
  "coffee-cat": {
    description: "Chat barista au style cozy illustré autour d’un mug latte crémeux.",
    popularity: 88,
  },
  "cosmic-cat": {
    description: "Félin astronaute sur fond néon et constellations étincelantes.",
    popularity: 94,
  },
  "gamer-cat": {
    description: "Chat gamer rétro avec casque RGB et vibe arcade années 90.",
    popularity: 86,
  },
  "wizard-cat": {
    description: "Magicien moustachu entouré de runes et étincelles mystiques.",
    popularity: 82,
  },
  "sushi-cat": {
    description: "Chef sushi félin aux couleurs kawaii et textures appétissantes.",
    popularity: 90,
  },
};
