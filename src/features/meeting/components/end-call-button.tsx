import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMemberOwner =
    localParticipant && call.state.createdBy && call.state.createdBy.id;

  if (!isMemberOwner) return null;

  const endCall = async () => {
    await call.endCall();

    router.push("/");
  };

  return (
    <Button onClick={endCall} className="bg-red-500">
      End call for everyone
    </Button>
  );
};

export default EndCallButton;