"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatUSD, formatDate } from "@/lib/format";

type Row = {
  month: string;
  y2025: number | null;
  y2026: number | null;
};

type Props = {
  data: Row[];
  asOfDate: string;
};

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-border-soft px-3.5 py-2.5 shadow-[0_2px_18px_rgba(10,22,40,0.06)] rounded-[2px] min-w-[140px]">
      <div className="label-eyebrow mb-1">{label}</div>
      {payload.map((p: any) => (
        <div
          key={p.dataKey}
          className="flex items-baseline justify-between gap-4 text-[12px] py-0.5"
        >
          <span className="flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-3 rounded-[1px]"
              style={{ background: p.color }}
            />
            <span className="text-muted">
              {p.dataKey === "y2025" ? "2025" : "2026"}
            </span>
          </span>
          <span className="text-ink font-mono tabular-nums">
            {p.value === null ? "—" : formatUSD(p.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CashTrajectoryChart({ data, asOfDate }: Props) {
  const asOfMonth = new Date(asOfDate + "T00:00:00Z").toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  const asOfRow = data.find((d) => d.month === asOfMonth);
  const asOfValue = asOfRow?.y2026 ?? null;

  return (
    <section className="mx-auto max-w-[1320px] px-8 lg:px-14 py-20 md:py-24">
      <div className="max-w-2xl mb-10">
        <div className="label-eyebrow">Cumulative cash inflow</div>
        <h3 className="serif-title text-[30px] md:text-[36px] mt-2 text-ink leading-[1.1]">
          Cash inflow through the year
        </h3>
        <p className="text-[15px] text-muted mt-3 leading-relaxed">
          A view of cumulative cash received against the same window last year —
          a leading indicator of how the second half of the year typically
          accelerates.
        </p>
      </div>

      {/* Inline legend */}
      <div className="flex items-center gap-7 mb-4 text-[12px]">
        <div className="flex items-center gap-2">
          <span className="h-[2px] w-6 bg-[#94A3B8] inline-block" />
          <span className="text-muted">2025</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-[2px] w-6 bg-undp inline-block" />
          <span className="text-ink">2026</span>
        </div>
        <div className="ml-auto text-muted text-[12px]">
          As of {formatDate(asOfDate)}
        </div>
      </div>

      <div className="h-[360px] -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 16, right: 24, bottom: 8, left: 8 }}
          >
            <defs>
              <linearGradient id="grad2026" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#006EB5" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#006EB5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad2025" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#94A3B8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              stroke="#EEF2F7"
              strokeDasharray="0"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              dy={10}
              tick={{ fill: "#94A3B8", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              tickFormatter={(v) => formatUSD(v)}
              width={56}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#E2E8F0" }} />
            <Area
              type="monotone"
              dataKey="y2025"
              stroke="#94A3B8"
              strokeWidth={1.5}
              strokeDasharray="3 3"
              fill="url(#grad2025)"
              dot={false}
              activeDot={{ r: 3, fill: "#94A3B8", stroke: "white", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1200}
            />
            <Area
              type="monotone"
              dataKey="y2026"
              stroke="#006EB5"
              strokeWidth={2.25}
              fill="url(#grad2026)"
              dot={false}
              activeDot={{ r: 4, fill: "#006EB5", stroke: "white", strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={1400}
              connectNulls={false}
            />
            {asOfValue !== null && (
              <ReferenceDot
                x={asOfMonth}
                y={asOfValue}
                r={5}
                fill="#006EB5"
                stroke="white"
                strokeWidth={2}
                ifOverflow="extendDomain"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {asOfValue !== null && (
        <div className="mt-3 text-[12px] text-muted">
          <span className="text-ink font-mono tabular-nums">
            {formatUSD(asOfValue)}
          </span>{" "}
          received by end of {asOfMonth} 2026.
        </div>
      )}
    </section>
  );
}
