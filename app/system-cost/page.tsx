'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/home/Navbar'
import { captureLead } from '@/lib/leads'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void
  }
}

const BIRDEYE_ANNUAL = 3570

interface SystemItem {
  key: string
  label_ar: string
  label_en: string
  emoji: string
  checked: boolean
  cost: number
}

const defaultSystems: SystemItem[] = [
  { key: 'pos', label_ar: 'نظام الكاشير', label_en: 'POS System', emoji: '🖥️', checked: false, cost: 0 },
  { key: 'store', label_ar: 'متجر إلكتروني', label_en: 'Online Store', emoji: '🛒', checked: false, cost: 0 },
  { key: 'inventory', label_ar: 'نظام المخزون', label_en: 'Inventory System', emoji: '📦', checked: false, cost: 0 },
  { key: 'loyalty', label_ar: 'برنامج الولاء', label_en: 'Loyalty Program', emoji: '⭐', checked: false, cost: 0 },
  { key: 'accounting', label_ar: 'نظام المحاسبة', label_en: 'Accounting', emoji: '📊', checked: false, cost: 0 },
  { key: 'delivery', label_ar: 'منصة التوصيل', label_en: 'Delivery Platform', emoji: '🛵', checked: false, cost: 0 },
  { key: 'marketing', label_ar: 'أداة التسويق', label_en: 'Marketing Tool', emoji: '📣', checked: false, cost: 0 },
]

const copy = {
  ar: {
    tag: 'أداة مجانية',
    headline: 'كم تخسر سنوياً بسبب التشتت؟',
    sub: 'اكتشف التكلفة الحقيقية لاستخدام أنظمة متعددة غير متكاملة.',
    switchLang: 'English',
    systemsHeadline: 'الأنظمة التي تستخدمها',
    systemsSubtitle: 'اختر الأنظمة وأدخل تكلفتها الشهرية',
    hiddenCostsHeadline: 'التكاليف الخفية',
    hoursLabel: 'ساعات أسبوعية لنقل البيانات بين الأنظمة',
    hourlyRateLabel: 'تكلفة ساعة الموظف (ر.س)',
    resultsHeadline: 'النتيجة',
    emptyState: 'اختر الأنظمة التي تستخدمها لرؤية التحليل',
    totalMonthly: 'إجمالي التكلفة الشهرية',
    totalAnnual: 'إجمالي التكلفة السنوية',
    hiddenLaborAnnual: 'تكلفة العمالة الخفية سنوياً',
    grandTotal: 'إجمالي الهدر السنوي',
    birdeyeCost: 'مع بيردآي ستدفع سنوياً',
    savingsLabel: 'توفيرك السنوي',
    roiMonths: 'عائد الاستثمار خلال',
    roiSuffix: 'شهر',
    systemsCount: 'نظام مستخدم',
    barSubscriptions: 'اشتراكات الأنظمة',
    barLabor: 'تكلفة العمالة الخفية',
    barBirdeye: 'بيردآي',
    insightPrefix: 'أنت تدفع',
    insightSuffix: 'أضعاف ما تحتاج. كل ريال تدفعه للأنظمة المتعددة هو ريال يُسرق من أرباحك.',
    ctaPrefix: 'وفّر',
    ctaSuffix: 'ر.س — ابدأ مع بيردآي',
    emailHeadline: 'احصل على تقرير مقارنة كامل',
    emailSub: 'سنرسل تحليلاً مفصلاً إلى بريدك الإلكتروني',
    emailPlaceholder: 'بريدك الإلكتروني',
    emailBtn: 'أرسل ←',
    emailSending: '...',
    emailDone: 'تم الإرسال!',
    emailDoneSub: 'فريقنا سيتواصل معك قريباً',
    disclaimer: '* المعايير مبنية على تقارير NRA وNRF وToast العالمية.\n  بيردآي يعمل على بناء أول قاعدة بيانات معايير خاصة بالسوق السعودي.',
  },
  en: {
    tag: 'Free Tool',
    headline: 'How much are you losing to fragmented systems?',
    sub: 'Discover the true cost of running multiple disconnected tools.',
    switchLang: 'العربية',
    systemsHeadline: 'Systems You Use',
    systemsSubtitle: 'Select your tools and enter the monthly cost for each',
    hiddenCostsHeadline: 'Hidden Costs',
    hoursLabel: 'Hours per week moving data between systems',
    hourlyRateLabel: 'Employee hourly cost (SAR)',
    resultsHeadline: 'Results',
    emptyState: 'Select the systems you use to see your analysis',
    totalMonthly: 'Total Monthly Cost',
    totalAnnual: 'Total Annual Subscriptions',
    hiddenLaborAnnual: 'Hidden Annual Labor Cost',
    grandTotal: 'Total Annual Waste',
    birdeyeCost: 'With BirdEye you pay annually',
    savingsLabel: 'Your Annual Savings',
    roiMonths: 'ROI in',
    roiSuffix: 'months',
    systemsCount: 'systems in use',
    barSubscriptions: 'Subscriptions',
    barLabor: 'Hidden Labor',
    barBirdeye: 'BirdEye',
    insightPrefix: 'You\'re paying',
    insightSuffix: 'times more than you need to. Every riyal spent on fragmented systems is a riyal stolen from your profits.',
    ctaPrefix: 'Save',
    ctaSuffix: 'SAR — Start with BirdEye',
    emailHeadline: 'Get a full comparison report',
    emailSub: "We'll send a detailed analysis to your inbox",
    emailPlaceholder: 'your@email.com',
    emailBtn: 'Send ←',
    emailSending: '...',
    emailDone: 'Sent!',
    emailDoneSub: 'Our team will reach out soon',
    disclaimer: '* Benchmarks based on NRA, NRF, and Toast global reports.\n  BirdEye is building the first Saudi-specific SME benchmark database.',
  },
}

