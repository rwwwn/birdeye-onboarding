'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const copy = {
  ar: {
    label: 'قصص النجاح',
    heading: 'تجار حققوا نتائج حقيقية',
    stories: [
      {
        name: 'أحمد الغامدي',
        business: 'مطعم شاورما السلطان — الرياض',
        quote: 'بعد ما شغّلت بيردآي، ارتفع معدل عودة الزبائن ٣٢٪ في أول ثلاثة أشهر. الكاشير سهّل عليّ كل شيء.',
        metric: '+32%',
        metricLabel: 'تكرار الشراء',
        avatar: 'أ',
        avatarBg: '#0F0C36',
      },
      {
        name: 'سارة المطيري',
        business: 'بوتيك لمسة — جدة',
        quote: 'المخزون كان أكبر تحدي عندي. الآن أعرف بالضبط إيش يبيع وإيش يتكدّس. وفّرت آلاف الريالات.',
        metric: '٤٠٪',
        metricLabel: 'تقليص الهدر',
        avatar: 'س',
        avatarBg: '#8B89C2',
      },
      {
        name: 'خالد الدوسري',
        business: 'صالة ليفت جيم — الدمام',
        quote: 'جرّبت ٣ أنظمة قبل بيردآي. هذا الوحيد اللي فعلاً يفهم تجارتي ويعطيني تقارير أقدر أتصرف عليها.',
        metric: '٣ أنظمة',
        metricLabel: 'اختبرها قبلنا',
        avatar: 'خ',
        avatarBg: '#BCE4E7',
      },
    ],
  },
  en: {
    label: 'Success Stories',
    heading: 'Merchants seeing real results',
    stories: [
      {
        name: 'Ahmed Al-Ghamdi',
        business: 'Sultan Shawarma Restaurant — Riyadh',
        quote: 'After switching to BirdEye, repeat customer rate went up 32% in the first three months. The POS made everything simpler.',
        metric: '+32%',
        metricLabel: 'Repeat purchases',
        avatar: 'A',
        avatarBg: '#0F0C36',
      },
      {
        name: 'Sara Al-Mutairi',
        business: 'Lamsa Boutique — Jeddah',
        quote: 'Inventory was my biggest challenge. Now I know exactly what sells and what sits. I\'ve saved thousands of riyals.',
        metric: '40%',
        metricLabel: 'Waste reduced',
        avatar: 'S',
        avatarBg: '#8B89C2',
      },
      {
        name: 'Khaled Al-Dosari',
        business: 'Lift Gym — Dammam',
        quote: 'I tried 3 systems before BirdEye. This is the only one that actually understands my business and gives me reports I can act on.',
        metric: '3 Systems',
        metricLabel: 'Tried before us',
        avatar: 'K',
        avatarBg: '#BCE4E7',
      },
    ],
  },
}

export default function SuccessStories() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section style={{ background: '#F7F5F0', padding: '100px 24px' }}>
      <div style={{ maxWidth: 1215, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 56, textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#B0ACA4',
            marginBottom: 16,
          }}>
            {t.label}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 3.5vw, 40px)',
            fontWeight: 700,
            color: '#0F0C36',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}>
            {t.heading}
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {t.stories.map((story) => (
            <div
              key={story.name}
              style={{
                background: '#FFFFFF',
                borderRadius: 24,
                padding: '36px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                boxShadow: '0 2px 16px rgba(0,0,0,0.05)',
              }}
            >
              {/* Metric */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 40,
                  fontWeight: 700,
                  color: '#0F0C36',
                  lineHeight: 1,
                  marginBottom: 4,
                }}>
                  {story.metric}
                </p>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#B0ACA4',
                  letterSpacing: '0.05em',
                }}>
                  {story.metricLabel}
                </p>
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: 15,
                fontWeight: 400,
                color: '#5C5952',
                lineHeight: 1.75,
                flex: 1,
              }}>
                &ldquo;{story.quote}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: story.avatarBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 16,
                    fontWeight: 700,
                    color: '#FFFFFF',
                  }}>
                    {story.avatar}
                  </span>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: '#0F0C36', marginBottom: 2 }}>
                    {story.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 400, color: '#B0ACA4' }}>
                    {story.business}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
