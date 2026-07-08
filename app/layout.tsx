import type { Metadata } from 'next'
import '../styles/globals.css'
import ClientLayout from '@/components/ClientLayout'
import Analytics from '@/components/Analytics'
import PageTracker from '@/components/PageTracker'

export const metadata: Metadata = {
  metadataBase: new URL('https://weflow-adminpage.vercel.app'),
  title: 'WEFLOW — 내가 진짜 원하는 페이지, 우리만의 플로우를 담다',
  description: '홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.',
  keywords: '홈페이지 제작, 랜딩페이지 제작, 광고 운영, 검색 상단 노출, 웹사이트 제작',
  icons: { icon: '/logo.png' },
  openGraph: {
    title: 'WEFLOW — 내가 진짜 원하는 페이지, 우리만의 플로우를 담다',
    description: '홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.',
    url: 'https://weflow-adminpage.vercel.app',
    siteName: 'WEFLOW',
    images: [{ url: '/images/main/og-admin-stats.png', width: 1122, height: 591 }],
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WEFLOW — 내가 진짜 원하는 페이지, 우리만의 플로우를 담다',
    description: '홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.',
    images: ['/images/main/og-admin-stats.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-scroll-behavior="smooth">
      <body>
        <ClientLayout>{children}</ClientLayout>
        <Analytics />
        <PageTracker />
      </body>
    </html>
  )
}
