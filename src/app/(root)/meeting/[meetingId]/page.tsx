import Meeting from "@/features/meeting/components";

const MeetingPage = async ({
  params,
}: {
  params: Promise<{ meetingId: string }>;
}) => {
  const { meetingId } = await params;

  return <Meeting meetingId={meetingId} />;
};

export default MeetingPage;
