import { useEffect, useState } from "react";
import { kits, type Kit, type KitName } from "@/content";
import { chapters, STEP_EVENT, type ChapterId, type StepDetail } from "@/lib/story";
import { ArchGraph } from "./arch-graph";

const visibleTree = (kit: Kit) => kit.facts.tree.filter((e) => !e.name.startsWith("."));

/** The terminal card shows a real command per chapter and what it prints for the selected kit. */
const cardFor = (kit: Kit, chapter: ChapterId): { command: string; output: string[] } | null => {
	switch (chapter) {
		case "stack":
			return kit.name === "zenith"
				? { command: "task install && task check-types && task check:go", output: ["# Go modules and Bun workspaces, then every typecheck and Go suite"] }
				: { command: "task install && task check-types", output: ["# Bun workspaces, then every typecheck"] };
		case "disk": {
			const tree = visibleTree(kit);
			const dirs = tree.filter((e) => e.dir).length;
			return { command: "tree -L 1 my-app | tail -1", output: [`${dirs} directories, ${tree.length - dirs} files`] };
		}
		case "decisions":
			return kit.facts.adrFiles.length
				? { command: "ls docs/adr", output: [...kit.facts.adrFiles.slice(0, 6), `… ${kit.facts.adrFiles.length} records`] }
				: { command: "sed -n '/BullMQ/,/Socket.IO/p' AGENTS.md", output: ["BullMQ job names and JSON payloads are cross-runtime contracts…"] };
		case "agents":
			return kit.name === "zenith"
				? { command: "head -3 AGENTS.md", output: ["# AGENTS.md", "", "Map for agents. Read only what your task needs; …"] }
				: { command: "head -3 AGENTS.md", output: ["# AGENTS.md", "", "## Start here"] };
		default:
			return null;
	}
};

export function Stage() {
	const [chapter, setChapter] = useState<ChapterId>("hero");
	const [kit, setKit] = useState<KitName>("zenith");

	useEffect(() => {
		const onStep = (e: Event) => setChapter((e as CustomEvent<StepDetail>).detail.chapter);
		const onKit = () => setKit((document.querySelector<HTMLInputElement>('input[name="kit"]:checked')?.value as KitName | undefined) ?? "zenith");
		window.addEventListener(STEP_EVENT, onStep);
		document.addEventListener("change", onKit);
		return () => {
			window.removeEventListener(STEP_EVENT, onStep);
			document.removeEventListener("change", onKit);
		};
	}, []);

	const current = kits.find((k) => k.name === kit)!;
	const card = cardFor(current, chapter);
	const index = chapters.findIndex((c) => c.id === chapter);

	return (
		<div className="vk-stage" data-chapter={chapter}>
			<ArchGraph />
			{card ? (
				<div className="vk-card" key={`${kit}-${chapter}`} aria-hidden="true">
					<p>
						<span className="vk-card__prompt">$ </span>
						{card.command}
					</p>
					{card.output.map((line, i) => (
						<p key={i} className="vk-card__out" style={{ animationDelay: `${120 + i * 60}ms` }}>
							{line || " "}
						</p>
					))}
				</div>
			) : null}
			<div className="vk-scrub" aria-hidden="true">
				<div className="vk-scrub__track">
					{chapters.map((c, i) => (
						<span key={c.id} className="vk-scrub__seg" data-on={i <= index || undefined} style={c.accent ? { ["--seg" as string]: `var(${c.accent})` } : undefined} />
					))}
				</div>
				<span className="vk-scrub__label">
					{String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")} · {chapters[index]?.label}
				</span>
			</div>
			{kits.map((k) => (
				<p key={k.name} className="vk-legend" data-kit={k.name}>
					<span className="vk-legend__key">
						<i data-lang="go" /> Go <i data-lang="ts" /> TypeScript <i data-kind="app" /> app <i data-kind="package" /> package
					</span>
					<span>
						{k.facts.apps} apps · {k.facts.packages} packages{k.facts.adrs ? ` · ${k.facts.adrs} ADRs` : ""} · {k.facts.tables} {k.tablesLabel} ·{" "}
						<a href={`${k.repoUrl}/tree/${k.facts.commit}`}>@{k.facts.commit.slice(0, 7)}</a>
					</span>
				</p>
			))}
		</div>
	);
}
