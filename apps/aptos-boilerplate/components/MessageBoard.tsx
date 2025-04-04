"use client";

import { aptosClient } from "@/lib/utils/aptosClient";
import { MESSAGE_BOARD_ABI } from "@/lib/utils/message_board_abi";
import { getMessageContent } from "@/lib/view-functions/getMessageContent";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function MessageBoard() {
  // const { client } = useWalletClient(); // for some reason, this is always undefined
  const { connected, signAndSubmitTransaction } = useWallet();
  const queryClient = useQueryClient();

  const [messageContent, setMessageContent] = useState<string>();
  const [newMessageContent, setNewMessageContent] = useState<string>();

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

  const onClickButton = async () => {
    if (!newMessageContent || !connected) {
      return;
    }

    try {
      const committedTransaction = await signAndSubmitTransaction({
        data: {
          function: `${MESSAGE_BOARD_ABI.address}::${MESSAGE_BOARD_ABI.name}::post_message`,
          functionArguments: [newMessageContent],
          typeArguments: [],
        },
      });
      const executedTransaction = await aptosClient().waitForTransaction({
        transactionHash: committedTransaction.hash,
      });
      queryClient.invalidateQueries({
        queryKey: ["message-content"],
      });
      toast.success(`Transaction succeeded, hash: ${executedTransaction.hash}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      setMessageContent(data.content);
    }
  }, [data]);

  useEffect(() => {
    console.log("newMessageContent", newMessageContent);
    console.log("queryClient", queryClient);
    console.log("connected", connected);
  }, [newMessageContent, queryClient, connected]);

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-lg font-medium">Message content: {messageContent}</h4>
      New message{" "}
      <Input disabled={!connected} placeholder="yoho" onChange={(e) => setNewMessageContent(e.target.value)} />
      <Button
        disabled={!connected || !newMessageContent || newMessageContent.length === 0 || newMessageContent.length > 100}
        onClick={onClickButton}>
        Write
      </Button>
    </div>
  );
}
