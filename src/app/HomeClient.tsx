'use client'

import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

export default function HomeClient() {
  const { t, lang } = useLang()
  const ko = lang === 'ko'

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 whitespace-pre-line">
              {t.hero.title}
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed whitespace-pre-line">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/calculator" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-8 py-4 rounded-lg transition-colors text-lg">
                {t.hero.cta1}
              </Link>
              <Link href="/services" className="border-2 border-white text-white hover:bg-white hover:text-navy-800 font-bold px-8 py-4 rounded-lg transition-colors text-lg">
                {t.hero.cta2}
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Stats */}
      <section className="bg-navy-800 py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {t.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-gold-400">{s.value}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle">{t.services.subtitle}</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.services.items.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="section-title">{t.process.title}</h2>
          <p className="section-subtitle">{t.process.subtitle}</p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {t.process.steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="text-center">
                  <div className="w-12 h-12 bg-navy-800 text-gold-400 rounded-full flex items-center justify-center font-black text-lg mx-auto mb-3">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-navy-800 text-sm mb-2">{s.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{s.desc}</p>
                </div>
                {i < t.process.steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-0.5 bg-gold-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-4 bg-navy-800">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.why.title}</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.why.items.map((w, i) => (
            <div key={i} className="bg-navy-700 rounded-xl p-6 text-center hover:bg-navy-600 transition-colors">
              <div className="text-4xl mb-4">{w.icon}</div>
              <h3 className="text-gold-400 font-bold mb-2">{w.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-gold-500 to-gold-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4">{t.cta.title}</h2>
          <p className="text-navy-700 text-lg mb-8 whitespace-pre-line">{t.cta.subtitle}</p>
          <Link
            href="/calculator"
            className="bg-navy-800 hover:bg-navy-900 text-white font-bold px-10 py-4 rounded-xl transition-colors text-lg inline-block"
          >
            {t.cta.btn}
          </Link>
        </div>
      </section>
    </>
  )
}
