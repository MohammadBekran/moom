import MeetingList from "@/components/meeting-list";

const Upcoming = () => {
  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold">Upcoming Meetings</h1>
      <MeetingList type="upcoming" />
    </div>
  );
};

export default Upcoming;
