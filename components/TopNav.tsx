"use client";

import { motion } from "framer-motion";
import { formatDateShort } from "@/lib/format";

type Tab = { id: string; label: string };

type Props = {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  asOfDate: string;
};

export default function TopNav({ tabs, active, onChange, asOfDate }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-[#FBFBF9]/85 backdrop-blur-[6px] border-b border-border">
      {/* Row 1 — masthead */}
      <div className="mx-auto max-w-[1440px] px-8 lg:px-10 pt-5 pb-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src="/undp-logo.jpeg"
              alt="UNDP"
              className="h-10 w-auto object-contain"
            />
            <div className="flex items-baseline gap-3">
              <h1 className="serif-title text-[20px] leading-tight text-ink">
                UNDP Somalia
              </h1>
              <span className="h-3.5 w-px bg-border translate-y-[2px]" />
              <span className="text-[13px] text-muted tracking-tight">
                Partnership &amp; Communication Dashboard
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="label-eyebrow !text-[10px]">As of</div>
            <div className="mt-1 text-[12.5px] font-mono tabular text-ink">
              {formatDateShort(asOfDate)}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 — tabs */}
      <div className="mx-auto max-w-[1440px] px-8 lg:px-10">
        <nav
          role="tablist"
          aria-label="Dashboard sections"
          className="flex items-end gap-1 overflow-x-auto scroll-thin"
        >
          {tabs.map((t, i) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(t.id)}
                className="relative shrink-0 px-3.5 lg:px-4 pt-1 pb-3 transition-colors group"
              >
                <span className="flex items-baseline gap-2">
                  <span
                    className={`text-[10px] font-mono tracking-wider ${
                      isActive ? "text-undp" : "text-muted-2"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[13px] tracking-tight whitespace-nowrap ${
                      isActive
                        ? "text-ink font-medium"
                        : "text-muted group-hover:text-ink"
                    }`}
                  >
                    {t.label}
                  </span>
                </span>
                {isActive && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-undp"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 32,
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
