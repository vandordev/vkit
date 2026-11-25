import type { Decorator } from "@storybook/react";
import "../../site.css";

/** Storybook only: the site scope. A section's kit radios live in the hero, so sections render both kits here. */
export const withSiteFrame: Decorator = (Story) => (
	<div className="vk">
		<Story />
	</div>
);
