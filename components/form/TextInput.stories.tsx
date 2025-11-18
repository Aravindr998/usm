import { Meta, StoryObj } from "@storybook/nextjs";
import TextInput from "./TextInput";
import { useState } from "react";
import { expect, within } from "storybook/test";

const meta = {
    title: "Form/TextInput",
    component: TextInput,
    tags: ["autodocs"],
    argTypes: {
        type: {
            control: "radio",
            options: ["text", "email", "password", "number"]
        },
        onChange: { action: "changed" }
    }
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
        type: "email",
        value: "test@email.com"
    }
}

export const TypePassword: Story = {
    args: {
        ...Default.args,
        type: "password",
        value: "Password"
    }
}

export const Error: Story = {
    args: {
        ...Default.args,
        error: "Error Text"
    },
    play: async ({canvasElement}) => {
        const canvas = within(canvasElement)
        await expect(canvas.getByText("Error Text")).toBeInTheDocument()
    }
}

export const Prefilled: Story = {
    args: {
        ...Default.args,
        value: "Prefilled Value"
    }
}

export const Controlled: Story = {
    args: {
        ...Default.args,
        label: "Controlled Input",
        value: ""
    },
    render: (args) => {
        const [val, setVal] = useState("")
        return <TextInput {...args} value={val} onChange={(e) => setVal(e.target.value)} />
    }
}