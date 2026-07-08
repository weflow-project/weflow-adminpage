'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    if (pathname.startsWith('/admin')) return

    const hasIntent = () => !!sessionStorage.getItem('weflow_form_intent')

    // ── 뒤로가기 트랩 ──
    // 입력 흔적이 있으면 가짜 history 항목을 1개 넣어둔다.
    // 뒤로가기를 누르면 이 항목이 빠지면서 popstate가 발생 → 페이지를 떠나지 않고 모달만 띄움.
    let armedHref: string | null = null
    const arm = () => {
      if (armedHref) return // 중복 무장 방지 (입력할 때마다 호출되므로)
      armedHref = window.location.href
      window.history.pushState(window.history.state, '', armedHref)
    }

    const onPopState = () => {
      if (hasIntent()) {
        // 못 떠나게 다시 고정 + 모달 표시
        window.history.pushState(window.history.state, '', window.location.href)
        setVisible(true)
      } else if (armedHref && window.location.href === armedHref) {
        // 더 막을 필요 없음(완료/초기화) → 남은 가짜 항목 정리하고 실제 뒤로가기 진행
        window.history.back()
      }
    }

    // 데스크탑: 마우스가 주소창 쪽으로 빠질 때
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 4 && hasIntent()) setVisible(true)
    }

    const onIntent = () => arm()

    if (hasIntent()) arm() // 다른 페이지에서 이미 입력하고 넘어온 경우
    window.addEventListener('weflow-intent', onIntent)
    window.addEventListener('popstate', onPopState)

    // 3초 후부터 마우스 이탈 감지 (로드 직후 오작동 방지)
    const t = setTimeout(() => {
      document.addEventListener('mouseleave', onMouseLeave)
    }, 3000)

    return () => {
      clearTimeout(t)
      window.removeEventListener('weflow-intent', onIntent)
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [pathname])

  if (!mounted || !visible) return null

  return (
    <>
      {/* 오버레이 */}
      <div
        onClick={() => setVisible(false)}
        style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(0,0,0,0.45)',
          animation: 'overlay-in 0.25s ease',
        }}
      />

      {/* 팝업 */}
      <div style={{
        position: 'fixed', zIndex: 301,
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(440px, calc(100vw - 2rem))',
        background: '#fff', borderRadius: '20px',
        padding: '2rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
        animation: 'popup-in 0.3s cubic-bezier(0.34,1.2,0.64,1)',
        textAlign: 'center',
      }}>
        <button
          onClick={() => setVisible(false)}
          aria-label="닫기"
          style={{
            position: 'absolute', top: '1rem', right: '1rem',
            background: '#f3f4f6', border: 'none', borderRadius: '50%',
            width: '28px', height: '28px', cursor: 'pointer',
            fontSize: '0.8rem', color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >✕</button>

        {/* 배지 */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
          background: '#ebf2ff', border: '1px solid #cdddf9',
          borderRadius: '9999px', padding: '0.3rem 0.85rem',
          color: 'var(--accent)',
          marginBottom: '1.1rem',
        }} className="caption-1 emphasized">
          ⚡ 잠깐, 가시기 전에
        </div>

        <h2 className="title-3 emphasized" style={{
          lineHeight: 1.35,
          marginBottom: '0.75rem', wordBreak: 'keep-all',
        }}>
          홈페이지 때문에<br />고민하고 계신가요?
        </h2>

        <p className="subhead c-muted" style={{
          lineHeight: 1.75, marginBottom: '1.5rem', wordBreak: 'keep-all',
        }}>
          5분 무료 진단으로 우리 업종에 맞는<br />제작 방향을 먼저 확인해보세요.
          <br />
          <span className="footnote semibold c-accent">
            ✓ 비용 없음 &nbsp;✓ 부담 없음 &nbsp;✓ 전문가 1:1 안내
          </span>
        </p>

        <Link
          href="/diagnosis"
          onClick={() => setVisible(false)}
          style={{
            display: 'block',
            background: 'var(--accent)', color: '#fff',
            textDecoration: 'none',
            padding: '0.9rem', borderRadius: '12px',
            marginBottom: '0.75rem',
          }}
          className="subhead emphasized"
        >
          5분 무료 진단 신청하기 →
        </Link>

        <button
          onClick={() => setVisible(false)}
          className="footnote c-muted"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
          }}
        >
          괜찮아요, 그냥 둘러볼게요
        </button>
      </div>

      <style>{`
        @keyframes overlay-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popup-in {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 16px)) scale(0.95); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
  )
}
