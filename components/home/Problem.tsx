'use client'

import { useLanguage, t } from '@/contexts/LanguageContext'

export default function Problem() {
  const { tr } = useLanguage()

  const pains = [
    { icon: '⚡', label: t.problem.pain1_label, desc: t.problem.pain1_desc },
    { icon: '👁', label: t.problem.pain2_label, desc: t.problem.pain2_desc },
    { icon: '⏱', label: t.problem.pain3_label, desc: t.problem.pain3_desc },
  ]

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-12">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-navy leading-tight">
            {tr(t.problem.headline)}
          </h2>
          <p className="text-navy/60 text-lg leading-relaxed">
            {tr(t.problem.body)}
          </p>
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="h-px flex-1 bg-gray" />
            <div className="w-2 h-2 rounded-full bg-purple" />
            <div className="h-px flex-1 bg-gray" />
          </div>
          <p className="text-navy font-semibold text-lg leading-relaxed">
            {tr(t.problem.solution)}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((item) => (
            <div key={item.label.en} className="bg-[#F8F8FB] rounded-2xl p-8 flex flex-col gap-3">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-display text-lg font-bold text-navy">{tr(item.label)}</h3>
              <p className="text-navy/60 text-sm leading-relaxed">{tr(item.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
