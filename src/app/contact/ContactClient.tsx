'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'

const WEB3FORMS_KEY = '6502a4bd-7c1e-4c78-a695-3225cf70099b'

export default function ContactClient() {
  const { lang, t } = useLang()
  const c = t.contact

  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', product: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `[TRST] ${form.company} — ${form.name} 문의`,
        from_name: form.name,
        ...form,
      }),
    })

    setStatus(res.ok ? 'success' : 'error')
  }

  const productOptions = lang === 'ko'
    ? ['의류·섬유', '전자제품·IT', '화장품·뷰티', '식품·음료', '의료기기', '가구·인테리어', '기계·부품', '기타']
    : ['Apparel & Textiles', 'Electronics & IT', 'Cosmetics & Beauty', 'Food & Beverage', 'Medical Devices', 'Furniture & Interior', 'Machinery & Parts', 'Other']

  return (
    <>
      <section className="bg-navy-800 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{c.title}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{c.subtitle}</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2">
            {status === 'success' ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-2xl font-bold text-navy-800 mb-2">
                  {lang === 'ko' ? '문의가 접수되었습니다.' : 'Message Received!'}
                </h2>
                <p className="text-gray-600">
                  {lang === 'ko' ? '1영업일 이내에 이메일로 연락드리겠습니다.' : 'We will reply to your email within 1 business day.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{c.fields.name} *</label>
                    <input type="text" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{c.fields.company} *</label>
                    <input type="text" required value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{c.fields.email} *</label>
                    <input type="email" required value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{c.fields.phone}</label>
                    <input type="tel" value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{c.fields.product}</label>
                  <select value={form.product}
                    onChange={e => setForm({ ...form, product: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-navy-500 bg-white">
                    <option value="">—</option>
                    {productOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{c.fields.message} *</label>
                  <textarea required rows={5} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500 resize-none"
                    placeholder={lang === 'ko' ? '제품 정보, 수출 예정 시기, 문의 사항을 자유롭게 작성해 주세요.' : 'Please describe your product, export timeline, and questions.'} />
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">
                    {lang === 'ko' ? '전송 실패. 이메일로 직접 문의해주세요.' : 'Submission failed. Please email us directly.'}
                  </p>
                )}

                <button type="submit" disabled={status === 'sending'}
                  className="w-full bg-navy-800 hover:bg-navy-900 disabled:opacity-60 text-white font-bold py-4 rounded-lg transition-colors text-lg">
                  {status === 'sending'
                    ? (lang === 'ko' ? '전송 중...' : 'Sending...')
                    : c.fields.submit}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-navy-800 mb-4">{c.info.title}</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{c.info.email}</div>
                  <a href="mailto:contact@trstriskshield.com" className="text-navy-800 font-medium hover:text-gold-600 transition-colors">
                    contact@trstriskshield.com
                  </a>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{c.info.response}</div>
                  <div className="text-navy-800 font-medium">{c.info.responseVal}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{c.info.service}</div>
                  <div className="text-navy-800 font-medium">{c.info.serviceVal}</div>
                </div>
              </div>
            </div>

            <div className="bg-navy-800 rounded-2xl p-6 text-white">
              <h3 className="font-bold text-gold-400 mb-3">
                {lang === 'ko' ? '무료 관세 산출' : 'Free Duty Quote'}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {lang === 'ko'
                  ? '제품 정보만 알려주시면 HTS Code와 예상 관세율을 무료로 산출해 드립니다.'
                  : 'Share your product details and we will calculate the HTS code and estimated duty for free.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
