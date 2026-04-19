'use client'

import Link from 'next/link'
import { useLanguage, t } from '@/contexts/LanguageContext'

export default function Navbar() {
  const { tr, toggleLang } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full h-16 bg-white border-b border-[#DBE1E9]">
      <nav className="h-full max-w-7xl mx-auto px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="public/logo/BirdEye Logo AR-07 ar white.svg"
            alt="BirdEye"
            style={{ height: 30, width: 'auto', display: 'block' }}
          />
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-8">
          <li>
            <Link href="#features" className="text-navy text-sm font-medium hover:text-purple transition-colors">
              {tr(t.nav.products)}
            </Link>
          </li>
          <li>
            <Link href="/cashier" className="text-navy text-sm font-medium hover:text-purple transition-colors">
              {tr({ ar: 'الكاشير', en: 'POS' })}
            </Link>
          </li>
          <li>
            <Link href="/store" className="text-navy text-sm font-medium hover:text-purple transition-colors">
              {tr({ ar: 'المتجر', en: 'Store' })}
            </Link>
          </li>
          <li>
            <Link href="/#tools" className="text-navy text-sm font-medium hover:text-purple transition-colors">
              {tr({ ar: 'الأدوات', en: 'Tools' })}
            </Link>
          </li>
          <li>
            <Link href="#pricing" className="text-navy text-sm font-medium hover:text-purple transition-colors">
              {tr(t.nav.pricing)}
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {/* Language toggle */}
          <button
            type="button"
            onClick={toggleLang}
            className="text-sm text-navy/60 hover:text-navy transition-colors font-medium"
          >
            {tr(t.nav.switchLang)}
          </button>

          {/* CTA */}
          <Link
            href="/get-started"
            className="px-5 py-2.5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2"
          >
            {tr(t.nav.cta)}
          </Link>
        </div>
      </nav>
    </header>
  )
}
