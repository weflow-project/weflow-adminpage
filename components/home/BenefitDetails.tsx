import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, Crown } from "lucide-react";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";

// 아이콘 배치 순서 (혜택 카드별) — 3-2-1-2-3-1
const ICON_ORDER = [3, 2, 1, 2, 3, 1];

type Benefit = {
  title: string;
  points: string[];
  image: string;
  icon: string;
  cta?: { label: string; href: string };
};

const BENEFITS: Benefit[] = [
  {
    title: "제휴 마케팅 연결 (선택형)",
    points: [
      "네이버 블로그 — 검색 상단 노출용 정보성 콘텐츠",
      "인스타그램 — 메타 광고로 브랜드 도달",
      "유튜브 숏폼 — 짧은 영상으로 바이럴 확산",
      "네이버 플레이스 — 지역 검색·지도 노출",
      "제휴 채널 통합 운영으로 검색 상단 관리",
    ],
    image: "/images/benefits/benefit-01-partnership.png",
    icon: "/images/3d-icon/benefit001.svg",
  },
  {
    title: "통계 관리자 페이지",
    points: [
      "관리자 DB로 고객 정보 자산화",
      "문의·예약 접수 내역을 한곳에서 관리",
      "통계로 유입·전환 추이를 한눈에 파악",
    ],
    image: "/images/benefits/benefit-03-fast.png",
    icon: "/images/3d-icon/benefit003.svg",
  },
  {
    title: "반응형 디자인 (PC / MO)",
    points: [
      "PC·모바일 등 모든 기기에서 최적화",
      "화면 잘림 없는 깔끔한 반응형 전환",
    ],
    image: "/images/benefits/benefit-06-responsive.png",
    icon: "/images/3d-icon/benefit006.svg",
  },
  {
    title: "합리적 가성비",
    points: [
      "정가 대비 100만원 이내로 제작 가능",
      "필요한 기능만 구성한 합리적인 비용",
    ],
    image: "/images/benefits/benefit-02-price.png",
    icon: "/images/3d-icon/benefit002.svg",
    cta: { label: "제작 플랜 보기", href: "/pricing" },
  },
  {
    title: "고객의 소리 · 1:1 관리 시스템",
    points: [
      "충분한 소통으로 고객의 니즈 파악",
      "전담 담당자가 고객 한 분을 1:1로 전담",
    ],
    image: "/images/benefits/benefit-04-listen.png",
    icon: "/images/3d-icon/benefit004.svg",
  },
  {
    title: "각 상품별 전용 유지보수",
    points: [
      "3가지 상품별 맞춤 유지보수 제공",
      "도메인·서버 관리 지원",
      "텍스트 문구 / 이미지 수정 지원",
    ],
    image: "/images/benefits/benefit-05-maintain.png",
    icon: "/images/3d-icon/benefit005.svg",
  },
];

