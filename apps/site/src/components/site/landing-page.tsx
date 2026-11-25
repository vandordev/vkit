import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";
import { Story } from "./story";

export function LandingPage() {
	return (
		<div className="vk">
			<SiteNav />
			<main>
				<Story />
			</main>
			<SiteFooter />
		</div>
	);
}
