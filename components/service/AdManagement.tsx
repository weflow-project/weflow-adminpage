"use client";
import { useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { FileEdit, Camera, PlaySquare, MapPin, BarChart2, Globe } from "lucide-react";
import Reveal from "@/components/Reveal";

const AD_SERVICES: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: FileEdit, title: "블로그 업로드", desc: "네이버 블로그 정기 업로드" },
  { Icon: Camera, title: "인스타 업로드", desc: "인스타그램·메타 광고 정기 업로드" },
  { Icon: PlaySquare, title: "유튜브 숏폼", desc: "유튜브 숏폼 제작·업로드 운영" },
  { Icon: MapPin, title: "네이버 플레이스", desc: "지역 검색·지도 노출 등록·관리" },
  {
    Icon: BarChart2,
    title: "네이버 서치어드바이저",
    desc: "사이트 맵을 활용한 네이버 검색 상단 등록",
  },
  { Icon: Globe, title: "구글 콘솔", desc: "사이트 맵을 활용한 구글 검색 상단 등록" },
];

function AdCard({
  Icon,
  title,
  desc,
  img,
}: {
  Icon: LucideIcon;
  title: string;
  desc: string;
  img?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#ebf2ff" : "#fff",
        border: hovered
          ? "1.5px solid var(--accent)"
          : "1.5px solid var(--border)",
        borderRadius: "10px",
        padding: "1.25rem",
        cursor: "default",
        transition: "all 0.18s",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          background: hovered ? "var(--accent)" : "#ebf2ff",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "0.85rem",
          transition: "background 0.18s",
        }}
      >
        <Icon
          size={20}
          color={hovered ? "#fff" : "var(--accent)"}
          strokeWidth={2}
        />
      </div>
      <h4
        className="headline c-primary"
        style={{ margin: "0 0 0.4rem", wordBreak: "keep-all" }}
      >
        {title}
      </h4>
      <p className="callout c-muted" style={{ margin: 0, wordBreak: "keep-all" }}>
        {desc}
      </p>
      <div className="ad-card-img">
        {img ? (
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 340px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <span className="ad-img-ph">이미지</span>
        )}
      </div>
    </div>
  );
}

export default function AdManagement() {
  return (
    <section
      style={{
        padding: "3.5rem 1.5rem",
        background: "#fff",
        scrollSnapAlign: "start",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 */}
        <Reveal
          variant="up"
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <p
            className="caption-1 emphasized c-accent"
            style={{
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
            }}
          >
            AD MANAGEMENT
          </p>
          <h2 className="title-1 ad-title" style={{ margin: "0 0 0.5rem" }}>
            제휴 마케팅 업체 연결 · 기본제공 시스템
          </h2>
          <p className="body c-muted" style={{ margin: 0 }}>
            제작 후에도 꾸준히 성장할 수 있도록 전방위 운영을 지원합니다
          </p>
        </Reveal>

        {/* 카드 그리드 */}
        <Reveal as="div" stagger className="ad-grid">
          {AD_SERVICES.map(({ Icon, title, desc }, i) => (
            <AdCard
              key={title}
              Icon={Icon}
              title={title}
              desc={desc}
              img={`/images/service/service${i + 18}.png`}
            />
          ))}
        </Reveal>

        {/* 안내 문구 */}
        <Reveal
          variant="up"
          style={{
            marginTop: "2rem",
            padding: "1rem 1.25rem",
            background: "#f9fafb",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <p className="footnote c-muted" style={{ margin: 0 }}>
            플랜에 따라 운영 항목이 달라집니다.
            <span className="c-accent semibold"> 무료 진단</span>을 통해 맞춤
            운영 플랜을 확인하세요.
          </p>
        </Reveal>
      </div>

      <style>{`
        .ad-title { font-size: clamp(2rem, 4.5vw, 3rem); }
        .ad-card-img {
          position: relative;
          overflow: hidden;
          width: 100%;
          aspect-ratio: 16 / 9;
          margin-top: 0.9rem;
          border-radius: 8px;
          background: #e6eaf1;
          border: 1px solid var(--border);
        }
        .ad-img-ph {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .ad-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.9rem;
        }
        @media (max-width: 768px) {
          .ad-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .ad-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