export default function SystemCostPage() {
  const { lang } = useLanguage()
  const [systems, setSystems] = useState<SystemItem[]>(defaultSystems)
  const [hoursPerWeek, setHoursPerWeek] = useState(5)
  const [hourlyRate, setHourlyRate] = useState(0)
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const t = copy[lang]

  const checkedSystems = systems.filter(s => s.checked)
  const monthlySubscriptions = checkedSystems.reduce((sum, s) => sum + s.cost, 0)
  const annualSubscriptions = monthlySubscriptions * 12
  const monthlyHoursWasted = hoursPerWeek * 4.33
  const monthlyLaborWaste = monthlyHoursWasted * hourlyRate
  const annualLaborWaste = Math.round(monthlyLaborWaste * 12)
  const totalAnnualWaste = annualSubscriptions + annualLaborWaste
  const annualSaving = totalAnnualWaste - BIRDEYE_ANNUAL
  const roiMonths = annualSaving > 0 && BIRDEYE_ANNUAL > 0
    ? Math.ceil((BIRDEYE_ANNUAL / 12) / ((annualSaving / 12)))
    : 0
  const hasCalculated = checkedSystems.length > 0
  const multiplier = BIRDEYE_ANNUAL > 0 ? Math.round((totalAnnualWaste / BIRDEYE_ANNUAL) * 10) / 10 : 0

  const barTotal = totalAnnualWaste + BIRDEYE_ANNUAL
  const subPct = barTotal > 0 ? (annualSubscriptions / barTotal) * 100 : 0
  const laborPct = barTotal > 0 ? (annualLaborWaste / barTotal) * 100 : 0
  const birdeyePct = barTotal > 0 ? (BIRDEYE_ANNUAL / barTotal) * 100 : 0

  useEffect(() => {
    if (!hasCalculated) return
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_result_viewed', {
        tool_name: 'system_cost',
        verdict: checkedSystems.length.toString(),
      })
    }
  }, [hasCalculated]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleEmailSubmit() {
    if (!email || submitting) return
    setSubmitting(true)
    await captureLead({
      source: 'system_cost',
      email,
      monthly_revenue: totalAnnualWaste,
      net_profit: annualSaving,
      verdict: checkedSystems.length.toString(),
    })
    setSubmitting(false)
    setEmailSubmitted(true)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'tool_lead_captured', {
        tool_name: 'system_cost',
        verdict: checkedSystems.length.toString(),
      })
    }
  }

  function toggleSystem(key: string) {
    setSystems(prev => prev.map(s => s.key === key ? { ...s, checked: !s.checked } : s))
  }

  function updateCost(key: string, cost: number) {
    setSystems(prev => prev.map(s => s.key === key ? { ...s, cost } : s))
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
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 56px)', color: '#0F0C36', marginBottom: 12, letterSpacing: '-0.02em' }}>
          {t.headline}
        </h1>
        <p style={{ fontSize: 16, color: '#8B89C2', maxWidth: 520, margin: '0 auto', lineHeight: 1.6 }}>
          {t.sub}
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

        {/* LEFT — Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Systems checklist */}
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#0F0C36', marginBottom: 6 }}>{t.systemsHeadline}</h2>
            <p style={{ fontSize: 13, color: '#8B89C2', marginBottom: 28 }}>{t.systemsSubtitle}</p>

            {systems.map(system => (
              <div
                key={system.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
                  padding: '12px 16px', borderRadius: 12,
                  border: `1.5px solid ${system.checked ? '#0F0C36' : '#DBE1E9'}`,
                  background: system.checked ? 'rgba(15,12,54,0.03)' : '#FFFFFF',
                  transition: 'border-color 0.15s, background 0.15s',
                  cursor: 'pointer',
                }}
                onClick={() => toggleSystem(system.key)}
              >
                {/* Checkbox */}
                <div style={{
                  width: 18, height: 18, borderRadius: 5, border: `2px solid ${system.checked ? '#0F0C36' : '#DBE1E9'}`,
                  background: system.checked ? '#0F0C36' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'all 0.15s',
                }}>
                  {system.checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                {/* Emoji + label */}
                <span style={{ fontSize: 16 }}>{system.emoji}</span>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#0F0C36' }}>
                  {lang === 'ar' ? system.label_ar : system.label_en}
                </span>
                {/* Cost input */}
                {system.checked && (
                  <div
                    style={{ display: 'flex', alignItems: 'center', border: '1px solid #DBE1E9', borderRadius: 8, overflow: 'hidden' }}
                    onClick={e => e.stopPropagation()}
                  >
                    <input
                      type="number"
                      placeholder="0"
                      value={system.cost || ''}
                      onChange={e => updateCost(system.key, parseFloat(e.target.value) || 0)}
                      style={{ width: 80, height: 36, padding: '0 10px', border: 'none', outline: 'none', fontSize: 13, color: '#0F0C36', background: 'transparent' }}
                    />
                    <span style={{ padding: '0 10px', fontSize: 12, color: '#8B89C2', borderLeft: '1px solid #DBE1E9', height: 36, display: 'flex', alignItems: 'center' }}>ر.س</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Hidden costs */}
          <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#0F0C36', marginBottom: 24 }}>{t.hiddenCostsHeadline}</h2>

            {/* Hours per week */}
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>
                {t.hoursLabel}: <span style={{ color: '#8B89C2' }}>{hoursPerWeek} {lang === 'ar' ? 'ساعة' : 'hrs'}</span>
              </label>
              <input
                type="range"
                min={0}
                max={20}
                value={hoursPerWeek}
                onChange={e => setHoursPerWeek(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#0F0C36', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#8B89C2', marginTop: 4 }}>
                <span>0</span>
                <span>20 {lang === 'ar' ? 'ساعة/أسبوع' : 'hrs/week'}</span>
              </div>
            </div>

            {/* Hourly rate */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 8 }}>
                {t.hourlyRateLabel}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #DBE1E9', borderRadius: 10, overflow: 'hidden' }}>
                <input
                  type="number"
                  placeholder="0"
                  onChange={e => setHourlyRate(parseFloat(e.target.value) || 0)}
                  style={{ flex: 1, height: 44, padding: '0 14px', border: 'none', outline: 'none', fontSize: 14, color: '#0F0C36', background: 'transparent' }}
                  onFocus={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#0F0C36' }}
                  onBlur={e => { (e.target.parentElement as HTMLDivElement).style.borderColor = '#DBE1E9' }}
                />
                <span style={{ padding: '0 14px', fontSize: 13, color: '#8B89C2', borderLeft: '1px solid #DBE1E9', height: 44, display: 'flex', alignItems: 'center' }}>ر.س</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Grand total callout */}
          <div style={{ background: hasCalculated ? '#0F0C36' : '#0F0C36', borderRadius: 20, padding: '32px' }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>
              {hasCalculated ? t.grandTotal : t.emptyState}
            </p>
            {hasCalculated ? (
              <>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 48, color: '#FFEB95', marginBottom: 4 }}>
                  {totalAnnualWaste.toLocaleString()}
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                  ر.س / {lang === 'ar' ? 'سنة' : 'year'} — {checkedSystems.length} {t.systemsCount}
                </p>
              </>
            ) : (
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'rgba(255,255,255,0.2)' }}>—</p>
            )}
          </div>

          {/* Stat cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px' }}>
              <p style={{ fontSize: 11, color: '#8B89C2', marginBottom: 10 }}>{t.totalMonthly}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#0F0C36', fontWeight: 700 }}>
                {hasCalculated ? `${monthlySubscriptions.toLocaleString()} ر.س` : '—'}
              </p>
            </div>
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px' }}>
              <p style={{ fontSize: 11, color: '#8B89C2', marginBottom: 10 }}>{t.totalAnnual}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#0F0C36', fontWeight: 700 }}>
                {hasCalculated ? `${annualSubscriptions.toLocaleString()} ر.س` : '—'}
              </p>
            </div>
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px' }}>
              <p style={{ fontSize: 11, color: '#8B89C2', marginBottom: 10 }}>{t.hiddenLaborAnnual}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#ef4444', fontWeight: 700 }}>
                {hasCalculated ? `${annualLaborWaste.toLocaleString()} ر.س` : '—'}
              </p>
            </div>
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px' }}>
              <p style={{ fontSize: 11, color: '#8B89C2', marginBottom: 10 }}>{t.birdeyeCost}</p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: '#22c55e', fontWeight: 700 }}>
                {BIRDEYE_ANNUAL.toLocaleString()} ر.س
              </p>
            </div>
          </div>

          {/* Stacked cost bar */}
          {hasCalculated && (
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '24px' }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#0F0C36', marginBottom: 16 }}>
                {lang === 'ar' ? 'مقارنة التكاليف' : 'Cost Comparison'}
              </p>
              <div style={{ display: 'flex', height: 28, borderRadius: 8, overflow: 'hidden', gap: 2 }}>
                <div style={{ width: `${subPct}%`, background: '#0F0C36', transition: 'width 0.3s', minWidth: subPct > 0 ? 4 : 0, borderRadius: '6px 0 0 6px' }} />
                <div style={{ width: `${laborPct}%`, background: '#8B89C2', transition: 'width 0.3s', minWidth: laborPct > 0 ? 4 : 0 }} />
                <div style={{ width: `${birdeyePct}%`, background: '#FFEB95', transition: 'width 0.3s', minWidth: 4, borderRadius: '0 6px 6px 0' }} />
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 12, flexWrap: 'wrap' }}>
                {[
                  { color: '#0F0C36', label: t.barSubscriptions },
                  { color: '#8B89C2', label: t.barLabor },
                  { color: '#FFEB95', label: t.barBirdeye, border: '1px solid #DBE1E9' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 10, height: 10, borderRadius: 3, background: item.color, border: item.border, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: '#8B89C2' }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Savings callout */}
          {hasCalculated && annualSaving > 0 && (
            <div style={{ background: '#FFFFFF', borderRadius: 14, padding: '20px 24px', borderRight: lang === 'ar' ? '4px solid #22c55e' : undefined, borderLeft: lang === 'en' ? '4px solid #22c55e' : undefined }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#0F0C36' }}>{t.savingsLabel}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: '#22c55e' }}>{annualSaving.toLocaleString()} ر.س</p>
              </div>
              {roiMonths > 0 && (
                <p style={{ fontSize: 12, color: '#8B89C2' }}>{t.roiMonths} {roiMonths} {t.roiSuffix}</p>
              )}
            </div>
          )}

          {/* Insight */}
          {hasCalculated && multiplier > 1 && (
            <div style={{ background: '#FFF8E1', borderRadius: 14, padding: '20px 24px', border: '1.5px solid #FFEB95' }}>
              <p style={{ fontSize: 13, color: '#0F0C36', lineHeight: 1.7 }}>
                {t.insightPrefix} <strong>{multiplier}x</strong> {t.insightSuffix}
              </p>
            </div>
          )}

          {/* CTA */}
          {hasCalculated && annualSaving > 0 && (
            <Link
              href="/get-started"
              style={{
                display: 'block',
                background: '#FFEB95',
                borderRadius: 14,
                padding: '20px 24px',
                textAlign: 'center',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                color: '#0F0C36',
                fontWeight: 700,
              }}
            >
              {t.ctaPrefix} {annualSaving.toLocaleString()} ر.س — {t.ctaSuffix}
            </Link>
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
        </div>
      </div>

      {/* Benchmark disclaimer */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px 60px' }}>
        <p style={{ fontSize: 11, color: '#AAAAAA', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{t.disclaimer}</p>
      </div>
    </div>
  )
}
