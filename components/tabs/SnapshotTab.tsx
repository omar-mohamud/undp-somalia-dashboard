"use client";

import { motion } from "framer-motion";
import KpiTile from "../primitives/KpiTile";
import SectionLabel from "../primitives/SectionLabel";
import DonorTypeBar from "../charts/DonorTypeBar";
import StageFunnel from "../charts/StageFunnel";
import { formatCount, formatPercent } from "@/lib/format";

type Props = { data: any };

export default function SnapshotTab({ data }: Props) {
  const s = data.snapshot;
  const order: Array<keyof typeof s> = [
    "donorsLandscape",
    "gccEngagements",
    "privateSector",
    "innovativeFinance",
    "proposalsSubmitted",
    "proposalsStalled",
    "unityCompliance",
    "upcomingPriorities",
  ];

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 flex items-baseline justify-between gap-6"
      >
        <div>
          <div className="section-numeral">01 / Snapshot</div>
          <h2 className="serif-title text-[34px] md:text-[40px] leading-[1.05] mt-2 text-ink">
            State of partnerships
          </h2>
          <p className="mt-2 text-[14px] text-muted max-w-2xl">
            A quarterly read on the donor landscape, the pipeline, and the
            workflows that move opportunities to cash.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
          <div className="label-eyebrow">Total Pipeline</div>
          <div className="text-[44px] font-light leading-none tabular text-ink">
            $110.8M
          </div>
          <div className="text-[11px] text-muted">
            {formatCount(data.pipeline.opportunityCount)} opportunities ·{" "}
            {formatCount(data.pipeline.donorCount)} donors
          </div>
        </div>
      </motion.div>

      {/* 4×2 KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {order.map((k, i) => {
          const item = s[k];
          const value =
            item.unit === "%" ? `${item.value}` : formatCount(item.value);
          return (
            <KpiTile
              key={k as string}
              label={item.label}
              value={value}
              unit={item.unit === "%" ? "%" : undefined}
              hint={item.hint}
              rag={item.rag}
              trend={item.trend}
              delay={i * 0.05}
            />
          );
        })}
      </div>

      {/* Charts row */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="lg:col-span-7"
        >
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="label-eyebrow">Donor landscape</div>
              <h3 className="serif-title text-[22px] mt-1 text-ink">
                Composition by partner type
              </h3>
            </div>
            <div className="text-[11px] font-mono tabular text-muted">
              {data.donorTypeCounts.reduce(
                (acc: number, d: any) => acc + d.count,
                0
              )}{" "}
              total
            </div>
          </div>
          <div className="mt-4">
            <DonorTypeBar items={data.donorTypeCounts} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.5 }}
          className="lg:col-span-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <div className="label-eyebrow">Pipeline status</div>
              <h3 className="serif-title text-[22px] mt-1 text-ink">
                Opportunities by stage
              </h3>
            </div>
            <div className="text-[11px] font-mono tabular text-muted">
              by count
            </div>
          </div>
          <div className="mt-4">
            <StageFunnel
              stages={data.pipelineByStage}
              metric="count"
              compact={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
