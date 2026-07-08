import Link from 'next/link'
import { reviews } from '@/data/reviews'

function ReviewCard({ review }: { review: { star: number; text: string; name: string } }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-2xl)',
      padding: '1.5rem 1.6rem',
      minWidth: '280px',
      maxWidth: '280px',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.6rem' }}>
        <span style={{ color: '#f59e0b', fontSize: '0.8rem' }}>★</span>
        <span className="caption-1 emphasized c-secondary">
          {review.star}.0
        </span>
      </div>
      <p className="footnote c-primary" style={{
        margin: '0 0 0.6rem', lineHeight: 1.65, wordBreak: 'keep-all',
      }}>&ldquo;{review.text}&rdquo;</p>
      <p className="caption-1" style={{ margin: 0 }}>{review.name}</p>
    </div>
  )
}

export default function ReviewsSection() {
  const half = Math.ceil(reviews.length / 2)
  const row1 = [...reviews.slice(0, half), ...reviews.slice(0, half)]
  const row2 = [...reviews.slice(half), ...reviews.slice(half)]

  return (
    <section id="reviews" style={{
      background: 'var(--bg-secondary)',
      scrollSnapAlign: 'start',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      overflow: 'hidden',
      padding: 'clamp(2rem, 4vw, 3.5rem) 0',
    }}>
      {/* 헤더 */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto 2rem',
        padding: '0 1.5rem', width: '100%',
        display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', gap: '1rem',
        flexWrap: 'wrap',
      }}>
        <div>
          <p className="footnote emphasized c-accent" style={{ marginBottom: '0.5rem' }}>고객의 찐후기</p>
          <h2 className="title-1" style={{ marginBottom: '0.35rem' }}>고객 후기</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#f59e0b', fontSize: '0.85rem' }}>{'★'.repeat(5)}</span>
            <span className="footnote emphasized c-secondary">5.0</span>
            <span style={{ color: 'var(--border)', fontSize: '0.75rem' }}>·</span>
            <span className="footnote c-muted">{reviews.length}개 후기</span>
          </div>
        </div>

        <Link href="/reviews" className="footnote emphasized c-secondary" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          textDecoration: 'none', paddingBottom: '0.15rem',
          borderBottom: '1px solid var(--border)',
          transition: 'color 0.15s, border-color 0.15s',
        }}>
          전체 후기 보기
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* 캐러셀 행 1 — 왼쪽 이동 */}
      <div style={{ overflow: 'hidden', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', paddingLeft: '1.5rem' }}>
          <div className="review-track">
            {row1.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>
      </div>

      {/* 캐러셀 행 2 — 오른쪽 이동 */}
      <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', paddingLeft: '1.5rem' }}>
          <div className="review-track-reverse">
            {row2.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>
      </div>

      {/* 하단 CTA */}
      <div style={{ textAlign: 'center', padding: '0 1.5rem' }}>
        <Link href="/cases" className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
          성공 사례 및 후기 더 보기
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
