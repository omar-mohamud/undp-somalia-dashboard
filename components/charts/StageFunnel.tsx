"use client";

import { motion } from "framer-motion";
import { formatUSD } from "@/lib/format";

type Stage = {
  stage: string;
  label: string;
  value: number;
  count: number;
  order: number;
};

type Props = {
  stages: Stage[];
  metric?: "value" | "count";
  title?: string;
  compact?: boolean;
};

const FILLS: Record<string, string> = {
  A: "#006EB5",
  B: "#3F8FC9",
  C: "#7DB1DC",
  D: "#C7D9E8",
};

export default function StageFunnel({
  stages,
  metric = "value",
  title,
  compact = false,
}: Props) {
  const sorted = [...stages].sort((a, b) => a.order - b.order);
  const max =
    Math.max(...sorted.map((s) => (metric === "value" ? s.value : s.count))) ||
    1;

  return (
    <div>
      {title && (
        <h3 className="serif-title text-[20px] text-ink leading-tight">
          {title}
        </h3>
      )}
      <div className={`${title ? "mt-4" : ""} ${compact ? "space-y-2.5" : "space-y-4"}`}>
        {sorted.map((s, i) => {
          const v = metric === "value" ? s.value : s.count;
          const widthPct = v === 0 ? 4 : Math.max(8, (v / max) * 100);
          const fill = FILLS[s.stage] || "#94A3B8";
          return (
            <motion.div
              key={s.stage}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08 + 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <div className="flex items-baseline gap-2.5 min-w-0">
                  <span className="font-mono text-[10px] text-muted tracking-wider">
                    {s.stage}
                  </span>
                  <span className="text-[13px] text-ink font-medium truncate">
                    {s.label}
                  </span>
                  <span className="text-[11px] text-muted shrink-0">
                    {s.count}{" "}
                    {s.count === 1 ? "opp." : "opps."}
                  </span>
                </div>
                <span className="font-mono tabular text-[12.5px] text-ink">
                  {metric === "value"
                    ? s.value === 0
                      ? "—"
                      : formatUSD(s.value)
                    : s.count}
                </span>
              </div>
              <div
                className={`relative ${compact ? "h-2" : "h-7"} bg-surface-2 rounded-[2px] overflow-hidden`}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${widthPct}%` }}
                  transition={{
                    duration: 0.9,
                    delay: 0.18 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ background: fill }}
                  className="absolute inset-y-0 left-0"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
