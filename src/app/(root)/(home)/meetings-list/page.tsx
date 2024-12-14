import { EMeetingType } from "@/core/enum";
import MeetingsList from "@/features/meetings-list/components";

const MeetingsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ type: EMeetingType }>;
}) => {
  const { type } = await searchParams;

  return <MeetingsList type={type} />;
};

export default MeetingsListPage;
