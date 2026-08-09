"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { home } from "@/data/content";
import HeroIllustration from "@/components/HeroIllustration";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden bg-navy-950 pt-24 pb-14 lg:min-h-screen lg:pt-28 lg:pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 15% 20%, rgba(26,74,122,0.55) 0%, rgba(7,26,46,0) 70%), radial-gradient(50% 45% at 85% 80%, rgba(245,135,31,0.20) 0%, rgba(7,26,46,0) 70%)",
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 items-center justify-center py-16 lg:flex"
      >
        <HeroIllustration />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto w-full max-w-7xl px-6 lg:px-10"
      >
        <motion.p
          variants={item}
          className="inline-flex items-center rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70"
        >
          {home.hero.kicker}
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-8 max-w-4xl text-[13vw] font-black leading-[0.92] tracking-tight text-white sm:text-[9vw] lg:text-[6.4rem]"
        >
          {home.hero.title.split(" ").map((word, i) => (
            <span key={i} className="block">
              {word === "&" ? (
                <span className="text-orange-500">&amp;</span>
              ) : (
                word
              )}
            </span>
          ))}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-xl text-lg leading-relaxed text-white/60"
        >
          {home.hero.subtitle}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-4 text-sm font-semibold text-navy-950 transition-transform hover:scale-[1.03]"
          >
            Démarrer un projet
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Nos services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
