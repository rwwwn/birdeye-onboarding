'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  ar: {
    heading: 'شركاؤنا يعجّلون نموك!',
    sub: 'نعمل مع أفضل المنصات والأدوات لتزويد تجارتك بكل ما تحتاج',
  },
  en: {
    heading: 'Our partners accelerate your growth!',
    sub: 'Powering your business with the tools and partners that matter',
  },
}

// Each partner: name, bg color for the card, text color, size variant
const partners = [
  { name: 'Aramex',        bg: '#F5F5F5', color: '#CC0000', size: 'lg' },
  { name: 'Tabby',         bg: '#3D3D3D', color: '#CBF548', size: 'md' },
  { name: 'Tamara',        bg: '#F5F5F5', color: '#1A1A2E', size: 'md' },
  { name: 'Mada',          bg: '#00A651', color: '#FFFFFF', size: 'sm' },
  { name: 'SurePay',       bg: '#F5F5F5', color: '#5B4FCF', size: 'sm' },
  { name: 'Foodics',       bg: '#FF5733', color: '#FFFFFF', size: 'md' },
  { name: 'Nana',          bg: '#5C2D91', color: '#FFFFFF', size: 'sm' },
  { name: 'HungerStation', bg: '#1DB954', color: '#FFFFFF', size: 'lg' },
]

const sizeMap = { sm: 80, md: 100, lg: 120 }

// Scattered positions — x/y offsets to mimic the floating layout
const layout = [
  { col: 1, row: 0, offsetY: 20  },
  { col: 2, row: 0, offsetY: 0   },
  { col: 3, row: 0, offsetY: 40  },
  { col: 0, row: 1, offsetY: 0   },
  { col: 1, row: 1, offsetY: 60  },
  { col: 2, row: 1, offsetY: 20  },
  { col: 3, row: 1, offsetY: 0   },
  { col: 4, row: 0, offsetY: 60  },
]

export default function PartnersSection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section style={{ background: '#FFFFFF', padding: '100px 24px' }}>
      <div style={{
        maxWidth: 1215,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: 80,
        flexWrap: 'wrap',
      }}>

        {/* Left: text */}
        <div style={{ flex: '0 0 340px', minWidth: 260 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 700,
            color: '#0F0C36',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}>
            {t.heading}
          </h2>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 400,
            color: '#9E9B93',
            lineHeight: 1.7,
          }}>
            {t.sub}
          </p>
        </div>

        {/* Right: scattered partner cards */}
        <div style={{ flex: 1, minWidth: 300, position: 'relative', height: 340 }}>
          {partners.map((p, i) => {
            const pos = layout[i] ?? { col: i % 4, row: Math.floor(i / 4), offsetY: 0 }
            const size = sizeMap[p.size as keyof typeof sizeMap]
            const left = pos.col * 135 + (pos.row === 1 ? 60 : 0)
            const top = pos.row * 150 + pos.offsetY

            return (
              <div
                key={p.name}
                style={{
                  position: 'absolute',
                  left,
                  top,
                  width: size,
                  height: size,
                  borderRadius: 24,
                  background: p.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                  padding: 12,
                }}
              >
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: size > 100 ? 13 : 11,
                  fontWeight: 700,
                  color: p.color,
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}>
                  {p.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
