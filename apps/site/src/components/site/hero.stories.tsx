import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./hero";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Hero",
	component: Hero,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
