'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { captureLead, LeadSource } from '@/lib/leads'

interface Props {
  headline: { ar: string; en: string }
  cta: { ar: string; en: string }
  source: LeadSource
  businessTypeOptions: string[]
}

export default function SectorLeadForm({ headline, cta, source, businessTypeOptions }: Props) {
  const { tr, lang } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', phone: '', businessType: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const labels = {
    name:     { ar: 'الاسم',        en: 'Name' },
    email:    { ar: 'الإيميل',      en: 'Email' },
    phone:    { ar: 'رقم الجوال',   en: 'Phone' },
    bizType:  { ar: 'نوع النشاط',   en: 'Business Type' },
    select:   { ar: 'اختر نوع النشاط', en: 'Select business type' },
    success:  { ar: 'شكرًا! سيتواصل معك فريق المبيعات قريبًا.', en: 'Thank you! Our sales team will reach out shortly.' },
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const result = await captureLead({
      source,
      first_name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      business_type: form.businessType,
    })
    if (!result.success) {
      console.error('Lead capture failed silently:', result.error)
    }
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section id="register" className="bg-navy py-20 md:py-28">
      <div className="max-w-2xl mx-auto px-12">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white text-center leading-tight mb-10">
          {tr(headline)}
        </h2>

        {submitted ? (
          <div className="bg-white/10 rounded-2xl p-10 text-center">
            <div className="w-14 h-14 rounded-full bg-yellow flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold text-lg">{tr(labels.success)}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">{tr(labels.name)}</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder={lang === 'ar' ? 'محمد العمري' : 'Mohammed Al-Omari'}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">{tr(labels.email)}</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="name@company.sa"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">{tr(labels.phone)}</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-yellow"
                placeholder="05xxxxxxxx"
              />
            </div>

            {/* Business type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">{tr(labels.bizType)}</label>
              <select
                required
                value={form.businessType}
                onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                className="h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow appearance-none"
              >
                <option value="" disabled className="text-navy">{tr(labels.select)}</option>
                {businessTypeOptions.map((opt) => (
                  <option key={opt} value={opt} className="text-navy">{opt}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-14 rounded-xl bg-yellow text-navy font-bold text-base hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2 focus:ring-offset-navy disabled:opacity-60"
            >
              {loading ? '...' : tr(cta)}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
