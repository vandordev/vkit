import type { Meta, StoryObj } from "@storybook/react";
import { Stage } from "./stage";
import { withSiteFrame } from "./story-frame";

const meta = {
	title: "Site/Stage",
	component: Stage,
	decorators: [withSiteFrame, (S) => <div style={{ height: 640 }}>{S()}</div>],
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Stage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
