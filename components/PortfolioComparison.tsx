"use client";

import { motion } from "framer-motion";
import { formatUSD } from "@/lib/format";

type Portfolio = {
  code: string;
  name: string;
  pipeline: number;
  cash: number;
  target: number;
};

type Props = {
  portfolios: Portfolio[];
};

export default function PortfolioComparison({ portfolios }: Props) {
  const sorted = [...portfolios].sort((a, b) => b.pipeline - a.pipeline);
  const maxPipeline = Math.max(...sorted.map((p) => p.pipeline), 1);
  const maxCash = Math.max(...sorted.map((p) => p.cash), 1);

  return (
    <section className="mx-auto max-w-[1320px] px-8 lg:px-14 py-20 md:py-24">
      <div className="max-w-2xl mb-12">
        <div className="label-eyebrow">Pipeline vs Cash</div>
        <h3 className="serif-title text-[30px] md:text-[36px] mt-2 text-ink leading-[1.1]">
          From pipeline to cash
        </h3>
        <p className="text-[15px] text-muted mt-3 leading-relaxed">
          The gap between committed pipeline and cash actually received tells
          the conversion story for each portfolio.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-x-6 lg:gap-x-10">
        {/* Header row */}
        <div className="col-span-12 grid grid-cols-12 gap-x-6 lg:gap-x-10 pb-3 border-b border-border-soft">
          <div className="col-span-12 lg:col-span-3 label-eyebrow">
            Portfolio
          </div>
          <div className="hidden lg:block col-span-4 label-eyebrow">
            Pipeline
          </div>
          <div className="hidden lg:block col-span-4 label-eyebrow">
            Cash received
          </div>
          <div className="hidden lg:block col-span-1 label-eyebrow text-right">
            Conv.
          </div>
        </div>

        {sorted.map((p, i) => {
          const pipelineW = (p.pipeline / maxPipeline) * 100;
          const cashW = (p.cash / maxCash) * 100;
          const conversion = p.pipeline > 0 ? p.cash / p.pipeline : 0;
          return (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="col-span-12 grid grid-cols-12 gap-x-6 lg:gap-x-10 py-7 border-b border-border-hair items-center"
            >
              <div className="col-span-12 lg:col-span-3">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-muted tracking-wider">
                    {p.code}
                  </span>
                </div>
                <div className="text-[15px] text-ink mt-1 leading-snug">
                  {p.name}
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 mt-3 lg:mt-0">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="lg:hidden label-eyebrow">Pipeline</span>
                  <span className="font-mono tabular-nums text-[14px] text-ink lg:order-2">
                    {formatUSD(p.pipeline)}
                  </span>
                </div>
                <div className="relative h-[10px] bg-surface-soft rounded-[2px] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pipelineW}%` }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 1.0,
                      delay: 0.15 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-y-0 left-0 bg-undp"
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 mt-3 lg:mt-0">
                <div className="flex items-baseline justify-between mb-1.5">
                  <span className="lg:hidden label-eyebrow">Cash</span>
                  <span className="font-mono tabular-nums text-[14px] text-ink lg:order-2">
                    {p.cash > 0 ? formatUSD(p.cash) : "—"}
                  </span>
                </div>
                <div className="relative h-[10px] bg-surface-soft rounded-[2px] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${cashW}%` }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 1.0,
                      delay: 0.25 + i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ background: "#059669" }}
                    className="absolute inset-y-0 left-0"
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-1 mt-3 lg:mt-0 lg:text-right tabular-nums text-[13px] text-muted">
                {(conversion * 100).toFixed(1)}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
