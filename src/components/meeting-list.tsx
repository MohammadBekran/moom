"use client";

import { CallRecording } from "@stream-io/node-sdk";
import { Call } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loader from "@/components/loader";
import MeetingCard from "@/components/meeting-card";
import { useGetCalls } from "@/core/hooks";
import { EMeetingType } from "@/core/enum";
import { toast } from "sonner";

const MeetingList = ({ type }: { type: EMeetingType }) => {
  const [recordings, setRecordings] = useState<CallRecording[]>();
  const router = useRouter();
  const {
    calls: recordingCalls,
    upcomingCalls,
    endedCalls,
    isLoading,
  } = useGetCalls();

  const getCalls = () => {
    switch (type) {
      case "upcoming":
        return upcomingCalls;
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };

  const getNoMeetingMessage = () => {
    switch (type) {
      case "upcoming":
        return "No Upcoming Calls";
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  useEffect(() => {
    const fetchRecordingCalls = async () => {
      try {
        const recordingsData = await Promise.all(
          recordingCalls?.map(
            async (meeting) => await meeting.queryRecordings()
          ) ?? []
        );

        const recordingMeetings = recordingsData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        // @ts-expect-error an unexpected error
        setRecordings(recordingMeetings);
      } catch (error) {
        console.error(error);

        toast.error("Try again later");
      }
    };

    if (type === "recordings") fetchRecordingCalls();
  }, [type, recordingCalls]);

  const calls = getCalls();
  const noMeetingMessage = getNoMeetingMessage();

  if (isLoading) return <Loader screenHight={false} />;

  const renderTitle = () => {
    switch (type) {
      case "upcoming":
        return "Upcoming meetings";
      case "ended":
        return "Previous meetings";
      case "recordings":
        return "Recording meetings";
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">{renderTitle()}</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {calls &&
          calls.map((meeting) => {
            const { id, state } = meeting as Call;
            const recordingMeeting = meeting as CallRecording;

            const renderName =
              state?.custom?.description ||
              recordingMeeting?.filename?.substring(0, 20) ||
              "No description";
            const renderDate =
              state?.startsAt?.toLocaleString() ||
              recordingMeeting.start_time.toLocaleString();
            const icon =
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg";
            const link =
              type === "recordings"
                ? recordingMeeting.url
                : `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${id}`;
            const buttonIcon =
              type === "recordings" ? "/icons/play.svg" : undefined;
            const buttonText = type === "recordings" ? "Play" : "Start";
            const isPreviousMeeting = type === "ended";
            const handleClick = () =>
              router.push(
                type === "recordings"
                  ? `${recordingMeeting.url}`
                  : `/meeting/${id}`
              );

            return (
              <MeetingCard
                key={id ?? recordingMeeting.url}
                isPreviousMeeting={isPreviousMeeting}
                name={renderName}
                date={renderDate!}
                icon={icon}
                link={link}
                buttonIcon={buttonIcon}
                buttonText={buttonText}
                handleClick={handleClick}
              />
            );
          })}
        {calls?.length === 0 && (
          <h1 className="text-2xl font-bold">{noMeetingMessage}</h1>
        )}
      </div>
    </div>
  );
};

export default MeetingList;
