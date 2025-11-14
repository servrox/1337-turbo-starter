// Copyright (c) 2024 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

"use client";

import { ExplorerLink } from "@/components";
import { Loader } from "@iota/apps-ui-icons";
import {
  Button,
  ButtonType,
  Card,
  CardAction,
  CardActionType,
  CardBody,
  CardImage,
  CardType,
  Divider,
  Header,
  ImageType,
  KeyValueInfo,
} from "@iota/apps-ui-kit";
import { CoinFormat, formatAddress, parseAmount } from "@iota/iota-sdk/utils";
import {
  CoinIcon,
  ExplorerLinkType,
  ImageIconSize,
  NamedAddressTooltip,
  useCoinMetadata,
  useFormatCoin,
  useGetIotaNameRecord,
} from "@repo/iota-core";
import { DialogLayoutBody, DialogLayoutFooter } from "../../layout";
import { FormDataValues } from "../interfaces";

interface ReviewValuesFormProps {
  formData: FormDataValues;
  senderAddress: string;
  isPending: boolean;
  executeTransfer: () => void;
  coinType: string;
  isPayAllIota?: boolean;
  onClose: () => void;
  onBack: () => void;
  totalGas: string | undefined;
}

export function ReviewValuesFormView({
  formData: { amount, to },
  senderAddress,
  isPending,
  executeTransfer,
  coinType,
  isPayAllIota,
  onClose,
  onBack,
  totalGas,
}: ReviewValuesFormProps): JSX.Element {
  const { data: nameRecord } = useGetIotaNameRecord(to);
  const { data: metadata } = useCoinMetadata(coinType);
  const amountWithoutDecimals = parseAmount(amount, metadata?.decimals ?? 0);
  const [roundedAmount, symbol] = useFormatCoin({
    balance: amountWithoutDecimals,
    coinType,
    format: CoinFormat.Rounded,
  });

  const [gasFormatted, gasSymbol] = useFormatCoin({
    balance: totalGas,
    format: CoinFormat.Full,
  });

  return (
    <>
      <Header title="Review & Send" onClose={onClose} onBack={onBack} />
      <DialogLayoutBody>
        <div className="gap-md flex w-full flex-col">
          {Number(amount) !== 0 ? (
            <Card type={CardType.Filled}>
              <CardImage type={ImageType.BgSolid}>
                <CoinIcon coinType={coinType} rounded size={ImageIconSize.Small} />
              </CardImage>
              <CardBody title={`${isPayAllIota ? "~" : ""}${roundedAmount} ${symbol}`} subtitle="Amount" />
              <CardAction type={CardActionType.SupportingText} />
            </Card>
          ) : null}
          <div className="gap-md--rs p-sm--rs flex flex-col">
            <KeyValueInfo
              keyText={"From"}
              value={
                <ExplorerLink type={ExplorerLinkType.Address} address={senderAddress}>
                  {formatAddress(senderAddress)}
                </ExplorerLink>
              }
              fullwidth
            />

            <Divider />
            <KeyValueInfo
              keyText={"To"}
              value={
                <NamedAddressTooltip address={nameRecord?.targetAddress || to} name={nameRecord?.name}>
                  <ExplorerLink type={ExplorerLinkType.Address} address={nameRecord?.targetAddress || to}>
                    {nameRecord ? nameRecord.name : formatAddress(to || "")}
                  </ExplorerLink>
                </NamedAddressTooltip>
              }
              fullwidth
            />

            <Divider />
            <KeyValueInfo keyText={"Est. Gas Fees"} value={gasFormatted} supportingLabel={gasSymbol} fullwidth />
          </div>
        </div>
      </DialogLayoutBody>
      <DialogLayoutFooter>
        <Button
          type={ButtonType.Primary}
          onClick={executeTransfer}
          text="Send Now"
          disabled={coinType === null || isPending}
          fullWidth
          icon={isPending ? <Loader className="animate-spin" /> : undefined}
          iconAfterText
        />
      </DialogLayoutFooter>
    </>
  );
}
