import { MessageSquare, FileText, Palette, Code2, Monitor, Share2, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { steps } from '@/data/service'
import Reveal from '@/components/Reveal'

const STEP_ICONS: LucideIcon[] = [MessageSquare, FileText, Palette, Code2, Monitor, Share2]

export default function ServiceSteps() {
  return (
    <section style={{ background: '#fff', padding: 'clamp(3rem, 6vw, 5rem) 1.25rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 */}
        <Reveal variant="up" style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <span className="footnote emphasized c-accent">6-STEP PROCESS</span>
          <h2 className="title-1 pt-heading" style={{ marginTop: '0.75rem', wordBreak: 'keep-all' }}>제작 진행과정</h2>
        </Reveal>

        {/* 3x2 카드 그리드 */}
        <Reveal as="div" stagger className="pt-grid">
          {steps.map((s, i) => {
            const Icon = STEP_ICONS[i] ?? MessageSquare
            return (
              <div key={s.num} className="pt-card">
                {/* 상단: 아이콘 + STEP */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.9rem' }}>
                  <div className="pt-num">
                    <Icon size={18} color="#fff" strokeWidth={2} />
                  </div>
                  <p className="footnote emphasized c-accent" style={{ margin: 0, letterSpacing: '0.06em' }}>STEP {s.num}</p>
                </div>

                {/* 제목 + 배지 (짧으면 옆에, 길면 다음 줄 · 넘어가면 글자 시작점 맞춤) */}
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: '1.15rem', rowGap: '0.4rem', marginBottom: '0.5rem' }}>
                  <h3 className="title-3 emphasized" style={{ margin: 0, wordBreak: 'keep-all' }}>{s.title}</h3>
                  <span
                    className="caption-1 emphasized c-accent"
                    style={{ background: 'var(--accent-light)', padding: '2px 10px', borderRadius: '9999px', marginLeft: '-10px' }}
                  >
                    {s.desc}
                  </span>
                </div>

                {/* 설명 */}
                <p className="callout" style={{ margin: '0 0 1.1rem', wordBreak: 'keep-all', whiteSpace: 'pre-line' }}>{s.detail}</p>

                {/* 이미지 */}
                <div className="pt-img">
                  <Image
                    src={`/images/service/service${i + 10}.png`}
                    alt={s.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 340px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* 카드 사이 화살표 (행 마지막 카드에선 CSS로 숨김) */}
                <span className="pt-arrow" aria-hidden="true">
                  <ChevronRight size={22} strokeWidth={2.4} />
                </span>
              </div>
            )
          })}
        </Reveal>
      </div>

      <style>{`
        .pt-heading { font-size: clamp(2rem, 4.5vw, 3rem); }
        .pt-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        .pt-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #f4f6fa;
          border: 1px solid transparent;
          border-radius: var(--radius-2xl);
          padding: 1.6rem 1.5rem;
          transition: background 0.18s, border-color 0.18s, transform 0.18s, box-shadow 0.18s;
        }
        /* 카드 사이 화살표 — 오른쪽 여백 중앙 */
        .pt-arrow {
          position: absolute;
          top: 50%;
          right: -0.9rem;
          transform: translateY(-50%);
          z-index: 2;
          width: 30px;
          height: 30px;
          border-radius: 9999px;
          background: #fff;
          border: 1px solid var(--border);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 6px rgba(11,18,32,0.08);
        }
        /* 3열: 각 행 마지막(3n) 카드에는 화살표 숨김 */
        .pt-card:nth-child(3n) .pt-arrow { display: none; }
        .pt-card:hover {
          background: #fff;
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(51,115,223,0.13);
        }
        .pt-num {
          width: 42px; height: 42px; border-radius: 9999px;
          background: var(--accent); flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .pt-img {
          position: relative;
          overflow: hidden;
          margin-top: auto;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-xl);
          background: #e6eaf1;
          border: 1px solid var(--border);
        }
        @media (max-width: 900px) {
          .pt-grid { grid-template-columns: repeat(2, 1fr); }
          /* 2열: 3n 규칙 해제 후 각 행 마지막(2n)만 숨김 */
          .pt-card:nth-child(3n) .pt-arrow { display: flex; }
          .pt-card:nth-child(2n) .pt-arrow { display: none; }
        }
        @media (max-width: 560px) {
          .pt-grid { grid-template-columns: 1fr; }
          /* 1열: 아래 방향 화살표를 카드 하단 중앙에 */
          .pt-card:nth-child(n) .pt-arrow {
            display: flex;
            top: auto;
            bottom: -0.9rem;
            right: 50%;
            transform: translateX(50%) rotate(90deg);
          }
          .pt-card:nth-child(n):last-child .pt-arrow { display: none; }
        }
      `}</style>
    </section>
  )
}
