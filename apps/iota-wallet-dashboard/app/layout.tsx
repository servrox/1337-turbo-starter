// Copyright (c) 2024 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { FontLinks } from "@/components/FontLinks";
import { ConnectionGuard } from "@/components/connection-guard";
import { AppProviders } from "@/providers";
import "@iota/dapp-kit/dist/index.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const METADATA_INFO = {
  title: "IOTA Wallet Dashboard",
  description: "IOTA Wallet Dashboard - Connecting you to the decentralized web and IOTA network",
  image: "/metadata-image.png",
};

export const metadata: Metadata = {
  title: METADATA_INFO.title,
  description: METADATA_INFO.description,
  openGraph: {
    title: METADATA_INFO.title,
    description: METADATA_INFO.description,
    images: [METADATA_INFO.image],
  },
  twitter: {
    title: METADATA_INFO.title,
    description: METADATA_INFO.description,
    images: [METADATA_INFO.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          <FontLinks />
          {/* <Amplitude /> */}
          <ConnectionGuard>{children}</ConnectionGuard>
        </AppProviders>
      </body>
    </html>
  );
}
