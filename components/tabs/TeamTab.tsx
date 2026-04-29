"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { initials } from "@/lib/format";

type Props = { data: any };

export default function TeamTab({ data }: Props) {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="section-numeral">06 / Team</div>
        <h2 className="serif-title text-[34px] md:text-[40px] leading-[1.05] mt-2 text-ink">
          Partnership &amp; Communication Team
        </h2>
      </motion.div>

      {/* Roles narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-8">
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
              The Partnership &amp; Communication Team is the country office&rsquo;s
              front door for donors, vertical funds and private-sector partners.
              The team designs the resource mobilization strategy, manages the
              UNITY pipeline, and stewards relationships from first scoping
              conversation through signed agreement and donor reporting.
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
          <div className="label-eyebrow">Contacts</div>
          <h3 className="serif-title text-[24px] mt-2 text-ink leading-snug">
            How to reach us
          </h3>
          <div className="mt-4 bg-white border border-border rounded-[2px] divide-y divide-border-hair">
            <ContactRow label="Resource mobilization" value="—" />
            <ContactRow label="Donor reporting" value="—" />
            <ContactRow label="Private sector" value="—" />
            <ContactRow label="Communications" value="—" />
            <ContactRow label="General inbox" value="—" />
          </div>
        </motion.div>
      </div>

      {/* Team grid */}
      <div className="mt-12">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="label-eyebrow">Members</div>
            <h3 className="serif-title text-[22px] mt-1 text-ink">
              {data.team.length} on the team
            </h3>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-eyebrow text-muted">
            Mogadishu Country Office
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data.team.map((m: any, i: number) => (
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
              <div className="mt-3 text-[11px] font-mono tabular text-muted-2">
                {m.email}
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
          {data.faqs.map((f: any, i: number) => (
            <Faq key={i} q={f.q} a={f.a} initiallyOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-[13px] text-ink">{label}</span>
      <span className="text-[12.5px] font-mono tabular text-muted">
        {value}
      </span>
    </div>
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
