import { cn } from "@/lib/utils";
import Image from "next/image";

interface IMeetingCardProps {
  image: string;
  title: string;
  description: string;
  className: string;
  handleClick: () => void;
}

const MeetingCard = ({
  image,
  title,
  description,
  className,
  handleClick,
}: IMeetingCardProps) => {
  return (
    <div
      className={cn(
        "w-full min-h-[260px] flex flex-col justify-between rounded-[14px] cursor-pointer py-6 px-4 xl:max-w-[270px]",
        className
      )}
      onClick={handleClick}
    >
      <div className="size-12 flex justify-center items-center rounded-[10px] bg-glassmorphism">
        <Image src={image} alt="meeting card image" width={27} height={27} />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default MeetingCard;
