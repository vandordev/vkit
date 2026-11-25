import { hero, kits, packageManagers, startCommand } from "@/content";
import { CopyButton } from "./copy-button";

// Kit and package-manager choices are native radios; CSS :has() shows the matching rows, so the page works without JavaScript.
export function Hero() {
	return (
		<section id="start" className="vk-wrap vk-hero" aria-labelledby="hero-title">
			<div className="vk-hero__copy">
				<h1 id="hero-title">{hero.title}</h1>
				<p className="vk-lead">{hero.lead}</p>
				{kits.map((kit) => (
					<p key={kit.name} className="vk-hero__kit" data-kit={kit.name}>
						<b>{kit.name}</b> · {kit.backend} backend. {kit.summary}
					</p>
				))}
			</div>
			<div className="vk-term">
				<div className="vk-term__bar">
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
				<div className="vk-term__body">
					{kits.map((kit) =>
						packageManagers.map((pm) => (
							<div key={`${kit.name}-${pm}`} className="vk-term__cmd" data-kit={kit.name} data-pm={pm}>
								<code>
									<span className="vk-term__prompt" aria-hidden="true">
										${" "}
									</span>
									{startCommand(kit.name, pm)}
								</code>
								<CopyButton text={startCommand(kit.name, pm)} />
							</div>
						)),
					)}
					{kits.map((kit) => (
						<div key={kit.name} className="vk-term__out" data-kit={kit.name} aria-label={`Result of cloning ${kit.name}`}>
							<p className="vk-term__ok">✨ Successfully cloned `vandordev-vkit-{kit.name}` to `my-app`</p>
							<p>
								<span className="vk-term__prompt" aria-hidden="true">
									${" "}
								</span>
								cd my-app && ls
							</p>
							<ul className="vk-term__ls">
								{kit.facts.tree
									.filter((entry) => !entry.name.startsWith(".")) // plain `ls` hides dotfiles
									.map((entry) => (
										<li key={entry.name} data-dir={entry.dir || undefined}>
											{entry.name}
										</li>
									))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
