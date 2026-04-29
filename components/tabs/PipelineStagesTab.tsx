"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { formatUSD, formatPercent, formatCount } from "@/lib/format";
import {
  DashboardData,
  StageCode,
  STAGE_COLOR,
  PORTFOLIO_COLOR,
  DONOR_TYPE_SHORT,
} from "@/lib/types";

type Props = { data: DashboardData };

export default function PipelineStagesTab({ data }: Props) {
  const stages = data.stages;
  const [active, setActive] = useState<StageCode>("B");

  const grouped = useMemo(() => {
    const m = new Map<StageCode, typeof data.opportunities>();
    for (const s of stages) m.set(s.code, []);
    for (const o of data.opportunities) {
      m.get(o.stage)?.push(o);
    }
    for (const [k, v] of m) {
      v.sort((a, b) => b.pipelineTotal - a.pipelineTotal);
    }
    return m;
  }, [stages, data.opportunities]);

  const totals = useMemo(() => {
    return stages.map((s) => {
      const opps = grouped.get(s.code) || [];
      return {
        code: s.code,
        label: s.label,
        order: s.order,
        probability: s.probability,
        description: s.description,
        count: opps.length,
        value: opps.reduce((acc, o) => acc + o.pipelineTotal, 0),
        weighted: opps.reduce(
          (acc, o) => acc + o.pipelineTotal * s.probability,
          0
        ),
      };
    });
  }, [stages, grouped]);

  const grandValue = totals.reduce((s, t) => s + t.value, 0);
  const grandCount = totals.reduce((s, t) => s + t.count, 0);
  const grandWeighted = totals.reduce((s, t) => s + t.weighted, 0);

  const activeStage = totals.find((t) => t.code === active)!;
  const activeOpps = grouped.get(active) || [];

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-baseline justify-between gap-6"
      >
        <div>
          <div className="section-numeral">04 / Pipeline Stages</div>
          <h2 className="serif-title text-[34px] md:text-[42px] leading-[1.05] mt-2 text-ink">
            Phases of the partnership pipeline
          </h2>
          <p className="mt-2 text-[14px] text-muted max-w-2xl">
            From early scouting through approval &mdash; click a stage to see
            its opportunities. Probability-weighted total reflects expected-value
            across the pipeline.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
          <div className="label-eyebrow">Probability-weighted</div>
          <div className="text-[44px] font-light leading-none tabular text-ink">
            {formatUSD(grandWeighted)}
          </div>
          <div className="text-[11px] text-muted">
            {grandCount} opps · {formatUSD(grandValue)} pipeline
          </div>
        </div>
      </motion.div>

      {/* Stage cards (clickable) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {totals.map((s, i) => {
          const isActive = s.code === active;
          const color = STAGE_COLOR[s.code];
          return (
            <motion.button
              key={s.code}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setActive(s.code)}
              className="text-left relative bg-white border rounded-[2px] p-6 transition-all"
              style={{
                borderColor: isActive ? color : "#E2E8F0",
                boxShadow: isActive
                  ? `inset 3px 0 0 0 ${color}`
                  : "none",
              }}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] tracking-eyebrow text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-mono text-[10px] tracking-eyebrow"
                  style={{ color }}
                >
                  Stage {s.code}
                </span>
                <span className="ml-auto text-[10px] font-mono tabular text-muted">
                  p={formatPercent(s.probability, 0)}
                </span>
              </div>
              <h3 className="serif-title text-[20px] mt-2 text-ink leading-snug">
                {s.label}
              </h3>
              <div className="mt-5 flex items-baseline gap-2 tabular">
                <span
                  className="text-[36px] font-light leading-none"
                  style={{ color: s.code === "D" ? "#475569" : color }}
                >
                  {s.count}
                </span>
                <span className="text-[12px] text-muted">
                  {s.count === 1 ? "opportunity" : "opportunities"}
                </span>
              </div>
              <div className="mt-2 text-[13px] font-mono tabular text-ink">
                {s.value > 0 ? formatUSD(s.value) : "— pre-cost"}
              </div>
              <div className="mt-1 text-[11px] text-muted">
                Weighted {formatUSD(s.weighted)}
              </div>
              <div className="mt-4 text-[11.5px] text-muted leading-relaxed">
                {s.description}
              </div>
              <div className="mt-4 h-1 bg-surface-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      grandValue > 0 ? (s.value / grandValue) * 100 : 0
                    }%`,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: 0.2 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full"
                  style={{ background: color }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Active stage detail */}
      <motion.div
        layout
        className="mt-10 bg-white border border-border rounded-[2px]"
      >
        <div className="px-6 py-5 border-b border-border flex items-baseline justify-between gap-4">
          <div>
            <div className="label-eyebrow" style={{ color: STAGE_COLOR[active] }}>
              Stage {active} · {activeStage.label}
            </div>
            <h3 className="serif-title text-[24px] mt-1 text-ink">
              {activeOpps.length} opportunit
              {activeOpps.length === 1 ? "y" : "ies"} in {activeStage.label.toLowerCase()}
            </h3>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase tracking-eyebrow text-muted">
              Stage value
            </div>
            <div className="text-[22px] font-light tabular text-ink leading-none mt-1">
              {activeStage.value > 0 ? formatUSD(activeStage.value) : "—"}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-eyebrow text-muted mt-1">
              {formatUSD(activeStage.weighted)} weighted
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-3 px-6 py-2.5 border-b border-border label-eyebrow">
          <div className="col-span-5">Programme</div>
          <div className="col-span-3">Donor</div>
          <div className="col-span-1">Portfolio</div>
          <div className="col-span-2 text-right">Pipeline</div>
          <div className="col-span-1 text-right">2026 Adj.</div>
        </div>
        <div className="max-h-[440px] overflow-auto scroll-thin">
          {activeOpps.length === 0 ? (
            <div className="px-6 py-12 text-center text-[13px] text-muted">
              No opportunities at this stage.
            </div>
          ) : (
            activeOpps.map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(i, 14) * 0.018,
                }}
                className="grid grid-cols-12 gap-x-3 px-6 py-3 border-b border-border-hair items-center hover:bg-surface-2 transition-colors"
              >
                <div className="col-span-5 text-[13px] text-ink leading-snug">
                  <div className="line-clamp-2 pr-3">{o.programme}</div>
                </div>
                <div className="col-span-3">
                  <div className="text-[12.5px] text-ink truncate">
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
                <div className="col-span-2 text-right text-[12.5px] font-mono tabular text-ink">
                  {o.pipelineTotal > 0 ? formatUSD(o.pipelineTotal) : "—"}
                </div>
                <div className="col-span-1 text-right text-[12px] font-mono tabular text-muted">
                  {o.target2026Adj > 0 ? formatUSD(o.target2026Adj) : "—"}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Footer summary */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-border-hair bg-white border border-border rounded-[2px]"
      >
        <SummaryCol
          label="Total opportunities"
          value={formatCount(grandCount)}
        />
        <SummaryCol label="Total pipeline" value={formatUSD(grandValue)} />
        <SummaryCol
          label="Probability-weighted"
          value={formatUSD(grandWeighted)}
        />
        <SummaryCol
          label="Highest-value stage"
          value={
            totals.reduce((max, s) => (s.value > max.value ? s : max), totals[0])
              .label
          }
        />
      </motion.div>
    </section>
  );
}

function SummaryCol({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-7 py-5">
      <div className="label-eyebrow !text-[10px]">{label}</div>
      <div className="mt-2 text-[20px] font-light tabular text-ink leading-none">
        {value}
      </div>
    </div>
  );
}
