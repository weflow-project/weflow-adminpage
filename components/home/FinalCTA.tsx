'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const WORDS = [
  '광고형 홈페이지',
  '문의형 홈페이지',
  '전환형 홈페이지',
  '강조형 홈페이지',
  '신뢰형 홈페이지',
  '편리한 홈페이지',
  '가성비 홈페이지',
  '최적화 홈페이지',
  '소통형 홈페이지',
  '반응형 홈페이지',
  '랜딩형 홈페이지',
  '소상공인 홈페이지',
  '상단관리 홈페이지',
  '간편한 홈페이지',
  '성과형 홈페이지',
  '효율성 홈페이지',
  '실속형 홈페이지',
  '경제형 홈페이지',
  '상담형 홈페이지',
  '1인 사업자 홈페이지',
  '매장형 홈페이지',
  '매출형 홈페이지',
]

export default function FinalCTA() {
  const [i, setI] = useState(0)
  const [w, setW] = useState<number | undefined>(undefined)
  const wordRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const id = setInterval(() => setI(p => (p + 1) % WORDS.length), 3000)
    return () => clearInterval(id)
  }, [])

  // 현재 단어 폭을 측정해 흰 알약 너비를 부드럽게 맞춤
  useEffect(() => {
    if (wordRef.current) setW(wordRef.current.offsetWidth)
  }, [i])

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--accent)',
        padding: 'clamp(4rem, 9vw, 7rem) 1.25rem',
        textAlign: 'center',
      }}
    >
      {/* 장식 원 */}
      <span aria-hidden style={{ position: 'absolute', right: '-80px', bottom: '-120px', width: '320px', height: '320px', borderRadius: '9999px', background: 'rgba(255,255,255,0.06)' }} />
      <span aria-hidden style={{ position: 'absolute', right: '40px', bottom: '-60px', width: '180px', height: '180px', borderRadius: '9999px', background: 'rgba(255,255,255,0.06)' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
        {/* 헤드라인 */}
        <h2 className="large-title" style={{ color: '#fff', margin: 0, wordBreak: 'keep-all', lineHeight: 1.25 }}>
          지금{' '}
          <span
            style={{
              display: 'inline-block',
              boxSizing: 'content-box',
              background: '#fff',
              color: 'var(--accent)',
              borderRadius: '9999px',
              padding: '0.05em 0.6em',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              width: w !== undefined ? `${w}px` : 'auto',
              transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <span ref={wordRef} key={i} className="fcta-word" style={{ display: 'inline-block' }}>{WORDS[i]}</span>
          </span>{' '}
          를 문의하세요
        </h2>

        {/* 버튼 */}
        <div className="fcta-btns">
          <a href="tel:010-2971-7280" className="fcta-btn subhead emphasized">
            전화상담하기 <ArrowRight size={18} strokeWidth={2.5} />
          </a>
          <Link href="/diagnosis" className="fcta-btn fcta-btn--solid subhead emphasized">
            무료체험하기 <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </div>

      <style>{`
        .fcta-word { display: inline-block; animation: fcta-fade 0.45s ease; }
        @keyframes fcta-fade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fcta-btns {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: clamp(2rem, 5vw, 3rem);
        }
        .fcta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          color: #fff;
          font-size: 1.1rem;
          background: rgba(255,255,255,0.14);
          border: 1.5px solid rgba(255,255,255,0.9);
          border-radius: 9999px;
          padding: 0.95rem 2.2rem;
          text-decoration: none;
          transition: background 0.18s, border-color 0.18s, color 0.18s, transform 0.12s;
        }
        .fcta-btn:hover { background: rgba(255,255,255,0.24); border-color: #fff; }
        .fcta-btn:active { transform: scale(0.97); }
        /* 주 버튼 — 흰색 채움 (강조) */
        .fcta-btn--solid {
          background: #fff;
          color: var(--accent);
          border-color: #fff;
          box-shadow: 0 10px 24px rgba(0,0,0,0.18);
        }
        .fcta-btn--solid:hover { background: #eef2ff; border-color: #eef2ff; }
        @media (max-width: 480px) {
          .fcta-btns { flex-direction: column; align-items: stretch; }
          .fcta-btn { justify-content: center; }
        }
      `}</style>
    </section>
  )
}
