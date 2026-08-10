// Lusmind e-liquid range data. Imagery is stored as transparent WebP under
// /assets/eliquid/<market>/<slug>.webp.
//
// Middle East artwork source: the 2752x1536 ME design sheet (24 bottles, two
// rows of twelve). Each bottle was cut by silhouette and mapped to an existing
// slug by label/colour cue. Sheet order (row-major, left to right):
//   Row 1: melon-yogurt-ice, strawberry-cake, watermelon-strawberry, watermelon-ice,
//          double-apple-shisha, pineapple-coconut-ice, cool-yuzu-cedar, niagara-grape,
//          green-coconut, green-apple, cool-peppermint, monster-drink
//   Row 2: coffee-tobacco, tobacco-nut, orange-soda, caramel-custard,
//          cinnamon-apple-pie, banana-nut, peach-ice, kiwi-passionfruit,
//          mango-ice, arctic-sweet-ice, blueberry-raspberry, creamy-rainbow-candy
// US artwork keeps its original label/body design, but every US bottle is now
// built on ONE standardized physical bottle template: a single master supplies
// the smoked flat cap, neck, collar, shoulder, black-glass silhouette and the
// alpha channel (pixel-identical across all 24), and only the original lower
// body / label artwork is registered into it, blended 40px below the collar
// inside the uniform black-glass header region.
// Both markets are regenerated deterministically by
// scripts/rebuild-eliquid-assets.py (see the docstring in that file).

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
