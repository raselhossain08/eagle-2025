"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Lock, PlayCircle, ChevronDown, BookOpen } from "lucide-react";
import { mockUser, academyCurriculum, infinityCurriculum } from "@/lib/data/infinity.data";
import { VideoPlayer } from "@/components/hub/video-player";
import { cn } from "@/lib/utils";
import type { AcademyCategory, InfinityCategory } from "@/lib/infinityTypes";

export function EducationCurriculum() {
  const user = mockUser;
  const hasInfinityAccess = user.subscription === "Infinity";
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderVideoGrid = (videos: any[]) => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6">
      {videos.map((video) => (
        <VideoPlayer key={video.id} video={video}>
          <Card className="bg-brand-bg-dark border-brand-border overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-glow-blue cursor-pointer">
            <CardContent className="p-0 relative">
              <img
                src={video.thumbnailUrl || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center shadow-glow-cyan">
                  <PlayCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <img
                  src="/eagle-academy-logo.jpeg"
                  alt="Eagle Academy"
                  className="w-8 h-8 object-contain opacity-80 rounded-full"
                />
              </div>
            </CardContent>
            <div className="p-4 bg-brand-bg-light">
              <h3
                className="font-semibold text-white truncate"
                title={video.title}
              >
                {video.title}
              </h3>
            </div>
          </Card>
        </VideoPlayer>
      ))}
    </div>
  );

  const renderCollapsible = (
    category:
      | AcademyCategory
      | (InfinityCategory & { isInfinityExclusive?: boolean }),
    isInfinitySubCategory = false
  ) => {
    const Icon =
      "icon" in category && typeof category.icon !== "string"
        ? category.icon
        : BookOpen;
    const emojiIcon =
      "icon" in category && typeof category.icon === "string"
        ? category.icon
        : null;

    return (
      <Collapsible
        key={category.id}
        open={!!openSections[category.id]}
        onOpenChange={() => toggleSection(category.id)}
        className="border border-brand-border rounded-lg bg-brand-bg-light overflow-hidden"
      >
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-brand-bg-dark/30 transition-colors">
          <div className="flex items-center gap-3">
            {isInfinitySubCategory ? (
              <span className="text-xl">{emojiIcon}</span>
            ) : (
              <Icon className="w-5 h-5 text-brand-cyan" />
            )}
            <span className="font-semibold text-white">{category.name}</span>
          </div>
          <div className="flex items-center gap-3">
            {!isInfinitySubCategory && (
              <Badge className="bg-brand-green/20 text-brand-green border border-brand-green/30">
                FREE + Basic + Diamond
              </Badge>
            )}
            <ChevronDown
              className={cn(
                "w-5 h-5 text-gray-400 transition-transform",
                openSections[category.id] && "rotate-180"
              )}
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-brand-bg-dark">
          {renderVideoGrid(category.videos)}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">
          Eagle Academy Curriculum
        </h2>
        <p className="text-gray-400 mt-2">
          Browse our comprehensive library of educational content.
        </p>
      </div>

      <div className="space-y-4 max-w-5xl mx-auto">
        <Collapsible
          open={!!openSections["infinity-exclusive"]}
          onOpenChange={() => toggleSection("infinity-exclusive")}
          className="border-2 border-yellow-500 rounded-lg bg-brand-bg-light overflow-hidden shadow-glow-yellow"
        >
          <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-brand-bg-dark/30 transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-white">
                Infinity Exclusive
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                {hasInfinityAccess ? "All Access" : "Upgrade Required"}
              </Badge>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-gray-400 transition-transform",
                  openSections["infinity-exclusive"] && "rotate-180"
                )}
              />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="bg-brand-bg-dark p-6">
            {hasInfinityAccess ? (
              <div className="space-y-4">
                {infinityCurriculum.map((category) =>
                  renderCollapsible(category, true)
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6 shadow-glow-yellow mx-auto">
                  <Lock className="w-12 h-12 text-black" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-white">
                  INFINITY FEATURE
                </h2>
                <p className="text-gray-400 mb-8 max-w-md">
                  This content is exclusively for Infinity members. Upgrade to
                  access.
                </p>
                <Link href="/hub/subscription">
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-3 shadow-glow-yellow transition-all duration-200 hover:scale-105">
                    Upgrade to Infinity
                  </Button>
                </Link>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {academyCurriculum.map((category) => renderCollapsible(category))}
      </div>
    </div>
  );
}
