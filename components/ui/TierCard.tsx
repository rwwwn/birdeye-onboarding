interface TierCardProps {
  name: string
  price: string
  features: string[]
  selected?: boolean
  recommended?: boolean
  onClick?: () => void
  ctaLabel?: string
  onCtaClick?: () => void
}

export default function TierCard({
  name,
  price,
  features,
  selected = false,
  recommended = false,
  onClick,
  ctaLabel,
  onCtaClick,
}: TierCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl border-2 p-6 transition-all duration-200 cursor-pointer
        ${
          selected
            ? 'border-navy bg-white shadow-lg'
            : 'border-gray bg-white hover:border-purple'
        }`}
    >
      {recommended && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#EEEDFE] text-navy text-xs font-semibold px-3 py-1 rounded-full">
          Recommended for you
        </span>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-bold text-navy">{name}</h3>
        <p className="text-navy font-semibold mt-1">{price}</p>
      </div>

      <ul className="space-y-2 mb-6">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-navy">
            <svg className="w-4 h-4 text-navy flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {ctaLabel && onCtaClick && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onCtaClick()
          }}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all
            ${
              selected
                ? 'bg-navy text-white hover:bg-opacity-90'
                : 'bg-gray text-navy hover:bg-opacity-80'
            }`}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  )
}
