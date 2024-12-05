import { useQueryState } from "nuqs";

export const useMeetingType = () => {
  const [meetingType, setMeetingType] = useQueryState("meeting-type");

  return { meetingType, setMeetingType };
};
