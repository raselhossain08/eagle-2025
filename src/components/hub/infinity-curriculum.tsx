"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PlayCircle, ChevronDown } from "lucide-react";
import { infinityCurriculum } from "@/lib/data/infinity.data";
import { VideoPlayer } from "@/components/hub/video-player";
import { cn } from "@/lib/utils";
import type { InfinityCategory } from "@/lib/infinityTypes";

export function InfinityCurriculum() {
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

  const renderCollapsible = (category: InfinityCategory) => {
    return (
      <Collapsible
        key={category.id}
        open={!!openSections[category.id]}
        onOpenChange={() => toggleSection(category.id)}
        className="border border-brand-border rounded-lg bg-brand-bg-light overflow-hidden"
      >
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-brand-bg-dark/30 transition-colors">
          <div className="flex items-center gap-3">
            <span className="text-xl">{category.icon}</span>
            <span className="font-semibold text-white">{category.name}</span>
          </div>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-gray-400 transition-transform",
              openSections[category.id] && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-brand-bg-dark">
          {renderVideoGrid(category.videos)}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <div className="space-y-4">
      {infinityCurriculum.map((category) => renderCollapsible(category))}
    </div>
  );
}
