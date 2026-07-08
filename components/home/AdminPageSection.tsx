import Reveal from "@/components/Reveal";
import Image from "next/image";
import { Database, Route, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const POINTS: { Icon: LucideIcon; label: string; desc: string }[] = [
  {
    Icon: Database,
    label: "확실한 고객 DB 확보",
    desc: "니즈까지 명확한 고객 유입",
  },
  { Icon: Route, label: "유입 경로 확인", desc: "채널/광고 유입 경로 파악" },
  {
    Icon: BarChart3,
    label: "통계로 유입되는 DB",
    desc: "통계적 관리를 통한 순차적 유입",
  },
];

export default function AdminPageSection() {
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
            05 · 관리자 페이지란
          </span>
          <h2
            className="title-1"
            style={{
              marginTop: "0.75rem",
              textAlign: "left",
              wordBreak: "keep-all",
            }}
          >
            관리자 페이지가 <span className="c-accent">무엇</span>인가요?
          </h2>
        </Reveal>

        {/* 좌 텍스트 · 우 이미지 */}
        <div className="aps-split">
          {/* 왼쪽 */}
          <Reveal as="div" variant="left" className="aps-text">
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
                “홈페이지로 들어온 고객 정보와 활동을 한곳에서 관리하는 나만의
                데이터 관제 센터”
              </p>
            </div>

            {/* 쉬운 풀이 */}
            <span className="footnote emphasized c-accent">쉽게 말하면</span>
            <p
              className="body"
              style={{ margin: "0.5rem 0 1.75rem", wordBreak: "keep-all" }}
            >
              홈페이지를 보고 들어온 고객은{" "}
              <strong>진짜 DB에 들어올 확률</strong>이 높아요.
              <br />
              통계를 통해 <strong>관리자 DB를 확보</strong>하고, 흩어진 고객
              정보를 자산으로 쌓아갈 수 있습니다.
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
          <Reveal as="div" variant="right" className="aps-img">
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
                src="/images/main/main-admin-01.jpg"
                alt="관리자 페이지"
                fill
                sizes="(max-width: 768px) 100vw, 520px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .aps-split {
          display: flex;
          align-items: center;
          gap: clamp(1.75rem, 4vw, 3.5rem);
        }
        .aps-text { flex: 1; min-width: 0; }
        .aps-img { flex: 1; min-width: 0; }
        @media (max-width: 768px) {
          .aps-split { flex-direction: column; align-items: stretch; }
          .aps-img { max-width: 360px; }
        }
      `}</style>
    </section>
  );
}
