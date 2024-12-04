"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { SIDEBAR_ITEMS } from "@/core/constants";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 left-0 h-screen p-6 pt-28 max-sm:hidden lg:w-[264px] bg-dark-1 text-white">
      <ul className="space-y-6">
        {SIDEBAR_ITEMS.map((item) => {
          const { path, label, imageUrl } = item;

          const isActive =
            pathname === item.path || pathname.startsWith(item.path);

          return (
            <li key={path}>
              <Link
                href={item.path}
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
                <span className="text-lg font-semibold max-lg:hidden">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
