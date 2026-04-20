import type { Metadata } from 'next'
import './globals.css'
import { LangProvider } from '@/lib/lang-context'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HtmlLangSync from '@/components/HtmlLangSync'

export const metadata: Metadata = {
  title: {
    default: 'TRST Risk Shield | IOR · LDP · FDA 미국 수입 전문',
    template: '%s | TRST Risk Shield',
  },
  description: '미국 법인 없이 미국으로 수출하세요. TRST TRADING LLC가 IOR 대행, HTS 분류, FDA 대응, LDP 올인원 견적을 제공합니다.',
  keywords: ['IOR 대행', 'LDP', 'FDA', 'HTS', '미국 수입자', 'Importer of Record', 'CBP', '통관', 'Section 122', '미국 수출'],
  authors: [{ name: 'TRST Risk Shield' }],
  creator: 'TRST Risk Shield',
  metadataBase: new URL('https://trstriskshield.com'),
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    siteName: 'TRST Risk Shield',
    title: 'TRST Risk Shield | IOR · LDP · FDA 미국 수입 전문',
    description: '미국 법인 없이 수출 가능. TRST TRADING LLC가 IOR 대행으로 미국 수출을 책임집니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://trstriskshield.com',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'TRST Risk Shield',
  legalName: 'TRST TRADING LLC',
  url: 'https://trstriskshield.com',
  logo: 'https://trstriskshield.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@trstriskshield.com',
    contactType: 'customer service',
    availableLanguage: ['Korean', 'English'],
  },
  sameAs: [],
  description: 'US import specialist providing IOR, LDP, HTS classification, and FDA compliance services for Asian exporters.',
  areaServed: ['KR', 'CN', 'TW', 'VN'],
  serviceType: ['Importer of Record', 'LDP Service', 'FDA Compliance', 'HTS Classification'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-white text-gray-900">
        <LangProvider>
          <HtmlLangSync />
          <Header />
          <main>{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  )
}
