'use client'

import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

export default function AboutClient() {
  const { lang, t } = useLang()
  const a = t.about

  return (
    <>
      <section className="bg-navy-800 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{a.title}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{a.subtitle}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-navy-800 mb-6">{a.story.title}</h2>
          <div className="text-gray-600 leading-relaxed whitespace-pre-line text-lg border-l-4 border-gold-500 pl-6">
            {a.story.body}
          </div>
        </div>
      </section>

      {/* Expertise + Entity */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-6">{a.expertise.title}</h2>
            <ul className="space-y-3">
              {a.expertise.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-gold-500 text-navy-900 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">✓</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-800 mb-6">{a.entity.title}</h2>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {a.entity.items.map((item, i) => (
                <div key={i} className={`flex px-6 py-4 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <span className="w-32 text-gray-500 text-sm font-medium flex-shrink-0">{item.label}</span>
                  <span className="text-navy-800 font-semibold text-sm">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Markets */}
      <section className="py-16 px-4 bg-navy-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-10">
            {lang === 'ko' ? '서비스 대상 지역' : 'Target Markets'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { flag: '🇰🇷', country: lang === 'ko' ? '한국' : 'Korea', note: 'Section 122 10%' },
              { flag: '🇨🇳', country: lang === 'ko' ? '중국' : 'China', note: 'Section 122 + 301' },
              { flag: '🇹🇼', country: lang === 'ko' ? '대만' : 'Taiwan', note: 'Section 122 10%' },
              { flag: '🇻🇳', country: lang === 'ko' ? '베트남/동남아' : 'Vietnam/SEA', note: 'Section 122 10%' },
            ].map((m, i) => (
              <div key={i} className="bg-navy-700 rounded-xl p-6 text-center">
                <div className="text-4xl mb-2">{m.flag}</div>
                <div className="text-white font-bold mb-1">{m.country}</div>
                <div className="text-gold-400 text-sm">{m.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-gold-500 to-gold-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-navy-900 mb-4">{t.cta.title}</h2>
          <Link href="/contact" className="bg-navy-800 hover:bg-navy-900 text-white font-bold px-10 py-4 rounded-xl transition-colors inline-block">
            {t.cta.btn}
          </Link>
        </div>
      </section>
    </>
  )
}
