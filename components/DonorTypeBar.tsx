"use client";

import { motion } from "framer-motion";
import { formatUSD, formatPercent } from "@/lib/format";

type Item = {
  type: string;
  label: string;
  value: number;
};

type Props = {
  items: Item[];
};

const PALETTE = [
  "#0A1628",
  "#006EB5",
  "#3F8FC9",
  "#7DB1DC",
  "#B8CFE2",
  "#DDE7EF",
];

export default function DonorTypeBar({ items }: Props) {
  const total = items.reduce((acc, i) => acc + i.value, 0);
  const sorted = [...items].sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <div>
        <div className="label-eyebrow">Donor type composition</div>
        <h3 className="serif-title text-[26px] md:text-[28px] mt-2 text-ink">
          Composition of partners
        </h3>
        <p className="text-[14px] text-muted mt-2 leading-relaxed">
          Vertical funds and DAC bilaterals together account for the majority of
          active value.
        </p>
      </div>

      <div className="pt-2">
        <div className="flex h-5 w-full overflow-hidden rounded-[2px]">
          {sorted.map((s, i) => {
            const pct = (s.value / total) * 100;
            return (
              <motion.div
                key={s.type}
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 1.0,
                  delay: 0.05 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ background: PALETTE[i % PALETTE.length] }}
                title={`${s.label} — ${formatPercent(s.value / total)}`}
              />
            );
          })}
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-x-8 gap-y-3 mt-4 sm:grid-cols-2">
        {sorted.map((s, i) => {
          const pct = s.value / total;
          return (
            <li
              key={s.type}
              className="flex items-baseline justify-between gap-4 py-2 border-b border-border-hair"
            >
              <div className="flex items-baseline gap-3 min-w-0">
                <span
                  className="inline-block h-2 w-2 rounded-[1px] shrink-0 translate-y-[-1px]"
                  style={{ background: PALETTE[i % PALETTE.length] }}
                />
                <span className="text-[13px] text-ink truncate">{s.label}</span>
              </div>
              <div className="flex items-baseline gap-3 shrink-0 tabular-nums">
                <span className="text-[13px] text-ink">{formatUSD(s.value)}</span>
                <span className="text-[12px] text-muted w-10 text-right">
                  {formatPercent(pct, 0)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
