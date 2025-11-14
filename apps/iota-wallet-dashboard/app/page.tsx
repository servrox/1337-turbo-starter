// Copyright (c) 2024 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

"use client";

import { usePersistedNetwork } from "@/hooks";
import { IotaLogoWeb } from "@iota/apps-ui-icons";
import { ConnectButton } from "@iota/dapp-kit";
import { Network } from "@iota/iota-sdk/client";
import { ThemeSwitcher } from "@repo/iota-core/components";
import { ToS_LINK } from "@repo/iota-core/constants";
import { Feature, Theme } from "@repo/iota-core/enums";
import { useFeatureEnabledByNetwork, useTheme } from "@repo/iota-core/hooks";
import Link from "next/link";

function HomeDashboardPage(): JSX.Element {
  const { theme } = useTheme();
  const { persistedNetwork } = usePersistedNetwork();
  const iotaNamesEnabled = useFeatureEnabledByNetwork(Feature.IotaNames, persistedNetwork as Network);

  const CURRENT_YEAR = new Date().getFullYear();
  const videoSrc =
    theme === Theme.Dark
      ? "https://files.iota.org/media/tooling/wallet-dashboard-welcome-dark.mp4"
      : "https://files.iota.org/media/tooling/wallet-dashboard-welcome-light.mp4";

  return (
    <main className="welcome-page flex h-screen">
      <div className="relative hidden sm:flex md:w-1/3">
        <video
          key={theme}
          src={videoSrc}
          autoPlay
          muted
          loop
          className="absolute top-0 right-0 h-full w-full min-w-fit object-cover"
          disableRemotePlayback></video>
      </div>
      <div className="p-md sm:p-2xl relative flex h-full w-full flex-col items-center justify-between">
        <div className="absolute top-2 right-2 sm:top-8 sm:right-8">
          <ThemeSwitcher />
        </div>
        <IotaLogoWeb width={130} height={32} />
        <div className="flex max-w-sm flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <span className="text-headline-sm text-iota-neutral-40">Welcome to</span>
            <h1 className="text-display-lg text-iota-neutral-10 dark:text-iota-neutral-100">IOTA Wallet Dashboard</h1>
            <span className="text-title-lg text-iota-neutral-40">
              Connecting you to the decentralized web and IOTA network
            </span>
          </div>
          <div className="[&_button]:!bg-iota-neutral-90 [&_button]:dark:!bg-iota-neutral-20">
            <ConnectButton connectText="Connect" iotaNamesEnabled={iotaNamesEnabled} />
          </div>
        </div>
        <div className="text-body-lg text-iota-neutral-60 flex flex-col items-center gap-y-1 text-center">
          <span>&copy; IOTA Foundation {CURRENT_YEAR}</span>
          <span>{process.env.NEXT_PUBLIC_DASHBOARD_REV}</span>
          <Link
            href={ToS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-label-sm text-iota-primary-30 dark:text-iota-primary-80">
            Terms of Service
          </Link>
        </div>
      </div>
    </main>
  );
}

export default HomeDashboardPage;
