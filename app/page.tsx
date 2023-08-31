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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avater";
import ReactMarkdown from "react-markdown";

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

  let {
    data: publications,
    error: pubError,
    loading: loadingPubs,
  } = useExplorePublications({
    limit: 25,
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
    publicationTypes: [PublicationTypes.Post],
    metadataFilter: {
      restrictPublicationMainFocusTo: [PublicationMainFocus.Image],
    },
  }) as any;

  profiles = profiles?.filter((p) => p.picture?.original?.url);

  publications = publications?.filter((p) => {
    if (p.metadata && p.metadata.media[0]) {
      if (p.metadata.media[0].original.mimeType.includes("image")) return true;
      return false;
    }
    return true;
  });

  let { data: musicPubs, error: musicPubError, loading: loadingMusicPubs } = useExplorePublications({
    limit: 25,
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
    publicationTypes: [PublicationTypes.Post],
    metadataFilter: {
      restrictPublicationMainFocusTo: [PublicationMainFocus.Audio]
    }
  }) as any

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

          <div className=" sm:border-t sm:border-r sm:border-b rounded-tr rounded-br flex flex-1 pb-4">
            {view === "profiles" && (
              <div className="flex flex-1 flex-wrap p-4">
                {loadingProfiles && (
                  <div className="flex flex-1 justify-center items-center">
                    <Loader2 className="h-12 w-12 animate-spin"></Loader2>
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
                    <div className="space-y-3">
                      <div className="overflow-hidden rounded-md">
                        <img
                          alt="Thinking Components"
                          loading="lazy"
                          decoding="async"
                          data-nimg="1"
                          src={profile.picture?.original?.url}
                        ></img>
                        <h3 className="font-medium leading-none">
                          {profile.handle}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {profile.name}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}

            {view === "publications" && (
              <div className="flex flex-1 flex-wrap flex-col">
                {loadingPubs && (
                  <div
                    className="
                      flex flex-1 justify-center items-center
                    "
                  >
                    <Loader2 className="h-12 w-12 animate-spin" />
                  </div>
                )}
                {publications?.map((publication) => (
                  <a
                    target="_blank"
                    rel-no-opener
                    className="border-b"
                    key={publication.id}
                    href={`https://share.lens.xyz/p/${publication.id}`}
                  >
                    <div
                      className="
                      space-y-3 mb-4 pt-6 pb-2
                      sm:px-6 px-2
                      "
                    >
                      <div className="flex">
                        <Avatar>
                          <AvatarImage
                            src={publication.profile?.picture?.original?.url}
                          />
                          <AvatarFallback>
                            {publication.profile.handle.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <h3 className="mb-1 font-medium leading-none">
                            {publication.profile.handle}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {publication.profile.name}
                          </p>
                        </div>
                      </div>
                      <div>
                        <img
                          className={cn(`
                            max-w-full sm:max-w-[500px]
                            rounded-2xl h-auto object-cover transition-all hover:scale-105
                            `)}
                          src={
                            publication.__typename === "Post"
                              ? publication.metadata?.media[0]?.original.url
                              : ""
                          }
                        />
                        <ReactMarkdown
                          className="
                          mt-4 break-words
                          "
                        >
                          {publication.metadata.content.replace(
                            /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
                            "[LINK]($1)"
                          )}
                        </ReactMarkdown>
                      </div>
                      <div>
                        <Button
                          className="rounded-full mr-1"
                          variant="secondary"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {publication.stats.totalAmountOfComments}
                        </Button>
                        <Button
                          className="rounded-full mr-1"
                          variant="secondary"
                        >
                          <Repeat2 className="mr-2 h-4 w-4" />
                          {publication.stats.totalAmountOfMirrors}
                        </Button>
                        <Button
                          className="rounded-full mr-1"
                          variant="secondary"
                        >
                          <Heart className="mr-2 h-4 w-4" />
                          {publication.stats.totalUpvotes}
                        </Button>
                        <Button
                          className="rounded-full mr-1"
                          variant="secondary"
                        >
                          <Grab className="mr-2 h-4 w-4" />
                          {publication.stats.totalAmountOfCollects}
                        </Button>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
            {
                  musicPubs?.map(publication => (
                    <a target="_blank" rel-no-opener className="border-b " key={publication.id} href={`https://share.lens.xyz/p/${publication.id}`}>
                      <div className="space-y-3 mb-4 p-4">
                        <div className="flex">
                          <Avatar>
                            <AvatarImage src={publication.profile?.picture?.original?.url} />
                            <AvatarFallback>{publication.profile.handle.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                              <h3 className="mb-1 font-medium leading-none">{publication.profile.handle}</h3>
                            <p className="text-xs text-muted-foreground">{publication.profile.name}</p>
                          </div>
                        </div>
                        <div>
                          <img
                             className={cn(`
                             max-w-full sm:max-w-[500px]
                             rounded-2xl h-auto object-cover transition-all hover:scale-105
                             `)}
                            src={publication.__typename === 'Post' ? publication.metadata?.media[0]?.original.cover?.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/') : ''}
                          />
                          <audio controls>
                            <source
                              type={publication.metadata?.media[0]?.original?.mimeType}
                              src={publication.metadata?.media[0]?.original?.url}
                            />
                          </audio>
                          <ReactMarkdown className="
                          mt-4 break-words
                          ">
                            {publication.metadata.content.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '[LINK]($1)')}
                          </ReactMarkdown>
                        </div>
                        <div>
                          <Button className="rounded-full mr-1"  variant="secondary" >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            {publication.stats.totalAmountOfComments}
                          </Button>
                          <Button className="rounded-full mr-1" variant="secondary">
                            <Repeat2 className="mr-2 h-4 w-4" />
                            {publication.stats.totalAmountOfMirrors}
                          </Button>
                          <Button className="rounded-full mr-1" variant="secondary">
                            <Heart className="mr-2 h-4 w-4" />
                            {publication.stats.totalUpvotes}
                          </Button>
                          <Button className="rounded-full mr-1" variant="secondary">
                            <Grab className="mr-2 h-4 w-4" />
                            {publication.stats.totalAmountOfCollects}
                          </Button>
                        </div>
                      </div>
                    </a>
                  ))
                }
          </div>
        </div>
      )}
    </main>
  );
}
