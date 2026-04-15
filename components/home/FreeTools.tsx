'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const tools = [
  {
    id: 'calculator',
    href: '/calculator',
    emoji: '📊',
    tag: 'مجاني',
    titleAr: 'حاسبة الأرباح',
    titleEn: 'Profit Calculator',
    descAr: 'احسب هامش ربحك، نقطة التعادل، وصحة أرقامك في دقيقة واحدة.',
    descEn: 'Calculate your profit margin, break-even point, and business health instantly.',
    color: '#FFEB95',
    available: true,
  },
  {
    id: 'menu-audit',
    href: '/menu-audit',
    emoji: '🍽️',
    tag: 'قريباً',
    titleAr: 'تدقيق المنيو',
    titleEn: 'Menu Audit Tool',
    descAr: 'حلّل أسعار منيوك واكتشف أي الأصناف تحتاج إعادة تسعير.',
    descEn: 'Analyze your menu pricing and discover which items need repricing.',
    color: '#BCE4E7',
    available: false,
  },
  {
    id: 'inventory',
    href: '/inventory-health',
    emoji: '📦',
    tag: 'قريباً',
    titleAr: 'صحة المخزون',
    titleEn: 'Inventory Health Check',
    descAr: 'اكتشف الأصناف الراكدة وفرص تحسين دورة مخزونك.',
    descEn: 'Discover slow-moving items and inventory improvement opportunities.',
    color: '#DBE1E9',
    available: false,
  },
]

export default function FreeTools() {
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
            أدوات مجانية — Free Tools
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', color: '#0F0C36', lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.02em' }}>
            أدوات تساعدك تفهم تجارتك
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#8B89C2', maxWidth: 500 }}>
            Tools that help you understand your business — no signup required.
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {tools.map((tool, i) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

function ToolCard({ tool }: { tool: typeof tools[number] }) {
  return (
    <Link href={tool.available ? tool.href : '#'} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <div
        style={{
          border: '1.5px solid #DBE1E9',
          borderRadius: 20,
          padding: '32px',
          height: '100%',
          transition: 'border-color 0.2s, transform 0.2s',
          cursor: tool.available ? 'pointer' : 'default',
          opacity: tool.available ? 1 : 0.7,
          boxSizing: 'border-box',
        }}
        onMouseEnter={e => {
          if (!tool.available) return
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
        <div style={{ display: 'inline-block', background: tool.available ? '#EEEDFE' : '#F3F4F6', color: tool.available ? '#3C3489' : '#888', fontSize: 11, fontFamily: 'var(--font-body)', fontWeight: 600, padding: '3px 10px', borderRadius: 999, marginBottom: 12 }}>
          {tool.tag}
        </div>

        {/* Title */}
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#0F0C36', marginBottom: 4, lineHeight: 1.3 }}>
          {tool.titleAr}
        </h3>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#8B89C2', marginBottom: 16 }}>
          {tool.titleEn}
        </p>

        {/* Description */}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#555', lineHeight: 1.65, marginBottom: 8 }}>
          {tool.descAr}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#AAA', lineHeight: 1.6 }}>
          {tool.descEn}
        </p>

        {/* CTA */}
        {tool.available && (
          <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#0F0C36' }}>
            ابدأ الآن ←
          </div>
        )}
      </div>
    </Link>
  )
}
