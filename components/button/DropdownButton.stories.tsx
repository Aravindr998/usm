import { Meta, StoryObj } from "@storybook/nextjs";
import DropdownButton from "./DropdownButton";

const meta = {
    title: "Button/DropdownButton",
    component: DropdownButton,
    tags: ["autodocs"]
} satisfies Meta<typeof DropdownButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        type: "light",
        buttonText: "Default"
    }
}

export const DarkMode: Story = {
    args: {
        type: "dark",
        buttonText: "Dark"
    },
    decorators: [
        (story) => (
            <div className="bg-black p-2">
                {story()}
            </div>
        )
    ]
}