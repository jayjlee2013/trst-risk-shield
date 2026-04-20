# TRST Risk Shield — 프로젝트 지침서

## 서비스 개요
- **브랜드명**: TRST Risk Shield
- **법인명**: TRST TRADING LLC (화면에 표시 금지 — 저작권·메타데이터 제외)
- **핵심 서비스**: IOR (Importer of Record) 대행, LDP 견적, HTS 분류, FDA 대응, 관세 모니터링
- **타깃**: 미국 법인 없이 미국 수출을 원하는 한국·중국·대만·베트남 기업
- **핵심 메시지**: "미국 법인 없어도 미국으로 수출할 수 있습니다"

## 기술 스택
- Next.js 15 (App Router)
- TypeScript + Tailwind CSS
- i18n: `src/lib/i18n.ts` — KO/EN 번역 오브젝트 (모든 텍스트 여기서 관리)
- 기본 언어: **영어 (EN)** (`src/lib/lang-context.tsx`)
- 배포: Vercel (`trst-risk-shield.vercel.app`)
- GitHub: `jayjlee2013/trst-risk-shield` (main 브랜치)

## 배포 방법
```bash
cd C:/trst-website
npx vercel --prod --yes
```
- Vercel 인증: `C:/Users/W!ndows !!/AppData/Roaming/com.vercel.cli/Data/auth.json` (자동 갱신)
- GitHub push 후 Vercel 자동 배포는 느림 → CLI 직접 배포 권장
- 프레임워크: `nextjs` (API로 설정 완료 — 변경 금지)

## 페이지 구조
| 경로 | 설명 | 상태 |
|------|------|------|
| `/` | 홈 (IOR 퍼널) | 활성 |
| `/calculator` | LDP 비용 계산기 | 활성 |
| `/services` | 서비스 상세 | 활성 |
| `/about` | 회사 소개 | 활성 |
| `/contact` | 문의 폼 | 활성 |
| `/kyc` | OFAC 스크리닝 | **비활성** (네비·사이트맵 제외, 페이지는 존재) |

## 브랜딩 원칙
- "TRST TRADING LLC"는 화면에 표시하지 않음 (저작권 표기·메타데이터는 예외)
- "Section 122 만료 전에 준비하라" 류의 긴급성 메시지 사용 금지 (논리 오류)
- Section 122 10% 부과금은 관세 사실 정보로만 표기 (stats 섹션)
- KYC/OFAC는 현재 숨김 처리 — 나중에 네비에 링크 추가만 하면 활성화 가능

## SNS
- X(Twitter): [@TrstRiskShield](https://x.com/TrstRiskShield)
- 사이트 푸터에 링크 포함

## 일 시작 전 체크리스트
1. 이 파일 읽기
2. 변경 범위 파악 — 3개 파일 이상이면 플랜 먼저
3. 텍스트 변경은 `src/lib/i18n.ts`에서 KO/EN 동시에
4. 배포 전 로컬 빌드 오류 없는지 확인
5. 배포 후 주요 페이지 HTTP 200 확인

## 전문가 고용 기준
- 브라우저 자동화 (X 포스팅 등): 글자수·제약 먼저 파악 후 실행
- 복잡한 태스크: 계획 → 전문가/도구 확인 → 실행 순서 준수
- 실수 발생 시 변명 없이 즉시 수정
