"use client";
import Image from "next/image";
import { useState, useEffect, useCallback, Fragment } from "react";
import {
  LogOut,
  Menu,
  X,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Download,
  ArrowLeft,
  Users,
  Eye,
  MousePointerClick,
  Clock,
  Smartphone,
  LogIn,
  DoorOpen,
  TrendingUp,
  ChevronsDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { projectTypes } from "@/data/common";
import { SITE_TYPE } from "@/lib/siteConfig";

const ADMIN_PW = "weflow";

type Status = "pending" | "in_progress" | "done";
type Tab = "overview" | "reservations" | "inquiries" | "analytics" | "traffic";
type Filter = "전체" | "대기" | "진행중" | "완료";

const STATUS_KO: Record<Status, string> = {
  pending: "대기",
  in_progress: "진행중",
  done: "완료",
};
const STATUS_EN: Record<string, Status> = {
  대기: "pending",
  진행중: "in_progress",
  완료: "done",
};
const STATUS_STYLE: Record<
  Status,
  { bg: string; color: string; border: string }
> = {
  pending: {
    bg: "var(--bg-secondary)",
    color: "var(--text-secondary)",
    border: "1px solid #d1d5db",
  },
  in_progress: {
    bg: "var(--accent-light)",
    color: "var(--accent-hover)",
    border: "1px solid #b9d0f7",
  },
  done: { bg: "#f0fdf4", color: "#15803d", border: "1px solid #86efac" },
};

interface Booking {
  id: string;
  status: Status;
  name: string;
  phone: string;
  type: string;
  industry: string;
  note: string;
  date: string;
  time: string;
  createdAt: string;
}
interface Inquiry {
  id: string;
  status: Status;
  name: string;
  phone: string;
  type: string;
  industry: string;
  note: string;
  source?: string;
  createdAt: string;
}
interface PageView {
  id: string;
  sessionId: string;
  path: string;
  referrer: string;
  source: string;
  medium: string;
  campaign: string;
  device: string;
  durationMs: number | null;
  maxScroll: number | null;
  createdAt: string;
}

const FILTERS: Filter[] = ["전체", "대기", "진행중", "완료"];
const TABS: { key: Tab; label: string }[] = [
  { key: "overview", label: "전체 현황" },
  { key: "inquiries", label: "문의 관리" },
  { key: "reservations", label: "예약 관리" },
  { key: "analytics", label: "통계 관리" },
  { key: "traffic", label: "유입 관리" },
];

// 통계 기간 선택 (days=null 이면 전체)
const ANALYTICS_PERIODS: { key: string; label: string; days: number | null }[] =
  [
    { key: "today", label: "오늘", days: 1 },
    { key: "7d", label: "최근 7일", days: 7 },
    { key: "14d", label: "최근 14일", days: 14 },
    { key: "30d", label: "최근 30일", days: 30 },
    { key: "all", label: "전체", days: null },
  ];

// createdAt 기준으로 선택 기간 내 항목만 반환
function withinPeriod<T extends { createdAt: string }>(
  rows: T[],
  periodKey: string,
): T[] {
  const days = ANALYTICS_PERIODS.find((p) => p.key === periodKey)?.days;
  if (days == null) return rows;
  const cutoff = Date.now() - days * 86400000;
  return rows.filter((r) => new Date(r.createdAt).getTime() >= cutoff);
}

// 재사용 기간 드롭다운
function PeriodSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "10px",
        padding: "0.5rem 0.9rem",
        fontSize: "0.9rem",
        fontWeight: 700,
        color: "var(--text)",
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {ANALYTICS_PERIODS.map((p) => (
        <option key={p.key} value={p.key}>
          {p.label}
        </option>
      ))}
    </select>
  );
}

// 제작 종류별 막대 — 항목마다 다른 색 (순서대로 순환)
const TYPE_COLORS = [
  "#0ea5e9",
  "#6366f1",
  "#ec4899",
  "#22c55e",
  "#8b5cf6",
  "#ef4444",
];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function fmt(iso: string) {
  const d = new Date(iso);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: "blue" | "green";
}) {
  const accent = color === "blue" ? "var(--accent)" : "#16a34a";
  return (
    <div
      className="admin-stat-card"
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "14px",
        padding: "1.25rem 1.4rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "0.55rem",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: accent,
            flexShrink: 0,
          }}
        />
        <p
          className="emphasized"
          style={{
            color: "var(--text-muted)",
            margin: 0,
            letterSpacing: "0.01em",
            fontSize: "0.92rem",
          }}
        >
          {label}
        </p>
      </div>
      <p
        style={{
          margin: 0,
          lineHeight: 1,
          fontSize: "2rem",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: accent,
        }}
      >
        {value}
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            color: "var(--text-muted)",
            marginLeft: "0.2rem",
          }}
        >
          건
        </span>
      </p>
    </div>
  );
}

