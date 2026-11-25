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
