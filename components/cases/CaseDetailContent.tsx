'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, MapPin, Phone, Clock, ArrowDown } from 'lucide-react'
import { cases, caseImagePath } from '@/data/cases'
import type { CaseDetail } from '@/data/cases'

type Props = { c: CaseDetail; imageSrc: string; slug: string }

function highlightNumbers(text: string) {
  return text.split(/(\d+(?:\.\d+)?)/).map((part, i) =>
    /^\d+(\.\d+)?$/.test(part)
      ? <span key={i} style={{ color: 'var(--accent)', fontWeight: 900 }}>{part}</span>
      : part
  )
}

const SERVICE_CARDS = [
  { title: '1:1 맞춤 상담', desc: '고객의 상황에 맞는 맞춤형 상담을 제공합니다.' },
  { title: '전문 서비스', desc: '검증된 노하우와 시스템으로 만족도 높은 결과를 제공합니다.' },
  { title: '체계적인 관리', desc: '이용 후에도 꾸준한 관리와 피드백으로 챙겨드립니다.' },
]

const PRICE_TIERS = [
  { name: '베이직', price: '₩50,000~', desc: '처음 이용하시는 분들을 위한 기본 패키지' },
  { name: '스탠다드', price: '₩120,000~', desc: '가장 많이 찾는 표준 패키지' },
  { name: '프리미엄', price: '₩250,000~', desc: '1:1 집중 케어와 추가 혜택을 제공하는 패키지' },
]

