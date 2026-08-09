"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nav, site } from "@/data/content";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <a
      href={site.instagram}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className={`group ${className ?? ""}`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
          className="fill-current transition-colors group-hover:fill-[url(#instagram-gradient)]"
        />
      </svg>
    </a>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-paper/80 backdrop-blur-xl border-b border-black/5"
          : "bg-transparent"
      }`}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FEDA75" />
            <stop offset="25%" stopColor="#FA7E1E" />
            <stop offset="50%" stopColor="#D62976" />
            <stop offset="75%" stopColor="#962FBF" />
            <stop offset="100%" stopColor="#4F5BD5" />
          </linearGradient>
        </defs>
      </svg>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex items-center justify-between py-3.5">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo-mark.png"
            alt="Dream&Launch"
            width={36}
            height={34}
            priority
            className="h-9 w-auto"
          />
          <span
            className={`text-[1.05rem] font-bold tracking-tight transition-colors duration-300 ${
              scrolled || open ? "text-navy-900" : "text-white"
            }`}
          >
            Dream
            <span
              className={
                scrolled || open ? "text-orange-500" : "text-orange-300"
              }
            >
              &
            </span>
            Launch
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  scrolled || open
                    ? active
                      ? "text-navy-900"
                      : "text-navy-900/60 hover:text-navy-900"
                    : active
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className={`absolute inset-0 rounded-full -z-10 ${
                      scrolled || open ? "bg-navy-900/[0.06]" : "bg-white/10"
                    }`}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <InstagramIcon
            className={
              scrolled || open ? "text-navy-900/60" : "text-white/70"
            }
          />
          <Link
            href="/contact"
            className={`inline-flex items-center rounded-full text-sm font-semibold px-5 py-2.5 transition-colors ${
              scrolled || open
                ? "bg-navy-900 text-white hover:bg-navy-800"
                : "bg-white text-navy-900 hover:bg-white/90"
            }`}
          >
            Contactez-nous
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className={`block w-6 h-[2px] origin-center transition-colors duration-300 ${
              scrolled || open ? "bg-navy-900" : "bg-white"
            }`}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className={`block w-6 h-[2px] transition-colors duration-300 ${
              scrolled || open ? "bg-navy-900" : "bg-white"
            }`}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className={`block w-6 h-[2px] origin-center transition-colors duration-300 ${
              scrolled || open ? "bg-navy-900" : "bg-white"
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-black/5 bg-paper/95 backdrop-blur-xl"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-3 text-base font-medium ${
                    pathname === item.href
                      ? "text-navy-900"
                      : "text-navy-900/60"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 inline-flex items-center justify-center rounded-full bg-navy-900 text-white text-sm font-semibold px-5 py-3"
              >
                Contactez-nous
              </Link>
              <InstagramIcon className="mt-4 text-navy-900/60" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
