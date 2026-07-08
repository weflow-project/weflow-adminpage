'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SLIDES = Array.from({ length: 10 }, (_, i) => ({
  src: `/images/main/main-hero-${String(i + 1).padStart(2, '0')}.png`,
  label: `대표 이미지 ${i + 1}`,
}))
const COUNT = SLIDES.length
const INTERVAL = 3000

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const go = (i: number) => setIndex((i + COUNT) % COUNT)
  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  // 3초 자동 전환 (수동 조작/호버 시 타이머 리셋·정지)
  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => setIndex(i => (i + 1) % COUNT), INTERVAL)
    return () => clearTimeout(id)
  }, [index, paused])

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
        maxWidth: '960px',
        margin: 'clamp(2.5rem, 6vw, 4rem) auto 0',
        aspectRatio: '16 / 9',
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        background: 'var(--bg-secondary)',
      }}
      role="group"
      aria-roledescription="carousel"
      aria-label="대표 이미지"
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
        {SLIDES.map((s, i) => (
          <div
            key={i}
            aria-hidden={i !== index}
            style={{
              flex: '0 0 100%',
              height: '100%',
              position: 'relative',
              background: 'var(--bg-secondary)',
            }}
          >
            <Image
              src={s.src}
              alt={s.label}
              fill
              sizes="(max-width: 960px) 100vw, 960px"
              style={{ objectFit: 'cover' }}
              priority={i === 0}
            />
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

      {/* 하단 진행 바 — 슬라이드 위치에 따라 인디케이터 이동 (개수 비노출) */}
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={COUNT}
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
            width: `${100 / COUNT}%`,
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
