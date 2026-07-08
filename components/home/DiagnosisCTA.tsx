'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Search, Palette, BarChart2, MessageSquare, CheckCircle, Clock, ShieldCheck, Star } from 'lucide-react'

const DIAGNOSIS_ITEMS = [
  { Icon: Search,        title: '문의 구조 진단',    desc: '어디서 이탈하는지 정확히 파악' },
  { Icon: Palette,       title: '디자인 신뢰도 점검', desc: '방문자가 느끼는 첫인상 분석' },
  { Icon: BarChart2,     title: '검색 노출 분석',    desc: '네이버·구글 상위 가능성 검토' },
  { Icon: MessageSquare, title: '문의 개선 제안',    desc: '구체적 전환 구조 개선안 제시' },
]

const PAIN_POINTS = [
  '홈페이지가 있는데 문의가 없어요',
  '방문자는 오는데 연락이 없어요',
  '경쟁사보다 검색에서 밀려요',
]

const TRUST = [
  { Icon: CheckCircle, text: '완전 무료' },
  { Icon: Clock,       text: '24시간 내 회신' },
  { Icon: ShieldCheck, text: '구독·결제 없음' },
  { Icon: Star,        text: '전문가 직접 분석' },
]

function useCountUp(target: number, duration: number, active: boolean) {
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

export default function DiagnosisCTA() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  const signupCount = useCountUp(47, 1600, active)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); obs.disconnect() }
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="diag-cta-section" style={{
      padding: 'clamp(2rem, 4vw, 3.5rem) 1.25rem', background: '#f9fafb',
      scrollSnapAlign: 'start', minHeight: 'calc(100vh - 64px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '820px', margin: '0 auto', width: '100%', textAlign: 'center' }}>

        {/* 소셜 프루프 */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
          background: '#ebf2ff', border: '1px solid #cdddf9',
          borderRadius: '9999px', padding: '0.3rem 0.9rem',
          marginBottom: '1.5rem',
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(8px)',
          transition: 'all 0.4s ease',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
          <span className="footnote emphasized c-accent">
            이번 달 <strong>{signupCount}</strong>명 무료 진단 신청완료
          </span>
        </div>

        {/* 헤드라인 */}
        <h2 className="title-1" style={{
          marginBottom: '0.85rem', wordBreak: 'keep-all',
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.45s ease 0.08s',
        }}>
          홈페이지 고민은 맡겨두고<br />
          <span className="c-accent">본업에 집중하세요</span>
        </h2>

        <p className="callout c-muted" style={{
          marginBottom: '1.5rem', wordBreak: 'keep-all',
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.45s ease 0.14s',
        }}>
          3분 진단으로 문제를 찾아드립니다. 완전 무료입니다.
        </p>

        {/* 페인 포인트 */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          justifyContent: 'center', marginBottom: '1.75rem',
          opacity: active ? 1 : 0, transition: 'opacity 0.45s ease 0.2s',
        }}>
          {PAIN_POINTS.map((p, i) => (
            <span key={i} className="footnote c-secondary" style={{
              background: '#fff', border: '1px solid var(--border)',
              padding: '0.28rem 0.8rem', borderRadius: '9999px',
            }}>· {p}</span>
          ))}
        </div>

        {/* 진단 항목 카드 */}
        <div className="diag-grid" style={{ marginBottom: '2rem' }}>
          {DIAGNOSIS_ITEMS.map(({ Icon, title, desc }, i) => (
            <div key={i} style={{
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '1rem 1.1rem',
              display: 'flex', alignItems: 'flex-start', gap: '0.8rem',
              textAlign: 'left',
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.4s ease ${0.25 + i * 0.07}s, transform 0.4s ease ${0.25 + i * 0.07}s`,
            }}>
              <div style={{
                width: '34px', height: '34px', flexShrink: 0, borderRadius: '8px',
                background: '#ebf2ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={16} color="var(--accent)" strokeWidth={2} />
              </div>
              <div>
                <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.18rem' }}>{title}</p>
                <p className="caption-1" style={{ margin: 0 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div style={{
          marginBottom: '0.85rem',
          opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 0.5s',
        }}>
          <Link href="/diagnosis" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2.5rem' }}>
            무료 진단 신청하기 →
          </Link>
        </div>

        <p className="footnote c-muted" style={{
          marginBottom: '1.75rem',
          opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 0.56s',
        }}>
          오늘 신청하면 24시간 내 전문가가 직접 회신합니다
        </p>

        {/* 트러스트 배지 */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '1.25rem',
          justifyContent: 'center', alignItems: 'center',
          paddingTop: '1.25rem', borderTop: '1px solid var(--border)',
          opacity: active ? 1 : 0, transition: 'opacity 0.4s ease 0.62s',
        }}>
          {TRUST.map(({ Icon, text }, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Icon size={13} color="var(--accent)" strokeWidth={2} />
              <span className="footnote c-muted">{text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .diag-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem;
        }
        @media (max-width: 480px) {
          .diag-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .diag-cta-section { min-height: auto !important; padding-top: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
