import { kits } from "@/content";

export function Decisions() {
	return (
		<section className="vk-wrap vk-section" aria-label="Decisions">
			{kits.map((kit) => (
				<div key={kit.name} data-kit={kit.name}>
					<h2>{kit.decisionsTitle}</h2>
					<p className="vk-section__lead">Opinions are the point of a kit. Each one links to the document that argues it.</p>
					<ol className="vk-decisions">
						{kit.decisions.map((decision) => (
							<li key={decision.title}>
								<h3>{decision.title}</h3>
								<p>{decision.text}</p>
								<a href={decision.source}>Read the source</a>
							</li>
						))}
					</ol>
				</div>
			))}
		</section>
	);
}
