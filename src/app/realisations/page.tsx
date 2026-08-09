import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { realisations } from "@/data/content";

export const metadata: Metadata = {
  title: "Nos réalisations",
  description: "Découvrez les sites web réalisés par Dream&Launch.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHeader
        kicker="Nos réalisations"
        title="Sites web réalisés"
        subtitle="Quelques projets sur lesquels nous avons eu le plaisir de travailler."
      />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {realisations.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block overflow-hidden rounded-3xl border border-navy-900/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(11,42,74,0.25)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-navy-900/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-navy-900">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-navy-900/50">
                      {project.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500">
                      Voir le site
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
