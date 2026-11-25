// Regenerates src/kits.generated.json from the kits' public GitHub repositories (main branch).
// Run: bun run gen:kits. GITHUB_TOKEN is optional and only raises the API rate limit.
import { buildGraph, countDbmlTables, countPrismaModels, summarizeTree, type KitFacts, type KitGraph } from "../src/lib/kit-facts";

const kits = {
	zenith: { schema: { kind: "dbml", path: "packages/db/schema.dbml" } },
	orbit: { schema: { kind: "prisma", path: "packages/db/prisma/schema.prisma" } },
} as const;

const headers: Record<string, string> = { Accept: "application/vnd.github+json", "User-Agent": "vkit-site-gen" };
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function fetchOk(url: string): Promise<Response> {
	const response = await fetch(url, { headers });
	if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
	return response;
}

const out: Record<string, KitFacts & { commit: string; graph: KitGraph }> = {};
for (const [name, { schema }] of Object.entries(kits)) {
	const repo = `vandordev/vkit-${name}`;
	const tree = (await (await fetchOk(`https://api.github.com/repos/${repo}/git/trees/main?recursive=1`)).json()) as {
		sha: string;
		truncated: boolean;
		tree: { path: string; type: string }[];
	};
	if (tree.truncated) throw new Error(`${repo}: tree truncated, counts would be wrong`);
	const files = tree.tree.filter((e) => e.type === "blob").map((e) => e.path);
	const schemaFiles = files.filter((p) => p === schema.path);
	if (schemaFiles.length !== 1) throw new Error(`${repo}: schema file ${schema.path} not found`);
	const texts = await Promise.all(schemaFiles.map(async (p) => (await fetchOk(`https://raw.githubusercontent.com/${repo}/${tree.sha}/${p}`)).text()));
	const tables = texts.reduce((n, t) => n + (schema.kind === "dbml" ? countDbmlTables(t) : countPrismaModels(t)), 0);
	const raw = async (p: string) => ({ path: p, text: await (await fetchOk(`https://raw.githubusercontent.com/${repo}/${tree.sha}/${p}`)).text() });
	const manifests = await Promise.all(files.filter((p) => /^(apps|packages)\/[^/]+\/([^/]+\/)?(package\.json|go\.mod)$/.test(p)).map(raw));
	out[name] = { ...summarizeTree(files), tables, commit: tree.sha, graph: buildGraph(manifests) };
}

await Bun.write(new URL("../src/kits.generated.json", import.meta.url), `${JSON.stringify(out, null, "\t")}\n`);
console.log(Object.entries(out).map(([k, v]) => `${k}: ${v.apps} apps, ${v.packages} packages, ${v.adrs} ADRs, ${v.tables} tables, ${v.graph.nodes.length} nodes / ${v.graph.edges.length} edges @ ${v.commit.slice(0, 7)}`).join("\n"));
