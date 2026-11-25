import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { brand } from "@repo/brand";
import { hero, siteUrl } from "@/content";
import { themeInitScript } from "@/lib/theme";
import appCss from "@/styles.css?url";

const title = `${brand.name} — ${hero.title}`;

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title },
			{ name: "description", content: hero.lead },
			{ property: "og:title", content: title },
			{ property: "og:description", content: hero.lead },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: `${siteUrl}/` },
		],
		scripts: [{ children: `document.documentElement.classList.add("js");${themeInitScript}` }],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: "/favicon.svg" },
			{ rel: "canonical", href: `${siteUrl}/` },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
