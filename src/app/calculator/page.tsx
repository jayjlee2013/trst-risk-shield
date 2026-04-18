import type { Metadata } from 'next'
import CalcClient from './CalcClient'

export const metadata: Metadata = {
  title: 'LDP 비용 계산기 — 미국 수출 관세·MPF·HMF 자동 계산',
  description: '원산지·품목·상품가를 입력하면 미국 수입 관세(Section 122·Section 301 포함), MPF, HMF, ISF를 포함한 LDP 총 비용을 즉시 계산합니다.',
  alternates: { canonical: 'https://trstriskshield.com/calculator' },
  openGraph: {
    title: 'LDP 비용 계산기 | TRST Risk Shield',
    description: '미국 수출 LDP 비용 무료 시뮬레이션 — 관세·MPF·HMF·ISF 자동 계산',
    url: 'https://trstriskshield.com/calculator',
  },
}

export default function CalculatorPage() {
  return <CalcClient />
}
