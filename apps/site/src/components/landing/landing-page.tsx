import { ClosingCta } from "./closing-cta";
import { KitBento } from "./kit-bento";
import { LandingFooter } from "./landing-footer";
import { LandingHero } from "./landing-hero";
import { LandingNav } from "./landing-nav";

export function LandingPage() {
	return (
		<div className="lp">
			<LandingNav />
			<main>
				<LandingHero />
				<KitBento />
				<ClosingCta />
			</main>
			<LandingFooter />
		</div>
	);
}
