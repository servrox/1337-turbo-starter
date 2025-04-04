"use client";

import { AccountInfo } from "@/components/AccountInfo";
import { Header } from "@/components/Header";
import { MessageBoard } from "@/components/MessageBoard";
import { NetworkInfo } from "@/components/NetworkInfo";
import { TopBanner } from "@/components/TopBanner";
import { TransferAPT } from "@/components/TransferAPT";
import { WalletDetails } from "@/components/WalletDetails";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { useEffect } from "react";

export default function Page() {
  const { connected } = useWallet();

  useEffect(() => {
    console.log("🍌connected", connected);
  }, [connected]);

  return (
    <>
      <TopBanner />
      <Header />
      <div className="flex flex-col items-center justify-center">
        {connected ? (
          <Card>
            <CardContent className="flex flex-col gap-10 pt-6">
              <WalletDetails />
              <NetworkInfo />
              <AccountInfo />
              <TransferAPT />
              <MessageBoard />
            </CardContent>
          </Card>
        ) : (
          <CardHeader>
            <CardTitle>To get started Connect a wallet</CardTitle>
          </CardHeader>
        )}
      </div>
    </>
  );
}
