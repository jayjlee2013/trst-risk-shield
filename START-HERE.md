# TRST Risk Shield 웹사이트 실행 가이드

## 1분 빠른 시작

### 1단계 — Node.js 설치 확인
터미널(PowerShell)을 열고:
```
node -v
```
버전이 나오면 OK. 없으면 https://nodejs.org 에서 LTS 버전 설치.

### 2단계 — 의존성 설치
```
cd "C:\Users\W!ndows !!\Desktop\LDP IOR 서비스\website"
npm install
```

### 3단계 — 개발 서버 실행
```
npm run dev
```

### 4단계 — 브라우저에서 확인
```
http://localhost:3000
```

---

## 페이지 구성

| 페이지 | URL |
|--------|-----|
| 홈 | http://localhost:3000 |
| 서비스 | http://localhost:3000/services |
| 소개 | http://localhost:3000/about |
| 문의 | http://localhost:3000/contact |

---

## Vercel 무료 배포 (공개 URL 만들기)

### 1단계 — GitHub 저장소 생성
```
cd "C:\Users\W!ndows !!\Desktop\LDP IOR 서비스\website"
git init
git add .
git commit -m "init: TRST Risk Shield website"
```
GitHub.com → New Repository → 비공개 저장소 생성 → push

### 2단계 — Vercel 연결
1. https://vercel.com 접속 → GitHub으로 로그인
2. "New Project" → GitHub 저장소 선택
3. "Deploy" 클릭 → 자동 빌드 및 배포

→ `https://trst-risk-shield.vercel.app` 형식의 무료 URL 발급

### 3단계 — 도메인 연결 (나중에)
Vercel 대시보드 → Domains → 구매한 도메인 입력

---

## 언어 전환

현재 코드는 페이지 기본값이 한국어(`ko`)로 설정되어 있습니다.
Header의 `EN` 버튼으로 영어로 전환됩니다.

---

## 수정이 필요한 항목

- `src/app/contact/page.tsx` → 이메일 주소 실제 주소로 변경
- `src/app/layout.tsx` → OG 이미지 및 메타 정보 업데이트
- 로고 이미지 추가 시 `public/` 폴더에 저장

---

## 디자인 색상

| 색상 | 코드 | 사용 위치 |
|------|------|---------|
| Navy 800 | #0f2744 | 헤더, 배경 |
| Gold 500 | #c9a84c | 강조, 버튼 |
| White | #ffffff | 카드, 본문 |
