import { COIN_ABI } from "@/lib/utils/coin_abi";
import { surfClient } from "@/lib/utils/surfClient";

export type AccountAPTBalanceArguments = {
  accountAddress: string;
};

export const getAccountAPTBalance = async (args: AccountAPTBalanceArguments): Promise<number> => {
  const { accountAddress } = args;
  const balance = await surfClient()
    .useABI(COIN_ABI)
    .view.balance({
      functionArguments: [accountAddress as `0x${string}`],
      typeArguments: ["0x1::aptos_coin::AptosCoin"],
    });
  return parseInt(balance[0]);
};
