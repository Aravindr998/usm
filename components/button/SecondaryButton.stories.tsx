import { Meta, StoryObj } from "@storybook/nextjs";
import SecondaryButton from "./SecondaryButton";
import { LogOut } from "lucide-react";

const meta = {
    title: "Button/SecondaryButton",
    component: SecondaryButton,
    tags: ["autodocs"]
} satisfies Meta<typeof SecondaryButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: "Default"
    },
    argTypes: {
        onClick: { action: "clicked" },
        loading: {
            control: "radio",
            options: [true, false]
        },
        disabled: {
            control: "radio",
            options: [true, false]
        }
    }
}

export const LogoutButton: Story = {
    args: {
        children: <div className="flex items-center gap-2">
            <LogOut />
            <span className="text-lg">Logout</span>
        </div>
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