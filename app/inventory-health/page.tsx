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

// Fallback turnover ranges for types without specific inventory benchmarks
const TURNOVER_FALLBACK = { min: 4, max: 8 }

interface Results {
  inventoryTurnover: number
  daysInInventory: number
  deadStockValue: number
  healthScore: number
  verdict: 'excellent' | 'good' | 'attention' | 'critical' | null
  verdictColor: string
  benchmarkMin: number
  benchmarkMax: number
}

const copy = {
  ar: {
    tag: 'أداة مجانية',
    headline: 'ما مدى صحة مخزونك؟',
    sub: 'اكتشف كم من رأس مالك محجوز في مخزون راكد.',
    switchLang: 'English',
    inputsHeadline: 'أدخل بيانات المخزون',
    businessTypeLabel: 'نوع النشاط التجاري',
    inventoryValueLabel: 'إجمالي قيمة المخزون (ر.س)',
    monthlyCOGSLabel: 'تكلفة البضاعة المباعة شهرياً (ر.س)',
    numSKUsLabel: 'عدد المنتجات (SKU)',
    deadStockLabel: 'نسبة المخزون غير المتحرك خلال 90 يوم',
    healthScoreTitle: 'مؤشر صحة المخزون',
    verdictEmpty: 'أدخل بيانات المخزون لرؤية النتيجة',
    verdicts: {
      excellent: 'مخزونك بصحة ممتازة',
      good: 'مخزونك مقبول لكن يمكن تحسينه',
      attention: 'مخزونك يحتاج مراجعة',
      critical: 'لديك مشكلة في المخزون',
    },
    verdictsSub: {
      excellent: 'Excellent inventory health',
      good: 'Good but improvable',
      attention: 'Your inventory needs attention',
      critical: 'Inventory problem detected',
    },
    stats: ['معدل دوران المخزون', 'أيام الإتاحة', 'قيمة المخزون الراكد', 'مؤشر الصحة'],
    statsUnits: [' مرة/سنة', ' يوم', ' ر.س', '/100'],
    benchmarkTitle: 'مقارنة مع المعيار الصناعي',
    benchmarkMin: 'الحد الأدنى',
    benchmarkMax: 'الحد الأقصى',
    yourTurnover: 'معدلك',
    deadStockCallout: 'لديك مخزون راكد بقيمة',
    deadStockSuffix: 'ر.س',
    insightExcellent: 'ممتاز. استمر في مراقبة مخزونك لتحافظ على هذا المستوى.',
    insightGood: 'يمكنك تحسين معدل الدوران بتحليل المنتجات الأبطأ حركة وتخفيض مخزونها.',
    insightAttention: 'المخزون الراكد يعني رأس مال مجمّد. مع بيردآي تتتبع حركة كل منتج في الوقت الفعلي.',
    insightCritical: 'المخزون الراكد يعني رأس مال مجمّد. مع بيردآي تتتبع حركة كل منتج في الوقت الفعلي.',
    emailHeadline: 'احصل على تحليل كامل لمخزونك',
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
    headline: 'How healthy is your inventory?',
    sub: 'Find out how much capital is trapped in dead stock.',
    switchLang: 'العربية',
    inputsHeadline: 'Enter inventory data',
    businessTypeLabel: 'Business Type',
    inventoryValueLabel: 'Total Inventory Value (SAR)',
    monthlyCOGSLabel: 'Monthly Cost of Goods Sold (SAR)',
    numSKUsLabel: 'Number of SKUs (products)',
    deadStockLabel: 'Stock not moved in 90 days (%)',
    healthScoreTitle: 'Inventory Health Score',
    verdictEmpty: 'Enter inventory data to see results',
    verdicts: {
      excellent: 'Excellent inventory health',
      good: 'Good but improvable',
      attention: 'Your inventory needs attention',
      critical: 'Inventory problem detected',
    },
    verdictsSub: {
      excellent: 'مخزونك بصحة ممتازة',
      good: 'مخزونك مقبول لكن يمكن تحسينه',
      attention: 'مخزونك يحتاج مراجعة',
      critical: 'لديك مشكلة في المخزون',
    },
    stats: ['Inventory Turnover', 'Days in Inventory', 'Dead Stock Value', 'Health Score'],
    statsUnits: ['x / year', ' days', ' SAR', '/100'],
    benchmarkTitle: 'Industry Benchmark Comparison',
    benchmarkMin: 'Min',
    benchmarkMax: 'Max',
    yourTurnover: 'Your Rate',
    deadStockCallout: 'You have',
    deadStockSuffix: 'SAR trapped in unsold stock',
    insightExcellent: 'Excellent. Keep monitoring your inventory to maintain this level.',
    insightGood: 'You can improve your turnover by analyzing slow-moving items and reducing their stock.',
    insightAttention: 'Dead stock means frozen capital. With BirdEye you can track every product\'s movement in real time.',
    insightCritical: 'Dead stock means frozen capital. With BirdEye you can track every product\'s movement in real time.',
    emailHeadline: 'Get a full inventory analysis',
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

const scoreColors: Record<string, string> = {
  excellent: '#22c55e',
  good: '#86efac',
  attention: '#f59e0b',
  critical: '#ef4444',
}

export default function InventoryHealthPage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar')
  const [businessType, setBusinessType] = useState<BusinessType>('retail_clothing')
  const [totalInventoryValue, setTotalInventoryValue] = useState(0)
  const [monthlyCOGS, setMonthlyCOGS] = useState(0)
  const [deadStockPercent, setDeadStockPercent] = useState(20)
  const [results, setResults] = useState<Results>({
    inventoryTurnover: 0, daysInInventory: 0, deadStockValue: 0,
    healthScore: 0, verdict: null, verdictColor: '#0F0C36',
    benchmarkMin: 4, benchmarkMax: 8,
  })
  const [hasCalculated, setHasCalculated] = useState(false)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const t = copy[lang]

  useEffect(() => {
    if (totalInventoryValue === 0 || monthlyCOGS === 0) { setHasCalculated(false); return }
    setHasCalculated(true)

    const benchmark = BENCHMARKS[businessType]
    const turnoverMin = (benchmark as { inventory_turnover_min?: number }).inventory_turnover_min ?? TURNOVER_FALLBACK.min
    const turnoverMax = (benchmark as { inventory_turnover_max?: number }).inventory_turnover_max ?? TURNOVER_FALLBACK.max

    const annualCOGS = monthlyCOGS * 12
    const inventoryTurnover = Math.round((annualCOGS / totalInventoryValue) * 10) / 10
    const daysInInventory = Math.round(365 / inventoryTurnover)
    const deadStockValue = Math.round(totalInventoryValue * (deadStockPercent / 100))
    const turnoverScore = Math.min(100, Math.round((inventoryTurnover / turnoverMax) * 100))

    let verdict: Results['verdict']
    if (turnoverScore >= 80) verdict = 'excellent'
    else if (turnoverScore >= 60) verdict = 'good'
    else if (turnoverScore >= 40) verdict = 'attention'
    else verdict = 'critical'

    setResults({
      inventoryTurnover,
      daysInInventory,
      deadStockValue,
      healthScore: turnoverScore,
      verdict,
      verdictColor: scoreColors[verdict],
      benchmarkMin: turnoverMin,
      benchmarkMax: turnoverMax,
    })
  }, [totalInventoryValue, monthlyCOGS, deadStockPercent, businessType])

  useEffect(() => {
    if (!hasCalculated || !results.verdict) return
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_result_viewed', { tool_name: 'inventory_health', verdict: results.verdict })
    }
  }, [results.verdict]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleEmailSubmit() {
    if (!email || submitting) return
    setSubmitting(true)
    await captureLead({
      source: 'inventory_health',
      email,
      business_type: businessType,
      verdict: results.verdict || '',
      gross_margin: results.healthScore,
      monthly_revenue: results.deadStockValue,
    })
    setSubmitting(false)
    setEmailSubmitted(true)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_lead_captured', { tool_name: 'inventory_health', verdict: results.verdict })
    }
  }

  function NumberInput({ onChange }: { onChange: (v: number) => void }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #DBE1E9', borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.15s' }}>
        <input
          type="number"
          placeholder="0"
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          style={{ flex: 1, height: 44, padding: '0 14px', border: 'none', outline: 'none', fontSize: 14, color: '#0F0C36', background: 'transparent' }}
          onFocus={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#0F0C36' }}
          onBlur={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#DBE1E9' }}
        />
        <span style={{ padding: '0 14px', fontSize: 13, color: '#8B89C2', borderLeft: '1px solid #DBE1E9', height: 44, display: 'flex', alignItems: 'center' }}>ر.س</span>
      </div>
    )
  }

  const statValues = [
    hasCalculated ? `${results.inventoryTurnover}${t.statsUnits[0]}` : '—',
    hasCalculated ? `${results.daysInInventory}${t.statsUnits[1]}` : '—',
    hasCalculated ? `${results.deadStockValue.toLocaleString()}${t.statsUnits[2]}` : '—',
    hasCalculated ? `${results.healthScore}${t.statsUnits[3]}` : '—',
  ]

  // Bar position for benchmark comparison (normalised 0-20 range)
  const barScale = Math.max(results.benchmarkMax * 1.5, results.inventoryTurnover * 1.2, 1)
  const barMinPct = (results.benchmarkMin / barScale) * 100
  const barMaxPct = (results.benchmarkMax / barScale) * 100
  const userPct = hasCalculated ? Math.min((results.inventoryTurnover / barScale) * 100, 100) : 0

  const insightMap = {
    excellent: t.insightExcellent,
    good: t.insightGood,
    attention: t.insightAttention,
    critical: t.insightCritical,
  }

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
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>{t.businessTypeLabel}</label>
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
          </div>

          {/* Total inventory value */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>{t.inventoryValueLabel}</label>
            <NumberInput onChange={setTotalInventoryValue} />
          </div>

          {/* Monthly COGS */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>{t.monthlyCOGSLabel}</label>
            <NumberInput onChange={setMonthlyCOGS} />
          </div>

          {/* Num SKUs */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>{t.numSKUsLabel}</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #DBE1E9', borderRadius: 10, overflow: 'hidden', transition: 'border-color 0.15s' }}>
              <input
                type="number"
                placeholder="0"
                onChange={() => {}}
                style={{ flex: 1, height: 44, padding: '0 14px', border: 'none', outline: 'none', fontSize: 14, color: '#0F0C36', background: 'transparent' }}
                onFocus={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#0F0C36' }}
                onBlur={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#DBE1E9' }}
              />
            </div>
          </div>

          {/* Dead stock slider */}
          <div style={{ marginBottom: 0 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>
              {t.deadStockLabel}: <span style={{ color: '#ef4444' }}>{deadStockPercent}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={deadStockPercent}
              onChange={e => setDeadStockPercent(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#ef4444', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#8B89C2', marginTop: 4 }}>
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Health score gauge + verdict */}
          <div style={{ background: hasCalculated && results.verdict ? results.verdictColor : '#0F0C36', borderRadius: 20, padding: '32px', transition: 'background 0.3s', display: 'flex', alignItems: 'center', gap: 28 }}>
            {/* Circular gauge */}
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: 100, height: 100, borderRadius: '50%',
                background: `conic-gradient(rgba(255,255,255,0.9) ${(hasCalculated ? results.healthScore : 0) * 3.6}deg, rgba(255,255,255,0.15) 0deg)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 76, height: 76, borderRadius: '50%', background: hasCalculated && results.verdict ? results.verdictColor : '#0F0C36', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: '#FFFFFF', lineHeight: 1 }}>
                    {hasCalculated ? results.healthScore : '—'}
                  </span>
                </div>
              </div>
            </div>
            {/* Text */}
            <div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
                {hasCalculated ? t.healthScoreTitle : t.verdictEmpty}
              </p>
              {hasCalculated && results.verdict ? (
                <>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: '#FFFFFF', marginBottom: 4, lineHeight: 1.2 }}>
                    {t.verdicts[results.verdict]}
                  </h2>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
                    {t.verdictsSub[results.verdict]}
                  </p>
                </>
              ) : (
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'rgba(255,255,255,0.3)' }}>—</p>
              )}
            </div>
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

          {/* Dead stock callout */}
          {hasCalculated && results.deadStockValue > 0 && (
            <div style={{ background: '#0F0C36', borderRadius: 14, padding: '20px 24px' }}>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>
                {lang === 'ar' ? 'أنت تخسر سنوياً بسبب المخزون الراكد' : 'Estimated annual loss from dead stock'}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: '#FFEB95' }}>
                {(results.deadStockValue * 12).toLocaleString()} ر.س
              </p>
            </div>
          )}

          {/* Benchmark comparison bar */}
          {hasCalculated && (
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '24px' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 16 }}>{t.benchmarkTitle}</p>
              <div style={{ position: 'relative', height: 8, background: '#F3F4F6', borderRadius: 999, margin: '8px 0 4px' }}>
                {/* Industry range */}
                <div style={{
                  position: 'absolute',
                  left: `${barMinPct}%`,
                  width: `${barMaxPct - barMinPct}%`,
                  height: '100%',
                  background: '#22c55e',
                  borderRadius: 999,
                  opacity: 0.35,
                }} />
                {/* User marker */}
                <div style={{
                  position: 'absolute',
                  left: `${userPct}%`,
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
                <span>{t.benchmarkMin}: {results.benchmarkMin}x</span>
                <span style={{ color: results.verdictColor, fontWeight: 600 }}>{t.yourTurnover}: {results.inventoryTurnover}x</span>
                <span>{t.benchmarkMax}: {results.benchmarkMax}x</span>
              </div>
              <p style={{ fontSize: 10, color: '#BABABA', marginTop: 12 }}>
                {BENCHMARKS[businessType].source}
              </p>
            </div>
          )}

          {/* Insight */}
          {hasCalculated && results.verdict && (
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px 24px', borderRight: lang === 'ar' ? `4px solid ${results.verdictColor}` : undefined, borderLeft: lang === 'en' ? `4px solid ${results.verdictColor}` : undefined }}>
              <p style={{ fontSize: 13, color: '#0F0C36', lineHeight: 1.6 }}>
                {insightMap[results.verdict]}
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
