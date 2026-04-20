'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const logos = [
  { src: '/trust_signals/monshaat.png', alt: "Monsha'at" },
  { src: '/trust_signals/manassa-tech.png', alt: 'ManassTech / CST' },
  { src: '/trust_signals/saudi-business-center.png', alt: 'Saudi Business Center' },
  { src: '/trust_signals/zacta.png', alt: 'ZATCA' },
  { src: '/trust_signals/saudi-made.png', alt: 'Saudi Made' },
]

// Exactly 2× for seamless translateX(-50%) loop
const track = [...logos, ...logos]

const copy = {
  ar: {
    label: 'اعتمادات حكومية',
    heading: 'موثوق من المنصات الحكومية',
    headingSub: 'كل شيء متوافق وآمن',
    sub: 'نظام معتمد ومحدّث باستمرار يلتزم بأعلى معايير الأمان واللوائح الحكومية.',
    cta: 'اعرف أكثر',
  },
  en: {
    label: 'Government Accreditations',
    heading: 'Trusted by government platforms',
    headingSub: 'Everything is compliant and secure',
    sub: 'A certified, continuously updated system that meets the highest security standards and government regulations.',
    cta: 'Learn more',
  },
}

export default function TrustBar() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section style={{ background: '#F7F5F0', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1215, margin: '0 auto' }}>
        <div style={{
          background: '#EDEAE3',
          borderRadius: 150,
          padding: '52px 48px 44px',
          textAlign: 'center',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}>

          {/* Label */}
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#9E9B93',
            marginBottom: 20,
          }}>
            {t.label}
          </p>

          {/* Heading */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 700,
            color: '#0F0C36',
            lineHeight: 1.25,
            marginBottom: 4,
            letterSpacing: '-0.01em',
          }}>
            {t.heading}
          </h2>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 32,
            fontWeight: 700,
            color: '#9E9B93',
            lineHeight: 1.25,
            marginBottom: 20,
            letterSpacing: '-0.01em',
          }}>
            {t.headingSub}
          </h2>

          {/* Subtitle */}
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            fontWeight: 500,
            color: '#8C8880',
            maxWidth: 520,
            margin: '0 auto 44px',
            lineHeight: 1.7,
          }}>
            {t.sub}
          </p>

          {/* Row 1 — scrolls left, starts mid-scroll */}
          <div style={{ overflow: 'hidden', marginBottom: 12 }}>
            <div style={{
              display: 'flex',
              width: 'max-content',
              animation: 'marquee-left 20s linear infinite',
              animationDelay: '-10s',
            }}>
              {track.map((logo, i) => (
                <LogoCard key={`l1-${i}`} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right, starts mid-scroll */}
          <div style={{ overflow: 'hidden', marginBottom: 44 }}>
            <div style={{
              display: 'flex',
              width: 'max-content',
              animation: 'marquee-right 20s linear infinite',
              animationDelay: '-5s',
            }}>
              {track.map((logo, i) => (
                <LogoCard key={`l2-${i}`} src={logo.src} alt={logo.alt} />
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/get-started"
            style={{
              display: 'inline-block',
              background: '#0F0C36',
              color: '#FFFFFF',
              padding: '13px 36px',
              borderRadius: 999,
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.01em',
            }}
          >
            {t.cta}
          </Link>

        </div>
      </div>
    </section>
  )
}

function LogoCard({ src, alt }: { src: string; alt: string }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div style={{
      flexShrink: 0,
      width: 144,
      height: 72,
      background: '#FFFFFF',
      borderRadius: 12,
      margin: '0 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      padding: '12px 16px',
    }}>
      {imgError ? (
        <span style={{ fontSize: 11, fontWeight: 600, color: '#0F0C36', textAlign: 'center', lineHeight: 1.3 }}>{alt}</span>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        />
      )}
    </div>
  )
}
