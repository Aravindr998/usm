import { Meta, StoryObj } from "@storybook/nextjs";
import OtpTimer from "./OtpTimer";
import { fn } from "storybook/test";

const meta = {
    title: "Auth/OtpTimer",
    component: OtpTimer,
    tags: ["autodocs"]
} satisfies Meta<typeof OtpTimer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
       intervalPeriod: 5,
       resend: fn(),
       error: {},
       loading: false,
       data: {} 
    }
}

export const OneMinuteInterval: Story = {
    args: {
        ...Default.args,
        intervalPeriod: 60
    }
}

export const Loading: Story = {
    args: {
        ...Default.args,
        loading: true
    }
}

export const Error: Story = {
    args: {
        ...Default.args,
        error: {
            message: ""
        }
    }
}

export const Succeess: Story = {
    args: {
        ...Default.args,
        data: {
            success: true
        }
    }
}