import { ClerkProvider as ClerkAuthProvider } from "@clerk/nextjs";

const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkAuthProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorBackground: "#1C1F2E",
          colorText: "#fff",
          colorPrimary: "#0E78F9",
          colorInputBackground: "#252A41",
          colorInputText: "#fff",
        },
      }}
    >
      {children}
    </ClerkAuthProvider>
  );
};

export default ClerkProvider;
