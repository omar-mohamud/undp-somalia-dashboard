"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import StatusPill from "../primitives/StatusPill";
import { formatUSD, formatCount } from "@/lib/format";
import {
  DashboardData,
  Donor,
  DonorType,
  DONOR_TYPE_LABEL,
  DONOR_TYPE_SHORT,
  DONOR_TYPE_COLOR,
} from "@/lib/types";

type Props = { data: DashboardData };

type SortKey = "name" | "type" | "pipelineTotal" | "opportunityCount" | "cashReceived";

const TYPE_TONES: Record<string, { soft: string; ink: string; rule: string }> =
  {
    Vertical_Fund: { soft: "#EAF2F9", ink: "#0468A0", rule: "#BFDBFE" },
    DAC: { soft: "#F0F6FB", ink: "#0468A0", rule: "#BFDBFE" },
    GCC: { soft: "#F4F1EA", ink: "#7C5E2A", rule: "#E8DCC2" },
    MPTF: { soft: "#EEF2F7", ink: "#1E293B", rule: "#CBD5E1" },
    IFI: { soft: "#F1F5F9", ink: "#334155", rule: "#CBD5E1" },
    Multilateral: { soft: "#F5F2EC", ink: "#5A4A2E", rule: "#E5DBC5" },
    PrivateSector: { soft: "#F4F0F6", ink: "#5B3A6F", rule: "#D8C8E1" },
    Foundation: { soft: "#F0F4F0", ink: "#3F5C3F", rule: "#C9D6C9" },
    UN_Agency: { soft: "#EFF1F4", ink: "#475569", rule: "#CBD5E1" },
    Other: { soft: "#F1F5F9", ink: "#64748B", rule: "#E2E8F0" },
  };

