"use client";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";

import HomeMeetingCard from "@/features/home/components/meeting-cards/home-meeting-card";
import MeetingModal from "@/features/home/components/meeting-cards/meeting-modal";
import { MEETING_CARD_ITEMS } from "@/features/home/core/constants";
import { useMeetingType } from "@/features/home/core/hooks";

import Loader from "@/components/loader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { copyText, toast } from "@/lib/utils";

import "react-datepicker/dist/react-datepicker.css";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingCards = () => {
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);
  const router = useRouter();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { meetingType, setMeetingType } = useMeetingType();

  const meetingCardItems = MEETING_CARD_ITEMS({
    setMeetingType,
    onClickRecordings: () => router.push("/meetings-list?type=recordings"),
  });

  const handleClose = () => setMeetingType("");

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      setIsCreatingMeeting(true);

      if (!values.dateTime) {
        toast.error("Please select a date and time");

        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create meeting");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: { description },
        },
      });

      setCallDetail(call);

      if (!values.description) router.push(`/meeting/${call.id}`);

      toast.success("Meeting created");
    } catch (error) {
      setIsCreatingMeeting(false);

      console.error(error);
      toast.error("Failed to create Meeting");
    } finally {
      setIsCreatingMeeting(false);
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${callDetail?.id}`;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {meetingCardItems.map((item) => {
        const { image, title, description, className, handleClick } = item;

        return (
          <HomeMeetingCard
            key={image}
            image={image}
            title={title}
            description={description}
            className={className}
            handleClick={handleClick}
          />
        );
      })}
      <MeetingModal
        isOpen={meetingType === "new-meeting"}
        onClose={handleClose}
        title="Start an Instant Meeting"
        buttonText="Start Meeting"
        className="text-center"
        isLoading={isCreatingMeeting}
        handleClick={createMeeting}
      />
      <MeetingModal
        isOpen={meetingType === "join-meeting"}
        onClose={handleClose}
        title="Type the link here"
        buttonText="Join Meeting"
        className="text-center"
        handleClick={() => router.push(values.link)}
      >
        <Input
          value={values.link}
          placeholder="Meeting link"
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingType === "schedule-meeting"}
          onClose={handleClose}
          title="Create Meeting"
          buttonText="Schedule Meeting"
          className="text-center"
          isLoading={isCreatingMeeting}
          handleClick={createMeeting}
        >
          <div className="space-y-2.5">
            <Label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </Label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col space-y-2.5">
            <Label className="block text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </Label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded p-2 bg-dark-3 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingType === "schedule-meeting"}
          onClose={handleClose}
          title="Meeting Created"
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
          className="text-center"
          handleClick={() => copyText(meetingLink)}
        />
      )}
    </div>
  );
};

export default MeetingCards;
