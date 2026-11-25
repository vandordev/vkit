import { Hero } from "./_components/hero";
import { NextSteps } from "./_components/next-steps";
import { SiteFooter } from "./_components/site-footer";
import { SiteHeader } from "./_components/site-header";
import { StartSteps } from "./_components/start-steps";

export default function Page() {
	return (
		<div className="vk">
			<SiteHeader />
			<main>
				<Hero />
				<StartSteps />
				<NextSteps />
			</main>
			<SiteFooter />
		</div>
	);
}
