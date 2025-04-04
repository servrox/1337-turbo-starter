import "@repo/ui/globals.css";
import "./globals.css";

import { ClientProvider } from "@/components/providers/client-provider";
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
  title: "Landing Page",
  description: "Landing Page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
