import { kits, type Kit } from "@/content";

const factsOf = (kit: Kit) =>
	[
		{ value: kit.facts.apps, label: "apps", href: `${kit.repoUrl}/tree/main/apps` },
		{ value: kit.facts.packages, label: "packages", href: `${kit.repoUrl}/tree/main/packages` },
		{ value: kit.facts.adrs, label: "architecture decision records", href: `${kit.repoUrl}/tree/main/docs/adr` },
		{ value: kit.facts.tables, label: kit.tablesLabel, href: `${kit.repoUrl}/tree/main/packages/db` },
	].filter((fact) => fact.value > 0);

export function KitFacts() {
	return (
		<section className="vk-wrap vk-facts-wrap" aria-label="Kit facts">
			{kits.map((kit) => (
				<dl key={kit.name} className="vk-facts" data-kit={kit.name}>
					{factsOf(kit).map((fact) => (
						<div key={fact.label}>
							<dt>
								<a href={fact.href}>{fact.label}</a>
							</dt>
							<dd>{fact.value}</dd>
						</div>
					))}
				</dl>
			))}
		</section>
	);
}
