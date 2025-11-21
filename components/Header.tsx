"use client"

import { Bookmark, Settings, ShoppingBag, User } from "lucide-react";
import DropdownMenuList from "./DropdownMenuList";
import { ViewTransition } from "react";

const accountMenuList = [
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

const Header = () => {
  return (
    <div className="bg-linear-to-r from-gray-950 via-gray-900 to-gray-950 fixed top-0 left-0 right-0 h-18 p-3 z-20">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-lg">Hi Aravind</div>
      <ViewTransition name="site-title">
        <span className="text-5xl absolute left-1/2 top-1/2 -translate-1/2">Test</span>
      </ViewTransition>
      <div className="p-4 absolute right-5 top-1/2 -translate-y-1/2">
        <DropdownMenuList menuList={accountMenuList} buttonText="Account" labelIcon="/images/profile.png" menuLabel="Aravind R" showSecondaryButton secondaryButtonText="Logout" />
      </div>
    </div>
  );
};

export default Header;
