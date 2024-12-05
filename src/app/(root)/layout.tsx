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
        {children}
      </div>
    </div>
  );
};

export default Layout;
