import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function ComparisonCTA() {
  return (
    <section
      style={{
        background: "var(--bg-secondary)",
        padding: "clamp(2rem, 5vw, 3.5rem) 1.25rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        <Reveal
          as="div"
          variant="zoom"
          className="cmp-banner"
          style={{
            position: "relative",
            borderRadius: "clamp(20px, 3vw, 28px)",
            background: "linear-gradient(100deg, #2a4f9e 0%, #5b9ccb 100%)",
            padding: "clamp(2rem, 5vw, 3rem) clamp(1.75rem, 5vw, 3.5rem)",
            minHeight: "220px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* 텍스트 */}
          <div className="cmp-text" style={{ position: "relative", zIndex: 1 }}>
            <h2
              className="title-2 emphasized"
              style={{ color: "#fff", margin: 0, wordBreak: "keep-all" }}
            >
              혹시, 타사와 고민 중이신가요?
            </h2>
            <p
              className="callout"
              style={{
                color: "rgba(255,255,255,0.85)",
                margin: "0.6rem 0 1.4rem",
                wordBreak: "keep-all",
              }}
            >
              기능부터 가격까지 볼 수 있는 비교자료를 한 눈에 확인해보세요.
            </p>
            <Link
              href="/pricing"
              className="subhead emphasized"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#fff",
                color: "var(--accent)",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(21,51,107,0.18)",
              }}
            >
              비교자료 보러가기
            </Link>
          </div>

          {/* 캐릭터 이미지 */}
          <div className="cmp-char">
            <Image
              src="/images/main/main-character.png"
              alt="위플로우 캐릭터"
              fill
              sizes="(max-width: 768px) 240px, 720px"
              style={{ objectFit: "contain", objectPosition: "bottom" }}
            />
          </div>
        </Reveal>
      </div>

      <style>{`
        .cmp-text { max-width: 60%; }
        .cmp-char {
          position: absolute;
          right: -24rem;
          bottom: -1.8rem;
          width: clamp(700px, 72vw, 1050px);
          height: 155%;
        }
        @media (max-width: 768px) {
          .cmp-text { max-width: 70%; }
          .cmp-char {
            right: -4rem;
            bottom: 0;
            width: 230px;
            height: 118%;
          }
        }
        @media (max-width: 420px) {
          .cmp-text { max-width: 62%; }
          .cmp-char { right: -4.5rem; width: 200px; }
        }
      `}</style>
    </section>
  );
}
