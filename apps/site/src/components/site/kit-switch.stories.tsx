import type { Meta, StoryObj } from "@storybook/react";
import { KitSwitch } from "./kit-switch";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Kit switch",
	component: KitSwitch,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof KitSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