export default function DonorRelationsTab({ data }: Props) {
  const [filter, setFilter] = useState<DonorType | null>(null);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("pipelineTotal");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    let list: Donor[] = data.donors;
    if (filter) list = list.filter((d) => d.type === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          (d.country || "").toLowerCase().includes(q)
      );
    }
    const dir = sortDir === "desc" ? -1 : 1;
    list = [...list].sort((a, b) => {
      const av = a[sortKey] as any;
      const bv = b[sortKey] as any;
      if (typeof av === "string") return av.localeCompare(bv as string) * dir;
      return ((av || 0) - (bv || 0)) * dir;
    });
    return list;
  }, [filter, query, sortKey, sortDir, data.donors]);

  const onSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" || key === "type" ? "asc" : "desc");
    }
  };

  const totalPipeline = useMemo(
    () => filtered.reduce((s, d) => s + d.pipelineTotal, 0),
    [filtered]
  );
  const totalCash = useMemo(
    () => filtered.reduce((s, d) => s + d.cashReceived, 0),
    [filtered]
  );
  const totalOpps = useMemo(
    () => filtered.reduce((s, d) => s + d.opportunityCount, 0),
    [filtered]
  );

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-baseline justify-between gap-6"
      >
        <div>
          <div className="section-numeral">02 / Donor Relations</div>
          <h2 className="serif-title text-[34px] md:text-[42px] leading-[1.05] mt-2 text-ink">
            Donor engagement register
          </h2>
          <p className="mt-2 text-[14px] text-muted max-w-2xl">
            All {data.donors.length} active and prospective donor relationships,
            with pipeline value and cash received. Filter by type, search, or
            sort any column.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
          <div className="label-eyebrow">In view</div>
          <div className="text-[40px] font-light leading-none tabular text-ink">
            {filtered.length}
          </div>
          <div className="text-[11px] text-muted">
            of {data.donors.length} donors
          </div>
        </div>
      </motion.div>

      {/* Type tile row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5">
        <TypeTile
          label="All Types"
          count={data.donors.length}
          active={filter === null}
          onClick={() => setFilter(null)}
          tone={{ soft: "#FFFFFF", ink: "#0A1628", rule: "#0A1628" }}
          delay={0}
        />
        {data.donorTypeCounts.map((t, i) => (
          <TypeTile
            key={t.type}
            label={DONOR_TYPE_LABEL[t.type] || t.type}
            count={t.count}
            active={filter === t.type}
            onClick={() =>
              setFilter((prev) => (prev === t.type ? null : t.type))
            }
            tone={TYPE_TONES[t.type] || TYPE_TONES.Other}
            accent={DONOR_TYPE_COLOR[t.type]}
            delay={(i + 1) * 0.04}
          />
        ))}
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <input
            id="donor-search"
            name="donor-search"
            type="search"
            placeholder="Search donor or country…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white border border-border rounded-[2px] px-3.5 py-2 text-[13px] text-ink placeholder:text-muted-2 focus:outline-none focus:border-undp transition-colors"
          />
        </div>
        <div className="flex items-baseline gap-6 text-[11px] font-mono uppercase tracking-eyebrow text-muted">
          <span>
            <span className="text-ink tabular">{formatUSD(totalPipeline)}</span>{" "}
            pipeline
          </span>
          <span>
            <span className="text-ink tabular">{formatUSD(totalCash)}</span>{" "}
            cash YTD
          </span>
          <span>
            <span className="text-ink tabular">{totalOpps}</span> opps
          </span>
        </div>
      </div>

      {/* Register table */}
      <div className="mt-4 bg-white border border-border rounded-[2px]">
        <div className="grid grid-cols-12 gap-x-4 px-5 py-3 border-b border-border label-eyebrow">
          <SortHeader
            className="col-span-4"
            label="Donor"
            sortKey="name"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
          />
          <SortHeader
            className="col-span-2"
            label="Type"
            sortKey="type"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
          />
          <SortHeader
            className="col-span-1 text-right justify-end"
            label="Opps"
            sortKey="opportunityCount"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
          />
          <SortHeader
            className="col-span-2 text-right justify-end"
            label="Pipeline"
            sortKey="pipelineTotal"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
          />
          <SortHeader
            className="col-span-2 text-right justify-end"
            label="Cash YTD"
            sortKey="cashReceived"
            current={sortKey}
            dir={sortDir}
            onClick={onSort}
          />
          <div className="col-span-1 text-right">Country</div>
        </div>
        <div className="max-h-[520px] overflow-auto scroll-thin">
          {filtered.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: Math.min(i, 14) * 0.018 }}
              className="grid grid-cols-12 gap-x-4 px-5 py-3 border-b border-border-hair items-center hover:bg-surface-2 transition-colors"
            >
              <div className="col-span-4 text-[13px] text-ink truncate">
                {d.name}
              </div>
              <div className="col-span-2">
                <StatusPill tone="muted">
                  {DONOR_TYPE_SHORT[d.type] || d.type}
                </StatusPill>
              </div>
              <div className="col-span-1 text-right text-[12.5px] font-mono tabular text-ink">
                {d.opportunityCount || "—"}
              </div>
              <div className="col-span-2 text-right text-[12.5px] font-mono tabular text-ink">
                {d.pipelineTotal > 0 ? formatUSD(d.pipelineTotal) : "—"}
              </div>
              <div className="col-span-2 text-right text-[12.5px] font-mono tabular text-ink">
                {d.cashReceived > 0 ? formatUSD(d.cashReceived) : "—"}
              </div>
              <div className="col-span-1 text-right text-[11.5px] text-muted truncate">
                {d.country || "—"}
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-[13px] text-muted">
              No donors match your search.
            </div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-border bg-surface-2 text-[11px] font-mono uppercase tracking-eyebrow text-muted flex justify-between">
          <span>{filtered.length} donors</span>
          <span>
            {formatCount(totalOpps)} opportunities ·{" "}
            {formatUSD(totalPipeline)} pipeline
          </span>
        </div>
      </div>
    </section>
  );
}

type TileProps = {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  tone: { soft: string; ink: string; rule: string };
  accent?: string;
  delay: number;
};

function TypeTile({
  label,
  count,
  active,
  onClick,
  tone,
  accent,
  delay,
}: TileProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      onClick={onClick}
      className="text-left px-4 py-3.5 border rounded-[2px] transition-all relative"
      style={{
        background: active ? tone.soft : "#FFFFFF",
        borderColor: active ? tone.rule : "#E2E8F0",
      }}
    >
      {accent && active && (
        <span
          className="absolute left-0 top-0 bottom-0 w-[2px]"
          style={{ background: accent }}
        />
      )}
      <div
        className="text-[10px] font-mono uppercase tracking-eyebrow truncate"
        style={{ color: active ? tone.ink : "#64748B" }}
      >
        {label}
      </div>
      <div
        className="mt-1.5 text-[24px] font-light leading-none tabular"
        style={{ color: active ? tone.ink : "#0A1628" }}
      >
        {count}
      </div>
    </motion.button>
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
