import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitch } from "./theme-switch";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Theme switch",
	component: ThemeSwitch,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
