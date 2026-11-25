import { forceCollide, forceLink, forceManyBody, forceSimulation, forceX, forceY, type Simulation, type SimulationLinkDatum, type SimulationNodeDatum } from "d3-force";
import { useEffect, useRef, useState } from "react";
import { kits, type KitName } from "@/content";
import type { GraphNode } from "@/lib/kit-facts";

type SimNode = GraphNode & SimulationNodeDatum & { r: number; degree: number; born: number; half: number };
type SimLink = SimulationLinkDatum<SimNode> & { source: SimNode; target: SimNode };
type Hover = { node: SimNode; x: number; y: number } | null;

const langLabel = { go: "Go", ts: "TypeScript", "go+ts": "Go + TypeScript" } as const;

// Tooling-only packages (eslint/tsconfig) have no runtime edges; drawing them as floating islands adds noise.
const visibleGraph = (kit: KitName) => {
	const { graph } = kits.find((k) => k.name === kit)!.facts;
	const linked = new Set(graph.edges.flatMap((e) => [e.from, e.to]));
	return { nodes: graph.nodes.filter((n) => linked.has(n.id)), edges: graph.edges };
};

const hexPath = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
	ctx.beginPath();
	for (let i = 0; i < 6; i++) {
		const a = (Math.PI / 3) * i - Math.PI / 2;
		ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
	}
	ctx.closePath();
};

const readColors = () => {
	const css = getComputedStyle(document.documentElement);
	const v = (name: string) => css.getPropertyValue(name).trim();
	return { ink: v("--foreground"), mute: v("--muted-foreground"), line: v("--border"), bg: v("--background"), go: v("--viz-3"), ts: v("--viz-1"), mono: v("--font-mono") };
};

const selectedKit = (): KitName => (document.querySelector<HTMLInputElement>('input[name="kit"]:checked')?.value as KitName | undefined) ?? "zenith";

/**
 * The kit's real dependency graph (apps → packages) as Vandor hexagons under a force simulation. The pointer pushes
 * nodes, nodes can be dragged, hover shows a node's dependencies. Reduced motion renders one settled, static layout.
 */
