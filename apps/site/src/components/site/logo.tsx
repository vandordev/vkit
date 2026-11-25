import type { Tech } from "@/content";

const initials = (name: string) =>
	name
		.split(/[\s-]+/)
		.map((w) => w[0])
		.join("")
		.slice(0, 2);

/** Simple Icons logo in the text color (brand color on hover); a hexagon monogram when Simple Icons has none. */
export function Logo({ tech }: { tech: Tech }) {
	if (!tech.icon) {
		return (
			<svg viewBox="0 0 24 24" className="vk-logo vk-logo--mono" aria-hidden="true">
				<path d="M12 1.5 21.1 6.75v10.5L12 22.5l-9.1-5.25V6.75Z" />
				<text x="12" y="12.6" textAnchor="middle" dominantBaseline="middle">
					{initials(tech.name)}
				</text>
			</svg>
		);
	}
	return (
		<svg viewBox="0 0 24 24" className="vk-logo" aria-hidden="true" style={{ ["--brand" as string]: `#${tech.icon.hex}` }}>
			<path d={tech.icon.path} />
		</svg>
	);
}
