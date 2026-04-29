"use client";

import { motion } from "framer-motion";
import { formatUSD } from "@/lib/format";

type Props = {
  totalPipeline: number;
  donorCount: number;
  portfolioCount: number;
};

export default function HeroStat({
  totalPipeline,
  donorCount,
  portfolioCount,
}: Props) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1320px] px-8 lg:px-14 py-24 md:py-28 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="label-eyebrow text-undp">Active Pipeline</div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="serif-title text-hero text-ink mt-5"
        >
          {formatUSD(totalPipeline)}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-[42rem] text-[18px] md:text-[20px] leading-[1.55] text-muted font-light"
        >
          Active partnership pipeline across{" "}
          <span className="text-ink font-normal">{donorCount}&nbsp;donors</span>{" "}
          and{" "}
          <span className="text-ink font-normal">
            {portfolioCount}&nbsp;portfolios
          </span>
          , spanning resilience, governance and inclusive economic recovery in
          Somalia.
        </motion.p>
      </div>

      {/* Soft decorative rule */}
      <div className="mx-auto max-w-[1320px] px-8 lg:px-14">
        <div className="hairline" />
      </div>
    </section>
  );
}
