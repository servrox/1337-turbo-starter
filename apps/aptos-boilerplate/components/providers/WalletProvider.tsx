"use client";

import { APTOS_API_KEY, NETWORK } from "@/lib/constants";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import type { PropsWithChildren } from "react";
import { toast } from "sonner";

export function WalletProvider({ children }: PropsWithChildren) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: NETWORK, aptosApiKeys: { [NETWORK]: APTOS_API_KEY } }}
      onError={(error) => {
        toast.error(error || "Unknown wallet error");
      }}>
      {children}
    </AptosWalletAdapterProvider>
  );
}
