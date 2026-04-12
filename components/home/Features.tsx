interface FeatureBlock {
  label: string
  headline: string
  description: string
  bullets: string[]
  visualBg: string
  reverse: boolean
}

const features: FeatureBlock[] = [
  {
    label: 'Point of Sale',
    headline: 'Manage every sale',
    description:
      'Accept payments, apply discounts, and process returns — all from a single, beautifully fast interface.',
    bullets: ['NFC & card payments', 'Instant receipts & invoices', 'ZATCA-compliant billing'],
    visualBg: 'bg-yellow',
    reverse: false,
  },
  {
    label: 'Multi-location',
    headline: 'Grow across branches',
    description:
      'One dashboard to manage inventory, staff, and performance across every branch you own.',
    bullets: ['Central inventory sync', 'Per-branch reporting', 'Role-based staff access'],
    visualBg: 'bg-teal',
    reverse: true,
  },
  {
    label: 'Analytics',
    headline: 'Know your numbers',
    description:
      'Real-time reports and smart insights that tell you what is selling, what is not, and why.',
    bullets: ['Daily email summaries', 'Best-seller tracking', 'Custom date ranges'],
    visualBg: 'bg-[#EEEDFE]',
    reverse: false,
  },
]

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-24">
        {features.map((f) => (
          <div
            key={f.headline}
            className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
              f.reverse ? 'md:[&>*:first-child]:order-2' : ''
            }`}
          >
            {/* Copy */}
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-purple">
                {f.label}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy leading-tight">
                {f.headline}
              </h2>
              <p className="text-navy/70 text-base leading-relaxed">{f.description}</p>
              <ul className="space-y-2">
                {f.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-navy font-medium">
                    <svg className="w-4 h-4 text-purple flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex items-center gap-1.5 text-navy font-semibold text-sm hover:text-purple transition-colors mt-2 group"
              >
                Learn more
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Visual placeholder */}
            <div className={`rounded-3xl ${f.visualBg} aspect-[4/3] flex items-center justify-center`}>
              <div className="w-3/4 h-3/4 rounded-2xl bg-white/40 backdrop-blur-sm grid grid-cols-2 gap-3 p-6">
                <div className="rounded-xl bg-white/60 col-span-2 h-8" />
                <div className="rounded-xl bg-white/60 h-16" />
                <div className="rounded-xl bg-white/60 h-16" />
                <div className="rounded-xl bg-white/60 col-span-2 h-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
