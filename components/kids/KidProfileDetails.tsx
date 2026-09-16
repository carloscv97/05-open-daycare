import type { Kid } from "@/lib/mock-kids";

export function KidProfileDetails({ kid }: { kid: Kid }) {
  const details = [
    ["Fecha de nacimiento", kid.birthDate],
    ["Sala", kid.room],
    ["Ingreso", kid.enrollmentLabel],
  ];

  return (
    <dl className="overflow-hidden rounded-2xl border border-border bg-surface">
      {details.map(([label, value], index) => (
        <div key={label} className={`flex items-center justify-between gap-4 px-[18px] py-[15px] text-[14.5px] ${index < details.length - 1 ? "border-b border-[#f0e6d8]" : ""}`}>
          <dt className="text-text-muted">{label}</dt>
          <dd className="font-extrabold text-text">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
