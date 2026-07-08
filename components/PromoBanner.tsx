import Link from 'next/link'

export default function PromoBanner() {
  return (
    <Link
      href="/diagnosis"
      className="promo-banner"
      style={{
        display: 'block',
        textDecoration: 'none',
        background: 'var(--accent)',
        color: '#fff',
        transition: 'opacity 0.18s',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.25rem',
          minHeight: '46px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.55rem',
          flexWrap: 'wrap',
          textAlign: 'center',
          lineHeight: 1.3,
        }}
      >
        <span
          className="caption-1 emphasized"
          style={{
            flexShrink: 0,
            background: '#fff',
            color: 'var(--accent)',
            padding: '2px 11px',
            borderRadius: '9999px',
            letterSpacing: '-0.01em',
          }}
        >
          신규 런칭
        </span>
        <strong className="subhead emphasized" style={{ letterSpacing: '-0.01em',color: '#D5D5D5' }}>
          제작비 <span style={{ color: '#fff' }}>50% 할인</span> + 무료 전환 진단 제공!
        </strong>
        <span className="hide-sm footnote medium" style={{ color: '#c7ccd6' }}>
          (선착순 마감 · 지금 바로 신청하세요)
        </span>
      </div>
    </Link>
  )
}
