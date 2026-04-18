'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

export default function Header() {
  const { lang, setLang, t } = useLang()
  const ko = lang === 'ko'
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold-500 rounded-sm flex items-center justify-center">
              <span className="text-navy-900 font-black text-sm">T</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">TRST</div>
              <div className="text-gold-400 text-xs leading-tight font-medium">Risk Shield</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/services" className="text-gray-300 hover:text-gold-400 text-sm font-medium transition-colors">
              {t.nav.services}
            </Link>
            <Link href="/calculator" className="text-gray-300 hover:text-gold-400 text-sm font-medium transition-colors">
              {ko ? '비용 계산' : 'Calculator'}
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-gold-400 text-sm font-medium transition-colors">
              {t.nav.about}
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-gold-400 text-sm font-medium transition-colors">
              {t.nav.contact}
            </Link>
          </nav>

          {/* Right: Lang + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              className="text-gray-400 hover:text-white text-sm font-medium border border-gray-600 rounded px-2 py-1 transition-colors"
            >
              {lang === 'ko' ? 'EN' : '한국어'}
            </button>
            <Link
              href="/contact"
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              {t.nav.cta}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-navy-700 mt-2 pt-4 space-y-3">
            <Link href="/services" className="block text-gray-300 hover:text-gold-400 text-sm font-medium" onClick={() => setMenuOpen(false)}>{t.nav.services}</Link>
            <Link href="/calculator" className="block text-gray-300 hover:text-gold-400 text-sm font-medium" onClick={() => setMenuOpen(false)}>{ko ? '비용 계산' : 'Calculator'}</Link>
            <Link href="/about" className="block text-gray-300 hover:text-gold-400 text-sm font-medium" onClick={() => setMenuOpen(false)}>{t.nav.about}</Link>
            <Link href="/contact" className="block text-gray-300 hover:text-gold-400 text-sm font-medium" onClick={() => setMenuOpen(false)}>{t.nav.contact}</Link>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
                className="text-gray-400 text-sm border border-gray-600 rounded px-2 py-1"
              >
                {lang === 'ko' ? 'EN' : '한국어'}
              </button>
              <Link href="/contact" className="bg-gold-500 text-navy-900 font-semibold text-sm px-4 py-2 rounded-lg" onClick={() => setMenuOpen(false)}>
                {t.nav.cta}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
