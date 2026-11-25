import { expect, test } from "bun:test";
import { countDbmlTables, countPrismaModels, summarizeTree } from "./kit-facts";

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
