'use client'

import { useState } from 'react'
import { Plan, planDetails } from '@/lib/recommendation'

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName: string
}

interface Step4SignupProps {
  businessType: string
  businessSize: string
  selectedPlan: Plan
  userData: UserData
  onUserDataChange: (data: UserData) => void
  onSubmit: () => void
  onBack: () => void
}

export default function Step4Signup({
  businessType,
  businessSize,
  selectedPlan,
  userData,
  onUserDataChange,
  onSubmit,
  onBack,
}: Step4SignupProps) {
  const [errors, setErrors] = useState<Partial<UserData>>({})
  const [submitting, setSubmitting] = useState(false)

  const plan = planDetails[selectedPlan]

  const sizeLabel =
    businessSize === 'starter'
      ? '1 branch'
      : businessSize === 'growing'
      ? '2–5 branches'
      : '5+ branches'

  const deviceLabel =
    businessSize === 'starter'
      ? '1–2 devices'
      : businessSize === 'growing'
      ? 'Multi-device'
      : 'Central Management'

  function validate(): boolean {
    const e: Partial<UserData> = {}
    if (!userData.firstName.trim()) e.firstName = 'Required'
    if (!userData.lastName.trim()) e.lastName = 'Required'
    if (!userData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email))
      e.email = 'Valid email required'
    if (!userData.phone.trim()) e.phone = 'Required'
    if (!userData.businessName.trim()) e.businessName = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit() {
    if (!validate()) return
    setSubmitting(true)
    // Supabase call will go here once credentials are added
    await new Promise((r) => setTimeout(r, 600))
    setSubmitting(false)
    onSubmit()
  }

  function field(
    id: keyof UserData,
    label: string,
    placeholder: string,
    type = 'text'
  ) {
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-navy">
          {label}
        </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={userData[id]}
          onChange={(e) => onUserDataChange({ ...userData, [id]: e.target.value })}
          className={`h-11 px-4 rounded-xl border text-sm text-navy placeholder:text-navy/30 bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-1
            ${errors[id] ? 'border-red-400' : 'border-gray focus:border-navy'}`}
        />
        {errors[id] && <p className="text-xs text-red-500">{errors[id]}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 h-full">
      {/* Left: form */}
      <div className="flex-1 flex flex-col">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-navy">Create your account</h1>
          <p className="mt-1.5 text-sm text-navy/50">
            You&apos;re one step away from your personalized BirdEye setup.
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <div className="grid grid-cols-2 gap-3">
            {field('firstName', 'First Name', 'Sarah')}
            {field('lastName', 'Last Name', 'Al-harbi')}
          </div>
          {field('email', 'Work Email', 'sarah@gmail.com', 'email')}
          {field('phone', 'Phone Number', '+966 555 555 555', 'tel')}
          {field('businessName', 'Your Business Name', 'Your store name')}
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-navy text-white font-semibold text-sm hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2 disabled:opacity-60"
          >
            {submitting ? 'Creating your account…' : 'Start free trial →'}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="w-full text-sm text-navy/40 hover:text-navy transition-colors flex items-center justify-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
        </div>
      </div>

      {/* Right: summary */}
      <div className="md:w-72 bg-[#F8F8FB] rounded-2xl p-6 flex flex-col gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-navy/30 mb-2">
            Your Setup Summary
          </p>
          <div className="inline-flex items-center gap-1.5 bg-white border border-gray rounded-full px-3 py-1.5 text-xs text-navy/60">
            <span>{businessType}</span>
            <span className="text-navy/30">•</span>
            <span>{sizeLabel}</span>
            <span className="text-navy/30">•</span>
            <span>{deviceLabel}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-navy text-sm">{plan.name}</h3>
              <p className="text-xs text-navy/50 mt-0.5">{plan.price}</p>
            </div>
            <span className="bg-[#EEEDFE] text-navy text-xs font-semibold px-2.5 py-1 rounded-full">
              Recommended
            </span>
          </div>
          <ul className="space-y-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-navy">
                <svg className="w-3.5 h-3.5 text-navy flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-2.5">
            <span className="text-base">★</span>
            <div>
              <p className="text-xs font-semibold text-navy">No credit card needed</p>
              <p className="text-xs text-navy/50">Start your free trial instantly</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-4 h-4 rounded-sm bg-teal flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-navy">ZATCA compliant and secure</p>
              <p className="text-xs text-navy/50">Trusted by leading Saudi businesses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
