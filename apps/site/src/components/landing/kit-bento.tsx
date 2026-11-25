import { DisplayHeading } from "@repo/ui/display-heading";
import { kits } from "@/content";
import { CopyCommand } from "./copy-command";

const tones = { zenith: "tone tone-sky", orbit: "tone tone-lilac" } as const;

// Kit choice is a native radio group; CSS :has() swaps the command, so it works without JavaScript.
export function KitBento() {
	return (
		<section id="kits" className="lp-section">
			<div className="lp-wrap">
				<div className="lp-head">
					<DisplayHeading as="h2" className="lp-display">
						Two kits. <span className="lp-sub">One command to start.</span>
					</DisplayHeading>
					<p className="lp-body">Pick a kit, copy its command, and the code is yours to build on.</p>
				</div>
				<fieldset className="lp-bento lp-kits" aria-label="Pick a kit">
					{kits.map((kit, index) => (
						<label key={kit.name} className={`lp-tile lp-kit ${tones[kit.name]}`}>
							<input type="radio" name="kit" value={kit.name} defaultChecked={index === 0} className="lp-kit-input" />
							<span className="lp-kit-head">
								<b>{kit.name}</b>
								<span>{kit.backend} backend</span>
							</span>
							<span className="cap">{kit.summary}</span>
							<span className="lp-kit-stack">{kit.stack}</span>
						</label>
					))}
					<div className="lp-tile lp-kit-next">
						<p className="cap">
							<b>Make it yours.</b>{" "}
							<span>
								On zenith, build your domain on top of auth, organizations and backoffice. On orbit, replace the document-processing domain with
								your own.
							</span>
						</p>
					</div>
					<div className="lp-tile tone tone-ink lp-kit-command">
						{kits.map((kit) => (
							<div key={kit.name} className="lp-command" data-kit={kit.name}>
								<CopyCommand command={kit.startCommand} />
								<a href={kit.repoUrl}>Read the {kit.name} repository</a>
							</div>
						))}
					</div>
				</fieldset>
			</div>
		</section>
	);
}
