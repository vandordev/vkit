import { Decisions } from "./decisions";
import { DiskTree } from "./disk-tree";
import { ForAgents } from "./for-agents";
import { Hero } from "./hero";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import { TechStack } from "./tech-stack";

export function LandingPage() {
	return (
		<div className="vk">
			<SiteNav />
			<main>
				<Hero />
				<TechStack />
				<DiskTree />
				<Decisions />
				<ForAgents />
			</main>
			<SiteFooter />
		</div>
	);
}
