import {
  ArrowUpRight,
  Share2,
  BadgePercent,
  Clock,
  MessageCircle,
  Users,
  Wrench,
  MonitorSmartphone,
  LayoutDashboard,
  Link2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";

const FEATURES: {
  Icon: LucideIcon;
  title: string;
  desc: string;
  only?: boolean;
}[] = [
  {
    Icon: Share2,
    title: "제휴 마케팅 연결 (선택형)",
    desc: "블로그·인스타·유튜브 숏폼·네이버 플레이스까지, 제휴 채널에 월 정기 업로드로 동시 노출합니다.",
    only: true,
  },
  {
    Icon: LayoutDashboard,
    title: "관리자 페이지 제공 (선택형)",
    desc: "통계를 통해 문의·예약을 관리하고 관리자 DB를 확보합니다.",
  },
  {
    Icon: MonitorSmartphone,
    title: "반응형 디자인 (PC/MO)",
    desc: "PC·모바일 등 모든 기기에서 최적화된 화면을 보여줍니다.",
  },
  {
    Icon: Link2,
    title: "SNS 연동",
    desc: "카카오톡, 인스타그램 등 원하는 플랫폼을 자유롭게 연동합니다.",
  },
  {
    Icon: Users,
    title: "1:1 맞춤 시스템",
    desc: "전담 담당자가 고객 한 분을 1:1로 전담 케어합니다.",
  },
  {
    Icon: MessageCircle,
    title: "고객의 소리",
    desc: "충분한 소통으로 고객이 진짜 원하는 것을 먼저 반영합니다.",
  },
  {
    Icon: Wrench,
    title: "각 상품별 전용 유지보수",
    desc: "도메인·수정·운영까지 상품에 맞춘 유지보수를 제공합니다.",
  },
  {
    Icon: BadgePercent,
    title: "합리적 가성비",
    desc: "필요한 기능만 구성해 부담 없는 합리적인 비용으로 시작합니다.",
  },
  {
    Icon: Clock,
    title: "24시간 상담 대기",
    desc: "연중무휴 24시간, 언제 문의하셔도 빠르게 응답합니다.",
  },
];

export default function ServiceFeatures() {
  return (
    <section
      style={{ background: "#fff", padding: "clamp(3rem, 6vw, 5rem) 1.25rem" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 */}
        <div style={{ marginBottom: "clamp(2rem, 4vw, 3rem)" }}>
          <Reveal variant="up">
            <span className="footnote emphasized c-accent">
              WEFLOW만의 서비스
            </span>
          </Reveal>
          <SplitText
            as="h2"
            className="title-1 svc-feat-title"
            style={{ marginTop: "0.75rem", wordBreak: "keep-all" }}
            segments={[
              { text: "WEFLOW만의 " },
              { text: "강점", className: "c-accent" },
              { text: "을\n지금 바로 경험하세요" },
            ]}
          />
        </div>

        {/* 카드 그리드 */}
        <Reveal as="div" stagger className="svc-feat-grid">
          {FEATURES.map(({ Icon, title, desc, only }, i) => (
            <div key={title} className="svc-feat-card">
              {/* WEFLOW ONLY 배지 */}
              {only && (
                <span
                  className="caption-2 emphasized"
                  style={{
                    position: "absolute",
                    top: "1.1rem",
                    right: "1.1rem",
                    background: "var(--accent)",
                    color: "#fff",
                    padding: "3px 9px",
                    borderRadius: "9999px",
                    letterSpacing: "0.04em",
                  }}
                >
                  WEFLOW ONLY
                </span>
              )}

              {/* 아이콘 */}
              <span
                style={{
                  width: "46px",
                  height: "46px",
                  borderRadius: "var(--radius-xl)",
                  background: "var(--accent-light)",
                  color: "var(--accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.1rem",
                }}
              >
                <Icon size={22} strokeWidth={2} />
              </span>

              {/* 제목 + 화살표 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  marginBottom: "0.4rem",
                }}
              >
                <h3
                  className="headline"
                  style={{ margin: 0, wordBreak: "keep-all" }}
                >
                  {title}
                </h3>
                <ArrowUpRight
                  size={16}
                  strokeWidth={2.2}
                  color="var(--text-muted)"
                  style={{ flexShrink: 0 }}
                />
              </div>

              {/* 설명 */}
              <p
                className="callout"
                style={{ margin: "0 0 1.1rem", wordBreak: "keep-all" }}
              >
                {desc}
              </p>

              {/* 이미지 (관리자 페이지 제공 카드는 제외) */}
              <div className="svc-feat-img">
                <Image
                  src={`/images/service/service${i + 1}.png`}
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

      <style>{`
        .svc-feat-title {
          font-size: clamp(2rem, 4.5vw, 3rem);
          line-height: 1.25;
        }
        .svc-feat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        .svc-feat-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #f4f6fa;
          border: 1px solid transparent;
          border-radius: var(--radius-2xl);
          padding: 1.75rem 1.6rem;
          transition: background 0.18s, transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .svc-feat-card:hover {
          background: #fff;
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(51,115,223,0.13);
        }
        .svc-feat-img {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 9;
          margin-top: auto;
          border-radius: var(--radius-xl);
          background: #e6eaf1;
          border: 1px solid var(--border);
        }
        .svc-img-ph {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        @media (max-width: 900px) {
          .svc-feat-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .svc-feat-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
