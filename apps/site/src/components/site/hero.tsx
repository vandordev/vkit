import { hero, kits, packageManagers, startCommand } from "@/content";
import { ArchGraph } from "./arch-graph";
import { CopyButton } from "./copy-button";

// Kit and package-manager choices are native radios; CSS :has() shows the matching rows, so the page works without JavaScript.
export function Hero() {
	return (
		<section id="start" className="vk-hero" aria-labelledby="hero-title">
			<div className="vk-wrap vk-hero__grid">
				<div className="vk-hero__copy">
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
				</div>
				<figure className="vk-hero__stage">
					<ArchGraph />
					{kits.map((kit) => (
						<figcaption key={kit.name} className="vk-legend" data-kit={kit.name}>
							<span className="vk-legend__key">
								<i data-lang="go" /> Go <i data-lang="ts" /> TypeScript <i data-kind="app" /> app <i data-kind="package" /> package
							</span>
							<span>
								{kit.facts.apps} apps · {kit.facts.packages} packages{kit.facts.adrs ? ` · ${kit.facts.adrs} ADRs` : ""} · {kit.facts.tables} {kit.tablesLabel} ·{" "}
								<a href={`${kit.repoUrl}/tree/${kit.facts.commit}`}>@{kit.facts.commit.slice(0, 7)}</a>
							</span>
						</figcaption>
					))}
				</figure>
			</div>
		</section>
	);
}
