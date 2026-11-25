import { expect, test } from "bun:test";
import { kits, packageManagers, startCommand } from "./content";

test("kits are zenith then orbit with their repositories", () => {
	expect(kits.map((kit) => kit.name)).toEqual(["zenith", "orbit"]);
	for (const kit of kits) expect(kit.repoUrl).toBe(`https://github.com/vandordev/vkit-${kit.name}`);
});

test("start commands use each package manager's runner", () => {
	expect(packageManagers.map((pm) => startCommand("zenith", pm))).toEqual([
		"bunx giget gh:vandordev/vkit-zenith my-app",
		"npx giget gh:vandordev/vkit-zenith my-app",
		"pnpm dlx giget gh:vandordev/vkit-zenith my-app",
	]);
});

test("every annotated path exists in the generated tree, so notes cannot go stale silently", () => {
	for (const kit of kits) {
		const names = new Set(kit.facts.tree.map((entry) => entry.name));
		for (const path of Object.keys(kit.notes)) expect(names.has(path) ? path : `${kit.name}: missing ${path}`).toBe(path);
	}
});

test("agent prompts start from the kit's own repository", () => {
	for (const kit of kits) expect(kit.agentPrompt).toContain(`giget gh:vandordev/vkit-${kit.name}`);
});

test("every node a decision or stack layer points at exists in that kit's graph", () => {
	for (const kit of kits) {
		const ids = new Set(kit.facts.graph.nodes.map((n) => n.id));
		const refs = [...kit.decisions.flatMap((d) => d.nodes), ...kit.stack.flatMap((l) => l.nodes)];
		for (const id of refs) expect(ids.has(id) ? id : `${kit.name}: missing ${id}`).toBe(id);
	}
});
