'use client'

import { useState } from 'react'
import { captureLead } from '@/lib/leads'

interface ContactFormProps {
  onClose: () => void
}

const businessTypes = ['Retail', 'Food & Beverage', 'Services']

export default function ContactForm({ onClose }: ContactFormProps) {
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

    const result = await captureLead({
      source: 'sales_form',
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
      business_type: form.businessType,
      message: form.message,
    })

    if (!result.success) {
      console.error('Lead capture failed silently:', result.error)
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-xl">
      {/* Close button */}
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
          <h3 className="font-display text-xl font-bold text-navy">Message sent</h3>
          <p className="text-navy/60 text-sm leading-relaxed">
            One of our team will reach out within 24 hours.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 px-6 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-opacity-90 transition-all"
          >
            Close
          </button>
        </div>
      ) : (
        <>
          <h2 className="font-display text-2xl font-bold text-navy mb-1">Talk to our team</h2>
          <p className="text-navy/50 text-sm mb-6">We&apos;ll get back to you within 24 hours.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-navy">First name</label>
                <input
                  type="text"
                  required
                  value={form.firstName}
                  onChange={(e) => set('firstName', e.target.value)}
                  className="h-11 px-3 rounded-[10px] border border-[#DBE1E9] text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                  placeholder="Mohammed"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-navy">Last name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => set('lastName', e.target.value)}
                  className="h-11 px-3 rounded-[10px] border border-[#DBE1E9] text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                  placeholder="Al-Omari"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-navy">Work email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                className="h-11 px-3 rounded-[10px] border border-[#DBE1E9] text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                placeholder="name@company.sa"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-navy">Phone number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                className="h-11 px-3 rounded-[10px] border border-[#DBE1E9] text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors"
                placeholder="05xxxxxxxx"
              />
            </div>

            {/* Business type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-navy">Business type</label>
              <select
                value={form.businessType}
                onChange={(e) => set('businessType', e.target.value)}
                className="h-11 px-3 rounded-[10px] border border-[#DBE1E9] text-sm text-navy focus:outline-none focus:border-navy transition-colors appearance-none bg-white"
              >
                <option value="">Select type...</option>
                {businessTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-navy">Message <span className="text-navy/30">(optional)</span></label>
              <textarea
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
                rows={3}
                className="px-3 py-2.5 rounded-[10px] border border-[#DBE1E9] text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-navy transition-colors resize-none"
                placeholder="Tell us about your business..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 h-12 rounded-xl bg-navy text-white font-semibold text-sm hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 disabled:opacity-60"
            >
              {submitting ? 'Sending...' : 'Send message →'}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
