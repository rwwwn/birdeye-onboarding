'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

type TileContent =
  | { type: 'image'; src: string; alt: string }
  | { type: 'text'; headingAr: string; headingEn: string; subAr?: string; subEn?: string }
  | { type: 'stat'; value: string; labelAr: string; labelEn: string }
  | { type: 'illustration'; src: string }
  | { type: 'empty' }

interface Tile {
  bg: string
  h: number
  content: TileContent
}

const tiles: Tile[] = [
  {
    bg: 'transparent',
    h: 260,
    content: { type: 'image', src: '/pos_images/i1.webp', alt: 'BirdEye POS Device' },
  },
  {
    bg: '#0F0C36',
    h: 320,
    content: {
      type: 'stat',
      value: '+500',
      labelAr: 'تاجر يثق ببيردآي',
      labelEn: 'merchants trust BirdEye',
    },
  },
  {
    bg: 'transparent',
    h: 260,
    content: { type: 'image', src: '/pos_screen/p1.webp', alt: 'BirdEye Dashboard' },
  },
  {
    bg: '#FFEB95',
    h: 320,
    content: {
      type: 'text',
      headingAr: 'مهما كان نشاطك',
      headingEn: 'Whatever your business',
      subAr: 'ابنِ وانمُ بشروطك',
      subEn: 'Build and grow on your terms',
    },
  },
  {
    bg: 'transparent',
    h: 260,
    content: { type: 'image', src: '/pos_images/i2.webp', alt: 'BirdEye POS Angle' },
  },
  {
    bg: '#BCE4E7',
    h: 260,
    content: {
      type: 'illustration',
      src: '/Illustrations/Patterns.svg',
    },
  },
  {
    bg: 'transparent',
    h: 320,
    content: { type: 'image', src: '/pos_screen/p2.webp', alt: 'BirdEye Interface' },
  },
  {
    bg: '#DBE1E9',
    h: 260,
    content: {
      type: 'stat',
      value: '٪٩٩.٩',
      labelAr: 'وقت تشغيل مضمون',
      labelEn: 'guaranteed uptime',
    },
  },
  {
    bg: 'transparent',
    h: 260,
    content: { type: 'image', src: '/pos_images/i3.webp', alt: 'BirdEye POS Setup' },
  },
  {
    bg: '#0F0C36',
    h: 320,
    content: {
      type: 'text',
      headingAr: 'كاشير واحد',
      headingEn: 'One POS',
      subAr: 'لكل أنواع التجارة',
      subEn: 'for every kind of business',
    },
  },
]

export default function PhotoGrid() {
  const { lang } = useLanguage()

  return (
    <section style={{ background: '#FFFFFF', padding: '60px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', maxWidth: '1300px', margin: '0 auto 64px' }}>
        {tiles.map((tile, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            viewport={{ once: true }}
            style={{
              background: tile.bg,
              borderRadius: 16,
              height: tile.h,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {tile.content.type === 'image' && (
              <img
                src={tile.content.src}
                alt={tile.content.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}

            {tile.content.type === 'text' && (
              <div style={{ textAlign: 'center', padding: '20px 16px' }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  color: tile.bg === '#0F0C36' ? '#FFEB95' : '#0F0C36',
                  marginBottom: 6,
                  lineHeight: 1.3,
                }}>
                  {lang === 'ar' ? tile.content.headingAr : tile.content.headingEn}
                </p>
                {tile.content.subAr && (
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 12,
                    color: tile.bg === '#0F0C36' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)',
                  }}>
                    {lang === 'ar' ? tile.content.subAr : tile.content.subEn}
                  </p>
                )}
              </div>
            )}

            {tile.content.type === 'stat' && (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 40,
                  color: tile.bg === '#0F0C36' ? '#FFEB95' : '#0F0C36',
                  marginBottom: 6,
                  lineHeight: 1,
                }}>
                  {tile.content.value}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: tile.bg === '#0F0C36' ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.5)',
                  lineHeight: 1.5,
                }}>
                  {lang === 'ar' ? tile.content.labelAr : tile.content.labelEn}
                </p>
              </div>
            )}

            {tile.content.type === 'illustration' && (
              <img
                src={tile.content.src}
                alt=""
                style={{ width: '85%', height: '85%', objectFit: 'contain', opacity: 0.45 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center' }}
      >
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 3.5vw, 42px)', color: '#0F0C36', maxWidth: 640, margin: '0 auto 12px', lineHeight: 1.3 }}>
          {lang === 'ar' ? 'مهما كان نشاطك التجاري، ابنِ وانمُ بشروطك' : 'Whatever your type of business, build and grow on your terms.'}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#8B89C2' }}>
          {lang === 'ar' ? 'كاشير ذكي يتكيف مع نشاطك، لا العكس.' : 'A smart POS that adapts to your business, not the other way around.'}
        </p>
      </motion.div>
    </section>
  )
}
