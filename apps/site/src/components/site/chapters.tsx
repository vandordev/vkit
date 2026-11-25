import { hero, kits, packageManagers, startCommand, type Kit } from "@/content";
import { stepProps } from "@/lib/story";
import { CopyButton } from "./copy-button";
import { Logo } from "./logo";

export function HeroCopy() {
	return (
		<section id="start" className="vk-chapter vk-chapter--hero" aria-labelledby="hero-title" {...stepProps("hero")}>
			<h1 id="hero-title">{hero.title}</h1>
			<p className="vk-lead">{hero.lead}</p>
			<div className="vk-cmd">
				<div className="vk-cmd__bar">
					<fieldset className="vk-tabs" aria-label="Kit">
						{kits.map((kit, index) => (
							<label key={kit.name}>
								<input type="radio" name="kit" value={kit.name} defaultChecked={index === 0} />
								<span>{kit.name}</span>
							</label>
						))}
					</fieldset>
					<fieldset className="vk-tabs vk-tabs--quiet" aria-label="Package manager">
						{packageManagers.map((pm, index) => (
							<label key={pm}>
								<input type="radio" name="pm" value={pm} defaultChecked={index === 0} />
								<span>{pm}</span>
							</label>
						))}
					</fieldset>
				</div>
				{kits.map((kit) =>
					packageManagers.map((pm) => (
						<div key={`${kit.name}-${pm}`} className="vk-cmd__line" data-kit={kit.name} data-pm={pm}>
							<code>
								<span className="vk-cmd__prompt" aria-hidden="true">
									${" "}
								</span>
								{startCommand(kit.name, pm)}
							</code>
							<CopyButton text={startCommand(kit.name, pm)} />
						</div>
					)),
				)}
			</div>
			{kits.map((kit) => (
				<p key={kit.name} className="vk-hero__kit" data-kit={kit.name}>
					<b>{kit.name}</b> · {kit.summary}
				</p>
			))}
		</section>
	);
}

function ChapterHead({ n, title, lead }: { n: string; title: string; lead: string }) {
	return (
		<header className="vk-chapter__head">
			<span className="vk-chapter__n">{n}</span>
			<h2>{title}</h2>
			<p className="vk-section__lead">{lead}</p>
		</header>
	);
}

export function StackChapter() {
	return (
		<section className="vk-chapter" data-accent="stack" aria-label="The stack">
			<div {...stepProps("stack")}>
				<ChapterHead n="01" title="The stack, chosen once" lead="Every piece is already wired, configured and used by the code. Scroll through the layers and watch where each one lives." />
			</div>
			{kits.map((kit) => (
				<div key={kit.name} data-kit={kit.name} className="vk-steps">
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
			))}
		</section>
	);
}

// Rows for visible directories and annotated paths; every other file is listed on one line.
const split = (kit: Kit) => {
	const row = (e: Kit["facts"]["tree"][number]) => (e.dir && !e.name.startsWith(".")) || e.name in kit.notes;
	return { rows: kit.facts.tree.filter(row), rest: kit.facts.tree.filter((e) => !row(e)) };
};

export function DiskChapter() {
	return (
		<section className="vk-chapter" data-accent="disk" aria-label="What lands on disk">
			<div className="vk-step" {...stepProps("disk")}>
				<ChapterHead n="02" title="What lands on disk" lead="The map folds into folders: apps on the left, the packages they import on the right. The tree below is generated from the kit's main branch." />
				{kits.map((kit) => {
					const { rows, rest } = split(kit);
					return (
						<div key={kit.name} className="vk-tree" data-kit={kit.name}>
							<p className="vk-tree__root">my-app/</p>
							<ul>
								{rows.map((entry) => (
									<li key={entry.name} className="vk-tree__row">
										<span className="vk-tree__name" data-dir={entry.dir || undefined}>
											{entry.name}
											{entry.dir ? "/" : ""}
										</span>
										<span className="vk-tree__note">{kit.notes[entry.name] ?? ""}</span>
									</li>
								))}
								<li className="vk-tree__row">
									<span className="vk-tree__name">+ {rest.length} more</span>
									<span className="vk-tree__rest">{rest.map((e) => `${e.name}${e.dir ? "/" : ""}`).join("  ")}</span>
								</li>
							</ul>
						</div>
					);
				})}
			</div>
		</section>
	);
}

export function DecisionsChapter() {
	return (
		<section className="vk-chapter" data-accent="decisions" aria-label="Decisions">
			{kits.map((kit) => (
				<div key={kit.name} data-kit={kit.name}>
					<div {...stepProps("decisions")}>
						<ChapterHead n="03" title={kit.decisionsTitle} lead="Opinions are the point of a kit. Each one lights up the part of the codebase it governs, and links to the document that argues it." />
					</div>
					<ol className="vk-steps">
						{kit.decisions.map((decision) => (
							<li key={decision.title} className="vk-step vk-decision" {...stepProps("decisions", decision.nodes)}>
								<h3>{decision.title}</h3>
								<p>{decision.text}</p>
								<p className="vk-decision__nodes">{decision.nodes.map((id) => id.split("/")[1]).join(" · ")}</p>
								<a href={decision.source}>Read the source</a>
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
				<header className="vk-chapter__head">
					<span className="vk-chapter__n">04</span>
					<h2 id="agents-title">Hand it to your agent</h2>
					<p className="vk-section__lead">
						Every kit ships an AGENTS.md that maps the codebase and names the checks to run. Your agent reads the map the way the graph does now. Paste this prompt, then fill in the last line.
					</p>
				</header>
				{kits.map((kit) => (
					<figure key={kit.name} className="vk-prompt" data-kit={kit.name}>
						<figcaption>
							<span>prompt for {kit.name}</span>
							<CopyButton text={kit.agentPrompt} label="Copy prompt" variant="outline" />
						</figcaption>
						<pre>{kit.agentPrompt}</pre>
					</figure>
				))}
			</div>
		</section>
	);
}
