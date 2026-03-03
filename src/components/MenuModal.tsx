import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MenuModalProps {
  open: boolean;
  onClose: () => void;
}

const menuCategories = [
  {
    title: "Traditional Ethiopian",
    subtitle: "Served on injera — our signature sourdough flatbread",
    items: [
      { name: "Doro Wot", desc: "Slow-cooked chicken stew in berbere spice with hard-boiled eggs", price: "350" },
      { name: "Kitfo", desc: "Premium minced raw beef seasoned with mitmita & kibbeh butter", price: "400" },
      { name: "Tibs (Beef)", desc: "Sautéed cubed beef with onions, tomatoes, rosemary & jalapeño", price: "320" },
      { name: "Tibs (Lamb)", desc: "Tender lamb sautéed with garlic, ginger & traditional spices", price: "380" },
      { name: "Shiro Wot", desc: "Creamy chickpea stew with garlic, onion & Ethiopian spice blend", price: "180" },
      { name: "Beyaynetu", desc: "Fasting platter — assorted vegetable dishes on a bed of injera", price: "250" },
      { name: "Gomen Be Siga", desc: "Collard greens slow-cooked with tender beef chunks", price: "280" },
      { name: "Dulet", desc: "Minced tripe, liver & lean beef with jalapeño, cardamom & pepper", price: "300" },
    ],
  },
  {
    title: "Grills & International",
    subtitle: "Continental favorites prepared by our expert chefs",
    items: [
      { name: "Grilled Lake Fish", desc: "Fresh Nile tilapia from Lake Tana, herb-butter basted", price: "300" },
      { name: "Chicken Steak", desc: "Grilled boneless chicken breast with mushroom sauce & vegetables", price: "280" },
      { name: "Beef Burger", desc: "Handcrafted beef patty with cheese, lettuce, tomato & fries", price: "250" },
      { name: "Pasta Bolognese", desc: "Al dente spaghetti with rich beef ragù & parmesan", price: "220" },
      { name: "Club Sandwich", desc: "Triple-decker with chicken, bacon, egg, lettuce & fries", price: "200" },
      { name: "Mixed Grill Platter", desc: "Beef, chicken & lamb chops with grilled vegetables", price: "500" },
    ],
  },
  {
    title: "Breakfast",
    subtitle: "Served daily 6:30 – 10:00 AM",
    items: [
      { name: "Firfir", desc: "Shredded injera sautéed in spiced butter & berbere sauce", price: "150" },
      { name: "Chechebsa", desc: "Torn flatbread mixed with spiced butter & berbere", price: "130" },
      { name: "Ful Medames", desc: "Spiced fava beans with olive oil, tomato, onion & egg", price: "140" },
      { name: "Continental Breakfast", desc: "Eggs any style, toast, fresh juice, fruit & coffee", price: "200" },
      { name: "Scrambled Eggs Special", desc: "Eggs with tomato, onion, green pepper & fresh bread", price: "160" },
    ],
  },
  {
    title: "Beverages",
    subtitle: "Hot drinks, fresh juices & more",
    items: [
      { name: "Ethiopian Coffee Ceremony", desc: "Three rounds of freshly roasted & brewed Yirgacheffe coffee", price: "120" },
      { name: "Fresh Fruit Juice", desc: "Mango, avocado, papaya or mixed — layered spriss style", price: "100" },
      { name: "Macchiato", desc: "Ethiopian-style espresso with steamed milk foam", price: "60" },
      { name: "Tea (Shai)", desc: "Black tea with cinnamon, cloves & fresh ginger", price: "50" },
      { name: "Soft Drinks", desc: "Coca-Cola, Sprite, Fanta, Mirinda or mineral water", price: "50" },
      { name: "Local Beer", desc: "St. George, Dashen, Habesha or Walia draft", price: "100" },
    ],
  },
];

const MenuModal = ({ open, onClose }: MenuModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-background/95 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-3xl mx-4 my-8 md:my-16"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="glass-card border-b-0 p-8 md:p-12 text-center relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 border border-primary/40 text-primary flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/60" />
                <div className="w-2 h-2 rotate-45 border border-primary/50" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/60" />
              </div>

              <p className="font-heading text-lg tracking-[0.3em] uppercase text-primary font-light mb-2">Azwa Hotel</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                Our <span className="gold-text">Menu</span>
              </h2>
              <p className="text-muted-foreground font-body text-xs mt-3 tracking-wider">
                Prices in Ethiopian Birr (ETB) • Service charge included
              </p>

              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-px w-8 bg-primary/30" />
                <div className="w-1 h-1 rounded-full bg-primary/50" />
                <div className="h-px w-8 bg-primary/30" />
              </div>
            </div>

            {/* Menu categories */}
            <div className="glass-card border-t-0 p-6 md:p-12 pt-4 md:pt-4 space-y-10">
              {menuCategories.map((category) => (
                <div key={category.title}>
                  <div className="mb-6">
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground">{category.title}</h3>
                    <p className="text-muted-foreground font-body text-xs mt-1 tracking-wide italic">{category.subtitle}</p>
                    <div className="h-px w-full bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mt-3" />
                  </div>

                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-start justify-between gap-4 group">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <h4 className="font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                              {item.name}
                            </h4>
                            <div className="flex-1 border-b border-dotted border-border/50 mb-1 hidden sm:block" />
                          </div>
                          <p className="text-muted-foreground font-body text-xs leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                        <span className="font-display text-base font-semibold text-primary shrink-0">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Footer note */}
              <div className="text-center pt-6 border-t border-border/30">
                <p className="text-muted-foreground font-body text-[11px] tracking-wider leading-relaxed">
                  All dishes can be adjusted for dietary preferences • Ask about our daily specials
                </p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <div className="h-px w-10 bg-primary/30" />
                  <span className="text-primary/50 text-xs">★</span>
                  <div className="h-px w-10 bg-primary/30" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;
