type Tone = "default" | "success" | "warning" | "danger" | "accent" | "muted";

type Props = {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
};

const TONES: Record<Tone, { fg: string; border: string }> = {
  default: { fg: "#0A1628", border: "#CBD5E1" },
  success: { fg: "#059669", border: "#A7F3D0" },
  warning: { fg: "#B45309", border: "#FDE68A" },
  danger: { fg: "#B91C1C", border: "#FECACA" },
  accent: { fg: "#0468A0", border: "#BFDBFE" },
  muted: { fg: "#64748B", border: "#E2E8F0" },
};

export default function StatusPill({
  children,
  tone = "default",
  className,
}: Props) {
  const t = TONES[tone];
  return (
    <span
      className={`inline-flex items-center px-2 py-[3px] border rounded-[2px] text-[10px] uppercase tracking-eyebrow font-medium font-mono ${className ?? ""}`}
      style={{ color: t.fg, borderColor: t.border, background: "transparent" }}
    >
      {children}
    </span>
  );
}
