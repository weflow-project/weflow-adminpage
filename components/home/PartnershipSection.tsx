import type { IconType } from "react-icons";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { SiNaver } from "react-icons/si";
import { FaInstagram, FaYoutube, FaMapMarkerAlt } from "react-icons/fa";
import { TrendingUp } from "lucide-react";

function IconChip({
  Icon,
  size = 24,
  color = "var(--accent)",
  background = "var(--accent-light)",
  iconFill,
}: {
  Icon: IconType;
  size?: number;
  color?: string;
  background?: string;
  iconFill?: string;
}) {
  return (
    <span
      style={{
        width: "46px",
        height: "46px",
        flexShrink: 0,
        borderRadius: "var(--radius-xl)",
        background,
        color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon size={size} style={iconFill ? { fill: iconFill } : undefined} />
    </span>
  );
}

// 인스타그램 그라데이션 로고를 위한 SVG 그라데이션 정의 (문서에 1회만 삽입)
function InstagramGradientDef() {
  return (
    <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
      <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </svg>
  );
}

// 이미지 (src 없으면 자리표시자)
function ImagePlaceholder({
  aspectRatio,
  width,
  label = "이미지",
  src,
  style,
}: {
  aspectRatio?: string;
  width?: string;
  label?: string;
  src?: string;
  style?: React.CSSProperties;
}) {
  if (src) {
    return (
      <div
        style={{
          position: "relative",
          width: width ?? "100%",
          aspectRatio,
          flexShrink: 0,
          borderRadius: "var(--radius-xl)",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.12)",
          background: "rgba(0,0,0,0.18)",
          ...style,
        }}
      >
        <Image
          src={src}
          alt={label}
          fill
          sizes="(max-width: 860px) 100vw, 520px"
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }
  return (
    <div
      style={{
        width: width ?? "100%",
        aspectRatio,
        flexShrink: 0,
        borderRadius: "var(--radius-xl)",
        background: "rgba(0,0,0,0.18)",
        border: "1px dashed rgba(255,255,255,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9fb0c8",
        fontSize: "0.82rem",
        fontWeight: 600,
        letterSpacing: "0.02em",
        ...style,
      }}
    >
      {label}
    </div>
  );
}

// 브랜드 로고 컬러 (아이콘 색 · 칩 배경 틴트)
const BRAND = {
  naver: { color: "#03C75A", background: "rgba(3,199,90,0.12)" },
  instagram: {
    color: "#E4405F",
    background:
      "linear-gradient(45deg, rgba(240,148,51,0.14), rgba(220,39,67,0.14), rgba(188,24,136,0.14))",
    iconFill: "url(#ig-gradient)",
  },
  youtube: { color: "#FF0000", background: "rgba(255,0,0,0.10)" },
} as const;

const CHANNELS: {
  area: string;
  Icon: IconType;
  name: string;
  tag: string;
  desc: string;
  brand: { color: string; background: string };
  img: string;
}[] = [
  {
    area: "bento-ch1",
    Icon: SiNaver,
    name: "네이버 블로그",
    tag: "검색 노출",
    desc: "정보성 콘텐츠를 발행해 네이버 검색 상단에서 잠재 고객을 꾸준히 만납니다.",
    brand: BRAND.naver,
    img: "/images/main/main-partner-03.png",
  },
  {
    area: "bento-ch2",
    Icon: FaInstagram,
    name: "인스타그램",
    tag: "브랜드 도달",
    desc: "메타 광고로 브랜드 분위기를 전하고 팔로워를 잠재 고객으로 전환합니다.",
    brand: BRAND.instagram,
    img: "/images/main/main-partner-04.png",
  },
  {
    area: "bento-ch3",
    Icon: FaYoutube,
    name: "유튜브 숏폼",
    tag: "바이럴 확산",
    desc: "짧고 강한 숏폼 영상으로 빠르게 브랜드 인지도를 확산시킵니다.",
    brand: BRAND.youtube,
    img: "/images/main/main-partner-05.png",
  },
  {
    area: "bento-ch4",
    Icon: FaMapMarkerAlt,
    name: "네이버 플레이스",
    tag: "지역 노출",
    desc: "지역 검색·지도에서 우리 매장을 먼저 노출해 방문과 문의로 연결합니다.",
    brand: BRAND.naver,
    img: "/images/main/main-partner-06.png",
  },
];

export default function PartnershipSection() {
  return (
    <section
      style={{
        background: "var(--accent-dim)",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(2.5rem, 5vw, 3.5rem) 1.25rem",
      }}
    >
      <InstagramGradientDef />
      <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
        {/* 헤더 (좌측 정렬) */}
        <Reveal variant="up" style={{ marginBottom: "clamp(1.75rem, 4vw, 2.5rem)" }}>
          <span className="footnote emphasized" style={{ color: "#9dbff6" }}>
            제휴 마케팅과의 협약
          </span>
          <h2
            className="title-1"
            style={{ marginTop: "0.75rem", textAlign: "left", color: "#fff" }}
          >
            <span style={{ display: "block" }}>
              홈페이지 제작에서 끝나지 않습니다
            </span>
            <span style={{ display: "block", paddingTop: "0.5em" }}>
              {"채널 마케팅".split("").map((ch, i) =>
                ch === " " ? (
                  <span key={i}>&nbsp;</span>
                ) : (
                  <span
                    key={i}
                    className="c-accent"
                    style={{ position: "relative", display: "inline-block", color: "#8fb4ff" }}
                  >
                    <span
                      aria-hidden
                      style={{
                        position: "absolute",
                        top: "-0.28em",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "5px",
                        height: "5px",
                        borderRadius: "9999px",
                        background: "#8fb4ff",
                      }}
                    />
                    {ch}
                  </span>
                ),
              )}
              까지 함께 키웁니다
            </span>
          </h2>
        </Reveal>

        {/* 벤토 그리드 */}
        <Reveal as="div" stagger className="bento-grid">
          {/* ① 대형 개요 카드 (가로 전체 · 상단 텍스트+로고 · 하단 이미지 2개) */}
          <div className="bento-card bento-lead">
            {/* 브랜드 로고 (왼쪽 상단) */}
            <div
              style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}
            >
              <IconChip Icon={SiNaver} {...BRAND.naver} />
              <IconChip Icon={FaInstagram} {...BRAND.instagram} />
              <IconChip Icon={FaYoutube} {...BRAND.youtube} />
              <IconChip Icon={FaMapMarkerAlt} {...BRAND.naver} />
            </div>

            {/* 제목 + 협약 혜택 뱃지 (나란히) */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.6rem",
                marginBottom: "0.75rem",
              }}
            >
              <h3
                className="title-3 emphasized"
                style={{ margin: 0, wordBreak: "keep-all" }}
              >
                협약 한 번으로 <span className="c-accent">4개 채널</span>에 동시
                노출
              </h3>
              <span
                className="caption-1 emphasized c-accent"
                style={{
                  background: "var(--accent-light)",
                  padding: "3px 11px",
                  borderRadius: "9999px",
                }}
              >
                협약 혜택
              </span>
            </div>
            <p
              className="callout"
              style={{ margin: 0, maxWidth: "420px", wordBreak: "keep-all" }}
            >
              블로그·인스타그램·유튜브 숏폼·네이버 플레이스까지, 제작 이후에도
              새 고객을 데려오는 마케팅 채널이 함께 작동합니다.
            </p>

            {/* 하단: 이미지 1개 */}
            <div style={{ marginTop: "auto", paddingTop: "clamp(1.25rem, 3vw, 1.75rem)" }}>
              <ImagePlaceholder
                aspectRatio="16 / 9"
                src="/images/main/main-partner-01.png"
                label="4개 채널 동시 노출"
              />
            </div>
          </div>

          {/* ② 지속 유입 카드 */}
          <div className="bento-card bento-sub">
            <IconChip
              Icon={TrendingUp}
              color="#8fb4ff"
              background="rgba(143,180,255,0.16)"
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.6rem",
                margin: "1rem 0 0.5rem",
              }}
            >
              <h3
                className="title-3 emphasized"
                style={{ margin: 0, wordBreak: "keep-all" }}
              >
                제작 이후에도 지속되는 유입
              </h3>
              <span
                className="caption-1 emphasized c-accent"
                style={{
                  background: "var(--accent-light)",
                  padding: "3px 11px",
                  borderRadius: "9999px",
                }}
              >
                누적 효과
              </span>
            </div>
            <p className="callout" style={{ margin: 0, wordBreak: "keep-all" }}>
              콘텐츠가 쌓일수록 검색·추천 유입이 누적되어, 시간이 지날수록 더
              강해집니다.
            </p>
            <div style={{ marginTop: "auto", paddingTop: "clamp(1.25rem, 3vw, 1.75rem)" }}>
              <ImagePlaceholder
                aspectRatio="16 / 9"
                src="/images/main/main-partner-02.png"
                label="제작 이후에도 지속되는 유입"
              />
            </div>
          </div>

          {/* ③④⑤ 채널 카드 (아이콘 상단 · 텍스트 · 하단 이미지 — 지속 유입 카드와 동일 구조) */}
          {CHANNELS.map(({ area, Icon, name, tag, desc, brand, img }) => (
            <div key={name} className={`bento-card ${area}`}>
              <IconChip Icon={Icon} {...brand} />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  margin: "1rem 0 0.5rem",
                }}
              >
                <h3 className="title-3 emphasized" style={{ margin: 0 }}>
                  {name}
                </h3>
                <span
                  className="caption-1 emphasized c-accent"
                  style={{
                    background: "var(--accent-light)",
                    padding: "3px 11px",
                    borderRadius: "9999px",
                  }}
                >
                  {tag}
                </span>
              </div>
              <p
                className="callout"
                style={{ margin: 0, wordBreak: "keep-all" }}
              >
                {desc}
              </p>
              <ImagePlaceholder
                aspectRatio="16 / 9"
                src={img}
                label={name}
                style={{ marginTop: "clamp(1rem, 3vw, 1.5rem)" }}
              />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
