import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const images = [
  { src: "/images/hero.jpg", altEn: "Hotel exterior at sunset", altAm: "ሆቴል ውጭ ፀሐይ ስትጠልቅ" },
  { src: "/images/lobby.jpg", altEn: "Grand lobby", altAm: "ግራንድ ሎቢ" },
  { src: "/images/room-presidential.jpg", altEn: "Presidential Suite", altAm: "ፕሬዚዳንታዊ ስዊት" },
  { src: "/images/pool.jpg", altEn: "Infinity pool", altAm: "መዋኛ" },
  { src: "/images/restaurant.jpg", altEn: "Fine dining restaurant", altAm: "ምርጥ ምግብ ቤት" },
  { src: "/images/spa.jpg", altEn: "Spa treatment room", altAm: "ስፓ ሕክምና ክፍል" },
  { src: "/images/room-deluxe.jpg", altEn: "Deluxe Room", altAm: "ዴላክስ ክፍል" },
  { src: "/images/room-executive.jpg", altEn: "Executive Suite", altAm: "ኤግዘኩቲቭ ስዊት" },
  { src: "/images/traditional-ethiopian.png", altEn: "Traditional Ethiopian cuisine", altAm: "ባህላዊ ኢትዮጵያዊ ምግብ" },
  { src: "/images/international-cuisine.png", altEn: "International cuisine", altAm: "ዓለም አቀፍ ምግብ" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t, language } = useLanguage();

  return (
    <section id="gallery" className="section-padding bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">{t("gallery.subtitle")}</p>
          <h2 className="section-title text-foreground">
            {t("gallery.title1")} <span className="gold-text">{t("gallery.title2")}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`relative overflow-hidden cursor-pointer group ${
                index === 0 || index === 5 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={language === "am" ? image.altAm : image.altEn}
                className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500 flex items-center justify-center">
                <span className="font-body text-xs tracking-[0.2em] uppercase text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
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
