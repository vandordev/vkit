import {
	siBun,
	siCloudflare,
	siDocker,
	siGo,
	siMinio,
	siOpenapiinitiative,
	siPostgresql,
	siPrisma,
	siReact,
	siRedis,
	siResend,
	siSocketdotio,
	siStorybook,
	siTailwindcss,
	siTask,
	siTrpc,
	siTurborepo,
	siTypescript,
	siZod,
	type SimpleIcon,
} from "simple-icons";
import generated from "./kits.generated.json";
import { parseKitData, type KitData } from "./lib/kit-facts";

export const kitNames = ["zenith", "orbit"] as const;
export type KitName = (typeof kitNames)[number];

export const packageManagers = ["bun", "npm", "pnpm"] as const;
export type PackageManager = (typeof packageManagers)[number];

const runners: Record<PackageManager, string> = { bun: "bunx", npm: "npx", pnpm: "pnpm dlx" };

export const startCommand = (kit: KitName, pm: PackageManager) => `${runners[pm]} giget gh:vandordev/vkit-${kit} my-app`;

export type Decision = { title: string; text: string; source: string };

/** A technology with its Simple Icons logo; tools without one in Simple Icons render as a monogram, never a guessed logo. */
export type Tech = { name: string; role: string; icon?: SimpleIcon };
export type StackLayer = { layer: "Backend" | "Frontend" | "Data and jobs" | "Tooling"; items: readonly Tech[] };

export type Kit = {
	name: KitName;
	backend: "Go" | "TypeScript";
	summary: string;
	stackLine: string;
	repoUrl: string;
	facts: KitData;
	tablesLabel: string;
	/** One line per top-level path a visitor would ask about; unlisted paths show without a note. */
	notes: Record<string, string>;
	decisionsTitle: string;
	decisions: readonly Decision[];
	agentPrompt: string;
	stack: readonly StackLayer[];
};

const repo = (name: KitName) => `https://github.com/vandordev/vkit-${name}`;
const blob = (name: KitName, path: string) => `${repo(name)}/blob/main/${path}`;

