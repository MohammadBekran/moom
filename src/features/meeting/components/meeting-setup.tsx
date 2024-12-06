import {
  DeviceSettings,
  useCall,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

import Alert from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const { useCallEndedAt, useCallStartsAt } = useCallStateHooks();
  const callStartsAt = useCallStartsAt();
  const callEndedAt = useCallEndedAt();
  const callTimeNotArrived =
    callStartsAt && new Date(callStartsAt) > new Date();
  const callHasEnded = !!callEndedAt;

  const call = useCall();

  if (!call) {
    throw new Error("useStreamCall must be used within a StreamCall component");
  }

  const [isMicCamToggled, setIsMicCamToggled] = useState(false);

  useEffect(() => {
    if (isMicCamToggled) {
      call.camera.disable();
      call.microphone.disable();
    } else {
      call.camera.enable();
      call.microphone.enable();
    }
  }, [call.camera, call.microphone, isMicCamToggled]);

  if (callTimeNotArrived) {
    return (
      <Alert
        title={`Your Meeting has not started yet. It is scheduled for ${callStartsAt.toLocaleString()}`}
      />
    );
  }

  if (callHasEnded) {
    return (
      <Alert
        title="The call been ended by the host"
        iconUrl="/icons/call-ended.svg"
      />
    );
  }

  const handleJoinMeeting = () => {
    call.join();

    setIsSetupComplete(true);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3 text-white">
      <h1 className="text-center text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="h-16 flex justify-center items-center gap-3">
        <label className="flex justify-center items-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggled}
            onChange={(e) => setIsMicCamToggled(e.target.checked)}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button
        className="rounded-md py-2.5 px-4 bg-green-500"
        onClick={handleJoinMeeting}
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
