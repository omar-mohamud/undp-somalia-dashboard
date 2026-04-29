"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import StatusPill from "../primitives/StatusPill";
import StageFunnel from "../charts/StageFunnel";
import {
  formatUSD,
  formatPercent,
  formatCount,
} from "@/lib/format";
import {
  DashboardData,
  Opportunity,
  StageCode,
  DonorType,
  DONOR_TYPE_SHORT,
  PORTFOLIO_COLOR,
  STAGE_COLOR,
} from "@/lib/types";

type Props = { data: DashboardData };

type SortKey =
  | "programme"
  | "donor"
  | "portfolio"
  | "stage"
  | "pipelineTotal"
  | "target2026Adj";

const STAGE_TONE: Record<StageCode, "accent" | "default" | "muted" | "warning"> = {
  A: "accent",
  B: "default",
  C: "muted",
  D: "warning",
};

export default function ResourceMobilizationTab({ data }: Props) {
  const [stageFilter, setStageFilter] = useState<Set<StageCode>>(new Set());
  const [typeFilter, setTypeFilter] = useState<Set<DonorType>>(new Set());
  const [portfolioFilter, setPortfolioFilter] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("pipelineTotal");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const opps = data.opportunities;

  const filtered = useMemo(() => {
    let list: Opportunity[] = opps;
    if (stageFilter.size)
      list = list.filter((o) => stageFilter.has(o.stage));
    if (typeFilter.size)
      list = list.filter((o) => typeFilter.has(o.donorType));
    if (portfolioFilter.size)
      list = list.filter((o) => portfolioFilter.has(o.portfolioCode));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (o) =>
          o.programme.toLowerCase().includes(q) ||
          o.donorName.toLowerCase().includes(q) ||
          o.donorAlias.toLowerCase().includes(q)
      );
    }
    const dir = sortDir === "desc" ? -1 : 1;
    list = [...list].sort((a, b) => {
      switch (sortKey) {
        case "programme":
          return a.programme.localeCompare(b.programme) * dir;
        case "donor":
          return a.donorName.localeCompare(b.donorName) * dir;
        case "portfolio":
          return a.portfolioCode.localeCompare(b.portfolioCode) * dir;
        case "stage":
          return a.stage.localeCompare(b.stage) * dir;
        default:
          return ((a[sortKey] as number) - (b[sortKey] as number)) * dir;
      }
    });
    return list;
  }, [opps, stageFilter, typeFilter, portfolioFilter, query, sortKey, sortDir]);

  const onSort = (k: SortKey) => {
    if (k === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(k);
      setSortDir(
        k === "pipelineTotal" || k === "target2026Adj" ? "desc" : "asc"
      );
    }
  };

  const stageStats = useMemo(() => {
    const m = new Map<StageCode, { count: number; value: number }>();
    for (const code of ["A", "B", "C", "D"] as StageCode[]) {
      m.set(code, { count: 0, value: 0 });
    }
    for (const o of filtered) {
      const s = m.get(o.stage)!;
      s.count += 1;
      s.value += o.pipelineTotal;
    }
    return data.stages.map((s) => ({
      stage: s.code,
      label: s.label,
      order: s.order,
      count: m.get(s.code)?.count || 0,
      value: m.get(s.code)?.value || 0,
    }));
  }, [filtered, data.stages]);

  const filteredTotals = useMemo(() => {
    return {
      pipelineTotal: filtered.reduce((s, o) => s + o.pipelineTotal, 0),
      target2026Adj: filtered.reduce((s, o) => s + o.target2026Adj, 0),
      target2027Adj: filtered.reduce((s, o) => s + o.target2027Adj, 0),
      count: filtered.length,
    };
  }, [filtered]);

  const totalActive = stageFilter.size + typeFilter.size + portfolioFilter.size;
  const clearAll = () => {
    setStageFilter(new Set());
    setTypeFilter(new Set());
    setPortfolioFilter(new Set());
    setQuery("");
  };

  const portfolioCodes = data.portfolios
    .filter((p) =>
      data.opportunities.some((o) => o.portfolioCode === p.code)
    )
    .map((p) => p.code);

  const visibleTypes = data.donorTypeCounts
    .filter((d) =>
      data.opportunities.some((o) => o.donorType === d.type)
    )
    .map((d) => d.type);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-baseline justify-between gap-6"
      >
        <div>
          <div className="section-numeral">03 / Resource Mobilization</div>
          <h2 className="serif-title text-[34px] md:text-[42px] leading-[1.05] mt-2 text-ink">
            Pipeline &amp; cash conversion
          </h2>
          <p className="mt-2 text-[14px] text-muted max-w-2xl">
            Live resource mobilization workflow, aligned to UNITY pipeline gates.
            Filter the {data.opportunities.length} opportunities by stage, donor
            type or portfolio &mdash; charts and totals respond instantly.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
          <div className="label-eyebrow">Filtered pipeline</div>
          <div className="text-[44px] font-light leading-none tabular text-ink">
            {formatUSD(filteredTotals.pipelineTotal)}
          </div>
          <div className="text-[11px] text-muted">
            {filteredTotals.count} of {opps.length} opportunities
          </div>
        </div>
      </motion.div>

      {/* Filter bar */}
      <div className="bg-white border border-border rounded-[2px] p-5 mt-2">
        <div className="flex items-baseline justify-between mb-3">
          <div className="label-eyebrow">Filter</div>
          {totalActive > 0 || query ? (
            <button
              onClick={clearAll}
              className="text-[11px] font-mono uppercase tracking-eyebrow text-undp hover:text-ink transition-colors"
            >
              Clear all ×
            </button>
          ) : (
            <span className="text-[11px] font-mono uppercase tracking-eyebrow text-muted-2">
              No filters applied
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-4">
          <div className="lg:col-span-3">
            <div className="text-[10px] font-mono uppercase tracking-eyebrow text-muted mb-2">
              Stage
            </div>
            <div className="flex flex-wrap gap-1.5">
              {data.stages.map((s) => (
                <Chip
                  key={s.code}
                  active={stageFilter.has(s.code)}
                  accent={STAGE_COLOR[s.code]}
                  onClick={() =>
                    setStageFilter((prev) => toggle(prev, s.code))
                  }
                >
                  {s.code} · {s.label}
                </Chip>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="text-[10px] font-mono uppercase tracking-eyebrow text-muted mb-2">
              Donor type
            </div>
            <div className="flex flex-wrap gap-1.5">
              {visibleTypes.map((t) => (
                <Chip
                  key={t}
                  active={typeFilter.has(t)}
                  onClick={() => setTypeFilter((prev) => toggle(prev, t))}
                >
                  {DONOR_TYPE_SHORT[t]}
                </Chip>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="text-[10px] font-mono uppercase tracking-eyebrow text-muted mb-2">
              Portfolio
            </div>
            <div className="flex flex-wrap gap-1.5">
              {portfolioCodes.map((c) => (
                <Chip
                  key={c}
                  active={portfolioFilter.has(c)}
                  accent={PORTFOLIO_COLOR[c]}
                  onClick={() =>
                    setPortfolioFilter((prev) => toggle(prev, c))
                  }
                >
                  {c}
                </Chip>
              ))}
            </div>
          </div>

          <div className="lg:col-span-12">
            <input
              id="rm-search"
              name="rm-search"
              type="search"
              placeholder="Search programme or donor…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white border border-border rounded-[2px] px-3.5 py-2 text-[13px] text-ink placeholder:text-muted-2 focus:outline-none focus:border-undp transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Charts row driven by filters */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div
          layout
          className="lg:col-span-8 bg-white border border-border rounded-[2px] p-6"
        >
          <div className="flex items-baseline justify-between">
            <div>
              <div className="label-eyebrow">Filtered pipeline</div>
              <h3 className="serif-title text-[20px] mt-1 text-ink">
                Stage breakdown
              </h3>
            </div>
            <div className="text-[11px] font-mono uppercase tracking-eyebrow text-muted">
              by value
            </div>
          </div>
          <div className="mt-5">
            <StageFunnel
              stages={stageStats.map((s) => ({
                stage: s.stage,
                label: s.label,
                value: s.value,
                count: s.count,
                order: s.order,
              }))}
              metric="value"
            />
          </div>
        </motion.div>

        <motion.div
          layout
          className="lg:col-span-4 bg-white border border-border rounded-[2px] p-6"
        >
          <div className="label-eyebrow">In view</div>
          <div className="mt-3 space-y-4">
            <Metric
              label="Pipeline value"
              value={formatUSD(filteredTotals.pipelineTotal)}
              hint={`${filteredTotals.count} opportunities`}
            />
            <Metric
              label="2026 adjusted"
              value={formatUSD(filteredTotals.target2026Adj)}
              hint="Probability-weighted near-term"
            />
            <Metric
              label="2027 adjusted"
              value={formatUSD(filteredTotals.target2027Adj)}
              hint="Probability-weighted out-year"
            />
            <Metric
              label="Cash YTD"
              value={formatUSD(
                data.totals.cashReceived2025 + data.totals.cashReceived2026
              )}
              hint={`${formatUSD(data.totals.cashReceived2026)} in 2026`}
            />
          </div>
        </motion.div>
      </div>

      {/* Opportunities table */}
      <motion.div
        layout
        className="mt-6 bg-white border border-border rounded-[2px]"
      >
        <div className="px-5 py-3.5 flex items-baseline justify-between border-b border-border">
          <h3 className="serif-title text-[18px] text-ink">
            Opportunities
            <span className="ml-2 text-[12px] font-mono tabular text-muted">
              {filtered.length}
            </span>
          </h3>
          <div className="text-[11px] font-mono uppercase tracking-eyebrow text-muted">
            Click a header to sort
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-3 px-5 py-2.5 border-b border-border label-eyebrow">
          <SortHeader
            label="Programme"
            sortKey="programme"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
            className="col-span-4"
          />
          <SortHeader
            label="Donor"
            sortKey="donor"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
            className="col-span-3"
          />
          <SortHeader
            label="Portfolio"
            sortKey="portfolio"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
            className="col-span-1"
          />
          <SortHeader
            label="Stage"
            sortKey="stage"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
            className="col-span-1"
          />
          <SortHeader
            label="Pipeline"
            sortKey="pipelineTotal"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
            className="col-span-2 text-right justify-end"
          />
          <SortHeader
            label="2026 Adj."
            sortKey="target2026Adj"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
            className="col-span-1 text-right justify-end"
          />
        </div>
        <div className="max-h-[520px] overflow-auto scroll-thin">
          {filtered.map((o, i) => (
            <motion.div
              key={o.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: Math.min(i, 14) * 0.012 }}
              className="grid grid-cols-12 gap-x-3 px-5 py-3 border-b border-border-hair items-center hover:bg-surface-2 transition-colors"
            >
              <div className="col-span-4 text-[13px] text-ink leading-snug pr-3">
                <div className="line-clamp-2">{o.programme}</div>
              </div>
              <div className="col-span-3 text-[12.5px] text-muted truncate">
                <div className="text-ink truncate text-[12.5px]">
                  {o.donorName}
                </div>
                <div className="text-[10.5px] font-mono uppercase tracking-eyebrow text-muted-2">
                  {DONOR_TYPE_SHORT[o.donorType] || o.donorType}
                </div>
              </div>
              <div className="col-span-1">
                <span
                  className="inline-block px-1.5 py-[2px] border rounded-[2px] text-[10px] font-mono uppercase tracking-eyebrow"
                  style={{
                    color: PORTFOLIO_COLOR[o.portfolioCode] || "#475569",
                    borderColor: "#E2E8F0",
                  }}
                >
                  {o.portfolioCode}
                </span>
              </div>
              <div className="col-span-1">
                <StatusPill tone={STAGE_TONE[o.stage]}>{o.stage}</StatusPill>
              </div>
              <div className="col-span-2 text-right text-[12.5px] font-mono tabular text-ink">
                {o.pipelineTotal > 0 ? formatUSD(o.pipelineTotal) : "—"}
              </div>
              <div className="col-span-1 text-right text-[12px] font-mono tabular text-muted">
                {o.target2026Adj > 0 ? formatUSD(o.target2026Adj) : "—"}
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-[13px] text-muted">
              No opportunities match these filters.
            </div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-border bg-surface-2 text-[11px] font-mono uppercase tracking-eyebrow text-muted flex justify-between">
          <span>{filteredTotals.count} opportunities</span>
          <span>
            {formatUSD(filteredTotals.pipelineTotal)} · 2026 adj{" "}
            {formatUSD(filteredTotals.target2026Adj)}
          </span>
        </div>
      </motion.div>

      {/* KPI workflow row */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <KpiBlock
          title="Agreements review"
          tone="success"
          rows={data.kpis["Agreements Review"] || []}
        />
        <KpiBlock
          title="Fund applications"
          tone="accent"
          rows={data.kpis["Fund Applications"] || []}
        />
      </div>
    </section>
  );
}

function toggle<T>(set: Set<T>, v: T): Set<T> {
  const next = new Set(set);
  if (next.has(v)) next.delete(v);
  else next.add(v);
  return next;
}

function Chip({
  children,
  active,
  accent,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  accent?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[2px] border text-[11px] font-mono uppercase tracking-eyebrow transition-all"
      style={{
        background: active ? "#0A1628" : "#FFFFFF",
        color: active ? "#FFFFFF" : "#475569",
        borderColor: active ? "#0A1628" : "#E2E8F0",
      }}
    >
      {accent && (
        <span
          className="inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: accent }}
        />
      )}
      {children}
    </button>
  );
}

function Metric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-eyebrow text-muted">
        {label}
      </div>
      <div className="mt-1 text-[24px] font-light tabular leading-none text-ink">
        {value}
      </div>
      {hint && (
        <div className="mt-1.5 text-[11px] text-muted leading-snug">{hint}</div>
      )}
    </div>
  );
}

function SortHeader({
  label,
  sortKey,
  current,
  dir,
  onClick,
  className,
}: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  dir: "asc" | "desc";
  onClick: (k: SortKey) => void;
  className?: string;
}) {
  const active = current === sortKey;
  return (
    <button
      onClick={() => onClick(sortKey)}
      className={`flex items-center gap-1 ${className ?? ""} ${active ? "text-undp" : ""}`}
    >
      {label}
      <span className="font-mono text-[10px] leading-none">
        {active ? (dir === "desc" ? "▼" : "▲") : "⇅"}
      </span>
    </button>
  );
}

function KpiBlock({
  title,
  tone,
  rows,
}: {
  title: string;
  tone: "success" | "accent";
  rows: { indicator: string; value: number; unit: string }[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border border-border rounded-[2px] p-7"
    >
      <div className="flex items-baseline justify-between">
        <div>
          <div className="label-eyebrow">Workflow</div>
          <h3 className="serif-title text-[20px] mt-1 text-ink">{title}</h3>
        </div>
        <StatusPill tone={tone}>
          {tone === "success" ? "On track" : "Active"}
        </StatusPill>
      </div>
      <ul className="mt-5 divide-y divide-border-hair">
        {rows.map((r) => (
          <li
            key={r.indicator}
            className="flex items-center justify-between py-3"
          >
            <span className="text-[13px] text-ink">{r.indicator}</span>
            <span className="text-[14px] font-mono tabular text-ink">
              {r.unit === "USD M"
                ? `$${r.value}M`
                : r.unit === "USD K"
                ? `$${r.value}K`
                : r.unit === "%"
                ? `${r.value}%`
                : formatCount(r.value)}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
