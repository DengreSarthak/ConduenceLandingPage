"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import {
  featCanvasSrc,
  featConnectorsSrc,
  featByosSrc,
  featGraphSrc,
  featMindSrc,
  featObservabilitySrc,
  featPaperSrc,
} from "@/lib/assets";

type Pillar = {
  kicker: string;
  title: string;
  body: string;
  image: string;
};

const pillars: Pillar[] = [
  {
    kicker: "RELATION GRAPH",
    title: "Agentic Knowledge Graph",
    body: "A graph of how real world events influence each other, authored by you. The orchestrator agent traverses it in milliseconds instead of reasoning from scratch, so your perspective, your edges, your weights become the agent's intuition. Reasoning drops from seconds to milliseconds.",
    image: featGraphSrc,
  },
  {
    kicker: "SIMULATION",
    title: "Paper Trading",
    body: "Test a strategy or an entire AI agent workflow against live Polymarket and Kalshi data, without putting real money on the line. Validate edge, debug behavior, and tune parameters before going live.",
    image: featPaperSrc,
  },
  {
    kicker: "OBSERVABILITY",
    title: "Trade Observability",
    body: "We use LangSmith to render every trade as a graph: which agent called which tool, what each returned, cost per tool call, cost per Mind Agent, and the full decision path. Backtrack any move and pinpoint exactly where things went right, or wrong.",
    image: featObservabilitySrc,
  },
  {
    kicker: "BUILDER",
    title: "Canvas",
    body: "Compose your own agent workflow on a drag and drop canvas. Preloaded tools, sub agent templates, the orchestrator, and Mind Agents. Wire them together without writing a single line of code. Explore the strategy that works best for you.",
    image: featCanvasSrc,
  },
  {
    kicker: "MARKETPLACE",
    title: "Mind Agents",
    body: "We extract the complexity so anyone can use the final product through micropayments. Monetize your strategy or your entire workflow as a Mind Agent. Your strategy stays private while you earn from it. Subscribe to one and plug it into your own workflow, or run it standalone. With Mind Agents that emit trades, you're live within minutes.",
    image: featMindSrc,
  },
  {
    kicker: "BYOS",
    title: "Bring Your Own Strategy",
    body: "Bring your own strategy and we handle the rest: building the AI agent workflow, publishing it, and making it available to other users. We keep a small percentage of revenue. You earn the rest. Your strategy stays private.",
    image: featByosSrc,
  },
  {
    kicker: "CONNECTORS",
    title: "Connectors",
    body: "Connect Telegram and Discord to your workflow. Get trade signals and event alerts where you already are, so you can take command while away from the dashboard. When your agent finds an opportunity, verify it and execute in one tap. You stay in full control.",
    image: featConnectorsSrc,
  },
];

const DURATION = 7000;

export function Pillars() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setActive((a) => (a + 1) % pillars.length);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const current = pillars[active];

  return (
    <section id="pillars" className="relative bg-white text-black">
      <div className="border-b border-black/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 font-mono text-[10px] tracking-[0.34em] text-black/50 sm:px-10">
          <span>&rang;&nbsp;&nbsp;PRODUCT CATALOG</span>
          <span>
            [{String(active + 1).padStart(2, "0")}/{String(pillars.length).padStart(2, "0")}]
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-x-10 gap-y-10 px-6 py-10 md:py-14 sm:px-10">
        <div className="col-span-12 flex flex-col md:col-span-5 md:-mt-3 lg:-mt-4">
          <h2 className="font-display text-3xl leading-[1.05] tracking-tight md:text-4xl lg:text-5xl">
            Everything you need to
            <br />
            <span className="font-normal italic text-black/45">ship agents that trade.</span>
          </h2>

          <ul className="mt-8 flex flex-col">
            {pillars.map((p, i) => {
              const isActive = i === active;
              return (
                <li key={p.title} className="relative">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className="grid w-full grid-cols-[48px_1fr] items-center gap-4 border-t border-black/10 py-4 text-left"
                  >
                    <span
                      className={`font-mono text-xs tracking-[0.2em] transition-colors ${
                        isActive ? "text-black" : "text-black/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-base transition-colors md:text-lg ${
                        isActive ? "font-semibold text-black" : "font-medium text-black/55"
                      }`}
                    >
                      {p.title}
                    </span>
                  </button>
                  <div className="absolute -bottom-px left-0 right-0 h-px overflow-hidden bg-transparent">
                    {isActive && (
                      <div
                        className="h-full bg-black"
                        style={{ width: `${progress * 100}%` }}
                      />
                    )}
                  </div>
                </li>
              );
            })}
            <li className="border-t border-black/10" />
          </ul>
        </div>

        <div className="col-span-12 md:col-span-7 md:mt-4 lg:mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col md:pl-6 lg:pl-10"
            >
              <div className="relative aspect-[16/7] w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl overflow-hidden rounded-sm border border-black/10 bg-white">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.4]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <img
                  src={current.image}
                  alt={current.title}
                  loading="lazy"
                  width={1280}
                  height={720}
                  className="absolute inset-0 h-full w-full object-contain p-4"
                />
                {[
                  "top-2.5 left-2.5",
                  "top-2.5 right-2.5",
                  "bottom-2.5 left-2.5",
                  "bottom-2.5 right-2.5",
                ].map((pos) => (
                  <span
                    key={pos}
                    className={`absolute ${pos} h-1 w-1 bg-black/40`}
                  />
                ))}
              </div>

              <div className="mt-6">
                <p className="mb-3 font-mono text-[10px] tracking-[0.34em] text-black/50">
                  {String(active + 1).padStart(2, "0")} &middot; {current.kicker}
                </p>
                <h3 className="font-display text-2xl tracking-tight md:text-3xl">
                  {current.title}
                </h3>
                <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-black/60">
                  {current.body}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
