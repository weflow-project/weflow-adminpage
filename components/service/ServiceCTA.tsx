import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function ServiceCTA() {
  return (
    <section
      style={{
        padding: "clamp(2.5rem, 5vw, 3.5rem) 1.5rem",
        background: "#f9fafb",
        borderTop: "1px solid var(--border)",
        scrollSnapAlign: "start",
      }}
    >
      <Reveal
        variant="zoom"
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        <p
          className="caption-1 emphasized c-accent"
          style={{
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "0.85rem",
          }}
        >
          GET STARTED
        </p>

        <h2
          className="emphasized"
          style={{
            marginBottom: "1rem",
            wordBreak: "keep-all",
            fontSize: "clamp(2.2rem, 5.5vw, 3.5rem)",
            lineHeight: 1.25,
          }}
        >
          지금 바로 시작하세요
        </h2>

        <p
          className="c-muted"
          style={{
            marginBottom: "2rem",
            wordBreak: "keep-all",
            fontSize: "clamp(1.1rem, 2.6vw, 1.35rem)",
            lineHeight: 1.7,
          }}
        >
          무료 진단을 통해 내 사이트의 문제를 파악하고,
          <br className="br-mobile" /> 찾아오는 고객을 늘려보세요.
        </p>

        {/* CTA 버튼 */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="tel:010-2971-7280"
            className="btn-outline"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontSize: "1.1rem",
              padding: "1rem 2.1rem",
            }}
          >
            전화상담하기 <ArrowRight size={18} strokeWidth={2.5} />
          </a>
          <Link
            href="/diagnosis"
            className="btn-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              fontSize: "1.1rem",
              padding: "1rem 2.1rem",
            }}
          >
            무료 진단 신청 <ArrowRight size={18} strokeWidth={2.5} />
          </Link>
        </div>
      </Reveal>

      <style>{`
        .br-mobile { display: none; }
        @media (max-width: 560px) {
          .br-mobile { display: inline; }
        }
      `}</style>
    </section>
  );
}
