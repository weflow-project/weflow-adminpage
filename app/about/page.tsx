import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PencilRuler, Workflow, Wrench, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";

export const metadata: Metadata = {
  title: "회사소개 · WEFLOW",
  description:
    "사람과 기술이 함께 흘러가며 더 좋은 방향을 만드는 회사, WEFLOW.",
};

const VALUES: { Icon: LucideIcon; title: string; desc: string; img: string }[] = [
  {
    Icon: PencilRuler,
    title: "직접 기획·설계",
    desc: "템플릿이 아니라, 사람이 목표부터 구조까지 전략을 세웁니다.",
    img: "/images/about/about6.png",
  },
  {
    Icon: Workflow,
    title: "맞춤형 플로우",
    desc: "업종과 고객 흐름에 맞춰 문의로 이어지는 동선을 설계합니다.",
    img: "/images/about/about7.png",
  },
  {
    Icon: Wrench,
    title: "지속 가능한 운영",
    desc: "제작 이후에도 광고 연동·유지보수·운영까지 함께합니다.",
    img: "/images/about/about8.png",
  },
];

const MEANING: { key: string; desc: string; img: string }[] = [
  { key: "WE", desc: "우리 · 사람 · 관계 · 함께하는 가치", img: "/images/about/about2.png" },
  { key: "FLOW", desc: "흐름 · 성장 · 연결 · 앞으로 나아가는 움직임", img: "/images/about/about3.png" },
];

const STORY: string[] = [
  "처음엔 돈도, 스펙도, 대단한 기술도 없었습니다.",
  "하지만 사람과 관계, 그리고 좋은 흐름은 결국 큰 결과를 만든다고 믿었습니다.",
  "우리는 혼자 성공하는 회사보다, 함께 흘러가며 성장하는 회사를 만들고 싶었습니다.",
];

const INFO: { label: string; value: string }[] = [
  { label: "상호", value: "WEFLOW (위플로우)" },
  { label: "대표", value: "신서준" },
  { label: "사업자등록번호", value: "884-07-03480" },
  { label: "이메일", value: "contact@weflowlab.kr" },
  { label: "운영시간", value: "연중무휴 24시간 상담 가능" },
];

