import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const BENEFITS = [
  {
    no: "혜택 01",
    icon: "/images/main/main-benefit-01.png",
    title: ["제휴 마케팅 협업", "SEO 상단 관리"],
    desc: "제휴 마케팅 협업으로\n검색 상단 관리",
  },
  {
    no: "혜택 02",
    icon: "/images/main/main-benefit-02.png",
    title: ["확실한", "고객 DB 확보"],
    desc: "문의·예약을 통계로\n관리하는 나만의 관리자 페이지",
  },
  {
    no: "혜택 03",
    icon: "/images/main/main-benefit-03.png",
    title: ["신규 런칭 기념", "50% 특별 프로모션"],
    desc: "전상품 50% 할인 · 도메인 제공 ·\n정기 유지보수",
  },
];

export default function BenefitsSection() {
  return (
    <section
      id="benefits"
      style={{
        position: "relative",
        background: "var(--accent-dim)",
        padding: "clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 3rem)",
      }}
    >
      {/* 우측 사이드 탭 — 혜택 더보기 (넓은 화면에서만 노출) */}
      <Link href="/pricing" className="benefit-more footnote emphasized">
        혜택 더보기 ›
      </Link>
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 */}
        <Reveal
          variant="up"
          style={{
            textAlign: "center",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          <span
            className="caption-1 emphasized"
            style={{ color: "#9dbff6", letterSpacing: "0.06em" }}
          >
            WEFLOW만의 혜택
          </span>
          <h2
            className="title-1 benefit-heading"
            style={{
              margin: "0.7rem 0 0.9rem",
              color: "#fff",
              wordBreak: "keep-all",
            }}
          >
            지금 시작하면,{" "}
            <br className="br-mobile" />
            <span style={{ color: "#8fb4ff" }}>3가지 혜택</span>을 한 번에
          </h2>
          <p
            className="body"
            style={{
              margin: "0 auto",
              maxWidth: "600px",
              color: "#9dbff6",
              wordBreak: "keep-all",
            }}
          >
            50% 프로모션부터 도메인·유지보수, 관리자 페이지까지 — WEFLOW가 한
            번에 챙겨드립니다.
          </p>
        </Reveal>

        {/* 혜택 카드 3개 */}
        <Reveal as="div" stagger className="benefit-grid">
          {BENEFITS.map((b) => (
            <div
              key={b.no}
              className="benefit-card"
              style={{
                position: "relative",
                background: "#fff",
                borderRadius: "var(--radius-2xl)",
                padding: "clamp(2rem, 4vw, 2.75rem) clamp(1.6rem, 3vw, 2rem)",
                minHeight: "clamp(360px, 38vw, 440px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* 번호 북마크 리본 */}
              <span
                aria-label={b.no}
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "20px",
                  width: "104px",
                  height: "84px",
                  backgroundImage: "url('/images/3d-icon/bookmark.svg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "top center",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  paddingTop: "16px",
                }}
              >
                <span
                  className="subhead emphasized"
                  style={{ color: "var(--accent-dim)", fontSize: "1.15rem" }}
                >
                  {b.no}
                </span>
              </span>

              {/* 아이콘 자리 (고정 높이 슬롯 — 텍스트 시작선 정렬) */}
              <div
                style={{
                  height: 128,
                  display: "flex",
                  alignItems: "flex-end",
                  marginBottom: "1.25rem",
                }}
              >
                <div style={{ position: "relative", width: 110, height: 110 }}>
                  <Image
                    src={b.icon}
                    alt={b.title.join(" ")}
                    fill
                    sizes="110px"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </div>

              {/* 제목 */}
              <h3
                className="title-2 emphasized"
                style={{ margin: "0 0 0.6rem", wordBreak: "keep-all" }}
              >
                {b.title[0]}
                <br />
                {b.title[1]}
              </h3>

              {/* 설명 */}
              <p
                className="body"
                style={{
                  margin: "0 0 1.25rem",
                  wordBreak: "keep-all",
                  whiteSpace: "pre-line",
                }}
              >
                {b.desc}
              </p>

              {/* 자세히 보기 */}
              <Link
                href="/pricing"
                className="callout semibold c-accent"
                style={{
                  marginTop: "auto",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  fontSize: "1rem",
                }}
              >
                자세히 보기 ›
              </Link>
            </div>
          ))}
        </Reveal>

        {/* 안내 + CTA */}
        <p
          className="callout"
          style={{
            textAlign: "center",
            color: "#9dbff6",
            margin: "clamp(1.75rem, 4vw, 2.5rem) 0 1.5rem",
            wordBreak: "keep-all",
          }}
        >
          * 프로모션은 선착순으로 조기 마감될 수 있습니다.{" "}
          <br className="br-mobile" />
          지금 부담 없이 시작하세요!
        </p>
        <div style={{ textAlign: "center" }}>
          <Link
            href="/diagnosis"
            className="btn-white"
            style={{ fontSize: "1.1rem", padding: "1rem 2.4rem" }}
          >
            혜택 신청하기 →
          </Link>
        </div>
      </div>

      <style>{`
        .benefit-heading { font-size: clamp(2rem, 4.5vw, 3rem); }
        .benefit-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        .benefit-card { transition: transform 0.2s, box-shadow 0.2s; }
        .benefit-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.18); }

        /* 우측 사이드 탭 */
        .benefit-more {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: #fff;
          color: var(--accent);
          font-size: 1rem;
          padding: 1.05rem 1.4rem;
          border-radius: var(--radius-xl) 0 0 var(--radius-xl);
          box-shadow: 0 6px 20px rgba(11,18,32,0.22);
          text-decoration: none;
          white-space: nowrap;
          transition: opacity 0.15s;
        }
        .benefit-more:hover { opacity: 0.92; }

        /* 좁은 화면에서는 콘텐츠와 겹쳐 숨김 */
        @media (max-width: 1024px) {
          .benefit-more { display: none; }
        }
        @media (max-width: 768px) {
          .benefit-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
