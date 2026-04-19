'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const logos = [
  { src: '/trust_signals/monshaat.webp', alt: "Monsha'at" },
  { src: '/trust_signals/manassa tech.webp', alt: 'ManassTech / CST' },
  { src: '/trust_signals/saudi business center.webp', alt: 'Saudi Business Center' },
  { src: '/trust_signals/ZATCA.webp', alt: 'ZATCA' },
  { src: '/trust_signals/saudi-made.webp', alt: 'Saudi Made' },
]

// Duplicate 4× so the track is long enough for seamless looping at any viewport
const track = [...logos, ...logos, ...logos, ...logos]

const copy = {
  ar: {
    label: 'اعتمادات حكومية',
    heading: 'موثوق من المنصات الحكومية',
    headingSub: 'كل شيء متوافق وآمن',
    sub: 'بيردآي معتمد من الجهات الحكومية السعودية، بما فيها هيئة الزكاة والضريبة والجمارك ومنصة منشآت.',
    cta: 'اعرف أكثر',
  },
  en: {
    label: 'Government Accreditations',
    heading: 'Trusted by government platforms',
    headingSub: 'Everything is compliant and secure',
    sub: 'BirdEye is accredited by Saudi government authorities including ZATCA and the Monsha\'at platform.',
    cta: 'Learn more',
  },
}

export default function TrustBar() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <>
      {/* CSS keyframe animations injected inline */}
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-track-left {
          display: flex;
          width: max-content;
          animation: marquee-left 28s linear infinite;
        }
        .marquee-track-right {
          display: flex;
          width: max-content;
          animation: marquee-right 28s linear infinite;
        }
      `}</style>

      <section style={{ background: '#F7F5F0', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* Card container */}
          <div style={{
            background: '#EDEAE3',
            borderRadius: 24,
            padding: '52px 48px 44px',
            textAlign: 'center',
          }}>

            {/* Label */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#9E9B93',
              marginBottom: 20,
            }}>
              {t.label}
            </p>

            {/* Heading */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 4vw, 40px)',
              color: '#0F0C36',
              lineHeight: 1.2,
              marginBottom: 8,
              letterSpacing: '-0.02em',
            }}>
              {t.heading}
            </h2>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(26px, 4vw, 40px)',
              color: '#0F0C36',
              lineHeight: 1.2,
              marginBottom: 20,
              letterSpacing: '-0.02em',
              opacity: 0.45,
            }}>
              {t.headingSub}
            </h2>

            {/* Subtitle */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: '#8C8880',
              maxWidth: 520,
              margin: '0 auto 44px',
              lineHeight: 1.7,
            }}>
              {t.sub}
            </p>

            {/* Marquee rows */}
            <div style={{ overflow: 'hidden', marginBottom: 12 }}>
              <div className="marquee-track-left">
                {track.map((logo, i) => (
                  <LogoCard key={`l1-${i}`} src={logo.src} alt={logo.alt} />
                ))}
              </div>
            </div>

            <div style={{ overflow: 'hidden', marginBottom: 44 }}>
              <div className="marquee-track-right">
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
    </>
  )
}

function LogoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{
      flexShrink: 0,
      width: 140,
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
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  )
}
