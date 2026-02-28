import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const images = [
  { src: "/images/hero.jpg", alt: "Hotel exterior at sunset" },
  { src: "/images/lobby.jpg", alt: "Grand lobby" },
  { src: "/images/room-presidential.jpg", alt: "Presidential Suite" },
  { src: "/images/pool.jpg", alt: "Infinity pool" },
  { src: "/images/restaurant.jpg", alt: "Fine dining restaurant" },
  { src: "/images/spa.jpg", alt: "Spa treatment room" },
  { src: "/images/room-deluxe.jpg", alt: "Deluxe Room" },
  { src: "/images/room-executive.jpg", alt: "Executive Suite" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="section-padding bg-secondary/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-subtitle mb-4">Visual Journey</p>
          <h2 className="section-title text-foreground">
            Our <span className="gold-text">Gallery</span>
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
                alt={image.alt}
                className="w-full h-full object-cover aspect-square transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-all duration-500 flex items-center justify-center">
                <span className="font-body text-xs tracking-[0.2em] uppercase text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {image.alt}
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
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
