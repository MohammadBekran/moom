export const MEETING_CARD_ITEMS = ({
  setMeetingType,
  onClickRecordings,
}: {
  setMeetingType: (meetingType: string) => void;
  onClickRecordings: () => void;
}) => [
  {
    image: "/icons/add-meeting.svg",
    title: "New Meeting",
    description: "Start an instant meeting",
    className: "bg-orange-1",
    handleClick: () => setMeetingType("new-meeting"),
  },
  {
    image: "/icons/join-meeting.svg",
    title: "Join Meeting",
    description: "via invitation link",
    className: "bg-blue-1",
    handleClick: () => setMeetingType("join-meeting"),
  },
  {
    image: "/icons/schedule.svg",
    title: "Schedule Meeting",
    description: "Plan your meeting",
    className: "bg-purple-1",
    handleClick: () => setMeetingType("schedule-meeting"),
  },
  {
    image: "/icons/recordings.svg",
    title: "View Recordings",
    description: "Meeting Recordings",
    className: "bg-yellow-1",
    handleClick: onClickRecordings,
  },
];
