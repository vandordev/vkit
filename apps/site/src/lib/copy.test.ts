import { expect, mock, test } from "bun:test";
import { copyText } from "./copy";

test("resolving clipboard reports copied and receives the text", async () => {
	const writeText = mock(async (_text: string) => {});
	expect(await copyText("bunx giget x", { writeText })).toBe("copied");
	expect(writeText).toHaveBeenCalledWith("bunx giget x");
});

test("rejecting clipboard reports failed", async () => {
	const writeText = mock(async (_text: string) => {
		throw new Error("denied");
	});
	expect(await copyText("x", { writeText })).toBe("failed");
});

test("missing clipboard reports failed", async () => {
	expect(await copyText("x", undefined)).toBe("failed");
});
