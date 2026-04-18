export type Lang = 'ko' | 'en'

export const translations = {
  ko: {
    nav: {
      services: '서비스',
      about: '소개',
      contact: '문의',
      cta: '무료 상담',
    },
    hero: {
      badge: 'IOR 대행 전문',
      title: '미국 법인 없어도\n미국으로 수출할 수 있습니다',
      subtitle: '미국에 법인이 없으면 CBP 통관 자체가 불가능합니다.\nTRST TRADING LLC가 수입자(IOR)로 등록하여 한국·중국·대만·베트남 수출 기업의 미국 수출을 책임집니다.',
      cta1: 'LDP 비용 계산하기 (무료)',
      cta2: 'IOR 서비스 알아보기',
    },
    stats: [
      { value: '10%', label: 'Section 122 임시 부과금 (→ \'26.7.24 만료)' },
      { value: '+α', label: '중국 Section 301 추가관세 (품목별 최대 100%)' },
      { value: '$0', label: 'De Minimis 면세 전면 정지 (EO 유지 중)' },
      { value: '100%', label: '의약품 Section 232 (한국 15%)' },
    ],
    services: {
      title: '핵심 서비스',
      subtitle: '미국 수출의 모든 리스크를 한 곳에서 관리하세요',
      items: [
        {
          icon: '🛡️',
          title: 'IOR 대행',
          desc: '미국 법인 없이도 TRST TRADING LLC가 미국 수입자(IOR)로 등록하여 CBP 통관을 책임집니다.',
        },
        {
          icon: '📋',
          title: 'HTS 분류',
          desc: '전문가가 직접 HTS Code를 검토합니다. 오분류 시 CBP 벌금은 물품 가치의 최대 4배입니다.',
        },
        {
          icon: '💊',
          title: 'FDA 대응',
          desc: '식품·화장품·의료기기 Prior Notice 신고부터 Import Alert 대응까지 FDA 전문 컨설팅을 제공합니다.',
        },
        {
          icon: '📊',
          title: '관세 모니터링',
          desc: '미국 관세 변동을 실시간 모니터링하여 견적 재산정 및 전략적 대응을 지원합니다.',
        },
        {
          icon: '📄',
          title: 'LDP 견적',
          desc: '제품가·운임·관세·수수료를 포함한 정확한 LDP 비용을 사전 산출하여 바이어 협상을 지원합니다.',
        },
        {
          icon: '🔍',
          title: 'KYC / OFAC',
          desc: '수출 전 OFAC SDN 리스트 스크리닝으로 제재 위반 리스크를 사전 차단합니다.',
        },
      ],
    },
    process: {
      title: '진행 프로세스',
      subtitle: '5단계로 안전하게 미국 수출을 완성합니다',
      steps: [
        { num: '01', title: '상담 신청', desc: '제품 정보와 수출 계획을 알려주세요. 무료로 상담해 드립니다.' },
        { num: '02', title: 'KYC / 서류 검토', desc: 'OFAC 스크리닝 및 제품 정보 확인서를 제출합니다.' },
        { num: '03', title: 'HTS 분류 · 견적', desc: '전문가가 HTS Code를 검토하고 정확한 LDP 견적을 제공합니다.' },
        { num: '04', title: '관세 사전 입금', desc: '산출된 관세 예정액을 입금하시면 통관 절차를 진행합니다.' },
        { num: '05', title: '통관 · 완료', desc: 'CBP 신고 후 ACE 포털에서 진행 상황을 실시간으로 공유합니다.' },
      ],
    },
    why: {
      title: 'TRST Risk Shield를 선택하는 이유',
      items: [
        {
          icon: '🇰🇷',
          title: '한국어 전담 서비스',
          desc: '영어 장벽 없이 한국어로 모든 과정을 처리합니다. 서류, 소통, 보고 모두 한국어로.',
        },
        {
          icon: '🏛️',
          title: '미국 법인 보유',
          desc: 'TRST TRADING LLC는 EIN·CBP Importer 이력을 보유한 실제 미국 법인입니다.',
        },
        {
          icon: '⚕️',
          title: 'FDA 전문 경험',
          desc: '식품·화장품·의료기기 FDA 규정에 대한 실전 경험으로 복잡한 규제를 해결합니다.',
        },
        {
          icon: '💰',
          title: '투명한 비용 구조',
          desc: '관세는 고객이 사전 입금 후 대납합니다. 숨겨진 비용 없이 견적 그대로 진행됩니다.',
        },
      ],
    },
    cta: {
      title: 'Section 122 만료 전에 미국 수출을 준비하세요',
      subtitle: '미국 법인 없이도 TRST TRADING LLC가 IOR로 대행합니다.\n지금 바로 무료 LDP 시뮬레이션으로 비용을 확인하세요.',
      btn: '무료 LDP 계산하기',
    },
    footer: {
      company: 'TRST TRADING LLC',
      tagline: 'LDP · IOR · FDA 미국 수입 전문 서비스',
      links: ['서비스', '소개', '문의'],
      copy: '© 2026 TRST TRADING LLC. All rights reserved.',
      disclaimer: '본 사이트의 관세 정보는 참고용이며, 실제 적용 세율은 CBP 심사에 따라 달라질 수 있습니다.',
    },
    contact: {
      title: '문의하기',
      subtitle: '아래 양식을 작성해 주시면 1영업일 이내에 연락드립니다.',
      fields: {
        name: '담당자명',
        company: '회사명',
        email: '이메일',
        phone: '연락처',
        product: '수출 제품 카테고리',
        message: '문의 내용',
        submit: '문의 보내기',
      },
      info: {
        title: '연락처 정보',
        email: '이메일',
        response: '응답 시간',
        responseVal: '1영업일 이내',
        service: '서비스 지역',
        serviceVal: '미국 전 항구',
      },
    },
    about: {
      title: 'TRST Risk Shield 소개',
      subtitle: 'Section 122 전환기, 아시아 수출 기업의 미국 IOR 파트너',
      story: {
        title: '우리의 이야기',
        body: `미국 행정부의 관세 인상(IEEPA → 위헌 판결 후 Section 122 전환) 이후, 미국 바이어들이 수출자에게 DDP/LDP 전환을 요구하는 사례가 급증하고 있습니다.\n\n미국 법인이 없는 한국·아시아 중소기업들은 IOR을 직접 수행할 수 없어 미국 수출 기회를 잃고 있습니다.\n\nTRST Risk Shield는 물류 컨설팅과 실제 통관 현장 경험을 바탕으로, 아시아 수출 기업이 미국 시장에 안전하게 진입할 수 있도록 IOR·LDP·FDA 서비스를 제공합니다.`,
      },
      expertise: {
        title: '전문 역량',
        items: [
          'CBP 통관 및 HTS 분류 전문',
          'FDA Prior Notice · Import Alert 대응',
          'OFAC 제재 스크리닝',
          'KORUS FTA 활용 관세 최적화',
          '한국·중국·대만·베트남 수출 기업 대응',
          '미국 관세 변동 실시간 모니터링',
        ],
      },
      entity: {
        title: '법인 정보',
        items: [
          { label: '법인명', value: 'TRST TRADING LLC' },
          { label: '소재지', value: '미국' },
          { label: 'CBP 등록', value: 'Importer 등록 이력 보유' },
          { label: '서비스 언어', value: '한국어 · 영어' },
        ],
      },
    },
  },

  en: {
    nav: {
      services: 'Services',
      about: 'About',
      contact: 'Contact',
      cta: 'Free Consultation',
    },
    hero: {
      badge: 'IOR Service Specialist',
      title: 'No US Entity?\nWe Are Your IOR.',
      subtitle: 'Without a US legal entity, CBP customs clearance is impossible.\nTRST TRADING LLC acts as your Importer of Record so your exports can reach the US market.',
      cta1: 'Calculate LDP Cost (Free)',
      cta2: 'IOR Services',
    },
    stats: [
      { value: '10%', label: 'Section 122 surcharge (expires Jul \'26)' },
      { value: '+α', label: 'China Section 301 on top (up to 100% by product)' },
      { value: '$0', label: 'De Minimis suspended globally' },
      { value: '100%', label: 'Pharma Section 232 (Korea: 15%)' },
    ],
    services: {
      title: 'Core Services',
      subtitle: 'Manage all your US import risks in one place',
      items: [
        {
          icon: '🛡️',
          title: 'IOR Service',
          desc: 'No US entity needed. TRST TRADING LLC acts as your Importer of Record and handles all CBP customs declarations.',
        },
        {
          icon: '📋',
          title: 'HTS Classification',
          desc: 'Our experts review every HTS code. Misclassification can trigger CBP penalties up to 4x the goods value.',
        },
        {
          icon: '💊',
          title: 'FDA Compliance',
          desc: 'From Prior Notice filing for food/cosmetics/medical devices to Import Alert response — we handle it all.',
        },
        {
          icon: '📊',
          title: 'Tariff Monitoring',
          desc: 'We monitor US tariff changes in real time and provide updated quotes and strategic guidance.',
        },
        {
          icon: '📄',
          title: 'LDP Quotation',
          desc: 'Accurate pre-shipment LDP cost breakdown including duties, MPF, HMF, and service fees for buyer negotiations.',
        },
        {
          icon: '🔍',
          title: 'KYC / OFAC',
          desc: 'Pre-shipment OFAC SDN list screening to eliminate sanctions risk before your goods ever leave the factory.',
        },
      ],
    },
    process: {
      title: 'How It Works',
      subtitle: '5 steps to a safe, compliant US import',
      steps: [
        { num: '01', title: 'Consultation', desc: 'Tell us about your product and export plan. Free initial consultation.' },
        { num: '02', title: 'KYC & Documents', desc: 'Complete OFAC screening and submit product information form.' },
        { num: '03', title: 'HTS & Quote', desc: 'Expert HTS review and accurate LDP cost quote within 2 business days.' },
        { num: '04', title: 'Duty Pre-payment', desc: 'Fund the estimated duty amount and we proceed with customs clearance.' },
        { num: '05', title: 'Clearance & Done', desc: 'CBP filing complete. We share real-time ACE portal status updates.' },
      ],
    },
    why: {
      title: 'Why TRST Risk Shield',
      items: [
        {
          icon: '🌏',
          title: 'Asian-Language Service',
          desc: 'Korean, English, and Chinese language support. No language barrier throughout the entire process.',
        },
        {
          icon: '🏛️',
          title: 'Real US Entity',
          desc: 'TRST TRADING LLC holds an EIN and has an established CBP Importer registration history.',
        },
        {
          icon: '⚕️',
          title: 'FDA Expertise',
          desc: 'Hands-on experience with FDA regulations for food, cosmetics, and medical devices.',
        },
        {
          icon: '💰',
          title: 'Transparent Pricing',
          desc: 'Duties are pre-funded by the client and paid on their behalf. No hidden fees. Quote = final cost.',
        },
      ],
    },
    cta: {
      title: 'Start Your US Export Before Section 122 Expires',
      subtitle: "No US entity needed. TRST TRADING LLC serves as your IOR.\nCalculate your free LDP cost estimate now.",
      btn: 'Calculate Free LDP Cost',
    },
    footer: {
      company: 'TRST TRADING LLC',
      tagline: 'LDP · IOR · FDA US Import Specialist',
      links: ['Services', 'About', 'Contact'],
      copy: '© 2026 TRST TRADING LLC. All rights reserved.',
      disclaimer: 'Tariff information on this site is for reference only. Actual rates are subject to CBP review.',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Fill out the form below and we will respond within 1 business day.',
      fields: {
        name: 'Contact Name',
        company: 'Company Name',
        email: 'Email Address',
        phone: 'Phone Number',
        product: 'Product Category',
        message: 'Message',
        submit: 'Send Message',
      },
      info: {
        title: 'Contact Information',
        email: 'Email',
        response: 'Response Time',
        responseVal: 'Within 1 business day',
        service: 'Service Area',
        serviceVal: 'All US Ports',
      },
    },
    about: {
      title: 'About TRST Risk Shield',
      subtitle: 'Your US IOR Partner in the Section 122 Era',
      story: {
        title: 'Our Story',
        body: `Following US tariff escalation (IEEPA → ruled unconstitutional, now replaced by Section 122), US buyers are increasingly demanding DDP/LDP terms, shifting import responsibility to Asian exporters.\n\nSMEs in Korea, China, Taiwan, and Vietnam without a US legal entity cannot act as Importer of Record — and risk losing US market access entirely.\n\nTRST Risk Shield was built on real logistics consulting and customs experience to help Asian exporters safely enter the US market through IOR, LDP, and FDA services.`,
      },
      expertise: {
        title: 'Our Expertise',
        items: [
          'CBP customs clearance & HTS classification',
          'FDA Prior Notice & Import Alert response',
          'OFAC sanctions screening',
          'KORUS FTA tariff optimization',
          'Korea, China, Taiwan, Vietnam exporter support',
          'Real-time US tariff monitoring',
        ],
      },
      entity: {
        title: 'Entity Information',
        items: [
          { label: 'Entity', value: 'TRST TRADING LLC' },
          { label: 'Location', value: 'United States' },
          { label: 'CBP Status', value: 'Established Importer Registration' },
          { label: 'Languages', value: 'Korean · English' },
        ],
      },
    },
  },
}

export type Translations = typeof translations.ko
