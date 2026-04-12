'use client'

import { Plan, planDetails } from '@/lib/recommendation'

interface Step3PlanProps {
  businessTypes: string[]
  businessSize: string
  recommendedPlan: Plan
  selectedPlan: Plan
  onSelectPlan: (plan: Plan) => void
  onContinue: () => void
  onBack: () => void
}

const planOrder: Plan[] = ['free', 'professional', 'premium']

const planPriceDisplay: Record<Plan, string> = {
  free: 'Free',
  professional: '3,570 ر.س / year',
  premium: '4,820 ر.س / year',
}

export default function Step3Plan({
  businessTypes,
  businessSize,
  recommendedPlan,
  selectedPlan,
  onSelectPlan,
  onContinue,
  onBack,
}: Step3PlanProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight">
          Your Recommended Setup
        </h1>
        <div className="mt-3 inline-flex flex-wrap items-center gap-2 bg-[#F3F4F6] rounded-full px-4 py-1.5 text-sm text-navy/70">
          <span>{businessTypes.join(', ')}</span>
          <span className="text-navy/30">•</span>
          <span>{businessSize === 'starter' ? '1 branch' : businessSize === 'growing' ? '2–5 branches' : '5+ branches'}</span>
          <span className="text-navy/30">•</span>
          <span>{businessSize === 'starter' ? '1–2 devices' : businessSize === 'growing' ? 'Multi-device' : 'Central Management'}</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 items-start">
        {/* Plan cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          {planOrder.map((planKey) => {
            const plan = planDetails[planKey]
            const isRecommended = planKey === recommendedPlan
            const isSelected = planKey === selectedPlan
            return (
              <button
                key={planKey}
                type="button"
                onClick={() => onSelectPlan(planKey)}
                className={`relative text-left rounded-2xl border-2 p-5 transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-1 flex flex-col gap-4
                  ${isSelected
                    ? 'border-navy bg-white shadow-md'
                    : 'border-gray bg-white hover:border-purple'
                  }`}
              >
                {isRecommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#EEEDFE] text-navy text-xs font-semibold px-3 py-1 rounded-full">
                    Recommended for you
                  </span>
                )}
                <div>
                  <h3 className="font-bold text-navy text-sm">{plan.name}</h3>
                  <p className="text-xs text-navy/50 mt-0.5">{planPriceDisplay[planKey]}</p>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-navy">
                      <svg className="w-3.5 h-3.5 text-navy flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            )
          })}
        </div>

        {/* Device image placeholder */}
        <div className="hidden md:flex md:w-56 rounded-2xl bg-yellow aspect-square items-center justify-center flex-shrink-0">
          <div className="w-3/4 h-3/4 bg-white/40 rounded-xl flex items-center justify-center text-navy/30 text-xs font-medium">
            Device image
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-navy/50 hover:text-navy transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <div className="flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={onContinue}
            className="px-8 py-3 rounded-xl bg-navy text-white font-semibold text-sm hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
          >
            Continue
          </button>
          <a href="#pricing" className="text-xs text-navy/40 hover:text-navy transition-colors underline underline-offset-2">
            Compare all plans in detail ↗
          </a>
        </div>
      </div>
    </div>
  )
}
