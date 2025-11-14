// Copyright (c) 2024 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { StakeRewardsPanel, ValidatorStakingData } from "@/components";
import { Info, Warning } from "@iota/apps-ui-icons";
import {
  Button,
  ButtonType,
  Header,
  InfoBox,
  InfoBoxStyle,
  InfoBoxType,
  KeyValueInfo,
  LoadingIndicator,
  Panel,
} from "@iota/apps-ui-kit";
import { useCurrentAccount, useSignAndExecuteTransaction } from "@iota/dapp-kit";
import { CoinFormat } from "@iota/iota-sdk/utils";
import {
  ExtendedDelegatedStake,
  GAS_BALANCE_TOO_LOW_ID,
  GAS_BUDGET_ERROR_MESSAGES,
  GAS_SYMBOL,
  NOT_ENOUGH_BALANCE_ID,
  toast,
  useFormatCoin,
  useGetStakingValidatorDetails,
  useNewUnstakeTransaction,
  Validator,
} from "@repo/iota-core";
import { DialogLayout, DialogLayoutBody, DialogLayoutFooter } from "../../layout";

import { ampli } from "@/lib/utils/analytics";
import { IotaSignAndExecuteTransactionOutput } from "@iota/wallet-standard";

interface UnstakeDialogProps {
  extendedStake: ExtendedDelegatedStake;
  handleClose: () => void;
  onSuccess: (tx: IotaSignAndExecuteTransactionOutput) => void;
  showActiveStatus?: boolean;
  onBack?: () => void;
}

export function UnstakeView({
  extendedStake,
  handleClose,
  onBack,
  onSuccess,
  showActiveStatus,
}: UnstakeDialogProps): JSX.Element {
  const activeAddress = useCurrentAccount()?.address ?? "";
  const {
    data: unstakeData,
    isPending: isUnstakeTxPending,
    error,
  } = useNewUnstakeTransaction(activeAddress, extendedStake.stakedIotaId);
  const [gasFormatted] = useFormatCoin({
    balance: unstakeData?.gasSummary?.totalGas,
    format: CoinFormat.Full,
  });

  const { mutateAsync: signAndExecuteTransaction, isPending: isTransactionPending } = useSignAndExecuteTransaction();

  const { totalStakeOriginal, systemDataResult, delegatedStakeDataResult } = useGetStakingValidatorDetails({
    accountAddress: activeAddress,
    validatorAddress: extendedStake.validatorAddress,
    stakeId: extendedStake.stakedIotaId,
    unstake: true,
  });

  const [totalStakeFormatted] = useFormatCoin({
    balance: totalStakeOriginal,
  });

  const { isLoading: loadingValidators, error: errorValidators } = systemDataResult;
  const { isLoading: isLoadingDelegatedStakeData, isError, error: delegatedStakeDataError } = delegatedStakeDataResult;

  const delegationId = extendedStake?.stakedIotaId;
  const isNotEnoughGas =
    error && (error.message.includes(NOT_ENOUGH_BALANCE_ID) || error.message.includes(GAS_BALANCE_TOO_LOW_ID));

  async function handleUnstake(): Promise<void> {
    if (!unstakeData) return;

    await signAndExecuteTransaction(
      {
        transaction: unstakeData.transaction,
      },
      {
        onSuccess: (tx) => {
          toast.success("Unstake transaction has been sent");
          onSuccess(tx);

          ampli.unstakedIota({
            stakedAmount: Number(totalStakeFormatted),
            validatorAddress: extendedStake.validatorAddress,
          });
        },
      }
    ).catch(() => {
      toast.error("Unstake transaction was not sent");
    });
  }

  if (isLoadingDelegatedStakeData || loadingValidators) {
    return (
      <div className="flex h-full w-full items-center justify-center p-2">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError || errorValidators) {
    return (
      <div className="mb-2 flex h-full w-full items-center justify-center p-2">
        <InfoBox
          title="Something went wrong"
          supportingText={delegatedStakeDataError?.message ?? "An error occurred"}
          style={InfoBoxStyle.Default}
          type={InfoBoxType.Error}
          icon={<Warning />}
        />
      </div>
    );
  }

  return (
    <DialogLayout>
      <Header title="Unstake" onClose={handleClose} onBack={onBack} titleCentered />
      <DialogLayoutBody>
        <div className="gap-y-md flex flex-col">
          <Validator address={extendedStake.validatorAddress} isSelected showActiveStatus={showActiveStatus} />

          <ValidatorStakingData
            validatorAddress={extendedStake.validatorAddress}
            stakeId={extendedStake.stakedIotaId}
            isUnstake
          />

          <StakeRewardsPanel stakingRewards={extendedStake.estimatedReward} totalStaked={totalStakeOriginal} />

          <Panel hasBorder>
            <div className="gap-y-sm p-md flex flex-col">
              <KeyValueInfo keyText="Gas Fees" value={gasFormatted || "-"} supportingLabel={GAS_SYMBOL} fullwidth />
            </div>
          </Panel>
        </div>
      </DialogLayoutBody>

      <DialogLayoutFooter>
        {isNotEnoughGas && (
          <div className="pt-sm">
            <InfoBox
              supportingText={GAS_BUDGET_ERROR_MESSAGES[GAS_BALANCE_TOO_LOW_ID]}
              icon={<Info />}
              type={InfoBoxType.Error}
              style={InfoBoxStyle.Elevated}
            />
          </div>
        )}
        <Button
          type={ButtonType.Secondary}
          fullWidth
          onClick={handleUnstake}
          disabled={!unstakeData || isUnstakeTxPending || isTransactionPending || isNotEnoughGas || !delegationId}
          text="Unstake"
          icon={
            isUnstakeTxPending || isTransactionPending ? <LoadingIndicator data-testid="loading-indicator" /> : null
          }
          iconAfterText
        />
      </DialogLayoutFooter>
    </DialogLayout>
  );
}
