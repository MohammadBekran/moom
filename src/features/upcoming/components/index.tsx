"use client";

import { useRouter } from "next/navigation";

import MeetingCard from "@/components/meeting-card";
import { useGetCalls } from "@/core/hooks";

const Upcoming = () => {
  const router = useRouter();
  const { upcomingCalls } = useGetCalls();

  console.log(upcomingCalls);

  return (
    <div className="space-y-10 text-white">
      <h1 className="text-3xl font-bold">Upcoming Meetings</h1>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {upcomingCalls &&
          upcomingCalls.map((meeting) => {
            const { id, state } = meeting;

            const renderName = state.custom.description || "No description";
            const renderDate = state.startsAt?.toLocaleString();
            const meetingLink = `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${id}`;
            const handleClick = () => router.push(`/meeting/${id}`);

            return (
              <MeetingCard
                key={id}
                name={renderName}
                date={renderDate!}
                link={meetingLink}
                handleClick={handleClick}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Upcoming;
