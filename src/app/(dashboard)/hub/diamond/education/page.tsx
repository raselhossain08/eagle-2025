"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Lock,
  PlayCircle,
  BookOpen,
  ArrowRight,
  Video,
  FileText,
  Users,
  GraduationCap,
  Star,
} from "lucide-react";
import {
  mockUser,
  eagleAcademyCategories,
  educationLibrary,
} from "@/lib/data/diamond.data";
import { VideoPlayerModal } from "@/components/hub/video-player-modal";
import type { AcademyVideo, AcademyCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

// Reorder content to put Infinity Exclusive first
const allContent: AcademyCategory[] = [
  {
    name: "Infinity Exclusive Content",
    isInfinity: true,
    videos: educationLibrary.map((item) => ({
      id: item.id,
      title: item.title,
      videoId: "", // No video ID for these premium, non-youtube videos
      type: item.type,
      duration: item.duration,
      thumbnailUrl: item.thumbnailUrl,
    })),
  },
  ...eagleAcademyCategories,
];

export default function EducationPage() {
  const user = mockUser;
  const hasInfinityAccess = user.subscription === "Infinity";
  const [selectedVideo, setSelectedVideo] = useState<AcademyVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayVideo = (video: AcademyVideo) => {
    if (video.videoId) {
      setSelectedVideo(video);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const getTypeIcon = (type: string | undefined) => {
    switch (type) {
      case "Video":
        return <Video className="w-4 h-4" />;
      case "Article":
        return <FileText className="w-4 h-4" />;
      case "Webinar":
        return <Users className="w-4 h-4" />;
      default:
        return <PlayCircle className="w-4 h-4" />;
    }
  };

  return (
    <>
      <VideoPlayerModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <div className="space-y-12">
        {/* Hero Section - Matching Screenshot */}
        <div className="relative overflow-hidden rounded-2xl bg-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
          <div className="relative p-8">
            <div className="flex items-center gap-8">
              {/* Academy Logo */}
              <div className="flex-shrink-0">
                <img
                  src="/eagle-academy-logo.jpeg"
                  alt="Eagle Investors Academy"
                  className="w-32 h-32 object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <h1 className="text-5xl font-bold tracking-tight text-white mb-2">
                  Eagle Academy
                </h1>
                <p className="text-yellow-400 font-semibold text-xl mb-6">
                  Investment Education Excellence
                </p>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Expand your investment knowledge with our comprehensive Eagle
                  Academy. From beginner fundamentals to advanced trading
                  strategies, our education library covers everything you need
                  to succeed in the markets.
                </p>

                {/* Buttons */}
                <div className="flex gap-4">
                  <Link href="/hub/diamond/education/library">
                    <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-3 shadow-glow-yellow transition-all duration-200 hover:scale-105">
                      Access Full Academy Library
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/hub/diamond/education/infinity">
                    <Button className="bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-bold text-lg px-8 py-3 shadow-glow-cyan transition-all duration-200 hover:scale-105">
                      Access Full Infinity Education
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Content Types - Matching Screenshot Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Eagle Academy Card */}
          <Card className="bg-brand-bg-light border-brand-border">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center mx-auto mb-4 shadow-glow-cyan">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>

                {/* Add the FREE flair badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center bg-gradient-to-r from-brand-green to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-glow-blue">
                    FREE • Basic + Diamond
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Eagle Academy
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Short, focused educational segments covering essential trading
                  and investing concepts. Perfect for quick learning and skill
                  building across all experience levels.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan"></div>
                  <span className="text-gray-300 text-sm">
                    Bite-sized learning modules
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan"></div>
                  <span className="text-gray-300 text-sm">
                    Essential concepts and fundamentals
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan"></div>
                  <span className="text-gray-300 text-sm">
                    Quick skill development
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan"></div>
                  <span className="text-gray-300 text-sm">
                    All membership levels
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Infinity Education Card */}
          <Card className="bg-brand-bg-light border-yellow-500 border-2 shadow-glow-yellow">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-glow-yellow">
                  <Star className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Infinity Education
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  University-style, comprehensive educational content on the
                  most important topics for successful traders and investors.
                  Deep-dive learning for serious market participants.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-gray-300 text-sm">
                    Comprehensive, long-form content
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-gray-300 text-sm">
                    University-level depth
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-gray-300 text-sm">
                    Advanced strategies & analysis
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-gray-300 text-sm">
                    Infinity members exclusive
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Curriculum Section */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">
              Eagle Academy Curriculum
            </h2>
            <p className="text-gray-400 mt-2">
              Browse our comprehensive library of educational content.
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full space-y-4"
            defaultValue="item-0"
          >
            {allContent.map((category, index) => {
              const isLocked = category.isInfinity && !hasInfinityAccess;
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-brand-bg-light border-brand-border rounded-xl border"
                >
                  <AccordionTrigger className="p-6 hover:no-underline text-white hover:bg-brand-bg-dark/30 rounded-t-xl transition-colors">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        {isLocked ? (
                          <Lock className="w-6 h-6 text-yellow-400" />
                        ) : category.isInfinity ? (
                          <Star className="w-6 h-6 text-yellow-400" />
                        ) : (
                          <BookOpen className="w-6 h-6 text-brand-cyan" />
                        )}
                        <span className="text-xl font-semibold text-left">
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        {category.isInfinity ? (
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-glow-yellow">
                            Upgrade to Access
                          </div>
                        ) : (
                          <div className="bg-gradient-to-r from-brand-green to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-glow-blue">
                            FREE • Basic + Diamond
                          </div>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="p-6 border-t border-brand-border">
                    {isLocked ? (
                      <div className="flex flex-col items-center justify-center text-center py-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4 shadow-glow-yellow">
                          <Lock className="w-8 h-8 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-white">
                          Infinity Exclusive
                        </h3>
                        <p className="text-gray-400 mt-2 mb-4 max-w-md">
                          This university-style educational content is
                          exclusively for Infinity members. Upgrade to unlock
                          comprehensive, long-form learning materials.
                        </p>
                        <Link href="/hub/diamond/subscription">
                          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold shadow-glow-yellow">
                            Upgrade to Infinity
                          </Button>
                        </Link>
                      </div>
                    ) : (
                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {category.videos.map((video) => (
                          <Card
                            key={video.id}
                            onClick={() => handlePlayVideo(video)}
                            className={cn(
                              "bg-brand-bg-dark border-brand-border overflow-hidden group flex flex-col",
                              video.videoId
                                ? "cursor-pointer"
                                : "cursor-not-allowed opacity-70",
                              "transition-all duration-300 hover:scale-105 hover:shadow-glow-blue"
                            )}
                          >
                            <CardContent className="p-0 relative">
                              <img
                                src={
                                  video.thumbnailUrl ||
                                  `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
                                }
                                alt={video.title}
                                className="w-full h-40 object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                {video.videoId && (
                                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center shadow-glow-cyan">
                                    <PlayCircle className="w-8 h-8 text-white" />
                                  </div>
                                )}
                              </div>
                              <div className="absolute top-2 right-2">
                                <img
                                  src="/eagle-academy-logo.jpeg"
                                  alt="Eagle Academy"
                                  className="w-8 h-8 object-contain opacity-80"
                                />
                              </div>
                            </CardContent>
                            <div className="p-4 flex flex-col flex-grow">
                              <h3 className="font-semibold text-sm text-white flex-grow">
                                {video.title}
                              </h3>
                              <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
                                <span className="flex items-center gap-1.5">
                                  {getTypeIcon(video.type)}
                                </span>
                                {video.duration && (
                                  <span>{video.duration}</span>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Educational Disclaimer */}
        <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-black text-sm font-bold">*</span>
            </div>
            <div>
              <h4 className="text-yellow-400 font-semibold mb-2">
                Educational Disclaimer
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                *Educational content is for informational purposes only and does
                not constitute investment advice. Individual results may vary.
                Consult with a qualified financial advisor before making
                investment decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