export const kits: readonly Kit[] = [
	{
		name: "zenith",
		backend: "Go",
		summary: "Multi-tenant SaaS foundation: customer auth, organizations and memberships, a staff backoffice with audit, and a public API keyed by organization API keys.",
		stackLine: "Go (Echo, Huma, pgx, River) · TanStack Start · PostgreSQL",
		repoUrl: repo("zenith"),
		facts: parseKitData(generated.zenith),
		tablesLabel: "tables in the baseline",
		notes: {
			apps: "Three Go APIs, a River worker, and the TypeScript web, backoffice and landing apps.",
			packages: "Usecases, database, config, brand, UI and email, shared by the apps.",
			contracts: "OpenAPI documents exported from the Go APIs; clients are generated from them.",
			docs: "ADRs, specs and plans: the reasons behind the code.",
			config: "One typed config.yaml for every runtime.",
			"AGENTS.md": "The map your coding agent reads first.",
			"PRODUCT.md": "What the product is; replace it with yours.",
			"Taskfile.yml": "Install, generate, check and run, one task each.",
		},
		decisionsTitle: "Decisions, written down as ADRs",
		decisions: [
			{
				title: "Schema, then UI, then functionality",
				text: "Every capability ships in three phases: migration and schema first, then screens on dummy endpoints, then the real behavior.",
				source: blob("zenith", "docs/adr/0001-phased-delivery.md"),
			},
			{
				title: "Tenancy enforced by the database",
				text: "Every tenant-owned row carries a NOT NULL organization_id with a foreign key; composite keys keep children in their parent's organization.",
				source: blob("zenith", "docs/adr/0002-tenancy.md"),
			},
			{
				title: "Every write goes through a usecase",
				text: "Usecases own validation, authorization, locks, the transaction and the audit event, whoever the caller is.",
				source: blob("zenith", "docs/adr/0004-backend-layering.md"),
			},
			{
				title: "One API per consumer",
				text: "The web app, the backoffice and customers' servers each get their own API, with their own auth model.",
				source: blob("zenith", "docs/adr/0006-api-per-consumer.md"),
			},
			{
				title: "Jobs in Postgres, not Redis",
				text: "Background work runs on River inside PostgreSQL; there is no extra queue to operate.",
				source: blob("zenith", "docs/adr/0003-infrastructure.md"),
			},
			{
				title: "Verify by risk",
				text: "Run the cheapest check that can actually fail for the change: compile, typecheck, focused tests, Storybook for UI.",
				source: blob("zenith", "docs/adr/0013-risk-based-verification.md"),
			},
		],
		stack: [
			{
				layer: "Backend",
				items: [
					{ name: "Go", role: "Three APIs and the worker", icon: siGo },
					{ name: "Echo", role: "HTTP server" },
					{ name: "Huma", role: "Typed handlers and OpenAPI" },
					{ name: "OpenAPI", role: "Contracts for generated clients", icon: siOpenapiinitiative },
				],
			},
			{
				layer: "Frontend",
				items: [
					{ name: "TypeScript", role: "Web, backoffice and landing", icon: siTypescript },
					{ name: "React", role: "UI", icon: siReact },
					{ name: "TanStack Start", role: "Web and backoffice apps" },
					{ name: "Tailwind CSS", role: "Styling", icon: siTailwindcss },
				],
			},
			{
				layer: "Data and jobs",
				items: [
					{ name: "PostgreSQL", role: "One database, tenancy in the schema", icon: siPostgresql },
					{ name: "pgx", role: "Explicit pools and transactions" },
					{ name: "River", role: "Jobs inside Postgres" },
					{ name: "Cloudflare R2", role: "Private object storage", icon: siCloudflare },
					{ name: "Resend", role: "Transactional email", icon: siResend },
				],
			},
			{
				layer: "Tooling",
				items: [
					{ name: "Bun", role: "Package manager and scripts", icon: siBun },
					{ name: "Turborepo", role: "Monorepo tasks", icon: siTurborepo },
					{ name: "Task", role: "One command per job", icon: siTask },
					{ name: "Storybook", role: "UI review", icon: siStorybook },
					{ name: "Docker", role: "Images per runtime", icon: siDocker },
				],
			},
		],
		agentPrompt: [
			"Start a new product from the vkit-zenith foundation.",
			"",
			"1. Run `bunx giget gh:vandordev/vkit-zenith <project-name>`, then `git init` inside it.",
			"2. Read AGENTS.md first and follow it. Read PRODUCT.md and docs/adr/README.md: Accepted ADRs are binding.",
			"3. Follow README.md \"Starting a product from Zenith\": rename the Go module root github.com/vandordev/vkit-zenith everywhere, set the brand in packages/brand, pick the API key prefix, fill config/config.yaml.",
			"4. Run `task install && task gen && task check-types && task check:go` and show me the output.",
			"5. Before any feature, write a spec: schema first, then UI on dummy endpoints, then functionality (ADR-0001).",
			"",
			"My product: <describe it in one paragraph>.",
		].join("\n"),
	},
	{
		name: "orbit",
		backend: "TypeScript",
		summary: "A complete TypeScript reference application for document processing that shows the architecture end to end. Start from it and replace the domain.",
		stackLine: "TanStack Start + tRPC · Elysia · Prisma · BullMQ/Redis · Socket.IO",
		repoUrl: repo("orbit"),
		facts: parseKitData(generated.orbit),
		tablesLabel: "Prisma models",
		notes: {
			apps: "Web, public API, worker, scheduler, realtime and migrate runtimes.",
			packages: "Application logic, database, queue, storage, realtime and UI, shared by the apps.",
			contracts: "Versioned job contracts shared across runtimes.",
			docs: "Specs and plans for each change.",
			config: "One config.yaml read by typed loaders.",
			deploy: "Deployment configuration for Redis.",
			"AGENTS.md": "The map your coding agent reads first.",
			"PRODUCT.md": "What the reference product does; replace it with yours.",
			"Taskfile.yml": "Install, migrate, run and check, one task each.",
		},
		decisionsTitle: "Rules from its AGENTS.md",
		decisions: [
			{
				title: "Versioned job contracts",
				text: "BullMQ job names and payloads are cross-runtime contracts; breaking changes get a new versioned kind.",
				source: blob("orbit", "AGENTS.md"),
			},
			{
				title: "One process talks to Socket.IO",
				text: "Workers notify Elysia only after a job succeeds; Elysia alone publishes realtime events.",
				source: blob("orbit", "AGENTS.md"),
			},
			{
				title: "Realtime is a signal, not data",
				text: "Realtime payloads invalidate queries; the database stays the source of truth.",
				source: blob("orbit", "AGENTS.md"),
			},
			{
				title: "Typed config, no env in features",
				text: "Runtime config comes from config.yaml through typed getters; browser code never sees server values.",
				source: blob("orbit", "AGENTS.md"),
			},
		],
		stack: [
			{
				layer: "Backend",
				items: [
					{ name: "TypeScript", role: "Every runtime", icon: siTypescript },
					{ name: "Elysia", role: "Public API and realtime publisher" },
					{ name: "tRPC", role: "Web app to server", icon: siTrpc },
					{ name: "Zod", role: "Validation and typed config", icon: siZod },
				],
			},
			{
				layer: "Frontend",
				items: [
					{ name: "React", role: "UI", icon: siReact },
					{ name: "TanStack Start", role: "Web app" },
					{ name: "Tailwind CSS", role: "Styling", icon: siTailwindcss },
				],
			},
			{
				layer: "Data and jobs",
				items: [
					{ name: "PostgreSQL", role: "Database", icon: siPostgresql },
					{ name: "Prisma", role: "Schema and client", icon: siPrisma },
					{ name: "Redis", role: "Queue backend", icon: siRedis },
					{ name: "BullMQ", role: "Worker and scheduler jobs" },
					{ name: "Socket.IO", role: "Realtime invalidation", icon: siSocketdotio },
					{ name: "MinIO", role: "S3-compatible storage", icon: siMinio },
				],
			},
			{
				layer: "Tooling",
				items: [
					{ name: "Bun", role: "Runtime and package manager", icon: siBun },
					{ name: "Turborepo", role: "Monorepo tasks", icon: siTurborepo },
					{ name: "Task", role: "One command per job", icon: siTask },
					{ name: "Storybook", role: "UI review", icon: siStorybook },
					{ name: "Docker", role: "Images per runtime", icon: siDocker },
				],
			},
		],
		agentPrompt: [
			"Start a new product from the vkit-orbit reference application.",
			"",
			"1. Run `bunx giget gh:vandordev/vkit-orbit <project-name>`, then `git init` inside it.",
			"2. Read AGENTS.md first and follow it, then PRODUCT.md to see the document-processing domain you will replace.",
			"3. Run the README quick start: `task install`, `cp .env.example .env`, `task doctor`, `task migrate`, `task dev`.",
			"4. Run `task check-types` and `task test` and show me the output before changing anything.",
			"5. Replace the document-processing domain with mine, keeping the runtime boundaries the AGENTS.md rules describe.",
			"",
			"My product: <describe it in one paragraph>.",
		].join("\n"),
	},
];

export const hero = {
	title: "Start from a codebase that already ships.",
	lead: "vkit collects Vandor's kits: real, running codebases you copy in one command and make your own. Pick one, read the decisions behind it, and hand it to your coding agent.",
} as const;

export const repoUrl = "https://github.com/vandordev/vkit";
// production URL (Vercel Hobby project)
export const siteUrl = "https://vandor-vkit.vercel.app";
