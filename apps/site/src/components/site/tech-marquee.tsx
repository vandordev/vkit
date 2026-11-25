import { kits, type Tech } from "@/content";
import LogoLoop from "../reactbits/LogoLoop";
import { Logo } from "./logo";

// Every technology across both kits, once, in the order they first appear.
const all: Tech[] = [...new Map(kits.flatMap((k) => k.stack.flatMap((l) => l.items)).map((t) => [t.name, t])).values()];

export function TechMarquee() {
	return (
		<section className="vk-marquee" aria-label="Technologies used across the kits">
			<LogoLoop
				logos={all.map((tech) => ({
					node: (
						<span className="vk-marquee__item">
							<Logo tech={tech} />
							{tech.name}
						</span>
					),
					title: tech.name,
				}))}
				speed={42}
				direction="right"
				gap={44}
				logoHeight={20}
				pauseOnHover
				fadeOut
				fadeOutColor="var(--background)"
				ariaLabel="Technologies used across the kits"
			/>
		</section>
	);
}
