import Link from 'next/link'

export default function ReviewsExplorer() {
  return (
    <div>
      <section
        style={{
          background: '#fff',
          padding: 'clamp(4rem, 10vw, 7rem) 1.5rem',
          textAlign: 'center',
          minHeight: '55vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          className="caption-2 emphasized c-accent"
          style={{ letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}
        >
          CUSTOMER REVIEWS
        </p>
        <h1 className="title-1" style={{ margin: '0 0 0.9rem' }}>
          고객 후기
        </h1>
        <p className="callout c-muted" style={{ margin: '0 0 1.75rem', maxWidth: '440px', wordBreak: 'keep-all' }}>
          고객 후기를 준비 중입니다. 곧 실제 후기로 찾아뵐게요.
        </p>
        <Link href="/diagnosis" className="btn-primary" style={{ fontSize: '1rem', padding: '0.85rem 2.2rem' }}>
          무료 진단 신청하기 →
        </Link>
      </section>
    </div>
  )
}
