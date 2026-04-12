'use client'

import { useLanguage, t } from '@/contexts/LanguageContext'

export default function Hardware() {
  const { tr } = useLanguage()

  return (
    <section className="bg-[#F8F8FB] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple">
              {tr(t.hardware.label)}
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-navy leading-tight">
              {tr(t.hardware.headline)}
            </h2>
            <p className="text-navy/60 text-lg leading-relaxed">
              {tr(t.hardware.body)}
            </p>
          </div>

          <div className="w-full flex items-center justify-center rounded-[20px] bg-navy" style={{ height: '400px' }}>
            <span className="text-white/40 text-sm font-medium">{tr(t.hardware.video)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
