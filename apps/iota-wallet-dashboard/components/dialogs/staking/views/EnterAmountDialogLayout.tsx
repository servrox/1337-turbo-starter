// Copyright (c) 2024 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { Exclamation, Loader, Warning } from "@iota/apps-ui-icons";
import {
  Button,
  ButtonType,
  Divider,
  Header,
  InfoBox,
  InfoBoxStyle,
  InfoBoxType,
  Input,
  InputType,
  KeyValueInfo,
  Panel,
} from "@iota/apps-ui-kit";
import { useIotaClientQuery } from "@iota/dapp-kit";
import { CoinFormat } from "@iota/iota-sdk/utils";
import { useFormatCoin, useIsValidatorCommitteeMember, useStakeTxnInfo, Validator } from "@repo/iota-core";
import { Field, type FieldProps, useFormikContext } from "formik";
import React from "react";
import { DialogLayout, DialogLayoutBody, DialogLayoutFooter } from "../../layout";
import { StakedInfo } from "./StakedInfo";

interface FormValues {
  amount: string;
}

interface EnterAmountDialogLayoutProps {
  selectedValidator: string;
  senderAddress: string;
  caption: string;
  renderInfo?: React.JSX.Element;
  isLoading: boolean;
  onBack: () => void;
  handleClose: () => void;
  handleStake: () => void;
  isStakeDisabled?: boolean;
  totalGas?: string | number | null;
  renderInputAction?: React.JSX.Element;
  errorMessage?: string;
}

export function EnterAmountDialogLayout({
  selectedValidator,
  totalGas,
  senderAddress,
  caption,
  renderInfo,
  isLoading,
  isStakeDisabled,
  errorMessage,
  onBack,
  handleClose,
  handleStake,
  renderInputAction,
}: EnterAmountDialogLayoutProps): JSX.Element {
  const { data: system } = useIotaClientQuery("getLatestIotaSystemState");
  const { values, errors } = useFormikContext<FormValues>();
  const amount = values.amount;
  const { isCommitteeMember } = useIsValidatorCommitteeMember();

  const [gas, symbol] = useFormatCoin({ balance: totalGas ?? 0, format: CoinFormat.Full });

  const { stakedRewardsStartEpoch, timeBeforeStakeRewardsRedeemableAgoDisplay } = useStakeTxnInfo(system?.epoch);
  const isValidatorCommitteeMember = isCommitteeMember(selectedValidator);
  return (
    <DialogLayout>
      <Header title="Enter amount" onClose={handleClose} onBack={onBack} titleCentered />
      <DialogLayoutBody>
        <div className="flex w-full flex-col justify-between">
          <div>
            <div className="mb-md">
              <Validator address={selectedValidator} isSelected showApy={false} />
            </div>
            <StakedInfo validatorAddress={selectedValidator} accountAddress={senderAddress} />
            <div className="my-md flex w-full flex-col gap-y-2">
              <Field name="amount">
                {({ field: { onChange, ...field }, form: { setFieldValue }, meta }: FieldProps<FormValues>) => {
                  return (
                    <Input
                      {...field}
                      onValueChange={({ value }) => {
                        setFieldValue("amount", value, true);
                      }}
                      type={InputType.NumericFormat}
                      label="Amount"
                      value={amount}
                      suffix={` ${symbol}`}
                      placeholder="Enter amount to stake"
                      errorMessage={values.amount && meta.error ? meta.error : undefined}
                      caption={caption}
                      trailingElement={renderInputAction}
                    />
                  );
                }}
              </Field>
              {renderInfo ? <div className="mt-md">{renderInfo}</div> : null}
              {!isValidatorCommitteeMember && (
                <InfoBox
                  type={InfoBoxType.Warning}
                  title="Validator is not earning rewards."
                  supportingText="Validator is active but not in the current committee, so not earning rewards this epoch. It may earn in future epochs. Stake at your discretion."
                  icon={<Warning />}
                  style={InfoBoxStyle.Elevated}
                />
              )}
            </div>
            <Panel hasBorder>
              <div className="gap-y-sm p-md flex flex-col">
                <KeyValueInfo keyText="Staking Rewards Start" value={stakedRewardsStartEpoch} fullwidth />
                <KeyValueInfo keyText="Redeem Rewards" value={timeBeforeStakeRewardsRedeemableAgoDisplay} fullwidth />
                <Divider />
                <KeyValueInfo keyText="Gas fee" value={gas || "--"} supportingLabel={symbol} fullwidth />
              </div>
            </Panel>
          </div>
        </div>
      </DialogLayoutBody>
      <DialogLayoutFooter>
        {errorMessage ? (
          <div className="mb-sm">
            <InfoBox
              type={InfoBoxType.Error}
              supportingText={errorMessage}
              style={InfoBoxStyle.Elevated}
              icon={<Exclamation />}
            />
          </div>
        ) : null}
        <div className="gap-sm flex w-full justify-between">
          <Button fullWidth type={ButtonType.Secondary} onClick={onBack} text="Back" />
          <Button
            fullWidth
            type={ButtonType.Primary}
            disabled={!amount || !!errors?.amount || isLoading || isStakeDisabled || !!errorMessage}
            onClick={handleStake}
            text="Stake"
            icon={isLoading ? <Loader className="animate-spin" data-testid="loading-indicator" /> : null}
            iconAfterText
            testId="stake-confirm-btn"
          />
        </div>
      </DialogLayoutFooter>
    </DialogLayout>
  );
}
