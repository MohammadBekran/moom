import MobileNavbar from "@/components/mobile-navbar";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <div className="block lg:hidden">
        <MobileNavbar />
      </div>
      <div className="flex">
        <Sidebar />
        <section className="min-h-screen flex flex-col flex-1 px-6 pt-28 pb-6 max-md:pb-14 sm:px-14">
          {children}
        </section>
      </div>
    </div>
  );
};

export default Layout;
