import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { X, ZoomIn } from "lucide-react";

type Category = "all" | "exterior" | "lobby" | "rooms" | "restaurant" | "food" | "pool" | "spa" | "lake" | "amenities" | "garden";

const categories: { key: Category; labelEn: string; labelAm: string }[] = [
  { key: "all", labelEn: "All", labelAm: "ሁሉም" },
  { key: "exterior", labelEn: "Exterior", labelAm: "ውጭ" },
  { key: "lobby", labelEn: "Lobby", labelAm: "ሎቢ" },
  { key: "rooms", labelEn: "Rooms", labelAm: "ክፍሎች" },
  { key: "restaurant", labelEn: "Restaurant", labelAm: "ምግብ ቤት" },
  { key: "food", labelEn: "Cuisine", labelAm: "ምግብ" },
  { key: "pool", labelEn: "Pool", labelAm: "መዋኛ" },
  { key: "spa", labelEn: "Spa", labelAm: "ስፓ" },
  { key: "lake", labelEn: "Lake Tana", labelAm: "ጣና ሐይቅ" },
  { key: "amenities", labelEn: "Amenities", labelAm: "አገልግሎቶች" },
  { key: "garden", labelEn: "Garden", labelAm: "የአትክልት ቦታ" },
];

const images: { src: string; altEn: string; altAm: string; category: Category }[] = [
  { src: "/images/gallery/exterior-1.jpg", altEn: "Hotel exterior at sunset", altAm: "ሆቴል ውጭ ፀሐይ ስትጠልቅ", category: "exterior" },
  { src: "/images/gallery/exterior-2.jpg", altEn: "Grand hotel entrance", altAm: "ግራንድ ሆቴል መግቢያ", category: "exterior" },
  { src: "/images/gallery/exterior-3.jpg", altEn: "Aerial view with Lake Tana", altAm: "ከአየር የታየ ከጣና ሐይቅ ጋር", category: "exterior" },
  { src: "/images/gallery/lobby-1.jpg", altEn: "Grand lobby with chandelier", altAm: "ግራንድ ሎቢ ከሻማ መብራት ጋር", category: "lobby" },
  { src: "/images/gallery/lobby-2.jpg", altEn: "Reception desk", altAm: "አቀባበል ዴስክ", category: "lobby" },
  { src: "/images/gallery/lobby-3.jpg", altEn: "Lounge with coffee ceremony", altAm: "ላውንጅ ከቡና ስርዓት ጋር", category: "lobby" },
  { src: "/images/gallery/room-1.jpg", altEn: "Deluxe king room", altAm: "ዴላክስ ኪንግ ክፍል", category: "rooms" },
  { src: "/images/gallery/room-2.jpg", altEn: "Executive suite", altAm: "ኤግዘኩቲቭ ስዊት", category: "rooms" },
  { src: "/images/gallery/room-3.jpg", altEn: "Presidential suite living area", altAm: "ፕሬዚዳንታዊ ስዊት መኖሪያ", category: "rooms" },
  { src: "/images/gallery/room-4.jpg", altEn: "Room with garden balcony", altAm: "ክፍል ከአትክልት ቦታ በረንዳ ጋር", category: "rooms" },
  { src: "/images/gallery/room-5.jpg", altEn: "Luxury marble bathroom", altAm: "የድንጋይ ሻወር ክፍል", category: "rooms" },
  { src: "/images/gallery/room-6.jpg", altEn: "Twin bed room", altAm: "ሁለት አልጋ ክፍል", category: "rooms" },
  { src: "/images/gallery/restaurant-1.jpg", altEn: "Fine dining restaurant", altAm: "ምርጥ ምግብ ቤት", category: "restaurant" },
  { src: "/images/gallery/restaurant-2.jpg", altEn: "Terrace dining at sunset", altAm: "በረንዳ ምግብ ቤት ፀሐይ ስትጠልቅ", category: "restaurant" },
  { src: "/images/gallery/food-1.jpg", altEn: "Traditional Ethiopian cuisine", altAm: "ባህላዊ ኢትዮጵያዊ ምግብ", category: "food" },
  { src: "/images/gallery/food-2.jpg", altEn: "Ethiopian coffee ceremony", altAm: "የኢትዮጵያ ቡና ስርዓት", category: "food" },
  { src: "/images/gallery/food-3.jpg", altEn: "Grilled gourmet dish", altAm: "የተጠበሰ ምርጥ ምግብ", category: "food" },
  { src: "/images/gallery/food-4.jpg", altEn: "Breakfast buffet", altAm: "የቁርስ ቡፌ", category: "food" },
  { src: "/images/gallery/pool-1.jpg", altEn: "Infinity pool", altAm: "ኢንፊኒቲ መዋኛ", category: "pool" },
  { src: "/images/gallery/pool-2.jpg", altEn: "Poolside lounge & bar", altAm: "የመዋኛ ላውንጅ እና ባር", category: "pool" },
  { src: "/images/gallery/pool-3.jpg", altEn: "Pool at night", altAm: "መዋኛ በሌሊት", category: "pool" },
  { src: "/images/gallery/spa-1.jpg", altEn: "Spa treatment room", altAm: "ስፓ ሕክምና ክፍል", category: "spa" },
  { src: "/images/gallery/spa-2.jpg", altEn: "Sauna & steam room", altAm: "ሳውና እና እንፋሎት ክፍል", category: "spa" },
  { src: "/images/gallery/spa-3.jpg", altEn: "Spa relaxation area", altAm: "ስፓ ዕረፍት ቦታ", category: "spa" },
  { src: "/images/gallery/lake-1.jpg", altEn: "Lake Tana panoramic view", altAm: "ጣና ሐይቅ ፓኖራማ", category: "lake" },
  { src: "/images/gallery/lake-2.jpg", altEn: "Sunrise over Lake Tana", altAm: "ፀሐይ ስትወጣ በጣና ሐይቅ", category: "lake" },
  { src: "/images/gallery/lake-3.jpg", altEn: "Monastery island", altAm: "የገዳም ደሴት", category: "lake" },
  { src: "/images/gallery/amenity-1.jpg", altEn: "Fitness center", altAm: "የአካል ብቃት ማዕከል", category: "amenities" },
  { src: "/images/gallery/amenity-2.jpg", altEn: "Conference room", altAm: "የስብሰባ ክፍል", category: "amenities" },
  { src: "/images/gallery/garden-1.jpg", altEn: "Hotel garden pathway", altAm: "የሆቴል የአትክልት ቦታ መንገድ", category: "garden" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { t, language } = useLanguage();

  const filteredImages = activeCategory === "all" ? images : images.filter(img => img.category === activeCategory);

  return (
    <section id="gallery" className="section-padding gradient-bg relative" ref={ref}>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-center mb-12"
        >
          <motion.p
            className="section-subtitle mb-4"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {t("gallery.subtitle")}
          </motion.p>
          <h2 className="section-title text-foreground">
            {t("gallery.title1")} <span className="gold-text">{t("gallery.title2")}</span>
          </h2>
        </motion.div>

        {/* Category filter with animated indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.04 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-4 py-2 text-xs tracking-[0.1em] uppercase font-body border rounded-lg transition-all duration-300 overflow-hidden ${
                activeCategory === cat.key
                  ? "text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border/50 hover:border-primary/40 hover:text-primary"
              }`}
            >
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="gallery-tab"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "linear-gradient(135deg, hsl(280 85% 65%), hsl(220 90% 60%))", boxShadow: "0 0 20px hsl(280 85% 65% / 0.3)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{language === "am" ? cat.labelAm : cat.labelEn}</span>
            </motion.button>
          ))}
        </motion.div>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.6, rotateY: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.6, rotateY: 20 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25 }}
                  className="relative overflow-hidden cursor-pointer group aspect-square rounded-xl"
                  onClick={() => setSelectedImage(image.src)}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                >
                  <img
                    src={image.src}
                    alt={language === "am" ? image.altAm : image.altEn}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-4">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className="mb-2"
                    >
                      <ZoomIn className="w-5 h-5 text-primary" />
                    </motion.div>
                    <span className="font-body text-xs tracking-[0.1em] uppercase text-foreground translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-center px-2">
                      {language === "am" ? image.altAm : image.altEn}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, rotate: -90, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              className="absolute top-6 right-6 w-12 h-12 border border-primary/30 text-primary flex items-center justify-center hover:bg-primary/10 transition-colors rounded-full z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close gallery preview"
            >
              <X className="w-5 h-5" />
            </motion.button>
            <motion.img
              initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateY: 30 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              src={selectedImage}
              alt="Gallery preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              style={{ boxShadow: "0 0 120px hsl(280 85% 65% / 0.15), 0 0 60px hsl(220 90% 60% / 0.1)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
