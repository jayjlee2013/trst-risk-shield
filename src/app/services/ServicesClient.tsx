'use client'

import Link from 'next/link'
import { useLang } from '@/lib/lang-context'

export default function ServicesClient() {
  const { lang, t } = useLang()

  const details = lang === 'ko' ? [
    {
      icon: '🛡️',
      title: 'IOR (Importer of Record) 대행',
      summary: 'TRST Risk Shield가 미국 공식 수입자로 CBP에 등록됩니다.',
      points: [
        'EIN 및 CBP Importer 이력 보유 미국 법인',
        'Form 3461 통관 신고 (파트너 관세사 협력)',
        'ACE 포털 실시간 진행 상황 공유',
        '관세 및 세금 대납 (고객 사전 입금 기준)',
        'Surety Bond 보유로 안정적인 IOR 운영',
      ],
      tag: '핵심 서비스',
    },
    {
      icon: '📋',
      title: 'HTS Code 분류 및 관세 산출',
      summary: '전문가가 직접 HTS 10자리 코드를 검토하고 정확한 관세율을 산출합니다.',
      points: [
        '전문가 직접 검토 (2영업일 이내)',
        'Section 122 / Section 301 / MFN 관세 통합 산출',
        'MPF · HMF · ISF 비용 포함 총 LDP 비용 제공',
        'CBP Binding Ruling 신청 대행 (복잡 품목)',
        '오분류 시 CBP 벌금 책임 면책 조항 포함',
      ],
      tag: '핵심 서비스',
    },
    {
      icon: '💊',
      title: 'FDA Prior Notice 및 규제 대응',
      summary: '식품·화장품·의료기기의 FDA 규정을 완벽하게 대응합니다.',
      points: [
        'FDA Prior Notice (PN) 사전 신고',
        'FDA Import Alert 대응 컨설팅',
        '식품 안전 현대화법(FSMA) 적합성 검토',
        '화장품 MoCRA 규정 대응',
        '의료기기 510(k) 사전 컨설팅',
      ],
      tag: 'FDA 전문',
    },
    {
      icon: '📊',
      title: '관세 변동 모니터링',
      summary: '미국 관세·통상 정책을 실시간으로 추적하여 리스크를 관리합니다.',
      points: [
        'Section 122 / Section 301 / 232 변동 알림',
        '관세율 5%p 이상 변동 시 즉시 통보',
        '견적 재산정 및 전략 컨설팅',
        '월간 관세 동향 리포트 (리테이너 고객)',
        'KORUS FTA 활용 관세 절감 방안 제시',
      ],
      tag: '리테이너',
    },
  ] : [
    {
      icon: '🛡️',
      title: 'IOR (Importer of Record) Service',
      summary: 'TRST Risk Shield registers as the official US importer with CBP on your behalf.',
      points: [
        'US entity with EIN and established CBP Importer history',
        'CBP Form 3461 customs declaration (with licensed broker)',
        'Real-time ACE portal status sharing',
        'Duty and tax payment on your behalf (client pre-funds)',
        'Surety bond held for stable IOR operations',
      ],
      tag: 'Core',
    },
    {
      icon: '📋',
      title: 'HTS Classification & Duty Calculation',
      summary: 'Expert review of your 10-digit HTS code and accurate duty calculation.',
      points: [
        'Expert review within 2 business days',
        'Section 122 / Section 301 / MFN combined duty calculation',
        'Full LDP cost including MPF, HMF, ISF',
        'CBP Binding Ruling application (complex products)',
        'Liability clause for misclassification penalties',
      ],
      tag: 'Core',
    },
    {
      icon: '💊',
      title: 'FDA Prior Notice & Compliance',
      summary: 'Full FDA compliance for food, cosmetics, and medical devices.',
      points: [
        'FDA Prior Notice (PN) filing',
        'FDA Import Alert response consulting',
        'FSMA compliance review',
        'Cosmetics MoCRA compliance',
        'Medical device 510(k) pre-consulting',
      ],
      tag: 'FDA',
    },
    {
      icon: '📊',
      title: 'Tariff Change Monitoring',
      summary: 'Real-time tracking of US tariff changes and trade policy developments.',
      points: [
        'Section 122 / Section 301 / 232 change alerts',
        'Immediate notification on 5%+ rate changes',
        'Quote recalculation and strategic guidance',
        'Monthly tariff trend report (retainer clients)',
        'KORUS FTA optimization recommendations',
      ],
      tag: 'Retainer',
    },
  ]

  return (
    <>
      <section className="bg-navy-800 pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t.services.title}</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{t.services.subtitle}</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {details.map((d, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-navy-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{d.icon}</span>
                  <h2 className="text-white font-bold">{d.title}</h2>
                </div>
                <span className="text-xs bg-gold-500 text-navy-900 font-bold px-2 py-1 rounded">{d.tag}</span>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{d.summary}</p>
                <ul className="space-y-2">
                  {d.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-gold-500 mt-0.5 flex-shrink-0">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-gold-500 to-gold-400">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-black text-navy-900 mb-4">{t.cta.title}</h2>
          <p className="text-navy-700 mb-8">{t.cta.subtitle}</p>
          <Link href="/contact" className="bg-navy-800 hover:bg-navy-900 text-white font-bold px-10 py-4 rounded-xl transition-colors inline-block">
            {t.cta.btn}
          </Link>
        </div>
      </section>
    </>
  )
}
