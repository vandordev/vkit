import { kits, type Tech } from "@/content";

const initials = (name: string) =>
	name
		.split(/[\s-]+/)
		.map((w) => w[0])
		.join("")
		.slice(0, 2);

function Logo({ tech }: { tech: Tech }) {
	if (!tech.icon) {
		return (
			<svg viewBox="0 0 24 24" className="vk-logo vk-logo--mono" aria-hidden="true">
				<path d="M12 1.5 21.1 6.75v10.5L12 22.5l-9.1-5.25V6.75Z" />
				<text x="12" y="12.6" textAnchor="middle" dominantBaseline="middle">
					{initials(tech.name)}
				</text>
			</svg>
		);
	}
	return (
		<svg viewBox="0 0 24 24" className="vk-logo" aria-hidden="true" style={{ ["--brand" as string]: `#${tech.icon.hex}` }}>
			<path d={tech.icon.path} />
		</svg>
	);
}

export function TechStack() {
	return (
		<section className="vk-wrap vk-section" aria-labelledby="stack-title">
			<h2 id="stack-title">The stack, chosen once</h2>
			<p className="vk-section__lead">Every piece is already wired, configured and in use by the code. Nothing here is a plugin waiting to be installed.</p>
			{kits.map((kit) => (
				<div key={kit.name} className="vk-stack" data-kit={kit.name}>
					{kit.stack.map((layer) => (
						<div key={layer.layer} className="vk-stack__layer">
							<h3>{layer.layer}</h3>
							<ul>
								{layer.items.map((tech) => (
									<li key={tech.name}>
										<Logo tech={tech} />
										<span className="vk-stack__name">{tech.name}</span>
										<span className="vk-stack__role">{tech.role}</span>
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
