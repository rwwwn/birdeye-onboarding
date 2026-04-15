'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Lang, t, tr } from '@/lib/translations'

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
  tr: (key: { ar: string; en: string }) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar')

  // Hydrate from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('birdeye-lang') as Lang | null
    if (stored === 'en') setLang('en')
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('birdeye-lang', lang)
  }, [lang])

  function toggleLang() {
    setLang((l) => (l === 'ar' ? 'en' : 'ar'))
  }

  function translate(key: { ar: string; en: string }): string {
    return tr(key, lang)
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, tr: translate, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider')
  return ctx
}

// Re-export t so components can import both from one place
export { t }
