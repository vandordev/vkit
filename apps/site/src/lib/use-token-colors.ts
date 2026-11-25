import { useEffect, useState } from "react";

/** Reads hex color tokens from the root and re-reads them when the theme class changes (canvas effects need values, not var()). */
export function useTokenColors<const T extends readonly string[]>(names: T): Record<T[number], string> | null {
	const [colors, setColors] = useState<Record<T[number], string> | null>(null);
	useEffect(() => {
		const read = () => {
			const css = getComputedStyle(document.documentElement);
			setColors(Object.fromEntries(names.map((n) => [n, css.getPropertyValue(n).trim()])) as Record<T[number], string>);
		};
		read();
		const observer = new MutationObserver(read);
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
		// Token names are a static list per caller, so this runs once.
	}, []);
	return colors;
}
