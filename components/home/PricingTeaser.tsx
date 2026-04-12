'use client'

import Link from 'next/link'
import { useLanguage, t } from '@/contexts/LanguageContext'

export default function PricingTeaser() {
  const { tr } = useLanguage()

  const plans = [
    {
      key: 'free',
      name: t.pricing.starter_name,
      price: 'Free',
      priceNote: t.pricing.forever,
      features: [t.pricing.starter_f1, t.pricing.starter_f2, t.pricing.starter_f3, t.pricing.starter_f4, t.pricing.starter_f5, t.pricing.starter_f6],
      cta: t.pricing.starter_cta,
      popular: false,
    },
    {
      key: 'professional',
      name: t.pricing.pro_name,
      price: '3,570',
      priceNote: t.pricing.per_year,
      features: [t.pricing.pro_f1, t.pricing.pro_f2, t.pricing.pro_f3, t.pricing.pro_f4, t.pricing.pro_f5],
      cta: t.pricing.pro_cta,
      popular: true,
    },
    {
      key: 'premium',
      name: t.pricing.premium_name,
      price: '4,820',
      priceNote: t.pricing.per_year,
      features: [t.pricing.premium_f1, t.pricing.premium_f2, t.pricing.premium_f3, t.pricing.premium_f4, t.pricing.premium_f5, t.pricing.premium_f6],
      cta: t.pricing.premium_cta,
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="bg-[#F8F8FB] py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-12">
        <div className="text-center mb-14 flex flex-col gap-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy">
            {tr(t.pricing.headline)}
          </h2>
          <p className="text-navy/60 text-base">{tr(t.pricing.body)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`relative rounded-2xl border-2 p-8 flex flex-col gap-5 transition-all bg-white
                ${plan.popular ? 'border-navy shadow-lg scale-[1.02]' : 'border-gray hover:border-purple'}`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#EEEDFE] text-navy text-xs font-semibold px-4 py-1 rounded-full whitespace-nowrap">
                  {tr(t.pricing.most_popular)}
                </span>
              )}
              <div>
                <h3 className="font-display text-lg font-bold text-navy">{tr(plan.name)}</h3>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-3xl font-bold text-navy">{plan.price}</span>
                  <span className="text-sm text-navy/50">{tr(plan.priceNote)}</span>
                </div>
              </div>
              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f.en} className="flex items-center gap-2 text-sm text-navy">
                    <svg className="w-4 h-4 text-navy flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {tr(f)}
                  </li>
                ))}
              </ul>
              <Link
                href="/get-started"
                className={`mt-2 w-full py-3 rounded-xl text-sm font-semibold text-center transition-all focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${plan.popular ? 'bg-navy text-white hover:bg-opacity-90 focus:ring-navy' : 'bg-gray text-navy hover:bg-opacity-70 focus:ring-gray'}`}
              >
                {tr(plan.cta)}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
