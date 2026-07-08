// 사이트 유형 — 고객사 배포마다 지정.
//   'multi'   : 다중 페이지 홈페이지 → 이탈률 + 스크롤 도달률 모두 표시
//   'landing' : 랜딩페이지·랜딩형 홈페이지(단일) → 이탈률 숨기고 스크롤 도달률만
// 배포 시 .env(.local) 또는 호스팅 환경변수에 NEXT_PUBLIC_SITE_TYPE=landing 을 넣으면 랜딩 모드.
export type SiteType = 'landing' | 'multi'

export const SITE_TYPE: SiteType =
  process.env.NEXT_PUBLIC_SITE_TYPE === 'landing' ? 'landing' : 'multi'
