import { USER_AVATAR_IMAGES } from "@/core/constants";
import { cn, copyText } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface IMeetingCardProps {
  name: string;
  date: string;
  link: string;
  handleClick: () => void;
}

const MeetingCard = ({ name, date, link, handleClick }: IMeetingCardProps) => {
  return (
    <div className="w-full min-h-[258px] flex flex-col justify-between rounded-[14px] py-8 px-5 bg-dark-1 xl:max-w-[568px]">
      <div className="space-y-5">
        <Image
          src="/icons/upcoming.svg"
          alt="Upcoming"
          width={28}
          height={28}
        />
        <div className="flex flex-col gap-y-2">
          <span className="text-2xl font-bold">{name}</span>
          <span className="text-base font-normal">{date}</span>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          {USER_AVATAR_IMAGES.map((avatar, index) => (
            <div
              key={avatar}
              className={cn({
                "-ml-3": index !== 0,
              })}
            >
              <Image
                src={avatar}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ))}
          <div className="size-10 flex justify-center items-center rounded-full -ml-3 bg-dark-4">
            +5
          </div>
        </div>
        <div className="flex gap-x-2">
          <Button className="rounded px-6 bg-blue-1" onClick={handleClick}>
            Start
          </Button>
          <Button className="px-6 bg-dark-4" onClick={() => copyText(link)}>
            <Image src="/icons/copy.svg" alt="Copy" width={20} height={20} />
            Copy link
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
