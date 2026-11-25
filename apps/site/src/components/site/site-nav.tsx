import { ZenithMark, ZenithWordmark } from "@repo/ui/zenith-mark";
import { repoUrl } from "@/content";
import { ThemeSwitch } from "./theme-switch";

export function SiteNav() {
	return (
		<header className="vk-nav">
			<div className="vk-wrap vk-nav__row">
				<a className="vk-brand" href="/">
					<ZenithMark size={22} />
					<ZenithWordmark />
				</a>
				<nav aria-label="Primary" className="vk-nav__links">
					<a href="/#start">Kits</a>
					<a href="/roadmap">Roadmap</a>
					<a href={repoUrl}>GitHub</a>
				</nav>
				<ThemeSwitch />
			</div>
		</header>
	);
}
