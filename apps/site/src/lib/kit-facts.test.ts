import { expect, test } from "bun:test";
import { buildGraph, countDbmlTables, countPrismaModels, parseKitData, summarizeTree } from "./kit-facts";

test("summarizeTree counts apps, packages and numbered ADRs, dirs first", () => {
	const facts = summarizeTree([
		"README.md",
		"apps/web/package.json",
		"apps/web/src/main.tsx",
		"apps/api/go.mod",
		"packages/db/schema.sql",
		"docs/adr/0001-phased.md",
		"docs/adr/0002-tenancy.md",
		"docs/adr/README.md",
		"AGENTS.md",
	]);
	expect(facts.apps).toBe(2);
	expect(facts.packages).toBe(1);
	expect(facts.adrs).toBe(2);
	expect(facts.adrFiles).toEqual(["0001-phased.md", "0002-tenancy.md"]);
	expect(facts.tree.map((e) => e.name)).toEqual(["apps", "docs", "packages", "AGENTS.md", "README.md"]);
	expect(facts.tree[0]).toEqual({ name: "apps", dir: true, children: ["api", "web"] });
	expect(facts.tree[1]).toEqual({ name: "docs", dir: true });
});

test("countDbmlTables counts top-level Table blocks only", () => {
	expect(countDbmlTables("Table users {\n  id uuid\n}\nEnum role {\n}\nTable orgs as O {\n}\n// Table ignored\n")).toBe(2);
});

test("countPrismaModels counts model blocks only", () => {
	expect(countPrismaModels("model User {\n}\nenum Role {\n}\nmodel Doc {\n}\n")).toBe(2);
});

test("buildGraph links apps and packages through runtime deps only, across Go and TypeScript", () => {
	const graph = buildGraph([
		{ path: "apps/web/package.json", text: JSON.stringify({ name: "web", dependencies: { "@repo/ui": "*", react: "^19" }, devDependencies: { "@repo/eslint-config": "*" } }) },
		{ path: "packages/ui/package.json", text: JSON.stringify({ name: "@repo/ui" }) },
		{ path: "packages/eslint-config/package.json", text: JSON.stringify({ name: "@repo/eslint-config" }) },
		{ path: "apps/api/go.mod", text: "module example.com/kit/apps/api\n\nrequire (\n\texample.com/kit/packages/db v0.0.0\n\tgithub.com/x/y v1.2.3\n)\n" },
		{ path: "packages/db/go.mod", text: "module example.com/kit/packages/db\n\nrequire example.com/kit/packages/config v0.0.0\n" },
		{ path: "packages/config/go/go.mod", text: "module example.com/kit/packages/config\n" },
		{ path: "packages/config/js/package.json", text: JSON.stringify({ name: "@repo/config" }) },
	]);
	expect(graph.edges).toEqual([
		{ from: "apps/api", to: "packages/db" },
		{ from: "apps/web", to: "packages/ui" },
		{ from: "packages/db", to: "packages/config" },
	]);
	expect(graph.nodes.find((n) => n.id === "packages/config")).toEqual({ id: "packages/config", name: "config", kind: "package", lang: "go+ts" });
	expect(graph.nodes.find((n) => n.id === "apps/api")?.lang).toBe("go");
});

test("parseKitData accepts the committed generated file and rejects unknown node kinds", async () => {
	const generated = (await import("../kits.generated.json")).default;
	expect(parseKitData(generated.zenith).graph.nodes.length).toBeGreaterThan(0);
	expect(parseKitData(generated.orbit).graph.edges.length).toBeGreaterThan(0);
	const bad = { ...generated.orbit, graph: { ...generated.orbit.graph, nodes: [{ id: "x", name: "x", kind: "service", lang: "ts" }] } };
	expect(() => parseKitData(bad)).toThrow("bad node x");
});
