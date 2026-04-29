"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import KpiTile from "../primitives/KpiTile";
import DonorTypeBar from "../charts/DonorTypeBar";
import StageFunnel from "../charts/StageFunnel";
import { formatCount, formatUSD, formatPercent } from "@/lib/format";
import {
  DashboardData,
  DONOR_TYPE_LABEL,
  DONOR_TYPE_COLOR,
} from "@/lib/types";

type Props = { data: DashboardData; onNavigate: (id: string) => void };

export default function SnapshotTab({ data, onNavigate }: Props) {
  const t = data.totals;

  const tiles = useMemo(() => {
    const verticalCount = data.donors.filter(
      (d) => d.type === "Vertical_Fund"
    ).length;
    const gccCount = data.donors.filter((d) => d.type === "GCC").length;
    const privateCount = data.donors.filter(
      (d) => d.type === "PrivateSector"
    ).length;
    const stageA = data.pipelineByStage.find((s) => s.stage === "A");
    const stageB = data.pipelineByStage.find((s) => s.stage === "B");
    const stageD = data.pipelineByStage.find((s) => s.stage === "D");
    const conversion =
      t.deliveryAnnualTarget > 0
        ? t.deliveryTotalExpenditure / t.deliveryAnnualTarget
        : 0;
    return [
      {
        label: "Total Pipeline",
        value: formatUSD(t.pipelineTotal),
        hint: `${formatCount(t.opportunityCount)} opportunities · ${formatCount(t.donorCountWithOpps)} donors`,
        rag: "green" as const,
        trend: "up" as const,
      },
      {
        label: "Donor Landscape",
        value: formatCount(t.donorCountTotal),
        hint: `${formatCount(data.donorTypeCounts.length)} partner types`,
        rag: "green" as const,
        trend: "up" as const,
      },
      {
        label: "Vertical Funds",
        value: formatCount(verticalCount),
        hint: `${formatUSD(data.pipelineByDonorType.find((d) => d.type === "Vertical_Fund")?.value || 0)} pipeline`,
        rag: "green" as const,
        trend: "up" as const,
      },
      {
        label: "GCC Engagements",
        value: formatCount(gccCount),
        hint: "Saudi · Qatar · OFID · KSrelief",
        rag: "green" as const,
        trend: "up" as const,
      },
      {
        label: "Private Sector",
        value: formatCount(privateCount),
        hint: "Premier Bank, Qatar Airways, +3",
        rag: "amber" as const,
        trend: "flat" as const,
      },
      {
        label: "2026 Adjusted",
        value: formatUSD(t.target2026Adj),
        hint: "Probability-weighted resource mobilization",
        rag: "amber" as const,
        trend: "up" as const,
      },
      {
        label: "Cash Received YTD",
        value: formatUSD(t.cashReceived2025 + t.cashReceived2026),
        hint: `${formatUSD(t.cashReceived2026)} in 2026 · ${formatUSD(t.cashReceived2025)} in 2025`,
        rag: "green" as const,
        trend: "up" as const,
      },
      {
        label: "Delivery vs Target",
        value: formatPercent(conversion, 1),
        hint: `${formatUSD(t.deliveryTotalExpenditure)} of ${formatUSD(t.deliveryAnnualTarget)} target`,
        rag: conversion < 0.15 ? ("amber" as const) : ("green" as const),
        trend: "up" as const,
      },
    ];
  }, [data, t]);

  const donorTypeBarItems = data.donorTypeCounts.map((d) => ({
    type: d.type,
    label: DONOR_TYPE_LABEL[d.type] || d.type,
    count: d.count,
    color: DONOR_TYPE_COLOR[d.type],
  }));

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8 flex items-baseline justify-between gap-6"
      >
        <div>
          <div className="section-numeral">01 / Snapshot</div>
          <h2 className="serif-title text-[34px] md:text-[42px] leading-[1.05] mt-2 text-ink">
            State of partnerships
          </h2>
          <p className="mt-2 text-[14px] text-muted max-w-2xl">
            A live read on the donor landscape, the pipeline, and the workflows
            that move opportunities to cash &mdash; sourced directly from the
            country office partnership data package.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
          <div className="label-eyebrow">Total Pipeline</div>
          <div className="text-[48px] font-light leading-none tabular text-ink">
            {formatUSD(t.pipelineTotal)}
          </div>
          <div className="text-[11px] text-muted">
            {formatCount(t.opportunityCount)} opportunities ·{" "}
            {formatCount(t.donorCountWithOpps)} donors
          </div>
        </div>
      </motion.div>

      {/* 4×2 KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {tiles.map((k, i) => (
          <KpiTile
            key={k.label}
            label={k.label}
            value={k.value}
            hint={k.hint}
            rag={k.rag}
            trend={k.trend}
            delay={i * 0.04}
          />
        ))}
      </div>

      {/* Charts row */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10">
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
            <button
              onClick={() => onNavigate("donors")}
              className="text-[11px] font-mono uppercase tracking-eyebrow text-muted hover:text-ink transition-colors"
            >
              Open register →
            </button>
          </div>
          <div className="mt-4">
            <DonorTypeBar items={donorTypeBarItems} />
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
            <button
              onClick={() => onNavigate("stages")}
              className="text-[11px] font-mono uppercase tracking-eyebrow text-muted hover:text-ink transition-colors"
            >
              Stage detail →
            </button>
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

      {/* Portfolio strip */}
      <div className="mt-14">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="label-eyebrow">Portfolio delivery</div>
            <h3 className="serif-title text-[22px] mt-1 text-ink">
              Annual target vs Q1 expenditure
            </h3>
          </div>
          <button
            onClick={() => onNavigate("rm")}
            className="text-[11px] font-mono uppercase tracking-eyebrow text-muted hover:text-ink transition-colors"
          >
            Open RM →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {data.deliveryByPortfolio
            .filter((d) => d.annualTarget > 0)
            .map((d, i) => {
              const pct =
                d.annualTarget > 0
                  ? d.totalExpenditure / d.annualTarget
                  : 0;
              return (
                <motion.div
                  key={d.portfolioId}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.55 + i * 0.05 }}
                  className="bg-white border border-border rounded-[2px] p-5"
                >
                  <div className="flex items-baseline justify-between">
                    <div className="text-[11px] font-mono uppercase tracking-eyebrow text-undp">
                      {d.portfolio}
                    </div>
                    <div className="text-[10px] font-mono tabular text-muted">
                      {formatPercent(pct, 1)}
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2 tabular">
                    <span className="text-[24px] font-light text-ink leading-none">
                      {formatUSD(d.totalExpenditure)}
                    </span>
                    <span className="text-[11px] text-muted">
                      / {formatUSD(d.annualTarget)}
                    </span>
                  </div>
                  <div className="mt-4 h-1.5 bg-surface-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, pct * 100)}%` }}
                      transition={{
                        duration: 0.9,
                        delay: 0.7 + i * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full bg-undp"
                    />
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
