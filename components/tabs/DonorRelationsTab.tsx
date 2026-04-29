"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import RagDot from "../primitives/RagDot";
import StatusPill from "../primitives/StatusPill";

type Props = { data: any };

const TYPE_TONES: Record<string, { soft: string; ink: string; rule: string }> =
  {
    DAC: { soft: "#F0F6FB", ink: "#0468A0", rule: "#BFDBFE" },
    GCC: { soft: "#F4F1EA", ink: "#7C5E2A", rule: "#E8DCC2" },
    Multilateral: { soft: "#F5F2EC", ink: "#5A4A2E", rule: "#E5DBC5" },
    IFI: { soft: "#F1F5F9", ink: "#334155", rule: "#CBD5E1" },
    MPTF: { soft: "#EEF2F7", ink: "#1E293B", rule: "#CBD5E1" },
    PrivateSector: { soft: "#F4F0F6", ink: "#5B3A6F", rule: "#D8C8E1" },
    Foundation: { soft: "#F0F4F0", ink: "#3F5C3F", rule: "#C9D6C9" },
  };

const TYPE_LABEL: Record<string, string> = {
  DAC: "DAC",
  GCC: "GCC",
  Multilateral: "Multilateral",
  IFI: "IFI",
  MPTF: "MPTF",
  PrivateSector: "Private",
  Foundation: "Foundation",
  Vertical_Fund: "Vertical Fund",
};

export default function DonorRelationsTab({ data }: Props) {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = useMemo(() => {
    if (!filter) return data.donorRegister;
    return data.donorRegister.filter((d: any) => d.type === filter);
  }, [filter, data.donorRegister]);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-baseline justify-between gap-6"
      >
        <div>
          <div className="section-numeral">02 / Donor Relations</div>
          <h2 className="serif-title text-[34px] md:text-[40px] leading-[1.05] mt-2 text-ink">
            Donor engagement register
          </h2>
          <p className="mt-2 text-[14px] text-muted max-w-2xl">
            Active and prospective donor relationships, organised by partner
            type.
          </p>
        </div>
        <div className="hidden lg:flex flex-col items-end gap-1 shrink-0">
          <div className="label-eyebrow">Active relationships</div>
          <div className="text-[40px] font-light leading-none tabular text-ink">
            {data.donorRegister.length}
          </div>
        </div>
      </motion.div>

      {/* Type tile row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        <TypeTile
          label="All Types"
          count={data.donorRegister.length}
          active={filter === null}
          onClick={() => setFilter(null)}
          tone={{ soft: "#FFFFFF", ink: "#0A1628", rule: "#0A1628" }}
          delay={0}
        />
        {data.donorTypeCounts.map((t: any, i: number) => (
          <TypeTile
            key={t.type}
            label={t.label}
            count={t.count}
            active={filter === t.type}
            onClick={() =>
              setFilter((prev) => (prev === t.type ? null : t.type))
            }
            tone={TYPE_TONES[t.type] || TYPE_TONES.Multilateral}
            delay={(i + 1) * 0.04}
          />
        ))}
      </div>

      {/* Register table */}
      <div className="mt-8 bg-white border border-border rounded-[2px]">
        <div className="grid grid-cols-12 gap-x-4 px-5 py-3 border-b border-border label-eyebrow">
          <div className="col-span-3">Donor</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-3">Strategic priorities</div>
          <div className="col-span-1">Last engagement</div>
          <div className="col-span-1">Next action</div>
          <div className="col-span-1">Visibility</div>
          <div className="col-span-1">Risk</div>
          <div className="col-span-1 text-right">Status</div>
        </div>
        <div className="max-h-[460px] overflow-auto scroll-thin">
          {filtered.map((d: any, i: number) => (
            <motion.div
              key={d.donor + i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: Math.min(i, 12) * 0.02 }}
              className="grid grid-cols-12 gap-x-4 px-5 py-3.5 border-b border-border-hair items-center hover:bg-surface-2 transition-colors"
            >
              <div className="col-span-3 text-[13.5px] text-ink truncate">
                {d.donor}
              </div>
              <div className="col-span-1">
                <StatusPill tone="muted">
                  {TYPE_LABEL[d.type] || d.type}
                </StatusPill>
              </div>
              <div className="col-span-3 text-[12.5px] text-muted truncate">
                {d.priorities || "—"}
              </div>
              <div className="col-span-1 text-[12.5px] text-muted">
                {d.lastEngagement || "—"}
              </div>
              <div className="col-span-1 text-[12.5px] text-muted">
                {d.nextAction || "—"}
              </div>
              <div className="col-span-1 text-[12.5px] text-muted">
                {d.visibility || "—"}
              </div>
              <div className="col-span-1 text-[12.5px] text-muted">
                {d.risk || "—"}
              </div>
              <div className="col-span-1 flex justify-end">
                <RagDot rag={d.rag} />
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-[13px] text-muted">
              No donors match this filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

type TileProps = {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  tone: { soft: string; ink: string; rule: string };
  delay: number;
};

function TypeTile({ label, count, active, onClick, tone, delay }: TileProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      onClick={onClick}
      className="text-left px-4 py-4 border rounded-[2px] transition-all"
      style={{
        background: active ? tone.soft : "#FFFFFF",
        borderColor: active ? tone.rule : "#E2E8F0",
      }}
    >
      <div
        className="text-[10px] font-mono uppercase tracking-eyebrow"
        style={{ color: active ? tone.ink : "#64748B" }}
      >
        {label}
      </div>
      <div
        className="mt-2 text-[28px] font-light leading-none tabular"
        style={{ color: active ? tone.ink : "#0A1628" }}
      >
        {count}
      </div>
    </motion.button>
  );
}
