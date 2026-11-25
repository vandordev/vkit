import type { Meta, StoryObj } from "@storybook/react";
import { ForAgents } from "./for-agents";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/For agents",
	component: ForAgents,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ForAgents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