export function ArchGraph() {
	const wrap = useRef<HTMLDivElement>(null);
	const canvas = useRef<HTMLCanvasElement>(null);
	const [hover, setHover] = useState<Hover>(null);
	const [ready, setReady] = useState(false);
	const [kit, setKit] = useState<KitName>("zenith");

	useEffect(() => {
		const sync = () => setKit(selectedKit());
		sync();
		document.addEventListener("change", sync);
		return () => document.removeEventListener("change", sync);
	}, []);

	useEffect(() => {
		const el = canvas.current;
		const box = wrap.current;
		const ctx = el?.getContext("2d");
		if (!el || !box || !ctx) return;
		setReady(true);

		const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
		let colors = readColors();
		let width = 0;
		let height = 0;
		let frame = 0;
		let visible = true;
		let pointer: { x: number; y: number } | null = null;
		let dragged: SimNode | null = null;
		let hovered: SimNode | null = null;
		let nodes: SimNode[] = [];
		let links: SimLink[] = [];
		let mixed = false;
		const previous = new Map<string, { x: number; y: number }>();

		const sim: Simulation<SimNode, SimLink> = forceSimulation<SimNode, SimLink>()
			.force("charge", forceManyBody<SimNode>().strength((n) => (-260 - n.degree * 30) * Math.min(1, Math.max(0.4, width / 720))))
			.force("collide", forceCollide<SimNode>((n) => n.r + 18).iterations(2))
			// Two-language kits get lanes (Go left, TypeScript right); single-language kits use the full width.
			.force("x", forceX<SimNode>((n) => width * (!mixed ? 0.5 : n.lang === "go" ? 0.3 : n.lang === "ts" ? 0.72 : 0.5)).strength(0.09))
			.force("y", forceY<SimNode>((n) => (n.kind === "app" ? height * 0.28 : height * 0.66)).strength(0.14))
			.force("pointer", (alpha) => {
				if (!pointer || dragged || reduced) return;
				for (const n of nodes) {
					const dx = (n.x ?? 0) - pointer.x;
					const dy = (n.y ?? 0) - pointer.y;
					const d2 = dx * dx + dy * dy;
					if (d2 > 110 * 110 || d2 === 0) continue;
					const push = ((110 - Math.sqrt(d2)) / 110) * 2.4 * alpha;
					n.vx = (n.vx ?? 0) + dx * push * 0.08;
					n.vy = (n.vy ?? 0) + dy * push * 0.08;
				}
			})
			.force("drift", () => {
				if (reduced || dragged) return;
				const t = performance.now() / 1000;
				nodes.forEach((n, i) => {
					n.vx = (n.vx ?? 0) + Math.sin(t * 0.6 + i * 1.7) * 0.018;
					n.vy = (n.vy ?? 0) + Math.cos(t * 0.5 + i * 2.3) * 0.018;
				});
			})
			.force("bounds", () => {
				// Keep every hexagon (and its label) inside the stage.
				for (const n of nodes) {
					const edge = Math.max(n.r, n.half) + 8;
					n.x = Math.max(edge, Math.min(width - edge, n.x ?? 0));
					n.y = Math.max(n.r + 10, Math.min(height - n.r - 26, n.y ?? 0));
				}
			})
			.alphaDecay(reduced ? 0.0228 : 0.018)
			.velocityDecay(0.32)
			.alphaMin(0.004)
			.stop();

		const load = (name: KitName) => {
			for (const n of nodes) previous.set(n.id, { x: n.x ?? 0, y: n.y ?? 0 });
			const graph = visibleGraph(name);
			mixed = graph.nodes.some((n) => n.lang === "go") && graph.nodes.some((n) => n.lang === "ts");
			ctx.font = `500 11px ${colors.mono}`;
			const degree = new Map<string, number>();
			for (const e of graph.edges) for (const id of [e.from, e.to]) degree.set(id, (degree.get(id) ?? 0) + 1);
			const now = performance.now();
			const order = [...graph.nodes].sort((a, b) => Number(b.kind === "app") - Number(a.kind === "app") || (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0));
			const delay = new Map(order.map((n, i) => [n.id, i * 45]));
			nodes = graph.nodes.map((n) => {
				const d = degree.get(n.id) ?? 0;
				const at = previous.get(n.id);
				return {
					...n,
					degree: d,
					r: (n.kind === "app" ? 24 : 14 + Math.min(d, 8) * 1.3) * Math.min(1, Math.max(0.62, width / 720)),
					x: at?.x ?? width / 2 + (Math.random() - 0.5) * 80,
					y: at?.y ?? height / 2 + (Math.random() - 0.5) * 80,
					born: at || reduced ? 0 : now + (delay.get(n.id) ?? 0),
					half: ctx.measureText(n.name).width / 2,
				};
			});
			const byId = new Map(nodes.map((n) => [n.id, n]));
			links = graph.edges.map((e) => ({ source: byId.get(e.from)!, target: byId.get(e.to)! }));
			sim.nodes(nodes).force("link", forceLink<SimNode, SimLink>(links).distance(Math.min(92, Math.max(48, width / 8))).strength(0.32));
			sim.alpha(1);
			if (reduced) {
				sim.tick(320);
				draw();
			}
		};

		const neighbors = (n: SimNode) => new Set(links.flatMap((l) => (l.source === n ? [l.target.id] : l.target === n ? [l.source.id] : [])));

		const draw = () => {
			const now = performance.now();
			ctx.clearRect(0, 0, width, height);
			const focus = hovered ? neighbors(hovered) : null;
			ctx.lineWidth = 1;
			for (const l of links) {
				const shown = Math.min(...[l.source, l.target].map((n) => (n.born ? Math.max(0, Math.min(1, (now - n.born - 260) / 400)) : 1)));
				if (!shown) continue;
				const lit = hovered && (l.source === hovered || l.target === hovered);
				ctx.strokeStyle = lit ? colors.ink : colors.line;
				ctx.globalAlpha = (hovered && !lit ? 0.35 : lit ? 0.9 : 0.85) * shown;
				ctx.beginPath();
				ctx.moveTo(l.source.x ?? 0, l.source.y ?? 0);
				ctx.lineTo(l.target.x ?? 0, l.target.y ?? 0);
				ctx.stroke();
			}
			ctx.font = `500 11px ${colors.mono}`;
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			for (const n of nodes) {
				const grow = n.born ? Math.max(0, Math.min(1, (now - n.born) / 520)) : 1;
				const ease = 1 - Math.pow(1 - grow, 3);
				const dim = focus && hovered !== n && !focus.has(n.id);
				const x = n.x ?? 0;
				const y = n.y ?? 0;
				const r = n.r * ease * (hovered === n ? 1.14 : 1);
				ctx.globalAlpha = (dim ? 0.25 : 1) * ease;
				const tint = n.lang === "go" ? colors.go : colors.ts;
				hexPath(ctx, x, y, r);
				if (n.kind === "app") {
					ctx.fillStyle = tint;
					ctx.fill();
				} else {
					ctx.fillStyle = colors.bg;
					ctx.fill();
					ctx.lineWidth = 1.6;
					ctx.strokeStyle = tint;
					ctx.stroke();
					ctx.lineWidth = 1;
				}
				if (n.lang === "go+ts") {
					// Both languages: the right half carries the second tint.
					ctx.save();
					hexPath(ctx, x, y, r);
					ctx.clip();
					ctx.fillStyle = colors.go;
					ctx.fillRect(x, y - r, r, r * 2);
					ctx.restore();
				}
				ctx.fillStyle = dim ? colors.mute : colors.ink;
				ctx.fillText(n.name, x, y + r + 5);
			}
			ctx.globalAlpha = 1;
		};

		const loop = () => {
			frame = 0;
			if (!visible || reduced) return;
			sim.tick();
			draw();
			frame = requestAnimationFrame(loop);
		};
		const wake = () => {
			if (!frame && visible && !reduced) frame = requestAnimationFrame(loop);
		};

		const resize = () => {
			const rect = box.getBoundingClientRect();
			width = rect.width;
			height = rect.height;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			el.width = Math.round(width * dpr);
			el.height = Math.round(height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			sim.alpha(Math.max(sim.alpha(), 0.3));
			if (reduced) {
				sim.tick(120);
				draw();
			}
			wake();
		};

		const nodeAt = (x: number, y: number) => {
			let best: SimNode | null = null;
			let bestD = Infinity;
			for (const n of nodes) {
				const d = Math.hypot((n.x ?? 0) - x, (n.y ?? 0) - y);
				if (d < n.r + 6 && d < bestD) {
					best = n;
					bestD = d;
				}
			}
			return best;
		};
		const local = (e: PointerEvent) => {
			const rect = el.getBoundingClientRect();
			return { x: e.clientX - rect.left, y: e.clientY - rect.top };
		};
		const onMove = (e: PointerEvent) => {
			const p = local(e);
			pointer = p;
			if (dragged) {
				dragged.fx = p.x;
				dragged.fy = p.y;
				sim.alphaTarget(0.25);
			}
			const n = dragged ?? nodeAt(p.x, p.y);
			hovered = n;
			el.style.cursor = dragged ? "grabbing" : n ? "grab" : "default";
			setHover(n ? { node: n, x: n.x ?? 0, y: n.y ?? 0 } : null);
			if (!reduced) sim.alpha(Math.max(sim.alpha(), 0.12));
			wake();
			if (reduced) draw();
		};
		const onDown = (e: PointerEvent) => {
			const p = local(e);
			const n = nodeAt(p.x, p.y);
			if (!n) return;
			dragged = n;
			n.fx = p.x;
			n.fy = p.y;
			el.setPointerCapture(e.pointerId);
		};
		const onUp = (e: PointerEvent) => {
			if (!dragged) return;
			dragged.fx = null;
			dragged.fy = null;
			dragged = null;
			sim.alphaTarget(0);
			el.releasePointerCapture(e.pointerId);
			wake();
		};
		const onLeave = () => {
			pointer = null;
			hovered = null;
			setHover(null);
			wake();
			if (reduced) draw();
		};

		const sizeObserver = new ResizeObserver(resize);
		sizeObserver.observe(box);
		const viewObserver = new IntersectionObserver(([entry]) => {
			visible = entry?.isIntersecting ?? true;
			wake();
		});
		viewObserver.observe(box);
		const themeObserver = new MutationObserver(() => {
			colors = readColors();
			draw();
		});
		themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
		const onKit = () => {
			load(selectedKit());
			wake();
		};
		document.addEventListener("change", onKit);
		el.addEventListener("pointermove", onMove);
		el.addEventListener("pointerdown", onDown);
		el.addEventListener("pointerup", onUp);
		el.addEventListener("pointerleave", onLeave);

		resize();
		load(selectedKit());
		wake();

		return () => {
			cancelAnimationFrame(frame);
			sim.stop();
			sizeObserver.disconnect();
			viewObserver.disconnect();
			themeObserver.disconnect();
			document.removeEventListener("change", onKit);
			el.removeEventListener("pointermove", onMove);
			el.removeEventListener("pointerdown", onDown);
			el.removeEventListener("pointerup", onUp);
			el.removeEventListener("pointerleave", onLeave);
		};
	}, []);

	const { edges } = visibleGraph(kit);
	const deps = (id: string) => edges.filter((e) => e.from === id).map((e) => e.to.split("/")[1]);
	const users = (id: string) => edges.filter((e) => e.to === id).map((e) => e.from.split("/")[1]);

	return (
		<div className="vk-graph" ref={wrap}>
			<canvas ref={canvas} aria-hidden="true" />
			{kits.map((k) => {
				const graph = visibleGraph(k.name);
				return (
					<ul key={k.name} className="vk-graph__list" data-kit={k.name} data-ready={ready || undefined} aria-label={`${k.name} apps and the packages they depend on`}>
						{graph.nodes
							.filter((n) => n.kind === "app")
							.map((n) => (
								<li key={n.id}>
									<b>{n.id}</b> ({langLabel[n.lang]}) → {graph.edges.filter((e) => e.from === n.id).map((e) => e.to.split("/")[1]).join(", ")}
								</li>
							))}
					</ul>
				);
			})}
			{hover ? (
				<div className="vk-graph__tip" style={{ left: hover.x, top: hover.y - hover.node.r - 12 }} role="status">
					<p className="vk-graph__tip-title">
						{hover.node.id} <span>{langLabel[hover.node.lang]}</span>
					</p>
					{deps(hover.node.id).length ? <p>uses {deps(hover.node.id).join(", ")}</p> : null}
					{users(hover.node.id).length ? <p>used by {users(hover.node.id).join(", ")}</p> : null}
				</div>
			) : null}
		</div>
	);
}
