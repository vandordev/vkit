import type { Decorator } from "@storybook/react";
import "./landing.css";
import "./kits.css";

/** Storybook only: the landing scope (light theme only, like zenith's landing). */
export const withLandingFrame: Decorator = (Story) => (
	<div className="lp">
		<Story />
	</div>
);
