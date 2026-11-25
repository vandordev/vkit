import { ZenithMark } from "@/components/ui/zenith-mark";
import { brand } from "@/brand/brand";
import { repoUrl, roadmapUrl } from "@/content";

export function SiteHeader() {
	return (
		<header className="vk-header">
			<div className="vk-wrap vk-header__row">
				<a href="/" className="vk-brand">
					<ZenithMark size={28} />
					<span>{brand.name}</span>
				</a>
				<nav aria-label="Primary" className="vk-nav">
					<a href={roadmapUrl}>Roadmap</a>
					<a href={repoUrl}>GitHub</a>
				</nav>
			</div>
		</header>
	);
}
