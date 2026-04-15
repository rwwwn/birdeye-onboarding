'use client'

import { useState, useEffect } from 'react'
import { captureLead } from '@/lib/leads'
import Link from 'next/link'
import Navbar from '@/components/home/Navbar'
import { useLanguage } from '@/contexts/LanguageContext'

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void
  }
}

interface Inputs {
  monthlyRevenue: number
  cogs: number
  rent: number
  employees: number
  avgSalary: number
}

interface Results {
  grossMargin: number
  grossProfit: number
  netProfit: number
  breakEven: number
  verdict: 'Healthy' | 'At Risk' | 'Critical' | null
  verdictAr: string
  verdictColor: string
}

const copy = {
  ar: {
    tag: 'أداة مجانية',
    headline: 'هل تجارتك مربحة فعلاً؟',
    sub: 'أدخل أرقامك واعرف الإجابة فوراً.',
    inputsHeadline: 'أدخل أرقامك',
    fields: ['الإيرادات الشهرية', 'تكلفة البضاعة المباعة', 'الإيجار الشهري', 'عدد الموظفين', 'متوسط الراتب الشهري'],
    verdictLabel: 'التقييم العام',
    verdictEmpty: 'أدخل أرقامك لترى النتيجة',
    verdictSuffix: 'هامش الربح الإجمالي',
    stats: ['هامش الربح الإجمالي', 'صافي الربح الشهري', 'إجمالي الربح', 'نقطة التعادل'],
    insight: {
      Healthy: 'أرقامك في المنطقة الصحية. التجار الذين يستخدمون بيردآي يحسّنون هامشهم بـ 15-20% إضافية.',
      'At Risk': 'هامشك في منطقة الخطر. معظم التجار الأصحاء يعملون بهامش +30%. بيردآي يساعدك تحسّن هذا الرقم.',
      Critical: 'هامشك في المنطقة الحرجة. تحتاج مراجعة فورية لتكاليفك وأسعارك. فريقنا يمكنه مساعدتك.',
    },
    emailHeadline: 'احصل على تقريرك الكامل',
    emailSub: 'سنرسله إلى بريدك الإلكتروني',
    emailPlaceholder: 'بريدك الإلكتروني',
    emailBtn: 'أرسل ←',
    emailSending: '...',
    emailDone: 'تم الإرسال!',
    emailDoneSub: 'فريقنا سيتواصل معك قريباً',
    ctaHeadline: 'جاهز تبدأ مع بيردآي؟',
    ctaBtn: 'ابدأ مجاناً ←',
    switchLang: 'English',
  },
  en: {
    tag: 'Free Tool',
    headline: 'Is your business actually profitable?',
    sub: 'Enter your numbers and find out instantly.',
    inputsHeadline: 'Enter your numbers',
    fields: ['Monthly Revenue', 'Cost of Goods Sold (COGS)', 'Monthly Rent', 'Number of Employees', 'Average Monthly Salary'],
    verdictLabel: 'Overall Verdict',
    verdictEmpty: 'Enter your numbers to see results',
    verdictSuffix: 'Gross Margin',
    stats: ['Gross Margin', 'Monthly Net Profit', 'Gross Profit', 'Break-even Point'],
    insight: {
      Healthy: 'Your numbers look healthy. BirdEye merchants improve their margin by an additional 15-20%.',
      'At Risk': 'Your margin is in the danger zone. Most healthy businesses operate at 30%+. BirdEye can help you fix this.',
      Critical: 'Your margin is critical. You need an immediate review of your costs and pricing. Our team can help.',
    },
    emailHeadline: 'Get your detailed report',
    emailSub: "We'll send a full breakdown to your inbox",
    emailPlaceholder: 'your@email.com',
    emailBtn: 'Send ←',
    emailSending: '...',
    emailDone: 'Sent!',
    emailDoneSub: 'Our team will reach out soon',
    ctaHeadline: 'Ready to start with BirdEye?',
    ctaBtn: 'Start free ←',
    switchLang: 'العربية',
  },
}

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>({ monthlyRevenue: 0, cogs: 0, rent: 0, employees: 0, avgSalary: 0 })
  const [results, setResults] = useState<Results>({ grossMargin: 0, grossProfit: 0, netProfit: 0, breakEven: 0, verdict: null, verdictAr: '', verdictColor: '#DBE1E9' })
  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)
  const { lang } = useLanguage()

  const t = copy[lang]
  const fieldKeys: (keyof Inputs)[] = ['monthlyRevenue', 'cogs', 'rent', 'employees', 'avgSalary']

  useEffect(() => {
    const { monthlyRevenue, cogs, rent, employees, avgSalary } = inputs
    if (monthlyRevenue === 0) { setHasCalculated(false); return }
    setHasCalculated(true)

    const grossProfit = monthlyRevenue - cogs
    const grossMargin = Math.round((grossProfit / monthlyRevenue) * 100)
    const totalFixedCosts = rent + employees * avgSalary
    const netProfit = grossProfit - totalFixedCosts
    const breakEven = grossMargin > 0 ? Math.round(totalFixedCosts / (grossMargin / 100)) : 0

    const verdict: 'Healthy' | 'At Risk' | 'Critical' = grossMargin >= 30 ? 'Healthy' : grossMargin >= 15 ? 'At Risk' : 'Critical'
    const verdictAr = verdict === 'Healthy' ? 'صحي' : verdict === 'At Risk' ? 'في خطر' : 'حرج'
    const verdictColor = verdict === 'Healthy' ? '#22c55e' : verdict === 'At Risk' ? '#f59e0b' : '#ef4444'

    setResults({ grossMargin, grossProfit, netProfit, breakEven, verdict, verdictAr, verdictColor })
  }, [inputs])

  useEffect(() => {
    if (!hasCalculated || !results.verdict) return
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_result_viewed', { verdict: results.verdict, gross_margin: results.grossMargin })
    }
  }, [results.verdict]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleInput(field: keyof Inputs, value: string) {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }))
  }

  async function handleEmailSubmit() {
    if (!email || submitting) return
    setSubmitting(true)
    await captureLead({ source: 'calculator', email, monthly_revenue: inputs.monthlyRevenue, gross_margin: results.grossMargin, net_profit: results.netProfit, verdict: results.verdict || '' })
    setSubmitting(false)
    setEmailSubmitted(true)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_lead_captured', { verdict: results.verdict, gross_margin: results.grossMargin })
    }
  }

  const statValues = [
    hasCalculated ? `${results.grossMargin}%` : '—',
    hasCalculated ? `${results.netProfit.toLocaleString()} ر.س` : '—',
    hasCalculated ? `${results.grossProfit.toLocaleString()} ر.س` : '—',
    hasCalculated ? `${results.breakEven.toLocaleString()} ر.س` : '—',
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#DBE1E9', fontFamily: 'var(--font-body)' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>

      {/* Site Navbar */}
      <Navbar />

      {/* Page header — pushed down by fixed navbar (64px) */}
      <div style={{ textAlign: 'center', padding: '100px 48px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: '#8B89C2', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
            {t.tag}
          </p>
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', color: '#0F0C36', marginBottom: 12, letterSpacing: '-0.02em' }}>
          {t.headline}
        </h1>
        <p style={{ fontSize: 16, color: '#8B89C2', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
          {t.sub}
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

        {/* LEFT — Inputs */}
        <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#0F0C36', marginBottom: 32 }}>{t.inputsHeadline}</h2>

          {fieldKeys.map((field, i) => (
            <div key={field} style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>
                {t.fields[i]}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #DBE1E9', borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.15s' }}>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e => handleInput(field, e.target.value)}
                  style={{ flex: 1, height: 44, padding: '0 14px', border: 'none', outline: 'none', fontSize: 14, color: '#0F0C36', background: 'transparent' }}
                  onFocus={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#0F0C36' }}
                  onBlur={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#DBE1E9' }}
                />
                <span style={{ padding: '0 14px', fontSize: 13, color: '#8B89C2', borderLeft: '1px solid #DBE1E9', height: 44, display: 'flex', alignItems: 'center' }}>ر.س</span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Verdict */}
          <div style={{ background: hasCalculated ? results.verdictColor : '#0F0C36', borderRadius: 20, padding: '32px', transition: 'background 0.3s' }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              {hasCalculated ? t.verdictLabel : t.verdictEmpty}
            </p>
            {hasCalculated ? (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#FFFFFF', marginBottom: 4 }}>
                  {lang === 'ar' ? results.verdictAr : results.verdict}
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                  {t.verdictSuffix}: {results.grossMargin}%
                </p>
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'rgba(255,255,255,0.3)' }}>—</p>
            )}
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {t.stats.map((label, i) => (
              <div key={label} style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px' }}>
                <p style={{ fontSize: 11, color: '#8B89C2', marginBottom: 10 }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#0F0C36', fontWeight: 700 }}>{statValues[i]}</p>
              </div>
            ))}
          </div>

          {/* Insight */}
          {hasCalculated && results.verdict && (
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px 24px', borderRight: `4px solid ${results.verdictColor}` }}>
              <p style={{ fontSize: 13, color: '#0F0C36', lineHeight: 1.6 }}>
                {t.insight[results.verdict]}
              </p>
            </div>
          )}

          {/* Email capture */}
          <div style={{ background: '#0F0C36', borderRadius: 20, padding: '28px' }}>
            {!emailSubmitted ? (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#FFFFFF', marginBottom: 6 }}>{t.emailHeadline}</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>{t.emailSub}</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleEmailSubmit() }}
                    placeholder={t.emailPlaceholder}
                    style={{ flex: 1, height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: 13, outline: 'none' }}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    disabled={submitting || !email}
                    style={{ height: 44, padding: '0 20px', background: '#FFEB95', color: '#0F0C36', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: submitting || !email ? 'not-allowed' : 'pointer', opacity: submitting || !email ? 0.5 : 1, whiteSpace: 'nowrap' }}
                  >
                    {submitting ? t.emailSending : t.emailBtn}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, background: 'rgba(34,197,94,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9l4 4 8-8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{t.emailDone}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t.emailDoneSub}</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ background: '#FFEB95', borderRadius: 14, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: '#0F0C36' }}>{t.ctaHeadline}</p>
            <Link href="/get-started" style={{ background: '#0F0C36', color: '#FFEB95', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {t.ctaBtn}
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
