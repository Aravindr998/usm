import type { Meta, StoryObj } from "@storybook/nextjs";
import OtpInput from "./OtpInput";
import { fn } from "storybook/test";

const meta = {
    title: "Auth/OtpInput",
    component: OtpInput,
    tags: ["autodocs"]
} satisfies Meta<typeof OtpInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        count: 6,
        onChange: fn(),
        value: [],
        error: "",
        intervalPeriod: 5,
        resend: fn(),
        resendData: {},
        resendError: {},
        resendLoading: false
    }
}

export const FiveInput: Story = {
    args: {
        ...Default.args,
        count: 5
    }
}

export const Prefilled: Story = {
    args: {
        ...Default.args,
        value: ["1", "2", "3", "4", "5", "6"]
    }
}

export const Error: Story = {
    args: {
        ...Default.args,
        error: "Error Message"
    }
}

export const ResendError: Story = {
    args: {
        ...Default.args,
        resendError: {
            message: "Something went wrong"
        }
    }
}

export const ResendSuccess: Story = {
    args: {
        ...Default.args,
        resendData: {
            success: true
        }
    }
}

export const ResendLoading: Story = {
    args: {
       ...Default.args,
       resendLoading: true
    }
}

export const OneMinuteInterval: Story = {
    args: {
       ...Default.args,
       intervalPeriod: 60
    }
}