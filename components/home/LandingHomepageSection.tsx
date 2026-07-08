import Reveal from "@/components/Reveal";
import { Rows3, Anchor, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const POINTS: { Icon: LucideIcon; label: string; desc: string }[] = [
  {
    Icon: Rows3,
    label: "원페이지 구성",
    desc: "한 페이지 안에 모든 섹션 포함",
  },
  {
    Icon: Anchor,
    label: "헤더 앵커 이동",
    desc: "메뉴 클릭 시 해당 섹션 스크롤",
  },
  { Icon: Target, label: "전환 집중", desc: "이탈없이 자연스러운 문의" },
];

export default function LandingHomepageSection() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(3rem, 7vw, 5.5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 */}
        <Reveal variant="up" style={{ marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
          <span className="footnote emphasized c-accent">
            03 · 랜딩형 홈페이지란
          </span>
          <h2
            className="title-1"
            style={{
              marginTop: "0.75rem",
              textAlign: "left",
              wordBreak: "keep-all",
            }}
          >
            랜딩형 홈페이지가 <span className="c-accent">무엇</span>인가요?
          </h2>
        </Reveal>

        {/* 좌 텍스트 · 우 이미지 */}
        <div className="lhd-split">
          {/* 왼쪽 */}
          <Reveal as="div" variant="left" className="lhd-text">
            {/* 한 줄 정의 (인용) */}
            <div
              style={{
                width: "fit-content",
                maxWidth: "100%",
                borderLeft: "3px solid var(--accent)",
                background: "#fff",
                borderRadius: "0 var(--radius-xl) var(--radius-xl) 0",
                padding: "0.75rem 1.1rem",
                marginBottom: "1.75rem",
              }}
            >
              <span
                className="caption-1 emphasized c-muted"
                style={{ letterSpacing: "0.02em" }}
              >
                한마디로
              </span>
              <p
                className="callout"
                style={{ margin: "0.4rem 0 0", wordBreak: "keep-all" }}
              >
                “홈페이지의 신뢰감과 랜딩페이지의 집중력을 합친 형태”
              </p>
            </div>

            {/* 쉬운 풀이 */}
            <span className="footnote emphasized c-accent">쉽게 말하면</span>
            <p
              className="body"
              style={{ margin: "0.5rem 0 1.75rem", wordBreak: "keep-all" }}
            >
              여러 페이지로 흩어지지 않고,{" "}
              <strong>한 페이지 안에 모든 섹션</strong>을 담은 홈페이지예요.
              <br />
              상단 메뉴를 누르면 해당 섹션으로 이동하며, 소개부터 문의까지 한
              흐름으로 이어집니다.
            </p>

            {/* 핵심 포인트 3개 */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {POINTS.map(({ Icon, label, desc }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.9rem",
                  }}
                >
                  <span
                    style={{
                      width: "42px",
                      height: "42px",
                      flexShrink: 0,
                      borderRadius: "var(--radius-xl)",
                      background: "var(--accent-light)",
                      color: "var(--accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span className="headline" style={{ margin: 0 }}>
                      {label}
                    </span>
                    <span
                      className="callout c-muted"
                      style={{ wordBreak: "keep-all" }}
                    >
                      {desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 오른쪽 이미지 (추후 교체) */}
          <Reveal as="div" variant="right" className="lhd-img">
            <div
              style={{
                width: "100%",
                aspectRatio: "4 / 3",
                borderRadius: "var(--radius-2xl)",
                background: "#e6eaf1",
                border: "1px dashed rgba(11,18,32,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-secondary)",
                fontSize: "0.9rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
              }}
            >
              이미지
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .lhd-split {
          display: flex;
          align-items: flex-start;
          gap: clamp(1.75rem, 4vw, 3.5rem);
        }
        .lhd-text { flex: 1; min-width: 0; }
        .lhd-img { flex: 1; min-width: 0; }
        @media (max-width: 768px) {
          .lhd-split { flex-direction: column; align-items: stretch; }
          .lhd-img { max-width: 360px; }
        }
      `}</style>
    </section>
  );
}
