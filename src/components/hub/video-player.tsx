"use client";

import type React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { AcademyVideo } from "@/lib/AcademyType";

interface VideoPlayerProps {
  video: AcademyVideo;
  children: React.ReactNode;
}

export function VideoPlayer({ video, children }: VideoPlayerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl bg-brand-bg-dark border-brand-border text-white p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>{video.title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-b-lg"
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  );
}
