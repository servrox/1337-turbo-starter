"use client";

import { aptosClient } from "@/lib/utils/aptosClient";
import { COIN_ABI } from "@/lib/utils/coin_abi";
import { getAccountAPTBalance } from "@/lib/view-functions/getAccountBalance";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function TransferAPT() {
  const wallet = useWallet();
  const { account } = wallet;

  const queryClient = useQueryClient();

  const [recipient, setRecipient] = useState<string>();
  const [transferAmount, setTransferAmount] = useState<number>();

  const { data } = useQuery({
    queryKey: ["apt-balance", account?.address],
    refetchInterval: 10_000,
    queryFn: async () => {
      try {
        if (account === null) {
          console.error("Account not available");
        }

        const balance = await getAccountAPTBalance({ accountAddress: account!.address.toStringLong() });

        return {
          balance,
        };
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : String(error));
        return {
          balance: 0,
        };
      }
    },
  });

  const aptBalance = useMemo(() => data?.balance ?? 0, [data?.balance]);

  const onClickButton = async () => {
    if (!wallet.connected || !recipient || !transferAmount) {
      return;
    }

    if (!wallet.signAndSubmitTransaction) {
      toast.error("Wallet not ready");
      return;
    }

    try {
      const committedTransaction = await wallet.signAndSubmitTransaction({
        data: {
          function: `${COIN_ABI.address}::${COIN_ABI.name}::transfer`,
          typeArguments: ["0x1::aptos_coin::AptosCoin"],
          functionArguments: [recipient as `0x${string}`, Math.pow(10, 8) * transferAmount],
        },
      });
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      await queryClient.invalidateQueries({
        queryKey: ["apt-balance", account?.address],
      });
      toast.success(`Transaction succeeded, hash: ${executedTransaction.hash}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">APT balance: {aptBalance / Math.pow(10, 8)}</h4>
      Recipient <Input disabled={!account} placeholder="0x1" onChange={(e) => setRecipient(e.target.value)} />
      Amount{" "}
      <Input disabled={!account} placeholder="100" onChange={(e) => setTransferAmount(parseFloat(e.target.value))} />
      <Button
        disabled={!account || !recipient || !transferAmount || transferAmount > aptBalance || transferAmount <= 0}
        onClick={() => {
          void onClickButton();
        }}>
        Transfer
      </Button>
    </div>
  );
}
