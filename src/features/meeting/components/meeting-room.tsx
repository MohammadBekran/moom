import {
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMedia } from "react-use";

import MeetingCallControls from "@/features/meeting/components/meeting-call-controls";
import type { TCallLayout } from "@/features/meeting/core/types";

import Loader from "@/components/loader";
import ResponsiveModal from "@/components/responsive-modal";
import { cn } from "@/lib/utils";

const MeetingRoom = () => {
  const isMobile = useMedia("(max-width: 1024px)", false);
  const [layout, setLayout] = useState<TCallLayout>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal");
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  useEffect(() => {
    setLayout(isMobile ? "grid" : "speaker-left");
  }, [isMobile, layout]);

  if (callingState !== CallingState.JOINED) return <Loader />;

  const handleShowParticipantList = () => setShowParticipants(false);

  const participantClassName = "hidden h-[calc(100vh-86px)] ml-2";

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative overflow-hidden w-full h-screen pt-4 text-white">
      <div className="relative size-full flex justify-center items-center">
        <div className="size-full max-w-[1000px] flex items-center">
          <CallLayout />
        </div>
        <div
          className={cn(participantClassName, {
            "hidden lg:block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={handleShowParticipantList} />
        </div>
        <ResponsiveModal
          open={showParticipants && isMobile}
          className="flex flex-col gap-6 border-none py-3 px-6 text-white lg:hidden"
          background="bg-dark-1"
          onOpenChange={handleShowParticipantList}
        >
          <CallParticipantsList onClose={handleShowParticipantList} />
        </ResponsiveModal>
      </div>
      <MeetingCallControls
        isPersonalRoom={isPersonalRoom}
        setLayout={setLayout}
        setShowParticipants={setShowParticipants}
      />
    </section>
  );
};

export default MeetingRoom;
