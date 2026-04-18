'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

const WEB3FORMS_KEY = '6502a4bd-7c1e-4c78-a695-3225cf70099b'

interface SdnEntry {
  name: string
  type: string
  program: string
  remarks: string
}

interface ApiResponse {
  query: string
  total: number
  results: SdnEntry[]
  source: string
  error?: string
}

export default function KycClient() {
  const { lang } = useLang()
  const ko = lang === 'ko'

  // Step 1: lead capture
  const [lead, setLead] = useState({ name: '', company: '', email: '' })
  const [gateStatus, setGateStatus] = useState<'idle' | 'submitting' | 'done'>('idle')

  // Step 2: OFAC search
  const [query, setQuery] = useState('')
  const [searchStatus, setSearchStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [data, setData] = useState<ApiResponse | null>(null)

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setGateStatus('submitting')

    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `[TRST] OFAC 조회 리드 — ${lead.company} (${lead.name})`,
        from_name: lead.name,
        ...lead,
        source: 'KYC/OFAC 조회 페이지',
      }),
    })

    setGateStatus('done')
  }

  const search = async () => {
    if (query.trim().length < 2) return
    setSearchStatus('loading')
    setData(null)

    try {
      const res = await fetch(`/api/ofac?q=${encodeURIComponent(query)}`)
      const json: ApiResponse = await res.json()
      if (!res.ok || json.error) { setSearchStatus('error'); return }
      setData(json)
      setSearchStatus('done')
    } catch {
      setSearchStatus('error')
    }
  }

  const clean = searchStatus === 'done' && data?.total === 0

  return (
    <>
      <section className="bg-navy-800 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
            {ko ? 'OFAC 제재 스크리닝' : 'OFAC Sanctions Screening'}
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            {ko ? 'KYC / OFAC 조회' : 'KYC / OFAC Check'}
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {ko
              ? '미국 재무부 OFAC SDN 공식 리스트를 무료로 즉시 조회합니다.'
              : 'Instantly screen against the official US Treasury OFAC SDN list. Free.'}
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto">

          {/* Step 1: Lead gate */}
          {gateStatus !== 'done' && (
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
              <h2 className="text-lg font-bold text-navy-800 mb-1">
                {ko ? '무료 조회 시작하기' : 'Start Free Screening'}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {ko
                  ? '정보를 입력하시면 OFAC 조회 결과를 이메일로도 보내드립니다.'
                  : 'Enter your info and we\'ll also send the results to your email.'}
              </p>
              <form onSubmit={submitLead} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {ko ? '담당자명 *' : 'Name *'}
                    </label>
                    <input
                      type="text" required value={lead.name}
                      onChange={e => setLead({ ...lead, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {ko ? '회사명 *' : 'Company *'}
                    </label>
                    <input
                      type="text" required value={lead.company}
                      onChange={e => setLead({ ...lead, company: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {ko ? '이메일 *' : 'Email *'}
                  </label>
                  <input
                    type="email" required value={lead.email}
                    onChange={e => setLead({ ...lead, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={gateStatus === 'submitting'}
                  className="w-full bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-navy-900 font-bold py-3 rounded-lg transition-colors"
                >
                  {gateStatus === 'submitting'
                    ? (ko ? '처리 중...' : 'Processing...')
                    : (ko ? '무료 OFAC 조회 시작 →' : 'Start Free OFAC Check →')}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Search (unlocked after lead) */}
          {gateStatus === 'done' && (
            <>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {ko ? '조회할 회사명 / 개인명' : 'Company / Individual to Screen'}
                </label>
                <div className="flex gap-3">
                  <input
                    type="text" value={query}
                    onChange={e => setQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && search()}
                    placeholder={ko ? '예: Mahan Air' : 'e.g. Mahan Air'}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-navy-500 focus:ring-1 focus:ring-navy-500"
                  />
                  <button
                    onClick={search}
                    disabled={searchStatus === 'loading' || query.trim().length < 2}
                    className="bg-navy-800 hover:bg-navy-900 disabled:opacity-50 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm whitespace-nowrap"
                  >
                    {searchStatus === 'loading' ? (ko ? '조회 중...' : 'Checking...') : (ko ? '조회' : 'Search')}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  {ko ? '출처: 미국 재무부 OFAC SDN (treasury.gov)' : 'Source: US Treasury OFAC SDN (treasury.gov)'}
                </p>
              </div>

              {searchStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm mb-4">
                  {ko ? '조회 실패. 잠시 후 다시 시도해주세요.' : 'Search failed. Please try again.'}
                </div>
              )}

              {clean && (
                <>
                  <div className="bg-green-50 border-2 border-green-400 rounded-2xl p-8 text-center">
                    <div className="text-5xl mb-3">✅</div>
                    <h2 className="text-xl font-bold text-green-800 mb-1">
                      {ko ? 'OFAC 제재 대상 없음' : 'Not on OFAC SDN List'}
                    </h2>
                    <p className="text-green-700 text-sm">
                      {ko ? `"${query}" — OFAC SDN 제재 기록 없음.` : `"${query}" — No OFAC SDN records found.`}
                    </p>
                  </div>
                  <div className="bg-navy-800 rounded-2xl p-6 text-center">
                    <p className="text-gold-400 font-bold text-sm mb-1">
                      {ko ? '다음 단계' : 'Next Step'}
                    </p>
                    <p className="text-white text-sm mb-5">
                      {ko
                        ? '제재 위험이 없음이 확인됐습니다. 이제 미국 수출 LDP 비용을 계산하고 IOR 서비스를 시작하세요.'
                        : 'No sanctions risk confirmed. Now calculate your US import LDP cost and start your IOR service.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/calculator" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-6 py-3 rounded-lg transition-colors text-sm">
                        {ko ? 'LDP 비용 계산하기 →' : 'Calculate LDP Cost →'}
                      </Link>
                      <Link href="/contact" className="border border-white text-white hover:bg-navy-700 font-bold px-6 py-3 rounded-lg transition-colors text-sm">
                        {ko ? '무료 상담 신청' : 'Free Consultation'}
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {searchStatus === 'done' && data && data.total > 0 && (
                <div className="space-y-4">
                  <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-6 text-center">
                    <div className="text-5xl mb-3">🚨</div>
                    <h2 className="text-xl font-bold text-red-800 mb-1">
                      {ko ? 'OFAC 제재 대상 발견' : 'OFAC SDN Match Found'}
                    </h2>
                    <p className="text-red-700 text-sm">
                      {ko
                        ? `${data.total}건 발견. 거래 전 법률 전문가 상담 필수.`
                        : `${data.total} record(s) found. Consult legal counsel before proceeding.`}
                    </p>
                  </div>
                  {data.results.map((r, i) => (
                    <div key={i} className="bg-white rounded-xl border border-red-200 p-5 shadow-sm">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="font-bold text-navy-800">{r.name}</div>
                        <span className="text-xs bg-red-100 text-red-700 font-bold px-2 py-1 rounded flex-shrink-0">
                          {ko ? '제재 대상' : 'SANCTIONED'}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {r.type && <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{r.type}</span>}
                        {r.program && <span className="bg-navy-100 text-navy-700 font-medium px-2 py-0.5 rounded">{r.program}</span>}
                      </div>
                    </div>
                  ))}
                  <div className="bg-navy-900 rounded-xl p-5 text-center border border-red-900">
                    <p className="text-gray-300 text-sm mb-3">
                      {ko
                        ? '제재 대상이 발견된 경우 거래 전 반드시 OFAC 전문가의 법률 검토를 받으세요.'
                        : 'If a sanctions match is found, consult an OFAC specialist before proceeding with any transaction.'}
                    </p>
                    <Link href="/contact" className="inline-block bg-red-700 hover:bg-red-800 text-white font-bold px-6 py-2.5 rounded-lg transition-colors text-sm">
                      {ko ? '전문가 상담 문의 →' : 'Contact a Specialist →'}
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-xs text-yellow-800 leading-relaxed">
              {ko
                ? '⚠️ 본 조회는 참고용이며 법적 효력이 없습니다. 실제 거래 전 공식 OFAC 채널 및 법률 전문가와 확인하세요. 데이터: 미국 재무부 treasury.gov'
                : '⚠️ For reference only. Not legal advice. Verify through official OFAC channels. Data: US Treasury treasury.gov'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