export default function CaseDetailContent({ c, imageSrc, slug }: Props) {
  const [imgError, setImgError] = useState(false)

  const related = cases
    .filter(r => r.slug !== slug)
    .sort((a, b) => (b.category === c.category ? 1 : 0) - (a.category === c.category ? 1 : 0))
    .slice(0, 3)

  return (
    <div style={{ background: '#f3f4f6', minHeight: '100vh' }}>

      {/* ── 헤더 ── */}
      <div style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '2.25rem 1.5rem 2rem' }}>
          <Link href="/cases" className="footnote c-muted" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
            textDecoration: 'none',
            marginBottom: '1.25rem',
          }}>
            <ArrowLeft size={13} /> 성공사례 목록
          </Link>
          <p className="caption-2 emphasized c-accent" style={{
            letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.5rem',
          }}>WEFLOW 제작 사례</p>
          <h1 className="title-1" style={{
            margin: '0 0 0.6rem', wordBreak: 'keep-all',
          }}>{c.name} 홈페이지 제작 사례</h1>
          <p className="subhead c-muted" style={{ margin: '0 0 0.5rem', lineHeight: 1.7, wordBreak: 'keep-all' }}>
            WEFLOW가 {c.name} 업종에 최적화된 체계적인 홈페이지를 제작합니다.
          </p>
          <p className="caption-1" style={{ color: '#b0a99f', margin: 0 }}>
            실제 성과 정보가 아닌 디자인 참고 목적입니다
          </p>
        </div>
      </div>

      {/* ── 컨텐츠 ── */}
      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>

        {/* 브라우저 목업 */}
        <div style={{
          background: '#fff', borderRadius: '14px', overflow: 'hidden',
          border: '1px solid var(--border)', marginBottom: '1.25rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          {/* 브라우저 크롬 */}
          <div style={{
            background: '#f3f4f6', borderBottom: '1px solid var(--border)',
            padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem',
          }}>
            <div style={{ display: 'flex', gap: '0.38rem' }}>
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
            </div>
            <div style={{
              flex: 1, background: '#e5e7eb', borderRadius: '6px',
              padding: '0.28rem 0.75rem', fontSize: '0.72rem', color: '#a09890',
              letterSpacing: '0.01em',
            }}>
              www.{slug}.co.kr
            </div>
          </div>
          {/* 이미지 */}
          <div style={{ position: 'relative', width: '100%', paddingTop: '52%' }}>
            <Image
              src={imgError ? '/images/cases/placeholder.jpg' : imageSrc}
              alt={`${c.name} 홈페이지 제작 사례`}
              fill sizes="(min-width: 780px) 748px, 100vw"
              style={{ objectFit: 'cover' }}
              onError={() => setImgError(true)}
            />
          </div>
        </div>

        {/* 서비스 안내 */}
        <div style={{
          background: '#fff', borderRadius: '14px', overflow: 'hidden',
          border: '1px solid var(--border)', marginBottom: '1.25rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <div style={{ padding: '1.5rem 1.75rem 1rem' }}>
            <h2 className="headline" style={{ margin: 0 }}>서비스 안내</h2>
          </div>
          <div className="svc-cards">
            {SERVICE_CARDS.map(s => (
              <div key={s.title} style={{
                border: '1px solid var(--border)', borderRadius: '10px',
                padding: '1.1rem 1.15rem',
              }}>
                <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.4rem' }}>{s.title}</p>
                <p className="footnote c-muted" style={{ margin: 0, lineHeight: 1.65, wordBreak: 'keep-all' }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ height: '1.5rem' }} />
        </div>

        {/* 이용 요금 */}
        <div style={{
          background: '#f3f4f6', borderRadius: '14px', overflow: 'hidden',
          border: '1px solid var(--border)', marginBottom: '1.25rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <div style={{ padding: '1.5rem 1.75rem 1rem' }}>
            <h2 className="headline" style={{ margin: 0 }}>이용 요금</h2>
          </div>
          <div className="price-cards">
            {PRICE_TIERS.map(t => (
              <div key={t.name} style={{
                background: '#fff', border: '1px solid var(--border)', borderRadius: '10px',
                padding: '1.1rem 1.15rem',
              }}>
                <p className="caption-1 emphasized c-accent" style={{ margin: '0 0 0.3rem' }}>{t.name}</p>
                <p className="title-3 emphasized c-primary" style={{ margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>{t.price}</p>
                <p className="footnote c-muted" style={{ margin: 0, lineHeight: 1.6, wordBreak: 'keep-all' }}>{t.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ height: '1.5rem' }} />
        </div>

        {/* 제작 성과 */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 className="headline" style={{ margin: '0 0 1.25rem' }}>제작 성과</h2>

          {/* BEFORE — 문제 */}
          <div className="perf-card">
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="caption-2 emphasized c-muted" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>문제</p>
              <p className="callout c-secondary" style={{ margin: 0, lineHeight: 1.9, wordBreak: 'keep-all' }}>{c.challenge}</p>
            </div>
            <div className="perf-img perf-img--pain">
              <Image src="/images/cases/painpoint.png" alt="문제" fill sizes="(max-width:600px) 100vw, 120px" style={{ objectFit: 'contain' }} />
            </div>
          </div>

          {/* 화살표 */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.6rem 0' }}>
            <ArrowDown size={14} color="var(--border)" strokeWidth={2} />
          </div>

          {/* 솔루션 카드 */}
          <div className="perf-card perf-card--sol">
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="caption-2 emphasized c-accent" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>솔루션</p>
              <p className="callout c-secondary" style={{ margin: 0, lineHeight: 1.9, wordBreak: 'keep-all' }}>{c.solution}</p>
            </div>
            <div className="perf-img perf-img--sol">
              <Image src="/images/cases/sol.png" alt="솔루션" fill sizes="(max-width:600px) 100vw, 130px" style={{ objectFit: 'cover' }} />
            </div>
          </div>

          {/* 화살표 */}
          <div style={{ display: 'flex', justifyContent: 'center', padding: '0.6rem 0' }}>
            <ArrowDown size={14} color="var(--border)" strokeWidth={2} />
          </div>

          {/* AFTER — 결과 */}
          <div className="perf-card perf-card--result">
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="caption-2 emphasized c-accent" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>결과</p>
              <p className="headline emphasized c-primary" style={{ margin: 0, lineHeight: 1.75, wordBreak: 'keep-all' }}>{highlightNumbers(c.result)}</p>
            </div>
            <div className="perf-img perf-img--result">
              <Image src="/images/cases/result.jpeg" alt="결과" fill sizes="(max-width:600px) 100vw, 150px" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        {/* 고객 후기 */}
        <div style={{
          background: '#fff', borderRadius: '14px', overflow: 'hidden',
          border: '1px solid var(--border)', marginBottom: '1.25rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <div style={{ padding: '1.5rem 1.75rem 1rem' }}>
            <h2 className="headline" style={{ margin: 0 }}>고객 후기</h2>
          </div>
          <div style={{ padding: '0 1.75rem 1.75rem' }}>
            <div style={{
              border: '1px solid var(--border)', borderRadius: '10px', padding: '1.15rem 1.25rem',
              display: 'inline-block', width: '100%', maxWidth: '320px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#f59e0b', fontSize: '0.82rem' }}>★★★★★</span>
                <span className="footnote semibold c-muted">별다섯!</span>
              </div>
              <p className="subhead c-primary" style={{ margin: '0 0 0.6rem', lineHeight: 1.7, wordBreak: 'keep-all' }}>
                수정 요청도 빠르게 처리해주셔서 만족합니다.
              </p>
              <p className="footnote c-muted" style={{ margin: 0 }}>— OO {c.name} 대표</p>
            </div>
          </div>
        </div>

        {/* 비즈니스 정보 */}
        <div style={{
          background: '#fff', borderRadius: '14px', overflow: 'hidden',
          border: '1px solid var(--border)', marginBottom: '1.75rem',
          boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
        }}>
          <div style={{ padding: '1.5rem 1.75rem' }}>
            <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.85rem' }}>{c.name}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {[
                { Icon: MapPin,  text: '서울특별시 강남구 테헤란로 000' },
                { Icon: Phone,   text: '02-000-0000' },
                { Icon: Clock,   text: '매일 10:00 - 22:00' },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                  <Icon size={13} color="var(--text-muted)" />
                  <span className="footnote c-muted">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <p className="subhead c-muted" style={{ margin: '0 0 1rem', wordBreak: 'keep-all' }}>
            {c.name}에 꼭 맞는 홈페이지가 필요하신가요?
          </p>
          <Link href="/diagnosis" className="subhead emphasized" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--accent)', color: '#fff',
            padding: '0.85rem 2rem', borderRadius: '9999px',
            textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(51,115,223,0.35)',
          }}>
            무료 진단 후 견적받기 →
          </Link>
        </div>

        {/* 관련 사례 */}
        {related.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 className="subhead emphasized c-secondary" style={{ margin: 0 }}>관련 성공사례</h3>
              <Link href="/cases" className="footnote semibold c-accent" style={{ textDecoration: 'none' }}>전체보기 →</Link>
            </div>
            <div className="related-grid">
              {related.map(r => (
                <Link key={r.slug} href={`/cases/${r.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: '#fff', borderRadius: '12px', overflow: 'hidden',
                    border: '1px solid var(--border)',
                    boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
                  }}>
                    <div style={{ position: 'relative', height: '100px', overflow: 'hidden' }}>
                      <Image src={caseImagePath(r.slug)} alt={r.name} fill sizes="260px" style={{ objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.12)' }} />
                    </div>
                    <div style={{ padding: '0.75rem 0.9rem' }}>
                      <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.15rem' }}>{r.name}</p>
                      <p className="footnote c-muted" style={{ margin: 0 }}>{r.category}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .svc-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          padding: 0 1.75rem;
        }
        .price-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          padding: 0 1.75rem;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }
        .perf-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.4rem 1.5rem;
          display: flex;
          gap: 1.25rem;
          align-items: center;
        }
        .perf-card--sol    { background: #fff; }
        .perf-card--result { border: 1.5px solid var(--accent); }
        .perf-img {
          flex-shrink: 0;
          position: relative;
        }
        .perf-img--pain   { width: 120px; height: 120px; }
        .perf-img--sol    { width: 130px; height: 110px; border-radius: 10px; overflow: hidden; }
        .perf-img--result { width: 150px; height: 110px; border-radius: 10px; overflow: hidden; }
        @media (max-width: 600px) {
          .perf-card { flex-direction: column; align-items: stretch; }
          .perf-img--pain   { width: 100%; height: 180px; }
          .perf-img--sol    { width: 100%; height: 160px; }
          .perf-img--result { width: 100%; height: 160px; }
        }
        @media (max-width: 600px) {
          .svc-cards { grid-template-columns: 1fr; }
          .price-cards { grid-template-columns: 1fr; }
          .related-grid { grid-template-columns: repeat(2, 1fr); }
          .result-cards { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  )
}
