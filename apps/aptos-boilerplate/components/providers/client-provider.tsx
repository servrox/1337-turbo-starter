"use client";

import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { Fragment, PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";

export function ClientProvider({ children, ...props }: PropsWithChildren) {
  return (
    <Fragment {...props}>
      <ThemeProvider>
        <WalletProvider>
          <ReactQueryProvider>{children} </ReactQueryProvider>
        </WalletProvider>
      </ThemeProvider>
    </Fragment>
  );
}
