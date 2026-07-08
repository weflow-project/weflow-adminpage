import Image from 'next/image'
import Link from 'next/link'
import { RiKakaoTalkFill } from 'react-icons/ri'

const KAKAO_URL = 'http://pf.kakao.com/_xntCbX'
const BLOG_URL = 'https://m.blog.naver.com/weflowlab'
const INSTAGRAM_URL = 'https://www.instagram.com/weflowlab.kr?igsh=b2c1eTdwbHo2bWRt'

/* 헤더(Navbar) 메뉴와 동일하게 맞춤 */
const SERVICE_LINKS = [
  { label: '회사소개',            href: '/about' },
  { label: '서비스',              href: '/service' },
  { label: 'WEFLOW 혜택',         href: '/benefits' },
  { label: '제작 플랜 & 가격 안내', href: '/pricing' },
]

const CARE_LINKS = [
  { label: '성공 사례 포트폴리오',    href: '/cases' },
  { label: '실제 고객 후기', href: '/reviews' },
  { label: '예약',                   href: '/booking' },
  { label: '무료 진단',               href: '/diagnosis' },
]

/* 아이콘 SVG */
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
)
const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)
const KakaoIcon = () => <RiKakaoTalkFill size={14} />

const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const NaverIcon = () => (
  <svg width="14" height="14" viewBox="-3.5 -3.5 31 31" fill="currentColor">
    <path d="M16.273 12.845 7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z"/>
  </svg>
)

const CONTACT_LINKS = [
  { label: '전화문의',          href: 'tel:010-2971-7280',              Icon: PhoneIcon,    external: false, color: '#22d3ee' },
  { label: '이메일 문의',       href: 'mailto:contact@weflowlab.kr',    Icon: MailIcon,     external: false, color: '#5b9bff' },
  { label: '카카오 채널 문의',  href: KAKAO_URL,                         Icon: KakaoIcon,    external: true,  color: '#FEE500' },
  { label: '인스타 문의',       href: INSTAGRAM_URL,                     Icon: InstagramIcon, external: true, color: '#E4405F' },
  { label: '블로그',            href: BLOG_URL,                          Icon: NaverIcon,    external: true,  color: '#03C75A' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#64748b', paddingBottom: '72px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 0' }}>

        {/* ── 메인 그리드 ── */}
        <div className="ft-main">

          {/* 브랜드 + 사업자 정보 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Image src="/logo.png" alt="WEFLOW" width={28} height={28}
                style={{ width: 28, height: 28, objectFit: 'contain' }} />
              <span className="headline emphasized" style={{ color: '#f1f5f9', letterSpacing: '-0.02em' }}>WEFLOW</span>
            </div>
            <p className="footnote" style={{ lineHeight: 1.8, margin: '0 0 1.25rem', color: '#94a3b8', wordBreak: 'keep-all' }}>
              제작부터 관리까지<br />비즈니스 성장을 함께합니다.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: '#475569' }} className="footnote">
              <span>대표 : 신서준</span>
              <span>사업자등록번호 : 884-07-03480</span>
              <span>이메일 : contact@weflowlab.kr</span>
              <span>운영시간 : 연중무휴 24시간 상담가능</span>
            </div>
          </div>

          {/* 서비스 */}
          <div>
            <p className="ft-col-title">서비스</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {SERVICE_LINKS.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="footnote" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 바로가기 */}
          <div>
            <p className="ft-col-title">바로가기</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {CARE_LINKS.map(l => (
                <li key={l.label}>
                  <Link href={l.href} className="footnote" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 상담문의 */}
          <div>
            <p className="ft-col-title">상담문의</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {CONTACT_LINKS.map(({ label, href, Icon, external, color }) => (
                <li key={label}>
                  <a href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#94a3b8', textDecoration: 'none' }} className="footnote">
                    <span style={{ display: 'inline-flex', color }}>
                      <Icon />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 하단 카피라이트 ── */}
        <div style={{
          borderTop: '1px solid #1e293b', marginTop: '2.5rem',
          paddingTop: '1.25rem', paddingBottom: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span className="caption-2" style={{ color: '#334155', cursor: 'pointer' }}>개인정보처리방침</span>
            <span className="caption-2" style={{ color: '#334155', cursor: 'pointer' }}>이용약관</span>
            <Link href="/admin" className="caption-2" style={{ color: '#334155', textDecoration: 'none' }}>관리자</Link>
          </div>
          <span className="caption-2" style={{ color: '#334155' }}>© 2026 WEFLOW. All rights reserved.</span>
        </div>
      </div>

      <style>{`
        .ft-col-title {
          font-size: 1.05rem; font-weight: 600; color: #f1f5f9;
          letter-spacing: -0.01em;
          margin: 0 0 0.95rem;
        }
        /* 푸터 내부 글씨 키우기 */
        footer .footnote { font-size: 0.95rem; }
        footer .caption-2 { font-size: 0.82rem; }
        .ft-main {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1fr;
          gap: 2.5rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .ft-main { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 480px) {
          .ft-main { grid-template-columns: 1fr; gap: 1.75rem; }
        }
      `}</style>
    </footer>
  )
}
