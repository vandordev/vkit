import { ZenithMark, zenithWordmarkClassName } from "@repo/ui/zenith-mark";
import { siGithub } from "simple-icons";
import { repoUrl } from "@/content";
import { KitSwitch } from "./kit-switch";
import { ThemeSwitch } from "./theme-switch";

/** `kitSwitch` is on for the landing page only: the switch drives every kit-specific section below it. */
export function SiteNav({ kitSwitch = false }: { kitSwitch?: boolean }) {
	return (
		<header className="vk-nav">
			<div className="vk-wrap vk-nav__row">
				{/* The mark is Vandor's; "/ Vkit" names the product beside it. Screen readers hear "Vandor Vkit". */}
				<a className="vk-brand vk-brand--nav" href="/">
					<ZenithMark size={36} title="Vandor" />
					<span className={zenithWordmarkClassName}>
						<span aria-hidden="true" className="vk-brand__slash">
							/
						</span>
						Vkit
					</span>
				</a>
				{kitSwitch ? <KitSwitch /> : null}
				<nav aria-label="Primary" className="vk-nav__links">
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
