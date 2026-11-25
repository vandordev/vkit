import { marked } from "marked";
import roadmap from "../../../../../ROADMAP.md?raw";
import { SiteFooter } from "./site-footer";
import { SiteNav } from "./site-nav";

// ROADMAP.md is the single source; it is our own file, rendered at build time.
const html = marked.parse(roadmap, { async: false });

export function RoadmapPage() {
	return (
		<div className="vk">
			<SiteNav />
			<main className="vk-wrap">
				<article className="vk-prose" dangerouslySetInnerHTML={{ __html: html }} />
			</main>
			<SiteFooter />
		</div>
	);
}
