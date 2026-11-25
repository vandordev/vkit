import { hero, kits, packageManagers, startCommand } from "@/content";
import { useTokenColors } from "@/lib/use-token-colors";
import BlurText from "../reactbits/BlurText";
import DotGrid from "../reactbits/DotGrid";
import { CopyButton } from "./copy-button";

export function Hero() {
	const colors = useTokenColors(["--border", "--foreground"] as const);
	return (
		<section id="start" className="vk-hero" aria-labelledby="hero-title">
			{/* Decorative: a field of dots that leans toward the pointer. Hidden from assistive tech, off under reduced motion. */}
			<div className="vk-hero__field" aria-hidden="true">
				{colors ? (
					<DotGrid dotSize={3} gap={22} baseColor={colors["--border"]} activeColor={colors["--foreground"]} proximity={130} shockRadius={220} shockStrength={3} glow={0} fade={0.55} />
				) : null}
			</div>
			<div className="vk-wrap vk-hero__inner">
				{/* BlurText renders a <p>, which cannot sit inside <h1>; the wrapper carries the heading role instead. */}
				<div id="hero-title" className="vk-hero__title" role="heading" aria-level={1} aria-label={hero.title}>
					<BlurText text={hero.title} animateBy="words" delay={60} trigger="load" className="vk-hero__blur" />
				</div>
				<p className="vk-lead">{hero.lead}</p>
				<div className="vk-cmd">
					<fieldset className="vk-cmd__pm" aria-label="Package manager">
						{packageManagers.map((pm, index) => (
							<label key={pm}>
								<input type="radio" name="pm" value={pm} defaultChecked={index === 0} />
								<span>{pm}</span>
							</label>
						))}
					</fieldset>
					{kits.map((kit) =>
						packageManagers.map((pm) => (
							<div key={`${kit.name}-${pm}`} className="vk-cmd__line" data-kit={kit.name} data-pm={pm}>
								<code>
									<span className="vk-cmd__prompt" aria-hidden="true">
										${" "}
									</span>
									{startCommand(kit.name, pm)}
								</code>
								<CopyButton text={startCommand(kit.name, pm)} />
							</div>
						)),
					)}
				</div>
			</div>
		</section>
	);
}
