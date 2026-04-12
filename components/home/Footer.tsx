'use client'

import Link from 'next/link'
import { useLanguage, t } from '@/contexts/LanguageContext'

export default function Footer() {
  const { tr } = useLanguage()

  const columns = [
    {
      heading: t.footer.products,
      links: [t.footer.pos, t.footer.store, t.footer.inventory, t.footer.analytics, t.footer.payments],
    },
    {
      heading: t.footer.industries,
      links: [t.footer.retail, t.footer.food, t.footer.services, t.footer.healthcare, t.footer.entertainment],
    },
    {
      heading: t.footer.company,
      links: [t.footer.about, t.footer.careers, t.footer.blog, t.footer.contact, t.footer.partners],
    },
  ]

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <span className="text-xl font-bold font-display tracking-tight">{tr(t.nav.logo)}</span>
            <p className="text-sm text-white/50 leading-relaxed">{tr(t.footer.tagline)}</p>
          </div>

          {columns.map((col) => (
            <div key={col.heading.en}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                {tr(col.heading)}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.en}>
                    <Link href="#" className="text-sm text-purple hover:text-white transition-colors">
                      {tr(link)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Language column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              {tr(t.footer.language)}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-sm text-purple hover:text-white transition-colors">
                  English
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-purple hover:text-white transition-colors">
                  العربية
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <span>© {new Date().getFullYear()} BirdEye. {tr(t.footer.rights)}.</span>
          <div className="flex items-center gap-6">
            {[t.footer.privacy, t.footer.terms, t.footer.cookies].map((item) => (
              <Link key={item.en} href="#" className="hover:text-white transition-colors">
                {tr(item)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
