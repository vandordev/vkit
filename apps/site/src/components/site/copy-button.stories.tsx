import type { Meta, StoryObj } from "@storybook/react";
import { CopyButton } from "./copy-button";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Copy button",
	component: CopyButton,
	decorators: [withSiteFrame],
	args: { text: "bunx giget gh:vandordev/vkit-zenith my-app" },
} satisfies Meta<typeof CopyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Outline: Story = { args: { label: "Copy prompt", variant: "outline" } };
