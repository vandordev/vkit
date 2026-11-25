import type { Meta, StoryObj } from "@storybook/react";
import { RoadmapPage } from "./roadmap-page";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Roadmap page",
	component: RoadmapPage,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof RoadmapPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
