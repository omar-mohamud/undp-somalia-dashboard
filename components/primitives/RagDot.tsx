import { ragColor } from "@/lib/format";

type Props = {
  rag: "green" | "amber" | "red" | string;
  size?: number;
  className?: string;
};

export default function RagDot({ rag, size = 8, className }: Props) {
  return (
    <span
      aria-label={`status: ${rag}`}
      className={`inline-block rounded-full ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        background: ragColor(rag),
        boxShadow: `0 0 0 2px ${ragColor(rag)}1A`,
      }}
    />
  );
}
