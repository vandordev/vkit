import type { Meta, StoryObj } from "@storybook/react";
import { KitFacts } from "./kit-facts";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Facts",
	component: KitFacts,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof KitFacts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
