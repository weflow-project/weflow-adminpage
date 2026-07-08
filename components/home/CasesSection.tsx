'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cases, caseImagePath, Case } from '@/data/cases'

const PREVIEW_SLUGS = ['pt-shop', 'pilates', 'insurance', 'car-detailing', 'tax']
const GRID_H = 360

function CaseImgCard({ c, featured = false }: { c: Case; featured?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      href={`/cases/${c.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative', overflow: 'hidden', display: 'block',
        height: '100%', borderRadius: '10px', textDecoration: 'none',
        border: hovered ? `1.5px solid ${c.color}` : '1px solid var(--border)',
        transition: 'border-color 0.2s',
      }}
    >
      <Image
        src={caseImagePath(c.slug)}
        alt={c.name}
        fill
        sizes="(min-width: 1024px) 20vw, 40vw"
        style={{
          objectFit: 'cover',
          transition: 'transform 0.4s ease',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.22) 50%, transparent 100%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)',
        transition: 'background 0.25s',
      }} />
      <span className="caption-2 emphasized" style={{
        position: 'absolute', top: '0.65rem', left: '0.65rem',
        background: '#fff', color: 'var(--text)',
        padding: '0.2rem 0.65rem', borderRadius: '9999px',
      }}>{c.category}</span>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: featured ? '1rem 1.1rem' : '0.7rem 0.85rem',
      }}>
        <p className={featured ? 'body emphasized' : 'footnote emphasized'} style={{
          color: '#fff', margin: '0 0 0.2rem', lineHeight: 1.3,
        }}>{c.name}</p>
        <p className="caption-1" style={{
          color: 'rgba(255,255,255,0.75)', margin: 0,
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'opacity 0.2s, transform 0.2s',
        }}>자세히 보기 →</p>
      </div>
    </Link>
  )
}

export default function CasesSection() {
  const previewCases = cases
    .filter(c => PREVIEW_SLUGS.includes(c.slug))
    .sort((a, b) => PREVIEW_SLUGS.indexOf(a.slug) - PREVIEW_SLUGS.indexOf(b.slug))

  return (
    <section className="cases-section" style={{
      padding: 'clamp(2rem, 4vw, 3.5rem) 1.25rem', background: '#fff',
      scrollSnapAlign: 'start', minHeight: 'calc(100vh - 64px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>

        {/* eyebrow */}
        <div className="reveal" style={{ marginBottom: '1.1rem' }}>
          <p className="caption-1 emphasized c-accent" style={{
            letterSpacing: '0.07em', textTransform: 'uppercase', margin: 0,
          }}>SUCCESS CASES</p>
        </div>

        {/* ── 메인 레이아웃 ── */}
        <div className="reveal cases-layout">

          {/* 왼쪽 텍스트 카드 */}
          <div className="cases-text-card">
            <span className="caption-1 emphasized c-accent" style={{
              display: 'inline-block',
              background: '#ebf2ff',
              padding: '0.2rem 0.65rem', borderRadius: '9999px',
              border: '1px solid #cdddf9', marginBottom: '1rem',
            }}>업종별 성공 사례</span>

            <h2 className="title-2 emphasized" style={{
              margin: '0 0 0.9rem', wordBreak: 'keep-all',
            }}>
              다양한 업종의<br />성공 사례를<br />확인하세요.
            </h2>

            <p className="footnote c-muted" style={{
              lineHeight: 1.75, margin: '0 0 1.5rem', wordBreak: 'keep-all',
            }}>
              어디서도 볼 수 없는 업종별<br />
              전환 최적화 사례를<br />
              직접 확인하세요.
            </p>

            <Link href="/cases" className="subhead emphasized" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: 'var(--accent)', color: '#fff',
              padding: '0.65rem 1.25rem', borderRadius: '8px',
              textDecoration: 'none',
            }}>
              전체 사례 보기
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* 오른쪽 이미지 5개 그리드 */}
          <div className="cases-img-mosaic">
            {previewCases.map((c, i) => (
              <div key={c.slug} className={i === 0 ? 'case-featured' : 'case-thumb'}>
                <CaseImgCard c={c} featured={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .cases-layout {
          display: flex;
          gap: 1.1rem;
          height: ${GRID_H}px;
        }
        .cases-text-card {
          flex: 0 0 250px;
          height: ${GRID_H}px;
          background: #f3f4f6;
          border: 1.5px solid var(--border);
          border-radius: 14px;
          padding: 1.75rem 1.4rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-sizing: border-box;
        }
        .cases-img-mosaic {
          flex: 1;
          height: ${GRID_H}px;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 0.65rem;
          box-sizing: border-box;
        }
        .case-featured {
          grid-row: 1 / 3;
          grid-column: 1;
          height: 100%;
        }
        .case-thumb {
          height: 100%;
        }
        @media (max-width: 900px) {
          .cases-layout {
            flex-direction: column;
            height: auto;
          }
          .cases-text-card {
            flex: none;
            height: auto;
            min-height: 180px;
          }
          .cases-img-mosaic {
            height: 320px;
          }
        }
        @media (max-width: 640px) {
          .cases-img-mosaic {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 140px 110px 110px;
            height: auto;
          }
          .case-featured {
            grid-row: 1;
            grid-column: 1 / 3;
          }
        }
        @media (max-width: 768px) {
          .cases-section { min-height: auto !important; }
        }
      `}</style>
    </section>
  )
}
