import type { Meta, StoryObj } from "@storybook/react";
import { KitBento } from "./kit-bento";
import { withLandingFrame } from "./story-frame";

const meta = {
	title: "Site/Landing/Kit bento",
	component: KitBento,
	decorators: [withLandingFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof KitBento>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
