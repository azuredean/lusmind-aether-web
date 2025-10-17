// This page is the original Index.tsx content - E-Liquid products page
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Globe, Cookie, ChevronRight, Flame, Info, X, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { AgeVerification } from "@/components/AgeVerification";
import { Link } from "react-router-dom";

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

function TopWarningBar() {
  return <div className="w-full border-b" style={{
    background: theme.brand.primary,
    borderColor: "rgba(255,255,255,0.1)"
  }}>
      <div className="max-w-7xl mx-auto px-4 py-2 text-center text-xs md:text-sm text-white tracking-wide">
        WARNING: This product contains nicotine. Nicotine is an addictive chemical.
      </div>
    </div>;
}
function CookieBanner({
  onAccept
}: {
  onAccept: () => void;
}) {
  return <motion.div initial={{
    y: 100,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 rounded-2xl shadow-2xl border" style={{
    background: theme.bg.canvas,
    borderColor: theme.brand.primary
  }}>
      <div className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Cookie className="w-6 h-6 flex-shrink-0" style={{
          color: theme.brand.primary
        }} />
          <div>
            <h3 className="font-semibold mb-2" style={{
            color: theme.text.base
          }}>
              We value your privacy
            </h3>
            <p className="text-sm leading-relaxed" style={{
            color: theme.text.mute
          }}>
              We use cookies to enhance your browsing experience and analyze our traffic. 
              By clicking "Accept", you consent to our use of cookies.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={onAccept} className="flex-1 rounded-xl" style={{
          background: theme.brand.primary,
          color: "white"
        }}>
            Accept All
          </Button>
          <Button variant="outline" onClick={onAccept} className="rounded-xl" style={{
          borderColor: theme.brand.primary,
          color: theme.brand.primary
        }}>
            Decline
          </Button>
        </div>
      </div>
    </motion.div>;
}
function FlavorCard({
  flavor,
  index,
  onClick
}: {
  flavor: typeof FLAVORS[number];
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  return <motion.div ref={cardRef} style={{
    y,
    opacity
  }} initial={{
    opacity: 0,
    y: 30
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: "-100px"
  }} transition={{
    duration: 0.6,
    delay: index * 0.1
  }} onClick={onClick} className="group cursor-pointer">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl" style={{
      background: `linear-gradient(135deg, ${flavor.bottle.from} 0%, ${flavor.bottle.to} 100%)`
    }}>
        <CardContent className="p-8 relative">
          <motion.div whileHover={{
          scale: 1.05
        }} transition={{
          type: "spring",
          stiffness: 300
        }} className="relative aspect-square mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full blur-3xl opacity-30" style={{
            background: `radial-gradient(circle, ${flavor.palette[0]} 0%, transparent 70%)`
          }} />
            <img src={flavor.image} alt={flavor.name} className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
          </motion.div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight" style={{
            color: theme.text.base
          }}>
              {flavor.name}
            </h3>

            <div className="flex flex-wrap gap-2">
              {flavor.notes.map((note, i) => <Badge key={i} variant="secondary" className="rounded-full px-3 py-1 text-xs font-medium border" style={{
              background: hexToRgba(flavor.palette[i % flavor.palette.length], 0.2),
              color: theme.text.base,
              borderColor: hexToRgba(flavor.palette[i % flavor.palette.length], 0.3)
            }}>
                  {note}
                </Badge>)}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <span className="text-sm font-medium" style={{
              color: theme.text.mute
            }}>
                View Details
              </span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{
              color: theme.brand.primary
            }} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>;
}
function FlavorDetailDialog({
  flavor,
  open,
  onOpenChange
}: {
  flavor: typeof FLAVORS[number] | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!flavor) return null;
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-3xl p-0 overflow-hidden border-0" style={{
      background: `linear-gradient(135deg, ${flavor.bottle.from} 0%, ${flavor.bottle.to} 100%)`
    }}>
        <div className="relative">
          <button onClick={() => onOpenChange(false)} className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors" style={{
          background: "rgba(255,255,255,0.9)"
        }}>
            <X className="w-5 h-5" style={{
            color: theme.text.base
          }} />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="flex items-center justify-center">
              <motion.div initial={{
              scale: 0.8,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.5
            }} className="relative">
                <div className="absolute inset-0 rounded-full blur-3xl opacity-40" style={{
                background: `radial-gradient(circle, ${flavor.palette[0]} 0%, transparent 70%)`
              }} />
                <img src={flavor.image} alt={flavor.name} className="relative z-10 w-full max-w-sm drop-shadow-2xl" />
              </motion.div>
            </div>

            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2" style={{
                color: theme.text.base
              }}>
                  {flavor.name}
                </h2>
                <p className="text-sm" style={{
                color: theme.text.mute
              }}>
                  Premium E-Liquid
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{
                  color: theme.text.base
                }}>
                    <Flame className="w-4 h-4" style={{
                    color: theme.brand.primary
                  }} />
                    Flavor Profile
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {flavor.notes.map((note, i) => <Badge key={i} className="rounded-full px-3 py-1 border" style={{
                    background: hexToRgba(flavor.palette[i % flavor.palette.length], 0.3),
                    color: theme.text.base,
                    borderColor: hexToRgba(flavor.palette[i % flavor.palette.length], 0.4)
                  }}>
                        {note}
                      </Badge>)}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-2" style={{
                  color: theme.text.base
                }}>
                    <Info className="w-4 h-4" style={{
                    color: theme.brand.primary
                  }} />
                    Product Details
                  </h3>
                  <ul className="space-y-2 text-sm" style={{
                  color: theme.text.mute
                }}>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{
                      color: theme.brand.primary
                    }} />
                      Available in 30ml & 60ml bottles
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{
                      color: theme.brand.primary
                    }} />
                      Multiple nicotine strengths
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{
                      color: theme.brand.primary
                    }} />
                      Premium USP-grade ingredients
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{
                      color: theme.brand.primary
                    }} />
                      Child-resistant cap
                    </li>
                  </ul>
                </div>
              </div>

              <Button className="w-full rounded-xl py-6 text-base font-semibold" style={{
              background: theme.brand.primary,
              color: "white"
            }}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>;
}

