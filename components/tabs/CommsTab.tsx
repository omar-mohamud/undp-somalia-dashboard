"use client";

import { motion } from "framer-motion";

type Props = { data: any };

export default function CommsTab({ data }: Props) {
  const tiles = [
    { id: "campaigns", label: "Active Campaigns", value: "—" },
    { id: "media", label: "Media Products", value: "—" },
    { id: "events", label: "Events", value: "—" },
  ];
  return (
    <section className="min-h-[60vh] flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="section-numeral">07 / Communications &amp; Visibility</div>
        <h2 className="serif-title text-[34px] md:text-[40px] leading-[1.05] mt-2 text-ink">
          Communications &amp; visibility
        </h2>
      </motion.div>

      {/* Centered placeholder card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15 }}
        className="bg-white border border-border rounded-[2px] px-10 py-14 lg:py-20 text-center max-w-3xl mx-auto w-full"
      >
        <div className="label-eyebrow text-undp">In development</div>
        <h3 className="serif-title text-[28px] md:text-[32px] mt-4 leading-[1.15] text-ink">
          This section is being developed by the UNDP Somalia Communications
          Team.
        </h3>
        <p className="mt-4 text-[14px] text-muted leading-relaxed max-w-[52ch] mx-auto">
          Active campaigns, donor visibility outputs, media products and events
          will appear here once the editorial calendar is published.
        </p>
        <div className="mt-8 inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-eyebrow text-muted">
          <span className="h-px w-10 bg-border" />
          <span>Expected Q2 2026</span>
          <span className="h-px w-10 bg-border" />
        </div>
      </motion.div>

      {/* Three placeholder tiles */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
        {tiles.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 + i * 0.06 }}
            className="bg-white border border-border rounded-[2px] p-7 tile-hover"
          >
            <div className="flex items-baseline justify-between">
              <div className="label-eyebrow">{t.label}</div>
              <span className="font-mono text-[10px] tracking-eyebrow text-muted-2">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-5 text-[44px] font-light tabular leading-none text-muted-2">
              {t.value}
            </div>
            <div className="mt-4 text-[12px] text-muted leading-relaxed">
              Awaiting team input.
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
