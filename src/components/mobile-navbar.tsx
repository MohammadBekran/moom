import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavigationLinks from "@/components/navigation-links";

const MobileNavbar = () => {
  return (
    <div className="fixed z-40 w-full flex justify-between items-center py-4 px-6 lg:px-10 bg-dark-1">
      <Image src="./icons/mobile-logo.svg" alt="Logo" width={32} height={32} />
      <div className="flex gap-x-5">
        <UserButton />
        <Sheet>
          <SheetTrigger>
            <Image
              src="/icons/hamburger.svg"
              alt="Hamburger icon"
              width={36}
              height={36}
            />
          </SheetTrigger>
          <SheetContent side="left" className="bg-dark-1 border-none">
            <SheetHeader className="mt-3 mb-12">
              <Image
                src="/icons/logo.svg"
                alt="Logo"
                width={150}
                height={150}
              />
            </SheetHeader>
            <VisuallyHidden>
              <SheetTitle></SheetTitle>
            </VisuallyHidden>
            <div>
              <NavigationLinks mobileNavbar />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default MobileNavbar;
