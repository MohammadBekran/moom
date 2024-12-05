const HeroSection = () => {
  const now = new Date();

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  const date = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
    now
  );

  return (
    <div className="w-full h-[303px] rounded-[20px] bg-hero bg-cover text-white">
      <div className="h-full flex flex-col justify-between max-md:py-8 max-md:px-5 lg:p-11">
        <div className="max-w-[273px] rounded py-2 bg-glassmorphism">
          <h2 className="text-center text-base font-normal">
            Upcoming Meeting at: 12:30 PM
          </h2>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
          <span className="text-lg font-medium text-sky-1 lg:text-2xl">
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
