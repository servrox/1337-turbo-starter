"use client";

import { Fragment, PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";

export function ClientProvider({ children, ...props }: PropsWithChildren) {
  return (
    <Fragment {...props}>
      <ThemeProvider>{children}</ThemeProvider>
    </Fragment>
  );
}