function RequestTable({
  title,
  rows,
  showSchedule,
  onStatusChange,
  onDelete,
  onExport,
  onSeeAll,
}: {
  title?: string;
  rows: (Booking | Inquiry)[];
  showSchedule?: boolean;
  onStatusChange: (id: string, status: Status) => void;
  onDelete: (id: string) => void;
  onExport: () => void;
  onSeeAll?: () => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const colSpan = showSchedule ? 8 : 7;

  return (
    <section>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {title && (
            <h2
              className="title-3 emphasized"
              style={{ color: "var(--text)", margin: 0 }}
            >
              {title}
            </h2>
          )}
          {onSeeAll && (
            <button
              onClick={onSeeAll}
              className="semibold"
              style={{
                background: "none",
                border: "none",
                color: "var(--accent)",
                cursor: "pointer",
                fontFamily: "inherit",
                padding: 0,
                whiteSpace: "nowrap",
                marginLeft: "auto",
                fontSize: "0.95rem",
              }}
            >
              전체 보기 →
            </button>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={onExport}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#fff",
              border: "1px solid var(--border)",
              borderRadius: "999px",
              padding: "0.45rem 1rem",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "border-color 0.15s, color 0.15s",
            }}
            className="semibold"
          >
            <Download size={16} /> 엑셀 다운로드
          </button>
        </div>
      </div>
      <div
        style={{
          overflowX: "auto",
          borderRadius: "16px",
          border: "1px solid var(--border)",
          background: "#fff",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: "780px",
            borderCollapse: "separate",
            borderSpacing: 0,
            fontSize: "0.98rem",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              {[
                "접수일",
                "이름",
                "연락처",
                "제작 종류",
                ...(showSchedule ? ["희망 일시"] : []),
                "상태",
                "관리",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="emphasized"
                  style={{
                    padding: "0.9rem 1rem",
                    fontSize: "0.9rem",
                    color: "var(--text-muted)",
                    whiteSpace: "nowrap",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg-secondary)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={colSpan}
                  style={{
                    padding: "3rem",
                    textAlign: "center",
                    color: "var(--text-muted)",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                  className="subhead"
                >
                  표시할 항목이 없습니다.
                </td>
              </tr>
            )}
            {rows.map((row) => {
              const expanded = expandedId === row.id;
              const st = row.status as Status;
              const b = row as Booking;
              const bd = "1px solid var(--border-subtle)";
              return (
                <Fragment key={row.id}>
                  <tr className="admin-row">
                    <td
                      style={{
                        padding: "0.9rem 1rem",
                        color: "var(--text-muted)",
                        whiteSpace: "nowrap",
                        borderBottom: bd,
                      }}
                    >
                      {fmt(row.createdAt)}
                    </td>
                    <td
                      style={{
                        padding: "0.9rem 1rem",
                        fontWeight: 600,
                        color: "var(--text)",
                        borderBottom: bd,
                      }}
                    >
                      {row.name}
                    </td>
                    <td
                      style={{
                        padding: "0.9rem 1rem",
                        color: "var(--text-secondary)",
                        borderBottom: bd,
                      }}
                    >
                      {row.phone}
                    </td>
                    <td
                      style={{
                        padding: "0.9rem 1rem",
                        color: "var(--text-secondary)",
                        whiteSpace: "nowrap",
                        borderBottom: bd,
                      }}
                    >
                      {row.type || "-"}
                    </td>
                    {showSchedule && (
                      <td
                        style={{
                          padding: "0.9rem 1rem",
                          color: "var(--text-secondary)",
                          whiteSpace: "nowrap",
                          borderBottom: bd,
                        }}
                      >
                        {b.date} {b.time}
                      </td>
                    )}
                    <td style={{ padding: "0.9rem 1rem", borderBottom: bd }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          background: STATUS_STYLE[st].bg,
                          color: STATUS_STYLE[st].color,
                          border: STATUS_STYLE[st].border,
                          borderRadius: "7px",
                          padding: "0.3rem 0.8rem",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {STATUS_KO[st]}
                      </span>
                    </td>
                    <td style={{ padding: "0.9rem 1rem", borderBottom: bd }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.4rem",
                          flexWrap: "nowrap",
                        }}
                      >
                        <ActionBtn
                          active={st === "in_progress"}
                          onClick={() => onStatusChange(row.id, "in_progress")}
                        >
                          진행중
                        </ActionBtn>
                        <ActionBtn
                          active={st === "done"}
                          green
                          onClick={() => onStatusChange(row.id, "done")}
                        >
                          완료
                        </ActionBtn>
                        <ActionBtn red onClick={() => onDelete(row.id)}>
                          삭제
                        </ActionBtn>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "0.9rem 0.75rem",
                        textAlign: "right",
                        borderBottom: bd,
                      }}
                    >
                      <button
                        onClick={() => setExpandedId(expanded ? null : row.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "var(--text-muted)",
                          padding: "0.25rem",
                        }}
                      >
                        {expanded ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    </td>
                  </tr>
                  {expanded && (
                    <tr style={{ background: "var(--bg-secondary)" }}>
                      <td
                        colSpan={colSpan}
                        style={{ padding: "1.1rem 1.25rem", borderBottom: bd }}
                      >
                        <dl className="detail-dl">
                          <div>
                            <dt
                              className="emphasized"
                              style={{
                                color: "var(--text-muted)",
                                marginBottom: "0.3rem",
                                fontSize: "0.85rem",
                              }}
                            >
                              업종
                            </dt>
                            <dd
                              style={{
                                color: "var(--text-secondary)",
                                margin: 0,
                              }}
                            >
                              {row.industry || "-"}
                            </dd>
                          </div>
                          <div>
                            <dt
                              className="emphasized"
                              style={{
                                color: "var(--text-muted)",
                                marginBottom: "0.3rem",
                                fontSize: "0.85rem",
                              }}
                            >
                              추가요청사항
                            </dt>
                            <dd
                              style={{
                                color: "var(--text-secondary)",
                                margin: 0,
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {row.note || "-"}
                            </dd>
                          </div>
                        </dl>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ActionBtn({
  children,
  onClick,
  red,
  green,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  red?: boolean;
  green?: boolean;
  active?: boolean;
}) {
  let bg = "#fff",
    border = "var(--border)",
    color = "var(--text-secondary)";
  if (active && green) {
    bg = "#dcfce7";
    border = "#86efac";
    color = "#15803d";
  } else if (active) {
    bg = "var(--accent-light)";
    border = "#b9d0f7";
    color = "var(--accent-hover)";
  } else if (red) {
    bg = "#fff";
    border = "#fca5a5";
    color = "#ef4444";
  }
  return (
    <button
      onClick={onClick}
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "6px",
        padding: "0.3rem 0.8rem",
        fontSize: "0.85rem",
        fontWeight: active ? 700 : 500,
        color,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

const STATUS_SEG: { key: Status; label: string; color: string }[] = [
  { key: "pending", label: "대기", color: "#cbd5e1" },
  { key: "in_progress", label: "진행중", color: "var(--accent)" },
  { key: "done", label: "완료", color: "#22c55e" },
];

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.85rem",
        color: "var(--text-secondary)",
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 3,
          background: color,
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
}

function AnalyticsView({
  bookings: allB,
  inquiries: allI,
}: {
  bookings: Booking[];
  inquiries: Inquiry[];
}) {
  // 기간 선택
  const [period, setPeriod] = useState("14d");
  // 마운트 시각을 한 번만 캡처 (렌더 중 Date.now() 직접 호출 금지 규칙 대응)
  const [now] = useState(() => Date.now());
  const periodDays =
    ANALYTICS_PERIODS.find((p) => p.key === period)?.days ?? 14;
  const periodLabel =
    ANALYTICS_PERIODS.find((p) => p.key === period)?.label ?? "최근 14일";

  // 선택 기간만 집계
  const cutoff = periodDays != null ? now - periodDays * 86400000 : 0;
  const bookings = cutoff
    ? allB.filter((b) => new Date(b.createdAt).getTime() >= cutoff)
    : allB;
  const inquiries = cutoff
    ? allI.filter((i) => new Date(i.createdAt).getTime() >= cutoff)
    : allI;

  // ── 일별 접수 추이 (차트 일수는 기간에 맞춤) ──
  let DAYS = periodDays ?? 14;
  if (periodDays == null) {
    const all = [...allB, ...allI];
    if (all.length) {
      const earliest = Math.min(
        ...all.map((r) => new Date(r.createdAt).getTime()),
      );
      DAYS = Math.min(
        90,
        Math.max(14, Math.ceil((now - earliest) / 86400000) + 1),
      );
    }
  }
  const today = new Date();
  const buckets: { key: string; label: string; b: number; i: number }[] = [];
  for (let n = DAYS - 1; n >= 0; n--) {
    const d = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - n,
    );
    buckets.push({
      key: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      label: `${d.getMonth() + 1}/${d.getDate()}`,
      b: 0,
      i: 0,
    });
  }
  const bidx: Record<string, number> = {};
  buckets.forEach((x, n) => {
    bidx[x.key] = n;
  });
  const dkey = (iso: string) => {
    const d = new Date(iso);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  bookings.forEach((r) => {
    const k = dkey(r.createdAt);
    if (k in bidx) buckets[bidx[k]].b++;
  });
  inquiries.forEach((r) => {
    const k = dkey(r.createdAt);
    if (k in bidx) buckets[bidx[k]].i++;
  });
  // '오늘'처럼 하루만 볼 때: 선이 0에서 올라가도록 맨 앞에 0 기준점 추가
  if (buckets.length === 1) {
    buckets.unshift({ key: "__start", label: "", b: 0, i: 0 });
  }
  const maxDaily = Math.max(1, ...buckets.map((x) => Math.max(x.b, x.i)));

  // ── 상태 분포 ──
  const stCount = (arr: { status: Status }[]): Record<Status, number> => ({
    pending: arr.filter((r) => r.status === "pending").length,
    in_progress: arr.filter((r) => r.status === "in_progress").length,
    done: arr.filter((r) => r.status === "done").length,
  });
  const statusRows = [
    { label: "예약", data: stCount(bookings) },
    { label: "문의", data: stCount(inquiries) },
  ];

  // ── 제작 종류별 ──
  const typeCount: Record<string, number> = {};
  projectTypes.forEach((t) => {
    typeCount[t] = 0;
  });
  [...bookings, ...inquiries].forEach((r) => {
    if (r.type in typeCount) typeCount[r.type]++;
  });
  const maxType = Math.max(1, ...Object.values(typeCount));

  // ── SVG 좌표 ──
  const W = 720,
    H = 250,
    padL = 30,
    padR = 12,
    padT = 12,
    padB = 26;
  const plotW = W - padL - padR,
    plotH = H - padT - padB;
  const baseY = padT + plotH;
  const y = (v: number) => baseY - (v / maxDaily) * plotH;
  // 첫 점은 왼쪽 끝, 마지막 점은 오른쪽 끝까지 펼침
  const cx = (n: number) =>
    buckets.length <= 1
      ? padL + plotW / 2
      : padL + (n / (buckets.length - 1)) * plotW;
  const gridVals = Array.from(new Set([0, Math.round(maxDaily / 2), maxDaily]));
  const C_B = "#0ea5e9";
  const C_I = "#ec4899";

  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "1.4rem 1.5rem",
  };
  const h3: React.CSSProperties = {
    margin: 0,
    fontSize: "1.05rem",
    fontWeight: 700,
    color: "var(--text)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* 상단 바 — 기간 선택 */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <PeriodSelect value={period} onChange={setPeriod} />
      </div>

      {/* 최근 14일 접수 추이 */}
      <section style={card}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <h3 style={h3}>{periodLabel} 접수 추이</h3>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Legend color={C_B} label="예약" />
            <Legend color={C_I} label="문의" />
          </div>
        </div>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ display: "block", marginTop: "0.9rem" }}
          role="img"
          aria-label="최근 14일 예약·문의 접수 추이"
        >
          {gridVals.map((v) => (
            <g key={v}>
              <line
                x1={padL}
                y1={y(v)}
                x2={W - padR}
                y2={y(v)}
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={padL - 6}
                y={y(v) + 3}
                textAnchor="end"
                fontSize={10}
                fill="var(--text-muted)"
              >
                {v}
              </text>
            </g>
          ))}
          {/* 꺾은선 */}
          <polyline
            fill="none"
            stroke={C_B}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            points={buckets.map((d, n) => `${cx(n)},${y(d.b)}`).join(" ")}
          />
          <polyline
            fill="none"
            stroke={C_I}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            points={buckets.map((d, n) => `${cx(n)},${y(d.i)}`).join(" ")}
          />
          {/* 마커 + x축 라벨 */}
          {buckets.map((d, n) => (
            <g key={d.key}>
              <circle
                cx={cx(n)}
                cy={y(d.b)}
                r={4}
                fill="#fff"
                stroke={C_B}
                strokeWidth={2}
              >
                <title>
                  {d.label} · 예약 {d.b}
                </title>
              </circle>
              <circle
                cx={cx(n)}
                cy={y(d.i)}
                r={4}
                fill="#fff"
                stroke={C_I}
                strokeWidth={2}
              >
                <title>
                  {d.label} · 문의 {d.i}
                </title>
              </circle>
              {n % 2 === 1 && (
                <text
                  x={cx(n)}
                  y={H - 8}
                  textAnchor="middle"
                  fontSize={10}
                  fill="var(--text-muted)"
                >
                  {d.label}
                </text>
              )}
            </g>
          ))}
        </svg>
      </section>

      <div className="analytics-2col">
        {/* 상태 분포 */}
        <section style={card}>
          <h3 style={{ ...h3, marginBottom: "1.1rem" }}>상태 분포</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {statusRows.map((row) => {
              const total =
                row.data.pending + row.data.in_progress + row.data.done;
              return (
                <div key={row.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.4rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 600,
                        color: "var(--text)",
                      }}
                    >
                      {row.label}
                    </span>
                    <span
                      style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}
                    >
                      {total}건
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      height: 22,
                      borderRadius: 6,
                      overflow: "hidden",
                      background: "var(--bg-secondary)",
                      gap: total ? 2 : 0,
                    }}
                  >
                    {STATUS_SEG.map((seg) => {
                      const v = row.data[seg.key];
                      if (!v) return null;
                      return (
                        <div
                          key={seg.key}
                          title={`${seg.label} ${v}`}
                          style={{
                            width: `${(v / total) * 100}%`,
                            background: seg.color,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1.1rem",
              flexWrap: "wrap",
            }}
          >
            {STATUS_SEG.map((seg) => (
              <Legend key={seg.key} color={seg.color} label={seg.label} />
            ))}
          </div>
        </section>

        {/* 제작 종류별 */}
        <section style={card}>
          <h3 style={{ ...h3, marginBottom: "1.1rem" }}>제작 종류별 건수</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            {projectTypes.map((t, i) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    flex: "0 0 132px",
                    fontSize: "0.86rem",
                    color: "var(--text-secondary)",
                    wordBreak: "keep-all",
                  }}
                >
                  {t}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 18,
                    borderRadius: 5,
                    background: "var(--bg-secondary)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(typeCount[t] / maxType) * 100}%`,
                      height: "100%",
                      background: TYPE_COLORS[i % TYPE_COLORS.length],
                      borderRadius: 5,
                    }}
                  />
                </div>
                <span
                  style={{
                    flex: "0 0 30px",
                    textAlign: "right",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--text)",
                  }}
                >
                  {typeCount[t]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const SOURCE_KO: Record<string, string> = {
  kakao: "카카오",
  naver: "네이버",
  instagram: "인스타그램",
  facebook: "페이스북",
  google: "구글",
  daum: "다음",
  twitter: "X(트위터)",
  youtube: "유튜브",
  direct: "직접 유입",
};
const SOURCE_COLOR: Record<string, string> = {
  kakao: "#fae100",
  naver: "#03c75a",
  instagram: "#f06595",
  facebook: "#1877f2",
  google: "#ea4335",
  daum: "#06b6d4",
  twitter: "#111",
  youtube: "#ff0000",
  direct: "#94a3b8",
};
const PAGE_KO: Record<string, string> = {
  "/": "메인",
  "/about": "회사 소개",
  "/benefits": "WEFLOW 혜택",
  "/booking": "예약",
  "/cases": "성공 사례",
  "/diagnosis": "무료 진단",
  "/pricing": "가격 안내",
  "/reviews": "고객 후기",
  "/service": "서비스 소개",
};
// 경로 → 사람이 알아보는 한글 이름 (쿼리·해시 제거, 미등록 경로는 경로 그대로)
function pageName(path: string): string {
  const clean = path.split(/[?#]/)[0].replace(/\/$/, "") || "/";
  return PAGE_KO[clean] || clean;
}
const DEVICE_KO: Record<string, string> = {
  mobile: "모바일",
  tablet: "태블릿",
  desktop: "데스크탑",
};
const DEVICE_COLOR: Record<string, string> = {
  mobile: "var(--accent)",
  tablet: "#f59e0b",
  desktop: "#22c55e",
};

function fmtDur(ms: number): string {
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}초`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem ? `${m}분 ${rem}초` : `${m}분`;
}

function TrafficMetric({
  Icon,
  label,
  value,
  sub,
  tint,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
  tint: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: "16px",
        padding: "1.3rem 1.4rem",
        borderTop: `4px solid ${tint}`,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "0.7rem",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            width: 38,
            height: 38,
            borderRadius: 10,
            background: `${tint}1a`,
            color: tint,
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={20} strokeWidth={2.2} />
        </span>
        <p
          className="emphasized"
          style={{
            color: "var(--text-secondary)",
            margin: 0,
            fontSize: "0.95rem",
            wordBreak: "keep-all",
          }}
        >
          {label}
        </p>
      </div>
      <p
        style={{
          margin: 0,
          lineHeight: 1.05,
          fontSize: "2.35rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: "var(--text)",
        }}
      >
        {value}
      </p>
      {sub && (
        <p
          style={{
            margin: "0.45rem 0 0",
            fontSize: "0.85rem",
            color: "var(--text-muted)",
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function SectionHead({
  Icon,
  title,
  desc,
  tint,
}: {
  Icon: LucideIcon;
  title: string;
  desc: string;
  tint: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.7rem",
        marginBottom: "1.2rem",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          width: 40,
          height: 40,
          borderRadius: 11,
          background: `${tint}1a`,
          color: tint,
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={21} strokeWidth={2.2} />
      </span>
      <div>
        <h3
          style={{
            margin: "0 0 0.15rem",
            fontSize: "1.15rem",
            fontWeight: 800,
            color: "var(--text)",
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            color: "var(--text-muted)",
            wordBreak: "keep-all",
          }}
        >
          {desc}
        </p>
      </div>
    </div>
  );
}

function BarRow({
  label,
  color,
  value,
  max,
  right,
}: {
  label: string;
  color: string;
  value: number;
  max: number;
  right: string;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <span
        style={{
          flex: "0 0 92px",
          fontSize: "0.86rem",
          color: "var(--text-secondary)",
          wordBreak: "keep-all",
        }}
      >
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 18,
          borderRadius: 5,
          background: "var(--bg-secondary)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${max ? (value / max) * 100 : 0}%`,
            height: "100%",
            background: color,
            borderRadius: 5,
          }}
        />
      </div>
      <span
        style={{
          flex: "0 0 78px",
          textAlign: "right",
          fontSize: "0.88rem",
          fontWeight: 700,
          color: "var(--text)",
        }}
      >
        {right}
      </span>
    </div>
  );
}

function TrafficView({
  pageViews: allPageViews,
  loading,
}: {
  pageViews: PageView[];
  loading: boolean;
}) {
  const card: React.CSSProperties = {
    background: "#fff",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "1.4rem 1.5rem",
  };

  // 기간 선택 (최근 30일 범위 내에서 필터)
  const [period, setPeriod] = useState("all");
  const pageViews = withinPeriod(allPageViews, period);

  // 세션 단위로 묶기 (createdAt 오름차순 가정)
  const sessions = new Map<string, PageView[]>();
  pageViews.forEach((v) => {
    const arr = sessions.get(v.sessionId);
    if (arr) arr.push(v);
    else sessions.set(v.sessionId, [v]);
  });
  const sessionList = Array.from(sessions.values());
  const totalSessions = sessionList.length;
  const totalViews = pageViews.length;

  // 유입 소스별 세션 (첫 페이지 기준)
  const sourceCount: Record<string, number> = {};
  const deviceCount: Record<string, number> = {};
  const exitCount: Record<string, number> = {};
  let bounced = 0;
  let durSum = 0,
    durN = 0;
  sessionList.forEach((views) => {
    const entry = views[0];
    const exit = views[views.length - 1];
    sourceCount[entry.source] = (sourceCount[entry.source] || 0) + 1;
    deviceCount[entry.device] = (deviceCount[entry.device] || 0) + 1;
    exitCount[exit.path] = (exitCount[exit.path] || 0) + 1;
    if (views.length === 1) bounced++;
    const sessionDur = views.reduce((a, v) => a + (v.durationMs || 0), 0);
    if (sessionDur > 0) {
      durSum += sessionDur;
      durN++;
    }
  });
  const bounceRate = totalSessions
    ? Math.round((bounced / totalSessions) * 100)
    : 0;
  const avgDur = durN ? durSum / durN : 0;

  const sourceRows = Object.entries(sourceCount).sort((a, b) => b[1] - a[1]);
  const maxSource = Math.max(1, ...sourceRows.map((r) => r[1]));
  const deviceRows = Object.entries(deviceCount).sort((a, b) => b[1] - a[1]);
  const exitRows = Object.entries(exitCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const maxExit = Math.max(1, ...exitRows.map((r) => r[1]));

  // 일별 방문(세션 수) — 최근 14일
  const DAYS = 14;
  const today = new Date();
  const days: { key: string; label: string; v: number }[] = [];
  const didx: Record<string, number> = {};
  for (let n = DAYS - 1; n >= 0; n--) {
    const d = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - n,
    );
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    didx[key] = days.length;
    days.push({ key, label: `${d.getMonth() + 1}/${d.getDate()}`, v: 0 });
  }
  sessionList.forEach((views) => {
    const d = new Date(views[0].createdAt);
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    if (key in didx) days[didx[key]].v++;
  });
  const maxDay = Math.max(1, ...days.map((d) => d.v));

  // 시간대별 (0~23시, 페이지뷰 기준)
  const hours = Array.from({ length: 24 }, () => 0);
  pageViews.forEach((v) => {
    hours[new Date(v.createdAt).getHours()]++;
  });
  const maxHour = Math.max(1, ...hours);

  // 스크롤 도달 퍼널 — max_scroll 기록된 페이지뷰 기준
  const scrolled = pageViews.filter((v) => v.maxScroll != null);
  const scrollTotal = scrolled.length;
  const scrollThresholds = [25, 50, 75, 100];
  const scrollReach = scrollThresholds.map((t) => ({
    t,
    n: scrolled.filter((v) => (v.maxScroll as number) >= t).length,
  }));
  const avgScroll = scrollTotal
    ? Math.round(
        scrolled.reduce((a, v) => a + (v.maxScroll as number), 0) / scrollTotal,
      )
    : 0;

  if (loading && allPageViews.length === 0) {
    return (
      <p className="subhead c-muted" style={{ padding: "2rem 0" }}>
        불러오는 중…
      </p>
    );
  }
  if (!loading && allPageViews.length === 0) {
    return (
      <div style={card}>
        <p
          className="subhead"
          style={{
            color: "var(--text-muted)",
            margin: 0,
            textAlign: "center",
            padding: "2rem 0",
          }}
        >
          아직 수집된 방문 데이터가 없습니다.
          <br />
          방문이 기록되면 여기에 유입·이탈 통계가 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {/* 상단 바 — 기간 선택 (왼쪽) */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <PeriodSelect value={period} onChange={setPeriod} />
      </div>

      {/* 요약 지표 */}
      <div
        className="traffic-metric-grid"
        style={{ display: "grid", gap: "1rem" }}
      >
        <TrafficMetric
          Icon={Users}
          tint="#3373df"
          label="방문자 수"
          value={`${totalSessions}명`}
          sub="선택 기간 방문 고객"
        />
        <TrafficMetric
          Icon={Eye}
          tint="#8b5cf6"
          label="본 페이지 수"
          value={`${totalViews}회`}
          sub="고객들이 열어본 페이지"
        />
        {SITE_TYPE === "multi" ? (
          <TrafficMetric
            Icon={MousePointerClick}
            tint="#f59e0b"
            label="즉시 이탈률"
            value={`${bounceRate}%`}
            sub={`한 페이지만 보고 이탈 (${bounced}명)`}
          />
        ) : (
          <TrafficMetric
            Icon={ChevronsDown}
            tint="#0ea5e9"
            label="평균 스크롤 도달"
            value={scrollTotal ? `${avgScroll}%` : "-"}
            sub="페이지를 평균 이만큼 내려봄"
          />
        )}
        <TrafficMetric
          Icon={Clock}
          tint="#16a34a"
          label="평균 머문 시간"
          value={avgDur ? fmtDur(avgDur) : "-"}
          sub="한 명이 머문 평균 시간"
        />
      </div>

      {/* 핵심 한 줄 하이라이트 */}
      {sourceRows.length > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.9rem",
            background: "linear-gradient(135deg, #eef4ff, #f7f0ff)",
            border: "1px solid #dbe6fb",
            borderRadius: "16px",
            padding: "1.15rem 1.4rem",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: SOURCE_COLOR[sourceRows[0][0]] || "var(--accent)",
              color: "#fff",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <TrendingUp size={24} strokeWidth={2.4} />
          </span>
          <p
            style={{
              margin: 0,
              fontSize: "1.15rem",
              color: "var(--text)",
              wordBreak: "keep-all",
              lineHeight: 1.45,
            }}
          >
            고객이 가장 많이 들어온 곳은{" "}
            <strong
              style={{
                color:
                  SOURCE_COLOR[sourceRows[0][0]] === "#fae100"
                    ? "#b59b00"
                    : SOURCE_COLOR[sourceRows[0][0]] || "var(--accent)",
              }}
            >
              {SOURCE_KO[sourceRows[0][0]] || sourceRows[0][0]}
            </strong>{" "}
            이에요 — 전체 방문자의{" "}
            <strong>
              {totalSessions
                ? Math.round((sourceRows[0][1] / totalSessions) * 100)
                : 0}
              %
            </strong>
          </p>
        </div>
      )}

      {/* 유입 소스 + 기기별 */}
      <div className="analytics-2col">
        <section style={card}>
          <SectionHead
            Icon={LogIn}
            tint="#3373df"
            title="어디서 들어왔나요?"
            desc="고객들이 우리 사이트를 찾은 경로"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            {sourceRows.length === 0 && (
              <p className="c-muted" style={{ margin: 0, fontSize: "0.9rem" }}>
                데이터 없음
              </p>
            )}
            {sourceRows.map(([src, cnt]) => (
              <BarRow
                key={src}
                label={SOURCE_KO[src] || src}
                color={SOURCE_COLOR[src] || "var(--accent)"}
                value={cnt}
                max={maxSource}
                right={`${cnt}명 (${totalSessions ? Math.round((cnt / totalSessions) * 100) : 0}%)`}
              />
            ))}
          </div>
        </section>

        <section style={card}>
          <SectionHead
            Icon={Smartphone}
            tint="#8b5cf6"
            title="무엇으로 봤나요?"
            desc="휴대폰·컴퓨터 등 접속 기기"
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}
          >
            {deviceRows.map(([dev, cnt]) => (
              <BarRow
                key={dev}
                label={DEVICE_KO[dev] || dev}
                color={DEVICE_COLOR[dev] || "var(--accent)"}
                value={cnt}
                max={Math.max(1, ...deviceRows.map((r) => r[1]))}
                right={`${cnt}명 (${totalSessions ? Math.round((cnt / totalSessions) * 100) : 0}%)`}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 일별 방문 추이 */}
      <section style={card}>
        <SectionHead
          Icon={TrendingUp}
          tint="#16a34a"
          title="날짜별 방문자"
          desc="최근 14일 동안 하루에 몇 명이 왔는지"
        />
        <div style={{ overflowX: "auto", overflowY: "hidden" }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "0.5rem",
            height: 160,
            minWidth: 620,
          }}
        >
          {days.map((d) => (
            <div
              key={d.key}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.4rem",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--text-secondary)",
                }}
              >
                {d.v || ""}
              </span>
              <div
                title={`${d.label} · ${d.v}명`}
                style={{
                  width: "100%",
                  maxWidth: 34,
                  height: `${(d.v / maxDay) * 100}%`,
                  minHeight: d.v ? 4 : 0,
                  background: "var(--accent)",
                  borderRadius: "5px 5px 0 0",
                  transition: "height 0.2s",
                }}
              />
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                {d.label}
              </span>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 시간대별 + 오른쪽: (다중)이탈 페이지 / (랜딩)스크롤 도달률 */}
      {SITE_TYPE === "multi" ? (
        <div className="analytics-2col">
          <section style={card}>
            <SectionHead
              Icon={Clock}
              tint="#3373df"
              title="언제 많이 오나요?"
              desc="하루 중 방문이 몰리는 시간대 (0~23시)"
            />
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "2px",
                height: 130,
              }}
            >
              {hours.map((h, i) => (
                <div
                  key={i}
                  title={`${i}시 · ${h}회`}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `${(h / maxHour) * 100}%`,
                      minHeight: h ? 3 : 0,
                      background:
                        i >= 9 && i <= 18 ? "var(--accent)" : "#c7d7f5",
                      borderRadius: "3px 3px 0 0",
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.4rem",
                fontSize: "0.68rem",
                color: "var(--text-muted)",
              }}
            >
              <span>0시</span>
              <span>6시</span>
              <span>12시</span>
              <span>18시</span>
              <span>23시</span>
            </div>
          </section>

          <section style={card}>
            <SectionHead
              Icon={DoorOpen}
              tint="#ef4444"
              title="어느 페이지에서 나갔나요?"
              desc="고객이 마지막으로 보고 떠난 페이지"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
              }}
            >
              {exitRows.length === 0 && (
                <p
                  className="c-muted"
                  style={{ margin: 0, fontSize: "0.9rem" }}
                >
                  데이터 없음
                </p>
              )}
              {exitRows.map(([path, cnt]) => (
                <BarRow
                  key={path}
                  label={pageName(path)}
                  color="#f87171"
                  value={cnt}
                  max={maxExit}
                  right={`${cnt}회`}
                />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="analytics-2col">
          <section style={card}>
            <SectionHead
              Icon={Clock}
              tint="#3373df"
              title="언제 많이 오나요?"
              desc="하루 중 방문이 몰리는 시간대 (0~23시)"
            />
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "2px",
                height: 130,
              }}
            >
              {hours.map((h, i) => (
                <div
                  key={i}
                  title={`${i}시 · ${h}회`}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `${(h / maxHour) * 100}%`,
                      minHeight: h ? 3 : 0,
                      background:
                        i >= 9 && i <= 18 ? "var(--accent)" : "#c7d7f5",
                      borderRadius: "3px 3px 0 0",
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "0.4rem",
                fontSize: "0.68rem",
                color: "var(--text-muted)",
              }}
            >
              <span>0시</span>
              <span>6시</span>
              <span>12시</span>
              <span>18시</span>
              <span>23시</span>
            </div>
          </section>

          <section style={card}>
            <SectionHead
              Icon={ChevronsDown}
              tint="#0ea5e9"
              title="어디까지 봤나요?"
              desc="고객이 페이지를 얼마나 아래까지 내려봤는지 — 뚝 떨어지는 구간이 이탈 지점이에요"
            />
            {scrollTotal === 0 ? (
              <p className="c-muted" style={{ margin: 0, fontSize: "0.9rem" }}>
                아직 스크롤 데이터가 없습니다.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                {scrollReach.map(({ t, n }) => {
                  const pct = Math.round((n / scrollTotal) * 100);
                  return (
                    <BarRow
                      key={t}
                      label={`${t}% 지점`}
                      color="#0ea5e9"
                      value={n}
                      max={scrollTotal}
                      right={`${pct}%`}
                    />
                  );
                })}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  // 데모용: 로그인 없이 바로 관리자 대시보드 진입
  const [authed, setAuthed] = useState(true);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [filter, setFilter] = useState<Filter>("전체");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [pvLoading, setPvLoading] = useState(false);
  const [listPeriod, setListPeriod] = useState("all");
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("weflow_admin_auth") === "true"
    )
      setAuthed(true);
  }, []);

  // 새로고침해도 현재 탭 유지 — 마지막 탭을 저장하고 진입 시 복원
  useEffect(() => {
    const saved = localStorage.getItem("weflow_admin_tab") as Tab | null;
    if (saved && TABS.some((t) => t.key === saved)) setTab(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("weflow_admin_tab", tab);
  }, [tab]);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const [bRes, iRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/inquiries"),
      ]);
      setBookings(await bRes.json());
      setInquiries(await iRes.json());
    } catch {}
    if (!silent) setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  // 유입 통계 탭 진입 시 방문 데이터 로드
  useEffect(() => {
    if (!authed || tab !== "traffic") return;
    setPvLoading(true);
    fetch("/api/analytics?days=30")
      .then((r) => r.json())
      .then((d) => setPageViews(Array.isArray(d) ? d : []))
      .catch(() => {})
      .finally(() => setPvLoading(false));
  }, [authed, tab]);

  // 자동 갱신: 20초 폴링 + 탭 재포커스 시 (조용히 갱신)
  useEffect(() => {
    if (!authed) return;
    const id = setInterval(() => load(true), 20000);
    const onFocus = () => load(true);
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, [authed, load]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PW) {
      setAuthed(true);
      localStorage.setItem("weflow_admin_auth", "true");
    } else {
      setPwError(true);
      setTimeout(() => setPwError(false), 2000);
    }
  };

  const handleLogout = () => {
    // 데모용: 로그아웃 비활성화 (아무 동작 안 함)
  };

  const updateStatus = (
    url: string,
    id: string,
    status: Status,
    setter: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    setter((prev) =>
      prev.map((r: any) => (r.id === id ? { ...r, status } : r)),
    );
    fetch(`${url}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const remove = (
    url: string,
    id: string,
    setter: React.Dispatch<React.SetStateAction<any[]>>,
  ) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    setter((prev) => prev.filter((r: any) => r.id !== id));
    fetch(`${url}/${id}`, { method: "DELETE" });
  };

  const filterRows = <T extends { status: Status }>(rows: T[]) =>
    filter === "전체"
      ? rows
      : rows.filter((r) => STATUS_KO[r.status] === filter);

  if (!authed) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-secondary)",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid var(--border)",
            borderRadius: "18px",
            padding: "1.75rem 2.75rem 2.75rem",
            width: "100%",
            maxWidth: "440px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
            <Image
              src="/logo.png"
              alt="WEFLOW"
              width={72}
              height={72}
              style={{
                width: 72,
                height: 72,
                margin: "0 auto 0.4rem",
                display: "block",
              }}
            />
            <h1
              className="title-2 emphasized"
              style={{ margin: "0 0 0.35rem" }}
            >
              관리자 로그인
            </h1>
            <p
              className="subhead"
              style={{
                color: "var(--text-muted)",
                margin: 0,
                fontSize: "1.05rem",
              }}
            >
              WEFLOW 관리자 대시보드
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}
          >
            <div>
              <label
                className="subhead semibold"
                style={{
                  display: "block",
                  marginBottom: "0.45rem",
                  color: "var(--text-secondary)",
                  fontSize: "1.05rem",
                }}
              >
                비밀번호
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="비밀번호를 입력하세요"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                style={{
                  borderColor: pwError ? "#ef4444" : undefined,
                  fontSize: "1.05rem",
                  padding: "0.8rem 0.95rem",
                }}
                autoFocus
              />
              {pwError && (
                <p
                  className="footnote"
                  style={{
                    color: "#ef4444",
                    marginTop: "0.35rem",
                    fontSize: "0.9rem",
                  }}
                >
                  비밀번호가 올바르지 않습니다.
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary"
              style={{
                justifyContent: "center",
                padding: "1rem",
                fontSize: "1.1rem",
              }}
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  const pendingB = bookings.filter((b) => b.status === "pending").length;
  const pendingI = inquiries.filter((i) => i.status === "pending").length;
  const filteredB = filterRows(withinPeriod(bookings, listPeriod));
  const filteredI = filterRows(withinPeriod(inquiries, listPeriod));

  return (
    <div
      className="admin-wrap"
      style={{ minHeight: "100vh", background: "var(--bg-secondary)" }}
    >
      {/* ── 데스크탑 사이드바 ── */}
      <aside
        className="admin-sidebar"
        style={{
          background: "#fff",
          borderRight: "1px solid var(--border)",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "1.75rem 1.4rem 0" }}>
          <button
            onClick={() => setTab("overview")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "0.35rem",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
            title="전체 현황으로"
          >
            <Image
              src="/logo.png"
              alt="WEFLOW"
              width={32}
              height={32}
              style={{ width: 32, height: 32 }}
            />
            <span
              className="emphasized"
              style={{ color: "var(--text)", fontSize: "1.42rem" }}
            >
              WEFLOW
            </span>
          </button>
          <p
            style={{
              color: "var(--text-muted)",
              margin: 0,
              fontSize: "1.02rem",
              fontWeight: 500,
            }}
          >
            관리자
          </p>
        </div>
        <nav
          style={{
            padding: "1.1rem 0.85rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.3rem",
            flex: 1,
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                background: tab === t.key ? "var(--accent)" : "none",
                color: tab === t.key ? "#fff" : "var(--text-secondary)",
                border: "none",
                borderRadius: "12px",
                padding: "0.85rem 1.1rem",
                fontSize: "1.12rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                textAlign: "left",
                transition: "all 0.15s",
                width: "100%",
              }}
            >
              {t.label}
            </button>
          ))}
          <div
            style={{
              marginTop: "auto",
              paddingTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <button
              type="button"
              onClick={() => {
              window.location.href = "https://weflowlab.kr";
            }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "0.55rem 0.25rem",
                fontSize: "1.02rem",
                fontFamily: "inherit",
                cursor: "pointer",
                textAlign: "left",
              }}
              className="semibold"
            >
              <ArrowLeft size={18} /> 사이트로 돌아가기
            </button>
            <button
              onClick={handleLogout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                fontFamily: "inherit",
                padding: "0.55rem 0.25rem",
                fontSize: "1.02rem",
              }}
              className="semibold"
            >
              <LogOut size={18} /> 로그아웃
            </button>
          </div>
        </nav>
      </aside>

      {/* ── 모바일 상단 헤더 ── */}
      <header
        className="admin-mobile-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "#fff",
          borderBottom: "1px solid var(--border)",
          display: "none",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.25rem",
          height: "64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={() => setTab("overview")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <Image
              src="/logo.png"
              alt="WEFLOW"
              width={26}
              height={26}
              style={{ width: 26, height: 26 }}
            />
            <span
              className="subhead emphasized"
              style={{ color: "var(--text)" }}
            >
              WEFLOW
            </span>
          </button>
          <span
            className="caption-1 medium"
            style={{ color: "var(--text-muted)" }}
          >
            관리자
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-secondary)",
            padding: "0.5rem",
          }}
        >
          <Menu size={22} />
        </button>
      </header>

      {/* ── 모바일 오버레이 ── */}
      <div
        onClick={() => setMenuOpen(false)}
        className="admin-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.4)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.28s ease",
          display: "none",
        }}
      />

      {/* ── 모바일 왼쪽 드로어 ── */}
      <div
        className="admin-drawer"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 201,
          width: "min(260px, 80vw)",
          background: "#fff",
          boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
          display: "none",
          flexDirection: "column",
          transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
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
            height: "72px",
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={() => {
                setTab("overview");
                setMenuOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              <Image
                src="/logo.png"
                alt="WEFLOW"
                width={26}
                height={26}
                style={{ width: 26, height: 26 }}
              />
              <span
                className="subhead emphasized"
                style={{ color: "var(--text)" }}
              >
                WEFLOW
              </span>
            </button>
            <span
              className="caption-1 medium"
              style={{ color: "var(--text-muted)" }}
            >
              관리자
            </span>
          </div>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-secondary)",
              padding: "0.4rem",
            }}
          >
            <X size={20} />
          </button>
        </div>
        {/* 드로어 내비 */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "0.75rem" }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                setMenuOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: tab === t.key ? "var(--accent)" : "transparent",
                color: tab === t.key ? "#fff" : "var(--text-secondary)",
                border: "none",
                borderRadius: "10px",
                padding: "0.75rem 1rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                borderLeft: tab === t.key ? "none" : "3px solid transparent",
                transition: "all 0.15s",
                marginBottom: "0.15rem",
              }}
            >
              {t.label}
            </button>
          ))}
        </nav>
        {/* 드로어 하단 */}
        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <button
            type="button"
            onClick={() => {
              window.location.href = "https://weflowlab.kr";
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontSize: "0.85rem",
              fontWeight: 600,
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              textDecoration: "none",
              padding: "0.4rem 0",
              fontFamily: "inherit",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <ArrowLeft size={16} /> 사이트로 돌아가기
          </button>
          <button
            onClick={handleLogout}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "none",
              border: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              cursor: "pointer",
              fontFamily: "inherit",
              padding: "0.4rem 0",
            }}
          >
            <LogOut size={16} /> 로그아웃
          </button>
        </div>
      </div>

      {/* 메인 */}
      <main
        className="admin-main"
        style={{
          flex: 1,
          padding: "clamp(1.75rem, 3vw, 2.75rem) clamp(1.5rem, 3vw, 2.75rem)",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(1.75rem, 3vw, 2.5rem)",
          }}
        >
          {/* 헤더 */}
          <div>
            <p
              className="footnote emphasized c-accent"
              style={{ margin: "0 0 0.5rem", letterSpacing: "0.02em" }}
            >
              관리자 대시보드
            </p>
            <h1
              className="admin-page-title emphasized"
              style={{
                color: "var(--text)",
                margin: "0 0 1.5rem",
                fontSize: "clamp(1.9rem, 4vw, 2.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {TABS.find((t) => t.key === tab)?.label}
            </h1>
            {tab !== "analytics" && tab !== "traffic" && (
              <div
                style={{ display: "grid", gap: "1rem" }}
                className={tab === "overview" ? "stat-grid-4" : "stat-grid-2"}
              >
                {tab !== "reservations" && (
                  <>
                    <StatCard
                      label="전체 문의"
                      value={inquiries.length}
                      color="blue"
                    />
                    <StatCard
                      label="대기중 문의"
                      value={pendingI}
                      color="green"
                    />
                  </>
                )}
                {tab !== "inquiries" && (
                  <>
                    <StatCard
                      label="전체 예약"
                      value={bookings.length}
                      color="blue"
                    />
                    <StatCard
                      label="대기중 예약"
                      value={pendingB}
                      color="green"
                    />
                  </>
                )}
              </div>
            )}
          </div>

          {/* 통계 탭 */}
          {tab === "analytics" && (
            <AnalyticsView bookings={bookings} inquiries={inquiries} />
          )}

          {/* 유입 통계 탭 */}
          {tab === "traffic" && (
            <TrafficView pageViews={pageViews} loading={pvLoading} />
          )}

          {/* 필터 + 새로고침 */}
          {tab !== "analytics" && tab !== "traffic" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  flexWrap: "wrap",
                }}
              >
                <PeriodSelect value={listPeriod} onChange={setListPeriod} />
                <div
                  style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}
                >
                  {FILTERS.map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={
                        filter === f
                          ? "admin-filter-btn admin-filter-btn-active"
                          : "admin-filter-btn"
                      }
                      style={{
                        background: filter === f ? "var(--accent)" : "#fff",
                        color: filter === f ? "#fff" : "var(--text-secondary)",
                        border: `1px solid ${filter === f ? "var(--accent)" : "var(--border)"}`,
                        borderRadius: "999px",
                        padding: "0.45rem 1.1rem",
                        fontSize: "0.92rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        transition: "all 0.15s",
                      }}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => load()}
                disabled={loading}
                className="admin-refresh-btn"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  background: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "999px",
                  padding: "0.45rem 1.1rem",
                  fontSize: "0.92rem",
                  fontWeight: 700,
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <RefreshCw size={14} className={loading ? "spin" : ""} />
                <span className="refresh-label">새로고침</span>
              </button>
            </div>
          )}

          {/* 테이블 */}
          {tab !== "reservations" &&
            tab !== "analytics" &&
            tab !== "traffic" && (
              <RequestTable
                title={tab === "overview" ? "문의 관리" : undefined}
                rows={filteredI}
                onStatusChange={(id, s) =>
                  updateStatus("/api/inquiries", id, s, setInquiries)
                }
                onDelete={(id) => remove("/api/inquiries", id, setInquiries)}
                onExport={() =>
                  window.open("/api/export?type=inquiries", "_blank")
                }
                onSeeAll={
                  tab === "overview" ? () => setTab("inquiries") : undefined
                }
              />
            )}
          {tab !== "inquiries" && tab !== "analytics" && tab !== "traffic" && (
            <RequestTable
              title={tab === "overview" ? "예약 관리" : undefined}
              rows={filteredB}
              showSchedule
              onStatusChange={(id, s) =>
                updateStatus("/api/bookings", id, s, setBookings)
              }
              onDelete={(id) => remove("/api/bookings", id, setBookings)}
              onExport={() =>
                window.open("/api/export?type=bookings", "_blank")
              }
              onSeeAll={
                tab === "overview" ? () => setTab("reservations") : undefined
              }
            />
          )}
        </div>
      </main>

      <style>{`
        .admin-wrap { display: flex; flex-direction: row; }
        .admin-sidebar { width: 264px; position: sticky; top: 0; align-self: flex-start; height: 100vh; overflow-y: auto; }
        .admin-stat-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .admin-stat-card:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(11,18,32,0.06); }
        .admin-row td { transition: background 0.12s ease; }
        .admin-row:hover td { background: var(--bg-secondary); }
        .stat-grid-4 { grid-template-columns: repeat(4, 1fr); }
        .stat-grid-2 { grid-template-columns: repeat(4, 1fr); }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .detail-dl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; font-size: 0.95rem; }
        .analytics-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
        @media (max-width: 900px) { .analytics-2col { grid-template-columns: 1fr; } }
        .traffic-metric-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 900px) { .traffic-metric-grid { grid-template-columns: repeat(2, 1fr); } }

        @media (max-width: 768px) {
          .admin-wrap { flex-direction: column; }
          .admin-sidebar { display: none !important; }
          .admin-mobile-header { display: flex !important; }
          .admin-overlay { display: block !important; }
          .admin-drawer { display: flex !important; }
          .stat-grid-4, .stat-grid-2 { grid-template-columns: repeat(2, 1fr); }
          .admin-main { padding: 1.25rem 1rem 5rem !important; }
          .refresh-label { display: none; }
          .admin-refresh-btn { padding: 0.35rem 0.6rem !important; }
        }

        @media (max-width: 480px) {
          .stat-grid-2 { grid-template-columns: repeat(2, 1fr); max-width: 100%; }
          .detail-dl { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
