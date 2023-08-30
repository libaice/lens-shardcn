"use client";
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
  const [view, setView] = useState("profiles");
  const [dashboardType, setDashboardType] = useState("dashboard");
  let {
    data: profiles,
    error: profileError,
    loading: loadingProfiles,
  } = useExploreProfiles({
    limit: 50,
  }) as any;

  profiles = profiles?.filter((p) => p.picture?.original?.url);

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
            className={buttonVariants({ variant: "outline" })}
          >
            <Globe className="h-4 w-5 mr-2" />
            Expoore lens Apps
          </a>
        </div>
      </div>

      <div className="mt-[70px] flex ml-2">
        <div>
          <Button
            variant="ghost"
            onClick={() => setDashboardType("dashboard")}
            className={`${dashboardType !== "dashboard" ? "opacity-60" : ""}`}
          >
            My DashBoard
          </Button>

          <Button
            variant="ghost"
            onClick={() => setDashboardType("algorithms")}
            className={`${
              dashboardType !== "recommendation algorithms" ? "opacity-50" : ""
            }`}
          >
            Choose Your Algorithms
          </Button>
        </div>
      </div>

      {dashboardType === "algorithms" && (
        <div className="md:flex min-h-[300px] mt-3 px-6">
          <p>Choose your algorithms comming soon </p>
        </div>
      )}

      {dashboardType === "dashboard" && (
        <div className="md:flex min-h-[300px] mt-3">
          <div className="border border rounded-tl rounded-bl md:w-[230px] pt-3 pb-8 flex-col flex">
            <p className="font-medium ml-4 mb-2 mt-1">Social views</p>
            <Button
              onClick={() => setView("profiles")}
              variant={view === "profiles" ? "secondary" : "ghost"}
              className="justify-start mb-1"
            >
              <PersonStanding size={16} />
              <p className="text-sm ml-2">Profiles</p>
            </Button>

            <Button
              onClick={() => setView("publications")}
              variant={view === "publications" ? "secondary" : "ghost"}
              className="justify-start mb-1"
            >
              <Newspaper size={16} />
              <p className="text-sm ml-2">Publications</p>
            </Button>

            <Button
              onClick={() => setView("music")}
              variant={view === "music" ? "secondary" : "ghost"}
              className="justify-start mb-1"
            >
              <ListMusic size={16} />
              <p className="text-sm ml-2">Music</p>
            </Button>

            <Button
              onClick={() => setView("collect")}
              variant={view === "collect" ? "secondary" : "ghost"}
              className="justify-start mb-1"
            >
              <Shapes size={16} />
              <p className="text-sm ml-2">Collect</p>
            </Button>
          </div>

          <div className="">
            {view === "profiles" && (
              <div>
                {loadingProfiles && (
                  <div>
                    <Loader2></Loader2>
                  </div>
                )}
   
                {profiles?.map((profile) => (
                  <a
                    key={profile.id}
                    className=" lg:w-1/4 sm:w-1/2 p-4 cursor-pointer"
                    rel="no-opener"
                    target="_blank"
                    href={`https://share.lens.xyz/u/${profile.handle}`}
                  >
                    <div className="space-y-3" >
                      <div className="overflow-hidden rounded-md">
                        <img alt="Thinking Components" loading="lazy" decoding="async" data-nimg="1" src={profile.picture?.original?.url}></img>
                        <h3>Hello</h3>
                        <p></p>
                      </div>
                    </div>
                  </a>
                ))}


                
              </div>
            )}

            {view === "publications" && <></>}
            {view === "music" && <></>}
          </div>
        </div>
      )}
    </main>
  );
}
