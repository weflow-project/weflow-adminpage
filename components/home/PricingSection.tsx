import Link from 'next/link'
import Image from 'next/image'
import { Check, Sparkles, Star } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { makePlans } from '@/data/pricing'

export default function PricingSection() {
  return (
    <section style={{ background: 'var(--bg-secondary)', padding: 'clamp(3rem, 7vw, 5.5rem) 1.25rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
        {/* 헤더 */}
        <Reveal variant="up" style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
          <span className="footnote emphasized c-accent">제작 플랜 &amp; 가격</span>
          <h2 className="title-1" style={{ marginTop: '0.75rem', textAlign: 'left', wordBreak: 'keep-all' }}>
            목표에 맞는 <span className="c-accent tilt-hl">플랜</span>을 골라보세요
          </h2>
        </Reveal>

        {/* 플랜 카드 */}
        <Reveal as="div" stagger className="pricing-grid">
          {makePlans.map(plan => (
            <div key={plan.id} className={`pricing-card${plan.highlight ? ' is-highlight' : ''}`}>
              {plan.highlight && (
                <>
                  <span className="pricing-tag" aria-label="가장 인기">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={16} fill="#ffd23f" strokeWidth={0} />
                    ))}
                  </span>
                  <span className="hl-sparkle-layer" aria-hidden="true">
                    <Sparkles className="hl-sparkle hl-sparkle-1" size={150} strokeWidth={1.25} />
                    <Sparkles className="hl-sparkle hl-sparkle-2" size={110} strokeWidth={1.25} />
                    <Sparkles className="hl-sparkle hl-sparkle-3" size={130} strokeWidth={1.25} />
                  </span>
                </>
              )}

              {/* 상단: 아이콘 + 이름 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <Image src={plan.img} alt="" width={48} height={48} style={{ width: 48, height: 48, objectFit: 'contain' }} />
                <div>
                  <h3 className="headline emphasized" style={{ margin: 0 }}>{plan.sub}</h3>
                  <span className="caption-1 c-muted">{plan.tagline}</span>
                </div>
              </div>

              {/* 가격 */}
              <div style={{ margin: '1.1rem 0 1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="caption-1 emphasized c-accent" style={{ background: 'var(--accent-light)', padding: '2px 8px', borderRadius: '9999px' }}>
                    {plan.discount} 할인
                  </span>
                  <span className="footnote c-muted" style={{ textDecoration: 'line-through' }}>{plan.originalPrice}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginTop: '0.5rem' }}>
                  <span className="title-2 emphasized">{plan.price}</span>
                  <span className="caption-1 c-muted">부터</span>
                </div>
                <p className="caption-1 c-muted" style={{ margin: '0.4rem 0 0' }}>{`월 유지보수 ${plan.maintenance} · ${plan.note}`}</p>
              </div>

              {/* 기능 */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <Check size={16} strokeWidth={2.5} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.15rem' }} />
                    <span className="callout" style={{ wordBreak: 'keep-all' }}>{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href="/pricing"
                className={plan.highlight ? 'btn-primary' : 'btn-outline'}
                style={{ justifyContent: 'center', width: '100%', marginTop: '1.5rem', borderRadius: '9999px' }}
              >
                자세히 보기
              </Link>
            </div>
          ))}
        </Reveal>

        {/* 전체 플랜 링크 */}
        <div style={{ marginTop: '1.75rem', textAlign: 'center' }}>
          <Link href="/pricing" className="subhead emphasized c-accent" style={{ textDecoration: 'none', fontSize: '1.1rem' }}>
            플랜 전체 보기 ›
          </Link>
        </div>
      </div>

      <style>{`
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
          align-items: stretch;
        }
        .pricing-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 1.6rem;
        }
        .pricing-card.is-highlight {
          border: 2px solid var(--accent);
          z-index: 0; /* 반짝이 레이어를 담는 스태킹 컨텍스트 */
          box-shadow: 0 16px 42px rgba(51,115,223,0.18);
        }
        .pricing-card.is-highlight:hover {
          box-shadow: 0 20px 50px rgba(51,115,223,0.26);
        }
        /* 반짝이 레이어 — 카드 안쪽으로만 보이게(클립), 텍스트·버튼 뒤 */
        .hl-sparkle-layer {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          overflow: hidden;
          z-index: -1;
          pointer-events: none;
        }
        .hl-sparkle {
          position: absolute;
          color: #ffe6a3;
          fill: currentColor;
          pointer-events: none;
          opacity: 0;
          animation: hl-twinkle 2.6s ease-in-out infinite;
        }
        .hl-sparkle-1 { top: 2rem; right: -0.5rem; animation-delay: 0s; }
        .hl-sparkle-2 { top: 9rem; left: -1rem; animation-delay: 0.9s; }
        .hl-sparkle-3 { bottom: 3rem; right: 0rem; animation-delay: 1.7s; }
        @keyframes hl-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5) rotate(-8deg); }
          50%      { opacity: 0.28; transform: scale(1) rotate(8deg); }
        }
        .pricing-tag {
          position: absolute;
          top: -12px;
          left: 1.6rem;
          display: inline-flex;
          align-items: center;
          gap: 2px;
          background: linear-gradient(120deg, #2f66cf, #4f8ff5, #7db0ff, #4f8ff5, #2f66cf);
          background-size: 250% 100%;
          animation: tag-flow 3.5s ease infinite;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 11px;
          border-radius: 9999px;
          box-shadow: 0 4px 10px rgba(51,115,223,0.28);
        }
        @keyframes tag-flow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hl-sparkle { animation: none; opacity: 0.2; }
          .pricing-tag { animation: none; }
        }
        @media (max-width: 860px) {
          .pricing-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
