import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemePreference } from "@/lib/theme";

const options: { value: ThemePreference; label: string; Icon: typeof Sun }[] = [
	{ value: "system", label: "System theme", Icon: Monitor },
	{ value: "light", label: "Light theme", Icon: Sun },
	{ value: "dark", label: "Dark theme", Icon: Moon },
];

export function ThemeSwitch() {
	const [theme, setTheme] = useTheme();
	return (
		<div className="vk-theme" role="radiogroup" aria-label="Theme">
			{options.map(({ value, label, Icon }) => (
				<button key={value} type="button" role="radio" aria-checked={theme === value} aria-label={label} title={label} onClick={() => setTheme(value)}>
					<Icon aria-hidden="true" size={15} strokeWidth={1.75} />
				</button>
			))}
		</div>
	);
}
