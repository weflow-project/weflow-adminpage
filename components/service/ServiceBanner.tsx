'use client'
import Image from 'next/image'
import { caseImagePath } from '@/data/cases'

const ITEMS = [
  { slug: 'pt-shop',    name: 'PT샵',       category: '피트니스' },
  { slug: 'pilates',    name: '필라테스',    category: '피트니스' },
  { slug: 'beauty',     name: '미용실',      category: '뷰티' },
  { slug: 'nail',       name: '네일샵',      category: '뷰티' },
  { slug: 'interior',   name: '인테리어',    category: '인테리어' },
  { slug: 'cafe',       name: '카페',        category: '식음료' },
  { slug: 'insurance',  name: '보험 설계',   category: '금융' },
  { slug: 'realestate', name: '공인중개사',  category: '부동산' },
  { slug: 'wedding',    name: '웨딩/스냅',   category: '웨딩' },
  { slug: 'skin',       name: '피부관리샵',  category: '뷰티' },
  { slug: 'entrance',   name: '입시학원',    category: '교육' },
  { slug: 'cleaning',   name: '청소업체',    category: '생활서비스' },
]

export default function ServiceBanner() {
  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      overflow: 'hidden',
      background: '#f9fafb',
      padding: '1.1rem 0',
      userSelect: 'none',
    }}>
      <div className="svc-marquee-track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <div key={i} className="svc-marquee-card">
            <div style={{ position: 'relative', height: '100px' }}>
              <Image
                src={caseImagePath(item.slug)}
                alt={item.name}
                fill
                sizes="165px"
                style={{ objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.08)',
              }} />
            </div>
            <div style={{ padding: '0.5rem 0.7rem' }}>
              <p className="caption-1 emphasized c-primary" style={{ margin: 0 }}>{item.name}</p>
              <p className="caption-2 c-muted" style={{ margin: 0, marginTop: '0.1rem' }}>{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .svc-marquee-track {
          display: flex;
          gap: 0.65rem;
          width: max-content;
          animation: svc-scroll 32s linear infinite;
        }
        .svc-marquee-track:hover {
          animation-play-state: paused;
        }
        .svc-marquee-card {
          flex-shrink: 0;
          width: 165px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid var(--border);
          background: #fff;
          transition: box-shadow 0.2s, transform 0.2s;
          cursor: default;
        }
        .svc-marquee-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }
        @keyframes svc-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
