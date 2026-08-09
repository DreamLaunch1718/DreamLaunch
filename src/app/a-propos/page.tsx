import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { about } from "@/data/content";

export const metadata: Metadata = {
  title: "À propos",
  description: about.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader kicker="À propos de nous" title={about.title} />

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <p className="text-xl font-medium leading-relaxed text-navy-900">
              {about.intro}
            </p>
          </Reveal>

          <div className="mt-10 space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[15px] leading-relaxed text-navy-900/60">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy-900/10 bg-navy-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <Reveal>
            <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
              {about.distinction.title}
            </h2>
          </Reveal>
          <div className="mt-10 space-y-6">
            {about.distinction.points.map((point, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-[15px] leading-relaxed text-white/60">
                  {point}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
              Notre équipe
            </p>
          </Reveal>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {about.team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1}>
                <div className="w-48 overflow-hidden rounded-3xl border border-navy-900/10 bg-white">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={256}
                    height={256}
                    className="h-48 w-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-navy-900">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm text-navy-900/50">
                      {member.role}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
