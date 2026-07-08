'use client'
import Script from 'next/script'

/**
 * GA4(Google Analytics 4) 로더.
 * .env.local 에 NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX 를 넣으면 자동으로 켜지고,
 * 값이 없으면(로컬/미설정) 아무것도 렌더하지 않는다.
 *
 * 유입 소스(카카오·네이버·인스타 등)와 이탈률은 GA4 대시보드
 * → 보고서 → 획득(Acquisition) / 참여도(Engagement)에서 확인.
 * 카카오 등 정확한 구분이 필요하면 링크에 UTM 태그를 붙일 것:
 *   https://도메인/?utm_source=kakao&utm_medium=social
 */
export default function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID
  if (!GA_ID) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
