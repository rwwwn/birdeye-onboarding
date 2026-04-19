'use client'

import { useScroll, useTransform, motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

interface HeroProps {
  onContactClick?: () => void
}

const copy = {
  ar: {
    headline: 'الكاشير الذكي',
    tagline: 'The Intelligent POS',
    sub: 'الجيل الجديد من أنظمة المتاجر مصمّم لزيادة مبيعاتك ورفع تكرار الشراء',
    btn1: 'ابدأ تجربتك المجانية',
    btn2: 'تواصل مع فريق المبيعات',
    scroll: 'اسحب للأسفل',
  },
  en: {
    headline: 'The Intelligent POS',
    tagline: 'الكاشير الذكي',
    sub: 'The next generation of merchant systems — built to grow your sales and increase repeat purchases.',
    btn1: 'Start your free trial',
    btn2: 'Talk to our sales team',
    scroll: 'Scroll down',
  },
}

export default function Hero({ onContactClick }: HeroProps) {
  const { lang } = useLanguage()
  const t = copy[lang]

  const { scrollY } = useScroll()
  const textOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const textY       = useTransform(scrollY, [0, 300], [0, -40])

  return (
    <section style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Fallback bg */}
      <div style={{ position: 'absolute', inset: 0, background: '#0F0C36', zIndex: 0 }} />

      {/* Real video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src="/videos/herovid.MP4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.60) 100%)',
        zIndex: 2,
      }} />

      {/* Content */}
      <motion.div
        style={{
          opacity: textOpacity,
          y: textY,
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Real logo */}
        <img
          src="/logo/logo-white.svg"
          alt="BirdEye"
          style={{ height: 32, width: 'auto', marginBottom: 28, opacity: 0.95 }}
        />

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 9vw, 108px)', color: '#FFFFFF', lineHeight: 1.05, marginBottom: 16, letterSpacing: '-0.02em' }}>
          {t.headline}
        </h1>

        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3.5vw, 44px)', color: '#FFEB95', marginBottom: 20 }}>
          {t.tagline}
        </p>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(14px, 1.5vw, 18px)', color: 'rgba(255,255,255,0.65)', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.7 }}>
          {t.sub}
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/get-started"
            style={{ background: '#FFFFFF', color: '#0F0C36', padding: '15px 32px', borderRadius: 999, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-block' }}
          >
            {t.btn1}
          </Link>
          <button
            type="button"
            onClick={onContactClick}
            style={{ background: 'transparent', color: '#FFFFFF', border: '1.5px solid rgba(255,255,255,0.4)', padding: '15px 32px', borderRadius: 999, fontFamily: 'var(--font-body)', fontSize: 15, cursor: 'pointer' }}
          >
            {t.btn2}
          </button>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
            {t.scroll}
          </p>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }} />
        </div>
      </motion.div>

    </section>
  )
}
