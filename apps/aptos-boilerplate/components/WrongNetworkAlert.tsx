"use client";

import { NETWORK } from "@/lib/constants";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import * as Dialog from "@radix-ui/react-dialog";

export function WrongNetworkAlert() {
  const { network, connected } = useWallet();

  return !connected || network?.name === NETWORK ? (
    <></>
  ) : (
    <Dialog.Root open={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-in-out" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-white p-6 shadow-lg transition-transform duration-300 ease-in-out dark:bg-gray-800">
          <div className="text-center">
            <Dialog.Title className="mb-4 text-3xl font-semibold text-gray-900 dark:text-gray-100">
              Wrong Network
            </Dialog.Title>
            <Dialog.Description className="text-lg text-gray-700 dark:text-gray-300">
              Your wallet is currently on <span className="font-bold">{network?.name}</span>. Please switch to{" "}
              <span className="font-bold">{NETWORK}</span> to continue using the app.
            </Dialog.Description>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
