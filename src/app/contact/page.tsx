import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: '무료 상담 문의 — 관세 산출 · IOR 견적',
  description: '미국 수출 문의는 TRST Risk Shield로. 무료 HTS 분류 및 관세 산출, IOR 서비스 견적을 1영업일 이내에 받으세요.',
  alternates: { canonical: 'https://trstriskshield.com/contact' },
  openGraph: {
    title: '무료 상담 문의 | TRST Risk Shield',
    description: '무료 HTS 분류 및 관세 산출, IOR 서비스 견적 — 1영업일 이내 회신',
    url: 'https://trstriskshield.com/contact',
  },
}

export default function ContactPage() {
  return <ContactClient />
}
