import type { Metadata } from 'next'
import '../styles/globals.css'
import ClientLayout from '@/components/ClientLayout'
import Analytics from '@/components/Analytics'
import PageTracker from '@/components/PageTracker'

export const metadata: Metadata = {
  title: 'WEFLOW — 문의로 이어지는 홈페이지를 만듭니다',
  description: '홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.',
  keywords: '홈페이지 제작, 랜딩페이지 제작, 광고 운영, 검색 상단 노출, 웹사이트 제작',
  icons: { icon: '/logo.png' },
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
