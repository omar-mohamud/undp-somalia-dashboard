import { trendColor, trendGlyph } from "@/lib/format";

type Props = {
  trend: "up" | "down" | "flat" | string;
  className?: string;
};

export default function TrendArrow({ trend, className }: Props) {
  return (
    <span
      aria-label={`trend: ${trend}`}
      className={`inline-block tabular leading-none ${className ?? ""}`}
      style={{ color: trendColor(trend), fontSize: "11px", fontWeight: 500 }}
    >
      {trendGlyph(trend)}
    </span>
  );
}
