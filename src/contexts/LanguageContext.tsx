import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "am";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.home": { en: "Home", am: "መነሻ" },
  "nav.about": { en: "About", am: "ስለ እኛ" },
  "nav.rooms": { en: "Rooms", am: "ክፍሎች" },
  "nav.restaurant": { en: "Restaurant", am: "ምግብ ቤት" },
  "nav.spa": { en: "Spa", am: "ስፓ" },
  "nav.gallery": { en: "Gallery", am: "ምስሎች" },
  "nav.contact": { en: "Contact", am: "አድራሻ" },
  "nav.bookNow": { en: "Book Now", am: "አሁን ይያዙ" },

  // Hero
  "hero.welcome": { en: "Welcome to", am: "እንኳን ደህና መጡ" },
  "hero.tagline": { en: "Where Luxury Meets the Source of the Nile", am: "የተፈጥሮ ውበትና ዘመናዊ ምቾት የሚገናኙበት" },
  "hero.location": { en: "Bahir Dar, Ethiopia", am: "ባህር ዳር, ኢትዮጵያ" },
  "hero.bookStay": { en: "Book Your Stay", am: "ቦታ ያስይዙ" },
  "hero.limited": { en: "Limited", am: "ውስን" },
  "hero.viewRooms": { en: "View Rooms", am: "ክፍሎችን ይመልከቱ" },
  "hero.secureBooking": { en: "Secure Booking", am: "ደህንነቱ የተጠበቀ" },
  "hero.bestPrice": { en: "Best Price Guarantee", am: "ምርጥ ዋጋ ዋስትና" },
  "hero.happyGuests": { en: "2,400+ Happy Guests", am: "2,400+ ደስተኛ እንግዶች" },
  "hero.viewingNow": { en: "people viewing now", am: "ሰዎች አሁን እያዩ ነው" },

  // About
  "about.subtitle": { en: "Our Story", am: "ታሪካችን" },
  "about.title1": { en: "A Sanctuary of", am: "የ" },
  "about.title2": { en: "Elegance", am: "ውበት ማረፊያ" },
  "about.desc1": { en: "Nestled in the heart of Bahir Dar, Azwa Hotel is a luxury facility located near the most historically significant attractions — Lake Tana monasteries, the majestic Blue Nile Falls (Tiss Issat), and the sacred islands of Lake Tana.", am: "በባህር ዳር ከተማ ማዕከል ላይ የሚገኘው አዝዋ ሆቴል ከታሪካዊ መስህቦች አጠገብ ያለ የቅንጦት ማረፊያ ነው — የጣና ሐይቅ ገዳማት፣ የዓባይ ፏፏቴ (ጥስ ዕሳት) እና የጣና ሐይቅ ቅዱሳን ደሴቶች።" },
  "about.desc2": { en: "Our mission is enriching your life with pleasant vacation moments and lasting memories. Every detail has been curated to blend modern comfort with Ethiopia's rich cultural heritage.", am: "ተልዕኮአችን ሕይወትዎን በደስታ የተሞሉ ጉዞዎችና ዘላቂ ትውስታዎች ማበልጸግ ነው። እያንዳንዱ ዝርዝር ዘመናዊ ምቾትን ከኢትዮጵያ ባህላዊ ቅርስ ጋር ለማዋሃድ ተዘጋጅቷል።" },
  "about.shuttle": { en: "Complimentary airport shuttle & welcome drink", am: "ነጻ የአየር ማረፊያ ሸትል እና የእንኳን ደህና መጡ መጠጥ" },
  "about.coffee": { en: "Traditional Ethiopian coffee ceremony daily", am: "ዕለታዊ ባህላዊ የቡና ስነ-ስርዓት" },
  "about.wifi": { en: "Free high-speed Wi-Fi throughout the hotel", am: "በሆቴሉ ዙሪያ ነጻ ፈጣን ዋይ-ፋይ" },
  "about.roomService": { en: "24/7 room service & concierge", am: "24/7 የክፍል አገልግሎት" },
  "about.rooms": { en: "Luxury Rooms", am: "የቅንጦት ክፍሎች" },
  "about.years": { en: "Years of Excellence", am: "ዓመታት ልቀት" },
  "about.rating": { en: "Guest Rating", am: "የእንግዳ ደረጃ" },

  // Rooms
  "rooms.subtitle": { en: "Accommodations", am: "ማረፊያ" },
  "rooms.title1": { en: "Rooms &", am: "ክፍሎች እና" },
  "rooms.title2": { en: "Suites", am: "ስዊቶች" },
  "rooms.desc": { en: "First-class rooms with breathtaking views, excellent service and genuine hospitality — your home for unforgettable moments", am: "የመጀመሪያ ደረጃ ክፍሎች ከሚያስደንቅ እይታ፣ ምርጥ አገልግሎትና እውነተኛ እንግዳ ተቀባይነት ጋር" },
  "rooms.bookThis": { en: "Book This Room", am: "ይህን ክፍል ያስይዙ" },
  "rooms.perNight": { en: "per night", am: "በሌሊት" },
  "rooms.roomsLeft": { en: "Only 3 rooms left for this month", am: "ለዚህ ወር 3 ክፍሎች ብቻ ቀርተዋል" },

  // Restaurant
  "restaurant.subtitle": { en: "Culinary Experience", am: "የምግብ ልምድ" },
  "restaurant.title1": { en: "Dining &", am: "ምግብ ቤትና" },
  "restaurant.title2": { en: "Restaurant", am: "ሬስቶራንት" },
  "restaurant.desc": { en: "Enjoy local and international cuisine in our in-house restaurant — from traditional Ethiopian flavors to continental favorites", am: "በሆቴላችን ሬስቶራንት ውስጥ የሀገር ውስጥና ዓለም አቀፍ ምግቦችን ይደሰቱ" },
  "restaurant.viewMenu": { en: "View Menu", am: "ሜኑ ይመልከቱ" },
  "restaurant.reserve": { en: "Reserve a Table", am: "ጠረጴዛ ያስይዙ" },
  "restaurant.breakfast": { en: "Breakfast:", am: "ቁርስ:" },
  "restaurant.lunch": { en: "Lunch:", am: "ምሳ:" },
  "restaurant.dinner": { en: "Dinner:", am: "ራት:" },
  "restaurant.roomService": { en: "Room Service:", am: "የክፍል አገልግሎት:" },

  // Spa
  "spa.subtitle": { en: "Wellness", am: "ጤና" },
  "spa.title1": { en: "Spa &", am: "ስፓ እና" },
  "spa.title2": { en: "Relaxation", am: "ዕረፍት" },
  "spa.desc": { en: "Step into tranquility at Azwa Hotel's wellness retreat. Our skilled therapists combine modern techniques with traditional Ethiopian healing to restore your body and spirit.", am: "በአዝዋ ሆቴል የጤና ማረፊያ ወደ ሰላም ይግቡ። ልምድ ያላቸው ባለሙያዎቻችን ዘመናዊ ቴክኒኮችን ከባህላዊ የኢትዮጵያ ፈውስ ጋር ያዋህዳሉ።" },
  "spa.book": { en: "Book a Treatment", am: "ሕክምና ያስይዙ" },
  "spa.relaxMessage": { en: "Relax and recharge with our wellness services", am: "በጤና አገልግሎቶቻችን ያረፉ" },

  // Amenities
  "amenities.subtitle": { en: "Experiences", am: "ተሞክሮዎች" },
  "amenities.title1": { en: "Amenities &", am: "አገልግሎቶችና" },
  "amenities.title2": { en: "Services", am: "ምቾቶች" },

  // Attractions
  "attractions.subtitle": { en: "Explore", am: "ያስሱ" },
  "attractions.title1": { en: "Nearby", am: "በአቅራቢያ ያሉ" },
  "attractions.title2": { en: "Attractions", am: "መስህቦች" },
  "attractions.desc": { en: "Located in the heart of Bahir Dar, surrounded by Ethiopia's most treasured landmarks", am: "በባህር ዳር ማዕከል ላይ የሚገኝ፣ በኢትዮጵያ ውድ ቦታዎች የተከበበ" },
  "attractions.fromHotel": { en: "From Azwa Hotel", am: "ከአዝዋ ሆቴል" },
  "attractions.concierge": { en: "Our concierge team arranges all excursions and transfers — just ask at reception", am: "የእንግዳ ተቀባይ ቡድናችን ሁሉንም ጉዞዎችና ማመላለሻዎች ያዘጋጃል — በአቀባበል ይጠይቁ" },

  // Gallery
  "gallery.subtitle": { en: "Visual Journey", am: "በምስል ጉዞ" },
  "gallery.title1": { en: "Our", am: "የእኛ" },
  "gallery.title2": { en: "Gallery", am: "ምስሎች" },

  // Testimonials
  "testimonials.subtitle": { en: "Testimonials", am: "ምስክርነቶች" },
  "testimonials.title1": { en: "What Our Guests", am: "እንግዶቻችን ምን" },
  "testimonials.title2": { en: "Say", am: "ይላሉ" },
  "testimonials.ratedDesc": { en: "Rated", am: "ደረጃ" },
  "testimonials.verifiedReviews": { en: "from over 2,400 verified reviews", am: "ከ2,400 በላይ ከተረጋገጡ ግምገማዎች" },

  // Booking
  "booking.subtitle": { en: "Reservations", am: "ቦታ ማስያዣ" },
  "booking.title1": { en: "Book Your", am: "ቦታዎን" },
  "booking.title2": { en: "Stay", am: "ያስይዙ" },
  "booking.name": { en: "Full Name", am: "ሙሉ ስም" },
  "booking.email": { en: "Email", am: "ኢሜይል" },
  "booking.phone": { en: "Phone", am: "ስልክ" },
  "booking.checkIn": { en: "Check-in Date", am: "የመግቢያ ቀን" },
  "booking.checkOut": { en: "Check-out Date", am: "የመውጫ ቀን" },
  "booking.guests": { en: "Guests", am: "እንግዶች" },
  "booking.children": { en: "Children", am: "ልጆች" },
  "booking.roomType": { en: "Room Type", am: "የክፍል ዓይነት" },
  "booking.specialRequests": { en: "Special Requests", am: "ልዩ ጥያቄዎች" },
  "booking.optional": { en: "(optional)", am: "(አማራጭ)" },
  "booking.requestBooking": { en: "Request Booking", am: "ቦታ ይጠይቁ" },
  "booking.chatWhatsApp": { en: "Chat on WhatsApp", am: "በWhatsApp ያነጋግሩ" },
  "booking.selectDate": { en: "Select date", am: "ቀን ይምረጡ" },

  // Contact
  "contact.subtitle": { en: "Get in Touch", am: "ያግኙን" },
  "contact.title1": { en: "Contact", am: "አድራሻ" },
  "contact.title2": { en: "Us", am: "" },
  "contact.address": { en: "Address", am: "አድራሻ" },
  "contact.phone": { en: "Phone", am: "ስልክ" },
  "contact.email": { en: "Email", am: "ኢሜይል" },
  "contact.yourName": { en: "Your Name", am: "ስምዎ" },
  "contact.emailAddress": { en: "Email Address", am: "ኢሜይል አድራሻ" },
  "contact.message": { en: "Message", am: "መልዕክት" },
  "contact.sendMessage": { en: "Send Message", am: "መልዕክት ይላኩ" },
  "contact.chatWhatsApp": { en: "Chat on WhatsApp", am: "በWhatsApp ያነጋግሩ" },

  // Footer
  "footer.quickLinks": { en: "Quick Links", am: "ፈጣን አገናኞች" },
  "footer.contact": { en: "Contact", am: "አድራሻ" },
  "footer.tagline": { en: "Where luxury meets the source of the Nile. An unparalleled experience on the shores of Lake Tana.", am: "የቅንጦትና የዓባይ ምንጭ መገናኛ። በጣና ሐይቅ ዳርቻ ላይ ልዩ ተሞክሮ።" },
  "footer.rights": { en: "All rights reserved.", am: "መብቱ በሕግ የተጠበቀ ነው።" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
