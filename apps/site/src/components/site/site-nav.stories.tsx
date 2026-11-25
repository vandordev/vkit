import type { Meta, StoryObj } from "@storybook/react";
import { SiteNav } from "./site-nav";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Nav",
	component: SiteNav,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SiteNav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
