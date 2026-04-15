'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const backgrounds = ['#1a1a2e', '#16213e', '#0f3460']

const copy = {
  ar: {
    heading: 'ابدأ خطوتك القادمة',
    sub: 'انضم إلى آلاف التجار السعوديين الذين يديرون تجارتهم بذكاء.',
    btn1: 'ابدأ تجربتك المجانية',
    btn2: 'تواصل مع المبيعات',
    emailSub: 'احصل على آخر أخبار وتحديثات بيردآي',
    emailPlaceholder: 'بريدك الإلكتروني',
    emailBtn: 'اشترك',
  },
  en: {
    heading: 'Start your next chapter',
    sub: 'Join thousands of Saudi merchants who run their business intelligently.',
    btn1: 'Start your free trial',
    btn2: 'Talk to sales',
    emailSub: 'Get the latest BirdEye news and updates',
    emailPlaceholder: 'your@email.com',
    emailBtn: 'Subscribe',
  },
}

export default function FinalCTASection({ onContactClick }: { onContactClick?: () => void }) {
  const [bgIndex, setBgIndex] = useState(0)
  const { lang } = useLanguage()
  const t = copy[lang]

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-[#0F0C36] py-24 px-8 md:px-12 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative w-full max-w-2xl h-[420px] rounded-3xl overflow-hidden flex flex-col items-center justify-center gap-6 px-8 text-center"
      >
        <AnimatePresence>
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{ backgroundColor: backgrounds[bgIndex] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
            {t.heading}
          </h2>
          <p className="text-white/60 text-base max-w-sm">{t.sub}</p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/get-started"
              className="px-7 py-3.5 rounded-full bg-white text-navy text-sm font-bold hover:bg-white/90 transition-all"
            >
              {t.btn1}
            </Link>
            <button
              type="button"
              onClick={onContactClick}
              className="px-7 py-3.5 rounded-full bg-[#8B89C2] text-white text-sm font-bold hover:bg-[#7B79B2] transition-all"
            >
              {t.btn2}
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-20 w-full max-w-xl text-center"
      >
        <p className="text-white/50 text-sm mb-5">{t.emailSub}</p>
        <form className="flex gap-3">
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            className="flex-1 h-12 px-5 rounded-xl bg-white text-navy text-sm placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-[#8B89C2]"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#8B89C2] text-white text-sm font-bold hover:bg-[#7B79B2] transition-all whitespace-nowrap"
          >
            {t.emailBtn}
          </button>
        </form>
      </motion.div>
    </section>
  )
}