export default function BenefitDetails() {
  return (
    <>
      <section
        style={{
          background: "#fff",
          padding: "clamp(3rem, 6vw, 5rem) 1.25rem",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <div
            style={{
              textAlign: "center",
              marginBottom: "clamp(2.5rem, 6vw, 4rem)",
            }}
          >
            <Reveal variant="up">
              <span className="footnote emphasized c-accent">혜택 상세</span>
            </Reveal>
            <SplitText
              as="h2"
              className="title-1 bd-heading"
              style={{ margin: "0.75rem 0 0", wordBreak: "keep-all" }}
              segments={[
                { text: "WEFLOW의 혜택, " },
                { text: "하나하나 풀어봤습니다", className: "c-accent" },
              ]}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(3rem, 7vw, 5.5rem)",
            }}
          >
            {BENEFITS.map((b, i) => (
              <Reveal
                key={b.title}
                variant={i % 2 === 1 ? "right" : "left"}
                className={`bd-row${i % 2 === 1 ? " bd-row--rev" : ""}`}
              >
                {/* 텍스트 */}
                <div className="bd-text">
                  <div style={{ width: 72, display: "flex", justifyContent: "center", marginBottom: "0.3rem" }}>
                    <Crown
                      strokeWidth={2}
                      color="#f5b301"
                      fill="#f5b301"
                      style={{ width: "1.7rem", height: "1.7rem" }}
                    />
                  </div>
                  <div
                    style={{
                      position: "relative",
                      width: 72,
                      height: 72,
                      marginBottom: "1.1rem",
                    }}
                  >
                    <Image
                      src={`/images/benefits/benefits-icon-0${ICON_ORDER[i]}.png`}
                      alt=""
                      fill
                      sizes="72px"
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3
                    className="title-2 emphasized"
                    style={{ margin: "0 0 1rem", wordBreak: "keep-all" }}
                  >
                    {b.title}
                  </h3>
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.7rem",
                    }}
                  >
                    {b.points.map((p) => (
                      <li
                        key={p}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "0.6rem",
                        }}
                      >
                        <Check
                          size={18}
                          strokeWidth={2.5}
                          color="var(--accent)"
                          style={{ flexShrink: 0, marginTop: "2px" }}
                        />
                        <span
                          className="callout c-secondary"
                          style={{ wordBreak: "keep-all" }}
                        >
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {b.cta && (
                    <Link
                      href={b.cta.href}
                      className="btn-primary"
                      style={{ marginTop: "1.5rem", fontSize: "0.95rem" }}
                    >
                      {b.cta.label} →
                    </Link>
                  )}
                </div>

                {/* 이미지 (통계 관리자 페이지는 제외) */}
                <div className="bd-img">
                  <Image
                    src={`/images/benefits/benefits${i + 1}.png`}
                    alt={b.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 24시간 상담 대기 — 좌우 풀-블리드 밴드 */}
      <section
        style={{
          background: "var(--accent-dim)",
          padding: "clamp(2.5rem, 5vw, 4.25rem) clamp(1.25rem, 4vw, 3rem)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <Reveal variant="up">
            <span className="footnote emphasized" style={{ color: "#9dbff6" }}>
              24시간 상담 대기
            </span>
          </Reveal>
          <SplitText
            as="h3"
            className="title-1 bd-heading"
            style={{
              margin: "0.75rem 0 0",
              color: "#fff",
              wordBreak: "keep-all",
              lineHeight: 1.4,
            }}
            step={0.024}
            segments={[
              { text: "모두가 잠든 이 시간에도,\nWEFLOW는 " },
              { text: "고객을 기다립니다", className: "bd-band-accent" },
            ]}
          />
          <Reveal variant="up" delay={0.1}>
            <p
              className="callout"
              style={{
                margin: "1rem 0 1.75rem",
                color: "rgba(255,255,255,0.72)",
              }}
            >
              연중무휴 24시간, 언제 문의하셔도 빠르게 응답합니다.
            </p>
          </Reveal>
          <Reveal as="div" stagger className="bd-band-imgs">
            <div className="bd-band-img">
              <Image
                src="/images/benefits/benefits7.png"
                alt="24시간 상담 대기"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="bd-band-img">
              <Image
                src="/images/benefits/benefits8.png"
                alt="24시간 상담 대기"
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
          <Reveal variant="up">
            <div
              style={{
                display: "flex",
                gap: "0.8rem",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "3rem",
              }}
            >
              <a
                href="tel:010-2971-7280"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: 700,
                  padding: "0.75rem 1.75rem",
                  borderRadius: "var(--radius-xl)",
                  border: "1.5px solid rgba(255,255,255,0.85)",
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                전화상담하기 <ArrowRight size={18} strokeWidth={2.5} />
              </a>
              <Link
                href="/diagnosis"
                className="btn-white"
                style={{ fontSize: "1rem" }}
              >
                무료 진단 신청하기
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .bd-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          align-items: center;
        }
        /* 텍스트 측 푸른 박스 패널 */
        .bd-text {
          background: #eef3fd;
          border: 1px solid var(--accent-light);
          border-radius: var(--radius-2xl);
          padding: clamp(1.5rem, 3vw, 2.25rem);
        }
        .bd-row--rev .bd-text { order: 2; }
        .bd-row--rev .bd-img { order: 1; }
        .bd-img {
          aspect-ratio: 4 / 3;
          border-radius: var(--radius-2xl);
          position: relative;
          overflow: hidden;
          background: #e6eaf1;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .bd-heading { font-size: clamp(2rem, 4.5vw, 3rem); }
        .bd-band-accent { color: #9dbff6; }
        .bd-band-imgs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          max-width: 720px;
          margin: 0 auto;
        }
        .bd-band-img {
          aspect-ratio: 16 / 10;
          border-radius: var(--radius-xl);
          position: relative;
          overflow: hidden;
        }
        .bd-band-ph {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.08);
          border: 1px dashed rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.6);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        @media (max-width: 768px) {
          .bd-row { grid-template-columns: 1fr; }
          .bd-row--rev .bd-text { order: 1; }
          .bd-row--rev .bd-img { order: 2; }
          .bd-band-imgs { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
