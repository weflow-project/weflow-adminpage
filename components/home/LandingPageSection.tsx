import Reveal from "@/components/Reveal";
import Image from "next/image";
import { Target, Rocket, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const POINTS: { Icon: LucideIcon; label: string; desc: string }[] = [
  { Icon: Target, label: "단일 목표", desc: "오직 하나의 전환에만 집중" },
  { Icon: Rocket, label: "빠른 실행", desc: "광고·이벤트에 맞춰 빠른 오픈" },
  { Icon: TrendingUp, label: "전환 극대화", desc: "군더더기 없이 행동 유도" },
];

export default function LandingPageSection() {
  return (
    <section
      style={{
        background: "var(--bg-secondary)",
        padding: "clamp(3rem, 7vw, 5.5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 */}
        <Reveal variant="up" style={{ marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
          <span className="footnote emphasized c-accent">
            04 · 랜딩페이지란
          </span>
          <h2
            className="title-1"
            style={{
              marginTop: "0.75rem",
              textAlign: "left",
              wordBreak: "keep-all",
            }}
          >
            랜딩페이지가 <span className="c-accent">무엇</span>인가요?
          </h2>
        </Reveal>

        {/* 좌 텍스트 · 우 이미지 */}
        <div className="lps-split">
          {/* 왼쪽 */}
          <Reveal as="div" variant="right" className="lps-text">
            {/* 한 줄 정의 (인용) */}
            <div
              style={{
                width: "fit-content",
                maxWidth: "100%",
                borderLeft: "3px solid var(--accent)",
                background: "var(--bg-secondary)",
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
                “광고·링크를 타고 들어온 방문자가 도착하는 단 하나의 목표
                페이지”
              </p>
            </div>

            {/* 쉬운 풀이 */}
            <span className="footnote emphasized c-accent">쉽게 말하면</span>
            <p
              className="body"
              style={{ margin: "0.5rem 0 1.75rem", wordBreak: "keep-all" }}
            >
              여러 정보를 담는 홈페이지와 달리,{" "}
              <strong>오직 하나의 행동</strong>만을 목표로 만든 페이지예요.
              <br />
              방문자가 딴 데로 새지 않고 문의·구매·신청까지 집중하도록
              설계됩니다.
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

          {/* 오른쪽 이미지 */}
          <Reveal as="div" variant="left" className="lps-img">
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16 / 9",
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
                background: "#e6eaf1",
                border: "1px solid var(--border)",
              }}
            >
              <Image
                src="/images/main/main-landing-01.png"
                alt="랜딩페이지란"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .lps-split {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          gap: clamp(1.75rem, 4vw, 3.5rem);
        }
        .lps-text { flex: 1; min-width: 0; }
        .lps-img { flex: 1; min-width: 0; }
        @media (max-width: 768px) {
          .lps-split { flex-direction: column; align-items: stretch; }
          .lps-img { max-width: 360px; }
        }
      `}</style>
    </section>
  );
}
