'use client'

import { useState } from 'react'
import { useLang } from '@/lib/lang-context'

const WEB3FORMS_KEY = '6502a4bd-7c1e-4c78-a695-3225cf70099b'

// MFN base duty rates by category (approximate)
const CATEGORIES = {
  apparel:   { ko: '의류·섬유',      en: 'Apparel & Textiles',      mfn: 0.12 },
  electronics:{ ko: '전자제품·IT',  en: 'Electronics & IT',        mfn: 0.01 },
  cosmetics: { ko: '화장품·뷰티',    en: 'Cosmetics & Beauty',      mfn: 0.05 },
  food:      { ko: '식품·음료',      en: 'Food & Beverage',         mfn: 0.08 },
  medical:   { ko: '의료기기',       en: 'Medical Devices',         mfn: 0.02 },
  furniture: { ko: '가구·인테리어',  en: 'Furniture & Interior',    mfn: 0.06 },
  machinery: { ko: '기계·부품',      en: 'Machinery & Parts',       mfn: 0.03 },
  other:     { ko: '기타',           en: 'Other',                   mfn: 0.05 },
}

// Additional tariff rates by country
// 관세율 기준일: 2026-04-17
// IEEPA 위헌(SCOTUS 2026-02-20) → Section 122 10% 임시 부과금 (EO: Proc. 11012, 발효 2026-02-24, 만료 2026-07-24)
// 중국: Section 122 10% + Section 301 품목별 별도 (7.5~100%), EO 14389로 IEEPA 종료
// Section 232 품목별 별도 적용 (의약품 100%, 한국 15%)
// 출처: whitehouse.gov, federalregister.gov, ustr.gov
const COUNTRIES = {
  KR: { ko: '🇰🇷 한국',    en: '🇰🇷 Korea',    ieepa: 0.10, extra: 'Section 122 10% (→ \'26.7.24)' },
  CN: { ko: '🇨🇳 중국',    en: '🇨🇳 China',    ieepa: 0.10, extra: 'Section 122 10% + Section 301 별도' },
  TW: { ko: '🇹🇼 대만',    en: '🇹🇼 Taiwan',   ieepa: 0.10, extra: 'Section 122 10% (→ \'26.7.24)' },
  VN: { ko: '🇻🇳 베트남',  en: '🇻🇳 Vietnam',  ieepa: 0.10, extra: 'Section 122 10% (→ \'26.7.24)' },
  JP: { ko: '🇯🇵 일본',    en: '🇯🇵 Japan',    ieepa: 0.10, extra: 'Section 122 10% (→ \'26.7.24)' },
  IN: { ko: '🇮🇳 인도',    en: '🇮🇳 India',    ieepa: 0.10, extra: 'Section 122 10% (→ \'26.7.24)' },
}

const MPF_RATE = 0.003464
const MPF_MIN = 32.71
const MPF_MAX = 634.62
const HMF_RATE = 0.00125
const ISF_FLAT = 35
const TRST_FEE = 350

type CountryKey = keyof typeof COUNTRIES
type CategoryKey = keyof typeof CATEGORIES

interface Result {
  cif: number
  mfnDuty: number
  ieepaDuty: number
  totalDuty: number
  mpf: number
  hmf: number
  isf: number
  trst: number
  totalLdp: number
  mfnRate: number
  ieepaRate: number
}

function calcLdp(
  productValue: number,
  freight: number,
  country: CountryKey,
  category: CategoryKey,
  isOcean: boolean
): Result {
  const cif = productValue + freight
  const mfnRate = CATEGORIES[category].mfn
  const ieepaRate = COUNTRIES[country].ieepa
  const mfnDuty = cif * mfnRate
  const ieepaDuty = cif * ieepaRate
  const totalDuty = mfnDuty + ieepaDuty
  const mpf = Math.min(Math.max(cif * MPF_RATE, MPF_MIN), MPF_MAX)
  const hmf = isOcean ? cif * HMF_RATE : 0
  const isf = isOcean ? ISF_FLAT : 0

  return {
    cif, mfnDuty, ieepaDuty, totalDuty,
    mpf, hmf, isf,
    trst: TRST_FEE,
    totalLdp: productValue + freight + totalDuty + mpf + hmf + isf + TRST_FEE,
    mfnRate, ieepaRate,
  }
}

function usd(n: number) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function pct(n: number) {
  return (n * 100).toFixed(1) + '%'
}

