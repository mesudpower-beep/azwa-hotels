import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggle = () => setLanguage(language === "en" ? "am" : "en");

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 text-xs tracking-wider text-muted-foreground hover:text-primary transition-colors font-body"
      aria-label="Switch language"
    >
      <Globe className="w-3.5 h-3.5" />
      <span className="uppercase font-semibold">{language === "en" ? "አማ" : "EN"}</span>
    </button>
  );
};

export default LanguageSwitcher;
