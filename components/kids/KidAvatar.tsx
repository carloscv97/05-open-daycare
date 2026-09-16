const AVATAR_PALETTES: Record<string, string> = {
  blue: "bg-sky text-sky-dark",
  green: "bg-[#b9dec4] text-[#3e8b62]",
  peach: "bg-[#f8c3a8] text-[#c95e43]",
  pink: "bg-[#f4b8cc] text-[#c44a7a]",
  purple: "bg-[#c9b6e8] text-[#7b5fc0]",
  yellow: "bg-[#f4dc8e] text-[#9a7b1e]",
};

type KidAvatarProps = {
  name: string;
  variant: string;
  size?: "sm" | "lg";
};

export function KidAvatar({ name, variant, size = "sm" }: KidAvatarProps) {
  const sizeClass = size === "lg" ? "h-[84px] w-[84px] text-[34px]" : "h-12 w-12 text-[19px]";

  return (
    <div className={`${AVATAR_PALETTES[variant] ?? AVATAR_PALETTES.blue} ${sizeClass} flex shrink-0 items-center justify-center rounded-full font-display font-semibold`}>
      {name.charAt(0)}
    </div>
  );
}
