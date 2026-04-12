'use client'

import Tag from '@/components/ui/Tag'

interface Step1TypeProps {
  selected: string[]
  onSelect: (value: string[]) => void
  onContinue: () => void
}

const retailTags = [
  'Clothing', 'Electronics', 'Mini Market / Grocery',
  'Beauty & Perfume', 'Gift & Accessories', 'Pharmacy / Health',
]
const foodTags = [
  'Restaurant', 'Cafe', 'Food Truck',
  'Takeaway / Delivery', 'Bakery & Desserts', 'Juice & Ice Cream',
]
const serviceTags = [
  'Salon / Barbershop', 'Spa & Wellness', 'Car Wash',
  'Laundry', 'Gym / Fitness', 'Repair & Maintenance', 'Cleaning Services',
]

const sections = [
  { label: 'Retail Store', tags: retailTags },
  { label: 'Food & Beverage', tags: foodTags },
  { label: 'Services', tags: serviceTags },
]

export default function Step1Type({ selected, onSelect, onContinue }: Step1TypeProps) {
  function toggle(tag: string) {
    if (selected.includes(tag)) {
      onSelect(selected.filter((t) => t !== tag))
    } else {
      onSelect([...selected, tag])
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight">
          Tell us about your business
        </h1>
        <p className="mt-2 text-purple text-sm">
          Select all that apply — you can pick multiple.
        </p>
      </div>

      <div className="flex flex-col gap-7 flex-1">
        {sections.map(({ label, tags }) => (
          <div key={label}>
            <p className="text-xs font-semibold uppercase tracking-widest text-navy/40 mb-3">
              {label}
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  label={tag}
                  selected={selected.includes(tag)}
                  onClick={() => toggle(tag)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <p className="mt-4 text-xs text-navy/40">
          {selected.length} selected: {selected.join(', ')}
        </p>
      )}

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onContinue}
          disabled={selected.length === 0}
          className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2
            ${selected.length > 0
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
