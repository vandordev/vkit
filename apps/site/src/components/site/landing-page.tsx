import { Hero } from "./hero";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import { Story } from "./story";
import { TechMarquee } from "./tech-marquee";

export function LandingPage() {
	return (
		<div className="vk">
			<SiteNav kitSwitch />
			<main>
				<Hero />
				<TechMarquee />
				<Story />
			</main>
			<SiteFooter />
		</div>
	);
}
