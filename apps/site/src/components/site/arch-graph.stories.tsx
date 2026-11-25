import type { Meta, StoryObj } from "@storybook/react";
import { ArchGraph } from "./arch-graph";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Architecture graph",
	component: ArchGraph,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ArchGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
