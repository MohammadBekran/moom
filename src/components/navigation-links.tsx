"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SIDEBAR_ITEMS } from "@/core/constants";
import { cn } from "@/lib/utils";

interface INavigationLinksProps {
  mobileNavbar?: boolean;
}

const NavigationLinks = ({ mobileNavbar }: INavigationLinksProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");

  const handleClickSidebarItem = ({ path }: { path: string }) => {
    router.push(path);
  };

  return (
    <ul className="space-y-6">
      {SIDEBAR_ITEMS.map((item, index) => {
        const { path, label, imageUrl } = item;

        const meetingType = path.split("?type=")[1];
        const isActive = pathname === item.path || type === meetingType;

        return (
          <li key={`${path}-${index}`}>
            <span
              className={cn(
                "flex justify-start items-center gap-x-4 rounded-lg cursor-pointer p-4",
                isActive && "bg-blue-1"
              )}
              onClick={() => handleClickSidebarItem({ path })}
            >
              <Image
                src={imageUrl}
                alt="Sidebar item image"
                width={24}
                height={24}
              />
              <span
                className={cn(
                  "text-lg font-semibold",
                  mobileNavbar ? "text-white" : "max-lg:hidden"
                )}
              >
                {label}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationLinks;
