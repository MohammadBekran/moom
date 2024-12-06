import StreamVideoProvider from "@/components/partials/providers/stream-client-provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="text-white">
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default Layout;
