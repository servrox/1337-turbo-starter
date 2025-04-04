"use client";

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="banana"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      {...props}>
      {children}
    </NextThemesProvider>
  );
}
