'use client'

import { BusinessSize } from '@/lib/recommendation'

interface Step2SizeProps {
  selected: BusinessSize | ''
  businessType: string
  onSelect: (value: BusinessSize) => void
  onContinue: () => void
  onBack: () => void
}

const tiers: {
  key: BusinessSize
  name: string
  pills: string[]
  description: string
}[] = [
  {
    key: 'starter',
    name: 'Starter',
    pills: ['1 branch', '1–2 devices'],
    description: 'Perfect for a single location just getting started.',
  },
  {
    key: 'growing',
    name: 'Growing',
    pills: ['2–5 branches', 'Multi-device'],
    description: 'Expanding businesses that need multi-branch management.',
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    pills: ['5+ branches', 'Central Management'],
    description: 'Large chains requiring advanced analytics and integrations.',
  },
]

const socialProof: Record<BusinessSize, {
  quote: string
  initials: string
  name: string
  role: string
  stats: { label: string; value: string }[]
}> = {
  starter: {
    quote: '"I made my first sale on the same day I set everything up. BirdEye just works."',
    initials: 'NA',
    name: 'Noura Al-Ahmadi',
    role: 'Beauty shop, Riyadh',
    stats: [
      { label: 'Time to first sale', value: '1 day' },
      { label: 'Revenue increase', value: '+31%' },
    ],
  },
  growing: {
    quote: '"BirdEye scaled with us without friction when we opened our third branch."',
    initials: 'KM',
    name: 'Khalid Al-Mutairi',
    role: 'Restaurant chain, Jeddah — 3 branches',
    stats: [
      { label: 'Branches in 8 months', value: '3 → 5' },
      { label: 'Admin time saved', value: '-40%' },
    ],
  },
  enterprise: {
    quote: '"Seven branches, one dashboard. Real-time reporting changed how we make decisions."',
    initials: 'FR',
    name: 'Fahad Al-Rashidi',
    role: 'Retail chain, Riyadh — 7 branches',
    stats: [
      { label: 'Branches on one dashboard', value: '7' },
      { label: 'Reporting', value: 'Real-time' },
    ],
  },
}

export default function Step2Size({ selected, onSelect, onContinue, onBack }: Step2SizeProps) {
  const proof = selected ? socialProof[selected] : null

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight">
          Your business size?
        </h1>
        <p className="mt-2 text-purple text-sm">
          Helps us recommend the right setup.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1">
        {/* Tier cards */}
        <div className="flex flex-col gap-3 flex-1">
          {tiers.map((tier) => {
            const isSelected = selected === tier.key
            return (
              <button
                key={tier.key}
                type="button"
                onClick={() => onSelect(tier.key)}
                className={`w-full text-left rounded-2xl border-2 p-5 transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-1
                  ${isSelected
                    ? 'border-navy bg-[#F8F8FB]'
                    : 'border-gray bg-white hover:border-purple'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-navy">{tier.name}</span>
                  <div className="flex gap-1.5">
                    {tier.pills.map((p) => (
                      <span
                        key={p}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium
                          ${isSelected ? 'bg-[#EEEDFE] text-navy' : 'bg-[#F3F4F6] text-navy/60'}`}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-navy/50 mt-1.5">{tier.description}</p>
              </button>
            )
          })}
        </div>

        {/* Social proof panel */}
        <div className="hidden md:flex md:w-64 rounded-2xl bg-[#F8F8FB] p-5 flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy/30">
            Businesses like yours
          </p>
          {proof ? (
            <>
              <p className="text-sm text-navy/80 italic leading-relaxed">{proof.quote}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {proof.initials}
                </div>
                <div>
                  <p className="text-xs font-semibold text-navy">{proof.name}</p>
                  <p className="text-xs text-navy/50">{proof.role}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {proof.stats.map((s) => (
                  <div key={s.label} className="bg-white rounded-xl p-3">
                    <p className="text-base font-bold text-navy">{s.value}</p>
                    <p className="text-xs text-navy/50 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-sm text-navy/40 mt-2">Select a size to see how similar businesses use BirdEye.</p>
          )}
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
        <button
          type="button"
          onClick={onContinue}
          disabled={!selected}
          className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2
            ${selected
              ? 'bg-navy text-white hover:bg-opacity-90'
              : 'bg-gray text-navy/40 cursor-not-allowed'
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
