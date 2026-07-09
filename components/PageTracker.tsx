'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// 방문자 세션 ID — 탭이 열려있는 동안 유지 (sessionStorage)
function getSessionId(): string {
  const KEY = 'weflow_sid'
  let id = sessionStorage.getItem(KEY)
  if (!id) {
    id = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
    sessionStorage.setItem(KEY, id)
  }
  return id
}

// 추적 제외 여부 — 로컬 개발(localhost) + 본인 브라우저 opt-out
function trackingDisabled(): boolean {
  const host = window.location.hostname
  if (host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local')) return true
  return localStorage.getItem('weflow_notrack') === '1'
}

export default function PageTracker() {
  const pathname = usePathname()
  const current = useRef<{ id: string; entry: number; flushed: boolean } | null>(null)
  const maxScroll = useRef(0)

  // 관리자 페이지는 추적 제외
  const isAdmin = pathname?.startsWith('/admin')

  // 현재 스크롤 최대 도달률(%) 갱신
  const measureScroll = () => {
    const doc = document.documentElement
    const scrollable = doc.scrollHeight - window.innerHeight
    const pct = scrollable <= 0 ? 100 : Math.round(((window.scrollY || doc.scrollTop) / scrollable) * 100)
    const clamped = Math.max(0, Math.min(pct, 100))
    if (clamped > maxScroll.current) maxScroll.current = clamped
  }

  // 현재 페이지 체류시간 + 스크롤 도달률 전송 (fire-and-forget)
  const flush = () => {
    const c = current.current
    if (!c || c.flushed) return
    c.flushed = true
    measureScroll()
    const durationMs = Math.round(performance.now() - c.entry)
    const payload = JSON.stringify({ type: 'duration', id: c.id, durationMs, maxScroll: maxScroll.current })
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }))
    } else {
      fetch('/api/track', { method: 'POST', body: payload, headers: { 'Content-Type': 'application/json' }, keepalive: true })
    }
  }

  useEffect(() => {
    if (isAdmin) return

    // 개발/본인 방문 제외: URL 플래그(?notrack=1 / ?track=1)로 opt-out 토글
    const params = new URLSearchParams(window.location.search)
    if (params.get('notrack') === '1') localStorage.setItem('weflow_notrack', '1')
    if (params.get('track') === '1') localStorage.removeItem('weflow_notrack')
    if (trackingDisabled()) return

    // 이전 페이지 체류시간 마감 후 새 페이지용으로 스크롤 초기화
    flush()
    maxScroll.current = 0

    const body = {
      sessionId: getSessionId(),
      path: pathname,
      referrer: document.referrer,
      utmSource: params.get('utm_source') || '',
      utmMedium: params.get('utm_medium') || '',
      utmCampaign: params.get('utm_campaign') || '',
    }

    let active = true
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(r => r.json())
      .then(d => { if (active && d?.id) current.current = { id: d.id, entry: performance.now(), flushed: false } })
      .catch(() => {})

    return () => { active = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isAdmin])

  // 스크롤 최대 도달률 추적 (rAF 스로틀)
  useEffect(() => {
    if (isAdmin) return
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { measureScroll(); ticking = false })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin])

  // 탭 닫기 / 백그라운드 전환 시 체류시간 마감, 복귀 시 재측정
  useEffect(() => {
    const onHide = () => { if (document.visibilityState === 'hidden') flush() }
    const onShow = () => {
      const c = current.current
      if (c && document.visibilityState === 'visible') { c.entry = performance.now(); c.flushed = false }
    }
    document.addEventListener('visibilitychange', onHide)
    document.addEventListener('visibilitychange', onShow)
    window.addEventListener('pagehide', flush)
    return () => {
      document.removeEventListener('visibilitychange', onHide)
      document.removeEventListener('visibilitychange', onShow)
      window.removeEventListener('pagehide', flush)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
