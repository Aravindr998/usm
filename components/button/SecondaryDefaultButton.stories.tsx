import { Meta, StoryObj } from "@storybook/nextjs";
import SecondaryDefaultButton from "./SecondaryDefaultButton";

const meta = {
    title: "Button/SecondaryDefaultButton",
    component: SecondaryDefaultButton,
    tags: ["autodocs"],
    argTypes: {
        onClick: { action: "Clicked" }
    }
} satisfies Meta<typeof SecondaryDefaultButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: "Default",
        buttonType: "secondary",
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

export const Danger: Story = {
    args: {
        ...Default.args,
        children: "Danger",
        buttonType: "danger"
    }
}