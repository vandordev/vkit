export type Kit = {
	name: "zenith" | "orbit";
	backend: "Go" | "TypeScript";
	summary: string;
	stack: string;
	repoUrl: string;
	startCommand: string;
};

const kit = (name: Kit["name"], fields: Pick<Kit, "backend" | "summary" | "stack">): Kit => ({
	name,
	...fields,
	repoUrl: `https://github.com/vandordev/vkit-${name}`,
	startCommand: `bunx giget gh:vandordev/vkit-${name} my-app`,
});

export const kits: readonly Kit[] = [
	kit("zenith", {
		backend: "Go",
		summary:
			"Multi-tenant SaaS foundation with customer auth, organizations and memberships, a staff backoffice with audit, and a public API keyed by organization API keys.",
		stack: "Go (Echo, Huma, pgx, River) · TypeScript frontend (TanStack Start) · PostgreSQL",
	}),
	kit("orbit", {
		backend: "TypeScript",
		summary:
			"A complete reference application for document processing that shows the architecture end to end. Start from it and replace the domain.",
		stack: "TanStack Start + tRPC · Elysia public API · Prisma · BullMQ/Redis worker and scheduler · S3-compatible storage · Socket.IO realtime",
	}),
];

export const hero = {
	title: "Production foundations for web products",
	lead: "vkit collects Vandor's kits: real, running codebases to start a product from. Today you start from a kit in one command; next, you compose one.",
} as const;

export const nextSteps: readonly { version: string; text: string }[] = [
	{ version: "v1", text: "A generator that composes a project from the kits' pieces: pick a backend, keep the TypeScript frontend." },
	{ version: "v2", text: "Setups you add to a running project later: storage, cache, queue, payments." },
];

export const repoUrl = "https://github.com/vandordev/vkit";
export const roadmapUrl = `${repoUrl}/blob/main/ROADMAP.md`;
// replaced by the real URL after the Vercel import (Task 14)
export const siteUrl = "https://vkit.vercel.app";
