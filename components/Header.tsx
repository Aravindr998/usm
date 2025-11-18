import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownButton from "./button/DropdownButton";
import SecondaryButton from "./button/SecondaryButton";
import { Bookmark, Settings, ShoppingBag, User } from "lucide-react";
import Link from "next/link";

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
    <div className="bg-linear-to-r from--gray-950 via-gray-900 to-gray-950 fixed top-0 left-0 right-0 h-18 flex items-center justify-between p-3">
      <div></div>
      <span className="text-5xl">Test</span>
      <div className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <DropdownButton type="dark" buttonText="Account" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56 me-3 bg-linear-to-b from-gray-800 to-gray-700 border-gray-700 text-white">
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <img src="/profile.png" className="w-10 h-10" />
                <span className="text-lg">Aravind R</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            {accountMenuList.map((item) => {
              const Icon = item.Icon;
              return (
                <DropdownMenuItem className="focus:bg-gray-500" key={item.key}>
                  <Link href={item.href} className="flex items-center gap-2 py-2">
                    <Icon color="white" />
                    <span className="text-white">{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}
            <DropdownMenuSeparator className="bg-gray-600" />
            <DropdownMenuItem className="flex justify-center focus:bg-transparent">
              <SecondaryButton className="w-full">Logout</SecondaryButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
