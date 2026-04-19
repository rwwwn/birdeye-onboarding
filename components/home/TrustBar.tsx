'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const badges = [
  { src: '/trust_signals/ZATCA.webp', alt: 'ZATCA' },
  { src: '/trust_signals/monshaat.webp', alt: 'Monshaat' },
  { src: '/trust_signals/saudi business center.webp', alt: 'Saudi Business Center' },
  { src: '/trust_signals/saudi-made.webp', alt: 'Saudi Made' },
  { src: '/trust_signals/manassa tech.webp', alt: 'Manassa Tech' },
]

export default function TrustBar() {
  const { lang } = useLanguage()

  return (
    <section style={{
      background: '#FFFFFF',
      padding: '20px 48px',
      borderBottom: '1px solid #DBE1E9',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
        flexWrap: 'wrap',
      }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 10,
          color: '#8B89C2',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          margin: 0,
          whiteSpace: 'nowrap',
        }}>
          {lang === 'ar' ? 'موثوق به من' : 'Trusted by'}
        </p>
        {badges.map(badge => (
          <img
            key={badge.alt}
            src={badge.src}
            alt={badge.alt}
            style={{
              height: 32,
              width: 'auto',
              objectFit: 'contain',
              opacity: 0.8,
              filter: 'grayscale(15%)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.8')}
          />
        ))}
      </div>
    </section>
  )
}
