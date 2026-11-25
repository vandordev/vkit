import { CopyCommand } from "@/components/copy-command";
import { kits } from "@/content";

// Kit choice is a native radio group; CSS :has() swaps the command, so it works without JavaScript.
export function StartSteps() {
	return (
		<ol className="vk-wrap vk-steps">
			<li className="vk-step">
				<h2 className="vk-step__title" id="step-pick">
					Pick a kit
				</h2>
				<fieldset className="vk-kits" aria-labelledby="step-pick">
					{kits.map((kit, index) => (
						<label key={kit.name} className="vk-kit">
							<input type="radio" name="kit" value={kit.name} defaultChecked={index === 0} className="vk-kit__input" />
							<span className="vk-kit__head">
								<span className="vk-kit__name">{kit.name}</span>
								<span className="vk-kit__backend">{kit.backend} backend</span>
							</span>
							<span className="vk-kit__summary">{kit.summary}</span>
							<span className="vk-kit__stack">{kit.stack}</span>
						</label>
					))}
				</fieldset>
			</li>
			<li className="vk-step">
				<h2 className="vk-step__title">Run one command</h2>
				<div className="vk-commands">
					{kits.map((kit) => (
						<div key={kit.name} className="vk-command" data-kit={kit.name}>
							<CopyCommand command={kit.startCommand} />
							<a className="vk-command__repo" href={kit.repoUrl}>
								Read the {kit.name} repository
							</a>
						</div>
					))}
				</div>
			</li>
			<li className="vk-step">
				<h2 className="vk-step__title">Make it yours</h2>
				<p className="vk-step__text">
					The kit is now your code. On zenith, build your domain on top of its auth, organizations and backoffice. On orbit, replace the
					document-processing domain with your own.
				</p>
			</li>
		</ol>
	);
}
