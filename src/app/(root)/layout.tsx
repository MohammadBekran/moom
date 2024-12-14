import StreamClientProvider from "@/components/partials/providers/stream-client-provider";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="text-white">
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
};

export default Layout;
