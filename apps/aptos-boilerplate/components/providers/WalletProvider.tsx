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
        const message = error instanceof Error ? error.message : String(error ?? "Unknown wallet error");
        toast.error(message);
      }}>
      {children}
    </AptosWalletAdapterProvider>
  );
}
