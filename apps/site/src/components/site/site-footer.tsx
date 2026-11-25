import { ZenithMark, ZenithWordmark } from "@repo/ui/zenith-mark";
import { kits, repoUrl } from "@/content";

export function SiteFooter() {
	return (
		<footer className="vk-footer">
			<div className="vk-wrap vk-footer__row">
				<a className="vk-brand" href="/">
					<ZenithMark size={20} />
					<ZenithWordmark />
				</a>
				<nav aria-label="Footer" className="vk-footer__links">
					<a href="/roadmap">Roadmap</a>
					<a href={repoUrl}>GitHub</a>
					{kits.map((kit) => (
						<a key={kit.name} href={kit.repoUrl}>
							vkit-{kit.name}
						</a>
					))}
				</nav>
				<span className="vk-footer__legal">© 2026 Vandor · MIT license</span>
			</div>
		</footer>
	);
}
