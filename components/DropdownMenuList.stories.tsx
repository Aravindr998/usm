import { Meta, StoryObj } from "@storybook/nextjs";
import DropdownMenuList from "./DropdownMenuList";
import { Bookmark, Settings, ShoppingBag, User } from "lucide-react";

const meta = {
    title: "DropdownMenuList",
    component: DropdownMenuList,
    tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenuList>

export default meta

const menuList = [
  {
    key: "profile",
    label: "Profile",
    Icon: User,
    href: "/profile",
  },
  {
    key: "marketplace",
    label: "Marketplace",
    Icon: ShoppingBag,
    href: "/marketplace",
  },
  {
    key: "saved",
    label: "Saved",
    Icon: Bookmark,
    href: "/saved",
  },
  {
    key: "settings",
    label: "Settings",
    Icon: Settings,
    href: "/settings",
  },
];

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        menuList,
        buttonText: "Account",
    }
}

export const WithTopLabel: Story = {
    args: {
        ...Default.args,
        labelIcon: "/images/profile.png",
        menuLabel: "Aravind R",
    }
}

export const LabelWithoutIcon: Story = {
    args: {
        ...Default.args,
        menuLabel: "Aravind R",
    }
}

export const WithSecondaryButton: Story = {
    args: {
        ...Default.args,
        showSecondaryButton: true,
        secondaryButtonText: "Logout"
    }
}

export const WithButtonAndLabel: Story = {
    args: {
        ...Default.args,
        showSecondaryButton: true,
        secondaryButtonText: "Logout",
        labelIcon: "/images/profile.png",
        menuLabel: "Aravind R",
    }
}