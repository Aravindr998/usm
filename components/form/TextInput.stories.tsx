import { Meta, StoryObj } from "@storybook/nextjs";
import TextInput from "./TextInput";
import { fn } from "storybook/test";

const meta = {
    title: "Form/TextInput",
    component: TextInput,
    tags: ["autodocs"]
} satisfies Meta<typeof TextInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        label: "Label",
        placeholder: "",
        type: "text",
        id: "unique_id",
        error: "",
        name: "unique_id",
        onChange: fn(),
        value: ""
    }
}

export const WithoutLabel: Story = {
    args: {
        ...Default.args,
        label: "",
        placeholder: "Placeholder",
    }
}

export const TypeEmail: Story = {
    args: {
        ...Default.args,
        type: "email"
    }
}

export const TypePassword: Story = {
    args: {
        ...Default.args,
        type: "password"
    }
}

export const Error: Story = {
    args: {
        ...Default.args,
        error: "Error Text"
    }
}

export const Prefilled: Story = {
    args: {
        ...Default.args,
        value: "Prefilled Value"
    }
}