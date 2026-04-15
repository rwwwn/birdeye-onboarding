'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/home/Navbar'
import { captureLead } from '@/lib/leads'
import { BENCHMARKS, BusinessType } from '@/constants/benchmarks'
import Link from 'next/link'

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void
  }
}

const businessTypes = Object.entries(BENCHMARKS).map(([key, val]) => ({
  key: key as BusinessType,
  label_ar: val.name_ar,
  label_en: val.name_en,
}))

interface Results {
  sellingPrice: number
  grossMarginPct: number
  trueNetMargin: number
  breakEvenUnits: number
  monthlyRevenue: number
  verdict: 'Underpriced' | 'Optimal' | 'Overpriced' | null
  verdictColor: string
}

const copy = {
  ar: {
    tag: 'أداة مجانية',
    headline: 'ما هو السعر الصحيح لمنتجاتك؟',
    sub: 'احسب سعر البيع المثالي بناءً على تكلفتك وهامشك المستهدف.',
    switchLang: 'English',
    inputsHeadline: 'أدخل بيانات المنتج',
    businessTypeLabel: 'نوع النشاط التجاري',
    costPriceLabel: 'سعر التكلفة (ر.س)',
    costPricePlaceholder: '0',
    targetMarginLabel: 'الهامش الإجمالي المستهدف',
    overheadLabel: 'المصاريف الثابتة الشهرية (ر.س)',
    overheadPlaceholder: '0',
    unitsSoldLabel: 'عدد الوحدات المباعة شهرياً',
    unitsSoldPlaceholder: '0',
    resultsHeadline: 'النتائج',
    verdictEmpty: 'أدخل بيانات المنتج لرؤية النتيجة',
    verdictLabel: 'تقييم السعر',
    pricingVerdicts: {
      Underpriced: 'أنت تبيع بسعر منخفض',
      Optimal: 'السعر مناسب',
      Overpriced: 'السعر مرتفع',
    },
    pricingSubtitles: {
      Underpriced: 'You may be underpricing',
      Optimal: 'Optimal pricing',
      Overpriced: 'You may be overpricing',
    },
    stats: ['سعر البيع الموصى به', 'هامش الربح الإجمالي', 'هامش الربح الصافي', 'وحدات نقطة التعادل'],
    benchmarkTitle: 'مقارنة مع المعيار الصناعي',
    benchmarkMin: 'الحد الأدنى',
    benchmarkMax: 'الحد الأقصى',
    yourMargin: 'هامشك',
    insightUnderpriced: 'أنت تبيع بأقل من المعيار الصناعي. رفع السعر قليلاً لن يؤثر على العملاء كثيراً لكنه سيحسّن أرباحك بشكل كبير.',
    insightOptimal: 'تسعيرك ضمن النطاق الصناعي الأمثل. استمر في مراقبة تكاليفك لتحافظ على هذا الهامش.',
    insightOverpriced: 'سعرك أعلى من المعيار. هذا قد يؤثر على حجم المبيعات. تأكد من أن القيمة المقدمة تبرر هذا السعر.',
    emailHeadline: 'احصل على تحليل كامل لتسعيرك',
    emailSub: 'سنرسله إلى بريدك الإلكتروني',
    emailPlaceholder: 'بريدك الإلكتروني',
    emailBtn: 'أرسل ←',
    emailSending: '...',
    emailDone: 'تم الإرسال!',
    emailDoneSub: 'فريقنا سيتواصل معك قريباً',
    ctaHeadline: 'جاهز تبدأ مع بيردآي؟',
    ctaBtn: 'ابدأ مجاناً ←',
    disclaimer: '* المعايير مبنية على تقارير NRA وNRF وToast العالمية.\n  بيردآي يعمل على بناء أول قاعدة بيانات معايير خاصة بالسوق السعودي.',
  },
  en: {
    tag: 'Free Tool',
    headline: 'What is the right price for your products?',
    sub: 'Calculate the ideal selling price based on cost and target margin.',
    switchLang: 'العربية',
    inputsHeadline: 'Enter product details',
    businessTypeLabel: 'Business Type',
    costPriceLabel: 'Cost Price (SAR)',
    costPricePlaceholder: '0',
    targetMarginLabel: 'Target Gross Margin',
    overheadLabel: 'Monthly Fixed Overhead (SAR)',
    overheadPlaceholder: '0',
    unitsSoldLabel: 'Units Sold Per Month',
    unitsSoldPlaceholder: '0',
    resultsHeadline: 'Results',
    verdictEmpty: 'Enter product details to see results',
    verdictLabel: 'Pricing Verdict',
    pricingVerdicts: {
      Underpriced: 'You may be underpricing',
      Optimal: 'Optimal pricing',
      Overpriced: 'You may be overpricing',
    },
    pricingSubtitles: {
      Underpriced: 'أنت تبيع بسعر منخفض',
      Optimal: 'السعر مناسب',
      Overpriced: 'السعر مرتفع',
    },
    stats: ['Recommended Selling Price', 'Gross Margin %', 'Net Margin After Overhead', 'Break-even Units / Month'],
    benchmarkTitle: 'Industry Benchmark Comparison',
    benchmarkMin: 'Min',
    benchmarkMax: 'Max',
    yourMargin: 'Your Margin',
    insightUnderpriced: 'You are pricing below industry standard. A modest price increase won\'t significantly affect customers but will meaningfully improve your margins.',
    insightOptimal: 'Your pricing is within the optimal industry range. Keep monitoring your costs to maintain this margin.',
    insightOverpriced: 'Your price is above the benchmark. This may impact sales volume. Ensure the value you deliver justifies the premium.',
    emailHeadline: 'Get a full pricing analysis',
    emailSub: "We'll send a complete breakdown to your inbox",
    emailPlaceholder: 'your@email.com',
    emailBtn: 'Send ←',
    emailSending: '...',
    emailDone: 'Sent!',
    emailDoneSub: 'Our team will reach out soon',
    ctaHeadline: 'Ready to start with BirdEye?',
    ctaBtn: 'Start free ←',
    disclaimer: '* Benchmarks based on NRA, NRF, and Toast global reports.\n  BirdEye is building the first Saudi-specific SME benchmark database.',
  },
}

