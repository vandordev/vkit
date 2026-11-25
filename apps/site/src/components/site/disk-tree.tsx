import { kits, type Kit } from "@/content";

// Rows for visible directories and annotated paths; every other file is listed on one line.
const split = (kit: Kit) => {
	const row = (e: Kit["facts"]["tree"][number]) => (e.dir && !e.name.startsWith(".")) || e.name in kit.notes;
	return { rows: kit.facts.tree.filter(row), rest: kit.facts.tree.filter((e) => !row(e)) };
};

export function DiskTree() {
	return (
		<section className="vk-wrap vk-section" aria-labelledby="disk-title">
			<h2 id="disk-title">What lands on disk</h2>
			<p className="vk-section__lead">The tree below is generated from each kit's main branch at build time, not drawn by hand.</p>
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
									{entry.children ? (
										<ul className="vk-tree__children">
											{entry.children.map((child) => (
												<li key={child}>{child}/</li>
											))}
										</ul>
									) : null}
								</li>
							))}
							<li className="vk-tree__row">
								<span className="vk-tree__name">+ {rest.length} more</span>
								<ul className="vk-tree__children vk-tree__rest">
									{rest.map((entry) => (
										<li key={entry.name}>
											{entry.name}
											{entry.dir ? "/" : ""}
										</li>
									))}
								</ul>
							</li>
						</ul>
						<p className="vk-tree__commit">
							Generated from{" "}
							<a href={`${kit.repoUrl}/tree/${kit.facts.commit}`}>
								{kit.name}@{kit.facts.commit.slice(0, 7)}
							</a>
						</p>
					</div>
				);
			})}
		</section>
	);
}
