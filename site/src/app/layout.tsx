import type { Metadata } from "next";
import type { ReactNode } from "react";
import { brand } from "@/brand/brand";
import { hero, siteUrl } from "@/content";
import "./globals.css";

const title = `${brand.name} — ${hero.title}`;

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title,
	description: hero.lead,
	applicationName: brand.name,
	alternates: { canonical: "/" },
	icons: { icon: "/favicon.svg" },
	openGraph: { title, description: hero.lead, url: "/", type: "website", siteName: brand.name },
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
