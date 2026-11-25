import type { Meta, StoryObj } from "@storybook/react";
import { ClosingCta } from "./closing-cta";
import { withLandingFrame } from "./story-frame";

const meta = {
	title: "Site/Landing/What's next",
	component: ClosingCta,
	decorators: [withLandingFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ClosingCta>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
