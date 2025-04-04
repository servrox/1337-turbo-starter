import { ThemeSwitcher } from "@repo/ui/components/theme-switcher";
import { WalletSelector } from "./WalletSelector";

export function Header() {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between px-4 py-2">
      <h1 className="display">Boilerplate Template</h1>

      <div className="flex flex-wrap items-center gap-2">
        <WalletSelector />
        <ThemeSwitcher />
      </div>
    </div>
  );
}
