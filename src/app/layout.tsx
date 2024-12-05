import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ClerkProvider from "@/components/partials/providers/clerk-provider";
import NuqsProvider from "@/components/partials/providers/nuqs-provider";
import ToastProvider from "@/components/partials/providers/toast-provider";
import { cn } from "@/lib/utils";

import "@/app/globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MOOM",
  description: "Video calling application",
  icons: {
    icon: "/icons/mobile-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("antialiased bg-dark-2", inter.className)}>
          <main>
            <NuqsProvider>{children}</NuqsProvider>
            <ToastProvider />
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
