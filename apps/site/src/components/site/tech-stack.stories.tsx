import type { Meta, StoryObj } from "@storybook/react";
import { TechStack } from "./tech-stack";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Tech stack",
	component: TechStack,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TechStack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
