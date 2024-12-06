import { cn } from "@/lib/utils";
import Image from "next/image";

const Loader = ({ screenHight = true }: { screenHight?: boolean }) => {
  return (
    <div
      className={cn("w-full h-full flex justify-center items-center", {
        "min-h-screen": screenHight,
      })}
    >
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loader;
