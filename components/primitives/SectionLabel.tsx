type Props = {
  numeral: string; // "01", "02"...
  title: string;
  description?: string;
  className?: string;
};

export default function SectionLabel({
  numeral,
  title,
  description,
  className,
}: Props) {
  return (
    <div className={className}>
      <div className="flex items-baseline gap-3">
        <span className="section-numeral">{numeral}</span>
        <span className="h-px w-8 bg-border translate-y-[-3px]" />
        <h2 className="serif-title text-[26px] md:text-[28px] leading-[1.05] text-ink">
          {title}
        </h2>
      </div>
      {description && (
        <p className="mt-2 ml-[60px] text-[13px] text-muted leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
