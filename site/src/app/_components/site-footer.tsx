import { repoUrl } from "@/content";

export function SiteFooter() {
	return (
		<footer className="vk-footer">
			<div className="vk-wrap vk-footer__row">
				<span>© 2026 Vandor · MIT license</span>
				<a href={repoUrl}>vandordev/vkit</a>
			</div>
		</footer>
	);
}
