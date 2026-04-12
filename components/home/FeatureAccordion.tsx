'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const features = [
  {
    title: 'استقبل المدفوعات',
    en: 'Take payments',
    desc: 'كاشير سريع يدعم جميع طرق الدفع — نقدي، بطاقة، أبل باي، وأكثر. متوافق مع هيئة الزكاة والضريبة والجمارك.',
    color: '#EEEDFE',
    accent: '#8B89C2',
  },
  {
    title: 'أدِر فريقك',
    en: 'Manage your team',
    desc: 'صلاحيات مخصصة لكل موظف، تتبع الحضور، وتقارير الأداء في الوقت الفعلي.',
    color: '#EAF3DE',
    accent: '#4CAF50',
  },
  {
    title: 'نمِّ قاعدة عملائك',
    en: 'Grow your customer base',
    desc: 'برامج الولاء والنقاط والكوبونات تحول الزوار إلى عملاء دائمين.',
    color: '#FFF8E1',
    accent: '#F9A825',
  },
  {
    title: 'تحكم في التدفق النقدي',
    en: 'Control your cash flow',
    desc: 'تقارير لحظية عن المبيعات والمصروفات والأرباح. لا مفاجآت في نهاية الشهر.',
    color: '#E3F2FD',
    accent: '#1565C0',
  },
  {
    title: 'وصّل تطبيقاتك المفضلة',
    en: 'Connect your favorite apps',
    desc: 'تكامل مع Foodics وMarketplace وأنظمة المحاسبة الشهيرة بضغطة واحدة.',
    color: '#FCE4EC',
    accent: '#C62828',
  },
]

export default function FeatureAccordion() {
  const [active, setActive] = useState(0)

  return (
    <section className="bg-white py-24 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-navy/40 mb-3">المنصة</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy max-w-lg leading-tight">
            كل أدوات تجارتك في مكان واحد
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: accordion */}
          <div className="flex flex-col divide-y divide-[#DBE1E9]">
            {features.map((f, i) => (
              <motion.div
                key={f.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="cursor-pointer"
                onClick={() => setActive(i)}
              >
                <div
                  className={`flex items-center justify-between py-5 gap-4 transition-colors ${
                    active === i ? 'text-navy' : 'text-navy/40 hover:text-navy/70'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-1 h-6 rounded-full transition-all duration-300 flex-shrink-0"
                      style={{ backgroundColor: active === i ? f.accent : 'transparent' }}
                    />
                    <span className="font-semibold text-base">{f.title}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${active === i ? 'rotate-45' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>

                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 pr-5 rtl:pr-0 rtl:pl-5">
                        <p className="text-navy/60 text-sm leading-relaxed">{f.desc}</p>
                        <button className="mt-3 text-sm font-semibold text-navy hover:text-purple transition-colors inline-flex items-center gap-1">
                          اكتشف المزيد
                          <svg className="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right: product UI mockup */}
          <div className="sticky top-28 h-[480px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-3xl overflow-hidden flex flex-col gap-4 p-8"
                style={{ backgroundColor: features[active].color }}
              >
                {/* Mock UI chrome */}
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black/10" />
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  <div className="h-4 w-1/3 rounded-full bg-black/10" />
                  <div className="h-3 w-1/2 rounded-full bg-black/10" />
                  <div className="mt-3 grid grid-cols-2 gap-3 flex-1">
                    <div className="rounded-2xl bg-white/50" />
                    <div className="rounded-2xl bg-white/50" />
                    <div className="rounded-2xl bg-white/50 col-span-2" />
                  </div>
                </div>
                <div
                  className="h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: features[active].accent }}
                >
                  <div className="h-2.5 w-20 rounded-full bg-white/60" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
