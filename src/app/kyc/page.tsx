import type { Metadata } from 'next'
import KycClient from './KycClient'

export const metadata: Metadata = {
  title: 'OFAC 제재 스크리닝 — KYC / SDN 조회',
  description: '회사명·개인명으로 OFAC SDN, UN 안보리, EU 제재 리스트를 즉시 조회. 선적 전 제재 위반 리스크를 사전 차단하세요.',
  alternates: { canonical: 'https://trstriskshield.com/kyc' },
  openGraph: {
    title: 'OFAC 제재 스크리닝 | TRST Risk Shield',
    description: 'OFAC SDN · UN · EU 제재 리스트 무료 즉시 조회',
    url: 'https://trstriskshield.com/kyc',
  },
}

export default function KycPage() {
  return <KycClient />
}