function InputWrapper({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>
        {label}
      </label>
      {children}
    </div>
  )
}

function NumberInput({ placeholder, onChange }: { placeholder: string; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #DBE1E9', borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.15s' }}>
      <input
        type="number"
        placeholder={placeholder}
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        style={{ flex: 1, height: 44, padding: '0 14px', border: 'none', outline: 'none', fontSize: 14, color: '#0F0C36', background: 'transparent' }}
        onFocus={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#0F0C36' }}
        onBlur={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#DBE1E9' }}
      />
      <span style={{ padding: '0 14px', fontSize: 13, color: '#8B89C2', borderLeft: '1px solid #DBE1E9', height: 44, display: 'flex', alignItems: 'center' }}>ر.س</span>
    </div>
  )
}

export default function PricingCalculatorPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar')
  const [businessType, setBusinessType] = useState<BusinessType>('restaurant')
  const [costPrice, setCostPrice] = useState(0)
  const [targetMargin, setTargetMargin] = useState(35)
  const [monthlyOverhead, setMonthlyOverhead] = useState(0)
  const [unitsSold, setUnitsSold] = useState(0)
  const [results, setResults] = useState<Results>({
    sellingPrice: 0, grossMarginPct: 0, trueNetMargin: 0,
    breakEvenUnits: 0, monthlyRevenue: 0, verdict: null, verdictColor: '#0F0C36',
  })
  const [hasCalculated, setHasCalculated] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const t = copy[lang]
  const benchmark = BENCHMARKS[businessType]

  useEffect(() => {
    if (costPrice === 0) { setHasCalculated(false); return }
    setHasCalculated(true)

    const sellingPrice = targetMargin >= 100 ? costPrice * 2 : costPrice / (1 - targetMargin / 100)
    const revenueFromItem = sellingPrice * Math.max(unitsSold, 1)
    const overheadPerUnit = unitsSold > 0 ? monthlyOverhead / unitsSold : 0
    const trueNetMargin = ((sellingPrice - costPrice - overheadPerUnit) / sellingPrice) * 100
    const breakEvenUnits = (sellingPrice - costPrice) > 0 ? Math.ceil(monthlyOverhead / (sellingPrice - costPrice)) : 0
    const grossMarginPct = Math.round(((sellingPrice - costPrice) / sellingPrice) * 100)

    let verdict: Results['verdict']
    let verdictColor: string
    if (targetMargin < benchmark.gross_margin_min) {
      verdict = 'Underpriced'; verdictColor = '#ef4444'
    } else if (targetMargin <= benchmark.gross_margin_max) {
      verdict = 'Optimal'; verdictColor = '#22c55e'
    } else {
      verdict = 'Overpriced'; verdictColor = '#f59e0b'
    }

    setResults({ sellingPrice, grossMarginPct, trueNetMargin: Math.round(trueNetMargin * 10) / 10, breakEvenUnits, monthlyRevenue: revenueFromItem, verdict, verdictColor })
  }, [costPrice, targetMargin, monthlyOverhead, unitsSold, businessType, benchmark])

  useEffect(() => {
    if (!hasCalculated || !results.verdict) return
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_result_viewed', { tool_name: 'pricing_calculator', verdict: results.verdict })
    }
  }, [results.verdict]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleEmailSubmit() {
    if (!email || submitting) return
    setSubmitting(true)
    await captureLead({
      source: 'pricing_calculator',
      email,
      business_type: businessType,
      gross_margin: results.grossMarginPct,
      monthly_revenue: results.monthlyRevenue,
      verdict: results.verdict || '',
    })
    setSubmitting(false)
    setEmailSubmitted(true)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_lead_captured', { tool_name: 'pricing_calculator', verdict: results.verdict })
    }
  }

  // Benchmark bar positions (clamped 0–100)
  const barMin = benchmark.gross_margin_min
  const barMax = benchmark.gross_margin_max
  const userPos = Math.min(Math.max(targetMargin, 0), 100)

  const statValues = [
    hasCalculated ? `${results.sellingPrice.toFixed(2)} ر.س` : '—',
    hasCalculated ? `${results.grossMarginPct}%` : '—',
    hasCalculated ? `${results.trueNetMargin}%` : '—',
    hasCalculated ? `${results.breakEvenUnits} وحدة` : '—',
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#DBE1E9', fontFamily: 'var(--font-body)' }} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '100px 48px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: '#8B89C2', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
            {t.tag}
          </p>
          <button
            onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')}
            style={{ fontSize: 11, color: '#8B89C2', background: 'rgba(139,137,194,0.12)', border: 'none', borderRadius: 999, padding: '3px 12px', cursor: 'pointer', fontFamily: 'var(--font-body)' }}
          >
            {t.switchLang}
          </button>
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

          {/* Business type */}
          <InputWrapper label={t.businessTypeLabel}>
            <select
              value={businessType}
              onChange={e => setBusinessType(e.target.value as BusinessType)}
              style={{ width: '100%', height: 44, padding: '0 14px', border: '1.5px solid #DBE1E9', borderRadius: 10, fontSize: 14, color: '#0F0C36', background: '#FFFFFF', outline: 'none', cursor: 'pointer', appearance: 'none' }}
            >
              {businessTypes.map(b => (
                <option key={b.key} value={b.key}>
                  {lang === 'ar' ? b.label_ar : b.label_en}
                </option>
              ))}
            </select>
          </InputWrapper>

          {/* Cost price */}
          <InputWrapper label={t.costPriceLabel}>
            <NumberInput placeholder={t.costPricePlaceholder} onChange={setCostPrice} />
          </InputWrapper>

          {/* Target margin slider */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>
              {t.targetMarginLabel}: <span style={{ color: '#3C3489' }}>{targetMargin}%</span>
            </label>
            <input
              type="range"
              min={10}
              max={80}
              value={targetMargin}
              onChange={e => setTargetMargin(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#0F0C36', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#8B89C2', marginTop: 4 }}>
              <span>10%</span>
              <span>80%</span>
            </div>
          </div>

          {/* Overhead */}
          <InputWrapper label={t.overheadLabel}>
            <NumberInput placeholder={t.overheadPlaceholder} onChange={setMonthlyOverhead} />
          </InputWrapper>

          {/* Units sold */}
          <div style={{ marginBottom: 0 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>
              {t.unitsSoldLabel}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #DBE1E9', borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.15s' }}>
              <input
                type="number"
                placeholder={t.unitsSoldPlaceholder}
                onChange={e => setUnitsSold(parseFloat(e.target.value) || 0)}
                style={{ flex: 1, height: 44, padding: '0 14px', border: 'none', outline: 'none', fontSize: 14, color: '#0F0C36', background: 'transparent' }}
                onFocus={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#0F0C36' }}
                onBlur={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#DBE1E9' }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT — Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Verdict */}
          <div style={{ background: hasCalculated ? results.verdictColor : '#0F0C36', borderRadius: 20, padding: '32px', transition: 'background 0.3s' }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              {hasCalculated ? t.verdictLabel : t.verdictEmpty}
            </p>
            {hasCalculated && results.verdict ? (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: '#FFFFFF', marginBottom: 4, lineHeight: 1.2 }}>
                  {lang === 'ar' ? t.pricingVerdicts[results.verdict] : t.pricingVerdicts[results.verdict]}
                </h2>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                  {lang === 'ar' ? t.pricingSubtitles[results.verdict] : t.pricingSubtitles[results.verdict]}
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
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#0F0C36', fontWeight: 700 }}>{statValues[i]}</p>
              </div>
            ))}
          </div>

          {/* Benchmark comparison bar */}
          {hasCalculated && (
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '24px' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 16 }}>{t.benchmarkTitle}</p>
              <div style={{ position: 'relative', height: 8, background: '#F3F4F6', borderRadius: 999, margin: '8px 0 4px' }}>
                {/* Industry range fill */}
                <div style={{
                  position: 'absolute',
                  left: `${barMin}%`,
                  width: `${barMax - barMin}%`,
                  height: '100%',
                  background: '#22c55e',
                  borderRadius: 999,
                  opacity: 0.35,
                }} />
                {/* User marker */}
                <div style={{
                  position: 'absolute',
                  left: `${userPos}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 14, height: 14,
                  background: results.verdictColor,
                  border: '2px solid white',
                  borderRadius: '50%',
                  boxShadow: '0 0 0 2px rgba(0,0,0,0.08)',
                  transition: 'left 0.2s',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#8B89C2', marginTop: 8 }}>
                <span>{t.benchmarkMin}: {barMin}%</span>
                <span style={{ color: results.verdictColor, fontWeight: 600 }}>{t.yourMargin}: {targetMargin}%</span>
                <span>{t.benchmarkMax}: {barMax}%</span>
              </div>
              <p style={{ fontSize: 10, color: '#BABABA', marginTop: 12 }}>
                {benchmark.source}
              </p>
            </div>
          )}

          {/* Insight */}
          {hasCalculated && results.verdict && (
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px 24px', borderRight: lang === 'ar' ? `4px solid ${results.verdictColor}` : undefined, borderLeft: lang === 'en' ? `4px solid ${results.verdictColor}` : undefined }}>
              <p style={{ fontSize: 13, color: '#0F0C36', lineHeight: 1.6 }}>
                {results.verdict === 'Underpriced' ? t.insightUnderpriced : results.verdict === 'Optimal' ? t.insightOptimal : t.insightOverpriced}
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

      {/* Benchmark disclaimer */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px 60px' }}>
        <p style={{ fontSize: 11, color: '#AAAAAA', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{t.disclaimer}</p>
      </div>
    </div>
  )
}
