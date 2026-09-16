type AvatarProps = {
  name: string;
  variant?: "child" | "teacher" | "announcement";
  size?: "sm" | "md";
};

export function Avatar({ name, variant = "child", size = "md" }: AvatarProps) {
  const sizeClass = size === "sm" ? "h-10 w-10 text-base" : "h-11 w-11 text-[17px]";

  if (variant === "announcement") {
    return (
      <div className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-info-soft text-info`}>
        <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 11 18-5v12L3 14v-3z" />
          <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
        </svg>
      </div>
    );
  }

  const palette = variant === "teacher" ? "bg-[#f2937a] text-white" : "bg-sky text-sky-dark";

  return (
    <div className={`${sizeClass} ${palette} flex shrink-0 items-center justify-center rounded-full font-display font-semibold`}>
      {name.charAt(0)}
    </div>
  );
}
