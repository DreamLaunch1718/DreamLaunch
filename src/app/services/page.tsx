import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { services } from "@/data/content";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Création de sites web, transformation de sites existants et visibilité SEO — des services adaptés aux commerces, indépendants et PME.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        kicker="Ce que nous faisons"
        title="Nos services"
        subtitle="De la conception à la visibilité, nous accompagnons votre projet à chaque étape."
      />

      <section className="bg-paper py-14 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="space-y-6">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 0.08}>
                <div className="group grid gap-6 rounded-3xl border border-navy-900/10 bg-white p-8 transition-all duration-300 hover:shadow-[0_24px_60px_-24px_rgba(11,42,74,0.25)] sm:grid-cols-[auto_1fr] sm:items-center sm:p-10">
                  <span className="text-6xl font-black text-navy-900/[0.08] transition-colors duration-300 group-hover:text-orange-500/20 sm:text-7xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-navy-900 sm:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-navy-900/60">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-14 lg:py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Un projet en tête ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/50">
              Décrivez-nous votre besoin, nous revenons vers vous rapidement.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-orange-500 px-8 py-4 text-sm font-semibold text-navy-950 transition-transform hover:scale-[1.03]"
            >
              Contactez-nous
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
