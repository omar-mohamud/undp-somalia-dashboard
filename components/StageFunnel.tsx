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
};

const STAGE_FILLS: Record<string, string> = {
  A: "#006EB5",
  B: "#3F8FC9",
  C: "#7DB1DC",
  D: "#C7D9E8",
};

export default function StageFunnel({ stages }: Props) {
  // Sort by order ascending: A (1), B (2), C (3), D (4)
  const sorted = [...stages].sort((a, b) => a.order - b.order);
  const max = Math.max(...sorted.map((s) => s.value), 1);

  return (
    <div className="space-y-6">
      <div>
        <div className="label-eyebrow">Pipeline by stage</div>
        <h3 className="serif-title text-[26px] md:text-[28px] mt-2 text-ink">
          Where the pipeline sits today
        </h3>
        <p className="text-[14px] text-muted mt-2 max-w-md leading-relaxed">
          Most value concentrates in advanced and in-development stages —
          conversion to highly probable remains the bottleneck.
        </p>
      </div>

      <div className="space-y-4 pt-2">
        {sorted.map((s, i) => {
          const widthPct = s.value === 0 ? 4 : Math.max(8, (s.value / max) * 100);
          const fill = STAGE_FILLS[s.stage] || "#94A3B8";
          return (
            <motion.div
              key={s.stage}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <div className="flex items-baseline justify-between gap-4 mb-1.5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-muted">
                    {s.stage}
                  </span>
                  <span className="text-[14px] text-ink font-medium">
                    {s.label}
                  </span>
                  <span className="text-[12px] text-muted">
                    {s.count}{" "}
                    {s.count === 1 ? "opportunity" : "opportunities"}
                  </span>
                </div>
                <span className="font-mono tabular-nums text-[14px] text-ink">
                  {s.value === 0 ? "—" : formatUSD(s.value)}
                </span>
              </div>
              <div className="relative h-9 bg-surface-soft rounded-[2px] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${widthPct}%` }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 1.0,
                    delay: 0.15 + i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ background: fill }}
                  className="absolute inset-y-0 left-0"
                />
                {s.value === 0 && (
                  <div className="absolute inset-0 flex items-center pl-3 text-[11px] text-muted">
                    no value attached
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
