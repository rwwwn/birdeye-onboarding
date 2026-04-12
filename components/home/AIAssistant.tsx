'use client'

import { useLanguage, t } from '@/contexts/LanguageContext'

export default function AIAssistant() {
  const { tr } = useLanguage()

  return (
    <section className="bg-[#F8F8FB] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-12 flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple">
            {tr(t.ai.label)}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-navy leading-tight max-w-2xl mx-auto">
            {tr(t.ai.headline)}
          </h2>
        </div>

        <div className="w-full flex items-center justify-center bg-navy" style={{ height: '400px', borderRadius: '20px' }}>
          <div className="flex flex-col items-center gap-3">
            <span className="text-white/40 text-sm font-medium">{tr(t.ai.video)}</span>
            <span className="text-white/20 text-xs">{tr(t.ai.video_sub)}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
