const flavorsList = [
  "Arctic Sweet Ice",
  "Banana & Nut",
  "Blueberry Raspberry",
  "Caramel Custard",
  "Cinnamon Apple Pie",
  "Coffee Tobacco",
  "Cool Peppermint",
  "Cool Yuzu Cedar",
  "Creamy Rainbow Candy",
  "Double Apple Shisha",
  "Grape Soda",
  "Green Apple",
  "Green Coconut",
  "Gummy Rainbow",
  "Kiwi & Passion Fruit",
  "Mango Ice",
  "Melon Yogurt Ice",
  "Monster Drink",
  "Niagara Grape",
  "Orange Soda",
  "Peach Ice",
  "Pineapple Coconut Ice",
  "Strawberry Cake",
  "Tobacco & Nut",
  "Vanilla Apple Tobacco",
  "Watermelon Ice",
  "Watermelon Strawberry",
];

const EcosystemLogos = () => {
  return (
    <section className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* Gradient masks for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="container mx-auto px-6 md:px-16 mb-10">
        <h2 className="text-xl md:text-2xl font-light text-center text-foreground">
          Available at Leading Retailers Nationwide
        </h2>
      </div>
      
      <div className="flex animate-scroll hover:[animation-play-state:paused]">
        {[...flavorsList, ...flavorsList, ...flavorsList].map((flavor, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-40 h-20 mx-8 flex items-center justify-center group"
          >
            <div className="relative w-full h-full rounded-lg bg-card border border-border flex items-center justify-center opacity-60 hover:opacity-100 hover:border-primary/50 transition-all duration-300 hover:scale-105">
              <span className="text-sm font-medium">{flavor}</span>
              {/* Tooltip on hover */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-popover border border-border rounded-md text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                {flavor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EcosystemLogos;
