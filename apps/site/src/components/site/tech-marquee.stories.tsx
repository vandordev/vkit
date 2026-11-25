import type { Meta, StoryObj } from "@storybook/react";
import { TechMarquee } from "./tech-marquee";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Tech marquee",
	component: TechMarquee,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TechMarquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
