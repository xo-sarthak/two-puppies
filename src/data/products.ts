export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  images: string[];
  description: string;
  details: string[];
  identity: "Her" | "Him" | "Them";
  mood?: string;
  occasion?: string;
}

export const products: Product[] = [
  {
    id: "midnight-bloom",
    name: "Midnight Bloom Candle",
    price: "$42",
    category: "Luxe Decor",
    images: ["/images/premium_items.png", "/images/hero_gifts.png"],
    description: "A decadent blend of jasmine, sandalwood, and midnight musk. Hand-poured in a dark obsidian glass vessel designed to anchor any space.",
    details: ["40-hour burn time", "Soy wax blend", "Crackling wood wick", "Minimalist packaging"],
    identity: "Them",
    mood: "Just Because",
  },
  {
    id: "golden-moment",
    name: "Golden Moment Locket",
    price: "$120",
    category: "Jewelry",
    images: ["/images/premium_items.png", "/images/couple.png"],
    description: "A 14k gold-filled locket designed to keep your most precious memories close. Minimalist exterior with space for two tiny photographs.",
    details: ["14k Gold Filled", "18-inch chain", "Tarnish resistant", "Ethically sourced"],
    identity: "Her",
    mood: "First Anniversary",
  },
  {
    id: "serenity-set",
    name: "Serenity Gift Set",
    price: "$85",
    category: "Curated Box",
    images: ["/images/hero_gifts.png", "/images/premium_items.png"],
    description: "The ultimate 'I'm sorry' or 'Just because' kit. Includes our signature calming tea, a silk eye mask, and the Aura room mist.",
    details: ["Handpicked items", "Luxury packaging", "Custom note included"],
    identity: "Them",
    mood: "She's Mad at Me",
  },
  {
    id: "velvet-dreams",
    name: "Velvet Dreams Throw",
    price: "$65",
    category: "Loungewear",
    images: ["/images/hero_gifts.png", "/images/couple.png"],
    description: "Ultra-soft velvet throw blanket in a deep charcoal. Perfect for cozy movie nights and 'us' time.",
    details: ["100% Bamboo Velvet", "Machine washable", "50x60 inches"],
    identity: "Him",
    mood: "Special Win",
  },
];
