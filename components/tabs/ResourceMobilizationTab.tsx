"use client";

import { motion } from "framer-motion";
import StatusPill from "../primitives/StatusPill";
import { formatUSD, formatPercent, formatCount, formatDateShort } from "@/lib/format";

type Props = { data: any };

const STAGE_TONES: Record<
  string,
  { tone: "accent" | "default" | "muted" | "warning" }
> = {
  A: { tone: "accent" },
  B: { tone: "default" },
  C: { tone: "muted" },
  D: { tone: "muted" },
};

const STAGE_LABEL: Record<string, string> = {
  A: "Highly Probable",
  B: "Advanced",
  C: "In Development",
  D: "Early Stage",
};

export default function ResourceMobilizationTab({ data }: Props) {
  const sortedOpps = [...data.opportunities].sort(
    (a: any, b: any) => b.adjusted2026 - a.adjusted2026
  );
  const visible = sortedOpps;

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="section-numeral">03 / Resource Mobilization</div>
        <h2 className="serif-title text-[34px] md:text-[40px] leading-[1.05] mt-2 text-ink">
          Pipeline &amp; cash conversion
        </h2>
        <p className="mt-2 text-[14px] text-muted max-w-2xl">
          Live resource mobilization workflow, aligned to the UNITY pipeline
          and project formulation gates.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">
        {/* LEFT 60% */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="bg-white border border-border rounded-[2px] p-7"
          >
            <div className="label-eyebrow">Pipeline value</div>
            <div className="mt-3 flex items-baseline gap-3 tabular">
              <span className="text-[64px] lg:text-[72px] font-light leading-none text-ink">
                {formatUSD(data.pipeline.totalValue)}
              </span>
              <span className="text-[12px] text-muted ml-1">
                across {formatCount(data.pipeline.opportunityCount)} opportunities
              </span>
            </div>

            <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 divide-x divide-border-hair">
              <SubMetric
                label="Opportunities"
                value={formatCount(data.pipeline.opportunityCount)}
              />
              <SubMetric
                label="2026 Adjusted"
                value={formatUSD(data.pipeline.adjusted2026)}
              />
              <SubMetric
                label="2027 Adjusted"
                value={formatUSD(data.pipeline.adjusted2027)}
              />
              <SubMetric
                label="Cash YTD"
                value={formatUSD(data.pipeline.cashReceived2026)}
              />
            </div>
          </motion.div>

          {/* Opportunities table */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="mt-6 bg-white border border-border rounded-[2px]"
          >
            <div className="px-5 py-3.5 flex items-baseline justify-between border-b border-border">
              <h3 className="serif-title text-[18px] text-ink">
                Live opportunities
              </h3>
              <div className="text-[11px] font-mono uppercase tracking-eyebrow text-muted">
                Sorted by 2026 adjusted · top 12 visible
              </div>
            </div>
            <div className="grid grid-cols-12 gap-x-3 px-5 py-2.5 border-b border-border label-eyebrow">
              <div className="col-span-4">Programme</div>
              <div className="col-span-2">Donor</div>
              <div className="col-span-1">P/F</div>
              <div className="col-span-1">Stage</div>
              <div className="col-span-1 text-right">Pipeline</div>
              <div className="col-span-1 text-right">2026 Adj.</div>
              <div className="col-span-1 text-right">P (succ.)</div>
              <div className="col-span-1 text-right">Deadline</div>
            </div>
            <div className="max-h-[420px] overflow-auto scroll-thin">
              {visible.map((o: any, i: number) => (
                <motion.div
                  key={o.programme + i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: Math.min(i, 12) * 0.02 }}
                  className="grid grid-cols-12 gap-x-3 px-5 py-3 border-b border-border-hair items-center hover:bg-surface-2 transition-colors"
                >
                  <div className="col-span-4 text-[13px] text-ink truncate">
                    {o.programme}
                  </div>
                  <div className="col-span-2 text-[12.5px] text-muted truncate">
                    {o.donor}
                  </div>
                  <div className="col-span-1">
                    <span className="text-[11px] font-mono tabular text-muted tracking-wider">
                      {o.portfolio}
                    </span>
                  </div>
                  <div className="col-span-1">
                    <StatusPill tone={STAGE_TONES[o.stage]?.tone || "muted"}>
                      {o.stage}
                    </StatusPill>
                  </div>
                  <div className="col-span-1 text-right text-[12.5px] font-mono tabular text-ink">
                    {formatUSD(o.pipeline)}
                  </div>
                  <div className="col-span-1 text-right text-[12.5px] font-mono tabular text-ink">
                    {formatUSD(o.adjusted2026)}
                  </div>
                  <div className="col-span-1 text-right text-[12.5px] font-mono tabular text-muted">
                    {formatPercent(o.probability, 0)}
                  </div>
                  <div className="col-span-1 text-right text-[11.5px] font-mono tabular text-muted">
                    {formatDateShort(o.deadline)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT 40% — two stacked cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="bg-white border border-border rounded-[2px] p-7"
          >
            <div className="flex items-baseline justify-between">
              <div>
                <div className="label-eyebrow">Workflow</div>
                <h3 className="serif-title text-[20px] mt-1 text-ink">
                  Agreements review
                </h3>
              </div>
              <StatusPill tone="success">On track</StatusPill>
            </div>
            <ul className="mt-5 divide-y divide-border-hair">
              <ListRow label="Reviewed" value={data.agreementsReview.reviewed} pill="default" />
              <ListRow label="Signed" value={data.agreementsReview.signed} pill="success" />
              <ListRow
                label="Pending clearance"
                value={data.agreementsReview.pendingClearance}
                pill="warning"
              />
              <ListRow
                label="Compliance checks"
                value={data.agreementsReview.complianceChecks}
                pill="success"
                isText
              />
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="bg-white border border-border rounded-[2px] p-7"
          >
            <div className="flex items-baseline justify-between">
              <div>
                <div className="label-eyebrow">Workflow</div>
                <h3 className="serif-title text-[20px] mt-1 text-ink">
                  Fund applications
                </h3>
              </div>
              <StatusPill tone="accent">Active</StatusPill>
            </div>
            <ul className="mt-5 divide-y divide-border-hair">
              <ListRow label="Submitted" value={data.fundApplications.submitted} pill="default" />
              <ListRow label="Approved" value={data.fundApplications.approved} pill="success" />
              <ListRow label="Pending" value={data.fundApplications.pending} pill="warning" />
              <ListRow
                label="Funding secured"
                value={formatUSD(data.fundApplications.fundingSecured)}
                pill="accent"
                isText
              />
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SubMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-5 first:pl-0 last:pr-0">
      <div className="label-eyebrow !text-[10px]">{label}</div>
      <div className="mt-1.5 text-[22px] font-light tabular leading-none text-ink">
        {value}
      </div>
    </div>
  );
}

function ListRow({
  label,
  value,
  pill,
  isText = false,
}: {
  label: string;
  value: any;
  pill: "default" | "success" | "warning" | "danger" | "accent" | "muted";
  isText?: boolean;
}) {
  return (
    <li className="flex items-center justify-between py-3">
      <span className="text-[13px] text-ink">{label}</span>
      <span className="flex items-center gap-3">
        <span className="text-[14px] font-mono tabular text-ink">
          {isText ? value : value}
        </span>
        <StatusPill tone={pill}>{pill === "warning" ? "Pending" : pill === "success" ? "Done" : pill === "accent" ? "Live" : "Tracked"}</StatusPill>
      </span>
    </li>
  );
}
