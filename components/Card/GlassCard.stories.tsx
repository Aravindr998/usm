import type { Meta, StoryObj } from "@storybook/nextjs";
import GlassCard from "./GlassCard";

const meta = {
    title: "GlassCard",
    component: GlassCard,
    tags: ["autodocs"],
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: "A wrapper card component for a Glass effect"
            }
        }
    }
} satisfies Meta<typeof GlassCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: (
            <div className="p-4">
                <h3 className="text-lg font-semibold">Glass Card Title</h3>
                <p>This is a sample card using the glass UI effect.</p>
            </div>
        )
    }
}