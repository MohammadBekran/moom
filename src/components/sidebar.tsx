import NavigationLinks from "@/components/navigation-links";

const Sidebar = () => {
  return (
    <div className="sticky top-0 left-0 h-screen p-6 pt-28 max-sm:hidden lg:w-[264px] bg-dark-1">
      <NavigationLinks />
    </div>
  );
};

export default Sidebar;
