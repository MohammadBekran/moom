import { ClerkProvider as ClerkAuthProvider } from "@clerk/nextjs";

const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <ClerkAuthProvider>{children}</ClerkAuthProvider>;
};

export default ClerkProvider;
