import { kits } from "@/content";
import { CopyButton } from "./copy-button";

export function ForAgents() {
	return (
		<section className="vk-wrap vk-section vk-agents" aria-labelledby="agents-title">
			<div>
				<h2 id="agents-title">Hand it to your agent</h2>
				<p className="vk-section__lead">
					Every kit ships an AGENTS.md that maps the codebase and names the checks to run. Paste this prompt into your coding agent, then fill in the last line.
				</p>
			</div>
			{kits.map((kit) => (
				<figure key={kit.name} className="vk-prompt" data-kit={kit.name}>
					<figcaption>
						<span>prompt for {kit.name}</span>
						<CopyButton text={kit.agentPrompt} label="Copy prompt" variant="outline" />
					</figcaption>
					<pre>{kit.agentPrompt}</pre>
				</figure>
			))}
		</section>
	);
}
