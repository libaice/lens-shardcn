import Image from "next/image";
import { useState } from "react";
import {
  useExploreProfiles,
  useExplorePublications,
  PublicationTypes,
  PublicationSortCriteria,
  PublicationMainFocus,
} from "@lens-protocol/react-web";

import {
  Loader2,
  ListMusic,
  Newspaper,
  PersonStanding,
  Shapes,
  Share,
  Globe,
  MessageSquare,
  Repeat2,
  Heart,
  Grab,
  ArrowRight,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="px-6 py-14 sm:px-10">
      <div>
        <a target="_blank" rel="no-opener" href="https://lens.xyz">
          <div className="cursor-pointer flex items-center bg-secondary text-foreground rounded-lg py-1 px-3 mb-2 max-w-[288px]">
            <p className="mr-2">📚</p>
            <p className="text-sm"> Learn More About Lens Protocol</p>
            <ArrowRight className="ml-2" size={12}></ArrowRight>
          </div>
        </a>
        <h1 className="text-5xl font-bold mt-4">Social Explorer</h1>
        <p className="mt-4 text-lg max-w-[750px] text-muted-foreground sm:text-xl ">
          An application boilerplate built with a modern stack. Simple to get
          started building your first social app. Leveraging ShadCN, Lens
          Protocol, Next.js, and WalletConnect.
        </p>

        <div className="mt-6 flex">
          <button>Share</button>
          <a
            target="_blank"
            rel="no-opener"
            href="https://aave.notion.site/08521d6d8ec84d10bf0f6d03abcf60cc?v=eb989b589d7447918187bf3c588a2748&pvs=4"
            className={buttonVariants({variant:"outline"})}
          >
            <Globe className="h-4 w-5 mr-2"  />
            Expoore lens Apps
          </a>
        </div>
      </div>
    </main>
  );
}
