'use client'
import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * 히어로 캐러셀과 동일한 동작의 범용 슬라이드.
 * count 장을 한 장씩 자동 전환(기본 3.5초) · 좌우 화살표 · 스와이프 · 하단 진행 바.
 * 실제 이미지가 확정되면 label 자리에 <img>를 넣는다.
 */
export default function SlideCarousel({
  count,
  label = '이미지',
  aspectRatio = '16 / 9',
  maxWidth = '960px',
  interval = 3500,
}: {
  count: number
  label?: string
  aspectRatio?: string
  maxWidth?: string
  interval?: number
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const go = (i: number) => setIndex((i + count) % count)
  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setIndex(i => (i + 1) % count), interval)
    return () => clearTimeout(id)
  }, [index, paused, count, interval])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 40) (delta < 0 ? next : prev)()
    touchStartX.current = null
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth,
        margin: '0 auto',
        aspectRatio,
        borderRadius: 'var(--radius-2xl)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
      }}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
    >
      {/* 슬라이드 트랙 */}
      <div
        style={{
          display: 'flex',
          height: '100%',
          transform: `translateX(-${index * 100}%)`,
          transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        {Array.from({ length: count }, (_, i) => (
          <div
            key={i}
            aria-hidden={i !== index}
            style={{
              flex: '0 0 100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              fontWeight: 600,
            }}
          >
            {`${label} ${i + 1}`}
          </div>
        ))}
      </div>

      {/* 좌우 화살표 */}
      <button
        type="button"
        onClick={prev}
        aria-label="이전 이미지"
        className="hero-carousel-arrow"
        style={{ left: '0.75rem' }}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="다음 이미지"
        className="hero-carousel-arrow"
        style={{ right: '0.75rem' }}
      >
        <ChevronRight size={20} />
      </button>

      {/* 하단 진행 바 */}
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={count}
        aria-valuenow={index + 1}
        aria-label="이미지 진행 상태"
        style={{
          position: 'absolute',
          bottom: '0.9rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(120px, 30%, 200px)',
          height: '6px',
          borderRadius: '9999px',
          background: 'rgba(11,18,32,0.18)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${100 / count}%`,
            height: '100%',
            borderRadius: '9999px',
            background: 'var(--accent)',
            transform: `translateX(${index * 100}%)`,
            transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
    </div>
  )
}
