import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LangContextType {
  lang: Language;
  setLang: (lang: Language) => void;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    // Initialize from localStorage synchronously
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('preferredLanguage') as Language | null;
      if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
        return savedLang;
      }
    }
    return 'fr';
  });

  // Save to localStorage when language changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', lang);
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    if (newLang === 'fr' || newLang === 'en') {
      setLangState(newLang);
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}
