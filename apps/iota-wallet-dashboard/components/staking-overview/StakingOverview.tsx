// Copyright (c) 2024 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

import {
  DELEGATED_STAKES_QUERY_REFETCH_INTERVAL,
  DELEGATED_STAKES_QUERY_STALE_TIME,
  useGetDelegatedStake,
} from '@repo/iota-core';
import { useCurrentAccount } from '@iota/dapp-kit';
import { StakingData } from './StakingData';
import { StartStaking } from './StartStaking';

export function StakingOverview() {
    const account = useCurrentAccount();
    const { data: delegatedStakeData } = useGetDelegatedStake({
        address: account?.address || '',
        staleTime: DELEGATED_STAKES_QUERY_STALE_TIME,
        refetchInterval: DELEGATED_STAKES_QUERY_REFETCH_INTERVAL,
    });

    return (delegatedStakeData?.length ?? 0) > 0 ? (
        <StakingData stakingData={delegatedStakeData} />
    ) : (
        <StartStaking />
    );
}
