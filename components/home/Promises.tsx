'use client'

import { useLanguage, t } from '@/contexts/LanguageContext'

export default function Promises() {
  const { tr } = useLanguage()

  const promises = [
    { number: '01', title: t.promises.p1_title, desc: t.promises.p1_desc, bg: 'bg-yellow' },
    { number: '02', title: t.promises.p2_title, desc: t.promises.p2_desc, bg: 'bg-teal' },
    { number: '03', title: t.promises.p3_title, desc: t.promises.p3_desc, bg: 'bg-[#EEEDFE]' },
  ]

  return (
    <section id="features" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-navy leading-tight max-w-2xl mx-auto">
            {tr(t.promises.headline)}
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          {promises.map((p) => (
            <div
              key={p.number}
              className={`${p.bg} rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center gap-8`}
            >
              <span className="font-display text-6xl font-bold text-navy/10 flex-shrink-0 leading-none">
                {p.number}
              </span>
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-navy">
                  {tr(p.title)}
                </h3>
                <p className="text-navy/70 text-base leading-relaxed max-w-2xl">
                  {tr(p.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
