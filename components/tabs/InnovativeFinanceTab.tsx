"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import StatusPill from "../primitives/StatusPill";
import { formatUSD, formatCount } from "@/lib/format";
import {
  DashboardData,
  DonorType,
  DONOR_TYPE_LABEL,
  DONOR_TYPE_COLOR,
} from "@/lib/types";

type Props = { data: DashboardData };

type Lens = "Vertical_Fund" | "PrivateSector" | "MPTF" | "GCC" | "ALL";

const LENSES: { id: Lens; label: string; description: string }[] = [
  {
    id: "ALL",
    label: "All instruments",
    description:
      "Every non-traditional financing channel currently in the portfolio.",
  },
  {
    id: "Vertical_Fund",
    label: "Climate finance",
    description:
      "GCF, GEF, Adaptation Fund, IKI and the Funding Windows climate channel.",
  },
  {
    id: "MPTF",
    label: "Pooled funds",
    description:
      "Somalia Joint Fund (MPTF) and the UN Peacebuilding Fund.",
  },
  {
    id: "PrivateSector",
    label: "Private sector",
    description:
      "Bank, telco, foundation and corporate engagements under formation.",
  },
  {
    id: "GCC",
    label: "GCC partners",
    description:
      "Saudi Fund, Qatar, OFID and KSrelief vehicles.",
  },
];

