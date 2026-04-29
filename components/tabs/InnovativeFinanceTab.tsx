"use client";

import { motion } from "framer-motion";
import StatusPill from "../primitives/StatusPill";
import { formatUSD, formatCount } from "@/lib/format";

type Props = { data: any };

const STAGE_TONE: Record<
  string,
  "accent" | "success" | "warning" | "muted" | "default"
> = {
  Pipeline: "accent",
  Bankable: "success",
  Concept: "warning",
  Exploratory: "muted",
};

export default function InnovativeFinanceTab({ data }: Props) {
  const cards = data.innovativeFinance;
  const totalValue = cards.reduce((acc: number, c: any) => acc + c.value, 0);
  const totalCount = cards.reduce((acc: number, c: any) => acc + c.count, 0);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-baseline justify-between gap-6"
      >
        <div>
          <div className="section-numeral">04 / Innovative Finance</div>
          <h2 className="serif-title text-[34px] md:text-[40px] leading-[1.05] mt-2 text-ink">
            Beyond traditional ODA
          </h2>
          <p className="mt-2 text-[14px] text-muted max-w-2xl">
            Strategic instruments under exploration: blended, climate, Islamic,
            insurance and diaspora finance.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
          <div className="label-eyebrow">Combined pipeline</div>
          <div className="text-[44px] font-light leading-none tabular text-ink">
            {formatUSD(totalValue)}
          </div>
          <div className="text-[11px] text-muted">
            {formatCount(totalCount)} active opportunities
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {cards.map((c: any, i: number) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group bg-white border border-border rounded-[2px] p-6 tile-hover relative overflow-hidden"
          >
            {/* Number watermark — editorial detail */}
            <span className="absolute right-4 top-4 font-mono text-[10px] tracking-eyebrow text-muted-2">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="serif-title text-[18px] leading-tight text-ink pr-8">
                {c.title}
              </h3>
            </div>
            <p className="mt-2 text-[12.5px] text-muted leading-relaxed min-h-[36px]">
              {c.description}
            </p>
            <div className="mt-5 flex items-baseline gap-3 tabular">
              <span className="text-[34px] font-light text-ink leading-none">
                {c.value > 0 ? formatUSD(c.value) : c.count}
              </span>
              <span className="text-[12px] text-muted">
                {c.value > 0
                  ? `${c.count} opps`
                  : c.count === 1
                  ? "opportunity"
                  : c.count === 0
                  ? "scoping"
                  : "opportunities"}
              </span>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <StatusPill tone={STAGE_TONE[c.stage] || "default"}>
                {c.stage}
              </StatusPill>
              <span className="text-[10px] font-mono uppercase tracking-eyebrow text-muted-2 group-hover:text-ink transition-colors">
                Open →
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* De-risking instruments */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.4 }}
        className="mt-10 bg-white border border-border rounded-[2px]"
      >
        <div className="px-5 py-3.5 flex items-baseline justify-between border-b border-border">
          <h3 className="serif-title text-[18px] text-ink">
            De-risking instruments available
          </h3>
          <div className="text-[11px] font-mono uppercase tracking-eyebrow text-muted">
            {data.deRiskingInstruments.length} mechanisms
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-3 px-5 py-2.5 border-b border-border label-eyebrow">
          <div className="col-span-3">Instrument</div>
          <div className="col-span-3">Provider</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-4">Use case</div>
        </div>
        {data.deRiskingInstruments.map((d: any, i: number) => (
          <div
            key={d.instrument}
            className="grid grid-cols-12 gap-x-3 px-5 py-3 border-b border-border-hair last:border-b-0 items-center hover:bg-surface-2 transition-colors"
          >
            <div className="col-span-3 text-[13px] text-ink">{d.instrument}</div>
            <div className="col-span-3 text-[12.5px] text-muted">
              {d.provider}
            </div>
            <div className="col-span-2">
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
            </div>
            <div className="col-span-4 text-[12.5px] text-muted">
              {d.useCase}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
