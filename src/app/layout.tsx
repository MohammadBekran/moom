import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ClerkProvider from "@/components/partials/providers/clerk-provider";
import { cn } from "@/lib/utils";

import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MOOM",
  description: "Video calling application",
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
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
