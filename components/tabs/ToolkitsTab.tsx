"use client";

import { motion } from "framer-motion";

type Props = { data: any };

const ICONS: Record<string, JSX.Element> = {
  sops: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 8h6M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  ),
  briefs: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 7h14v12H5z" />
      <path d="M9 3v4M15 3v4" strokeLinecap="round" />
      <path d="M5 11h14" />
    </svg>
  ),
  concepts: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 4h12l4 4v12H4z" />
      <path d="M16 4v4h4" />
      <path d="M8 12h8M8 16h6" strokeLinecap="round" />
    </svg>
  ),
  proposals: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 13l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  agreements: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M14 3v5h5" />
      <path d="M9 14l2 2 4-4M9 18h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  dueDiligence: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="11" cy="11" r="6" />
      <path d="M16 16l5 5" strokeLinecap="round" />
    </svg>
  ),
  visibility: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="4" y="5" width="16" height="16" rx="1" />
      <path d="M8 3v4M16 3v4M4 11h16" strokeLinecap="round" />
    </svg>
  ),
  unity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v8l5 3" strokeLinecap="round" />
    </svg>
  ),
  innovation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M9 18h6M10 21h4" strokeLinecap="round" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.9.7 1.5 1.6 1.5 2.6V17h4v-.5c0-1 .6-1.9 1.5-2.6A6 6 0 0 0 12 3z" />
    </svg>
  ),
  privateSector: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 21h18M5 21V9l7-5 7 5v12" />
      <path d="M9 21v-6h6v6" />
    </svg>
  ),
  pooled: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="9" cy="9" r="4" />
      <circle cx="15" cy="15" r="4" />
    </svg>
  ),
  policy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 5l8-2 8 2v9c0 4-3.5 6.5-8 8-4.5-1.5-8-4-8-8V5z" />
    </svg>
  ),
};

export default function ToolkitsTab({ data }: Props) {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-baseline justify-between gap-6"
      >
        <div>
          <div className="section-numeral">05 / Toolkits</div>
          <h2 className="serif-title text-[34px] md:text-[40px] leading-[1.05] mt-2 text-ink">
            Partnership knowledge hub
          </h2>
          <p className="mt-2 text-[14px] text-muted max-w-2xl">
            Curated guidance, templates and references for the partnership and
            communication workflow.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
          <div className="label-eyebrow">Resources curated</div>
          <div className="text-[44px] font-light leading-none tabular text-ink">
            {data.toolkits.length}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {data.toolkits.map((t: any, i: number) => (
          <motion.a
            key={t.id}
            href="#"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: i * 0.035,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group block bg-white border border-border rounded-[2px] p-5 tile-hover relative"
          >
            <div className="flex items-start justify-between">
              <div className="h-9 w-9 rounded-[2px] flex items-center justify-center bg-surface-2 text-undp">
                <span className="block h-5 w-5">
                  {ICONS[t.id] || ICONS.sops}
                </span>
              </div>
              <span className="font-mono text-[10px] tracking-eyebrow text-muted-2">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-4 serif-title text-[16px] leading-snug text-ink">
              {t.title}
            </h3>
            <p className="mt-1.5 text-[12.5px] text-muted leading-relaxed min-h-[36px]">
              {t.description}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="h-px flex-1 bg-border-hair group-hover:bg-border transition-colors" />
              <span className="ml-3 text-[10px] font-mono uppercase tracking-eyebrow text-muted group-hover:text-undp transition-colors">
                Open →
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
