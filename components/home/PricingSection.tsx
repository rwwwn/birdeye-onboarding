'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const plans = [
  {
    name: 'Starter',
    nameAr: 'المجاني',
    price: 'مجاني',
    priceNote: 'للأبد',
    cta: 'ابدأ الآن',
    highlighted: false,
    features: [
      'فرع واحد',
      'كاشير واحد',
      'تقارير أساسية',
      'دعم إلكتروني',
    ],
  },
  {
    name: 'Professional',
    nameAr: 'الاحترافي',
    price: '٣٬٥٧٠',
    priceNote: 'ر.س / سنة',
    cta: 'جرّب مجاناً ٣٠ يوماً',
    highlighted: true,
    badge: 'الأفضل قيمة',
    features: [
      'حتى ٥ فروع',
      'كاشيرات غير محدودة',
      'تقارير متقدمة',
      'برنامج الولاء',
      'دعم على مدار الساعة',
    ],
  },
  {
    name: 'Premium',
    nameAr: 'المتميز',
    price: '٤٬٨٢٠',
    priceNote: 'ر.س / سنة',
    cta: 'جرّب مجاناً ٣٠ يوماً',
    highlighted: false,
    features: [
      'فروع غير محدودة',
      'مدير حساب مخصص',
      'تكاملات متقدمة',
      'تقارير ذكاء اصطناعي',
      'دعم أولوية VIP',
    ],
  },
]

export default function PricingSection() {
  return (
    <section className="bg-[#0F0C36] py-24 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8B89C2] mb-3">
            التسعير
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            اشتراك واحد يُنهي الفوضى
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto">
            أسعار واضحة، تحديثات مجانية، بدون رسوم مخفية.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-7 flex flex-col gap-6 ${
                plan.highlighted
                  ? 'border border-[#8B89C2]'
                  : 'border border-white/10'
              }`}
              style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-[#8B89C2] text-white text-xs font-bold whitespace-nowrap">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">
                  {plan.nameAr}
                </p>
                <div className="flex items-end gap-2 mt-2">
                  <span className="font-display text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm mb-1">{plan.priceNote}</span>
                </div>
              </div>

              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <div className="w-4 h-4 rounded-full bg-[#8B89C2]/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#8B89C2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/get-started"
                className={`mt-auto h-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                  plan.highlighted
                    ? 'bg-[#8B89C2] text-white hover:bg-[#7B79B2]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
