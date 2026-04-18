import type { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'TRST Risk Shield | IOR 대행 · LDP · FDA 미국 수입 전문',
  description: '미국 법인 없이 미국으로 수출하세요. TRST TRADING LLC가 IOR 대행, HTS 분류, FDA 대응, LDP 올인원 견적을 제공합니다. 한국·중국·대만·베트남 수출 기업 전문.',
  alternates: { canonical: 'https://trstriskshield.com' },
  openGraph: {
    title: 'TRST Risk Shield | IOR 대행 · LDP · FDA 미국 수입 전문',
    description: '미국 법인 없이 수출 가능. TRST TRADING LLC가 IOR 대행으로 미국 수출을 책임집니다.',
    url: 'https://trstriskshield.com',
  },
}

export default function HomePage() {
  return <HomeClient />
}
