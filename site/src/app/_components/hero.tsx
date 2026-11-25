import { DisplayHeading } from "@/components/ui/display-heading";
import { hero } from "@/content";

export function Hero() {
	return (
		<div className="vk-wrap vk-hero">
			<DisplayHeading className="vk-display">{hero.title}</DisplayHeading>
			<p className="vk-lede">{hero.lead}</p>
		</div>
	);
}
