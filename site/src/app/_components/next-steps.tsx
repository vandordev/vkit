import { nextSteps, roadmapUrl } from "@/content";

export function NextSteps() {
	return (
		<section className="vk-wrap" aria-labelledby="next-title">
			<div className="vk-next">
			<h2 id="next-title" className="vk-next__title">
				What&apos;s next
			</h2>
			<dl className="vk-next__list">
				{nextSteps.map((step) => (
					<div key={step.version} className="vk-next__item">
						<dt>{step.version}</dt>
						<dd>{step.text}</dd>
					</div>
				))}
			</dl>
			<a className="vk-link" href={roadmapUrl}>
				Read the roadmap
			</a>
			</div>
		</section>
	);
}
