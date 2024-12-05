import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="fixed z-40 w-full flex justify-between items-center p-6 lg:px-10 bg-dark-1">
      <Image src="./icons/logo.svg" alt="Logo" width={120} height={50} />
      <UserButton />
    </div>
  );
};

export default Navbar;
