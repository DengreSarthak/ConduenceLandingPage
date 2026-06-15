"use client";

import { motion } from "framer-motion";

import { EDGES, GRAPH_VIEWBOX, NODES, curvePath, node, spinePath, type GraphEdge } from "./graph";

const EASE = [0.22, 1, 0.36, 1] as const;

const EDGE_COLOR: Record<GraphEdge["kind"], string> = {
  link: "rgba(255, 255, 255, 0.37)",
  feed: "rgba(255, 255, 255, 0.58)",
  spine: "rgba(255, 255, 255, 0.51)",
};
const EDGE_WIDTH: Record<GraphEdge["kind"], number> = {
  link: 0.8,
  feed: 1.0,
  spine: 1.3,
};

// Extra faint strands that make the Reasoning→Execution spine feel like a
// flowing bundle of wires rather than a single line.
const EXTRA_STRANDS: { a: string; b: string; bend: number }[] = [
  { a: "reasoning", b: "prediction", bend: -8 },
  { a: "reasoning", b: "prediction", bend: -40 },
  { a: "prediction", b: "execution", bend: -4 },
  { a: "prediction", b: "execution", bend: -32 },
];

export function IntelligenceGraph({ reduceMotion }: { reduceMotion: boolean }) {
  const spine = spinePath();

  return (
    <svg
      aria-hidden
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${GRAPH_VIEWBOX.w} ${GRAPH_VIEWBOX.h}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        {/* Soft double-exposure glow — used on edges and bright nodes. */}
        <filter id="ig-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Larger halo for the Execution node + breathing rings. */}
        <filter id="ig-halo" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9" />
        </filter>
        <radialGradient id="ig-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Extra spine bundle strands (behind everything) ── */}
      {EXTRA_STRANDS.map((s, i) => (
        <motion.path
          key={`xs-${i}`}
          d={curvePath(node(s.a), node(s.b), s.bend)}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={0.7}
          initial={{ pathLength: reduceMotion ? 1 : 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: reduceMotion ? 0 : 2, delay: 0.5, ease: EASE },
            opacity: { duration: 1.4, delay: 0.5 },
          }}
        />
      ))}

      {/* ── All edges draw in staggered ── */}
      {EDGES.map((e, i) => (
        <motion.path
          key={`e-${e.from}-${e.to}`}
          d={curvePath(node(e.from), node(e.to), e.bend)}
          fill="none"
          stroke={EDGE_COLOR[e.kind]}
          strokeWidth={EDGE_WIDTH[e.kind]}
          strokeLinecap="round"
          initial={{ pathLength: reduceMotion ? 1 : 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            pathLength: { duration: reduceMotion ? 0 : 1.6, delay: i * 0.06, ease: EASE },
            opacity: { duration: 1.0, delay: i * 0.06 },
          }}
        />
      ))}

      {/* ── Staggered signal pulses: each source → Reasoning ── */}
      {!reduceMotion &&
        EDGES.filter((e) => e.kind === "feed").map((e, i) => (
          <motion.path
            key={`fp-${e.from}`}
            d={curvePath(node(e.from), node(e.to), e.bend)}
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth={1.5}
            strokeLinecap="round"
            filter="url(#ig-glow)"
            pathLength={1}
            strokeDasharray="0.09 1"
            initial={{ strokeDashoffset: 1, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: [0, 1, 1, 0] }}
            transition={{
              strokeDashoffset: {
                duration: 3.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 3.2,
                delay: 1.6 + i * 0.55,
              },
              opacity: {
                duration: 3.8,
                times: [0, 0.08, 0.88, 1],
                repeat: Infinity,
                repeatDelay: 3.2,
                delay: 1.6 + i * 0.55,
              },
            }}
          />
        ))}

      {/* ── Conviction pulse: Reasoning → Prediction → Execution ── */}
      {!reduceMotion && (
        <>
          {/* outer glow corona */}
          <motion.path
            d={spine}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={5}
            strokeLinecap="round"
            filter="url(#ig-glow)"
            pathLength={1}
            strokeDasharray="0.15 1"
            initial={{ strokeDashoffset: 1 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 4.8,
              ease: [0.45, 0, 0.55, 1],
              repeat: Infinity,
              repeatDelay: 1.4,
              delay: 2.6,
            }}
          />
          {/* bright inner core */}
          <motion.path
            d={spine}
            fill="none"
            stroke="rgba(255,255,255,0.97)"
            strokeWidth={1.5}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="0.07 1.1"
            initial={{ strokeDashoffset: 1 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{
              duration: 4.8,
              ease: [0.45, 0, 0.55, 1],
              repeat: Infinity,
              repeatDelay: 1.4,
              delay: 2.6,
            }}
          />
        </>
      )}

      {/* ── Nodes + labels ── */}
      {NODES.map((n, i) => {
        const isExec = n.kind === "exec";
        const isHub = n.kind === "hub";
        const r = isExec ? 5.8 : isHub ? 4.4 : 3.4;

        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.35 + i * 0.07 }}
          >
            {/* Soft halo — breathes slowly on all nodes */}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={r * (isExec ? 5.5 : 3.5)}
              fill="url(#ig-radial)"
              filter="url(#ig-halo)"
              animate={
                reduceMotion
                  ? { opacity: isExec ? 0.35 : 0.12 }
                  : { opacity: isExec ? [0.25, 0.45, 0.25] : [0.07, 0.16, 0.07] }
              }
              transition={{
                duration: isExec ? 4 : 5 + (i % 3),
                repeat: reduceMotion ? 0 : Infinity,
                ease: "easeInOut",
                delay: i * 0.18,
              }}
            />

            {/* Expanding ring — Execution only */}
            {isExec && !reduceMotion && (
              <motion.circle
                cx={n.x}
                cy={n.y}
                r={r * 2.6}
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={0.9}
                animate={{ opacity: [0, 0.5, 0], scale: [0.7, 1.5, 1.9] }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeOut" }}
              />
            )}

            {/* Node core */}
            <circle
              cx={n.x}
              cy={n.y}
              r={r}
              fill={isExec ? "#ffffff" : "rgba(248,250,255,0.88)"}
              filter="url(#ig-glow)"
            />

            {/* Label */}
            <text
              x={n.x + n.lp.dx}
              y={n.y + n.lp.dy}
              textAnchor={n.lp.anchor}
              dominantBaseline="middle"
              fill={
                isExec
                  ? "rgba(255,255,255,0.92)"
                  : isHub
                    ? "rgba(255,255,255,0.7)"
                    : "rgba(255,255,255,0.52)"
              }
              fontSize={isExec ? 14 : isHub ? 13.5 : 12.5}
              fontWeight={isExec || isHub ? 500 : 400}
              letterSpacing={0.3}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {n.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
