import type { Meta, StoryObj } from "@storybook/react";
import { Decisions } from "./decisions";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Decisions",
	component: Decisions,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Decisions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
