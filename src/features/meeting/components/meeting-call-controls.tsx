import { CallControls, CallStatsButton } from "@stream-io/video-react-sdk";
import { LayoutList, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import EndCallButton from "@/features/meeting/components/end-call-button";
import { MEETING_LAYOUT_OPTIONS } from "@/features/meeting/core/constants";
import { TCallLayout } from "@/features/meeting/core/types";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface IMeetingCallControlsProps {
  isPersonalRoom: boolean;
  setLayout: (layout: TCallLayout) => void;
  setShowParticipants: Dispatch<SetStateAction<boolean>>;
}

const MeetingCallControls = ({
  isPersonalRoom,
  setLayout,
  setShowParticipants,
}: IMeetingCallControlsProps) => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 w-full flex flex-wrap justify-center items-center gap-5 p-3 lg:p-0">
      <CallControls onLeave={() => router.push("/")} />
      <DropdownMenu>
        <div className="flex items-center">
          <DropdownMenuTrigger className="rounded-2xl cursor-pointer py-2 px-4 bg-[#19232d] hover:bg-[#4c535b]">
            <LayoutList size={20} className="text-white" />
          </DropdownMenuTrigger>
        </div>
        <DropdownMenuContent className="bg-dark-1 border-dark-1 text-white">
          {MEETING_LAYOUT_OPTIONS.map((option, index) => (
            <div key={index}>
              <DropdownMenuItem
                className="hover:!bg-dark-4 hover:!text-white"
                onClick={() => setLayout(option.toLowerCase() as TCallLayout)}
              >
                {option}
              </DropdownMenuItem>
              <DropdownMenuSeparator
                className={cn("bg-muted-foreground", {
                  hidden: index === 2,
                })}
              />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <CallStatsButton />
      <Button
        onClick={() => setShowParticipants((prev) => !prev)}
        className="rounded-2xl cursor-pointer py-2 px-4 bg-[#19232d] hover:bg-[#4c535b]"
      >
        <Users size={20} className="text-white" />
      </Button>
      {!isPersonalRoom && <EndCallButton />}
    </div>
  );
};

export default MeetingCallControls;
