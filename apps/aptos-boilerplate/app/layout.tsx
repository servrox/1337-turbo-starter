import "@repo/ui/globals.css";
import "./globals.css";

import { WrongNetworkAlert } from "@/components/WrongNetworkAlert";
import { ClientProvider } from "@/components/providers/client-provider";
import { Toaster } from "@repo/ui/components/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  applicationName: "Aptos Boilerplate Template",
  title: "NextJS Boilerplate Template",
  description: "Aptos Boilerplate Template",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <ClientProvider>
          <div id="root">{children}</div>
          <WrongNetworkAlert />
          <Toaster />
        </ClientProvider>
      </body>
    </html>
  );
}
