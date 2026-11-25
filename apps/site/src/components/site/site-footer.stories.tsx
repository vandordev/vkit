import type { Meta, StoryObj } from "@storybook/react";
import { SiteFooter } from "./site-footer";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Footer",
	component: SiteFooter,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
