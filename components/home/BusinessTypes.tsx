'use client'

import Link from 'next/link'
import { useLanguage, t } from '@/contexts/LanguageContext'

export default function BusinessTypes() {
  const { tr } = useLanguage()

  const types = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: t.bizTypes.retail_title,
      desc:  t.bizTypes.retail_desc,
      points: [t.bizTypes.retail_p1, t.bizTypes.retail_p2, t.bizTypes.retail_p3],
      href: '/retail',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: t.bizTypes.food_title,
      desc:  t.bizTypes.food_desc,
      points: [t.bizTypes.food_p1, t.bizTypes.food_p2, t.bizTypes.food_p3],
      href: '/food',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: t.bizTypes.services_title,
      desc:  t.bizTypes.services_desc,
      points: [t.bizTypes.services_p1, t.bizTypes.services_p2, t.bizTypes.services_p3],
      href: '/services',
    },
  ]

  return (
    <section className="bg-[#F8F8FB] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            {tr(t.bizTypes.headline)}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {types.map((type) => (
            <Link
              key={type.title.en}
              href={type.href}
              className="bg-white rounded-2xl border border-gray p-8 flex flex-col gap-4 hover:border-purple hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F8F8FB] flex items-center justify-center text-navy group-hover:bg-yellow transition-colors">
                {type.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-navy">{tr(type.title)}</h3>
              {/* Two-line desc */}
              <p className="text-navy/70 text-sm leading-relaxed whitespace-pre-line">{tr(type.desc)}</p>
              <ul className="space-y-1.5 mt-1">
                {type.points.map((p) => (
                  <li key={p.en} className="text-xs text-navy/60 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-purple flex-shrink-0" />
                    {tr(p)}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-1.5 text-navy font-semibold text-sm group-hover:text-purple transition-colors pt-2">
                {tr(t.bizTypes.see_how)}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
