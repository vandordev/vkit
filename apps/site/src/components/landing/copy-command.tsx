"use client";

import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { copyText, type CopyResult } from "@/lib/copy";

const labels: Record<CopyResult | "idle", string> = { idle: "Copy", copied: "Copied", failed: "Copy failed" };

export function CopyCommand({ command }: { command: string }) {
	const [state, setState] = useState<CopyResult | "idle">("idle");

	useEffect(() => {
		if (state === "idle") return;
		const timer = setTimeout(() => setState("idle"), 2000);
		return () => clearTimeout(timer);
	}, [state]);

	return (
		<div className="copy-command">
			<code className="copy-command__text">
				<span aria-hidden="true" className="copy-command__prompt">
					${" "}
				</span>
				{command}
			</code>
			<Button
				type="button"
				size="lg"
				onClick={async () => setState(await copyText(command, globalThis.navigator?.clipboard))}
			>
				{labels[state]}
			</Button>
			<span aria-live="polite" className="copy-command__status" data-state={state}>
				{state === "idle" ? "" : labels[state]}
			</span>
		</div>
	);
}
