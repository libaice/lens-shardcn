"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";
import { ChevronRight, Droplet, Droplets } from "lucide-react";
import { useWeb3Modal } from "@web3modal/react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { disconnect } from "@wagmi/core";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import LensProvider from "./lens-provider";
import { WalletProvider } from "./WalletProvider";
import { ModelToggle } from "@/components/dropdown";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function AppWithProviders({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

function Nav() {
  const { open, close } = useWeb3Modal();
  const { address } = useAccount();
  const pathname = usePathname();

  return (
    <nav className="border-b flex flex-col sm:flex-row items-start sm:items-center sm:pr-10">
      <div className="py-3 px-8 flex flex-1 items-center p">
        <Link href="/" className="mr-5 flex items-center">
          <Droplets className="opacity-85" size={19} />
          <p className={`ml-2 mr-4 text-lg font-semibold`}>lenscn</p>
        </Link>
        <Link
          href="/"
          className={`mr-2 text-sm ${pathname != "/" && "opacity-50"}`}
        >
          Home
        </Link>
        <Link
          href="/search"
          className={`mr-5 text-sm ${pathname !== "/search" && "opacity-60"}`}
        >
          Search
        </Link>
      </div>

      <div className="flex sm:items-center pl-8 pb-3 sm:p-0 ">
        {!address && (
          <Button onClick={open} variant="secondary" className="mr-4">
            Sign In <ChevronRight className="h-4 w-4" />
          </Button>
        )}
        {address && (
          <Button onClick={disconnect} variant="secondary" className="mr-4">
            <ChevronRight className="h-4 w-4 ml-3" /> Sign Out
          </Button>
        )}
        <ModelToggle />
      </div>
    </nav>
  );
}

export default function RootLayout({ children, ...props }) {
  return (
    <LensProvider>
      <AppWithProviders>
        <WalletProvider>{children}</WalletProvider>
      </AppWithProviders>
    </LensProvider>
  );
}
