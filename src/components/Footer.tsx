'use client'

import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

export default function Footer() {
  const { t } = useLang()
  const links = [
    { label: t.nav.services, href: '/services' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.contact, href: '/contact' },
  ]

  return (
    <footer className="bg-navy-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gold-500 rounded-sm flex items-center justify-center">
                <span className="text-navy-900 font-black text-sm">T</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">TRST Risk Shield</div>
              </div>
            </div>
            <p className="text-sm text-gray-500">{t.footer.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Menu</h4>
            <ul className="space-y-2">
              {links.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-gold-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">{t.footer.company}</h4>
            <p className="text-sm text-gray-500">TRST TRADING LLC</p>
            <p className="text-sm text-gray-500 mt-1">United States</p>
          </div>
        </div>

        <div className="border-t border-navy-700 mt-8 pt-6 space-y-2">
          <p className="text-xs text-center text-gray-600">{t.footer.disclaimer}</p>
          <p className="text-xs text-center text-gray-600">{t.footer.copy}</p>
        </div>
      </div>
    </footer>
  )
}
