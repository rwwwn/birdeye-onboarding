'use client'

import { useLanguage, t } from '@/contexts/LanguageContext'

export default function SocialProof() {
  const { tr } = useLanguage()
  const logos = Array.from({ length: 6 }, (_, i) => i)

  return (
    <section className="bg-gray py-8">
      <div className="max-w-7xl mx-auto px-12">
        <p className="text-center text-sm font-medium text-navy/60 mb-6 uppercase tracking-widest">
          {tr(t.social.trusted)}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {logos.map((i) => (
            <div
              key={i}
              className="w-24 h-10 rounded-lg bg-white/70 border border-white/80"
              aria-label="Brand logo placeholder"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
