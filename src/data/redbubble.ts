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
  {
    id: "aurora-cat",
    title: "Aurora Cat",
    tags: ["cat", "aurora", "gradient"],
    src: "/assets/designs/aurora.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/aurora-cat",
    createdAt: "2025-01-05",
  },
  {
    id: "street-cat",
    title: "Street Cat",
    tags: ["cat", "streetwear", "bold"],
    src: "/assets/designs/street.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/street-cat",
    createdAt: "2024-12-22",
  },
  {
    id: "synth-cat",
    title: "Synth Cat",
    tags: ["cat", "synthwave", "retro"],
    src: "/assets/designs/synth.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/synth-cat",
    createdAt: "2024-12-10",
  },
  {
    id: "noir-cat",
    title: "Noir Cat",
    tags: ["cat", "noir", "minimal"],
    src: "/assets/designs/noir.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/noir-cat",
    createdAt: "2024-11-25",
  },
  {
    id: "pixel-cat",
    title: "Pixel Cat",
    tags: ["cat", "pixel", "gaming"],
    src: "/assets/designs/pixel.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/pixel-cat",
    createdAt: "2024-11-12",
  },
  {
    id: "cyber-cat",
    title: "Cyber Cat",
    tags: ["cat", "cyberpunk", "neon"],
    src: "/assets/designs/cyber.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/cyber-cat",
    createdAt: "2024-10-30",
  },
  {
    id: "wave-cat",
    title: "Wave Cat",
    tags: ["cat", "ocean", "gradient"],
    src: "/assets/designs/wave.png",
    rbLink: "https://www.redbubble.com/people/your-shop/works/wave-cat",
    createdAt: "2024-10-18",
  },
];
