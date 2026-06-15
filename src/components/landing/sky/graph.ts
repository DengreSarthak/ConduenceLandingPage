/**
 * Reasoning-network graph data.
 *
 * Six signal sources (News, Research, Socials, Whales, On-chain, Macro Data)
 * converge through a Reasoning hub into Prediction and finally Execution.
 * Coordinates are in a 1440 × 900 viewBox, matched to the reference composition
 * so the graph feels like it emerges naturally from the sky image behind it.
 *
 * labelDx / labelDy — offset from the node centre to the label anchor.
 * anchor            — SVG text-anchor value.
 */

export type LabelPos = {
  dx: number;
  dy: number;
  anchor: "start" | "middle" | "end";
};

export type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  kind: "source" | "hub" | "stage" | "exec";
  lp: LabelPos;
};

export type GraphEdge = {
  from: string;
  to: string;
  bend: number;
  kind: "feed" | "link" | "spine";
};

export const GRAPH_VIEWBOX = { w: 1440, h: 900 };

export const NODES: GraphNode[] = [
  // ── signal sources ─────────────────────────────────────────────────────────
  {
    id: "news",
    label: "News",
    x: 148,
    y: 148,
    kind: "source",
    lp: { dx: 14, dy: -14, anchor: "start" },
  },
  {
    id: "research",
    label: "Research",
    x: 462,
    y: 118,
    kind: "source",
    lp: { dx: 14, dy: -2, anchor: "start" },
  },
  {
    id: "socials",
    label: "Socials",
    x: 190,
    y: 238,
    kind: "source",
    lp: { dx: -14, dy: 5, anchor: "end" },
  },
  {
    id: "whales",
    label: "Whales",
    x: 398,
    y: 258,
    kind: "source",
    lp: { dx: 14, dy: -12, anchor: "start" },
  },
  {
    id: "onchain",
    label: "On-chain",
    x: 166,
    y: 330,
    kind: "source",
    lp: { dx: -14, dy: 5, anchor: "end" },
  },
  {
    id: "macro",
    label: "Macro Data",
    x: 348,
    y: 370,
    kind: "source",
    lp: { dx: 14, dy: 18, anchor: "start" },
  },
  // ── convergence ────────────────────────────────────────────────────────────
  {
    id: "reasoning",
    label: "Reasoning",
    x: 786,
    y: 218,
    kind: "hub",
    lp: { dx: 14, dy: -14, anchor: "start" },
  },
  {
    id: "prediction",
    label: "Prediction",
    x: 1040,
    y: 258,
    kind: "stage",
    lp: { dx: -14, dy: -14, anchor: "end" },
  },
  {
    id: "execution",
    label: "Execution",
    x: 1256,
    y: 296,
    kind: "exec",
    lp: { dx: 18, dy: 5, anchor: "start" },
  },
];

export const EDGES: GraphEdge[] = [
  // ── six signals fan into the reasoning hub ─────────────────────────────────
  { from: "news", to: "reasoning", bend: -48, kind: "feed" },
  { from: "research", to: "reasoning", bend: -28, kind: "feed" },
  { from: "socials", to: "reasoning", bend: 28, kind: "feed" },
  { from: "whales", to: "reasoning", bend: 6, kind: "feed" },
  { from: "onchain", to: "reasoning", bend: 56, kind: "feed" },
  { from: "macro", to: "reasoning", bend: 72, kind: "feed" },
  // ── knowledge-graph cross-links between sources ─────────────────────────────
  { from: "news", to: "research", bend: 28, kind: "link" },
  { from: "news", to: "socials", bend: 16, kind: "link" },
  { from: "socials", to: "whales", bend: -18, kind: "link" },
  { from: "research", to: "whales", bend: 24, kind: "link" },
  { from: "onchain", to: "socials", bend: -16, kind: "link" },
  { from: "whales", to: "macro", bend: -22, kind: "link" },
  // ── the conviction spine ───────────────────────────────────────────────────
  { from: "reasoning", to: "prediction", bend: -24, kind: "spine" },
  { from: "prediction", to: "execution", bend: -18, kind: "spine" },
];

export function node(id: string): GraphNode {
  const n = NODES.find((x) => x.id === id);
  if (!n) throw new Error(`unknown node: ${id}`);
  return n;
}

/** Quadratic bezier arc, bowed perpendicular by `bend` viewBox units. */
export function curvePath(a: GraphNode, b: GraphNode, bend: number): string {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * bend;
  const cy = my + (dx / len) * bend;
  return `M ${a.x} ${a.y} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${b.x} ${b.y}`;
}

/** Continuous compound path: Reasoning → Prediction → Execution (the pulse spine). */
export function spinePath(): string {
  const r = node("reasoning");
  const p = node("prediction");
  const e = node("execution");
  const ctrl = (a: GraphNode, b: GraphNode, bend: number) => {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    return {
      cx: mx + (-(b.y - a.y) / len) * bend,
      cy: my + ((b.x - a.x) / len) * bend,
    };
  };
  const c1 = ctrl(r, p, -24);
  const c2 = ctrl(p, e, -18);
  return (
    `M ${r.x} ${r.y} ` +
    `Q ${c1.cx.toFixed(1)} ${c1.cy.toFixed(1)} ${p.x} ${p.y} ` +
    `Q ${c2.cx.toFixed(1)} ${c2.cy.toFixed(1)} ${e.x} ${e.y}`
  );
}
