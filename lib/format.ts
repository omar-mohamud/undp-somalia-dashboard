export function formatUSD(value: number, opts?: { precise?: boolean }): string {
  if (value === 0) return "$0";
  if (opts?.precise) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) {
    const v = value / 1_000_000;
    return `$${v >= 100 ? v.toFixed(0) : v.toFixed(1)}M`;
  }
  if (abs >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

export function formatPercent(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function ragColor(rag: "green" | "amber" | "red" | string): string {
  switch (rag) {
    case "green":
      return "#059669";
    case "amber":
      return "#D97706";
    case "red":
      return "#DC2626";
    default:
      return "#94A3B8";
  }
}

export function trendGlyph(trend: "up" | "down" | "flat" | string): string {
  switch (trend) {
    case "up":
      return "↑";
    case "down":
      return "↓";
    case "flat":
      return "→";
    default:
      return "·";
  }
}

export function trendColor(trend: "up" | "down" | "flat" | string): string {
  switch (trend) {
    case "up":
      return "#059669";
    case "down":
      return "#DC2626";
    case "flat":
      return "#64748B";
    default:
      return "#94A3B8";
  }
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]!.toUpperCase())
    .join("");
}
