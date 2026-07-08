import { Wrench, Rocket, ArrowUpRight, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/Reveal";

const CARDS: { Icon: LucideIcon; title: string; desc: string; img: string }[] = [
  {
    Icon: Wrench,
    title: "타 서비스 전환 고객",
    desc: "현재 홈페이지에 아쉬움이 있어 점검과 개선이 필요한 분",
    img: "/images/main/main-customer-01.png",
  },
  {
    Icon: Rocket,
    title: "신규 고객",
    desc: "업종을 준비 중이거나 이미 운영 중이지만, 아직 홈페이지 방향을 잡지 못한 분",
    img: "/images/main/main-customer-02.png",
  },
];

export default function TargetCustomerSection() {
  return (
    <section
      style={{
        background: "var(--bg-secondary)",
        padding: "clamp(3rem, 6vw, 5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 */}
        <Reveal variant="up" style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
          <span className="footnote emphasized c-accent">WEFLOW의 고객</span>
          {/* 별 5개 (배경 없이) */}
          <div
            aria-hidden="true"
            style={{ display: "flex", gap: "1px", margin: "0.9rem 0 0.5rem" }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                size={19}
                fill="#f5b301"
                color="#f5b301"
                strokeWidth={0}
              />
            ))}
          </div>
          <h2
            className="title-1"
            style={{
              marginTop: 0,
              textAlign: "left",
              wordBreak: "keep-all",
            }}
          >
            어떤 분들이{" "}
            <span className="c-accent tilt-hl tilt-hl-red">
              위플로우의 고객
            </span>
            이 될 수 있을까요?
          </h2>
        </Reveal>

        {/* 카드 2개 */}
        <Reveal as="div" stagger className="tc-grid">
          {CARDS.map(({ Icon, title, desc, img }) => (
            <div key={title} className="tc-card">
              {/* 아이콘 */}
              <span className="tc-icon">
                <Icon size={22} strokeWidth={2} />
              </span>

              {/* 제목 + 화살표 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginBottom: "0.4rem",
                }}
              >
                <h3
                  className="headline"
                  style={{ margin: 0, wordBreak: "keep-all" }}
                >
                  {title}
                </h3>
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.2}
                  color="var(--text-muted)"
                  style={{ flexShrink: 0 }}
                />
              </div>

              {/* 설명 */}
              <p
                className="callout"
                style={{ margin: "0 0 1.1rem", wordBreak: "keep-all" }}
              >
                {desc}
              </p>

              {/* 이미지 */}
              <div className="tc-img">
                <Image
                  src={img}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, 520px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </Reveal>

        {/* 하단 안내 */}
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1px",
            margin: "clamp(2rem, 4vw, 3rem) 0 0.6rem",
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              size={19}
              fill="#f5b301"
              color="#f5b301"
              strokeWidth={0}
            />
          ))}
        </div>
        <p
          className="c-secondary"
          style={{
            textAlign: "center",
            margin: 0,
            wordBreak: "keep-all",
            fontSize: "clamp(1.4rem, 3.4vw, 1.85rem)",
            fontWeight: 600,
            lineHeight: 1.5,
          }}
        >
          어느 쪽에 해당하셔도 괜찮아요.{" "}
          <strong className="c-accent tilt-hl tilt-hl-red">
            누구나 WEFLOW의 고객
          </strong>
          이 될 수 있습니다.
        </p>
      </div>

      <style>{`
        .tc-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.1rem;
        }
        .tc-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #f4f6fa;
          border: 1px solid transparent;
          border-radius: var(--radius-2xl);
          padding: 1.75rem 1.6rem;
          transition: background 0.18s, transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .tc-card:hover {
          background: #fff;
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(51,115,223,0.13);
        }
        .tc-icon {
          display: inline-flex;
          width: 46px;
          height: 46px;
          border-radius: var(--radius-xl);
          background: var(--accent-light);
          color: var(--accent);
          align-items: center;
          justify-content: center;
          margin-bottom: 1.1rem;
        }
        .tc-img {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 9;
          margin-top: auto;
          border-radius: var(--radius-xl);
          background: #e6eaf1;
          border: 1px solid var(--border);
        }
        @media (max-width: 640px) {
          .tc-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
