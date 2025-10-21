"use client";

import { aptosClient } from "@/lib/utils/aptosClient";
import { MESSAGE_BOARD_ABI } from "@/lib/utils/message_board_abi";
import { getMessageContent } from "@/lib/view-functions/getMessageContent";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export function MessageBoard() {
  const wallet = useWallet();
  const queryClient = useQueryClient();

  const [newMessageContent, setNewMessageContent] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["message-content"],
    refetchInterval: 10_000,
    queryFn: async () => {
      try {
        const content = await getMessageContent();

        return {
          content,
        };
      } catch (error: unknown) {
        toast.error(error instanceof Error ? error.message : String(error));
        return {
          content: "",
        };
      }
    },
  });

  const messageContent = useMemo(() => data?.content ?? "", [data?.content]);

  const onClickButton = async () => {
    if (!newMessageContent || !wallet.connected) {
      return;
    }

    if (!wallet.signAndSubmitTransaction) {
      toast.error("Wallet not ready");
      return;
    }

    try {
      const committedTransaction = await wallet.signAndSubmitTransaction({
        data: {
          function: `${MESSAGE_BOARD_ABI.address}::${MESSAGE_BOARD_ABI.name}::post_message`,
          functionArguments: [newMessageContent],
          typeArguments: [],
        },
      });
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      await queryClient.invalidateQueries({
        queryKey: ["message-content"],
      });
      toast.success(`Transaction succeeded, hash: ${executedTransaction.hash}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">Message content: {messageContent}</h4>
      New message{" "}
      <Input
        disabled={!wallet.connected}
        placeholder="Enter a message"
        onChange={(e) => setNewMessageContent(e.target.value)}
        value={newMessageContent}
      />
      <Button
        disabled={!wallet.connected || newMessageContent.length === 0 || newMessageContent.length > 100}
        onClick={() => {
          void onClickButton();
        }}>
        Write
      </Button>
    </div>
  );
}
