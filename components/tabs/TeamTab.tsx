"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatCount } from "@/lib/format";
import type { DashboardData } from "@/lib/types";

type Props = { data: DashboardData };

const ROLES = [
  { name: "Country Director", role: "Senior Strategic Lead", focus: "Overall partnership strategy & leadership" },
  { name: "Partnership Specialist", role: "Partnerships Lead", focus: "Resource mobilization, donor relations" },
  { name: "Resource Mobilization Officer", role: "RM Officer", focus: "Pipeline management, UNITY workflow" },
  { name: "Innovative Finance Lead", role: "Innovative Finance", focus: "Blended, climate, Islamic instruments" },
  { name: "Private Sector Engagement", role: "PS Officer", focus: "Corporate partnerships, due diligence" },
  { name: "Communications Specialist", role: "Comms Lead", focus: "Visibility, donor reporting, media" },
  { name: "Programme Analyst", role: "Programme Analyst", focus: "Portfolio analytics, delivery monitoring" },
  { name: "Partnership Associate", role: "Associate", focus: "Coordination, knowledge management" },
];

const FAQS = [
  {
    q: "How is this dashboard refreshed?",
    a: "The pipeline_and_programme workbook (v2 schema) is updated each month from the RM Pipeline Dashboard, the Cash Received ledger, the Programme Delivery Summary and the partnership KPI tracker. The dashboard reads directly from that file — no manual entry.",
  },
  {
    q: "What does Probability-Weighted mean?",
    a: "Each opportunity's pipeline value is multiplied by the success probability for its stage (A=90%, B=50%, C=30%, D=10%) — an expected-value view of resource mobilization across the portfolio.",
  },
  {
    q: "Which stages map to UNITY?",
    a: "Stages A through D align to the UNITY workflow: Highly Probable (A), Advanced (B), In Development (C), Early Stage (D).",
  },
  {
    q: "Where do Cash figures come from?",
    a: "Cash Received YTD is drawn directly from the Atlas/Quantum cash receipts ledger and reflects donor receipts cleared by the country office, not commitments.",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]!.toUpperCase())
    .join("");
}

export default function TeamTab({ data }: Props) {
  const activity = data.kpis["Team Activity"] || [];
  const dueDiligence = data.kpis["Due Diligence"] || [];
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="section-numeral">07 / Team</div>
        <h2 className="serif-title text-[34px] md:text-[42px] leading-[1.05] mt-2 text-ink">
          Partnership &amp; Communication Team
        </h2>
        <p className="mt-2 text-[14px] text-muted max-w-2xl">
          Who&rsquo;s on the team, how to reach them, and what they&rsquo;ve
          delivered this quarter &mdash; pulled from the partnership KPI
          tracker.
        </p>
      </motion.div>

      {/* Activity grid */}
      <div className="mt-6">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="label-eyebrow">Quarterly activity</div>
            <h3 className="serif-title text-[22px] mt-1 text-ink">
              Outputs delivered Q1 2026
            </h3>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-eyebrow text-muted">
            {activity.length} indicators tracked
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {activity.map((k, i) => (
            <motion.div
              key={k.indicator}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.025 }}
              className="bg-white border border-border rounded-[2px] p-4 tile-hover"
            >
              <div className="text-[26px] font-light tabular text-ink leading-none">
                {formatCount(k.value)}
              </div>
              <div className="mt-2 text-[11px] text-muted leading-snug">
                {k.indicator}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mandate + Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <div className="label-eyebrow">Mandate</div>
          <h3 className="serif-title text-[24px] mt-2 text-ink leading-snug">
            What the team does
          </h3>
          <div className="mt-4 space-y-4 text-[14px] text-ink leading-[1.7] max-w-[58ch]">
            <p>
              The Partnership &amp; Communication Team is the country
              office&rsquo;s front door for donors, vertical funds and
              private-sector partners. The team designs the resource mobilization
              strategy, manages the UNITY pipeline, and stewards relationships
              from first scoping conversation through signed agreement and donor
              reporting.
            </p>
            <p>
              Alongside core mobilization, the team leads communications and
              visibility &mdash; ensuring UNDP Somalia&rsquo;s contributions are
              clearly attributed, that donor brands are recognised, and that the
              office&rsquo;s narrative reflects the strategic direction set by
              the CPD and national priorities.
            </p>
            <p>
              On instruments, the team scouts and structures innovative finance:
              blended deals, climate finance, Islamic finance, diaspora
              instruments and risk-transfer mechanisms &mdash; in close
              coordination with portfolio managers and the regional service
              centre.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5"
        >
          <div className="label-eyebrow">Due diligence</div>
          <h3 className="serif-title text-[24px] mt-2 text-ink leading-snug">
            Risk-tiered partner screening
          </h3>
          <div className="mt-4 bg-white border border-border rounded-[2px] divide-y divide-border-hair">
            {dueDiligence.map((d) => (
              <div
                key={d.indicator}
                className="flex items-center justify-between px-5 py-3.5"
              >
                <span className="text-[13px] text-ink">{d.indicator}</span>
                <span className="text-[14px] font-mono tabular text-ink">
                  {formatCount(d.value)}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Team grid */}
      <div className="mt-12">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="label-eyebrow">Members</div>
            <h3 className="serif-title text-[22px] mt-1 text-ink">
              {ROLES.length} on the team
            </h3>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-eyebrow text-muted">
            Mogadishu Country Office
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ROLES.map((m, i) => (
            <motion.div
              key={m.name + i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i + 0.2 }}
              className="bg-white border border-border rounded-[2px] p-5 tile-hover"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-surface-2 border border-border flex items-center justify-center text-[12px] font-mono tabular text-ink">
                  {initials(m.name)}
                </div>
                <div className="min-w-0">
                  <div className="text-[13.5px] text-ink leading-tight truncate">
                    {m.name}
                  </div>
                  <div className="text-[11.5px] text-muted leading-tight truncate">
                    {m.role}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-[11.5px] text-muted leading-relaxed line-clamp-2">
                {m.focus}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <div className="label-eyebrow">Frequently asked</div>
        <h3 className="serif-title text-[22px] mt-1 text-ink">
          About this dashboard
        </h3>
        <div className="mt-4 bg-white border border-border rounded-[2px] divide-y divide-border-hair">
          {FAQS.map((f, i) => (
            <Faq key={i} q={f.q} a={f.a} initiallyOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({
  q,
  a,
  initiallyOpen = false,
}: {
  q: string;
  a: string;
  initiallyOpen?: boolean;
}) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <div className="px-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[14px] text-ink">{q}</span>
        <span className="text-[14px] text-muted font-mono tabular leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-[13px] text-muted leading-relaxed max-w-[68ch]">
          {a}
        </p>
      </motion.div>
    </div>
  );
}
