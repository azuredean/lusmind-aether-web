import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Globe, Cookie, ChevronRight, Flame, Info, X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { AgeVerification } from "@/components/AgeVerification";
import Navbar from "@/components/Navbar";
import meArcticSweetIce from "@/assets/me-products/arctic-sweet-ice.png";
import meBananaNut from "@/assets/me-products/banana-nut.png";
import meBlueberryRaspberry from "@/assets/me-products/blueberry-raspberry.png";
import meCaramelCustard from "@/assets/me-products/caramel-custard.png";
import meCinnamonApplePie from "@/assets/me-products/cinnamon-apple-pie.png";
import meCoffeeTobacco from "@/assets/me-products/coffee-tobacco.png";
import meCoolPeppermint from "@/assets/me-products/cool-peppermint.png";
import meCoolYuzuCedar from "@/assets/me-products/cool-yuzu-cedar.png";
import meCreamyRainbowCandy from "@/assets/me-products/creamy-rainbow-candy.png";
import meDoubleAppleShisha from "@/assets/me-products/double-apple-shisha.png";
import meGreenApple from "@/assets/me-products/green-apple.png";
import meGreenCoconut from "@/assets/me-products/green-coconut.png";
import meKiwiPassionfruit from "@/assets/me-products/kiwi-passionfruit.png";
import meMangoIce from "@/assets/me-products/mango-ice.png";
import meMelonYogurtIce from "@/assets/me-products/melon-yogurt-ice.png";
import meStrawberryCake from "@/assets/me-products/strawberry-cake.png";
import meTobaccoNut from "@/assets/me-products/tobacco-nut.png";
import meWatermelonIce from "@/assets/me-products/watermelon-ice.png";
import meWatermelonStrawberry from "@/assets/me-products/watermelon-strawberry.png";
import meMonsterDrink from "@/assets/me-products/monster-drink.png";
import mePeachIce from "@/assets/me-products/peach-ice.png";
import mePineappleCoconutIce from "@/assets/me-products/pineapple-coconut-ice.png";
import meNiagaraGrape from "@/assets/me-products/niagara-grape.png";
import meOrangeSoda from "@/assets/me-products/orange-soda.png";
const theme = {
  bg: {
    canvas: "#F7F5F2",
    oatmeal: "#EDE6DD",
    beige: "#F4EFE9"
  },
  text: {
    base: "#1F2937",
    mute: "#6B7280"
  },
  pastel: {
    blue: "#CFE8FF",
    mint: "#D8F3E1",
    coral: "#FFD6D6"
  },
  accent: {
    softOrange: "#FFCFA3",
    softYellow: "#FFE8A3"
  },
  brand: {
    primary: "#353995",
    secondary: "#E6FE7F"
  }
};
const FLAVORS = [{
  key: "cool-peppermint",
  name: "Cool Peppermint",
  image: "/lovable-uploads/ea4cfe6b-b1b0-448a-889e-768ca1c65908.png",
  imageME: meCoolPeppermint,
  palette: ["#D8F3E1", "#CFE8FF", "#E6FE7F"],
  bottle: {
    from: "#EAFBF2",
    to: "#D8F3E1"
  },
  notes: ["peppermint", "cooling lift", "clean finish"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #EAF9F1 100%)"
}, {
  key: "monster-drink",
  name: "Monster Drink",
  image: "/lovable-uploads/91c3186a-70e4-42e6-bf1e-406deac7ce00.png",
  imageME: meMonsterDrink,
  palette: ["#E6FE7F", "#CFE8FF", "#FFE8A3"],
  bottle: {
    from: "#F2FFE6",
    to: "#E6FE7F"
  },
  notes: ["energy note", "citrus hint", "sparkling feel"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #F5FFE6 100%)"
}, {
  key: "banana-nut",
  name: "Banana Nut",
  image: "/lovable-uploads/a464032b-a094-456e-aea8-80e539a970c7.png",
  imageME: meBananaNut,
  palette: ["#FFE8A3", "#F4EFE9", "#D7C2A3"],
  bottle: {
    from: "#FFF8E1",
    to: "#FFE8A3"
  },
  notes: ["ripe banana", "nutty body", "soft sweet"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFF7E9 100%)"
}, {
  key: "keel-scout",
  name: "Double Apple Shisha",
  image: "/lovable-uploads/0437b888-5834-4830-9e2c-7f144ebc2572.png",
  imageME: meDoubleAppleShisha,
  palette: ["#CFE8FF", "#E6FE7F", "#D8F3E1"],
  bottle: {
    from: "#EAF4FF",
    to: "#CFE8FF"
  },
  notes: ["double apple", "shisha smooth", "rich"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #EEF6FF 100%)"
}, {
  key: "tobacco-mint",
  name: "Tobacco & Nut",
  image: "/lovable-uploads/3ce25664-49eb-4c06-b7e4-fd8609332e17.png",
  imageME: meTobaccoNut,
  palette: ["#D2B48C", "#D8F3E1", "#F4EFE9"],
  bottle: {
    from: "#F1E8D2",
    to: "#D2B48C"
  },
  notes: ["tobacco base", "nutty body", "balanced"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #F2EBDD 100%)"
}, {
  key: "strawberry-jam",
  name: "Creamy Rainbow Candy",
  image: "/lovable-uploads/407f84ee-9002-4f3c-93f9-934ad61b36df.png",
  imageME: meCreamyRainbowCandy,
  palette: ["#FFD6D6", "#FFE8A3", "#CFE8FF"],
  bottle: {
    from: "#FFF1F1",
    to: "#FFD6D6"
  },
  notes: ["rainbow swirl", "creamy sweet", "candy burst"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFF1F1 100%)"
}, {
  key: "kiwi-passion-fruit",
  name: "Kiwi & Passion Fruit",
  image: "/lovable-uploads/58d2fae3-6db0-472a-9ad3-63efa0fe4eba.png",
  imageME: meKiwiPassionfruit,
  palette: ["#D8F3E1", "#FFE8A3", "#FFCFA3"],
  bottle: {
    from: "#E6F9D8",
    to: "#FFF0CC"
  },
  notes: ["kiwi", "tropical", "bright"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #F3FFE9 100%)"
}, {
  key: "cinnamon-apple-pie",
  name: "Cinnamon Apple Pie",
  image: "/lovable-uploads/74d4636a-0a38-40e9-af35-cbce508310fb.png",
  imageME: meCinnamonApplePie,
  palette: ["#FFD6B5", "#FFE8A3", "#D2B48C"],
  bottle: {
    from: "#FFF0E3",
    to: "#FFD6B5"
  },
  notes: ["cinnamon", "baked apple", "buttery"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFF0E6 100%)"
}, {
  key: "peach-ice",
  name: "Peach Ice",
  image: "/lovable-uploads/f2771975-4d08-4667-84d2-768cc835b7c4.png",
  imageME: mePeachIce,
  palette: ["#FFCFA3", "#FFE8A3", "#CFE8FF"],
  bottle: {
    from: "#FFF1E6",
    to: "#FFCFA3"
  },
  notes: ["peach", "iced", "gentle sweet"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFF4E9 100%)"
}, {
  key: "coffee-tobacco",
  name: "Coffee Tobacco",
  image: "/lovable-uploads/5018366c-93d6-45d8-9b6c-3a38dd9f4f73.png",
  imageME: meCoffeeTobacco,
  palette: ["#C8B18B", "#F4EFE9", "#D2B48C"],
  bottle: {
    from: "#EDE3D2",
    to: "#C8B18B"
  },
  notes: ["roasted", "tobacco warmth", "rounded"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #F1EAE0 100%)"
}, {
  key: "blueberry-raspberry",
  name: "Blueberry Raspberry",
  image: "/lovable-uploads/bc1fc5de-0472-4e0b-99df-56017a874103.png",
  imageME: meBlueberryRaspberry,
  palette: ["#CFE8FF", "#E5D9FF", "#FFD6D6"],
  bottle: {
    from: "#EEF5FF",
    to: "#CFE8FF"
  },
  notes: ["blueberry", "raspberry", "silky"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #EEF3FF 100%)"
}, {
  key: "vanilla-custard",
  name: "Caramel Custard",
  image: "/lovable-uploads/577fbebc-68bb-4093-ab17-308fae3d01e0.png",
  imageME: meCaramelCustard,
  palette: ["#FFF2CC", "#FFE8A3", "#F4EFE9"],
  bottle: {
    from: "#FFF8E6",
    to: "#FFF2CC"
  },
  notes: ["vanilla bean", "custard", "soft"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFF9EC 100%)"
}, {
  key: "mango-ice",
  name: "Mango Ice",
  image: "/lovable-uploads/822f2f7d-7d53-4e3d-ae1d-58cd9bde0e71.png",
  imageME: meMangoIce,
  palette: ["#FFCFA3", "#FFE8A3", "#CFE8FF"],
  bottle: {
    from: "#FFF0E0",
    to: "#FFCFA3"
  },
  notes: ["mango", "iced", "bright"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFF5E8 100%)"
}, {
  key: "pineapple-coconut-ice",
  name: "Pineapple Coconut Ice",
  image: "/lovable-uploads/175a9edd-1618-4c0e-9274-bd02344d1215.png",
  imageME: mePineappleCoconutIce,
  palette: ["#FFF2CC", "#EAF9F1", "#CFE8FF"],
  bottle: {
    from: "#FFFFE8",
    to: "#FFF2CC"
  },
  notes: ["pineapple", "coconut", "cool"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFFFF0 100%)"
}, {
  key: "niagara-grape",
  name: "Niagara Grape",
  image: "/lovable-uploads/e038dd85-abb1-4f83-a740-67ad5ddd3e05.png",
  imageME: meNiagaraGrape,
  palette: ["#E5D9FF", "#CFE8FF", "#FFD6D6"],
  bottle: {
    from: "#F3ECFF",
    to: "#E5D9FF"
  },
  notes: ["grape", "juicy", "smooth"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #F7F2FF 100%)"
}, {
  key: "green-apple",
  name: "Green Apple",
  image: "/lovable-uploads/abbd21c8-208e-4b40-97f2-9255fea9c770.png",
  imageME: meGreenApple,
  palette: ["#E6FE7F", "#D8F3E1", "#CFE8FF"],
  bottle: {
    from: "#F2FFE6",
    to: "#E6FE7F"
  },
  notes: ["crisp", "tart", "refreshing"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #F5FFE8 100%)"
}, {
  key: "orange-soda",
  name: "Orange Soda",
  image: "/lovable-uploads/8e9f2418-eb1b-4b3c-ae84-cff7bb4703d4.png",
  imageME: meOrangeSoda,
  palette: ["#FFD1A3", "#FFE8A3", "#CFE8FF"],
  bottle: {
    from: "#FFF2E6",
    to: "#FFD1A3"
  },
  notes: ["orange", "sparkling", "bright"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFF1E9 100%)"
}, {
  key: "strawberry-cake",
  name: "Strawberry Cake",
  image: "/lovable-uploads/348c3797-7f4a-4d95-a936-43dee5f6960e.png",
  imageME: meStrawberryCake,
  palette: ["#FFD6D6", "#E5D9FF", "#CFE8FF"],
  bottle: {
    from: "#FFF3F3",
    to: "#FFD6D6"
  },
  notes: ["strawberry", "cake", "sweet"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFF6FD 100%)"
}, {
  key: "green-coconut",
  name: "Green Coconut",
  image: "/lovable-uploads/4368fcfa-8df8-410d-89de-dd898164b244.png",
  imageME: meGreenCoconut,
  palette: ["#D8F3E1", "#EAF9F1", "#CFE8FF"],
  bottle: {
    from: "#F0FFF4",
    to: "#D8F3E1"
  },
  notes: ["coconut", "tropical", "creamy"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #F0FFF2 100%)"
}, {
  key: "arctic-berry-ice",
  name: "Arctic Sweet Ice",
  image: "/lovable-uploads/5a603468-2ecb-409f-9820-41d985294da4.png",
  imageME: meArcticSweetIce,
  palette: ["#CFE8FF", "#E5D9FF", "#D8F3E1"],
  bottle: {
    from: "#F0F7FF",
    to: "#CFE8FF"
  },
  notes: ["cool", "icy", "clean"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #EEF8FF 100%)"
}, {
  key: "watermelon-ice",
  name: "Watermelon Ice",
  image: "/lovable-uploads/b4f62c5c-19f1-4a54-9493-2fc10fa9c157.png",
  imageME: meWatermelonIce,
  palette: ["#FFD6D6", "#CFE8FF", "#E6FE7F"],
  bottle: {
    from: "#FFF1F1",
    to: "#FFD6D6"
  },
  notes: ["watermelon", "iced", "juicy"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFF5F7 100%)"
}, {
  key: "melon-yogurt-ice",
  name: "Melon Yogurt Ice",
  image: "/lovable-uploads/e9ceb65c-4181-4594-93ba-05d6c587459e.png",
  imageME: meMelonYogurtIce,
  palette: ["#E6FE7F", "#FFF2CC", "#CFE8FF"],
  bottle: {
    from: "#F6FFE8",
    to: "#E6FE7F"
  },
  notes: ["melon", "yogurt", "cool"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #F7FFE8 100%)"
}, {
  key: "watermelon-strawberry",
  name: "Watermelon Strawberry",
  image: "/lovable-uploads/d40cfc6b-12e9-4fac-b78c-42867e649607.png",
  imageME: meWatermelonStrawberry,
  palette: ["#FFD6D6", "#CFE8FF", "#FFE8A3"],
  bottle: {
    from: "#FFF1F1",
    to: "#FFD6D6"
  },
  notes: ["watermelon", "strawberry", "soft"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #FFF6F3 100%)"
}, {
  key: "cool-yuzu-cedar",
  name: "Cool Yuzu Cedar",
  image: "/lovable-uploads/1a057b10-b648-4b7f-9860-481b721fcef3.png",
  imageME: meCoolYuzuCedar,
  palette: ["#D8F3E1", "#FFF2CC", "#D2B48C"],
  bottle: {
    from: "#F0FFF4",
    to: "#D8F3E1"
  },
  notes: ["yuzu citrus", "cedar wood", "cooling finish"],
  bgTint: "linear-gradient(180deg, #F7F5F2 0%, #F0FFF2 100%)"
}] as const;
const isBrowser = typeof window !== "undefined";
function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}
function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const to255 = (s: string) => parseInt(s, 16);
  let r = 0,
    g = 0,
    b = 0;
  if (h.length === 3) {
    r = to255(h[0] + h[0]);
    g = to255(h[1] + h[1]);
    b = to255(h[2] + h[2]);
  } else if (h.length === 6) {
    r = to255(h.slice(0, 2));
    g = to255(h.slice(2, 4));
    b = to255(h.slice(4, 6));
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function FluidSmoke({
  colors
}: {
  colors: string[];
}) {
  const prefersReduced = isBrowser && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const blobs = useMemo(() => colors.map((c, i) => ({
    id: i,
    size: 220 + i * 40,
    color: c,
    x: (i % 2 === 0 ? -1 : 1) * (40 + i * 10),
    y: (i - 1) * 20,
    delay: i * 0.4
  })), [colors]);
  return <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map(b => <motion.div key={b.id} initial={{
      opacity: 0.22,
      x: b.x,
      y: b.y,
      scale: 0.95
    }} animate={prefersReduced ? {} : {
      opacity: [0.22, 0.35, 0.22],
      x: [b.x, b.x + 12, b.x - 12, b.x],
      y: [b.y, b.y - 10, b.y + 10, b.y],
      scale: [0.95, 1.03, 0.97, 0.95]
    }} transition={prefersReduced ? {
      duration: 0
    } : {
      duration: 10 + b.id * 2,
      repeat: Infinity,
      delay: b.delay
    }} style={{
      width: b.size,
      height: b.size,
      background: `radial-gradient(ellipse at center, ${b.color} 0%, transparent 70%)`,
      filter: "blur(40px)"
    }} className="absolute rounded-full mix-blend-multiply" />)}
    </div>;
}
function Bottle({
  from,
  to,
  highlight = "#FFFFFF",
  shadow = "rgba(0,0,0,0.06)"
}: {
  from: string;
  to: string;
  highlight?: string;
  shadow?: string;
}) {
  return <svg viewBox="0 0 240 520" className="w-48 md:w-56 drop-shadow-xl">
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id="h" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor={highlight} stopOpacity="0.8" />
          <stop offset="60%" stopColor={highlight} stopOpacity="0" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="505" rx="80" ry="12" fill={shadow} />
      <rect x="60" y="80" width="120" height="360" rx="24" fill="url(#g)" />
      <rect x="90" y="40" width="60" height="60" rx="12" fill="url(#g)" />
      <rect x="88" y="20" width="64" height="24" rx="6" fill="#D1D5DB" />
      <rect x="70" y="160" width="100" height="200" rx="18" fill="#FFFFFF" opacity="0.85" />
      <rect x="68" y="120" width="30" height="280" fill="url(#h)" />
    </svg>;
}
const REGION_INFO: Record<string, {
  name: string;
  warnings: string[];
}> = {
  US: {
    name: "United States (21+)",
    warnings: ["WARNING: This product may contain nicotine. Nicotine is an addictive chemical.", "For adults of legal age only (21+). Keep out of reach of children and pets.", "No therapeutic or cessation claims. Not intended for use by pregnant or nursing individuals."]
  },
  CA: {
    name: "California (Prop 65)",
    warnings: ["⚠︎ WARNING: This product can expose you to chemicals including nicotine, which is known to the State of California to cause birth defects or other reproductive harm.", "For adults of legal age only (21+). Keep out of reach of children and pets."]
  }
};
function CookieBanner({
  onAccept
}: {
  onAccept: () => void;
}) {
  return <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] md:w-[720px] rounded-2xl bg-slate-900/90 backdrop-blur p-4 shadow-xl border border-white/10">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2">
          <Cookie className="w-5 h-5 text-white" />
          <p className="text-sm text-slate-200">
            We use essential and analytics cookies to improve your experience. By continuing, you agree to our <a className="underline ml-1" href="#" aria-label="privacy">Privacy Policy</a>.
          </p>
        </div>
        <div className="md:ml-auto flex gap-2">
          <Button className="rounded-xl" onClick={onAccept} style={{
          background: theme.brand.secondary,
          color: "#0B102A"
        }}>Accept</Button>
        </div>
      </div>
    </div>;
}
function FlavorSelector({
  value,
  onChange
}: {
  value: string;
  onChange: (key: typeof FLAVORS[number]["key"]) => void;
}) {
  return <div className="flex items-center gap-2 p-1 bg-white/10 backdrop-blur rounded-2xl border border-white/10 overflow-x-auto whitespace-nowrap">
      {FLAVORS.map(f => <button key={f.key} onClick={() => onChange(f.key)} className={cn("px-3 py-2 rounded-xl text-sm transition-all shrink-0", value === f.key ? "bg-white/10 text-white" : "hover:bg-white/5")} aria-pressed={value === f.key}>
          {f.name}
        </button>)}
    </div>;
}
function ProductCard({
  flavor,
  version
}: {
  flavor: typeof FLAVORS[number];
  version: 'ME' | 'US';
}) {
  const displayImage = version === 'ME' ? (flavor as any).imageME : (flavor as any).image;
  
  return <Card className="rounded-3xl border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Badge className="rounded-xl" variant="secondary">New</Badge>
          <span>{flavor.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          {displayImage ? <div className="w-[7.2rem] md:w-[8.4rem] aspect-[3/4] flex items-center justify-center">
              <img src={displayImage} alt={flavor.name} className="w-full h-full object-contain rounded-2xl" />
            </div> : <Bottle from={flavor.bottle.from} to={flavor.bottle.to} />}
          <div className="space-y-2 text-sm text-slate-300">
            {flavor.notes.map((n, i) => <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{
              background: flavor.palette[i % flavor.palette.length]
            }} />
                <span>{n}</span>
              </div>)}
          </div>
        </div>
      </CardContent>
    </Card>;
}
function RegionNotice({
  region,
  onRegionChange
}: {
  region: keyof typeof REGION_INFO;
  onRegionChange: (r: keyof typeof REGION_INFO) => void;
}) {
  const info = REGION_INFO[region];
  return <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-4">
      <div className="flex items-center gap-2 mb-2">
        <Globe className="w-4 h-4 text-white" />
        <span className="text-sm font-medium text-white">Region:</span>
        <select className="text-sm bg-white/10 text-slate-100 border border-white/10 rounded-lg px-2 py-1" value={region} onChange={e => onRegionChange(e.target.value as keyof typeof REGION_INFO)}>
          {Object.entries(REGION_INFO).map(([k, v]) => <option value={k} key={k} className="text-slate-900">{v.name}</option>)}
        </select>
      </div>
      <ul className="text-xs text-slate-200 list-disc pl-5 space-y-1">
        {info.warnings.map((w, i) => <li key={i}>{w}</li>)}
      </ul>
      <div className="mt-2 flex items-start gap-2 text-xs text-slate-400">
        <Info className="w-4 h-4 mt-0.5" />
        <p>This page is not legal advice. Actual requirements vary and change over time. Consult local counsel for your selling/display region.</p>
      </div>
    </div>;
}
function TopWarningBar() {
  return <div className={cn("w-full border-b bg-black text-white border-white/20")}>
      <div className="max-w-6xl mx-auto px-4 py-2 text-center text-xs md:text-sm tracking-wide">
        WARNING: This product contains nicotine. Nicotine is an addictive chemical.
      </div>
    </div>;
}
function Hero({
  flavor,
  onInvertedChange,
  version
}: {
  flavor: typeof FLAVORS[number];
  onInvertedChange?: (inv: boolean) => void;
  version: 'ME' | 'US';
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", v => {
      onInvertedChange?.(v < 0.98);
    });
    return () => {
      unsub?.();
    };
  }, [scrollYProgress, onInvertedChange]);
  const bg = `radial-gradient(1000px 600px at 80% -20%, ${hexToRgba(flavor.palette[0], 0.18)}, transparent 60%), linear-gradient(180deg, #2A2F88 0%, ${theme.brand.primary} 48%, #1A1D66 100%)`;
  const smokeColors = [theme.brand.secondary, flavor.palette[0], flavor.palette[1] ?? "#5156B3"];
  
  // ME版本显示imageME，US版本显示image
  const displayImage = version === 'ME' ? (flavor as any).imageME : flavor.image;
  
  return <section id="home" ref={ref} className="relative overflow-hidden" style={{
    background: bg
  }}>
      <div className="absolute inset-0 opacity-70">
        <FluidSmoke colors={smokeColors} />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-20">
        <motion.div style={{
        y
      }} className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full backdrop-blur px-3 py-1 border bg-white/10 border-white/10 text-slate-100">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs">Designed for adults · Compliant by design</span>
            </div>
            <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-white">A light, modern, and caring vapor experience</h1>
            <p className="mt-4 max-w-xl text-slate-200">We move away from the dark, techy trope and embrace a light aesthetic with fluid motion. Emotional visuals and gentle interactions create a comfortable, elevated brand atmosphere.</p>
            <div className="mt-6 flex items-center gap-3">
              <Button className="rounded-xl hover:opacity-90" style={{
              background: theme.brand.secondary,
              color: "#0B102A"
            }}>Try now</Button>
              <Button variant="ghost" className="rounded-xl text-white hover:bg-white/10">Our philosophy</Button>
            </div>
          </div>
          <div className="relative flex justify-center md:justify-end">
            {displayImage && (
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6
            }} key={flavor.key}>
                <img
                  src={displayImage}
                  alt={flavor.name}
                  className="w-48 md:w-56 h-auto drop-shadow-xl"
                  style={{
                    marginTop: "clamp(-6rem, -12vw, -1.5rem)"
                  }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>;
}
function SafetySection({
  region,
  onRegionChange
}: {
  region: keyof typeof REGION_INFO;
  onRegionChange: (r: keyof typeof REGION_INFO) => void;
}) {
  return <section id="safety" className="relative py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Compliance First · Safety by Default</h2>
          <p className="text-slate-300">
            Compliance is integrated into the experience: age-gate on entry, persistent page warnings, region-specific notices, and cookie/privacy controls with restrained language and visuals to avoid appealing to minors.
          </p>
          <ul className="list-disc pl-5 text-slate-200 space-y-2">
            <li>Age verification (21+ in the U.S.)</li>
            <li>Health/safety warnings and non-therapeutic statements</li>
            <li>Region-specific notices (e.g., U.S. general, California Prop 65)</li>
            <li>Cookie and privacy preference management</li>
          </ul>
        </div>
        <RegionNotice region={region} onRegionChange={onRegionChange} />
      </div>
    </section>;
}
function Story({
  palette
}: {
  palette: readonly string[];
}) {
  const colors = useMemo(() => [theme.brand.secondary, ...palette], [palette]);
  const rows = [50, 90, 130, 170, 210, 250];
  return <section id="story" className="py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Light & Harmony · Brand Story</h2>
          <p className="mt-4 text-slate-300">
            LUSMIND pursues a light, contemporary feel. Soft colors, paper-like grain, and flowing lines build a soothing space between tech and nature.
          </p>
          <div className="mt-6 flex gap-3">
            <Button className="rounded-xl" style={{
            background: theme.brand.secondary,
            color: "#0B102A"
          }}>Read more</Button>
          </div>
        </div>
        <div className="relative h-72 md:h-80 rounded-3xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden">
          <div className="absolute inset-0 grid place-items-center">
            <motion.svg viewBox="0 0 600 300" className="w-[92%] h-[92%]" aria-hidden>
              <defs>
                <filter id="blurSoft" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.2" />
                </filter>
              </defs>
              <motion.g animate={{
              x: [-6, 6, -6]
            }} transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut"
            }}>
                {rows.map((y, i) => {
                const c = colors[i % colors.length];
                const d = `M 20 ${y} C 180 ${y - 22}, 420 ${y + 22}, 580 ${y}`;
                const dur = 9 + i * 1.2;
                const delay = i * 0.35;
                return <g key={i} filter="url(#blurSoft)">
                      <motion.path d={d} fill="none" stroke={c} strokeOpacity={0.6} strokeWidth={2.2} pathLength={1} strokeDasharray="0.2 1" initial={{
                    strokeDashoffset: 1
                  }} animate={{
                    strokeDashoffset: [1, 0, -1]
                  }} transition={{
                    duration: dur,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay
                  }} />
                      <motion.path d={d} fill="none" stroke={c} strokeOpacity={0.16} strokeWidth={6} pathLength={1} strokeDasharray="0.12 1" initial={{
                    strokeDashoffset: 1
                  }} animate={{
                    strokeDashoffset: [1, 0, -1]
                  }} transition={{
                    duration: dur * 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay + 0.2
                  }} />
                    </g>;
              })}
              </motion.g>
            </motion.svg>
          </div>
        </div>
      </div>
    </section>;
}
function ProductVerify() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<'idle' | 'checking' | 'ok' | 'fail'>("idle");
  const [msg, setMsg] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (raw.length < 8 || raw.length > 24) {
      setStatus("fail");
      setMsg("Invalid code format. Enter 8–24 letters/numbers.");
      return;
    }
    setStatus("checking");
    setMsg("");
    setTimeout(() => {
      const sum = raw.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
      if (sum % 97 === 1) {
        setStatus("ok");
        setMsg("Code valid. Product is authentic.");
      } else {
        setStatus("fail");
        setMsg("Code not found or already verified. Please check and try again.");
      }
    }, 700);
  };
  return <section id="verify" className="py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Product Verification</h2>
          <p className="text-slate-300 text-sm">Enter the security code from your package to verify authenticity.</p>
          <ul className="text-slate-400 text-xs list-disc pl-5">
            <li>Letters and numbers only, 8–24 characters.</li>
            <li>The code is usually printed near the seal or QR label.</li>
          </ul>
        </div>
        <form onSubmit={onSubmit} className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-4">
          <div className="flex gap-2">
            <input type="text" inputMode="text" value={code} onChange={e => setCode(e.target.value)} placeholder="Enter verification code" className="flex-1 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20 uppercase tracking-widest" aria-label="Verification code" autoComplete="one-time-code" />
            <Button type="submit" className="rounded-xl" disabled={!code || status === 'checking'} style={{
            background: theme.brand.secondary,
            color: '#0B102A'
          }}>
              {status === 'checking' ? 'Verifying…' : 'Verify'}
            </Button>
          </div>
          {status !== 'idle' && <div className={cn("mt-3 text-xs rounded-xl px-3 py-2 border", status === 'ok' ? "bg-emerald-500/10 text-emerald-300 border-emerald-400/20" : status === 'fail' ? "bg-rose-500/10 text-rose-300 border-rose-400/20" : "bg-white/5 text-slate-300 border-white/10")} aria-live="polite">
              <div className="flex items-center gap-2">
                {status === 'ok' ? <Check className="w-4 h-4" /> : status === 'fail' ? <X className="w-4 h-4" /> : null}
                <span>{msg || 'Checking…'}</span>
              </div>
            </div>}
          <div className="mt-2 text-[11px] text-slate-400">Demo verification only. Server-side validation required for production.</div>
        </form>
      </div>
    </section>;
}
function Products({ version }: { version: 'ME' | 'US' }) {
  return <section id="products" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white">Products & Flavors</h2>
            <p className="text-slate-300 text-sm">Clean cards with hover lift and key details on reveal.</p>
          </div>
          <Button className="rounded-xl" style={{
          background: theme.brand.secondary,
          color: "#0B102A"
        }}>View all</Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FLAVORS.map(f => <ProductCard key={f.key} flavor={f} version={version} />)}
        </div>
      </div>
    </section>;
}
function Contact() {
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  return <section id="contact" className="py-16">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">Contact & Updates</h2>
          <p className="mt-2 text-slate-300 text-sm">
            We contact you only when necessary and avoid any unauthorized tracking.
          </p>
          <form className="mt-4 flex gap-2" onSubmit={e => {
          e.preventDefault();
          setOk(true);
        }}>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="flex-1 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20" />
            <Button type="submit" className="rounded-xl" style={{
            background: theme.brand.secondary,
            color: "#0B102A"
          }}>Subscribe</Button>
          </form>
          {ok && <p className="mt-2 text-xs text-emerald-400">Submitted (demo). We do not store or share your information.</p>}
        </div>
        <div className="rounded-2xl bg-white/10 backdrop-blur p-4 border border-white/10 text-xs text-slate-300 leading-relaxed">
          <div className="flex items-center gap-2 text-white font-medium mb-2"><Info className="w-4 h-4" /> Privacy Notice</div>
          We collect only the minimum information needed to provide services. You can request deletion at any time. See our Privacy Policy and Cookie Statement.
        </div>
      </div>
    </section>;
}
function LegalNotices() {
  return <section className="mt-10 rounded-2xl border border-white/10 bg-white/10 backdrop-blur p-5 text-xs leading-relaxed text-slate-300">
      <h3 className="text-white text-sm font-semibold tracking-wide">NICOTINE WARNING</h3>
      <p className="mt-2">
        This product can expose you to chemicals, including formaldehyde (known to the State of California to cause cancer) and nicotine (known to the State of California to cause birth defects or other reproductive harm). For more information, go to <a className="underline" href="https://www.P65Warnings.ca.gov" target="_blank" rel="noopener noreferrer">www.P65Warnings.ca.gov</a>.
      </p>
      <p className="mt-2">
        These products are intended for use by adults of legal smoking age in their jurisdiction (21+ in the U.S.), and not by children, women who are pregnant or breastfeeding, or persons with or at risk of heart disease, high blood pressure, diabetes, or those taking medicine for depression or asthma. This product is not intended as a smoking-cessation aid and is not designed to prevent, treat, cure, or diagnose any disease. These statements have not been evaluated or approved by the FDA.
      </p>
      <p className="mt-2">
        You must be 21 years of age or older to access and purchase products from this site. Falsifying your age, purchasing on behalf of a minor, or providing a false declaration under penalties of perjury is illegal and may be punishable by law. We reserve the right to request identification and to deny any order we believe is placed by or for a minor.
      </p>
      <div className="mt-3 text-[11px] text-slate-400">© Copyright 2025, LUSMIND. All rights reserved.</div>
    </section>;
}
function Footer() {
  return <footer className="border-t border-white/10 py-10 text-sm" style={{
    background: `linear-gradient(180deg, #171C57 0%, #0B102A 100%)`
  }}>
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-6">
        <div>
        <div className="flex items-center">
          <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-6 w-auto" />
        </div>
          <p className="text-slate-300 mt-2">Digital Vapor, Redefining Inspiration.</p>
        </div>
        <div>
          <div className="font-medium text-white mb-2">About</div>
          <ul className="space-y-1 text-slate-300">
            <li><a href="#story" className="hover:text-white">Brand story</a></li>
            <li><a href="#products" className="hover:text-white">Products & flavors</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-white mb-2">Compliance</div>
          <ul className="space-y-1 text-slate-300">
            <li><a href="#safety" className="hover:text-white">Safety & notices</a></li>
            <li><a href="#" className="hover:text-white">Privacy & Cookies</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
          </ul>
        </div>
        <div>
          <div className="font-medium text-white mb-2">Contact</div>
          <ul className="space-y-1 text-slate-300">
            <li>support@lusmind.com</li>
            <li>Mon—Fri 10:00‑18:00</li>
          </ul>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4">
        <LegalNotices />
      </div>
    </footer>;
}
export default function LusmindSite() {
  const [flavorKey, setFlavorKey] = useState<typeof FLAVORS[number]["key"]>(FLAVORS[0].key);
  const activeFlavor = useMemo(() => FLAVORS.find(f => f.key === flavorKey)!, [flavorKey]);
  const [ageVerified, setAgeVerified] = useState(false);
  const [cookiesOk, setCookiesOk] = useState(false);
  const [region, setRegion] = useState<keyof typeof REGION_INFO>("US");
  const [version, setVersion] = useState<'ME' | 'US'>('US');
  useEffect(() => {
    if (!isBrowser) return;
    const ck = window.localStorage.getItem("lusmind_cookie_ok") === "1";
    setCookiesOk(ck);
    const r = window.localStorage.getItem("lusmind_region");
    if (r && REGION_INFO[r]) setRegion(r as keyof typeof REGION_INFO);
    const ageOk = window.localStorage.getItem("ageVerified") === "true";
    setAgeVerified(ageOk);
  }, []);
  const handleAgeVerified = () => {
    setAgeVerified(true);
  };
  const acceptCookies = () => {
    setCookiesOk(true);
    if (isBrowser) window.localStorage.setItem("lusmind_cookie_ok", "1");
  };
  const changeRegion = (r: keyof typeof REGION_INFO) => {
    setRegion(r);
    if (isBrowser) window.localStorage.setItem("lusmind_region", r);
  };
  return <div className={cn("min-h-screen font-sans text-slate-100", !ageVerified ? "overflow-hidden" : undefined)} style={{
    background: `radial-gradient(1200px 800px at 110% -10%, ${hexToRgba(theme.brand.secondary, 0.08)}, transparent 60%), linear-gradient(180deg, #1E236B 0%, ${theme.brand.primary} 40%, #0B102A 100%)`
  }}>
      <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-white rounded px-2 py-1">Skip to main content</a>
      <TopWarningBar />
      <Navbar theme="dark" />
      <Hero flavor={activeFlavor} onInvertedChange={() => {}} version={version} />
      <section className="relative -mt-10 z-10">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <FlavorSelector value={flavorKey} onChange={setFlavorKey} />
          
        </div>
      </section>
      <Products version={version} />
      <Story palette={activeFlavor.palette} />
      <ProductVerify />
      <SafetySection region={region} onRegionChange={changeRegion} />
      <Contact />
      <Footer />
      
      {/* Version Switch Button */}
      <div className="fixed top-24 right-8 z-40">
        <div className="flex gap-2 bg-white/5 backdrop-blur-sm border border-white/30 rounded-2xl p-1.5 shadow-xl">
          <button
            onClick={() => setVersion('ME')}
            className={cn(
              "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
              version === 'ME' 
                ? "bg-white/20 text-white shadow-lg" 
                : "text-gray-400 hover:bg-white/10 hover:text-gray-300"
            )}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>ME</span>
            </div>
          </button>
          <button
            onClick={() => setVersion('US')}
            className={cn(
              "relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
              version === 'US' 
                ? "bg-white/20 text-white shadow-lg" 
                : "text-gray-400 hover:bg-white/10 hover:text-gray-300"
            )}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>US</span>
            </div>
          </button>
        </div>
      </div>
      
      <div className="fixed top-1/2 -right-12 md:right-2 md:top-auto md:bottom-6 rotate-90 md:rotate-0 z-40">
        <div className="rounded-full bg-white/10 backdrop-blur border border-white/10 px-3 py-1 text-[11px] text-white">
          * WARNING: Nicotine is an addictive chemical · Adults only
        </div>
      </div>
      {!ageVerified && <AgeVerification onVerified={handleAgeVerified} />}
      {!cookiesOk && <CookieBanner onAccept={acceptCookies} />}
    </div>;
}
