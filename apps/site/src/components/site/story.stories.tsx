import type { Meta, StoryObj } from "@storybook/react";
import { Story } from "./story";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Story (hero and chapters)",
	component: Story,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Story>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
