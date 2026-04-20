'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const brands = [
  'ماكدونالدز', 'كودو', 'هرفي', 'بن داود', 'أكلات', 'بيتزا هت', 'نانا', 'جرير',
]

const copy = {
  ar: { label: 'موثوق من أبرز العلامات التجارية السعودية' },
  en: { label: 'Trusted by Leading Saudi Brands' },
}

export default function BrandBar() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section style={{ background: '#FFFFFF', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1215, margin: '0 auto', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: 13,
          fontWeight: 400,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#B0ACA4',
          marginBottom: 32,
        }}>
          {t.label}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px 32px',
        }}>
          {brands.map((name) => (
            <span
              key={name}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 700,
                color: '#C5C0B8',
                letterSpacing: '-0.01em',
                userSelect: 'none',
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
