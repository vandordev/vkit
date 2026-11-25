import { Button } from "@repo/ui/button";
import { DisplayHeading } from "@repo/ui/display-heading";
import { hero, repoUrl } from "@/content";

export function LandingHero() {
	return (
		<div className="lp-hero">
			<div className="lp-wrap">
				<DisplayHeading className="lp-display">
					{hero.title} <span className="lp-second">{hero.second}</span>
				</DisplayHeading>
				<p className="lp-lede">{hero.lead}</p>
				<div className="lp-acts">
					<Button asChild size="lg">
						<a href="#kits">Pick a kit</a>
					</Button>
					<Button asChild size="lg" variant="secondary">
						<a href={repoUrl}>View on GitHub</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
