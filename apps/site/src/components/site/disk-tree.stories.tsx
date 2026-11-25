import type { Meta, StoryObj } from "@storybook/react";
import { DiskTree } from "./disk-tree";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/What lands on disk",
	component: DiskTree,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DiskTree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
