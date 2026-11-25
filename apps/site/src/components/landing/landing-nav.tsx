import { Button } from "@repo/ui/button";
import { ZenithMark, ZenithWordmark } from "@repo/ui/zenith-mark";
import { repoUrl, roadmapUrl } from "@/content";

export function LandingNav() {
	return (
		<header className="lp-navbar">
			<div className="lp-wrap lp-nav">
				<a className="lp-brand" href="/">
					<ZenithMark size={24} />
					<ZenithWordmark />
				</a>
				<nav aria-label="Primary">
					<ul>
						<li>
							<a href="#kits">Kits</a>
						</li>
						<li>
							<a href={roadmapUrl}>Roadmap</a>
						</li>
					</ul>
				</nav>
				<Button asChild size="sm" variant="outline">
					<a href={repoUrl}>GitHub</a>
				</Button>
			</div>
		</header>
	);
}
