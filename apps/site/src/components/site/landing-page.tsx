import { Decisions } from "./decisions";
import { DiskTree } from "./disk-tree";
import { ForAgents } from "./for-agents";
import { Hero } from "./hero";
import { KitFacts } from "./kit-facts";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";

export function LandingPage() {
	return (
		<div className="vk">
			<SiteNav />
			<main>
				<Hero />
				<KitFacts />
				<DiskTree />
				<Decisions />
				<ForAgents />
			</main>
			<SiteFooter />
		</div>
	);
}
