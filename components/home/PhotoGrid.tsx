'use client'

import { motion } from 'framer-motion'

const tiles = [
  { bg: '#DBE1E9', h: 240 },
  { bg: '#BCE4E7', h: 320 },
  { bg: '#FFEB95', h: 240, content: 'text' },
  { bg: '#DBE1E9', h: 320 },
  { bg: '#0F0C36', h: 240, content: 'video' },
  { bg: '#BCE4E7', h: 240 },
  { bg: '#DBE1E9', h: 320 },
  { bg: '#FFEB95', h: 240 },
  { bg: '#DBE1E9', h: 240 },
  { bg: '#0F0C36', h: 320, content: 'stat' },
]

export default function PhotoGrid() {
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
            style={{ background: tile.bg, borderRadius: 16, height: tile.h, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
          >
            {tile.content === 'text' && (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#0F0C36', marginBottom: 6 }}>مهما كان نشاطك</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(0,0,0,0.5)' }}>Build and grow on your terms</p>
              </div>
            )}
            {tile.content === 'video' && (
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
                  <path d="M4 2l10 6-10 6V2z" />
                </svg>
              </div>
            )}
            {tile.content === 'stat' && (
              <div style={{ textAlign: 'center', padding: 20 }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: '#FFEB95', marginBottom: 6 }}>+500</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>تاجر يثق ببيردآي</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>merchants trust BirdEye</p>
              </div>
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
          مهما كان نشاطك التجاري، ابنِ وانمُ بشروطك
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#8B89C2' }}>
          Whatever your type of business, build and grow on your terms.
        </p>
      </motion.div>
    </section>
  )
}
