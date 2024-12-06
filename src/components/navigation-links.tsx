"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_ITEMS } from "@/core/constants";
import { cn } from "@/lib/utils";

const NavigationLinks = ({ mobileNavbar }: { mobileNavbar?: boolean }) => {
  const pathname = usePathname();

  return (
    <ul className="space-y-6">
      {SIDEBAR_ITEMS.map((item, index) => {
        const { path, label, imageUrl } = item;

        const isActive = pathname === item.path;

        return (
          <li key={`${path}-${index}`}>
            <Link
              href={path}
              className={cn(
                "flex justify-start items-center gap-x-4 rounded-lg p-4",
                isActive && "bg-blue-1"
              )}
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
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavigationLinks;
