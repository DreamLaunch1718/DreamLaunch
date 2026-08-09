import Reveal from "@/components/Reveal";

export default function ServiceCard({
  index,
  title,
  description,
  delay = 0,
}: {
  index: number;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="group h-full rounded-3xl border border-navy-900/10 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(11,42,74,0.25)]">
        <span className="text-sm font-semibold text-orange-500">
          {String(index).padStart(2, "0")}
        </span>
        <h3 className="mt-4 text-xl font-bold text-navy-900">{title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-navy-900/60">
          {description}
        </p>
      </div>
    </Reveal>
  );
}
