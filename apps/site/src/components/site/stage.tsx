import { useEffect, useState } from "react";
import { kits, type Kit, type KitName } from "@/content";
import { chapters, STEP_EVENT, type ChapterId, type StepDetail } from "@/lib/story";
import { ArchGraph } from "./arch-graph";

const visibleTree = (kit: Kit) => kit.facts.tree.filter((e) => !e.name.startsWith("."));

/** The docked terminal shows a real command per chapter and, only where we know it, what that command prints. */
const cardFor = (kit: Kit, chapter: ChapterId): { command: string; output: string[] } => {
	switch (chapter) {
		case "stack":
			return { command: kit.name === "zenith" ? "task install && task check-types && task check:go" : "task install && task check-types", output: [] };
		case "disk": {
			const tree = visibleTree(kit);
			const dirs = tree.filter((e) => e.dir).length;
			return { command: "tree -L 1 my-app | tail -1", output: [`${dirs} directories, ${tree.length - dirs} files`] };
		}
		case "decisions":
			return kit.facts.adrFiles.length
				? { command: "ls docs/adr", output: [...kit.facts.adrFiles.slice(0, 3), `… ${kit.facts.adrFiles.length} records`] }
				: { command: "grep 'BullMQ job names' AGENTS.md", output: ["BullMQ job names and JSON payloads are cross-runtime contracts. Breaking"] };
		case "agents":
			return { command: "head -3 AGENTS.md", output: kit.name === "zenith" ? ["# AGENTS.md", "", "Map for agents. Read only what your task needs; detail lives in the linked files."] : ["# AGENTS.md", "", "## Start here"] };
		default:
			return { command: `bunx giget gh:vandordev/vkit-${kit.name} my-app`, output: [`✨ Successfully cloned \`vandordev-vkit-${kit.name}\` to \`my-app\``] };
	}
};

export function Stage() {
	const [chapter, setChapter] = useState<ChapterId>("hero");
	const [kit, setKit] = useState<KitName>("zenith");
	// The dock types only after the first change, so the first paint never shows a half-typed command.
	const [typed, setTyped] = useState(false);

	useEffect(() => {
		const onStep = (e: Event) => {
			const next = (e as CustomEvent<StepDetail>).detail.chapter;
			setChapter(next);
			if (next !== "hero") setTyped(true);
		};
		const onKit = () => {
			setTyped(true);
			setKit((document.querySelector<HTMLInputElement>('input[name="kit"]:checked')?.value as KitName | undefined) ?? "zenith");
		};
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
			{/* The kit choice lives on the pinned stage so it stays reachable for the whole story. */}
			<div className="vk-switch">
				<fieldset className="vk-switch__kits" aria-label="Kit">
					{kits.map((k, i) => (
						<label key={k.name}>
							<input type="radio" name="kit" value={k.name} defaultChecked={i === 0} />
							<span>{k.name}</span>
						</label>
					))}
				</fieldset>
				{kits.map((k) => (
					<p key={k.name} className="vk-switch__meta" data-kit={k.name}>
						{k.backend} · {k.tagline}
					</p>
				))}
			</div>
			<ArchGraph />
			<div className="vk-dock" aria-hidden="true">
				<div className="vk-dock__body" key={`${kit}-${chapter}`} data-typed={typed || undefined}>
					<p>
						<span className="vk-dock__prompt">$ </span>
						{card.command}
					</p>
					{card.output.map((line, i) => (
						<p key={i} className="vk-dock__out" style={{ animationDelay: `${120 + i * 60}ms` }}>
							{line || " "}
						</p>
					))}
				</div>
			</div>
			<div className="vk-bar">
				<div className="vk-bar__track" aria-hidden="true">
					{chapters.map((c, i) => (
						<span key={c.id} data-on={i <= index || undefined} style={c.accent ? { ["--seg" as string]: `var(${c.accent})` } : undefined} />
					))}
				</div>
				<div className="vk-bar__row">
					<span className="vk-bar__key" aria-label="Legend">
						<i data-lang="go" /> Go <i data-lang="ts" /> TypeScript <i data-kind="app" /> app <i data-kind="package" /> package
					</span>
					<span className="vk-bar__label">
						{String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")} · {chapters[index]?.label}
					</span>
				</div>
			</div>
		</div>
	);
}
