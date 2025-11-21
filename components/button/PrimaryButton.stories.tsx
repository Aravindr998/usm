import { Meta, StoryObj } from "@storybook/nextjs";
import PrimaryButton from "./PrimaryButton";

const meta = {
    title: "Button/PrimaryButton",
    component: PrimaryButton,
    tags: ["autodocs"],
    argTypes: {
        onClick: { action: "Clicked" }
    }
} satisfies Meta<typeof PrimaryButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: "Default",
        disabled: false,
        loading: false
    }
}

export const Disabled: Story = {
    args: {
        ...Default.args,
        children: "Disabled",
        disabled: true
    }
}

export const Loading: Story = {
    args: {
        ...Default.args,
        children: "Disabled",
        loading: true
    }
}