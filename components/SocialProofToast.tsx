'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ITEMS = [
  { area: '강남', biz: '필라테스 센터', action: '무료 진단을 신청했습니다' },
  { area: '홍대', biz: '카페', action: '홈페이지 제작을 의뢰했습니다' },
  { area: '분당', biz: '공인중개사', action: '무료 진단을 신청했습니다' },
  { area: '인천', biz: '네일샵', action: '제작 상담을 문의했습니다' },
  { area: '수원', biz: '인테리어 업체', action: '무료 진단을 신청했습니다' },
  { area: '마포', biz: '피부관리샵', action: '제작 상담을 문의했습니다' },
  { area: '강서', biz: '보험 설계사', action: '홈페이지 제작을 의뢰했습니다' },
  { area: '송파', biz: '웨딩스냅 작가', action: '무료 진단을 신청했습니다' },
  { area: '부천', biz: 'PT 트레이너', action: '무료 진단을 신청했습니다' },
  { area: '일산', biz: '입시학원', action: '제작 상담을 문의했습니다' },
]

// 0(포함)~max(미포함) 사이 정수
const randInt = (max: number) => Math.floor(Math.random() * max)

// 현재 시각 기준 "방금 전 / N분 전" 라벨을 랜덤 생성 (최근 ~28분 이내)
function randomTimeLabel() {
  const min = randInt(28) // 0~27
  return min < 1 ? '방금 전' : `${min}분 전`
}


export default function SocialProofToast() {
  const [visible, setVisible] = useState(false)
  const [idx, setIdx] = useState(0)
  const [timeLabel, setTimeLabel] = useState('방금 전')
  const [mounted, setMounted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const idxRef = useRef(0)
  const [side, setSide] = useState<'left' | 'right'>('left')
  const sideRef = useRef<'left' | 'right'>('right') // 첫 노출 시 'left'가 되도록 반대로 시작

  // 직전과 겹치지 않는 랜덤 항목을 골라 노출
  const showRandom = () => {
    let next = randInt(ITEMS.length)
    if (ITEMS.length > 1) {
      while (next === idxRef.current) next = randInt(ITEMS.length)
    }
    idxRef.current = next
    setIdx(next)
    // 나타날 때마다 좌우 번갈아
    sideRef.current = sideRef.current === 'left' ? 'right' : 'left'
    setSide(sideRef.current)
    setTimeLabel(randomTimeLabel())
    setVisible(true)
  }

  useEffect(() => {
    setMounted(true)
    // 첫 알림: 8~14초 후 랜덤
    timerRef.current = setTimeout(showRandom, 8000 + randInt(6000))
    return () => clearTimeout(timerRef.current)
  }, [])

  // 토스트가 보이면 5초 후 숨김
  useEffect(() => {
    if (!visible) return
    const hideTimer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(hideTimer)
  }, [visible, idx])

  // 숨겨지면 25~40초 후 다음 랜덤 알림
  useEffect(() => {
    if (!mounted || visible) return
    timerRef.current = setTimeout(showRandom, 25000 + randInt(15000))
    return () => clearTimeout(timerRef.current)
  }, [visible, mounted])

  if (!mounted) return null

  const item = ITEMS[idx]

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '72px',
        ...(side === 'left' ? { left: '1rem' } : { right: '1rem' }),
        zIndex: 190,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.96)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.34,1.3,0.64,1), opacity 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
        maxWidth: 'min(280px, calc(100vw - 2rem))',
      }}
    >
      <div style={{
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: '14px',
        padding: '0.85rem 1rem',
        boxShadow: '0 6px 24px rgba(0,0,0,0.09)',
        display: 'flex',
        gap: '0.7rem',
        alignItems: 'flex-start',
      }}>
        {/* WEFLOW 아이콘 */}
        <div style={{
          width: '38px', height: '38px', borderRadius: '50%', flexShrink: 0,
          background: '#ebf2ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <Image src="/logo.png" alt="WEFLOW" width={26} height={26} style={{ objectFit: 'contain' }} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="caption-1 emphasized c-primary" style={{ margin: '0 0 0.15rem', lineHeight: 1.4 }}>
            {item.area} {item.biz}
          </p>
          <p className="caption-2 c-muted" style={{ margin: '0 0 0.45rem', lineHeight: 1.4 }}>
            {item.action} · <span className="semibold c-accent">{timeLabel}</span>
          </p>
          <Link href="/diagnosis" className="caption-2 emphasized c-accent" style={{
            display: 'inline-block',
            textDecoration: 'none',
            background: '#ebf2ff',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
          }}>
            나도 신청하기 →
          </Link>
        </div>

        <button
          onClick={() => setVisible(false)}
          aria-label="닫기"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--text-muted)', fontSize: '0.78rem',
            padding: '0', flexShrink: 0, lineHeight: 1, marginTop: '1px',
          }}
        >✕</button>
      </div>
    </div>
  )
}
