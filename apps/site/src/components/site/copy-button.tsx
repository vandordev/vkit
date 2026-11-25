import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { copyText, type CopyResult } from "@/lib/copy";

const labels: Record<CopyResult | "idle", string> = { idle: "Copy", copied: "Copied", failed: "Copy failed" };

export function CopyButton({ text, label = "Copy", variant = "default" }: { text: string; label?: string; variant?: "default" | "outline" }) {
	const [state, setState] = useState<CopyResult | "idle">("idle");

	useEffect(() => {
		if (state === "idle") return;
		const timer = setTimeout(() => setState("idle"), 2000);
		return () => clearTimeout(timer);
	}, [state]);

	return (
		<>
			<Button type="button" size="sm" variant={variant} onClick={async () => setState(await copyText(text, globalThis.navigator?.clipboard))}>
				{state === "idle" ? label : labels[state]}
			</Button>
			<span aria-live="polite" className="vk-sr">
				{state === "idle" ? "" : labels[state]}
			</span>
		</>
	);
}
