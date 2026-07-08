import { CheckCircle } from 'lucide-react'

const TAGS = ['상담 → 기획 → 디자인 → 개발 → SEO → 광고운영']
const POINTS = ['체계적인 6단계 프로세스', '제작 후 광고·운영 사후관리', '평균 3~7일 완성']

export default function ServiceHero() {
  return (
    <section style={{
      background: '#fff',
      borderBottom: '1px solid var(--border)',
      padding: '4rem 1.5rem 3.5rem',
      scrollSnapAlign: 'start',
      minHeight: 'calc(100vh - 64px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', textAlign: 'center' }}>

        <p className="caption-1 emphasized c-accent" style={{
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem',
        }}>SERVICE</p>

        <h1 className="large-title" style={{
          marginBottom: '1rem', wordBreak: 'keep-all',
        }}>
          제작진행과정
        </h1>

        <p className="body c-muted" style={{
          maxWidth: '520px', margin: '0 auto 2rem', wordBreak: 'keep-all',
        }}>
          상담부터 광고 운영까지, 6단계 체계적인 프로세스로 진행합니다
        </p>

        {/* 플로우 태그 */}
        <div className="footnote semibold c-secondary" style={{
          display: 'inline-block',
          background: '#f9fafb', border: '1px solid var(--border)',
          borderRadius: '10px', padding: '0.65rem 1.25rem',
          letterSpacing: '0.01em', marginBottom: '2rem',
        }}>
          {TAGS[0]}
        </div>

        {/* 포인트 배지 */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '0.6rem',
          justifyContent: 'center',
        }}>
          {POINTS.map((p, i) => (
            <div key={i} className="footnote semibold c-accent" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
              background: '#ebf2ff', border: '1px solid #cdddf9',
              borderRadius: '9999px', padding: '0.3rem 0.85rem',
            }}>
              <CheckCircle size={12} strokeWidth={2.5} color="var(--accent)" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
