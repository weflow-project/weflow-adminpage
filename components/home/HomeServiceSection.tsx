import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import {
  MessageCircle,
  Workflow,
  Palette,
  Code2,
  MonitorSmartphone,
  Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const STEPS: { num: string; Icon: LucideIcon; title: string; desc: string }[] =
  [
    {
      num: "01",
      Icon: MessageCircle,
      title: "상담·진단",
      desc: "업종·제작 방향 확인",
    },
    {
      num: "02",
      Icon: Workflow,
      title: "기획·설계",
      desc: "문의로 이어지는 구조 설계",
    },
    {
      num: "03",
      Icon: Palette,
      title: "디자인",
      desc: "브랜드 맞춤 화면 구성",
    },
    { num: "04", Icon: Code2, title: "개발", desc: "필요한 기능·페이지 구현" },
    {
      num: "05",
      Icon: MonitorSmartphone,
      title: "반응형·점검",
      desc: "PC·모바일 + 최종 검수",
    },
    {
      num: "06",
      Icon: Share2,
      title: "제휴 마케팅 연결 (선택형)",
      desc: "블로그·인스타·유튜브 숏폼·네이버 플레이스 정기 업로드",
    },
  ];

export default function HomeServiceSection() {
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
          <span className="footnote emphasized c-accent">서비스</span>
          <h2
            className="title-1"
            style={{
              marginTop: "0.75rem",
              textAlign: "left",
              wordBreak: "keep-all",
            }}
          >
            제작부터 마케팅까지,{" "}
            <br className="br-mobile" />
            <span className="c-accent">하나의 흐름</span>으로
          </h2>
          <p
            className="body c-muted"
            style={{
              margin: "1rem 0 0",
              maxWidth: "620px",
              wordBreak: "keep-all",
            }}
          >
            상담부터 제휴 마케팅 연결까지,{" "}
            <br className="br-mobile" />
            WEFLOW의 6단계 프로세스로 완성합니다.
          </p>
        </Reveal>

        {/* 6단계 프로세스 */}
        <Reveal as="div" stagger className="svc-steps">
          {STEPS.map(({ num, Icon, title, desc }) => (
            <div key={num} className="svc-step">
              <span className="svc-step-num">{num}</span>
              <span className="svc-step-icon">
                <Icon size={22} strokeWidth={2} />
              </span>
              <h3
                className="headline"
                style={{ margin: "0 0 0.3rem", wordBreak: "keep-all" }}
              >
                {title}
              </h3>
              <p
                className="callout c-muted"
                style={{ margin: 0, wordBreak: "keep-all" }}
              >
                {desc}
              </p>
              <div className="svc-step-img">
                <Image
                  src={`/images/main/main-service-${num}.png`}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          ))}
        </Reveal>

        {/* 링크 */}
        <div style={{ marginTop: "1.75rem" }}>
          <Link
            href="/service"
            className="subhead emphasized c-accent"
            style={{ textDecoration: "none", fontSize: "1.1rem" }}
          >
            서비스 전체 보기 ›
          </Link>
        </div>
      </div>

      <style>{`
        .svc-steps {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.1rem;
        }
        .svc-step {
          position: relative;
          overflow: hidden;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 1.6rem;
          transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .svc-step:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 12px 28px rgba(51,115,223,0.13);
        }
        .svc-step-num {
          position: absolute;
          top: 0.8rem;
          right: 1rem;
          font-size: 5.5rem;
          font-weight: 800;
          color: var(--accent);
          opacity: 0.12;
          line-height: 1;
          pointer-events: none;
        }
        .svc-step-icon {
          display: inline-flex;
          width: 46px;
          height: 46px;
          border-radius: var(--radius-xl);
          background: var(--accent-light);
          color: var(--accent);
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .svc-step-img {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 4 / 3;
          margin-top: 1.1rem;
          border-radius: var(--radius-xl);
          background: #e6eaf1;
          border: 1px solid var(--border);
        }
        @media (max-width: 640px) {
          .svc-steps { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
