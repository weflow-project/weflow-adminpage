'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { features } from '@/data/home'

const STATS = [
  { value: 100, suffix: '+', label: '성공 사례' },
  { value: 99, suffix: '%', label: '고객 만족도' },
  { value: 7, suffix: '일', label: '평균 제작' },
  { value: 24, suffix: 'h', label: '상시 상담' },
]

const FLOW_STEPS = [
  { title: '고객 의뢰',           desc: '업종·목표 상담' },
  { title: '접수 후 제작',         desc: '문의 구조 설계' },
  { title: '3~7일 배송 완료',      desc: '빠르게 납품' },
  { title: '광고 및 운영 사후 관리', desc: '지속 성장 지원' },
]

function useCountUp(target: number, duration = 1200, active: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return count
}

function StatItem({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCountUp(value, 1200, active)
  return (
    <div style={{ textAlign: 'center' }}>
      <div className="title-1 c-accent" style={{ lineHeight: 1 }}>
        {count}<span style={{ fontSize: '1rem' }}>{suffix}</span>
      </div>
      <div className="caption-1" style={{ marginTop: '0.3rem' }}>{label}</div>
    </div>
  )
}

function FeatureCard({ f, active, delay }: { f: typeof features[0]; active: boolean; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: hovered ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'default',
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(14px)',
        transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s, border-color 0.18s`,
      }}
    >
      {/* 이미지 */}
      <div style={{ position: 'relative', height: '110px', overflow: 'hidden', background: '#f3f4f6' }}>
        <Image
          src={f.image}
          alt={f.title}
          fill
          sizes="(min-width: 900px) 17vw, 50vw"
          style={{
            objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.35s ease',
          }}
        />
        {/* hover 시 파란 오버레이 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(51,115,223,0.18)' : 'transparent',
          transition: 'background 0.25s',
        }} />
      </div>

      {/* 텍스트 */}
      <div style={{ padding: '0.7rem 0.85rem' }}>
        <p className="footnote emphasized" style={{
          color: hovered ? 'var(--accent)' : 'var(--text)',
          margin: '0 0 0.15rem', wordBreak: 'keep-all',
          transition: 'color 0.18s',
        }}>{f.title}</p>
        <p className="caption-1" style={{ margin: 0, wordBreak: 'keep-all' }}>{f.desc}</p>
      </div>
    </div>
  )
}

function FlowStep({ s, i, active }: { s: typeof FLOW_STEPS[0]; i: number; active: boolean }) {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: '#fff',
      border: '1.5px solid var(--border)',
      borderRadius: '10px', padding: '0.85rem',
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(10px)',
      transition: `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`,
    }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '7px',
        background: 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '0.5rem',
      }}>
        <span className="caption-1 emphasized" style={{ color: '#fff' }}>0{i + 1}</span>
      </div>
      <p className="footnote emphasized" style={{ margin: '0 0 0.15rem', color: 'var(--text)', wordBreak: 'keep-all' }}>{s.title}</p>
      <p className="caption-1" style={{ margin: 0 }}>{s.desc}</p>
    </div>
  )
}

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [statsActive, setStatsActive] = useState(false)
  const [cardsActive, setCardsActive] = useState(false)
  const [flowActive, setFlowActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStatsActive(true)
        setTimeout(() => setCardsActive(true), 150)
        setTimeout(() => setFlowActive(true), 450)
        obs.disconnect()
      }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="benefits" style={{
      padding: 'clamp(2rem, 4vw, 3.5rem) 1.25rem', background: '#f9fafb',
      scrollSnapAlign: 'start', minHeight: 'calc(100vh - 64px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        {/* 헤더 */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <p className="caption-1 emphasized c-accent" style={{
            letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>WEFLOW CARE PLAN</p>
          <h2 className="title-1" style={{ marginBottom: '0.35rem' }}>WEFLOW만의 케어 플랜 혜택</h2>
          <p className="callout c-muted" style={{ marginTop: '0.5rem' }}>제작부터 운영·광고·관리까지 한 번에 해결합니다</p>
        </div>

        {/* 통계 바 */}
        <div className="reveal feat-stats" style={{ marginBottom: '1.25rem' }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ display: 'contents' }}>
              <StatItem value={s.value} suffix={s.suffix} label={s.label} active={statsActive} />
              {i < STATS.length - 1 && (
                <div className="feat-stat-divider" style={{ width: '1px', background: 'var(--border)', alignSelf: 'stretch', margin: '0.25rem 0' }} />
              )}
            </div>
          ))}
        </div>

        {/* 이미지 카드 6칸 */}
        <div className="feat-img-grid" style={{ marginBottom: '1.1rem' }}>
          {features.map((f, i) => (
            <FeatureCard key={i} f={f} active={cardsActive} delay={i * 0.07} />
          ))}
        </div>

        {/* 프로세스 플로우 화살표 */}
        <div className="feat-flow-row">
          {FLOW_STEPS.map((s, i) => (
            <div key={i} style={{ display: 'contents' }}>
              <FlowStep s={s} i={i} active={flowActive} />
              {i < FLOW_STEPS.length - 1 && (
                <div className="flow-arrow" style={{
                  flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: flowActive ? 1 : 0,
                  transition: `opacity 0.35s ease ${(i + 0.5) * 0.1}s`,
                }}>
                  <svg className="flow-arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .feat-stats {
          display: grid;
          grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr;
          align-items: center; justify-items: center;
          background: #fff; border: 1px solid var(--border);
          border-radius: 10px; padding: 1rem 1.5rem;
        }
        .feat-img-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0.65rem;
        }
        .feat-flow-row {
          display: flex; align-items: stretch; gap: 0.5rem;
        }
        @media (max-width: 900px) {
          .feat-img-grid { grid-template-columns: repeat(3, 1fr); }
          .feat-flow-row { flex-wrap: wrap; }
        }
        @media (max-width: 768px) {
          .feat-stats {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem; padding: 0.85rem;
          }
          .feat-stat-divider { display: none; }
        }
        @media (max-width: 480px) {
          .feat-img-grid { grid-template-columns: repeat(2, 1fr); }
          .feat-flow-row { flex-direction: column; }
          .flow-arrow { transform: rotate(90deg); }
        }
      `}</style>
    </section>
  )
}
