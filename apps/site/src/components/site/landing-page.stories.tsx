import type { Meta, StoryObj } from "@storybook/react";
import { LandingPage } from "./landing-page";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Landing page",
	component: LandingPage,
	decorators: [withSiteFrame],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof LandingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
