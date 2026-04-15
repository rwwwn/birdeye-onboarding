'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const industries = [
  {
    title_ar: 'المطاعم والمقاهي',
    title_en: 'Food & Beverage',
    stat_ar: '+١٥ مليون معاملة شهرياً',
    stat_en: '+15 million transactions per month',
    link_ar: 'اكتشف المزيد',
    link_en: 'Learn more',
    bg: '#1a1a2e',
    href: '/food',
  },
  {
    title_ar: 'تجارة التجزئة',
    title_en: 'Retail',
    stat_ar: 'مزامنة المخزون عبر الفروع في الوقت الفعلي',
    stat_en: 'Real-time inventory sync across all branches',
    link_ar: 'اكتشف المزيد',
    link_en: 'Learn more',
    bg: '#16213e',
    href: '/retail',
  },
  {
    title_ar: 'الخدمات',
    title_en: 'Services',
    stat_ar: 'إدارة المواعيد والفواتير من شاشة واحدة',
    stat_en: 'Appointments and invoices from one screen',
    link_ar: 'اكتشف المزيد',
    link_en: 'Learn more',
    bg: '#0f3460',
    href: '/services',
  },
  {
    title_ar: 'الجمال والعناية',
    title_en: 'Beauty & Wellness',
    stat_ar: 'برامج الولاء تزيد الشراء المتكرر بنسبة ٤٠٪',
    stat_en: 'Loyalty programs increase repeat purchases by 40%',
    link_ar: 'اكتشف المزيد',
    link_en: 'Learn more',
    bg: '#533483',
    href: '/get-started',
  },
]

const copy = {
  ar: { label: 'مصمّم لكل القطاعات', heading: 'حافظ على نمو تجارتك' },
  en: { label: 'Built for every sector', heading: 'Keep your business growing' },
}

function IndustryCard({ industry, isHovered, onHover, onLeave, lang }: {
  industry: typeof industries[0]
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  lang: 'ar' | 'en'
}) {
  const [titleTransform, setTitleTransform] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12
    setTitleTransform({ x, y })
  }

  function handleMouseLeave() {
    setTitleTransform({ x: 0, y: 0 })
    onLeave()
  }

  return (
    <div
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-2xl overflow-hidden h-[500px] cursor-pointer flex-shrink-0 transition-all duration-500"
      style={{ backgroundColor: industry.bg, flex: isHovered ? '2.5' : '1' }}
    >
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{ backgroundColor: isHovered ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.5)' }}
      />
      <div className="absolute inset-0 p-7 flex flex-col justify-end">
        <motion.h3
          animate={{ x: titleTransform.x, y: titleTransform.y }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="font-display text-2xl font-bold text-white mb-1"
        >
          {lang === 'ar' ? industry.title_ar : industry.title_en}
        </motion.h3>

        <div
          className="overflow-hidden transition-all duration-500"
          style={{ maxHeight: isHovered ? '120px' : '0', opacity: isHovered ? 1 : 0 }}
        >
          <p className="text-white/70 text-sm mt-3 leading-relaxed">
            {lang === 'ar' ? industry.stat_ar : industry.stat_en}
          </p>
          <Link
            href={industry.href}
            className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-white hover:text-yellow transition-colors"
          >
            {lang === 'ar' ? industry.link_ar : industry.link_en}
            <svg className="w-3.5 h-3.5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function IndustryCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section className="bg-[#0F0C36] py-24 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3">{t.label}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white max-w-lg leading-tight">{t.heading}</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex gap-4"
        >
          {industries.map((industry, i) => (
            <IndustryCard
              key={industry.title_en}
              industry={industry}
              isHovered={hoveredIndex === i}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
              lang={lang}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
