'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { captureLead } from '@/lib/leads'

interface Step5SuccessProps {
  firstName: string
  lastName: string
  email: string
  phone: string
  businessName: string
  businessType: string
  businessSize: string
  recommendedPlan: string
}

const nextSteps = [
  {
    title: 'Explore your dashboard',
    description: 'Your workspace is ready with your plan pre-applied.',
  },
  {
    title: 'Add your products',
    description: 'Import your menu or product catalog to get started.',
  },
  {
    title: 'Invite your team',
    description: 'Add staff members and assign their roles and permissions.',
  },
]

export default function Step5Success({
  firstName,
  lastName,
  email,
  phone,
  businessName,
  businessType,
  businessSize,
  recommendedPlan,
}: Step5SuccessProps) {
  const [captured, setCaptured] = useState(false)

  useEffect(() => {
    if (captured) return
    setCaptured(true)

    captureLead({
      source: 'onboarding',
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      business_name: businessName,
      business_type: businessType,
      business_size: businessSize,
      recommended_plan: recommendedPlan,
    }).catch((err) => console.error('Lead capture failed silently:', err))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const sizeLabel =
    businessSize === 'starter'
      ? '1 branch'
      : businessSize === 'growing'
      ? '2–5 branches'
      : '5+ branches'

  return (
    <div className="flex flex-col items-center text-center py-6 px-4 max-w-2xl mx-auto">
      {/* Check icon */}
      <div className="w-16 h-16 rounded-full bg-[#EAF3DE] flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-display text-3xl md:text-4xl font-bold text-navy">
        You&apos;re all set,{' '}
        <span className="text-purple">{firstName}</span>!
      </h1>

      <p className="mt-3 text-navy/60 text-sm leading-relaxed max-w-md">
        Your BirdEye account has been created. We&apos;ve pre-configured your setup based on your
        answers — {businessType}, {sizeLabel}, {recommendedPlan}.
      </p>

      {/* Next steps */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {nextSteps.map((s) => (
          <div
            key={s.title}
            className="bg-[#F8F8FB] rounded-2xl p-5 text-left flex flex-col gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gray flex-shrink-0" />
            <div>
              <p className="font-semibold text-sm text-navy">{s.title}</p>
              <p className="text-xs text-navy/50 mt-1 leading-relaxed">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-navy text-white font-semibold text-sm hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
        >
          Go to dashboard →
        </Link>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl border-2 border-gray text-navy font-semibold text-sm hover:border-navy transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
        >
          Watch setup guide
        </button>
      </div>

      {email && (
        <p className="mt-6 text-xs text-navy/40">
          A confirmation email has been sent to {email}
        </p>
      )}
    </div>
  )
}
