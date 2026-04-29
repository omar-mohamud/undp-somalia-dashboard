"use client";

import { motion } from "framer-motion";
import { formatUSD, formatPercent, formatCount } from "@/lib/format";

type Kpi = {
  label: string;
  value: string;
  hint?: string;
};

type Props = {
  kpis: {
    adjustedPipeline2026: number;
    cashReceived2026: number;
    pctDeliveryTarget: number;
    pctDeliveryBudget: number;
    opportunityCount: number;
    donorCount: number;
  };
};

export default function KpiRow({ kpis }: Props) {
  const items: Kpi[] = [
    {
      label: "Probability-Weighted 2026",
      value: formatUSD(kpis.adjustedPipeline2026),
      hint: "expected resource mobilisation",
    },
    {
      label: "Cash Received YTD",
      value: formatUSD(kpis.cashReceived2026),
      hint: "Jan – Mar 2026",
    },
    {
      label: "Delivery vs Annual Target",
      value: formatPercent(kpis.pctDeliveryTarget),
      hint: "of $54.2M target",
    },
    {
      label: "Delivery vs Active Budget",
      value: formatPercent(kpis.pctDeliveryBudget),
      hint: "of $33.1M budget",
    },
    {
      label: "Active Opportunities",
      value: formatCount(kpis.opportunityCount),
      hint: "in pipeline",
    },
    {
      label: "Donors Engaged",
      value: formatCount(kpis.donorCount),
      hint: "active relationships",
    },
  ];

  return (
    <section className="mx-auto max-w-[1320px] px-8 lg:px-14 py-20 md:py-24">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {items.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={[
              "relative px-5 lg:px-7 py-5",
              i !== 0 ? "lg:border-l lg:border-border-soft" : "",
              // mobile dividers
              i % 2 === 1 ? "border-l border-border-soft md:border-l-0 lg:border-l" : "",
              i >= 2 ? "border-t border-border-soft md:border-t-0" : "",
              "md:[&:nth-child(3n+1)]:border-l-0 lg:[&:nth-child(3n+1)]:border-l",
              "md:[&:nth-child(n+4)]:border-t md:[&:nth-child(n+4)]:border-border-soft",
              "lg:[&:nth-child(n+4)]:border-t-0",
            ].join(" ")}
          >
            <div className="label-eyebrow">{kpi.label}</div>
            <div className="mt-3 text-kpi font-light text-ink tabular-nums">
              {kpi.value}
            </div>
            {kpi.hint && (
              <div className="mt-2 text-[12px] text-muted leading-snug">
                {kpi.hint}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
