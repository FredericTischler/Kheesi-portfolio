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

export type RBCategory = {
  id: string;
  name: string;
  description?: string;
  items: RBItem[];
};

const RB_BASE_LINK = "https://www.print-on-demand.com/people/frederictischler/works/";

const buildSrc = (fileName: string) => `/assets/designs/${encodeURIComponent(fileName)}`;

const buildLink = (slug: string) => `${RB_BASE_LINK}${slug}`;

export const REDBUBBLE_CATEGORIES: RBCategory[] = [
  {
    id: "kawaii-cats",
    name: "Kawaii Cats",
    description: "Chats malicieux aux couleurs pastel, pensés pour stickers, carnets et textiles feel good.",
    items: [
      {
        id: "cosmic-cat-adventure",
        title: "Cosmic Cat Adventure",
        tags: ["kawaii", "cat", "space", "pastel"],
        src: buildSrc("20250923_1224_Cosmic Cat Adventure_simple_compose_01k5v1j2hbe5m8tv7htan3ebgk.png"),
        rbLink: buildLink("cosmic-cat-adventure"),
        createdAt: "2025-09-23",
        featured: true,
      },
      {
        id: "kawaii-sushi-cat",
        title: "Kawaii Sushi Cat",
        tags: ["kawaii", "cat", "food", "sushi"],
        src: buildSrc("20250923_1235_Kawaii Sushi Cat_simple_compose_01k5v266mqfng9h9g4j79d3ygr.png"),
        rbLink: buildLink("kawaii-sushi-cat"),
        createdAt: "2025-09-23",
      },
      {
        id: "kawaii-gamer-cat",
        title: "Kawaii Gamer Cat",
        tags: ["kawaii", "cat", "gaming", "retro"],
        src: buildSrc("20250923_1302_Kawaii Gamer Cat_simple_compose_01k5v3sfzhef2trd0tm2y9he1w.png"),
        rbLink: buildLink("kawaii-gamer-cat"),
        createdAt: "2025-09-23",
      },
      {
        id: "kawaii-cat-coffee",
        title: "Kawaii Cat Coffee",
        tags: ["kawaii", "cat", "coffee", "cozy"],
        src: buildSrc("20250923_1416_Kawaii Cat Coffee_simple_compose_01k5v807wmekzscra0xpt8x7sr.png"),
        rbLink: buildLink("kawaii-cat-coffee"),
        createdAt: "2025-09-23",
      },
      {
        id: "kawaii-wizard-cat",
        title: "Kawaii Wizard Cat",
        tags: ["kawaii", "cat", "magic", "fantasy"],
        src: buildSrc("20250923_1424_Kawaii Wizard Cat_simple_compose_01k5v8eyrwe68b283dtkpxg8vw.png"),
        rbLink: buildLink("kawaii-wizard-cat"),
        createdAt: "2025-09-23",
      },
      {
        id: "kawaii-cat-badge",
        title: "Kawaii Cat Badge",
        tags: ["kawaii", "cat", "badge", "chibi"],
        src: buildSrc("20250923_1434_Kawaii Cat Badge_simple_compose_01k5v90qj4f0w9n5tgpe8pax6d.png"),
        rbLink: buildLink("kawaii-cat-badge"),
        createdAt: "2025-09-23",
      },
      {
        id: "kawaii-cat-parade",
        title: "Kawaii Cat Parade",
        tags: ["kawaii", "cat", "celebration", "cute"],
        src: buildSrc("20250923_1441_Kawaii Cat Parade_simple_compose_01k5v9dt9afyytk1meqaat1f0d.png"),
        rbLink: buildLink("kawaii-cat-parade"),
        createdAt: "2025-09-23",
      },
    ],
  },
  {
    id: "neon-graffiti",
    name: "Neon & Graffiti",
    description: "Énergie urbaine, typographies punchy et palettes électriques pour des pièces qui claquent.",
    items: [
      {
        id: "neon-graffiti-design",
        title: "Neon Graffiti Design",
        tags: ["graffiti", "neon", "street", "spray"],
        src: buildSrc("20250924_1410_Neon Graffiti Design_simple_compose_01k5xt33k5ftf967pw352p1j3r.png"),
        rbLink: buildLink("neon-graffiti-design"),
        createdAt: "2025-09-24",
        featured: true,
      },
      {
        id: "urban-graffiti-art",
        title: "Urban Graffiti Art",
        tags: ["graffiti", "urban", "street", "bold"],
        src: buildSrc("20250924_1411_Urban Graffiti Art_simple_compose_01k5xt5bt6ftpskk39p32fp0rn.png"),
        rbLink: buildLink("urban-graffiti-art"),
        createdAt: "2025-09-24",
      },
      {
        id: "futuristic-neon-graffiti",
        title: "Futuristic Neon Graffiti",
        tags: ["graffiti", "neon", "futuristic", "glow"],
        src: buildSrc("20250924_1415_Futuristic Neon Graffiti_simple_compose_01k5xtcejxene8y15zwcm9ms2q.png"),
        rbLink: buildLink("futuristic-neon-graffiti"),
        createdAt: "2025-09-24",
      },
      {
        id: "pop-art-explosion",
        title: "Pop Art Explosion",
        tags: ["pop art", "bold", "comic", "vibrant"],
        src: buildSrc("20250924_1416_Pop Art Explosion_simple_compose_01k5xtc6mff6k9ztjhqvv5pc2y.png"),
        rbLink: buildLink("pop-art-explosion"),
        createdAt: "2025-09-24",
      },
      {
        id: "retro-synthwave-sunset",
        title: "Retro Synthwave Sunset",
        tags: ["synthwave", "retro", "sunset", "neon"],
        src: buildSrc("20250924_1436_Retro Synthwave Sunset_simple_compose_01k5xvj6dqfdyvaqw07ytfbw1d.png"),
        rbLink: buildLink("retro-synthwave-sunset"),
        createdAt: "2025-09-24",
      },
      {
        id: "neon-graffiti-art",
        title: "Neon Graffiti Art",
        tags: ["graffiti", "neon", "street", "urban"],
        src: buildSrc("20250924_1513_Neon Graffiti Art_simple_compose_01k5xxpzejeavvwhgb3643v6ga.png"),
        rbLink: buildLink("neon-graffiti-art"),
        createdAt: "2025-09-24",
      },
    ],
  },
  {
    id: "minimalist-landscapes",
    name: "Minimalist Landscapes",
    description: "Paysages épurés, dégradés doux et silhouettes contemplatives pour une ambiance apaisante.",
    items: [
      {
        id: "abstract-sunlit-mountains",
        title: "Abstract Sunlit Mountains",
        tags: ["landscape", "minimalist", "mountains", "warm"],
        src: buildSrc("20250924_1346_Abstract Sunlit Mountains_simple_compose_01k5xrnxy0e5091xasndj5zaz6.png"),
        rbLink: buildLink("abstract-sunlit-mountains"),
        createdAt: "2025-09-24",
        featured: true,
      },
      {
        id: "minimalist-desert-scene",
        title: "Minimalist Desert Scene",
        tags: ["desert", "minimalist", "sunset", "warm"],
        src: buildSrc("20250924_1409_Minimalist Desert Scene_simple_compose_01k5xt0dage2qan7ex994m88nm.png"),
        rbLink: buildLink("minimalist-desert-scene"),
        createdAt: "2025-09-24",
      },
      {
        id: "stylized-tree-art",
        title: "Stylized Tree Art",
        tags: ["nature", "minimalist", "tree", "calm"],
        src: buildSrc("20250924_1408_Stylized Tree Art_simple_compose_01k5xszrdkehx8nggjh256176g.png"),
        rbLink: buildLink("stylized-tree-art"),
        createdAt: "2025-09-24",
      },
      {
        id: "modern-ukiyo-e-wave",
        title: "Modern Ukiyo-e Wave",
        tags: ["wave", "japan", "minimalist", "ocean"],
        src: buildSrc("20250924_1435_Modern Ukiyo-e Wave_simple_compose_01k5xvf09pf5nrj6r1s5gg2988.png"),
        rbLink: buildLink("modern-ukiyo-e-wave"),
        createdAt: "2025-09-24",
      },
      {
        id: "minimalist-mountain-sunrise",
        title: "Minimalist Mountain Sunrise",
        tags: ["mountain", "sunrise", "minimalist", "serene"],
        src: buildSrc("20250924_1445_Minimalist Mountain Sunrise_simple_compose_01k5xw3zmzexjvy3ev2rgq7364.png"),
        rbLink: buildLink("minimalist-mountain-sunrise"),
        createdAt: "2025-09-24",
      },
    ],
  },
  {
    id: "abstract-geometric",
    name: "Abstract & Geometric",
    description: "Formes graphiques, textures fluides et compositions modernes prêtes pour affiches et toiles.",
    items: [
      {
        id: "modern-minimalist-wave",
        title: "Modern Minimalist Wave",
        tags: ["abstract", "minimalist", "wave", "calm"],
        src: buildSrc("20250924_1334_Modern Minimalist Wave_simple_compose_01k5xr084we88aqxjqgxkb18wz.png"),
        rbLink: buildLink("modern-minimalist-wave"),
        createdAt: "2025-09-24",
        featured: true,
      },
      {
        id: "modern-geometric-art",
        title: "Modern Geometric Art",
        tags: ["geometric", "bold", "abstract", "modern"],
        src: buildSrc("20250924_1344_Modern Geometric Art_simple_compose_01k5xrknyjep1r0nrpzwmxakrj.png"),
        rbLink: buildLink("modern-geometric-art"),
        createdAt: "2025-09-24",
      },
      {
        id: "gradient-organic-forms",
        title: "Gradient Organic Forms",
        tags: ["abstract", "gradient", "organic", "flow"],
        src: buildSrc("20250924_1345_Gradient Organic Forms_simple_compose_01k5xrnkb7fa9a2mqgmgd87zbr.png"),
        rbLink: buildLink("gradient-organic-forms"),
        createdAt: "2025-09-24",
      },
      {
        id: "hypnotic-wavy-abstract",
        title: "Hypnotic Wavy Abstract",
        tags: ["abstract", "wavy", "motion", "bold"],
        src: buildSrc("20250924_1346_Hypnotic Wavy Abstract_simple_compose_01k5xrq2dafrvv9dykwfmfmjsm.png"),
        rbLink: buildLink("hypnotic-wavy-abstract"),
        createdAt: "2025-09-24",
      },
      {
        id: "hypnotic-wavy-abstract-v2",
        title: "Hypnotic Wavy Abstract V2",
        tags: ["abstract", "wavy", "gradient", "mesmerizing"],
        src: buildSrc("20250924_1346_Hypnotic Wavy Abstract_simple_compose_01k5xrq2dcf35v3vd7ggmv3rew.png"),
        rbLink: buildLink("hypnotic-wavy-abstract-v2"),
        createdAt: "2025-09-24",
      },
      {
        id: "crescent-moon-elegance",
        title: "Crescent Moon Elegance",
        tags: ["moon", "abstract", "night", "celestial"],
        src: buildSrc("20250924_1405_Crescent Moon Elegance_simple_compose_01k5xstrf4ffyrfd224db7g0k7.png"),
        rbLink: buildLink("crescent-moon-elegance"),
        createdAt: "2025-09-24",
      },
      {
        id: "minimalist-geometric-art",
        title: "Minimalist Geometric Art",
        tags: ["geometric", "abstract", "minimalist", "shapes"],
        src: buildSrc("20250924_1434_Minimalist Geometric Art_simple_compose_01k5xveq2zfb3tbaww9wes48y7.png"),
        rbLink: buildLink("minimalist-geometric-art"),
        createdAt: "2025-09-24",
      },
      {
        id: "minimalist-geometric-art-v2",
        title: "Minimalist Geometric Art V2",
        tags: ["geometric", "minimalist", "contrast", "modern"],
        src: buildSrc("20250924_1434_Minimalist Geometric Art_simple_compose_01k5xveq30e3wvqet61dq4bdd4.png"),
        rbLink: buildLink("minimalist-geometric-art-v2"),
        createdAt: "2025-09-24",
      },
      {
        id: "moonlit-hand-illustration",
        title: "Moonlit Hand Illustration",
        tags: ["moon", "hand", "magic", "line art"],
        src: buildSrc("20250924_1446_Moonlit Hand Illustration_simple_compose_01k5xw3qyvfbnvzypggn3sss1x.png"),
        rbLink: buildLink("moonlit-hand-illustration"),
        createdAt: "2025-09-24",
      },
      {
        id: "mystical-sun-and-moon",
        title: "Mystical Sun and Moon",
        tags: ["celestial", "sun", "moon", "boho"],
        src: buildSrc("20250924_1514_Mystical Sun and Moon_simple_compose_01k5xxq8fqewe9jychg4nx7vyt.png"),
        rbLink: buildLink("mystical-sun-and-moon"),
        createdAt: "2025-09-24",
      },
    ],
  },
];

export const REDBUBBLE_ITEMS: RBItem[] = REDBUBBLE_CATEGORIES.flatMap((category) => category.items);
