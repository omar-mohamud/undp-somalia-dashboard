"use client";

import { motion } from "framer-motion";
import RagDot from "./RagDot";
import TrendArrow from "./TrendArrow";

type Props = {
  label: string;
  value: string;
  unit?: string;
  hint?: string;
  rag?: "green" | "amber" | "red";
  trend?: "up" | "down" | "flat";
  delay?: number;
  detailHref?: string;
};

export default function KpiTile({
  label,
  value,
  unit,
  hint,
  rag,
  trend,
  delay = 0,
  detailHref = "#",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative px-6 py-6 lg:py-7 tile-hover bg-white border border-border rounded-[2px]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="label-eyebrow leading-snug">{label}</div>
        <div className="flex items-center gap-2">
          {rag && <RagDot rag={rag} size={7} />}
          {trend && <TrendArrow trend={trend} />}
        </div>
      </div>
      <div className="mt-5 flex items-baseline gap-1.5 tabular">
        <span className="text-[44px] lg:text-[52px] font-light leading-none text-ink">
          {value}
        </span>
        {unit && (
          <span className="text-[20px] text-muted leading-none">{unit}</span>
        )}
      </div>
      {hint && (
        <div className="mt-3 text-[12px] text-muted leading-snug">{hint}</div>
      )}
      <div className="mt-5 flex items-center justify-between">
        <div className="h-px flex-1 bg-border-hair" />
        <a
          href={detailHref}
          className="ml-3 text-[11px] font-mono uppercase tracking-eyebrow text-muted hover:text-ink transition-colors"
        >
          View details →
        </a>
      </div>
    </motion.div>
  );
}