export default function AboutPage() {
  return (
    <main style={{ background: "#fff" }}>
      {/* 인트로 */}
      <section
        style={{
          padding: "clamp(3.5rem, 7vw, 6rem) 1.25rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="about-hero">
          <Reveal variant="up">
            <span className="footnote emphasized c-accent">회사소개</span>
          </Reveal>
          <SplitText
            as="h1"
            className="title-1 about-hero-title"
            style={{ margin: "1rem 0 0", wordBreak: "keep-all" }}
            segments={[
              { text: "사람이 움직이면, " },
              { text: "기술은 따라온다", className: "c-accent" },
            ]}
          />
          <Reveal variant="up" delay={0.15}>
            <p
              className="title-3 c-muted"
              style={{ margin: "1rem 0 0", letterSpacing: "0.01em" }}
            >
              People move. Technology follows.
            </p>
            <p
              className="about-hero-body c-secondary"
              style={{
                margin: "1.75rem 0 0",
                maxWidth: "720px",
                wordBreak: "keep-all",
                lineHeight: 1.8,
              }}
            >
              WEFLOW는 사람과 기술이 함께 흘러가며 더 좋은 방향을 만드는
              회사입니다. 단순히 개발만 하는 회사가 아니라, 기술은 뒤에서
              받쳐주고 사람은 앞에서 빛나게 하는 흐름을 만듭니다.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <div
              className="about-img"
              style={{
                aspectRatio: "16 / 9",
                marginTop: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              <Image
                src="/images/about/about1.png"
                alt="WEFLOW"
                fill
                sizes="(max-width: 1000px) 100vw, 1000px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* WE · FLOW 의미 */}
      <section style={{ padding: "clamp(3rem, 6vw, 4.5rem) 1.25rem" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <Reveal variant="up">
            <h2
              className="title-2 emphasized"
              style={{
                margin: "0 0 clamp(1.5rem, 4vw, 2.25rem)",
                wordBreak: "keep-all",
              }}
            >
              이름에 담은 의미
            </h2>
          </Reveal>
          <Reveal as="div" stagger className="about-grid-2">
            {MEANING.map(({ key, desc, img }) => (
              <div key={key} className="about-meaning-card">
                <p
                  className="large-title c-accent"
                  style={{ margin: "0 0 0.5rem", lineHeight: 1 }}
                >
                  {key}
                </p>
                <p
                  className="headline"
                  style={{ margin: 0, wordBreak: "keep-all" }}
                >
                  {desc}
                </p>
                <div className="about-card-img">
                  <Image
                    src={img}
                    alt={key}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 철학 문장 */}
      <section
        style={{
          padding: "clamp(3.5rem, 8vw, 6rem) 1.25rem",
          background: "var(--bg-secondary)",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <SplitText
            as="h2"
            className="title-1"
            style={{ margin: 0, wordBreak: "keep-all", lineHeight: 1.5 }}
            step={0.024}
            segments={[
              { text: "기술은 " },
              { text: "뒤에서 받쳐주고", className: "c-accent emphasized" },
              { text: ", 사람은 " },
              { text: "앞에서 빛나게", className: "c-accent emphasized" },
              { text: " 하는 흐름" },
            ]}
          />
        </div>
      </section>

      {/* 브랜드 스토리 */}
      <section style={{ padding: "clamp(3rem, 7vw, 5rem) 1.25rem" }}>
        <div className="about-story">
          <Reveal variant="up">
            <span className="footnote emphasized c-accent">우리의 시작</span>
          </Reveal>
          <Reveal
            as="div"
            stagger
            style={{
              marginTop: "1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem",
            }}
          >
            {STORY.map((line) => (
              <p
                key={line}
                className="c-secondary"
                style={{
                  margin: 0,
                  wordBreak: "keep-all",
                  fontSize: "clamp(1.2rem, 2.6vw, 1.5rem)",
                  lineHeight: 1.85,
                }}
              >
                {line}
              </p>
            ))}
            <p
              className="emphasized"
              style={{
                margin: "1.5rem 0 0",
                wordBreak: "keep-all",
                fontSize: "clamp(1.9rem, 5vw, 3rem)",
                lineHeight: 1.3,
              }}
            >
              그래서 이름은{" "}
              <span className="c-accent" style={{ fontWeight: 800 }}>
                WEFLOW
              </span>
              입니다.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1rem",
                marginTop: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              {[0, 1].map((i) => (
                <div key={i} className="about-img" style={{ aspectRatio: "4 / 3" }}>
                  <Image
                    src={`/images/about/about${i + 4}.png`}
                    alt="WEFLOW 이야기"
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 일하는 방식 */}
      <section
        style={{
          padding: "clamp(3rem, 6vw, 4.5rem) 1.25rem",
          background: "var(--bg-secondary)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <Reveal variant="up">
            <h2
              className="title-2 emphasized"
              style={{
                margin: "0 0 clamp(1.5rem, 4vw, 2.25rem)",
                wordBreak: "keep-all",
              }}
            >
              WEFLOW가 일하는 방식
            </h2>
          </Reveal>
          <Reveal as="div" stagger className="about-grid-3">
            {VALUES.map(({ Icon, title, desc, img }) => (
              <div key={title} className="about-value-card">
                <span className="about-value-icon">
                  <Icon size={22} strokeWidth={2} />
                </span>
                <h3
                  className="headline"
                  style={{ margin: "0 0 0.4rem", wordBreak: "keep-all" }}
                >
                  {title}
                </h3>
                <p
                  className="callout"
                  style={{ margin: 0, wordBreak: "keep-all" }}
                >
                  {desc}
                </p>
                <div className="about-card-img">
                  <Image
                    src={img}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 회사 정보 */}
      <section style={{ padding: "clamp(2.5rem, 5vw, 4rem) 1.25rem" }}>
        <div style={{ maxWidth: "820px", margin: "0 auto", width: "100%" }}>
          <Reveal variant="up">
            <h2 className="title-2 emphasized" style={{ margin: "0 0 1.5rem" }}>
              회사 정보
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-2xl)",
                overflow: "hidden",
              }}
            >
              {INFO.map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "1rem 1.4rem",
                    borderTop: i === 0 ? "none" : "1px solid var(--border)",
                  }}
                >
                  <span
                    className="subhead emphasized c-primary"
                    style={{ flex: "0 0 140px" }}
                  >
                    {label}
                  </span>
                  <span className="callout">{value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "clamp(3.5rem, 7vw, 5.5rem) 1.25rem",
          background: "var(--accent-dim)",
          textAlign: "center",
        }}
      >
        <Reveal variant="zoom">
          <p
            className="emphasized"
            style={{
              margin: 0,
              color: "#fff",
              wordBreak: "keep-all",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              lineHeight: 1.25,
            }}
          >
            Flow Together, Grow Beyond.
          </p>
          <p
            style={{
              margin: "0.9rem 0 2rem",
              color: "#9dbff6",
              fontSize: "clamp(1.15rem, 2.6vw, 1.4rem)",
            }}
          >
            함께 흐르고, 더 크게 성장하다
          </p>
          <div style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="tel:010-2971-7280"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "1.15rem",
                fontWeight: 700,
                padding: "0.9rem 2rem",
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
              style={{ fontSize: "1.15rem", padding: "0.9rem 2rem" }}
            >
              무료 진단 신청하기
            </Link>
          </div>
        </Reveal>
      </section>

      <style>{`
        .about-hero {
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }
        .about-hero-title {
          font-size: clamp(2.4rem, 6vw, 4rem);
          line-height: 1.2;
        }
        .about-hero-body {
          font-size: clamp(1.15rem, 2.6vw, 1.4rem);
        }
        .about-story {
          max-width: 1000px;
          margin: 0 auto;
          width: 100%;
        }
        .about-img {
          position: relative;
          overflow: hidden;
          width: 100%;
          border-radius: var(--radius-2xl);
          background: #e6eaf1;
          border: 1px solid var(--border);
        }
        .about-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.1rem; }
        .about-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.1rem; }
        .about-meaning-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: clamp(1.5rem, 3vw, 2rem);
          transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .about-meaning-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 12px 28px rgba(51,115,223,0.13);
        }
        .about-card-img {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 9;
          margin-top: 1.1rem;
          border-radius: var(--radius-xl);
          background: #e6eaf1;
          border: 1px solid var(--border);
        }
        .about-value-card {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 1.75rem 1.6rem;
          transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .about-value-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 12px 28px rgba(51,115,223,0.13);
        }
        .about-value-icon {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-xl);
          background: var(--accent-light);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.1rem;
        }
        @media (max-width: 768px) {
          .about-grid-2, .about-grid-3 { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
