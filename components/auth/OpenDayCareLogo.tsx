type OpenDayCareLogoProps = {
  variant?: "light" | "coral";
  showName?: boolean;
  size?: "sm" | "md";
};

export function OpenDayCareLogo({
  variant = "light",
  showName = false,
  size = "md",
}: OpenDayCareLogoProps) {
  const isCoral = variant === "coral";
  const iconSize = size === "sm" ? "h-[46px] w-[46px] rounded-[14px]" : "h-[58px] w-[58px] rounded-[18px]";
  const sunSize = size === "sm" ? "h-[26px] w-[26px]" : "h-[30px] w-[30px]";

  return (
    <div className="flex items-center gap-[13px]">
      <div
        className={`flex items-center justify-center ${iconSize} ${
          isCoral
            ? "bg-white/20"
            : "bg-gradient-to-br from-[#f8c3a8] to-[#f2937a] shadow-[0_12px_26px_-10px_rgba(238,129,100,0.65)]"
        }`}
      >
        <svg aria-hidden="true" className={sunSize} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      </div>
      {showName && <span className="font-display text-[21px] font-semibold tracking-[0.5px] text-white">OpenDayCare</span>}
    </div>
  );
}
