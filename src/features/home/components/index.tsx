import HeroSection from "@/features/home/components/hero-section";
import MeetingCards from "@/features/home/components/meeting-cards";

const Home = () => {
  return (
    <div className="flex flex-col gap-5 text-white">
      <HeroSection />
      <MeetingCards />
    </div>
  );
};

export default Home;
