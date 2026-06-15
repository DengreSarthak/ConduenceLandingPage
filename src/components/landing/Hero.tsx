"use client";

import { motion, useReducedMotion } from "framer-motion";

import { heroCloudsSrc } from "@/lib/assets";
import { IntelligenceGraph } from "./sky/IntelligenceGraph";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion() ?? false;

  const textFade = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* ── Layer 1: the real background — cinematic reveal on load ── */}
      <img
        src={heroCloudsSrc.src}
        alt="Night sky with constellation network over rolling hills"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover origin-center"
        style={{ zIndex: 0 }}
      />

      {/* ── Layer 2: very subtle darkening overlay so graph lines stay crisp ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 1,
          background: "rgba(0,0,0,0.28)",
        }}
      />

      {/* ── Layer 3: intelligence graph, gently parallaxed ── */}
      <div
        className="absolute left-1/2 top-[18%] h-[100%] w-full -translate-x-1/2 scale-[0.7] transform-gpu origin-top will-change-transform"
        style={{ zIndex: 2 }}
      >
        <IntelligenceGraph reduceMotion={reduceMotion} />
      </div>

      {/* ── Layer 4: soft radial scrim behind the headline for readability ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 3,
          background:
            "radial-gradient(58% 38% at 50% 55%, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.24) 50%, rgba(0,0,0,0) 80%)",
        }}
      />

      {/* ── Layer 5: headline + CTA ── */}
      <div
        className="relative flex min-h-screen flex-col items-center justify-end px-6 pb-[10vh] text-center"
        style={{ zIndex: 4 }}
      >
        <h1>
          <motion.span
            {...textFade(0.6)}
            className="block text-[clamp(2rem,6.2vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.026em] text-white"
          >
            AI Agents
          </motion.span>
          <motion.span
            {...textFade(0.8)}
            className="block font-display text-[clamp(2.2rem,7vw,5.2rem)] font-normal italic leading-[0.93] tracking-[-0.01em] text-white"
          >
            that think with you
          </motion.span>
        </h1>

        <motion.p
          {...textFade(1.05)}
          className="mt-6 max-w-sm text-[13px] leading-relaxed text-white/60 md:text-[14px]"
        >
          Prediction market orchestration
          <br />
          at agentic speed with you in control.
        </motion.p>

        <motion.div {...textFade(1.25)} className="mt-8">
          <a
            href="#cta"
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-black/30 px-7 py-3 text-[12px] font-medium tracking-wide text-white/90 backdrop-blur-sm transition-colors duration-500 hover:border-white/40 hover:bg-black/50 hover:text-white"
          >
            Join Waitlist
            <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>

      {/* ── Bottom edge: dissolves into the next section ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b from-transparent to-black"
        style={{ zIndex: 5 }}
      />
    </section>
  );
}
