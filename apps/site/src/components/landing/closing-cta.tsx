import { zenithMark } from "@repo/brand/logo-mark";
import { Button } from "@repo/ui/button";
import { DisplayHeading } from "@repo/ui/display-heading";
import { nextSteps, roadmapUrl } from "@/content";

export function ClosingCta() {
	return (
		<div className="lp-wrap">
			<section className="lp-close tone tone-aurora" aria-labelledby="next-title">
				{/* The brand mark draws its outline as the section scrolls in (CSS), then fills. */}
				<svg className="lp-mark" viewBox={zenithMark.viewBox} width={56} height={56} aria-hidden="true">
					{zenithMark.paths.map((d) => (
						<path key={d} d={d} pathLength={1} />
					))}
				</svg>
				<DisplayHeading as="h2" className="lp-display">
					<span id="next-title">What&apos;s next</span>
				</DisplayHeading>
				<dl className="lp-next">
					{nextSteps.map((step) => (
						<div key={step.version}>
							<dt>{step.version}</dt>
							<dd>{step.text}</dd>
						</div>
					))}
				</dl>
				<Button asChild size="lg">
					<a href={roadmapUrl}>Read the roadmap</a>
				</Button>
			</section>
		</div>
	);
}
