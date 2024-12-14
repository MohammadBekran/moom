"use client";

import { useRouter } from "next/navigation";

import MeetingList from "@/components/meeting-list";
import { EMeetingType } from "@/core/enum";

const MeetingsList = ({ type }: { type: EMeetingType }) => {
  const router = useRouter();

  const types = [
    EMeetingType.Upcoming,
    EMeetingType.Ended,
    EMeetingType.Recordings,
  ];

  if (!types.includes(type)) {
    router.push("/");
    router.refresh();
  } else {
    switch (type) {
      case EMeetingType.Upcoming:
        return <MeetingList type={EMeetingType.Upcoming} />;
      case EMeetingType.Ended:
        return <MeetingList type={EMeetingType.Ended} />;
      case EMeetingType.Recordings:
        return <MeetingList type={EMeetingType.Recordings} />;
      default:
    }
  }
};

export default MeetingsList;
