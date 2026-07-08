"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/about", label: "회사소개" },
  { href: "/service", label: "서비스" },
  { href: "/benefits", label: "WEFLOW 혜택" },
  { href: "/pricing", label: "제작 플랜 & 가격 안내" },
  { href: "/cases", label: "성공 사례 포트폴리오" },
  { href: "/reviews", label: "실제 고객 후기" },
  { href: "/booking", label: "예약" },
];

const RESETTABLE = new Set(["/booking", "/diagnosis"]);

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClick =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === href && RESETTABLE.has(href)) {
        e.preventDefault();
        window.location.href = href;
      }
    };

  const close = () => setOpen(false);

  // 홈에서 로고 클릭 시 이동 대신 맨 위로 부드럽게 스크롤
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        style={{
          position: "relative",
          zIndex: 100,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.png"
              alt="WEFLOW"
              width={32}
              height={32}
              style={{ width: 32, height: 32, objectFit: "contain" }}
            />
            <span
              className="title-3 emphasized c-accent"
              style={{ letterSpacing: "-0.02em" }}
            >
              WEFLOW
            </span>
          </Link>

          <nav
            className="hide-mobile"
            style={{
              display: "flex",
              gap: "0.25rem",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={handleClick(l.href)}
                className="subhead"
                style={{
                  padding: "0.4rem 0.6rem",
                  borderRadius: "6px",
                  fontWeight: pathname === l.href ? 700 : 500,
                  color:
                    pathname === l.href ? "var(--accent)" : "var(--text-muted)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "color 0.15s",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/diagnosis"
            aria-label="무료 진단 신청"
            className="btn-primary cta-marquee cta-gradient hide-mobile"
            style={{
              width: "132px",
              height: "40px",
              fontSize: "0.95rem",
              flexShrink: 0,
            }}
          >
            <span className="cta-marquee-track">
              {["무료 진단", "무료 진단", "무료 진단", "무료 진단"].map((t, i) => (
                <span key={i} className="cta-marquee-item">
                  {t}
                </span>
              ))}
            </span>
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="show-mobile-flex"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.5rem",
              color: "var(--text)",
              display: "none",
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* 오버레이 */}
      <div
        onClick={close}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.4)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.28s ease",
        }}
      />

      {/* 왼쪽 드로어 */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 201,
          width: "min(280px, 80vw)",
          background: "#fff",
          boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {/* 드로어 헤더 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 1.25rem",
            height: "64px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Link
            href="/"
            onClick={(e) => {
              close();
              handleLogoClick(e);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.45rem",
              textDecoration: "none",
            }}
          >
            <Image
              src="/logo.png"
              alt="WEFLOW"
              width={26}
              height={26}
              style={{ width: 26, height: 26, objectFit: "contain" }}
            />
            <span
              className="headline emphasized c-accent"
              style={{ letterSpacing: "-0.02em" }}
            >
              WEFLOW
            </span>
          </Link>
          <button
            onClick={close}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              padding: "0.4rem",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* 메뉴 링크 */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0" }}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => {
                close();
                handleClick(l.href)(e);
              }}
              className="callout"
              style={{
                display: "block",
                padding: "0.9rem 1.5rem",
                color: pathname === l.href ? "var(--accent)" : "var(--text)",
                textDecoration: "none",
                fontWeight: pathname === l.href ? 700 : 500,
                borderLeft:
                  pathname === l.href
                    ? "3px solid var(--accent)"
                    : "3px solid transparent",
                background: pathname === l.href ? "#ebf2ff" : "transparent",
                transition: "background 0.15s",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* 하단 CTA */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          <Link
            href="/diagnosis"
            className="btn-primary"
            style={{ justifyContent: "center", width: "100%" }}
            onClick={close}
          >
            무료 진단 신청
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .show-mobile-flex { display: flex !important; } }
        .cta-gradient {
          background: linear-gradient(120deg, #1560c9, #1e93d6, #14c1c8, #1e93d6, #1560c9) !important;
          background-size: 250% 100% !important;
          animation: cta-flow 2.4s linear infinite, cta-glow 1.9s ease-in-out infinite;
        }
        .cta-gradient::after {
          content: '';
          position: absolute;
          top: 0;
          left: -70%;
          width: 48%;
          height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,0.75), transparent);
          transform: skewX(-20deg);
          animation: cta-shine 2.4s ease-in-out infinite;
          pointer-events: none;
          z-index: 2;
        }
        @keyframes cta-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes cta-shine {
          0% { left: -70%; }
          55% { left: 130%; }
          100% { left: 130%; }
        }
        @keyframes cta-glow {
          0%, 100% { box-shadow: 0 3px 12px rgba(23,160,205,0.45); }
          50% { box-shadow: 0 6px 22px rgba(20,193,200,0.85); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-gradient, .cta-gradient::after { animation: none; }
        }
      `}</style>
    </>
  );
}
