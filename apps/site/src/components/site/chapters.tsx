import type { ReactNode } from "react";
import { kits, type Kit } from "@/content";
import { stepProps } from "@/lib/story";
import { CopyButton } from "./copy-button";
import { Logo } from "./logo";

function ChapterHead({ title, children, id }: { title: string; children: ReactNode; id?: string }) {
	return (
		<header className="vk-chapter__head">
			<h2 id={id}>{title}</h2>
			<p className="vk-section__lead">{children}</p>
		</header>
	);
}

export function StackChapter() {
	return (
		<section className="vk-chapter" data-accent="stack" aria-label="Stack">
			{kits.map((kit) => (
				<div key={kit.name} data-kit={kit.name}>
					<div {...stepProps("stack")}>
						<ChapterHead title="Stack">{kit.stackLead}</ChapterHead>
					</div>
					<div className="vk-steps">
						{kit.stack.map((layer) => (
							<div key={layer.layer} className="vk-step vk-layer" {...stepProps("stack", layer.nodes)}>
								<h3>{layer.layer}</h3>
								<ul>
									{layer.items.map((tech) => (
										<li key={tech.name}>
											<Logo tech={tech} />
											<span className="vk-layer__name">{tech.name}</span>
											<span className="vk-layer__role">{tech.role}</span>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>
			))}
		</section>
	);
}

// Rows for visible directories and annotated paths; the remaining files are counted, not listed.
const split = (kit: Kit) => {
	const row = (e: Kit["facts"]["tree"][number]) => (e.dir && !e.name.startsWith(".")) || e.name in kit.notes;
	return { rows: kit.facts.tree.filter(row), rest: kit.facts.tree.filter((e) => !row(e)) };
};

export function DiskChapter() {
	return (
		<section className="vk-chapter" data-accent="disk" aria-label="Files">
			<div className="vk-step" {...stepProps("disk")}>
				{kits.map((kit) => {
					const { rows, rest } = split(kit);
					return (
						<div key={kit.name} data-kit={kit.name}>
							<ChapterHead title="Files">
								What <code>giget</code> writes into <code>my-app/</code>, read from{" "}
								<a href={`${kit.repoUrl}/tree/${kit.facts.commit}`}>main at {kit.facts.commit.slice(0, 7)}</a>.
							</ChapterHead>
							<ul className="vk-tree">
								{rows.map((entry) => (
									<li key={entry.name} className="vk-tree__row">
										<span className="vk-tree__name" data-dir={entry.dir || undefined}>
											{entry.name}
											{entry.dir ? "/" : ""}
										</span>
										{kit.notes[entry.name] ? <span className="vk-tree__note">{kit.notes[entry.name]}</span> : null}
									</li>
								))}
								<li className="vk-tree__row">
									<span className="vk-tree__more">and {rest.length} more files</span>
								</li>
							</ul>
						</div>
					);
				})}
			</div>
		</section>
	);
}

const sourceLabel = (source: string) => {
	const adr = source.match(/docs\/adr\/(\d{4})-/);
	return adr ? `ADR-${adr[1]}` : "AGENTS.md";
};

export function DecisionsChapter() {
	return (
		<section className="vk-chapter" data-accent="decisions" aria-label="Decisions">
			{kits.map((kit) => (
				<div key={kit.name} data-kit={kit.name}>
					<div {...stepProps("decisions")}>
						<ChapterHead title="Decisions">{kit.decisionsLead}</ChapterHead>
					</div>
					<ol className="vk-steps">
						{kit.decisions.map((decision) => (
							<li key={decision.title} className="vk-step vk-decision" {...stepProps("decisions", decision.nodes)}>
								<h3>{decision.title}</h3>
								<p>{decision.text}</p>
								<a href={decision.source}>{sourceLabel(decision.source)}</a>
							</li>
						))}
					</ol>
				</div>
			))}
		</section>
	);
}

export function AgentsChapter() {
	return (
		<section className="vk-chapter" data-accent="agents" aria-labelledby="agents-title">
			<div className="vk-step" {...stepProps("agents")}>
				<ChapterHead title="For agents" id="agents-title">
					Each kit ships an AGENTS.md: a map of the code and the checks to run. Start your coding agent with this prompt and describe your product in the last line.
				</ChapterHead>
				{kits.map((kit) => (
					<figure key={kit.name} className="vk-prompt" data-kit={kit.name}>
						<figcaption>
							<span>prompt.md</span>
							<CopyButton text={kit.agentPrompt} label="Copy prompt" variant="outline" />
						</figcaption>
						<pre>{kit.agentPrompt}</pre>
					</figure>
				))}
			</div>
		</section>
	);
}
