import Reveal from "@/components/Reveal";
import Image from "next/image";
import { Home, Clock, Search, Database, ArrowUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const POINTS: { Icon: LucideIcon; label: string; desc: string }[] = [
  { Icon: Home, label: "브랜드의 얼굴", desc: "방문자가 처음 마주하는 첫인상" },
  {
    Icon: Clock,
    label: "24시간 접점",
    desc: "잠든 사이에도 고객을 맞이하는 창구",
  },
  {
    Icon: Search,
    label: "검색의 목적지",
    desc: "궁금할 때 찾아오는 신뢰의 종착지",
  },
];

export default function HomepageDefinitionSection() {
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
            01 · 홈페이지의 정의
          </span>
          <h2
            className="title-1"
            style={{
              marginTop: "0.75rem",
              textAlign: "left",
              wordBreak: "keep-all",
            }}
          >
            홈페이지가 <span className="c-accent">무엇</span>인가요?
          </h2>
        </Reveal>

        {/* 좌 텍스트 · 우 이미지 */}
        <div className="def-split">
          {/* 왼쪽 */}
          <Reveal as="div" variant="left" className="def-text">
            {/* 사전적 정의 (인용) */}
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
                사전적 정의
              </span>
              <p
                className="callout"
                style={{ margin: "0.4rem 0 0", wordBreak: "keep-all" }}
              >
                “인터넷에서 특정 개인·기업을 대표하는 시작 페이지”
              </p>
            </div>

            {/* 쉬운 풀이 */}
            <span className="footnote emphasized c-accent">쉽게 말하면</span>
            <p
              className="body"
              style={{ margin: "0.5rem 0 0.9rem", wordBreak: "keep-all" }}
            >
              온라인에 있는 우리 가게의{" "}
              <strong>대문이자 24시간 영업사원</strong>이에요.
              <br />
              방문자가 브랜드를 처음 만나고, 신뢰하고, 문의로 이어지는
              출발점입니다.
            </p>
            {/* 핵심 포인트 3개 (첫 행은 고객 DB 강조) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}
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
                  <Database size={20} strokeWidth={2} />
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="headline"
                    style={{
                      margin: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.15rem",
                    }}
                  >
                    고객 DB{" "}
                    <ArrowUp
                      size={18}
                      strokeWidth={2.6}
                      color="var(--accent)"
                    />
                  </span>
                  <span
                    className="callout c-muted"
                    style={{ wordBreak: "keep-all" }}
                  >
                    명확한 고객 DB 유입량 증가
                  </span>
                </div>
              </div>
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
          <Reveal as="div" variant="right" className="def-img">
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
                src="/images/main/main-homepage-01.png"
                alt="홈페이지란"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .def-split {
          display: flex;
          align-items: center;
          gap: clamp(1.75rem, 4vw, 3.5rem);
        }
        .def-text { flex: 1; min-width: 0; }
        .def-img { flex: 1; min-width: 0; }
        @media (max-width: 768px) {
          .def-split { flex-direction: column; align-items: stretch; }
          .def-img { max-width: 360px; }
        }
      `}</style>
    </section>
  );
}
