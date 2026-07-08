import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";

export default function ServiceSwitch() {
  return (
    <section
      style={{
        background: "#fff",
        padding: "clamp(4rem, 9vw, 7rem) 1.25rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <Reveal variant="up">
          <p
            className="footnote emphasized c-accent"
            style={{ margin: "0 0 0.85rem" }}
          >
            여기서 하나 더
          </p>
        </Reveal>
        <SplitText
          as="h2"
          className="title-1 svc-switch-title"
          style={{ margin: 0, wordBreak: "keep-all", lineHeight: 1.4 }}
          step={0.024}
          segments={[
            { text: "타 서비스에서 전환하신다면?\n" },
            { text: "고민 전 " },
            { text: "문의 요망!", className: "c-accent emphasized" },
          ]}
        />

        {/* 이미지 박스 2개 */}
        <Reveal as="div" stagger className="svc-switch-boxes">
          {[0, 1].map((i) => (
            <div key={i} className="svc-switch-img">
              <Image
                src={`/images/service/service${i + 16}.png`}
                alt="타 서비스 전환"
                fill
                sizes="(max-width: 760px) 100vw, 420px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </Reveal>
      </div>

      <style>{`
        .svc-switch-title {
          font-size: clamp(2.2rem, 5.5vw, 3.5rem);
        }
        .svc-switch-boxes {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.1rem;
          margin-top: clamp(2rem, 4vw, 3rem);
        }
        .svc-switch-img {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: var(--radius-2xl);
          background: #e6eaf1;
          border: 1px solid var(--border);
        }
        @media (max-width: 760px) {
          .svc-switch-boxes { grid-template-columns: 1fr; max-width: 420px; margin-left: auto; margin-right: auto; }
        }
      `}</style>
    </section>
  );
}
