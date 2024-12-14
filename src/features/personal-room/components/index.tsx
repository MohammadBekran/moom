"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/core/hooks";
import PersonalMeetingItem from "@/features/personal-room/components/personal-meeting-item";
import { copyText } from "@/lib/utils";

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const topic = `${
    user?.username ? `${user?.username}'s` : "your"
  } meeting room`;
  const meetingId = user?.id ?? "";
  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${user?.id}?personal=true`;

  const { call } = useGetCallById({ id: meetingId });

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call("default", meetingId);

      const startsAt = new Date().toISOString();

      await newCall.getOrCreate({
        data: {
          starts_at: startsAt,
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const handleCopyInviteLink = () => copyText(inviteLink);

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Personal Meeting Room</h1>
      <div className="space-y-8">
        <PersonalMeetingItem title="Topic:" value={topic} />
        <PersonalMeetingItem title="Meeting ID:" value={meetingId} />
        <PersonalMeetingItem title="Invite Link:" value={inviteLink} />
      </div>
      <div className="flex gap-x-5">
        <Button className="bg-blue-1" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button className="bg-dark-3" onClick={handleCopyInviteLink}>
          Copy Invitation
        </Button>
      </div>
    </div>
  );
};

export default PersonalRoom;
