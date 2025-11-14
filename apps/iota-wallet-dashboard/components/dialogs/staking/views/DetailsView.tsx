// Copyright (c) 2024 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import { ampli } from "@/lib/utils/analytics";
import { Warning } from "@iota/apps-ui-icons";
import {
  Badge,
  BadgeType,
  Button,
  ButtonType,
  Card,
  CardBody,
  CardImage,
  CardType,
  Divider,
  Header,
  InfoBox,
  InfoBoxStyle,
  InfoBoxType,
  KeyValueInfo,
  LoadingIndicator,
  Panel,
  TooltipPosition,
} from "@iota/apps-ui-kit";
import { formatAddress } from "@iota/iota-sdk/utils";
import {
  ExtendedDelegatedStake,
  formatPercentageDisplay,
  ImageIcon,
  ImageIconSize,
  toast,
  useFormatCoin,
  useGetInactiveValidator,
  useGetNextEpochCommitteeMember,
  useIsActiveValidator,
  useIsValidatorCommitteeMember,
  useValidatorInfo,
} from "@repo/iota-core";
import { DialogLayout, DialogLayoutBody, DialogLayoutFooter } from "../../layout";

interface StakeDialogProps {
  handleClose: () => void;
  handleStake: () => void;
  stakedDetails: ExtendedDelegatedStake;
  showActiveStatus?: boolean;
  handleUnstake?: () => void;
}

export function DetailsView({
  handleClose,
  handleUnstake,
  handleStake,
  stakedDetails,
  showActiveStatus,
}: StakeDialogProps): JSX.Element {
  const totalStake = BigInt(stakedDetails?.principal || 0n);
  const validatorAddress = stakedDetails?.validatorAddress;
  const { isValidatorExpectedToBeInTheCommittee, isLoading: isValidatorExpectedToBeInTheCommitteeLoading } =
    useGetNextEpochCommitteeMember(validatorAddress);

  const {
    isAtRisk,
    isPendingValidators,
    errorValidators,
    validatorSummary,
    apy,
    isApyApproxZero,
    newValidator,
    commission,
  } = useValidatorInfo({
    validatorAddress,
  });
  const { isCommitteeMember } = useIsValidatorCommitteeMember();
  const { isActiveValidator } = useIsActiveValidator();

  const iotaEarned = BigInt(stakedDetails?.estimatedReward || 0n);
  const [iotaEarnedFormatted, iotaEarnedSymbol] = useFormatCoin({ balance: iotaEarned });
  const [totalStakeFormatted, totalStakeSymbol] = useFormatCoin({ balance: totalStake });

  const { data: inactiveValidatorSummary } = useGetInactiveValidator(validatorAddress);
  const validatorName = validatorSummary?.name || inactiveValidatorSummary?.name || validatorAddress;
  const validatorImageUrl = validatorSummary?.imageUrl || inactiveValidatorSummary?.imageUrl || null;

  const subtitle = showActiveStatus ? (
    <div className="flex items-center gap-1">
      {formatAddress(validatorAddress)}
      {newValidator && <Badge label="New" type={BadgeType.PrimarySoft} />}
      {isAtRisk && <Badge label="At Risk" type={BadgeType.PrimarySolid} />}
    </div>
  ) : (
    formatAddress(validatorAddress)
  );

  const onUnstakeClick = () => {
    if (handleUnstake) {
      handleUnstake();
      ampli.clickedUnstakeIota({
        stakedAmount: Number(totalStakeFormatted),
        validatorAddress: stakedDetails?.validatorAddress,
      });
    }
  };

  if (isPendingValidators) {
    return (
      <div className="flex h-full w-full items-center justify-center p-2">
        <LoadingIndicator />
      </div>
    );
  }

  if (errorValidators) {
    toast.error("An error occurred fetching validator information");
  }

  const isValidatorCommitteeMember = isCommitteeMember(validatorAddress);
  const isValidatorActive = isActiveValidator(validatorAddress);
  const isActiveButNotInTheCommittee = isValidatorActive && !isValidatorCommitteeMember;

  return (
    <DialogLayout>
      <Header title="Validator" onClose={handleClose} onBack={handleClose} titleCentered />
      <DialogLayoutBody>
        <div className="gap-md flex w-full flex-col">
          <Card type={CardType.Filled}>
            <CardImage>
              <ImageIcon
                src={validatorImageUrl}
                label={validatorName}
                fallback={validatorName}
                size={ImageIconSize.Large}
              />
            </CardImage>
            <CardBody title={validatorName} subtitle={subtitle} isTextTruncated />
          </Card>
          {isActiveButNotInTheCommittee ? (
            <InfoBox
              type={InfoBoxType.Warning}
              title="Validator is not earning rewards."
              supportingText="Validator is active but not in the current committee, so not earning rewards this epoch. It may earn in future epochs. Stake at your discretion."
              icon={<Warning />}
              style={InfoBoxStyle.Elevated}
            />
          ) : !isValidatorActive ? (
            <InfoBox
              type={InfoBoxType.Error}
              title="Inactive Validator is not earning rewards"
              supportingText="This validator is inactive and will no longer earn rewards. Stake at your own risk."
              icon={<Warning />}
              style={InfoBoxStyle.Elevated}
            />
          ) : null}
          <Panel hasBorder>
            <div className="gap-y-sm p-md flex flex-col">
              <KeyValueInfo
                keyText="Your Stake"
                value={totalStakeFormatted}
                supportingLabel={totalStakeSymbol}
                fullwidth
              />
              <KeyValueInfo keyText="Earned" value={iotaEarnedFormatted} supportingLabel={iotaEarnedSymbol} fullwidth />
              <Divider />
              <KeyValueInfo keyText="APY" value={formatPercentageDisplay(apy, "--", isApyApproxZero)} fullwidth />
              <KeyValueInfo keyText="Commission" value={`${commission ? commission.toString() : "--"}%`} fullwidth />
            </div>
          </Panel>
          {!isValidatorExpectedToBeInTheCommittee && !isValidatorExpectedToBeInTheCommitteeLoading ? (
            <Panel hasBorder>
              <div className="gap-y-sm p-md flex flex-col">
                <KeyValueInfo
                  keyText="Rewards next Epoch"
                  value={<Badge label="Not Earning" type={BadgeType.Warning} />}
                  fullwidth
                  tooltipPosition={TooltipPosition.Top}
                  tooltipText="Currently, the validator does not meet the criteria required to generate rewards in the next epoch, but this may change."
                />
              </div>
            </Panel>
          ) : null}
        </div>
      </DialogLayoutBody>
      <DialogLayoutFooter>
        <div className="gap-sm flex w-full">
          <Button type={ButtonType.Secondary} onClick={onUnstakeClick} text="Unstake" fullWidth />
          {isValidatorActive ? <Button type={ButtonType.Primary} text="Stake" onClick={handleStake} fullWidth /> : null}
        </div>
      </DialogLayoutFooter>
    </DialogLayout>
  );
}
