'use client'

import { useState } from 'react'
import { captureLead } from '@/lib/leads'
import { useLanguage } from '@/contexts/LanguageContext'

interface ContactFormProps {
  onClose: () => void
}

const businessTypes = {
  ar: ['تجارة التجزئة', 'مطاعم ومقاهي', 'خدمات', 'جمال وعناية', 'أخرى'],
  en: ['Retail', 'Food & Beverage', 'Services', 'Beauty & Wellness', 'Other'],
}

const copy = {
  ar: {
    title: 'تواصل مع فريقنا',
    sub: 'سنرد عليك خلال ٢٤ ساعة.',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    firstPlaceholder: 'محمد',
    lastPlaceholder: 'العمري',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'name@company.sa',
    phone: 'رقم الجوال',
    phonePlaceholder: '05xxxxxxxx',
    businessType: 'نوع النشاط',
    businessTypePlaceholder: 'اختر...',
    message: 'رسالة',
    messageOptional: '(اختياري)',
    messagePlaceholder: 'أخبرنا عن نشاطك التجاري...',
    submit: 'إرسال الرسالة ←',
    submitting: 'جاري الإرسال...',
    successTitle: 'تم الإرسال',
    successSub: 'سيتواصل معك أحد أعضاء فريقنا خلال ٢٤ ساعة.',
    close: 'إغلاق',
  },
  en: {
    title: 'Talk to our team',
    sub: "We'll get back to you within 24 hours.",
    firstName: 'First name',
    lastName: 'Last name',
    firstPlaceholder: 'Mohammed',
    lastPlaceholder: 'Al-Omari',
    email: 'Work email',
    emailPlaceholder: 'name@company.sa',
    phone: 'Phone number',
    phonePlaceholder: '05xxxxxxxx',
    businessType: 'Business type',
    businessTypePlaceholder: 'Select type...',
    message: 'Message',
    messageOptional: '(optional)',
    messagePlaceholder: 'Tell us about your business...',
    submit: 'Send message →',
    submitting: 'Sending...',
    successTitle: 'Message sent',
    successSub: 'One of our team will reach out within 24 hours.',
    close: 'Close',
  },
}

export default function ContactForm({ onClose }: ContactFormProps) {
  const { lang } = useLanguage()
  const t = copy[lang]

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessType: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function set(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.email || !form.firstName || submitting) return
    setSubmitting(true)

    await captureLead({
      source: 'sales_form',
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      business_type: form.businessType,
      message: form.message,
    })

    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-xl">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-navy/40 hover:text-navy hover:bg-gray transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {submitted ? (
        <div className="flex flex-col items-center text-center py-6 gap-4">
          <div className="w-14 h-14 rounded-full bg-[#EAF3DE] flex items-center justify-center">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-display text-xl font-bold text-navy">{t.successTitle}</h3>
          <p className="text-navy/60 text-sm leading-relaxed">{t.successSub}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 px-6 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-opacity-90 transition-all"
          >
            {t.close}
          </button>
        </div>
      ) : (
        <>
          <h2 className="font-display text-2xl font-bold text-navy mb-1">{t.title}</h2>
          <p className="text-navy/50 text-sm mb-6">{t.sub}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-navy">{t.firstName}</label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => set('firstName', e.target.value)}
                  className="h-11 px-3 rounded-[10px] border border-[#DBE1E9] text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                  placeholder={t.firstPlaceholder}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-navy">{t.lastName}</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => set('lastName', e.target.value)}
                  className="h-11 px-3 rounded-[10px] border border-[#DBE1E9] text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                  placeholder={t.lastPlaceholder}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-navy">{t.email}</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                className="h-11 px-3 rounded-[10px] border border-[#DBE1E9] text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                placeholder={t.emailPlaceholder}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-navy">{t.phone}</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className="h-11 px-3 rounded-[10px] border border-[#DBE1E9] text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                placeholder={t.phonePlaceholder}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-navy">{t.businessType}</label>
              <select
                value={form.businessType}
                onChange={(e) => set('businessType', e.target.value)}
                className="h-11 px-3 rounded-[10px] border border-[#DBE1E9] text-sm text-navy focus:outline-none focus:border-navy transition-colors appearance-none bg-white"
              >
                <option value="">{t.businessTypePlaceholder}</option>
                {businessTypes[lang].map((bt) => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-navy">
                {t.message} <span className="text-navy/30">{t.messageOptional}</span>
              </label>
              <textarea
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                rows={3}
                className="px-3 py-2.5 rounded-[10px] border border-[#DBE1E9] text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors resize-none"
                placeholder={t.messagePlaceholder}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 h-12 rounded-xl bg-navy text-white font-semibold text-sm hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 disabled:opacity-60"
            >
              {submitting ? t.submitting : t.submit}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
