import Image from "next/image";
import { formatDate } from "@/lib/format";

type Props = {
  asOfDate: string;
  lastUpdated: string;
};

export default function DashboardHeader({ asOfDate, lastUpdated }: Props) {
  return (
    <header className="border-b border-border-soft bg-white/80 backdrop-blur-sm">
      <div className="mx-auto max-w-[1320px] px-8 lg:px-14 py-7 flex items-center justify-between gap-8">
        <div className="flex items-center gap-7">
          <div className="relative h-[60px] w-[44px] shrink-0">
            <Image
              src="/undp-logo.jpeg"
              alt="UNDP"
              fill
              priority
              className="object-contain"
              sizes="44px"
            />
          </div>
          <div className="border-l border-border-soft pl-7">
            <h1 className="serif-title text-[28px] md:text-[32px] leading-tight text-ink">
              Partnership &amp; Communication Dashboard
            </h1>
            <p className="text-[13px] text-muted mt-1 tracking-tight">
              UNDP Somalia
              <span className="mx-2 text-border-soft">·</span>
              As of {formatDate(asOfDate)}
            </p>
          </div>
        </div>
        <div className="hidden md:block text-right">
          <div className="label-eyebrow">Last updated</div>
          <div className="text-[13px] text-ink mt-1 font-medium">
            {formatDate(lastUpdated)}
          </div>
        </div>
      </div>
    </header>
  );
}
