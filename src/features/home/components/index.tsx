"use client";

import { useGetCalls } from "@/core/hooks";
import HeroSection from "@/features/home/components/hero-section";
import MeetingCards from "@/features/home/components/meeting-cards";

const Home = () => {
  const { callRecordings, endedCalls, upcomingCalls } = useGetCalls();

  console.log("calls", { callRecordings, endedCalls, upcomingCalls });
  return (
    <div className="flex flex-col gap-5 text-white">
      <HeroSection />
      <MeetingCards />
    </div>
  );
};

export default Home;
