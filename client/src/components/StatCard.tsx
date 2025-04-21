import Link from "next/link";

type StatCardProps = {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  color?: string;
  href?: string;
};

export default function StatCard({
  label,
  value,
  icon,
  color = "bg-secondary",
  href,
}: StatCardProps) {
  const card = (
    <div
      className={`
        flex items-center justify-between
        p-6 rounded-xl text-white shadow-md
        transition-transform duration-200
        hover:scale-[1.03] hover:shadow-lg
        hover:brightness-110
        focus:outline focus:outline-offset-2 focus:outline-white
        cursor-pointer
        w-full sm:w-full
        ${color}
      `}
      tabIndex={href ? 0 : -1} // Allow keyboard focus if it's a link
    >
      <div>
        <p className="text-sm font-medium text-light/80">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      {icon && <div className="text-3xl">{icon}</div>}
    </div>
  );

  return href ? <Link href={href}>{card}</Link> : card;
}
