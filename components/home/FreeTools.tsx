'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const tools = [
  {
    id: 'calculator',
    href: '/calculator',
    emoji: '📊',
    titleAr: 'حاسبة الأرباح',
    titleEn: 'Profit Calculator',
    descAr: 'احسب هامش ربحك، نقطة التعادل، وصحة أرقامك في دقيقة واحدة.',
    descEn: 'Calculate your profit margin, break-even point, and business health instantly.',
    color: '#FFEB95',
    available: true,
  },
  {
    id: 'pricing-calculator',
    href: '/pricing-calculator',
    emoji: '🏷️',
    titleAr: 'حاسبة التسعير',
    titleEn: 'Pricing Calculator',
    descAr: 'احسب السعر الصحيح لمنتجاتك بناءً على التكلفة والهامش المستهدف.',
    descEn: 'Find the right selling price based on cost and target margin.',
    color: '#BCE4E7',
    available: true,
  },
  {
    id: 'inventory-health',
    href: '/inventory-health',
    emoji: '📦',
    titleAr: 'صحة المخزون',
    titleEn: 'Inventory Health',
    descAr: 'اكتشف كم من رأس مالك محجوز في مخزون راكد.',
    descEn: 'Find out how much capital is trapped in dead stock.',
    color: '#DBE1E9',
    available: true,
  },
  {
    id: 'system-cost',
    href: '/system-cost',
    emoji: '💸',
    titleAr: 'تكلفة التشتت',
    titleEn: 'System Cost Calculator',
    descAr: 'اكتشف كم تخسر سنوياً بسبب استخدام أنظمة متعددة.',
    descEn: 'Discover how much you lose annually from fragmented systems.',
    color: '#FFEB95',
    available: true,
  },
]

const copy = {
  ar: {
    label: 'أدوات مجانية',
    heading: 'أدوات تساعدك تفهم تجارتك',
    sub: 'لا تحتاج تسجيل. أدخل أرقامك واحصل على النتيجة فوراً.',
    tag: 'مجاني',
    cta: 'ابدأ الآن ←',
  },
  en: {
    label: 'Free Tools',
    heading: 'Tools that help you understand your business',
    sub: 'No signup required. Enter your numbers and get results instantly.',
    tag: 'Free',
    cta: 'Start now →',
  },
}

export default function FreeTools() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="tools" style={{ background: '#FFFFFF', padding: '100px 48px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginBottom: 60 }}
        >
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#8B89C2', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            {t.label}
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#0F0C36', lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.02em' }}>
            {t.heading}
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#8B89C2', maxWidth: 500 }}>
            {t.sub}
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {tools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ToolCard tool={tool} lang={lang} tag={t.tag} cta={t.cta} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

function ToolCard({ tool, lang, tag, cta }: {
  tool: typeof tools[number]
  lang: 'ar' | 'en'
  tag: string
  cta: string
}) {
  return (
    <Link href={tool.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        style={{
          border: '1.5px solid #DBE1E9',
          borderRadius: 20,
          padding: '32px',
          height: '100%',
          transition: 'border-color 0.2s, transform 0.2s',
          cursor: 'pointer',
          boxSizing: 'border-box',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = '#0F0C36'
          el.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.borderColor = '#DBE1E9'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Icon */}
        <div style={{ width: 56, height: 56, background: tool.color, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20 }}>
          {tool.emoji}
        </div>

        {/* Tag */}
        <div style={{ display: 'inline-block', background: '#EEEDFE', color: '#3C3489', fontSize: 11, fontFamily: 'var(--font-body)', fontWeight: 600, padding: '3px 10px', borderRadius: 999, marginBottom: 12 }}>
          {tag}
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#0F0C36', marginBottom: 12, lineHeight: 1.3 }}>
          {lang === 'ar' ? tool.titleAr : tool.titleEn}
        </h3>

        {/* Description */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#555', lineHeight: 1.65, marginBottom: 8 }}>
          {lang === 'ar' ? tool.descAr : tool.descEn}
        </p>

        {/* CTA */}
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#0F0C36' }}>
          {cta}
        </div>
      </div>
    </Link>
  )
}
