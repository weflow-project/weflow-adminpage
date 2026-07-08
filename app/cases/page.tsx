"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Dumbbell,
  Landmark,
  Scale,
  Car,
  Heart,
  Home,
  Coffee,
  Scissors,
  Building2,
  PawPrint,
  Sofa,
  Wrench,
  Gamepad2,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { cases, caseImagePath } from "@/data/cases";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  피트니스: Dumbbell,
  금융: Landmark,
  법률: Scale,
  자동차: Car,
  웨딩: Heart,
  부동산: Home,
  식음료: Coffee,
  뷰티: Scissors,
  기업: Building2,
  반려동물: PawPrint,
  인테리어: Sofa,
  생활서비스: Wrench,
  엔터테인먼트: Gamepad2,
  교육: GraduationCap,
};

const ALL_CATEGORIES = [
  "전체",
  ...Array.from(new Set(cases.map((c) => c.category))),
];

/* ── 카드 ── */
function CaseCard({
  c,
  index,
  visible,
}: {
  c: (typeof cases)[0];
  index: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/cases/${c.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        textDecoration: "none",
        borderRadius: "14px",
        overflow: "hidden",
        border: `1.5px solid ${hovered ? c.color : "var(--border)"}`,
        background: "#fff",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.45s ease ${(index % 9) * 0.05}s, transform 0.45s ease ${(index % 9) * 0.05}s, border-color 0.2s`,
      }}
    >
      {/* 브라우저 헤더 */}
      <div
        style={{
          background: "#f3f4f6",
          borderBottom: "1px solid var(--border)",
          padding: "0.5rem 0.7rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div style={{ display: "flex", gap: "0.3rem" }}>
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          />
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#28c840",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            background: "#e5e7eb",
            borderRadius: "5px",
            padding: "0.2rem 0.6rem",
            fontSize: "0.66rem",
            color: "#a09890",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          www.{c.slug}.co.kr
        </div>
      </div>

      {/* 이미지 */}
      <div
        style={{
          position: "relative",
          height: "190px",
          overflow: "hidden",
          background: c.color + "22",
        }}
      >
        <Image
          src={caseImagePath(c.slug)}
          alt={c.name}
          fill
          sizes="400px"
          style={{
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
        {/* 오버레이 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered ? "rgba(0,0,0,0.32)" : "rgba(0,0,0,0.08)",
            transition: "background 0.25s",
          }}
        />
        {/* 카테고리 뱃지 */}
        <span
          className="caption-2 emphasized c-primary"
          style={{
            position: "absolute",
            top: "0.7rem",
            left: "0.7rem",
            background: "#fff",
            padding: "0.2rem 0.65rem",
            borderRadius: "9999px",
          }}
        >
          {c.category}
        </span>
        {/* hover 시 화살표 */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              bottom: "0.8rem",
              right: "0.8rem",
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowUpRight size={16} color={c.color} strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* 텍스트 */}
      <div style={{ padding: "0.95rem 1.1rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.45rem",
            marginBottom: "0.25rem",
          }}
        >
          {(() => {
            const Icon = CATEGORY_ICONS[c.category];
            return Icon ? (
              <Icon
                size={14}
                color={c.color}
                strokeWidth={2}
                style={{ flexShrink: 0 }}
              />
            ) : null;
          })()}
          <p className="subhead emphasized c-primary" style={{ margin: 0 }}>
            {c.name}
          </p>
        </div>
        <p
          className="footnote semibold"
          style={{
            color: hovered ? c.color : "var(--text-muted)",
            margin: 0,
            transition: "color 0.2s",
          }}
        >
          사례 보기 →
        </p>
      </div>
    </Link>
  );
}

/* ── 그리드 + reveal ── */
function GridReveal({ filtered }: { filtered: typeof cases }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, [filtered]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="cases-grid">
      {filtered.map((c, i) => (
        <CaseCard key={c.slug} c={c} index={i} visible={visible} />
      ))}
    </div>
  );
}

/* ── 메인 ── */
export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered =
    activeCategory === "전체"
      ? cases
      : cases.filter((c) => c.category === activeCategory);

  // 포트폴리오 준비 중 — 사례가 없으면 안내 화면만 노출
  if (cases.length === 0) {
    return (
      <div>
        <section
          style={{
            background: "#fff",
            padding: "clamp(4rem, 10vw, 7rem) 1.5rem",
            textAlign: "center",
            minHeight: "55vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            className="caption-2 emphasized c-accent"
            style={{
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.6rem",
            }}
          >
            SUCCESS CASES
          </p>
          <h1 className="title-1" style={{ margin: "0 0 0.9rem" }}>
            성공 사례 포트폴리오
          </h1>
          <p
            className="callout c-muted"
            style={{
              margin: "0 0 1.75rem",
              maxWidth: "440px",
              wordBreak: "keep-all",
            }}
          >
            포트폴리오를 준비 중입니다. 곧 실제 제작 성공 사례로 찾아뵐게요.
          </p>
          <Link
            href="/diagnosis"
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "0.85rem 2.2rem" }}
          >
            무료 진단 신청하기 →
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div>
      {/* ── 헤더 ── */}
      <section style={{ background: "#fff", padding: "3rem 1.5rem 2rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            className="caption-2 emphasized c-accent"
            style={{
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.5rem",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            SUCCESS CASES
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h1
              className="title-1"
              style={{
                margin: 0,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition:
                  "opacity 0.4s ease 0.06s, transform 0.4s ease 0.06s",
              }}
            >
              업종별 성공사례
            </h1>
            {/* 통계 뱃지들 */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                flexWrap: "wrap",
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.4s ease 0.12s",
              }}
            >
              {[
                { num: `${cases.length}+`, label: "제작 사례" },
                { num: `${ALL_CATEGORIES.length - 1}+`, label: "업종" },
                { num: "4.9", label: "평균 별점" },
              ].map(({ num, label }) => (
                <div
                  key={label}
                  style={{
                    background: "#f3f4f6",
                    borderRadius: "10px",
                    padding: "0.5rem 0.9rem",
                    textAlign: "center",
                  }}
                >
                  <p
                    className="body emphasized c-accent"
                    style={{ margin: 0, letterSpacing: "-0.02em" }}
                  >
                    {num}
                  </p>
                  <p
                    className="caption-2 semibold c-muted"
                    style={{ margin: 0 }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p
            className="callout c-muted"
            style={{
              maxWidth: "480px",
              margin: "0.75rem 0 0",
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.4s ease 0.18s",
            }}
          >
            업종별 전환 최적화 사례를 확인하고 제작 방향을 살펴보세요
          </p>
        </div>
      </section>

      {/* ── 카테고리 필터 (pill) ── */}
      <div
        style={{
          background: "#fff",
          position: "sticky",
          top: "64px",
          zIndex: 40,
        }}
      >
        <div
          style={
            {
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0.75rem 1.5rem",
              display: "flex",
              gap: "0.4rem",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            } as React.CSSProperties
          }
        >
          {ALL_CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const count =
              cat === "전체"
                ? cases.length
                : cases.filter((c) => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="subhead"
                style={{
                  flexShrink: 0,
                  padding: "0.4rem 1rem",
                  background: isActive ? "var(--accent)" : "#f3f4f6",
                  border: "none",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#fff" : "var(--text-muted)",
                  transition: "all 0.18s ease",
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.3rem",
                }}
              >
                {cat}
                <span
                  className="caption-2 semibold"
                  style={{
                    color: isActive
                      ? "rgba(255,255,255,0.75)"
                      : "var(--text-muted)",
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 케이스 그리드 ── */}
      <section style={{ padding: "2rem 1.5rem 4rem", background: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* 섹션 헤더 */}
          <div style={{ marginBottom: "1.5rem" }}>
            <p
              className="caption-2 emphasized c-accent"
              style={{
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "0 0 0.4rem",
              }}
            >
              CASE DETAILS
            </p>
            <h2
              className="title-2 emphasized"
              style={{ margin: "0 0 0.5rem", wordBreak: "keep-all" }}
            >
              {activeCategory === "전체"
                ? "업종별 성공사례 상세"
                : `${activeCategory} 성공사례 상세`}
            </h2>
            <p className="footnote medium c-muted" style={{ margin: 0 }}>
              {filtered.length}개 사례
            </p>
          </div>
          <GridReveal filtered={filtered} />
        </div>
      </section>

      {/* ── 더보기 ── */}
      <section
        style={{
          padding: "2.5rem 1.5rem 4rem",
          background: "#fff",
          textAlign: "center",
        }}
      >
        <Link
          href="/diagnosis"
          className="btn-primary"
          style={{
            justifyContent: "center",
            fontSize: "1rem",
            padding: "0.85rem 2.5rem",
          }}
        >
          더보기 →
        </Link>
      </section>

      <style>{`
        .cases-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.1rem;
        }
        @media (max-width: 1024px) { .cases-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .cases-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .cases-grid { grid-template-columns: 1fr 1fr; } }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
