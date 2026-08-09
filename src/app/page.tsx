import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import FaqAccordion from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";
import { home, services } from "@/data/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="bg-paper py-14 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <h2 className="text-4xl font-black tracking-tight text-navy-900 sm:text-5xl">
                Nos services
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                href="/services"
                className="text-sm font-semibold text-navy-900 underline decoration-orange-500 decoration-2 underline-offset-4"
              >
                Tout voir →
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard
                key={service.slug}
                index={i + 1}
                title={service.title}
                description={service.description}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-14 lg:py-24 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              Questions fréquentes
            </h2>
            <p className="mt-4 text-white/50">
              Voici quelques questions fréquentes sur nos services.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10">
            <FaqAccordion items={home.faq} dark />
          </Reveal>
        </div>
      </section>

      <section className="bg-paper py-16 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="text-4xl font-black tracking-tight text-navy-900 sm:text-5xl">
              Prêt à lancer votre projet ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-navy-900/60">
              Parlons de votre idée et voyons comment lui donner vie.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-navy-900 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
            >
              Contactez-nous
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
