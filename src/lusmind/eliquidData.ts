// Lusmind e-liquid range data. Imagery recovered from the original
// e-liquid category and re-encoded to WebP under /assets/eliquid/.
export type EliquidFlavor = {
  slug: string;
  name: string;
  notes: string[];
  curated: boolean;
};

export const ELIQUID_FLAVORS: EliquidFlavor[] = [
  { slug: "cool-peppermint", name: "Cool Peppermint", notes: ["peppermint", "cooling lift", "clean finish"], curated: true },
  { slug: "double-apple-shisha", name: "Double Apple Shisha", notes: ["double apple", "shisha smooth", "rich"], curated: true },
  { slug: "tobacco-nut", name: "Tobacco & Nut", notes: ["tobacco base", "nutty body", "balanced"], curated: true },
  { slug: "peach-ice", name: "Peach Ice", notes: ["peach", "iced", "gentle sweet"], curated: true },
  { slug: "coffee-tobacco", name: "Coffee Tobacco", notes: ["roasted", "tobacco warmth", "rounded"], curated: true },
  { slug: "blueberry-raspberry", name: "Blueberry Raspberry", notes: ["blueberry", "raspberry", "silky"], curated: true },
  { slug: "mango-ice", name: "Mango Ice", notes: ["mango", "iced", "bright"], curated: true },
  { slug: "watermelon-ice", name: "Watermelon Ice", notes: ["watermelon", "iced", "juicy"], curated: true },
  { slug: "monster-drink", name: "Monster Drink", notes: ["energy note", "citrus hint", "sparkling feel"], curated: false },
  { slug: "banana-nut", name: "Banana Nut", notes: ["ripe banana", "nutty body", "soft sweet"], curated: false },
  { slug: "creamy-rainbow-candy", name: "Creamy Rainbow Candy", notes: ["rainbow swirl", "creamy sweet", "candy burst"], curated: false },
  { slug: "kiwi-passionfruit", name: "Kiwi & Passion Fruit", notes: ["kiwi", "tropical", "bright"], curated: false },
  { slug: "cinnamon-apple-pie", name: "Cinnamon Apple Pie", notes: ["cinnamon", "baked apple", "buttery"], curated: false },
  { slug: "caramel-custard", name: "Caramel Custard", notes: ["vanilla bean", "custard", "soft"], curated: false },
  { slug: "pineapple-coconut-ice", name: "Pineapple Coconut Ice", notes: ["pineapple", "coconut", "cool"], curated: false },
  { slug: "niagara-grape", name: "Niagara Grape", notes: ["grape", "juicy", "smooth"], curated: false },
  { slug: "green-apple", name: "Green Apple", notes: ["crisp", "tart", "refreshing"], curated: false },
  { slug: "orange-soda", name: "Orange Soda", notes: ["orange", "sparkling", "bright"], curated: false },
  { slug: "strawberry-cake", name: "Strawberry Cake", notes: ["strawberry", "cake", "sweet"], curated: false },
  { slug: "green-coconut", name: "Green Coconut", notes: ["coconut", "tropical", "creamy"], curated: false },
  { slug: "arctic-sweet-ice", name: "Arctic Sweet Ice", notes: ["cool", "icy", "clean"], curated: false },
  { slug: "melon-yogurt-ice", name: "Melon Yogurt Ice", notes: ["melon", "yogurt", "cool"], curated: false },
  { slug: "watermelon-strawberry", name: "Watermelon Strawberry", notes: ["watermelon", "strawberry", "soft"], curated: false },
  { slug: "cool-yuzu-cedar", name: "Cool Yuzu Cedar", notes: ["yuzu citrus", "cedar wood", "cooling finish"], curated: false },
];

export const eliquidImage = (slug: string, market: "us" | "me") => `/assets/eliquid/${market}/${slug}.webp`;
