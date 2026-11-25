import { ZenithMark, ZenithWordmark } from "@repo/ui/zenith-mark";
import { siGithub } from "simple-icons";
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
					<a href={repoUrl} className="vk-nav__icon" aria-label="vkit on GitHub" title="GitHub">
						<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
							<path d={siGithub.path} />
						</svg>
					</a>
				</nav>
				<ThemeSwitch />
			</div>
		</header>
	);
}
