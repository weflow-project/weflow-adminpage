import Image from 'next/image'
import Link from 'next/link'
import { caseImagePath } from '@/data/cases'

export default function CaseCard({
  name,
  slug,
  href,
}: {
  name: string
  slug: string
  href?: string
}) {
  const to = href ?? `/cases/${slug}`
  return (
    <Link href={to} className="case-card" style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', background: '#fff' }}>
        <div style={{ position: 'relative', paddingTop: '75%' }}>
          <Image
            src={caseImagePath(slug)}
            alt={name}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        </div>
        <div style={{ padding: '0.75rem 1rem' }}>
          <p className="subhead emphasized c-primary" style={{ margin: '0 0 0.2rem' }}>{name}</p>
          <p className="caption-1 c-accent" style={{ margin: 0 }}>자세히 보기 →</p>
        </div>
      </div>
    </Link>
  )
}
