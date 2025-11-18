import type { Meta, StoryObj } from "@storybook/nextjs";
import NeoPopButton from "./NeoPopButton";
import { fn } from "storybook/test";

const meta = {
    title: "Main/NeoPopButton",
    component: NeoPopButton,
    tags: ["autodocs"],
    argTypes: {
        onClick: { action: "clicked" }
    },
    parameters: {
        docs: {
            description: {
                component: "A fully customizable button component with loading state. Supports all native `<button>` props through prop spreading."
            }
        }
    }
} satisfies Meta<typeof NeoPopButton>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        children: "Primary",
        loading: false,
    }
}

export const Loading: Story = {
    args: {
        children: "Loading",
        loading: true
    }
}

export const Disabled: Story = {
    args: {
        children: "Disabled",
        disabled: true
    }
}

export const Hovered: Story = {
    args: {
        children: "Hovered"
    },
    parameters: { pseudo: { hover: true } }
}