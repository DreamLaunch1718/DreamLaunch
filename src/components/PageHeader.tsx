import Reveal from "@/components/Reveal";

export default function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-36 pb-20 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 55% at 85% 15%, rgba(245,135,31,0.18) 0%, rgba(7,26,46,0) 70%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-300">
            {kicker}
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
