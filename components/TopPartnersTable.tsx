"use client";

import { motion } from "framer-motion";
import { formatUSD, formatPercent } from "@/lib/format";

type Donor = {
  rank: number;
  name: string;
  type: string;
  pipeline: number;
  cash: number;
};

type Props = {
  donors: Donor[];
};

const TYPE_LABELS: Record<string, string> = {
  DAC: "DAC Bilateral",
  IFI: "IFI",
  Vertical_Fund: "Vertical Fund",
  GCC: "GCC",
  MPTF: "Pooled Fund",
  PrivateSector: "Private Sector",
};

export default function TopPartnersTable({ donors }: Props) {
  const max = Math.max(...donors.map((d) => d.pipeline), 1);

  return (
    <section className="mx-auto max-w-[1320px] px-8 lg:px-14 py-20 md:py-24">
      <div className="max-w-2xl mb-10">
        <div className="label-eyebrow">Top partners</div>
        <h3 className="serif-title text-[30px] md:text-[36px] mt-2 text-ink leading-[1.1]">
          Our largest pipeline partners
        </h3>
        <p className="text-[15px] text-muted mt-3 leading-relaxed">
          The ten partners contributing the most pipeline value this year, with
          their cash conversion to date.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-x-6 pb-3 border-b border-border-soft label-eyebrow">
        <div className="col-span-1">#</div>
        <div className="col-span-5 md:col-span-4">Partner</div>
        <div className="hidden md:block md:col-span-2">Type</div>
        <div className="col-span-3 md:col-span-2 text-right">Pipeline</div>
        <div className="col-span-3 md:col-span-2 text-right">Cash</div>
        <div className="hidden md:block md:col-span-1 text-right">Conv.</div>
      </div>

      <div>
        {donors.map((d, i) => {
          const conversion = d.pipeline > 0 ? d.cash / d.pipeline : 0;
          const w = (d.pipeline / max) * 100;
          return (
            <motion.div
              key={d.rank}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-12 gap-x-6 py-4 border-b border-border-hair items-center hover:bg-[#FBFCFD] transition-colors"
            >
              <div className="col-span-1 font-mono tabular-nums text-[12px] text-muted">
                {String(d.rank).padStart(2, "0")}
              </div>
              <div className="col-span-5 md:col-span-4">
                <div className="text-[15px] text-ink">{d.name}</div>
                <div className="md:hidden mt-1">
                  <TypePill type={d.type} />
                </div>
                <div className="relative mt-2 h-[3px] bg-surface-soft rounded-[1px] overflow-hidden md:hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-undp"
                    style={{ width: `${w}%` }}
                  />
                </div>
              </div>
              <div className="hidden md:block md:col-span-2">
                <TypePill type={d.type} />
              </div>
              <div className="col-span-3 md:col-span-2 text-right">
                <div className="font-mono tabular-nums text-[14px] text-ink">
                  {formatUSD(d.pipeline)}
                </div>
                <div className="hidden md:block relative mt-2 h-[3px] bg-surface-soft rounded-[1px] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${w}%` }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-y-0 left-0 bg-undp"
                  />
                </div>
              </div>
              <div className="col-span-3 md:col-span-2 text-right font-mono tabular-nums text-[14px]">
                <span className={d.cash > 0 ? "text-ink" : "text-border-soft"}>
                  {d.cash > 0 ? formatUSD(d.cash) : "—"}
                </span>
              </div>
              <div className="hidden md:block md:col-span-1 text-right">
                <ConversionPill value={conversion} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function TypePill({ type }: { type: string }) {
  const label = TYPE_LABELS[type] || type;
  return (
    <span className="inline-flex items-center px-2 py-[3px] border border-border-soft rounded-[2px] text-[10px] tracking-widerx uppercase text-muted">
      {label}
    </span>
  );
}

function ConversionPill({ value }: { value: number }) {
  const color =
    value === 0
      ? "text-border-soft"
      : value < 0.05
      ? "text-warning"
      : "text-success";
  return (
    <span className={`tabular-nums text-[13px] ${color}`}>
      {value === 0 ? "—" : formatPercent(value, 1)}
    </span>
  );
}
