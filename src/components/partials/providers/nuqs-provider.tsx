import { NuqsAdapter } from "nuqs/adapters/next";

const NuqsProvider = ({ children }: { children: React.ReactNode }) => {
  return <NuqsAdapter>{children}</NuqsAdapter>;
};

export default NuqsProvider;