export default function ELiquid() {
  const [selectedFlavor, setSelectedFlavor] = useState<typeof FLAVORS[number] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cookieAccepted, setCookieAccepted] = useState(false);
  const [ageVerified, setAgeVerified] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  useEffect(() => {
    if (isBrowser) {
      const accepted = localStorage.getItem("cookieAccepted");
      const verified = localStorage.getItem("ageVerified");
      if (accepted) setCookieAccepted(true);
      if (verified) setAgeVerified(true);
    }
  }, []);
  const handleCookieAccept = () => {
    setCookieAccepted(true);
    if (isBrowser) {
      localStorage.setItem("cookieAccepted", "true");
    }
  };
  const handleAgeVerify = () => {
    setAgeVerified(true);
    if (isBrowser) {
      localStorage.setItem("ageVerified", "true");
    }
  };
  const handleFlavorClick = (flavor: typeof FLAVORS[number]) => {
    setSelectedFlavor(flavor);
    setDialogOpen(true);
  };
  const currentBgTint = useMemo(() => {
    if (!selectedFlavor) return theme.bg.canvas;
    return selectedFlavor.bgTint;
  }, [selectedFlavor]);
  if (!ageVerified) {
    return <AgeVerification onVerify={handleAgeVerify} />;
  }
  return <div className="min-h-screen transition-colors duration-700" style={{
    background: currentBgTint
  }}>
      <TopWarningBar />

      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{
      background: "rgba(247, 245, 242, 0.8)",
      borderColor: "rgba(0,0,0,0.05)"
    }}>
        <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2">
            <img src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png" alt="LM Logo" className="h-8 w-8" />
            <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-8 w-auto" />
          </Link>
          
          <div className="hidden md:flex items-center gap-6 text-sm absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="hover:opacity-70 transition-opacity" style={{
            color: theme.text.base
          }}>Home</Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-black/5 border-none px-3 py-2 rounded-lg text-sm font-normal data-[state=open]:bg-black/5" style={{
                  color: theme.text.base
                }}>
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="min-w-[200px] backdrop-blur border rounded-xl p-2" style={{
                  background: "rgba(247, 245, 242, 0.95)",
                  borderColor: "rgba(0,0,0,0.1)"
                }}>
                    <div className="flex flex-col gap-1">
                      <Link to="/e-liquid" className="px-3 py-2 text-sm hover:bg-black/5 rounded-lg transition-colors" style={{
                      color: theme.text.base
                    }}>
                        E-Liquid
                      </Link>
                      <Link to="/e-cigarette" className="px-3 py-2 text-sm hover:bg-black/5 rounded-lg transition-colors" style={{
                      color: theme.text.base
                    }}>
                        E-Cigarette
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <a href="#about" className="hover:opacity-70 transition-opacity" style={{
            color: theme.text.base
          }}>About</a>
            <a href="#quality" className="hover:opacity-70 transition-opacity" style={{
            color: theme.text.base
          }}>Quality</a>
            <a href="#contact" className="hover:opacity-70 transition-opacity" style={{
            color: theme.text.base
          }}>Contact</a>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Globe className="w-5 h-5" style={{
              color: theme.text.base
            }} />
            </Button>
            <Button className="rounded-full px-6" style={{
            background: theme.brand.secondary,
            color: theme.brand.primary
          }}>
              Shop Now
            </Button>
          </div>
        </nav>
      </header>

      <motion.section ref={heroRef} style={{
      y: heroY,
      opacity: heroOpacity
    }} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full blur-3xl" style={{
          background: theme.pastel.blue
        }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl" style={{
          background: theme.pastel.mint
        }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 py-20 text-center relative z-10">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            <Badge className="mb-6 rounded-full px-4 py-2 border-2" style={{
            background: hexToRgba(theme.brand.secondary, 0.2),
            color: theme.brand.primary,
            borderColor: theme.brand.secondary
          }}>
              Premium E-Liquid Collection
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight" style={{
            color: theme.text.base
          }}>
              Crafted for
              <br />
              <span style={{
              color: theme.brand.primary
            }}>Pure Flavor</span>
            </h1>
            <p className="text-lg md:text-xl mb-4 max-w-2xl mx-auto leading-relaxed" style={{
            color: theme.text.mute
          }}>
              Experience our meticulously crafted e-liquids, made with premium USP-grade ingredients 
              for an unparalleled vaping experience.
            </p>
            <p className="text-sm mb-10" style={{
            color: theme.text.mute
          }}>Made in USA.</p>
            <Button size="lg" className="rounded-full px-8 py-6 text-base" style={{
            background: theme.brand.primary,
            color: "white"
          }}>
              Explore Collection
            </Button>
          </motion.div>

          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1,
          duration: 1
        }} className="mt-20 flex flex-col items-center gap-2" style={{
          color: theme.text.mute
        }}>
            <span className="text-xs">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </motion.div>
        </div>
      </motion.section>

      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{
            color: theme.text.base
          }}>
              Our Signature Flavors
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{
            color: theme.text.mute
          }}>
              Each flavor is carefully developed and tested to deliver consistent, 
              authentic taste in every puff.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FLAVORS.map((flavor, index) => <FlavorCard key={flavor.key} flavor={flavor} index={index} onClick={() => handleFlavorClick(flavor)} />)}
          </div>
        </div>
      </section>

      <section id="quality" className="py-20 border-t" style={{
      borderColor: "rgba(0,0,0,0.05)"
    }}>
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4" style={{
            color: theme.text.mute
          }}>
              <div className="w-8 h-[1px]" style={{
              background: theme.text.mute
            }}></div>
              <span className="text-sm">Proudly Made in the USA</span>
              <div className="w-8 h-[1px]" style={{
              background: theme.text.mute
            }}></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{
            color: theme.text.base
          }}>
              Uncompromising Quality
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{
            color: theme.text.mute
          }}>
              Our e-liquids are manufactured in state-of-the-art facilities using only 
              the finest USP-grade ingredients, ensuring safety and consistency.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
            icon: ShieldCheck,
            title: "Lab Tested",
            description: "Every batch undergoes rigorous third-party testing for purity and consistency."
          }, {
            icon: Flame,
            title: "Premium Ingredients",
            description: "We use only USP-grade nicotine, PG, VG, and food-grade flavorings."
          }, {
            icon: Globe,
            title: "Sustainable",
            description: "Eco-friendly packaging and responsible manufacturing practices."
          }].map((item, index) => <motion.div key={index} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }}>
                <Card className="text-center p-8 border-0 shadow-lg rounded-2xl" style={{
              background: theme.bg.beige
            }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{
                background: hexToRgba(theme.brand.primary, 0.1)
              }}>
                    <item.icon className="w-8 h-8" style={{
                  color: theme.brand.primary
                }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{
                color: theme.text.base
              }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{
                color: theme.text.mute
              }}>
                    {item.description}
                  </p>
                </Card>
              </motion.div>)}
          </div>
        </div>
      </section>

      <footer id="contact" className="border-t py-12" style={{
      background: theme.bg.oatmeal,
      borderColor: "rgba(0,0,0,0.05)"
    }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/lovable-uploads/6a3cad97-68cc-4600-9c35-7d92e2c90d4b.png" alt="LM Logo" className="h-8 w-8" />
                <img src="/lovable-uploads/97552e62-98e0-43b3-850e-1c39978ce0cd.png" alt="LUSMIND" className="h-8 w-auto" />
              </div>
              <p className="text-sm" style={{
              color: theme.text.mute
            }}>
                Premium vaping products crafted with excellence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{
              color: theme.text.base
            }}>Products</h4>
              <ul className="space-y-2 text-sm" style={{
              color: theme.text.mute
            }}>
                <li><Link to="/e-liquid" className="hover:opacity-70">E-Liquid</Link></li>
                <li><Link to="/e-cigarette" className="hover:opacity-70">E-Cigarette</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{
              color: theme.text.base
            }}>Company</h4>
              <ul className="space-y-2 text-sm" style={{
              color: theme.text.mute
            }}>
                <li><a href="#about" className="hover:opacity-70">About Us</a></li>
                <li><a href="#quality" className="hover:opacity-70">Quality</a></li>
                <li><a href="#contact" className="hover:opacity-70">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" style={{
              color: theme.text.base
            }}>Support</h4>
              <ul className="space-y-2 text-sm" style={{
              color: theme.text.mute
            }}>
                <li><a href="#" className="hover:opacity-70">Help Center</a></li>
                <li><a href="#" className="hover:opacity-70">Shipping Info</a></li>
                <li><a href="#" className="hover:opacity-70">Returns</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm" style={{
          borderColor: "rgba(0,0,0,0.05)",
          color: theme.text.mute
        }}>
            <p>© 2025 LUSMIND. All rights reserved. | WARNING: This product contains nicotine. Nicotine is an addictive chemical.</p>
          </div>
        </div>
      </footer>

      <FlavorDetailDialog flavor={selectedFlavor} open={dialogOpen} onOpenChange={setDialogOpen} />

      {!cookieAccepted && <CookieBanner onAccept={handleCookieAccept} />}
    </div>;
}
