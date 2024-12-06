"use client";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";

import MeetingRoom from "@/features/meeting/components/meeting-room";
import MeetingSetup from "@/features/meeting/components/meeting-setup";

import Loader from "@/components/loader";
import Alert from "@/components/ui/alert";
import { useGetCallById } from "@/core/hooks";

const Meeting = ({ meetingId }: { meetingId: string }) => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { user, isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById({ id: meetingId });

  if (!isLoaded || isCallLoading) return <Loader />;

  if (!call) {
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call not found
      </p>
    );
  }

  const notAllowed =
    call.type === "invited" &&
    (!user ||
      !call.state.members.find((member) => member.user.id === user?.id));

  if (notAllowed) {
    return <Alert title="You are not allowed to join this meeting" />;
  }

  return (
    <div className="w-full h-screen">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </div>
  );
};

export default Meeting;
