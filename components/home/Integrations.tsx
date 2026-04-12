'use client'

import { useLanguage, t } from '@/contexts/LanguageContext'

const partners = ['Mada', 'Tamara', 'Tabby', 'Foodics', 'Aramex', 'SMSA', 'HungerStation', 'Zid']

export default function Integrations() {
  const { tr } = useLanguage()

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-14 flex flex-col gap-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            {tr(t.integrations.headline)}
          </h2>
          <p className="text-navy/60 text-lg max-w-lg mx-auto">
            {tr(t.integrations.body)}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {partners.map((name) => (
            <div key={name} className="h-20 rounded-2xl border border-gray bg-[#F8F8FB] flex items-center justify-center">
              <span className="text-sm font-medium text-navy/40">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
