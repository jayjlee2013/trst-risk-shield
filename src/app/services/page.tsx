import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'

export const metadata: Metadata = {
  title: '서비스 안내 — IOR · HTS · FDA · 관세 모니터링',
  description: 'TRST Risk Shield의 미국 수입 서비스. IOR 대행, HTS Code 분류, FDA Prior Notice, 관세 변동 모니터링. 한국·중국·대만·베트남 수출 기업 전문.',
  alternates: { canonical: 'https://trstriskshield.com/services' },
  openGraph: {
    title: '서비스 안내 | TRST Risk Shield',
    description: 'IOR 대행, HTS 분류, FDA 대응, 관세 모니터링 — 미국 수입 올인원 솔루션',
    url: 'https://trstriskshield.com/services',
  },
}

export default function ServicesPage() {
  return <ServicesClient />
}
