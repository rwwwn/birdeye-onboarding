'use client'

import { useState, useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void
  }
}
import { captureLead } from '@/lib/leads'
import Link from 'next/link'

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

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<Inputs>({
    monthlyRevenue: 0,
    cogs: 0,
    rent: 0,
    employees: 0,
    avgSalary: 0,
  })

  const [results, setResults] = useState<Results>({
    grossMargin: 0,
    grossProfit: 0,
    netProfit: 0,
    breakEven: 0,
    verdict: null,
    verdictAr: '',
    verdictColor: '#DBE1E9',
  })

  const [email, setEmail] = useState('')
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [hasCalculated, setHasCalculated] = useState(false)

  useEffect(() => {
    const { monthlyRevenue, cogs, rent, employees, avgSalary } = inputs

    if (monthlyRevenue === 0) {
      setHasCalculated(false)
      return
    }

    setHasCalculated(true)

    const grossProfit = monthlyRevenue - cogs
    const grossMargin = monthlyRevenue > 0
      ? Math.round((grossProfit / monthlyRevenue) * 100)
      : 0

    const totalSalaries = employees * avgSalary
    const totalFixedCosts = rent + totalSalaries
    const netProfit = grossProfit - totalFixedCosts

    const breakEven = grossMargin > 0
      ? Math.round(totalFixedCosts / (grossMargin / 100))
      : 0

    let verdict: 'Healthy' | 'At Risk' | 'Critical'
    let verdictAr: string
    let verdictColor: string

    if (grossMargin >= 30) {
      verdict = 'Healthy'
      verdictAr = 'صحي'
      verdictColor = '#22c55e'
    } else if (grossMargin >= 15) {
      verdict = 'At Risk'
      verdictAr = 'في خطر'
      verdictColor = '#f59e0b'
    } else {
      verdict = 'Critical'
      verdictAr = 'حرج'
      verdictColor = '#ef4444'
    }

    setResults({ grossMargin, grossProfit, netProfit, breakEven, verdict, verdictAr, verdictColor })
  }, [inputs])

  // Track verdict view in GA4
  useEffect(() => {
    if (!hasCalculated || !results.verdict) return
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_result_viewed', {
        verdict: results.verdict,
        gross_margin: results.grossMargin,
      })
    }
  }, [results.verdict]) // eslint-disable-line react-hooks/exhaustive-deps

  function handleInput(field: keyof Inputs, value: string) {
    setInputs(prev => ({ ...prev, [field]: parseFloat(value) || 0 }))
  }

  async function handleEmailSubmit() {
    if (!email || submitting) return
    setSubmitting(true)

    await captureLead({
      source: 'calculator',
      email,
      monthly_revenue: inputs.monthlyRevenue,
      gross_margin: results.grossMargin,
      net_profit: results.netProfit,
      verdict: results.verdict || '',
    })

    setSubmitting(false)
    setEmailSubmitted(true)

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'calculator_lead_captured', {
        verdict: results.verdict,
        gross_margin: results.grossMargin,
      })
    }
  }

  const inputFields: { field: keyof Inputs; labelAr: string; labelEn: string; placeholder: string }[] = [
    { field: 'monthlyRevenue', labelAr: 'الإيرادات الشهرية',       labelEn: 'Monthly Revenue',          placeholder: '50,000' },
    { field: 'cogs',           labelAr: 'تكلفة البضاعة المباعة',    labelEn: 'Cost of Goods Sold (COGS)', placeholder: '20,000' },
    { field: 'rent',           labelAr: 'الإيجار الشهري',           labelEn: 'Monthly Rent',              placeholder: '8,000'  },
    { field: 'employees',      labelAr: 'عدد الموظفين',              labelEn: 'Number of Employees',       placeholder: '5'      },
    { field: 'avgSalary',      labelAr: 'متوسط الراتب الشهري',      labelEn: 'Average Monthly Salary',    placeholder: '3,000'  },
  ]

  const statCards = [
    { labelAr: 'هامش الربح الإجمالي', labelEn: 'Gross Margin',       value: hasCalculated ? `${results.grossMargin}%`                         : '—' },
    { labelAr: 'صافي الربح الشهري',   labelEn: 'Monthly Net Profit',  value: hasCalculated ? `${results.netProfit.toLocaleString()} ر.س`       : '—' },
    { labelAr: 'إجمالي الربح',        labelEn: 'Gross Profit',        value: hasCalculated ? `${results.grossProfit.toLocaleString()} ر.س`      : '—' },
    { labelAr: 'نقطة التعادل',        labelEn: 'Break-even Point',    value: hasCalculated ? `${results.breakEven.toLocaleString()} ر.س`        : '—' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#DBE1E9', fontFamily: 'var(--font-body)' }}>

      {/* Navbar */}
      <nav style={{ background: '#FFFFFF', padding: '16px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #DBE1E9' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#0F0C36' }}>بيردآي</span>
        </Link>
        <Link href="/get-started" style={{ background: '#0F0C36', color: '#FFEB95', padding: '10px 24px', borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          ابدأ مجاناً
        </Link>
      </nav>

      {/* Page header */}
      <div style={{ textAlign: 'center', padding: '60px 48px 40px' }}>
        <p style={{ fontSize: 11, color: '#8B89C2', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>
          أداة مجانية — Free Tool
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', color: '#0F0C36', marginBottom: 12, letterSpacing: '-0.02em' }}>
          هل تجارتك مربحة فعلاً؟
        </h1>
        <p style={{ fontSize: 16, color: '#8B89C2', maxWidth: 480, margin: '0 auto', lineHeight: 1.6 }}>
          Is your business actually profitable? Enter your numbers and find out instantly.
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

        {/* LEFT — Inputs */}
        <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#0F0C36', marginBottom: 4 }}>أدخل أرقامك</h2>
          <p style={{ fontSize: 13, color: '#8B89C2', marginBottom: 32 }}>Enter your numbers</p>

          {inputFields.map(({ field, labelAr, labelEn, placeholder }) => (
            <div key={field} style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 2 }}>
                {labelAr}
              </label>
              <p style={{ fontSize: 11, color: '#8B89C2', marginBottom: 8 }}>{labelEn}</p>
              <div
                style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #DBE1E9', borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.15s' }}
              >
                <input
                  type="number"
                  placeholder={placeholder}
                  onChange={e => handleInput(field, e.target.value)}
                  style={{ flex: 1, height: 44, padding: '0 14px', border: 'none', outline: 'none', fontSize: 14, color: '#0F0C36', background: 'transparent' }}
                  onFocus={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#0F0C36' }}
                  onBlur={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#DBE1E9' }}
                />
                <span style={{ padding: '0 14px', fontSize: 13, color: '#8B89C2', borderLeft: '1px solid #DBE1E9', height: 44, display: 'flex', alignItems: 'center' }}>
                  ر.س
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Verdict */}
          <div style={{ background: hasCalculated ? results.verdictColor : '#0F0C36', borderRadius: 20, padding: '32px', transition: 'background 0.3s' }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              {hasCalculated ? 'التقييم العام' : 'أدخل أرقامك لترى النتيجة'}
            </p>
            {hasCalculated ? (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#FFFFFF', marginBottom: 4 }}>
                  {results.verdictAr}
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>
                  {results.verdict} — هامش الربح الإجمالي: {results.grossMargin}%
                </p>
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'rgba(255,255,255,0.3)' }}>—</p>
            )}
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {statCards.map(({ labelAr, labelEn, value }) => (
              <div key={labelAr} style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px' }}>
                <p style={{ fontSize: 11, color: '#8B89C2', marginBottom: 2 }}>{labelAr}</p>
                <p style={{ fontSize: 10, color: '#BBB', marginBottom: 10 }}>{labelEn}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#0F0C36', fontWeight: 700 }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Insight */}
          {hasCalculated && results.verdict && (
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px 24px', borderRight: `4px solid ${results.verdictColor}` }}>
              <p style={{ fontSize: 13, color: '#0F0C36', lineHeight: 1.6, marginBottom: 6 }}>
                {results.verdict === 'Healthy'  && 'أرقامك في المنطقة الصحية. التجار الذين يستخدمون بيردآي يحسّنون هامشهم بـ 15-20% إضافية.'}
                {results.verdict === 'At Risk'  && 'هامشك في منطقة الخطر. معظم التجار الأصحاء يعملون بهامش +30%. بيردآي يساعدك تحسّن هذا الرقم.'}
                {results.verdict === 'Critical' && 'هامشك في المنطقة الحرجة. تحتاج مراجعة فورية لتكاليفك وأسعارك. فريقنا يمكنه مساعدتك.'}
              </p>
              <p style={{ fontSize: 11, color: '#AAA' }}>
                {results.verdict === 'Healthy'  && 'Your numbers look healthy. BirdEye merchants improve their margin by an additional 15-20%.'}
                {results.verdict === 'At Risk'  && 'Your margin is in the danger zone. Most healthy businesses operate at 30%+.'}
                {results.verdict === 'Critical' && 'Your margin is critical. You need an immediate review of your costs and pricing.'}
              </p>
            </div>
          )}

          {/* Email capture */}
          <div style={{ background: '#0F0C36', borderRadius: 20, padding: '28px' }}>
            {!emailSubmitted ? (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: '#FFFFFF', marginBottom: 6 }}>احصل على تقريرك الكامل</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>Get your detailed report — we&apos;ll send it to your inbox</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleEmailSubmit() }}
                    placeholder="بريدك الإلكتروني / your@email.com"
                    style={{ flex: 1, height: 44, padding: '0 14px', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', fontSize: 13, outline: 'none' }}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    disabled={submitting || !email}
                    style={{ height: 44, padding: '0 20px', background: '#FFEB95', color: '#0F0C36', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: submitting || !email ? 'not-allowed' : 'pointer', opacity: submitting || !email ? 0.5 : 1, whiteSpace: 'nowrap' }}
                  >
                    {submitting ? '...' : 'أرسل ←'}
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
                <p style={{ color: '#FFFFFF', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>تم الإرسال!</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>فريقنا سيتواصل معك قريباً — Our team will reach out soon</p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div style={{ background: '#FFEB95', borderRadius: 14, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: '#0F0C36', marginBottom: 2 }}>جاهز تبدأ مع بيردآي؟</p>
              <p style={{ fontSize: 11, color: 'rgba(15,12,54,0.6)' }}>Ready to start with BirdEye?</p>
            </div>
            <Link href="/get-started" style={{ background: '#0F0C36', color: '#FFEB95', padding: '10px 20px', borderRadius: 999, fontSize: 13, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              ابدأ مجاناً ←
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
