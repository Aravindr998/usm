import { Meta, StoryObj } from "@storybook/nextjs";
import Datepicker from "./Datepicker";
import { fn } from "storybook/test";

const meta = {
    title: "Form/Datepicker",
    component: Datepicker,
    tags: ["autodocs"],
    argTypes: {
        onDateChange: { action: "Changed" }
    }
} satisfies Meta<typeof Datepicker>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        dateValue: undefined,
        onDateChange: fn(),
        placeholder: "Select Date"
    }
}

export const WithoutPlacehoder: Story = {
    args: {
        ...Default.args,
        placeholder: ""
    }
}

export const Prefilled: Story = {
    args: {
        ...Default.args,
        dateValue: new Date(),
    }
}
