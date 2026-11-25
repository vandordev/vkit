// Pure helpers for scripts/gen-kits.ts; kept here so they are unit tested.

export type TreeEntry = { name: string; dir: boolean; children?: string[] };

export type KitFacts = {
	apps: number;
	packages: number;
	adrs: number;
	tables: number;
	tree: TreeEntry[];
};

const listed = (paths: readonly string[], parent: string) =>
	[...new Set(paths.filter((p) => p.startsWith(`${parent}/`)).map((p) => p.slice(parent.length + 1).split("/")[0]!))].sort();

/** Top-level entries (directories first), with the first level of `apps/` and `packages/` expanded. */
export function summarizeTree(paths: readonly string[]): Omit<KitFacts, "tables"> {
	const dirs = new Set(paths.filter((p) => p.includes("/")).map((p) => p.split("/")[0]!));
	const top = [...new Set(paths.map((p) => p.split("/")[0]!))];
	const tree = top
		.map((name): TreeEntry => ({ name, dir: dirs.has(name), ...(name === "apps" || name === "packages" ? { children: listed(paths, name) } : {}) }))
		.sort((a, b) => Number(b.dir) - Number(a.dir) || a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
	return {
		apps: listed(paths, "apps").length,
		packages: listed(paths, "packages").length,
		adrs: paths.filter((p) => /^docs\/adr\/\d{4}-[^/]+\.md$/.test(p)).length,
		tree,
	};
}

// zenith documents its schema in DBML; counting raw SQL would also catch River internals and conditional DDL.
export const countDbmlTables = (dbml: string) => (dbml.match(/^Table\s+\S+/gm) ?? []).length;

export const countPrismaModels = (schema: string) => (schema.match(/^model\s+\w+\s*\{/gm) ?? []).length;

export type GraphNode = { id: string; name: string; kind: "app" | "package"; lang: "go" | "ts" | "go+ts" };
export type GraphEdge = { from: string; to: string };
export type KitGraph = { nodes: GraphNode[]; edges: GraphEdge[] };

/** `apps/web/package.json` or `packages/config/go/go.mod` → `apps/web` / `packages/config` (the workspace unit). */
const unitOf = (path: string) => path.split("/").slice(0, 2).join("/");

/**
 * Runtime dependency graph between a kit's own apps and packages, from package.json `dependencies` on `@repo/*`
 * and go.mod `require`s of the kit's module paths. devDependencies (configs, tooling) are left out on purpose.
 */
export function buildGraph(manifests: readonly { path: string; text: string }[]): KitGraph {
	const nodes = new Map<string, GraphNode>();
	const byName = new Map<string, string>();
	const parsed = manifests.map(({ path, text }) => {
		const id = unitOf(path);
		const go = path.endsWith("go.mod");
		const existing = nodes.get(id);
		const lang = go ? "go" : "ts";
		nodes.set(id, {
			id,
			name: id.split("/")[1]!,
			kind: id.startsWith("apps/") ? "app" : "package",
			lang: existing && existing.lang !== lang ? "go+ts" : lang,
		});
		if (go) {
			const module = text.match(/^module\s+(\S+)/m)?.[1];
			if (module) byName.set(module, id);
			return { id, deps: [...text.matchAll(/^\s*(?:require\s+)?(\S+)\s+v\S+/gm)].map((m) => m[1]!) };
		}
		const json = JSON.parse(text) as { name?: string; dependencies?: Record<string, string> };
		if (json.name) byName.set(json.name, id);
		return { id, deps: Object.keys(json.dependencies ?? {}) };
	});
	const edges = new Map<string, GraphEdge>();
	for (const { id, deps } of parsed) {
		for (const dep of deps) {
			const to = byName.get(dep);
			if (to && to !== id) edges.set(`${id}>${to}`, { from: id, to });
		}
	}
	return {
		nodes: [...nodes.values()].sort((a, b) => a.id.localeCompare(b.id)),
		edges: [...edges.values()].sort((a, b) => `${a.from}${a.to}`.localeCompare(`${b.from}${b.to}`)),
	};
}

export type KitData = KitFacts & { commit: string; graph: KitGraph };

const langs = new Set<GraphNode["lang"]>(["go", "ts", "go+ts"]);
const kinds = new Set<GraphNode["kind"]>(["app", "package"]);

/** Narrows the generated JSON (typed as plain strings) at the edge; a bad regeneration fails the build, not the page. */
type RawKitData = Omit<KitData, "graph"> & { graph: { nodes: { id: string; name: string; kind: string; lang: string }[]; edges: GraphEdge[] } };

export function parseKitData(raw: RawKitData): KitData {
	const nodes = raw.graph.nodes.map((n) => {
		if (!kinds.has(n.kind as GraphNode["kind"]) || !langs.has(n.lang as GraphNode["lang"])) throw new Error(`kits.generated.json: bad node ${n.id}`);
		return n as GraphNode; // checked against the unions above
	});
	return { ...raw, graph: { nodes, edges: raw.graph.edges } };
}
