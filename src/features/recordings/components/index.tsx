import MeetingList from "@/components/meeting-list";

const Recordings = () => {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Recording Meetings</h1>
      <MeetingList type="recordings" />
    </div>
  );
};

export default Recordings;
