import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: '회사 소개 — TRST TRADING LLC',
  description: 'TRST Risk Shield 소개. 미국 법인 TRST TRADING LLC가 IOR·LDP·FDA 서비스를 제공합니다. 한국·중국·대만·베트남 수출 기업의 미국 통관 파트너.',
  alternates: { canonical: 'https://trstriskshield.com/about' },
  openGraph: {
    title: '회사 소개 | TRST Risk Shield',
    description: 'TRST TRADING LLC — 미국 수입 전문 법인, IOR·LDP·FDA 올인원 솔루션',
    url: 'https://trstriskshield.com/about',
  },
}

export default function AboutPage() {
  return <AboutClient />
}
