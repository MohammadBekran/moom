import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoaded } = useUser();

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !isLoaded) return;

    const loadCalls = async () => {
      try {
        setIsLoading(true);

        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user?.id },
              { members: { $in: [user?.id] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.error(error);

        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, isLoaded, user?.id]);

  const now = new Date();

  const endedCalls = calls?.filter(({ state: { startsAt, endedAt } }: Call) => {
    return (startsAt && new Date(startsAt) < now) || !!endedAt;
  });
  const upcomingCalls = calls?.filter(({ state: { startsAt } }: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  return { calls, endedCalls, upcomingCalls, isLoading };
};

const useGetCallById = ({ id }: { id: string | string[] }) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        setIsCallLoading(true);

        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });

        if (calls.length > 0) setCall(calls[0]);

        setIsCallLoading(false);
      } catch (error) {
        console.error(error);

        setIsCallLoading(false);
      } finally {
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};

export { useGetCallById, useGetCalls };
