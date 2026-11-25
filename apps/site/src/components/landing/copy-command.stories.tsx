import type { Meta, StoryObj } from "@storybook/react";
import { CopyCommand } from "./copy-command";
import { withLandingFrame } from "./story-frame";

const meta = {
	title: "Site/Landing/Copy command",
	component: CopyCommand,
	decorators: [withLandingFrame, (Story) => <div className="lp-tile tone tone-ink">{Story()}</div>],
	args: { command: "bunx giget gh:vandordev/vkit-zenith my-app" },
} satisfies Meta<typeof CopyCommand>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
