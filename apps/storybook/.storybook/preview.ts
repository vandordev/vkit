import type { Decorator, Preview } from "@storybook/react";
import "./styles.css";

// Explicit light/dark: tokens switch on the `.dark` class of the document root.
const withTheme: Decorator = (Story, context) => {
	document.documentElement.classList.toggle("dark", context.globals.theme === "dark");
	return Story();
};

const preview: Preview = {
	decorators: [withTheme],
	globalTypes: {
		theme: { description: "Color scheme", toolbar: { title: "Theme", icon: "circlehollow", items: ["light", "dark"], dynamicTitle: true } },
	},
	initialGlobals: { theme: "light" },
	parameters: { layout: "padded", controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } } },
};

export default preview;
