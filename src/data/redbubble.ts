export type RBItem = {
  id: string;
  title: string;
  tags: string[];
  src: string;
  src2x?: string;
  rbLink: string;
  createdAt?: string;
  featured?: boolean;
};

export const REDBUBBLE_ITEMS: RBItem[] = [
  {
    id: "coffee-cat",
    title: "Coffee Cat",
    tags: ["cat", "coffee", "cozy"],
    src: "/assets/designs/coffee.png",
    rbLink: "https://www.redbubble.com/people/frederictischler/works/coffee-cat",
    createdAt: "2025-02-12",
    featured: true,
  },
  {
    id: "cosmic-cat",
    title: "Cosmic Cat",
    tags: ["cat", "space", "neon"],
    src: "/assets/designs/cosmic.png",
    rbLink: "https://www.redbubble.com/people/frederictischler/works/cosmic-cat",
    createdAt: "2025-02-05",
    featured: true,
  },
  {
    id: "gamer-cat",
    title: "Gamer Cat",
    tags: ["cat", "gaming", "retro"],
    src: "/assets/designs/gamer.png",
    rbLink: "https://www.redbubble.com/people/frederictischler/works/gamer-cat",
    createdAt: "2025-01-24",
  },
  {
    id: "wizard-cat",
    title: "Wizard Cat",
    tags: ["cat", "fantasy", "magic"],
    src: "/assets/designs/sorcier.png",
    rbLink: "https://www.redbubble.com/people/frederictischler/works/wizard-cat",
    createdAt: "2025-01-10",
  },
  {
    id: "sushi-cat",
    title: "Sushi Cat",
    tags: ["cat", "food", "kawaii"],
    src: "/assets/designs/sushi.png",
    rbLink: "https://www.redbubble.com/people/frederictischler/works/sushi-cat",
    createdAt: "2024-12-28",
    featured: true,
  },
];