export default function InnovativeFinanceTab({ data }: Props) {
  const [lens, setLens] = useState<Lens>("ALL");

  const opps = useMemo(() => {
    if (lens === "ALL")
      return data.opportunities.filter((o) =>
        ["Vertical_Fund", "PrivateSector", "MPTF", "GCC", "Foundation"].includes(
          o.donorType
        )
      );
    return data.opportunities.filter((o) => o.donorType === lens);
  }, [lens, data.opportunities]);

  const totals = useMemo(() => {
    return {
      pipeline: opps.reduce((s, o) => s + o.pipelineTotal, 0),
      count: opps.length,
      donors: new Set(opps.map((o) => o.donorId)).size,
      weighted: opps.reduce((s, o) => {
        const stage = data.stages.find((st) => st.code === o.stage);
        return s + o.pipelineTotal * (stage?.probability ?? 0);
      }, 0),
    };
  }, [opps, data.stages]);

  const donorBreakdown = useMemo(() => {
    const m = new Map<string, { name: string; value: number; count: number; type: DonorType }>();
    for (const o of opps) {
      const e = m.get(o.donorName) || {
        name: o.donorName,
        value: 0,
        count: 0,
        type: o.donorType,
      };
      e.value += o.pipelineTotal;
      e.count += 1;
      m.set(o.donorName, e);
    }
    return [...m.values()].sort((a, b) => b.value - a.value).slice(0, 8);
  }, [opps]);

  const maxDonor = donorBreakdown[0]?.value || 1;

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-baseline justify-between gap-6"
      >
        <div>
          <div className="section-numeral">05 / Innovative Finance</div>
          <h2 className="serif-title text-[34px] md:text-[42px] leading-[1.05] mt-2 text-ink">
            Beyond traditional ODA
          </h2>
          <p className="mt-2 text-[14px] text-muted max-w-2xl">
            Vertical funds, pooled funds, private-sector and GCC partnerships
            currently in the pipeline. Switch lens to compare instrument
            families.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
          <div className="label-eyebrow">In view</div>
          <div className="text-[44px] font-light leading-none tabular text-ink">
            {formatUSD(totals.pipeline)}
          </div>
          <div className="text-[11px] text-muted">
            {totals.count} opps · {totals.donors} donors
          </div>
        </div>
      </motion.div>

      {/* Lens selector */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {LENSES.map((l) => (
          <button
            key={l.id}
            onClick={() => setLens(l.id)}
            className="px-3 py-1.5 rounded-[2px] border text-[12px] tracking-tight transition-all"
            style={{
              background: lens === l.id ? "#0A1628" : "#FFFFFF",
              color: lens === l.id ? "#FFFFFF" : "#475569",
              borderColor: lens === l.id ? "#0A1628" : "#E2E8F0",
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      <motion.p
        key={lens}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-[13px] text-muted leading-relaxed max-w-3xl mb-6"
      >
        {LENSES.find((l) => l.id === lens)!.description}
      </motion.p>

      {/* Metric strip */}
      <motion.div
        layout
        className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border-hair bg-white border border-border rounded-[2px] mb-8"
      >
        <Metric
          label="Pipeline value"
          value={formatUSD(totals.pipeline)}
          hint={`${totals.count} opportunities`}
        />
        <Metric
          label="Probability-weighted"
          value={formatUSD(totals.weighted)}
          hint="Across all stages"
        />
        <Metric
          label="Distinct donors"
          value={formatCount(totals.donors)}
          hint="With at least one opp"
        />
        <Metric
          label="Avg ticket size"
          value={
            totals.count > 0
              ? formatUSD(totals.pipeline / totals.count)
              : "—"
          }
          hint="Pipeline / opportunities"
        />
      </motion.div>

      {/* Top donors bar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div
          layout
          className="lg:col-span-7 bg-white border border-border rounded-[2px] p-6"
        >
          <div className="flex items-baseline justify-between">
            <div>
              <div className="label-eyebrow">Largest engagements</div>
              <h3 className="serif-title text-[20px] mt-1 text-ink">
                Pipeline by donor
              </h3>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-eyebrow text-muted">
              Top {donorBreakdown.length}
            </span>
          </div>
          <ul className="mt-5 space-y-3">
            {donorBreakdown.map((d, i) => (
              <motion.li
                key={d.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
              >
                <div className="flex items-baseline justify-between mb-1.5 gap-3">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="font-mono text-[10px] text-muted-2 tracking-eyebrow shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] text-ink truncate">
                      {d.name}
                    </span>
                    <span className="text-[10.5px] font-mono uppercase tracking-eyebrow text-muted-2 shrink-0">
                      {DONOR_TYPE_LABEL[d.type] || d.type}
                    </span>
                  </div>
                  <span className="text-[12.5px] font-mono tabular text-ink shrink-0">
                    {formatUSD(d.value)}
                    <span className="text-muted ml-2">{d.count} opps</span>
                  </span>
                </div>
                <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(d.value / maxDonor) * 100}%` }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="h-full"
                    style={{ background: DONOR_TYPE_COLOR[d.type] }}
                  />
                </div>
              </motion.li>
            ))}
            {donorBreakdown.length === 0 && (
              <li className="text-[13px] text-muted">
                No donors in this lens.
              </li>
            )}
          </ul>
        </motion.div>

        {/* De-risking instruments — static reference */}
        <motion.div
          layout
          className="lg:col-span-5 bg-white border border-border rounded-[2px] p-6"
        >
          <div className="label-eyebrow">Reference</div>
          <h3 className="serif-title text-[20px] mt-1 text-ink">
            De-risking instruments
          </h3>
          <ul className="mt-5 divide-y divide-border-hair">
            {DERISKING.map((d) => (
              <li
                key={d.instrument}
                className="py-3 flex items-baseline justify-between gap-4"
              >
                <div className="min-w-0">
                  <div className="text-[13px] text-ink leading-snug">
                    {d.instrument}
                  </div>
                  <div className="text-[11.5px] text-muted leading-snug truncate">
                    {d.useCase}
                  </div>
                </div>
                <StatusPill
                  tone={
                    d.status === "Available"
                      ? "success"
                      : d.status === "In design"
                      ? "warning"
                      : "muted"
                  }
                >
                  {d.status}
                </StatusPill>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Opportunities list for the lens */}
      <motion.div
        layout
        className="mt-8 bg-white border border-border rounded-[2px]"
      >
        <div className="px-5 py-3.5 border-b border-border flex items-baseline justify-between">
          <h3 className="serif-title text-[18px] text-ink">
            Opportunities in lens
            <span className="ml-2 text-[12px] font-mono tabular text-muted">
              {opps.length}
            </span>
          </h3>
          <span className="text-[11px] font-mono uppercase tracking-eyebrow text-muted">
            Sorted by pipeline value
          </span>
        </div>
        <div className="grid grid-cols-12 gap-x-3 px-5 py-2.5 border-b border-border label-eyebrow">
          <div className="col-span-5">Programme</div>
          <div className="col-span-3">Donor</div>
          <div className="col-span-1">Stage</div>
          <div className="col-span-2 text-right">Pipeline</div>
          <div className="col-span-1 text-right">2026 Adj.</div>
        </div>
        <div className="max-h-[420px] overflow-auto scroll-thin">
          {[...opps]
            .sort((a, b) => b.pipelineTotal - a.pipelineTotal)
            .map((o, i) => (
              <motion.div
                key={o.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.3,
                  delay: Math.min(i, 14) * 0.015,
                }}
                className="grid grid-cols-12 gap-x-3 px-5 py-3 border-b border-border-hair items-center hover:bg-surface-2 transition-colors"
              >
                <div className="col-span-5 text-[13px] text-ink leading-snug pr-3">
                  <div className="line-clamp-2">{o.programme}</div>
                </div>
                <div className="col-span-3 text-[12.5px] text-ink truncate">
                  {o.donorName}
                </div>
                <div className="col-span-1">
                  <StatusPill tone="muted">{o.stage}</StatusPill>
                </div>
                <div className="col-span-2 text-right text-[12.5px] font-mono tabular text-ink">
                  {o.pipelineTotal > 0 ? formatUSD(o.pipelineTotal) : "—"}
                </div>
                <div className="col-span-1 text-right text-[12px] font-mono tabular text-muted">
                  {o.target2026Adj > 0 ? formatUSD(o.target2026Adj) : "—"}
                </div>
              </motion.div>
            ))}
          {opps.length === 0 && (
            <div className="px-5 py-12 text-center text-[13px] text-muted">
              No opportunities in this lens.
            </div>
          )}
        </div>
      </motion.div>
    </section>
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
    <div className="px-6 py-5">
      <div className="text-[10px] font-mono uppercase tracking-eyebrow text-muted">
        {label}
      </div>
      <div className="mt-1.5 text-[24px] font-light tabular leading-none text-ink">
        {value}
      </div>
      {hint && (
        <div className="mt-2 text-[11px] text-muted leading-snug">{hint}</div>
      )}
    </div>
  );
}

const DERISKING = [
  {
    instrument: "Partial Credit Guarantees",
    useCase: "World Bank / MIGA — currency & political risk",
    status: "Available",
  },
  {
    instrument: "First-Loss Capital",
    useCase: "Vertical Funds (GCF, GEF) catalytic layer",
    status: "Available",
  },
  {
    instrument: "Technical Assistance Facilities",
    useCase: "Bilateral DAC project preparation",
    status: "Available",
  },
  {
    instrument: "Climate Risk Insurance",
    useCase: "ARC pastoralist drought response",
    status: "In design",
  },
  {
    instrument: "Currency Hedging (TCX/MFX)",
    useCase: "Local-currency lending mitigation",
    status: "Under review",
  },
];
