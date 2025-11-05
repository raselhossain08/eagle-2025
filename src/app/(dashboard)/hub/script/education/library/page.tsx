"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lock, Star, BookOpen, GraduationCap } from "lucide-react";
import {
  eagleAcademyCategories,
  educationLibrary,
  mockUser,
} from "@/lib/data/script.data";
import type { AcademyCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

// Reorder content to put Infinity Exclusive first
const allContent: AcademyCategory[] = [
  {
    name: "Infinity Exclusive",
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

export default function EducationLibraryPage() {
  const user = mockUser;
  const hasInfinityAccess = user.subscription === "Infinity";
  const [selectedCategory, setSelectedCategory] = useState(allContent[0].name);

  const currentCategory = allContent.find(
    (cat) => cat.name === selectedCategory
  );
  const isLocked = currentCategory?.isInfinity && !hasInfinityAccess;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/hub/script/education">
          <Button
            variant="outline"
            size="icon"
            className="border-brand-border text-white hover:bg-brand-bg-dark bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">
            Eagle Academy Library
          </h1>
          <p className="text-gray-400">All educational videos in one place.</p>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card className="bg-brand-bg-light border-brand-border sticky top-8">
            <CardHeader>
              <CardTitle className="text-white text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {allContent.map((category) => {
                  const isActive = selectedCategory === category.name;
                  const categoryLocked =
                    category.isInfinity && !hasInfinityAccess;

                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-none transition-colors flex items-center justify-between gap-3",
                        isActive
                          ? "bg-brand-bg-dark text-white border-r-2 border-brand-cyan"
                          : "text-gray-400 hover:text-white hover:bg-brand-bg-dark/50"
                      )}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {categoryLocked ? (
                          <Lock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        ) : category.isInfinity ? (
                          <Star className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        ) : (
                          <BookOpen className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium truncate">
                          {category.name}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        {category.isInfinity ? (
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-2 py-0.5 rounded-full text-xs font-bold">
                            Upgrade
                          </div>
                        ) : (
                          <div className="bg-gradient-to-r from-brand-green to-green-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                            FREE
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {currentCategory && (
            <>
              {/* Category Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  {isLocked ? (
                    <Lock className="w-6 h-6 text-yellow-400" />
                  ) : currentCategory.isInfinity ? (
                    <Star className="w-6 h-6 text-yellow-400" />
                  ) : (
                    <BookOpen className="w-6 h-6 text-brand-cyan" />
                  )}
                  <h2 className="text-2xl font-bold text-white">
                    {currentCategory.name}
                  </h2>
                </div>
                {currentCategory.isInfinity && (
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-semibold">
                      INFINITY EXCLUSIVE
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              {isLocked ? (
                <div className="space-y-0">
                  {/* Unified Infinity Education Section */}
                  <div className="border-2 border-yellow-500 rounded-2xl bg-brand-bg-light shadow-glow-yellow overflow-hidden">
                    {/* Top Section - Information */}
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-glow-yellow">
                        <Star className="w-8 h-8 text-black" />
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4">
                        Infinity Education
                      </h3>
                      <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto mb-8">
                        University-style, comprehensive educational content on
                        the most important topics for successful traders and
                        investors. Deep-dive learning for serious market
                        participants.
                      </p>
                      <div className="space-y-4 max-w-md mx-auto">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">
                            Comprehensive, long-form content
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">
                            University-level depth
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">
                            Advanced strategies & analysis
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                          <span className="text-gray-300 text-sm">
                            Infinity members exclusive
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section - Upgrade CTA */}
                    <div className="border-t-2 border-dashed border-yellow-500/50 bg-brand-bg-dark/30 p-8 text-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-glow-yellow">
                        <Lock className="w-10 h-10 text-black" />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-4">
                        INFINITY FEATURE
                      </h4>
                      <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        This content is exclusively for Infinity members.
                        Upgrade to access university-style educational content.
                      </p>
                      <Link href="/hub/script/subscription">
                        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-12 py-4 shadow-glow-yellow transition-all duration-200 hover:scale-105 rounded-xl">
                          Upgrade to Infinity
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
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
                          Short, focused educational segments covering essential
                          trading and investing concepts. Perfect for quick
                          learning and skill building across all experience
                          levels.
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
                  {currentCategory.videos.map((video) => (
                    <Card
                      key={video.id}
                      className={cn(
                        "bg-brand-bg-light border-brand-border",
                        !video.videoId && "opacity-70"
                      )}
                    >
                      <CardHeader>
                        {currentCategory.isInfinity && (
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 text-xs font-semibold">
                              INFINITY EXCLUSIVE
                            </span>
                          </div>
                        )}
                        <CardTitle className="text-white text-lg">
                          {video.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {video.videoId ? (
                          <div className="aspect-video">
                            <iframe
                              width="100%"
                              height="100%"
                              src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
                              title={video.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="rounded-lg"
                              loading="lazy"
                            ></iframe>
                          </div>
                        ) : (
                          <div className="aspect-video bg-brand-bg-dark rounded-lg flex items-center justify-center">
                            <img
                              src={video.thumbnailUrl || "/placeholder.svg"}
                              alt={video.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        )}
                        {video.duration && (
                          <div className="mt-4 text-sm text-gray-400">
                            Duration: {video.duration}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
