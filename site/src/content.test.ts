import { expect, test } from "bun:test";
import { kits } from "./content";

test("kits are zenith then orbit", () => {
	expect(kits.map((kit) => kit.name)).toEqual(["zenith", "orbit"]);
});

test("each kit has the exact start command and repository URL", () => {
	for (const kit of kits) {
		expect(kit.startCommand).toBe(`bunx giget gh:vandordev/vkit-${kit.name} my-app`);
		expect(kit.repoUrl).toBe(`https://github.com/vandordev/vkit-${kit.name}`);
	}
});
