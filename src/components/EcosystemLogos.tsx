const flavorsList = [
  { name: "Arctic Sweet Ice", gradient: "from-cyan-400 via-blue-300 to-white" },
  { name: "Banana & Nut", gradient: "from-yellow-300 via-amber-400 to-yellow-600" },
  { name: "Blueberry Raspberry", gradient: "from-blue-500 via-purple-400 to-pink-500" },
  { name: "Caramel Custard", gradient: "from-amber-300 via-yellow-200 to-orange-300" },
  { name: "Cinnamon Apple Pie", gradient: "from-red-400 via-orange-300 to-amber-400" },
  { name: "Coffee Tobacco", gradient: "from-amber-700 via-stone-600 to-amber-900" },
  { name: "Cool Peppermint", gradient: "from-green-300 via-emerald-200 to-teal-300" },
  { name: "Cool Yuzu Cedar", gradient: "from-yellow-200 via-green-300 to-emerald-400" },
  { name: "Creamy Rainbow Candy", gradient: "from-pink-300 via-purple-300 to-blue-300" },
  { name: "Double Apple Shisha", gradient: "from-red-500 via-green-400 to-red-600" },
  { name: "Grape Soda", gradient: "from-purple-500 via-violet-400 to-purple-600" },
  { name: "Green Apple", gradient: "from-green-400 via-lime-300 to-emerald-500" },
  { name: "Green Coconut", gradient: "from-green-300 via-teal-200 to-cyan-300" },
  { name: "Gummy Rainbow", gradient: "from-red-400 via-yellow-300 to-blue-400" },
  { name: "Kiwi & Passion Fruit", gradient: "from-green-400 via-yellow-300 to-orange-400" },
  { name: "Mango Ice", gradient: "from-orange-400 via-yellow-300 to-amber-400" },
  { name: "Melon Yogurt Ice", gradient: "from-green-200 via-lime-100 to-emerald-200" },
  { name: "Monster Drink", gradient: "from-green-500 via-lime-400 to-green-600" },
  { name: "Niagara Grape", gradient: "from-purple-600 via-violet-500 to-purple-700" },
  { name: "Orange Soda", gradient: "from-orange-400 via-amber-300 to-orange-500" },
  { name: "Peach Ice", gradient: "from-peach-300 via-orange-200 to-pink-300" },
  { name: "Pineapple Coconut Ice", gradient: "from-yellow-300 via-amber-200 to-yellow-400" },
  { name: "Strawberry Cake", gradient: "from-pink-400 via-rose-300 to-red-400" },
  { name: "Tobacco & Nut", gradient: "from-amber-600 via-stone-500 to-amber-700" },
  { name: "Vanilla Apple Tobacco", gradient: "from-yellow-200 via-amber-300 to-stone-400" },
  { name: "Watermelon Ice", gradient: "from-red-400 via-pink-300 to-green-400" },
  { name: "Watermelon Strawberry", gradient: "from-red-500 via-pink-400 to-red-600" },
];

const EcosystemLogos = () => {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Gradient masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="container mx-auto px-6 md:px-16 mb-10">
        <h2 className="text-4xl md:text-6xl font-light text-center">
          <span className="italic font-serif bg-gradient-to-r from-[#8FF5FF] to-[#FFA4F3] bg-clip-text text-transparent">Premium Flavor Collection</span>
        </h2>
      </div>
      
      <div className="flex animate-scroll hover:[animation-play-state:paused]">
        {[...flavorsList, ...flavorsList, ...flavorsList].map((flavor, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-40 h-20 mx-8 flex items-center justify-center group"
          >
            <div className={`relative w-full h-full rounded-lg bg-card border-2 bg-gradient-to-r ${flavor.gradient} p-[2px] flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
              <div className="w-full h-full bg-card rounded-md flex items-center justify-center">
                <span className="text-sm font-medium">{flavor.name}</span>
              </div>
              {/* Tooltip on hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-popover border border-border rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {flavor.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EcosystemLogos;
