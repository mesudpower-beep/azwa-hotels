import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  // Exterior (3)
  { src: "/images/gallery/exterior-1.jpg", altEn: "Hotel exterior at sunset", altAm: "ሆቴል ውጭ ፀሐይ ስትጠልቅ", category: "exterior" },
  { src: "/images/gallery/exterior-2.jpg", altEn: "Grand hotel entrance", altAm: "ግራንድ ሆቴል መግቢያ", category: "exterior" },
  { src: "/images/gallery/exterior-3.jpg", altEn: "Aerial view with Lake Tana", altAm: "ከአየር የታየ ከጣና ሐይቅ ጋር", category: "exterior" },
  // Lobby (3)
  { src: "/images/gallery/lobby-1.jpg", altEn: "Grand lobby with chandelier", altAm: "ግራንድ ሎቢ ከሻማ መብራት ጋር", category: "lobby" },
  { src: "/images/gallery/lobby-2.jpg", altEn: "Reception desk", altAm: "አቀባበል ዴስክ", category: "lobby" },
  { src: "/images/gallery/lobby-3.jpg", altEn: "Lounge with coffee ceremony", altAm: "ላውንጅ ከቡና ስርዓት ጋር", category: "lobby" },
  // Rooms (6)
  { src: "/images/gallery/room-1.jpg", altEn: "Deluxe king room", altAm: "ዴላክስ ኪንግ ክፍል", category: "rooms" },
  { src: "/images/gallery/room-2.jpg", altEn: "Executive suite", altAm: "ኤግዘኩቲቭ ስዊት", category: "rooms" },
  { src: "/images/gallery/room-3.jpg", altEn: "Presidential suite living area", altAm: "ፕሬዚዳንታዊ ስዊት መኖሪያ", category: "rooms" },
  { src: "/images/gallery/room-4.jpg", altEn: "Room with garden balcony", altAm: "ክፍል ከአትክልት ቦታ በረንዳ ጋር", category: "rooms" },
  { src: "/images/gallery/room-5.jpg", altEn: "Luxury marble bathroom", altAm: "የድንጋይ ሻወር ክፍል", category: "rooms" },
  { src: "/images/gallery/room-6.jpg", altEn: "Twin bed room", altAm: "ሁለት አልጋ ክፍል", category: "rooms" },
  // Restaurant (2)
  { src: "/images/gallery/restaurant-1.jpg", altEn: "Fine dining restaurant", altAm: "ምርጥ ምግብ ቤት", category: "restaurant" },
  { src: "/images/gallery/restaurant-2.jpg", altEn: "Terrace dining at sunset", altAm: "በረንዳ ምግብ ቤት ፀሐይ ስትጠልቅ", category: "restaurant" },
  // Food (4)
  { src: "/images/gallery/food-1.jpg", altEn: "Traditional Ethiopian cuisine", altAm: "ባህላዊ ኢትዮጵያዊ ምግብ", category: "food" },
  { src: "/images/gallery/food-2.jpg", altEn: "Ethiopian coffee ceremony", altAm: "የኢትዮጵያ ቡና ስርዓት", category: "food" },
  { src: "/images/gallery/food-3.jpg", altEn: "Grilled gourmet dish", altAm: "የተጠበሰ ምርጥ ምግብ", category: "food" },
  { src: "/images/gallery/food-4.jpg", altEn: "Breakfast buffet", altAm: "የቁርስ ቡፌ", category: "food" },
  // Pool (3)
  { src: "/images/gallery/pool-1.jpg", altEn: "Infinity pool", altAm: "ኢንፊኒቲ መዋኛ", category: "pool" },
  { src: "/images/gallery/pool-2.jpg", altEn: "Poolside lounge & bar", altAm: "የመዋኛ ላውንጅ እና ባር", category: "pool" },
  { src: "/images/gallery/pool-3.jpg", altEn: "Pool at night", altAm: "መዋኛ በሌሊት", category: "pool" },
  // Spa (3)
  { src: "/images/gallery/spa-1.jpg", altEn: "Spa treatment room", altAm: "ስፓ ሕክምና ክፍል", category: "spa" },
  { src: "/images/gallery/spa-2.jpg", altEn: "Sauna & steam room", altAm: "ሳውና እና እንፋሎት ክፍል", category: "spa" },
  { src: "/images/gallery/spa-3.jpg", altEn: "Spa relaxation area", altAm: "ስፓ ዕረፍት ቦታ", category: "spa" },
  // Lake Tana (3)
  { src: "/images/gallery/lake-1.jpg", altEn: "Lake Tana panoramic view", altAm: "ጣና ሐይቅ ፓኖራማ", category: "lake" },
  { src: "/images/gallery/lake-2.jpg", altEn: "Sunrise over Lake Tana", altAm: "ፀሐይ ስትወጣ በጣና ሐይቅ", category: "lake" },
  { src: "/images/gallery/lake-3.jpg", altEn: "Monastery island", altAm: "የገዳም ደሴት", category: "lake" },
  // Amenities (2)
  { src: "/images/gallery/amenity-1.jpg", altEn: "Fitness center", altAm: "የአካል ብቃት ማዕከል", category: "amenities" },
  { src: "/images/gallery/amenity-2.jpg", altEn: "Conference room", altAm: "የስብሰባ ክፍል", category: "amenities" },
  // Garden (1)
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
    <section id="gallery" className="section-padding bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="section-subtitle mb-4">{t("gallery.subtitle")}</p>
          <h2 className="section-title text-foreground">
            {t("gallery.title1")} <span className="gold-text">{t("gallery.title2")}</span>
          </h2>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-xs tracking-[0.15em] uppercase font-body border transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {language === "am" ? cat.labelAm : cat.labelEn}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              layout
              className="relative overflow-hidden cursor-pointer group aspect-square"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={language === "am" ? image.altAm : image.altEn}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500 flex items-center justify-center">
                <span className="font-body text-xs tracking-[0.2em] uppercase text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center px-2">
                  {language === "am" ? image.altAm : image.altEn}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 border border-primary/40 text-primary flex items-center justify-center text-xl font-body hover:bg-primary/10 transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close gallery preview"
          >
            ✕
          </button>
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[85vh] object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
