import MeetingList from "@/components/meeting-list";

const Previous = () => {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Previous Meetings</h1>
      <MeetingList type="ended" />
    </div>
  );
};

export default Previous;
