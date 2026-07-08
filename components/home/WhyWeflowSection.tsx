import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { X, PencilRuler, Workflow, ShieldCheck, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const AI_CONS = [
  "어디서 본 듯한 천편일률 템플릿",
  "맥락 없이 자동 생성된 어색한 문구",
  "문의(전환)를 고려하지 않은 구조",
  "운영·수정·검색 노출은 결국 내 몫",
];

const DIFFS: { Icon: LucideIcon; title: string; desc: string; img: string }[] = [
  {
    Icon: PencilRuler,
    title: "사람이 직접 기획·설계",
    desc: "템플릿이 아니라, 전문가가 목표부터 구조까지 전략을 세웁니다.",
    img: "/images/main/main-weflow-02.png",
  },
  {
    Icon: Workflow,
    title: "고객만의 맞춤 플로우",
    desc: "업종·고객 흐름에 맞춰 방문자가 문의에 이르는 동선을 설계합니다.",
    img: "/images/main/main-weflow-03.png",
  },
  {
    Icon: ShieldCheck,
    title: "신뢰감 있는 완성도",
    desc: "브랜드를 담은 디자인으로 고객이 믿고 연락하는 홈페이지를 만듭니다.",
    img: "/images/main/main-weflow-04.png",
  },
];

export default function WhyWeflowSection() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(3rem, 7vw, 5.5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* Beat 1 — 질문 던지기 */}
        <Reveal
          variant="up"
          style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto" }}
        >
          <span
            className="footnote emphasized c-accent"
            style={{ letterSpacing: "0.04em" }}
          >
            AI의 함정
          </span>
          <h2
            className="title-1"
            style={{ margin: "0.9rem 0 0", wordBreak: "keep-all" }}
          >
            “요즘 AI가 대세라던데,
            <br />
            그냥 내가 만들면 되지 않을까?”
          </h2>
          <p
            className="body c-muted"
            style={{
              margin: "1rem auto 0",
              maxWidth: "520px",
              wordBreak: "keep-all",
            }}
          >
            누구나 한 번쯤 하는 생각입니다.{" "}
            <br className="br-mobile" />
            그런데 막상 만들어 보면—
          </p>
        </Reveal>

        {/* Beat 2 — AI 결과물 + 단점 */}
        <div
          className="why-split"
          style={{ marginTop: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          {/* 이미지(브라우저 목업) 자리 — 추후 교체 */}
          <div
            style={{
              borderRadius: "var(--radius-2xl)",
              border: "1px solid var(--border)",
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.65rem 0.9rem",
                background: "var(--surface-container)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "9999px",
                  background: "#ff5f57",
                }}
              />
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "9999px",
                  background: "#febc2e",
                }}
              />
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "9999px",
                  background: "#28c840",
                }}
              />
            </div>
            <div
              style={{
                aspectRatio: "16 / 10",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/main/main-ai-homepage.png"
                alt="AI로만 만든 홈페이지 예시"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>

          {/* 단점 */}
          <div>
            <h3
              className="title-2 emphasized"
              style={{ margin: "0 0 0.85rem", wordBreak: "keep-all" }}
            >
              우리가 원했던 건 <span className="c-accent">이게 아니죠.</span>
            </h3>
            <p
              className="body c-muted"
              style={{
                margin: "0 0 1.5rem",
                wordBreak: "keep-all",
                fontSize: "clamp(1.05rem, 2.4vw, 1.2rem)",
              }}
            >
              AI가 뚝딱 만들어 준 결과물엔,{" "}
              <br className="br-mobile" />
              이런 한계가 반복됩니다.
            </p>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1.05rem",
              }}
            >
              {AI_CONS.map((t) => (
                <li
                  key={t}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 26,
                      height: 26,
                      borderRadius: "9999px",
                      background: "#fef2f2",
                      color: "#ef4444",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "1px",
                    }}
                  >
                    <X size={15} strokeWidth={2.5} />
                  </span>
                  <span
                    className="body c-secondary"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Beat 3 — 전환점 (핵심 강조) */}
        <Reveal
          variant="fade"
          style={{
            textAlign: "center",
            maxWidth: "820px",
            margin: "clamp(8rem, 17vw, 13rem) auto",
          }}
        >
          <h2
            className="title-1"
            style={{ margin: 0, wordBreak: "keep-all", lineHeight: 1.35 }}
          >
            우리가 원한 건 <br className="wf-br-m" />
            <span
              className="c-accent emphasized hl"
              style={{ transitionDelay: "0.35s" }}
            >
              홈페이지 다운 홈페이지
            </span>
            ,
            <br />
            고객이{" "}
            <span
              className="c-accent emphasized hl"
              style={{ transitionDelay: "0.75s" }}
            >
              신뢰할 수 있는
            </span>{" "}
            <br className="wf-br-m" />
            홈페이지였습니다.
          </h2>
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              marginTop: "clamp(2rem, 5vw, 3rem)",
              width: "100%",
              aspectRatio: "16 / 9",
              borderRadius: "var(--radius-2xl)",
              background: "#e6eaf1",
              border: "1px solid var(--border)",
            }}
          >
            <Image
              src="/images/main/main-weflow-01.png"
              alt="홈페이지다운 홈페이지"
              fill
              sizes="(max-width: 1100px) 100vw, 1100px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </Reveal>

        {/* Beat 4 — 그래서 위플로우 */}
        <div style={{ marginTop: 0 }}>
          <SplitText
            as="p"
            className="title-1 emphasized"
            style={{ textAlign: "center", margin: "0 0 1rem" }}
            segments={[
              { text: "그래서, " },
              { text: "WEFLOW", className: "c-accent" },
              { text: "입니다." },
            ]}
          />
          <p
            className="body c-muted"
            style={{
              textAlign: "center",
              maxWidth: "620px",
              margin: "0 auto clamp(2.5rem, 6vw, 3.5rem)",
              wordBreak: "keep-all",
              fontSize: "clamp(1.05rem, 2.4vw, 1.25rem)",
            }}
          >
            AI가 채우지 못한 자리를, 사람이 전략으로 채웁니다.
          </p>

          {/* 차별점 3카드 */}
          <div className="why-diffs" style={{ marginTop: "1.1rem" }}>
            {DIFFS.map(({ Icon, title, desc, img }) => (
              <div
                key={title}
                style={{
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-2xl)",
                  padding: "1.6rem",
                }}
              >
                <span
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: "var(--radius-xl)",
                    background: "var(--accent-light)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
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
                <div className="why-diff-img">
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
          </div>
        </div>

        {/* Beat 5 — 마무리 + CTA */}
        <div
          style={{ textAlign: "center", marginTop: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          <p
            className="title-2"
            style={{ margin: "0 0 1.5rem", wordBreak: "keep-all" }}
          >
            보기 좋은 페이지가 아니라,{" "}
            <br className="br-mobile" />
            <span className="c-accent emphasized">성과를 내는 페이지</span>.
          </p>
          <div style={{ display: "flex", gap: "0.9rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="tel:010-2971-7280"
              className="btn-outline"
              style={{ fontSize: "1.1rem", padding: "1rem 2.4rem" }}
            >
              전화상담하기 <ArrowRight size={18} strokeWidth={2.5} />
            </a>
            <Link
              href="/diagnosis"
              className="btn-primary"
              style={{ fontSize: "1.1rem", padding: "1rem 2.4rem" }}
            >
              무료 진단 신청하기
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .why-split {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(1.5rem, 4vw, 3rem);
          align-items: center;
        }
        .why-diffs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        .why-diff-img {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 4 / 3;
          margin-top: 1.25rem;
          border-radius: var(--radius-xl);
          background: #e6eaf1;
          border: 1px solid var(--border);
        }
        .wf-br-m { display: none; }
        @media (max-width: 768px) {
          .why-split, .why-diffs { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .wf-br-m { display: inline; }
        }
      `}</style>
    </section>
  );
}
