"use client";

import { useState } from "react";
import ReactDatePicker from "react-datepicker";

import MeetingCard from "@/features/home/components/meeting-cards/meeting-card";
import MeetingModal from "@/features/home/components/meeting-cards/meeting-modal";
import { MEETING_CARD_ITEMS } from "@/features/home/core/constants";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import "react-datepicker/dist/react-datepicker.css";
import { useMeetingType } from "../../core/hooks";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingCards = () => {
  const [values, setValues] = useState(initialValues);
  const { meetingType, setMeetingType } = useMeetingType();

  const meetingCardItems = MEETING_CARD_ITEMS({ setMeetingType });

  const handleClose = () => setMeetingType("");

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {meetingCardItems.map((item) => {
        const { image, title, description, className, handleClick } = item;

        return (
          <MeetingCard
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
      />
      <MeetingModal
        isOpen={meetingType === "join-meeting"}
        onClose={handleClose}
        title="Type the link here"
        buttonText="Join Meeting"
        className="text-center"
      >
        <Input
          value={values.link}
          placeholder="Meeting link"
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>
      <MeetingModal
        isOpen={meetingType === "schedule-meeting"}
        onClose={handleClose}
        title="Create Meeting"
        buttonText="Schedule Meeting"
        className="text-center"
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
    </div>
  );
};

export default MeetingCards;
