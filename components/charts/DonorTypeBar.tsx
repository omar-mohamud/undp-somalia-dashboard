"use client";

import { motion } from "framer-motion";

type Item = {
  type: string;
  label: string;
  count: number;
  color?: string;
};

type Props = {
  items: Item[];
  title?: string;
};

const PALETTE = [
  "#0A1628",
  "#006EB5",
  "#3F8FC9",
  "#7DB1DC",
  "#B8CFE2",
  "#475569",
  "#94A3B8",
];

export default function DonorTypeBar({ items, title }: Props) {
  const total = items.reduce((acc, i) => acc + i.count, 0) || 1;
  const sorted = [...items].sort((a, b) => b.count - a.count);

  return (
    <div>
      {title && (
        <h3 className="serif-title text-[20px] text-ink leading-tight">
          {title}
        </h3>
      )}
      <div className="mt-4 flex h-3 w-full overflow-hidden rounded-[2px] bg-surface-2">
        {sorted.map((s, i) => {
          const pct = (s.count / total) * 100;
          const color = s.color || PALETTE[i % PALETTE.length];
          return (
            <motion.div
              key={s.type}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{
                duration: 0.9,
                delay: 0.05 * i + 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ background: color }}
              title={`${s.label} — ${s.count}`}
            />
          );
        })}
      </div>
      <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
        {sorted.map((s, i) => {
          const color = s.color || PALETTE[i % PALETTE.length];
          return (
            <li
              key={s.type}
              className="flex items-baseline justify-between gap-3 text-[12.5px]"
            >
              <span className="flex items-center gap-2 min-w-0">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: color }}
                />
                <span className="text-ink truncate">{s.label}</span>
              </span>
              <span className="font-mono tabular text-muted">{s.count}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
