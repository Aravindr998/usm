import { Meta, StoryObj } from "@storybook/nextjs";
import AuthFormTemplate from "./AuthFormTemplate";
import GlassCard from "../Card/GlassCard";

const meta = {
    title: "AuthFormTemplate",
    component: AuthFormTemplate,
    tags: ["autodocs"],
    args: {
        sideText: "Side Text"
    }
} satisfies Meta<typeof AuthFormTemplate>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: (
            <div>Form Content</div>
        )
    }
}

export const WithGlassCard: Story = {
    args: {
        children: (
            <GlassCard>
                <div className="p-4">
                    <h3 className="text-lg font-semibold">Glass Card Title</h3>
                    <p>This is a sample card using the glass UI effect.</p>
                </div>
            </GlassCard>
        )
    }
}