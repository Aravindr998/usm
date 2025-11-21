import { Bookmark, Calendar, Inbox, Search, Settings, ShoppingBag, User, UserLock, UserRoundCog } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Fragment, ViewTransition } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";

// Menu items.
const items = [
  {
    title: "Account",
    subMenu: [
      {
        title: "Profile",
        url: "/profile",
        icon: User,
      },
      {
        title: "Marketplace",
        url: "/marketplace",
        icon: ShoppingBag,
      },
      {
        title: "Saved",
        url: "/saved",
        icon: Bookmark,
      }
    ],
  },
  {
    title: "Settings",
    subMenu: [
      {
        title: "Search Settings",
        url: "settings/search",
        icon: Search,
      },
      {
        title: "Profile Settings",
        url: "/settings/profile",
        icon: UserRoundCog,
      },
      {
        title: "Privacy",
        url: "/settings/privacy",
        icon: UserLock,
      },
      {
        title: "Others",
        url: "/settings/others",
        icon: Settings,
      },
    ],
  },
];

export default function AppSidebar() {
    const pathname = usePathname()
  return (
    <Sidebar className="border-gray-950">
        <SidebarHeader className="bg-gray-950 text-gray-300 text-3xl">
            <ViewTransition name="site-title">
                <Link href={"/"}>Test</Link>
            </ViewTransition>
        </SidebarHeader>
      <SidebarContent className="bg-linear-to-b from-gray-950 to-gray-900 text-gray-300 border-gray-950 ">
        {items.map((item, index, array) => {
          return (
            <Fragment key={item.title}>
                <SidebarGroup>
                <SidebarGroupLabel className="text-gray-500 text-md">{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu className="gap-3">
                    {item.subMenu.map((item) => (
                        <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild className={`hover:bg-linear-to-r hover:from-gray-700 hover:to-gray-600 hover:text-gray-300 active:text-gray-300 py-5 ${pathname === item.url ? "pointer-events-none": ""}`} isActive={pathname === item.url}>
                            <Link href={item.url}>
                            <item.icon />
                            <span className="text-lg">{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                    </SidebarMenu>
                </SidebarGroupContent>
                </SidebarGroup>
            {index !== (array.length - 1) && <Separator className="bg-gray-700" />}
            </Fragment>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
