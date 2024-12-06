import Image from "next/image";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Image
        src="/icons/loading-circle.svg"
        alt="Loading..."
        width={50}
        height={50}
      />
    </div>
  );
};

export default Loader;
