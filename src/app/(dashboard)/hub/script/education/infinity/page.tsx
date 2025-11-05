"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Lock, Star, GraduationCap } from "lucide-react";
import { educationLibrary, mockUser } from "@/lib/data/script.data";

export default function InfinityEducationPage() {
  const user = mockUser;
  const hasInfinityAccess = user.subscription === "Infinity";

  if (!hasInfinityAccess) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
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
                Infinity Education
              </h1>
              <p className="text-gray-400">
                University-style comprehensive learning
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center py-16 rounded-2xl bg-brand-bg-light border-2 border-dashed border-yellow-500/50">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6 shadow-glow-yellow">
            <Lock className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">
            INFINITY FEATURE
          </h2>
          <p className="text-gray-400 mb-8 max-w-md">
            Access university-style, comprehensive educational content
            exclusively for Infinity members. Deep-dive learning for serious
            market participants.
          </p>
          <Link href="/hub/script/subscription">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-3 shadow-glow-yellow">
              Upgrade to Infinity
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
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
              Infinity Education
            </h1>
            <p className="text-gray-400">
              University-style comprehensive learning
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow">
              <GraduationCap className="w-8 h-8 text-black" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white">
                Infinity Education Library
              </h2>
              <p className="text-yellow-400 font-semibold text-lg">
                University-Style Learning
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Access comprehensive, long-form educational content designed for
            serious traders and investors. Our university-style curriculum
            covers the most important topics for market success with in-depth
            analysis and advanced strategies.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        {educationLibrary.map((item) => (
          <Card key={item.id} className="bg-brand-bg-light border-brand-border">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-semibold">
                  INFINITY EXCLUSIVE
                </span>
              </div>
              <CardTitle className="text-white text-xl">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-brand-bg-dark rounded-lg flex items-center justify-center mb-4">
                <img
                  src={item.thumbnailUrl || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                  {item.type}
                </span>
                {item.duration && <span>{item.duration}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
