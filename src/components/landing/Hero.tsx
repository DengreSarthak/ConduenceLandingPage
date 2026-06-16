"use client";

import { motion } from "framer-motion";

import { heroCloudsSrc } from "@/lib/assets";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      <img
        src={heroCloudsSrc.src}
        alt="Night landscape with agent orchestration flow from news and data to execution"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Light overlay for headline readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 65%, rgba(0,0,0,0.75) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 28%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl translate-y-12 flex-col items-center justify-center px-8 text-center md:translate-y-26">
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease: "easeOut" }}
          className="max-w-4xl text-balance font-display text-5xl leading-[0.95] tracking-[-0.02em] text-white md:text-[5.5rem] lg:text-[6.25rem]"
        >
          AI Agents
          <br />
          <em className="font-display font-normal italic">that think like you</em>
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: "easeOut" }}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/78 md:text-lg"
        >
          Prediction market orchestration at agentic speed with you in control.
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
          className="mt-10 relative inline-block"
        >
          <a
            href="#cta"
            className="group relative inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-medium tracking-wide text-white backdrop-blur-md transition hover:bg-white hover:text-black"
          >
            Join Waitlist
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black z-[3] pointer-events-none" />
    </section>
  );
}
