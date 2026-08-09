"use client";

import { motion, type Variants } from "framer-motion";

const STAGGER = 0.28;
const DRAW_DURATION = 1.6;

const KEY_ROWS: boolean[][] = [
  [false, false, true, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, true, false, false],
];

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * STAGGER,
        duration: DRAW_DURATION,
        ease: [0.16, 1, 0.3, 1],
      },
      opacity: { delay: i * STAGGER, duration: 0.5 },
    },
  }),
};

export default function HeroIllustration() {
  return (
    <div className="relative flex h-full w-full items-center justify-center px-10 xl:px-14">
      <div
        aria-hidden
        className="absolute h-[85%] w-[85%] rounded-full bg-orange-500/10 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          y: {
            delay: 2.8,
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{ filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.35))" }}
        className="relative w-full"
      >
        <motion.svg
          viewBox="0 0 440 360"
          fill="none"
          className="w-full"
          initial="hidden"
          animate="show"
        >
          {/* screen */}
          <motion.rect
            x="110"
            y="40"
            width="220"
            height="150"
            rx="14"
            stroke="white"
            strokeOpacity="0.28"
            strokeWidth="2.5"
            strokeLinejoin="round"
            custom={0}
            variants={draw}
          />

          {/* browser bar */}
          <motion.line
            x1="110"
            y1="76"
            x2="330"
            y2="76"
            stroke="white"
            strokeOpacity="0.18"
            strokeWidth="2"
            custom={0.7}
            variants={draw}
          />
          <motion.circle
            cx="130"
            cy="58"
            r="4.5"
            stroke="#f5871f"
            strokeWidth="2"
            custom={0.7}
            variants={draw}
          />
          <motion.circle
            cx="147"
            cy="58"
            r="4.5"
            stroke="white"
            strokeOpacity="0.32"
            strokeWidth="2"
            custom={0.85}
            variants={draw}
          />
          <motion.circle
            cx="164"
            cy="58"
            r="4.5"
            stroke="white"
            strokeOpacity="0.32"
            strokeWidth="2"
            custom={1}
            variants={draw}
          />

          {/* content lines */}
          <motion.line
            x1="130"
            y1="100"
            x2="230"
            y2="100"
            stroke="#ff9d2e"
            strokeWidth="4.5"
            strokeLinecap="round"
            custom={1.5}
            variants={draw}
          />
          <motion.line
            x1="130"
            y1="123"
            x2="300"
            y2="123"
            stroke="white"
            strokeOpacity="0.32"
            strokeWidth="4.5"
            strokeLinecap="round"
            custom={1.75}
            variants={draw}
          />
          <motion.line
            x1="130"
            y1="146"
            x2="270"
            y2="146"
            stroke="white"
            strokeOpacity="0.32"
            strokeWidth="4.5"
            strokeLinecap="round"
            custom={2}
            variants={draw}
          />
          <motion.line
            x1="130"
            y1="169"
            x2="200"
            y2="169"
            stroke="#ff9d2e"
            strokeWidth="4.5"
            strokeLinecap="round"
            custom={2.25}
            variants={draw}
          />

          {/* blinking cursor at the end of the last line */}
          <motion.rect
            x="206"
            y="162"
            width="4"
            height="14"
            rx="1"
            fill="#ffb85c"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              delay: 3.3,
              duration: 1,
              repeat: Infinity,
              repeatDelay: 0.3,
            }}
          />

          {/* monitor stand */}
          <motion.path
            d="M205 190 L205 208 M235 190 L235 208 M180 214 L260 214"
            stroke="white"
            strokeOpacity="0.28"
            strokeWidth="2.5"
            strokeLinecap="round"
            custom={2.6}
            variants={draw}
          />

          {/* keyboard */}
          <motion.rect
            x="60"
            y="248"
            width="200"
            height="88"
            rx="12"
            stroke="white"
            strokeOpacity="0.28"
            strokeWidth="2.5"
            strokeLinejoin="round"
            custom={2.85}
            variants={draw}
          />
          {KEY_ROWS.map((row, r) =>
            row.map((accent, c) => (
              <motion.rect
                key={`key-${r}-${c}`}
                x={70 + c * 23}
                y={260 + r * 16}
                width="19"
                height="10"
                rx="2.5"
                fill={accent ? "#ff9d2e" : "white"}
                fillOpacity={accent ? 0.6 : 0.18}
                custom={3.1 + r * 0.1}
                variants={draw}
              />
            )),
          )}
          <motion.rect
            x="120"
            y="310"
            width="80"
            height="10"
            rx="4"
            fill="white"
            fillOpacity={0.18}
            custom={3.4}
            variants={draw}
          />

          {/* mouse */}
          <motion.rect
            x="300"
            y="252"
            width="54"
            height="86"
            rx="26"
            stroke="white"
            strokeOpacity="0.28"
            strokeWidth="2.5"
            custom={2.85}
            variants={draw}
          />
          <motion.path
            d="M327 252 L327 290"
            stroke="white"
            strokeOpacity="0.28"
            strokeWidth="2"
            strokeLinecap="round"
            custom={3.1}
            variants={draw}
          />
          <motion.rect
            x="322"
            y="260"
            width="10"
            height="16"
            rx="5"
            stroke="#ff9d2e"
            strokeWidth="2"
            custom={3.2}
            variants={draw}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
