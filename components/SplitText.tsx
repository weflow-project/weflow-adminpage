'use client'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ElementType } from 'react'

type Segment = { text: string; className?: string }

/**
 * 화면에 들어오면 글자를 한 개씩 등장시키는 텍스트.
 * segments로 색이 다른 구간(예: 강조색 단어)을 나눠서 줄 수 있고,
 * 글자 순서는 구간을 가로질러 이어진다. 자리는 미리 잡고 투명→나타남.
 */
export default function SplitText({
  segments,
  step = 0.03,
  className = '',
  style,
  as: Tag = 'p' as ElementType,
}: {
  segments: Segment[]
  step?: number
  className?: string
  style?: CSSProperties
  as?: ElementType
}) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  let idx = 0
  return (
    <Tag ref={ref} className={`split-text${visible ? ' is-visible' : ''}${className ? ' ' + className : ''}`} style={style}>
      {segments.map((seg, si) => (
        <span key={si} className={seg.className}>
          {Array.from(seg.text.replace(/ /g, ' ')).map((ch, i) => {
            if (ch === '\n') return <br key={i} />
            const delay = idx * step
            idx += 1
            return (
              <span key={i} className="split-char" style={{ animationDelay: `${delay}s` }}>
                {ch}
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}
