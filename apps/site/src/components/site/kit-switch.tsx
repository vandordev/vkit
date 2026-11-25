import { kits } from "@/content";

/** The kit choice: native radios in the sticky nav, so every section can switch kits; CSS :has() does the rest. */
export function KitSwitch() {
	return (
		<fieldset className="vk-switch" aria-label="Kit">
			{kits.map((k, i) => (
				<label key={k.name}>
					<input type="radio" name="kit" value={k.name} defaultChecked={i === 0} />
					<span>{k.name}</span>
				</label>
			))}
		</fieldset>
	);
}
