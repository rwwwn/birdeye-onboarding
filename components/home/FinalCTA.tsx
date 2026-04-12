'use client'

import Link from 'next/link'
import { useLanguage, t } from '@/contexts/LanguageContext'

export default function FinalCTA() {
  const { tr } = useLanguage()

  return (
    <section className="bg-navy py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-12 text-center flex flex-col items-center gap-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
          {tr(t.finalCta.headline)}
        </h2>
        <p className="text-white/60 text-lg max-w-xl leading-relaxed">
          {tr(t.finalCta.body)}
        </p>
        <Link
          href="/get-started"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-yellow text-navy text-base font-semibold hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-navy mt-2"
        >
          {tr(t.finalCta.cta)}
        </Link>
      </div>
    </section>
  )
}
