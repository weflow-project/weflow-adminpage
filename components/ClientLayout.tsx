'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import PromoBanner from './PromoBanner'
import Navbar from './Navbar'
import Footer from './Footer'
import BottomBar from './BottomBar'
import SocialProofToast from './SocialProofToast'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  // 새로고침(F5) 시 브라우저의 스크롤 위치 복원을 끄고 맨 위로 이동
  // (단, /#benefits 같은 앵커로 직접 들어온 경우는 그대로 둠)
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }
  }, [])

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 201 }}>
        <PromoBanner />
        <Navbar />
      </div>
      <main style={{ paddingBottom: '56px' }}>{children}</main>
      <Footer />
      <BottomBar />
      <SocialProofToast />
    </>
  )
}
