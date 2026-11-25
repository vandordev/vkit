import { ZenithMark, ZenithWordmark } from "@repo/ui/zenith-mark";
import { kits, repoUrl, roadmapUrl } from "@/content";

export function LandingFooter() {
	return (
		<footer className="lp-wrap lp-foot">
			<div className="lp-foot-grid">
				<div className="lp-foot-about">
					<a className="lp-brand" href="/">
						<ZenithMark size={24} />
						<ZenithWordmark />
					</a>
					<p>Production foundations from Vandor.</p>
				</div>
				<nav className="lp-foot-nav" aria-label="Explore vkit">
					<h3>Explore</h3>
					<ul>
						<li>
							<a href="#kits">Kits</a>
						</li>
						<li>
							<a href={roadmapUrl}>Roadmap</a>
						</li>
						<li>
							<a href={repoUrl}>GitHub</a>
						</li>
					</ul>
				</nav>
				<nav className="lp-foot-nav" aria-label="Kit repositories">
					<h3>Kits</h3>
					<ul>
						{kits.map((kit) => (
							<li key={kit.name}>
								<a href={kit.repoUrl}>vkit-{kit.name}</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<div className="lp-foot-bottom">
				<span>© 2026 Vandor · MIT license</span>
			</div>
		</footer>
	);
}
