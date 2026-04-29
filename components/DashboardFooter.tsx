import { formatDate } from "@/lib/format";

type Props = {
  asOfDate: string;
  lastUpdated: string;
};

export default function DashboardFooter({ asOfDate, lastUpdated }: Props) {
  return (
    <footer className="border-t border-border-soft mt-20">
      <div className="mx-auto max-w-[1320px] px-8 lg:px-14 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="label-eyebrow">UNDP Somalia</div>
            <p className="mt-3 text-[14px] text-ink leading-relaxed">
              Partnership &amp; Communication Team
            </p>
            <p className="text-[13px] text-muted leading-relaxed">
              Internal &amp; donor reporting · Country Office Mogadishu
            </p>
          </div>
          <div>
            <div className="label-eyebrow">Data sources</div>
            <p className="mt-3 text-[13px] text-muted leading-relaxed">
              Pipeline tracker, Atlas/Quantum cash receipts, programme delivery
              extracts. Figures are unaudited and subject to revision.
            </p>
          </div>
          <div>
            <div className="label-eyebrow">As of</div>
            <p className="mt-3 text-[13px] text-ink leading-relaxed font-mono tabular-nums">
              {formatDate(asOfDate)}
            </p>
            <p className="text-[12px] text-muted">
              Refreshed {formatDate(lastUpdated)}
            </p>
          </div>
        </div>
        <div className="hairline mt-12" />
        <p className="text-[11px] text-muted mt-8 tracking-wide">
          © {new Date().getFullYear()} United Nations Development Programme ·
          Somalia Country Office
        </p>
      </div>
    </footer>
  );
}
