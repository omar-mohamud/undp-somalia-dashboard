"use client";

import { motion } from "framer-motion";
import { formatUSD } from "@/lib/format";

type Props = { data: any };

const STAGE_ACCENTS: string[] = [
  "#C7D9E8", // Scouting
  "#7DB1DC", // Co-design
  "#3F8FC9", // Drafting
  "#0468A0", // Submission
  "#006EB5", // Approved
];

export default function PipelineStagesTab({ data }: Props) {
  const stages = data.pipelineStages;
  const totalCount = stages.reduce((acc: number, s: any) => acc + s.count, 0);
  const totalValue = stages.reduce((acc: number, s: any) => acc + s.value, 0);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-baseline justify-between gap-6"
      >
        <div>
          <div className="section-numeral">08 / Pipeline Stages</div>
          <h2 className="serif-title text-[34px] md:text-[40px] leading-[1.05] mt-2 text-ink">
            Phases of the partnership pipeline
          </h2>
          <p className="mt-2 text-[14px] text-muted max-w-2xl">
            From early scouting through approval &mdash; the value, count and
            shape of work at each stage.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
          <div className="label-eyebrow">Total in motion</div>
          <div className="text-[44px] font-light leading-none tabular text-ink">
            {formatUSD(totalValue)}
          </div>
          <div className="text-[11px] text-muted">
            {totalCount} opportunities across {stages.length} stages
          </div>
        </div>
      </motion.div>

      {/* Stage flow */}
      <div className="grid grid-cols-1 lg:grid-cols-[repeat(5,minmax(0,1fr))] gap-3 lg:gap-2 items-stretch">
        {stages.map((s: any, i: number) => (
          <div key={s.id} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-white border border-border rounded-[2px] p-5 lg:p-6 h-full flex flex-col"
            >
              {/* Top stripe */}
              <div
                className="h-1 w-12 rounded-full"
                style={{ background: STAGE_ACCENTS[i] }}
              />
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-mono text-[10px] tracking-eyebrow text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[10px] tracking-eyebrow text-muted-2">
                  {s.stageMap}
                </span>
              </div>
              <h3 className="serif-title text-[20px] mt-1.5 text-ink leading-snug">
                {s.label}
              </h3>
              <div className="mt-5 flex items-baseline gap-2 tabular">
                <span
                  className="text-[36px] font-light leading-none"
                  style={{ color: STAGE_ACCENTS[i] === "#C7D9E8" ? "#475569" : STAGE_ACCENTS[i] }}
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

              <div className="mt-5 pt-4 border-t border-border-hair flex-1">
                <div className="label-eyebrow !text-[10px]">Examples</div>
                <ul className="mt-2 space-y-1.5">
                  {s.examples.map((ex: string, j: number) => (
                    <li
                      key={j}
                      className="text-[12px] text-ink leading-snug flex gap-2"
                    >
                      <span className="text-muted-2 font-mono mt-[1px]">·</span>
                      <span className="truncate">{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Arrow between cards (desktop) */}
            {i < stages.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                aria-hidden="true"
                className="hidden lg:flex absolute top-8 -right-[14px] z-10 items-center justify-center"
              >
                <div className="h-px w-3 bg-border" />
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="-ml-[2px]"
                  aria-hidden="true"
                >
                  <path
                    d="M2 1l4 4-4 4"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Footer summary */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-border-hair bg-white border border-border rounded-[2px]"
      >
        <SummaryCol
          label="Combined opportunities"
          value={String(totalCount)}
        />
        <SummaryCol label="Combined value" value={formatUSD(totalValue)} />
        <SummaryCol
          label="Highest-value stage"
          value="Drafting"
        />
        <SummaryCol
          label="Conversion focus"
          value="Submission → Approval"
        />
      </motion.div>
    </section>
  );
}

function SummaryCol({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-7 py-5">
      <div className="label-eyebrow !text-[10px]">{label}</div>
      <div className="mt-2 text-[22px] font-light tabular text-ink leading-none">
        {value}
      </div>
    </div>
  );
}
