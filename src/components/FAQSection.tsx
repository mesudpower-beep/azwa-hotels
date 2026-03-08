import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    qEn: "What are the check-in and check-out times?",
    qAm: "የመግቢያና የመውጫ ሰዓቶች ምንድናቸው?",
    aEn: "Check-in is from 2:00 PM and check-out is until 12:00 PM. Early check-in and late check-out are available upon request, subject to availability.",
    aAm: "መግቢያ ከቀኑ 2:00 ሰዓት ጀምሮ ሲሆን መውጫ እስከ 12:00 ሰዓት ድረስ ነው። ቀድሞ መግባትና ዘግይቶ መውጣት በጥያቄ ይገኛል።",
  },
  {
    qEn: "Do you offer airport transfers?",
    qAm: "የአየር ማረፊያ ማመላለሻ አገልግሎት ይሰጣሉ?",
    aEn: "Yes! We provide complimentary airport shuttle service for all guests. Simply share your flight details when booking and our driver will meet you at arrivals.",
    aAm: "አዎ! ለሁሉም እንግዶቻችን ነጻ የአየር ማረፊያ ሸትል አገልግሎት እናቀርባለን። ሲያስይዙ የበረራ ዝርዝርዎን ያካፍሉን።",
  },
  {
    qEn: "Is breakfast included in the room rate?",
    qAm: "ቁርስ በክፍል ዋጋ ውስጥ ተካትቷል?",
    aEn: "Yes, all room rates include a generous breakfast buffet featuring both traditional Ethiopian dishes and international options. Breakfast is served from 6:30 AM to 10:00 AM.",
    aAm: "አዎ፣ ሁሉም የክፍል ዋጋዎች ባህላዊ ኢትዮጵያዊና ዓለም አቀፍ ምግቦችን የያዘ ሰፊ የቁርስ ቡፌ ያካትታሉ።",
  },
  {
    qEn: "What payment methods do you accept?",
    qAm: "ምን ዓይነት የክፍያ ዘዴዎች ይቀበላሉ?",
    aEn: "We accept cash (ETB & USD), bank transfers, and all major payment methods. Payment is made directly at the hotel upon arrival.",
    aAm: "ጥሬ ገንዘብ (ብር & ዶላር)፣ የባንክ ዝውውርና ሁሉንም ዋና ዋና የክፍያ ዘዴዎች እንቀበላለን።",
  },
  {
    qEn: "Is there free Wi-Fi?",
    qAm: "ነጻ ዋይ-ፋይ አለ?",
    aEn: "Yes, complimentary high-speed Wi-Fi is available throughout the entire hotel — in rooms, lobby, restaurant, and pool area.",
    aAm: "አዎ፣ በሆቴሉ ሁሉ ነጻ ከፍተኛ ፍጥነት ዋይ-ፋይ ይገኛል — በክፍሎች፣ ሎቢ፣ ሬስቶራንትና መዋኛ ቦታ።",
  },
  {
    qEn: "Can you arrange tours to Blue Nile Falls?",
    qAm: "ወደ ዓባይ ፏፏቴ ጉዞ ማዘጋጀት ይችላሉ?",
    aEn: "Absolutely! Our concierge team arranges guided day trips to Blue Nile Falls, Lake Tana monasteries, and other local attractions. Just ask at reception.",
    aAm: "በእርግጥ! የእንግዳ ተቀባይ ቡድናችን ወደ ዓባይ ፏፏቴ፣ የጣና ገዳማትና ሌሎች መስህቦች የቀን ጉዞዎችን ያዘጋጃል።",
  },
  {
    qEn: "Do you have parking?",
    qAm: "የመኪና ማቆሚያ አለ?",
    aEn: "Yes, we have a spacious and secure parking area that accommodates cars, vans, and tour buses with 24/7 security.",
    aAm: "አዎ፣ መኪናዎችን፣ ቫኖችንና የቱር አውቶቡሶችን የሚያስተናግድ ሰፊና ደህንነቱ የተጠበቀ ማቆሚያ አለን።",
  },
  {
    qEn: "What is your cancellation policy?",
    qAm: "የስረዛ ፖሊሲዎ ምንድን ነው?",
    aEn: "Free cancellation is available up to 48 hours before check-in. Cancellations within 48 hours may be subject to a one-night charge.",
    aAm: "ከመግቢያ 48 ሰዓት በፊት ነጻ ስረዛ ይቻላል። በ48 ሰዓት ውስጥ ስረዛ የአንድ ሌሊት ክፍያ ሊኖረው ይችላል።",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();

  return (
    <section id="faq" className="section-padding bg-background relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: "hsl(145 45% 42% / 0.03)", filter: "blur(150px)" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <motion.p
            className="section-subtitle mb-4"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={isInView ? { opacity: 1, letterSpacing: "0.2em" } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {language === "am" ? "ጥያቄዎች" : "FAQ"}
          </motion.p>
          <h2 className="section-title text-foreground">
            {language === "am" ? "በተደጋጋሚ የሚጠየቁ" : "Frequently Asked"}{" "}
            <span className="gold-text">{language === "am" ? "ጥያቄዎች" : "Questions"}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
              >
                <AccordionItem
                  value={`faq-${i}`}
                  className="glass-card px-6 border-none"
                >
                  <AccordionTrigger className="font-display text-sm md:text-base font-semibold text-foreground hover:text-primary transition-colors py-5 text-left">
                    {language === "am" ? faq.qAm : faq.qEn}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground font-body text-sm leading-relaxed pb-5">
                    {language === "am" ? faq.aAm : faq.aEn}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10 text-xs text-muted-foreground font-body tracking-wider"
        >
          {language === "am"
            ? "ተጨማሪ ጥያቄ አለዎት? በWhatsApp ያነጋግሩን ወይም ከታች ያሉትን አድራሻዎች ይጠቀሙ"
            : "Still have questions? Contact us via WhatsApp or use the contact form below"}
        </motion.p>
      </div>
    </section>
  );
};

export default FAQSection;
