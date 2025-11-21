import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownButton from "@/components/button/DropdownButton";
import Image from "next/image";
import SecondaryButton from "@/components/button/SecondaryButton";
import Link from "next/link";
import { LucideProps } from "lucide-react";

interface IMenuList {
  key: string;
  label: string;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  href: string;
}

interface DropdownMenuListProps {
  menuList: IMenuList[];
  buttonText: string;
  menuLabel?: string;
  labelIcon?: string;
  showSecondaryButton?: boolean;
  secondaryButtonText?: string;
}

const DropdownMenuList = ({ menuList, menuLabel, labelIcon, showSecondaryButton, secondaryButtonText, buttonText }: DropdownMenuListProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <DropdownButton type="dark" buttonText={buttonText} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 me-3 bg-linear-to-b from-gray-800 to-gray-700 border-gray-700 text-white">
        {menuLabel && <>
          <DropdownMenuLabel>
            <div className="flex items-center gap-2">
              {labelIcon && <Image src={labelIcon} alt="profile image" width={40} height={40} className="w-10 h-10" />}
              <span className="text-lg">{menuLabel}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-700" />
        </>}
        {menuList.map((item) => {
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
        {showSecondaryButton && <>
          <DropdownMenuSeparator className="bg-gray-600" />
          <DropdownMenuItem className="flex justify-center focus:bg-transparent">
            <SecondaryButton className="w-full">{secondaryButtonText}</SecondaryButton>
          </DropdownMenuItem>
        </>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuList;
