"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EMAIL_REGEX = /[\w.-]+@[\w.-]+\.\w+/g;

function highlightEmails(text: string) {
  const parts = text.split(EMAIL_REGEX);
  const emails = text.match(EMAIL_REGEX) ?? [];

  return parts.flatMap((part, i) => {
    const email = emails[i];
    return email
      ? [
          part,
          <a
            key={email + i}
            href={`mailto:${email}`}
            className="font-medium text-orange-400 hover:text-orange-300 transition-colors"
          >
            {email}
          </a>,
        ]
      : [part];
  });
}

export default function FaqAccordion({
  items,
  dark = false,
}: {
  items: { question: string; answer: string }[];
  dark?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const borderColor = dark ? "border-white/10" : "border-navy-900/10";
  const questionColor = dark ? "text-white" : "text-navy-900";
  const answerColor = dark ? "text-white/50" : "text-navy-900/60";
  const iconBg = dark ? "bg-white/10" : "bg-navy-900/[0.06]";
  const iconColor = dark ? "text-white" : "text-navy-900";

  return (
    <div className={`divide-y ${borderColor} border-t border-b ${borderColor}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span className={`text-lg font-semibold ${questionColor}`}>
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`relative h-8 w-8 shrink-0 rounded-full ${iconBg}`}
              >
                <span
                  className={`absolute inset-0 m-auto h-[1.5px] w-3 rounded-full bg-current ${iconColor}`}
                />
                <span
                  className={`absolute inset-0 m-auto h-3 w-[1.5px] rounded-full bg-current ${iconColor}`}
                />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className={`pb-6 pr-14 text-[15px] leading-relaxed ${answerColor}`}>
                    {highlightEmails(item.answer)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