export default function CalcClient() {
  const { lang } = useLang()
  const ko = lang === 'ko'

  const [form, setForm] = useState({
    productValue: '',
    freight: '',
    country: 'KR' as CountryKey,
    category: 'electronics' as CategoryKey,
    isOcean: true,
  })

  const [result, setResult] = useState<Result | null>(null)
  const [lead, setLead] = useState({ name: '', company: '', email: '' })
  const [leadSent, setLeadSent] = useState(false)
  const [sending, setSending] = useState(false)

  const calculate = () => {
    const pv = parseFloat(form.productValue.replace(/,/g, ''))
    const fr = parseFloat(form.freight.replace(/,/g, '')) || 0
    if (!pv || pv <= 0) return
    setResult(calcLdp(pv, fr, form.country, form.category, form.isOcean))
    setLeadSent(false)
  }

  const sendLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    const r = result!
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `[TRST] LDP 시뮬레이션 리드 — ${lead.company} (${lead.name})`,
        from_name: lead.name,
        ...lead,
        source: 'LDP 비용 계산기',
        simulation: `${COUNTRIES[form.country][ko ? 'ko' : 'en']} / ${CATEGORIES[form.category][ko ? 'ko' : 'en']} / 상품가: ${usd(parseFloat(form.productValue))} / LDP 합계: ${usd(r.totalLdp)}`,
      }),
    })
    setSending(false)
    setLeadSent(true)
  }

  return (
    <>
      <section className="bg-navy-800 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            {ko ? 'LDP 비용 자동 계산' : 'LDP Cost Calculator'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {ko ? '미국 수출 비용 시뮬레이터' : 'US Import Cost Simulator'}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {ko
              ? '상품가·원산지·품목을 입력하면 관세·MPF·HMF·ISF를 포함한 LDP 총 비용을 즉시 계산합니다.'
              : 'Enter your product value, origin, and category to instantly calculate total LDP cost including duties, MPF, HMF, and ISF.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Input */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit">
              <h2 className="font-bold text-navy-800 mb-5">{ko ? '정보 입력' : 'Enter Details'}</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {ko ? '원산지 국가' : 'Country of Origin'}
                  </label>
                  <select
                    value={form.country}
                    onChange={e => setForm({ ...form, country: e.target.value as CountryKey })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-navy-500"
                  >
                    {Object.entries(COUNTRIES).map(([k, v]) => (
                      <option key={k} value={k}>{ko ? v.ko : v.en}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {ko ? '제품 카테고리' : 'Product Category'}
                  </label>
                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value as CategoryKey })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-navy-500"
                  >
                    {Object.entries(CATEGORIES).map(([k, v]) => (
                      <option key={k} value={k}>{ko ? v.ko : v.en}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {ko ? '상품 가액 (USD)' : 'Product Value (USD)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number" min="0" value={form.productValue}
                      onChange={e => setForm({ ...form, productValue: e.target.value })}
                      placeholder="10,000"
                      className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:border-navy-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {ko ? '운임 + 보험료 (USD)' : 'Freight + Insurance (USD)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number" min="0" value={form.freight}
                      onChange={e => setForm({ ...form, freight: e.target.value })}
                      placeholder="500"
                      className="w-full border border-gray-300 rounded-lg pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:border-navy-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {ko ? '운송 방법' : 'Shipping Method'}
                  </label>
                  <div className="flex gap-3">
                    {[
                      { v: true, ko: '🚢 해상', en: '🚢 Ocean' },
                      { v: false, ko: '✈️ 항공', en: '✈️ Air' },
                    ].map(opt => (
                      <button
                        key={String(opt.v)}
                        onClick={() => setForm({ ...form, isOcean: opt.v })}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors ${
                          form.isOcean === opt.v
                            ? 'bg-navy-800 text-white border-navy-800'
                            : 'bg-white text-gray-600 border-gray-300 hover:border-navy-400'
                        }`}
                      >
                        {ko ? opt.ko : opt.en}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={calculate}
                  disabled={!form.productValue}
                  className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-50 text-navy-900 font-bold py-3 rounded-lg transition-colors mt-2"
                >
                  {ko ? '비용 계산하기' : 'Calculate Cost'}
                </button>
              </div>
            </div>

            {/* Result */}
            <div>
              {!result ? (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center text-gray-400">
                  <div className="text-4xl mb-3">📊</div>
                  <p className="text-sm">{ko ? '좌측 정보를 입력하고 계산하기를 누르세요.' : 'Enter details and click Calculate.'}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-navy-800 rounded-2xl p-6 text-white">
                    <div className="text-sm text-gray-400 mb-1">{ko ? '예상 LDP 총 비용' : 'Estimated Total LDP Cost'}</div>
                    <div className="text-4xl font-black text-gold-400">{usd(result.totalLdp)}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {ko ? `상품가 대비 ${pct((result.totalLdp - parseFloat(form.productValue)) / parseFloat(form.productValue))} 추가 비용` : `${pct((result.totalLdp - parseFloat(form.productValue)) / parseFloat(form.productValue))} above product value`}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-navy-800 mb-4 text-sm">{ko ? '비용 상세 내역' : 'Cost Breakdown'}</h3>
                    <div className="space-y-2.5">
                      {[
                        { label: ko ? '상품 가액' : 'Product Value', value: usd(parseFloat(form.productValue)), sub: '' },
                        { label: ko ? '운임 + 보험' : 'Freight + Insurance', value: usd(parseFloat(form.freight) || 0), sub: '' },
                        { label: ko ? `MFN 기본관세 (${pct(result.mfnRate)})` : `MFN Base Duty (${pct(result.mfnRate)})`, value: usd(result.mfnDuty), sub: '', highlight: false },
                        { label: `${COUNTRIES[form.country].extra}`, value: usd(result.ieepaDuty), sub: '', highlight: true },
                        { label: `MPF (${pct(MPF_RATE)}, min $${MPF_MIN})`, value: usd(result.mpf), sub: '' },
                        ...(form.isOcean ? [
                          { label: `HMF (${pct(HMF_RATE)})`, value: usd(result.hmf), sub: '' },
                          { label: ko ? 'ISF 신고 수수료' : 'ISF Filing Fee', value: usd(result.isf), sub: '' },
                        ] : []),
                        { label: ko ? 'TRST 서비스 수수료 (견적)' : 'TRST Service Fee (est.)', value: usd(result.trst), sub: '' },
                      ].map((row, i) => (
                        <div key={i} className={`flex justify-between items-center py-1.5 ${i < 2 ? 'text-gray-600' : row.highlight ? 'text-red-600 font-semibold' : 'text-gray-700'}`}>
                          <span className="text-sm">{row.label}</span>
                          <span className="text-sm font-medium tabular-nums">{row.value}</span>
                        </div>
                      ))}
                      <div className="border-t border-gray-200 pt-2.5 flex justify-between items-center">
                        <span className="font-bold text-navy-800">{ko ? 'LDP 합계' : 'Total LDP'}</span>
                        <span className="font-black text-navy-800 text-lg tabular-nums">{usd(result.totalLdp)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Lead capture */}
                  {!leadSent ? (
                    <div className="bg-gold-50 border border-gold-300 rounded-2xl p-6">
                      <h3 className="font-bold text-navy-800 mb-1 text-sm">
                        {ko ? '정확한 견적 받기' : 'Get an Exact Quote'}
                      </h3>
                      <p className="text-xs text-gray-600 mb-4">
                        {ko ? 'HTS Code 기반 정확한 관세율로 공식 견적서를 보내드립니다.' : 'We\'ll send an official quote based on your exact HTS code.'}
                      </p>
                      <form onSubmit={sendLead} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text" required placeholder={ko ? '담당자명' : 'Name'}
                            value={lead.name} onChange={e => setLead({ ...lead, name: e.target.value })}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy-500"
                          />
                          <input
                            type="text" required placeholder={ko ? '회사명' : 'Company'}
                            value={lead.company} onChange={e => setLead({ ...lead, company: e.target.value })}
                            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy-500"
                          />
                        </div>
                        <input
                          type="email" required placeholder={ko ? '이메일' : 'Email'}
                          value={lead.email} onChange={e => setLead({ ...lead, email: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-navy-500"
                        />
                        <button
                          type="submit" disabled={sending}
                          className="w-full bg-navy-800 hover:bg-navy-900 disabled:opacity-60 text-white font-bold py-2.5 rounded-lg text-sm transition-colors"
                        >
                          {sending ? '...' : (ko ? '공식 견적 요청하기' : 'Request Official Quote')}
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-300 rounded-2xl p-5 text-center">
                      <div className="text-2xl mb-1">✅</div>
                      <p className="text-sm font-medium text-green-800">
                        {ko ? 'LDP 견적서와 IOR 서비스 안내를 1영업일 이내에 보내드립니다.' : "We'll send your LDP quote and IOR service details within 1 business day."}
                      </p>
                      <a href="/contact" className="mt-3 inline-block text-xs font-bold text-navy-700 underline hover:text-navy-900">
                        {ko ? '지금 바로 상담 예약하기 →' : 'Book a consultation now →'}
                      </a>
                    </div>
                  )}

                  <p className="text-xs text-gray-400 text-center">
                    {ko
                      ? '* 기준일: 2026-04-17. Section 122 임시 부과금은 2026-07-24 만료 예정. 중국 Section 301은 별도 품목별 적용. 실제 세율은 HTS·CBP 심사에 따라 다를 수 있습니다.'
                      : '* As of 2026-04-17. Section 122 surcharge expires 2026-07-24. China Section 301 applies separately by product. Actual rates subject to HTS and CBP review.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
