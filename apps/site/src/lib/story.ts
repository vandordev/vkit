import { useEffect } from "react";

export const chapters = [
	{ id: "hero", label: "Start", accent: "" },
	{ id: "stack", label: "Stack", accent: "--viz-1" },
	{ id: "disk", label: "On disk", accent: "--viz-3" },
	{ id: "decisions", label: "Decisions", accent: "--viz-4" },
	{ id: "agents", label: "Agents", accent: "--viz-5" },
] as const;
export type ChapterId = (typeof chapters)[number]["id"];

/** What the pinned stage shows: the chapter, the graph nodes in focus, and the chapter's accent token. */
export type StepDetail = { chapter: ChapterId; focus: string[]; accent: string };
export const STEP_EVENT = "vk:step";

const accentOf = (chapter: ChapterId) => chapters.find((c) => c.id === chapter)?.accent ?? "";

/** Props for an element that drives the stage when it crosses the middle of the viewport. */
export const stepProps = (chapter: ChapterId, focus: readonly string[] = []) => ({
	"data-step": chapter,
	"data-focus": focus.join(" "),
});

/** Watches every `[data-step]` element and announces the one crossing the reading line. */
export function useStepObserver() {
	useEffect(() => {
		let current = "";
		const announce = (el: Element) => {
			const chapter = el.getAttribute("data-step") as ChapterId;
			const focus = (el.getAttribute("data-focus") ?? "").split(" ").filter(Boolean);
			const key = `${chapter}|${focus.join(",")}`;
			if (key === current) return;
			current = key;
			document.querySelectorAll("[data-step][data-active]").forEach((s) => s.removeAttribute("data-active"));
			el.setAttribute("data-active", "");
			document.documentElement.dataset.chapter = chapter;
			window.dispatchEvent(new CustomEvent<StepDetail>(STEP_EVENT, { detail: { chapter, focus, accent: accentOf(chapter) } }));
		};
		// A thin band just below the middle of the viewport is the reading line.
		const observer = new IntersectionObserver((entries) => entries.filter((e) => e.isIntersecting).forEach((e) => announce(e.target)), {
			rootMargin: "-52% 0px -46% 0px",
		});
		const observeAll = () => document.querySelectorAll("[data-step]").forEach((el) => observer.observe(el));
		observeAll();
		// Switching kit swaps which steps are displayed; re-announce whatever now sits on the line.
		const onKit = () => {
			current = "";
			observer.disconnect();
			observeAll();
		};
		document.addEventListener("change", onKit);
		return () => {
			observer.disconnect();
			document.removeEventListener("change", onKit);
		};
	}, []);
}
