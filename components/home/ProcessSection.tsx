'use client'
import { useEffect, useRef, useState } from 'react'
import { processSections, sixSteps } from '@/data/home'

function TimelineStep({
  num,
  title,
  desc,
  isLast,
  active,
  delay,
}: {
  num: string
  title: string
  desc?: string
  isLast: boolean
  active: boolean
  delay: number
}) {
  return (
    <div style={{
      display: 'flex', gap: '0.85rem',
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(10px)',
      transition: `opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
    }}>
      {/* 왼쪽: 번호 + 커넥터 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '30px', height: '30px', borderRadius: '50%',
          background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }} className="caption-2 emphasized">{num}</div>
        {!isLast && (
          <div style={{ width: '2px', flex: 1, minHeight: '20px', background: '#e5e7eb', margin: '4px 0' }} />
        )}
      </div>
      {/* 오른쪽: 텍스트 */}
      <div style={{ paddingTop: '0.3rem', paddingBottom: isLast ? 0 : '1.1rem', minWidth: 0 }}>
        <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.15rem', wordBreak: 'keep-all' }}>{title}</p>
        {desc && <p className="caption-1" style={{ margin: 0, wordBreak: 'keep-all' }}>{desc}</p>}
      </div>
    </div>
  )
}

function ProcessCard({
  label,
  title,
  steps,
  active,
  baseDelay,
}: {
  label: string
  title: string
  steps: { num: string; title: string; desc?: string }[]
  active: boolean
  baseDelay: number
}) {
  return (
    <div style={{
      background: '#fff', border: '1.5px solid var(--border)',
      borderRadius: '14px', overflow: 'hidden',
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(14px)',
      transition: 'opacity 0.45s ease, transform 0.45s ease',
    }}>
      {/* 헤더 */}
      <div style={{
        padding: '0.9rem 1.25rem',
        borderBottom: '1.5px solid var(--border)',
        background: '#f9fafb',
        display: 'flex', alignItems: 'center', gap: '0.6rem',
      }}>
        <div className="caption-2 emphasized" style={{
          background: 'var(--accent)', borderRadius: '6px',
          padding: '0.2rem 0.55rem', color: '#fff',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>{label}</div>
        <p className="callout emphasized c-primary" style={{ margin: 0 }}>{title}</p>
      </div>
      {/* 타임라인 */}
      <div style={{ padding: '1.25rem 1.25rem 1rem' }}>
        {steps.map((s, i) => (
          <TimelineStep
            key={i}
            num={s.num}
            title={s.title}
            desc={s.desc}
            isLast={i === steps.length - 1}
            active={active}
            delay={baseDelay + i * 0.07}
          />
        ))}
      </div>
    </div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); obs.disconnect() }
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const process4 = processSections.map((p, i) => ({
    num: String(i + 1).padStart(2, '0'),
    title: p.step,
    desc: p.desc,
  }))
  const process6 = sixSteps.map(s => ({ num: s.num, title: s.title, desc: s.desc }))

  return (
    <section ref={sectionRef} style={{
      padding: 'clamp(2rem, 4vw, 3.5rem) 1.25rem', background: '#f9fafb',
      scrollSnapAlign: 'start', minHeight: 'calc(100vh - 64px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>

        <div className="reveal" style={{ marginBottom: '1.5rem' }}>
          <p className="caption-1 emphasized c-accent" style={{
            letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.4rem',
          }}>HOW WE WORK</p>
          <h2 className="title-1" style={{ marginBottom: '0.3rem' }}>제작 진행 과정</h2>
          <p className="callout c-muted" style={{ marginTop: '0.4rem' }}>상담부터 운영까지, 모든 단계를 체계적으로 진행합니다</p>
        </div>

        <div className="proc-two-col">
          <ProcessCard
            label="PROCESS"
            title="제작 진행 과정"
            steps={process4}
            active={active}
            baseDelay={0.05}
          />
          <ProcessCard
            label="6-STEP"
            title="6단계 제작 프로세스"
            steps={process6}
            active={active}
            baseDelay={0.15}
          />
        </div>
      </div>

      <style>{`
        .proc-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .proc-two-col {
            grid-template-columns: 1fr;
            gap: 0.85rem;
          }
        }
      `}</style>
    </section>
  )
}
