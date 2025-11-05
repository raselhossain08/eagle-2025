"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, GraduationCap, Star } from "lucide-react";
import { mockUser } from "@/lib/data/infinity.data";
import { InfinityCurriculum } from "@/components/hub/infinity-curriculum";

export default function InfinityEducationPage() {
  const user = mockUser;
  const hasInfinityAccess = user.subscription === "Infinity";

  return (
    <div className="space-y-8">
      {/* Hero Section for Infinity Education */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow">
              <Star className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Infinity Education Library
              </h1>
              <p className="text-yellow-400 font-semibold text-lg">
                University-Level Investment Education
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Access our exclusive Infinity curriculum featuring university-style,
            comprehensive educational content on the most important topics for
            successful traders and investors. Deep-dive learning for serious
            market participants.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {hasInfinityAccess ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white">
                Eagle Academy Curriculum
              </h2>
              <p className="text-gray-400 mt-2">
                Browse our comprehensive library of educational content.
              </p>
            </div>

            <div className="border-2 border-yellow-500 rounded-lg bg-brand-bg-light overflow-hidden shadow-glow-yellow p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-white text-xl">
                    Infinity Exclusive
                  </span>
                </div>
                <div className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full text-sm font-semibold">
                  All Access
                </div>
              </div>

              <InfinityCurriculum />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-16 rounded-2xl bg-brand-bg-light border-2 border-dashed border-yellow-500/50">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6 shadow-glow-yellow mx-auto">
              <Lock className="w-12 h-12 text-black" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-white">
              INFINITY ACCESS REQUIRED
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
              This content is exclusively for Infinity members. Upgrade your
              plan to unlock this comprehensive education library.
            </p>
            <Link href="/hub/infinity/subscription">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-3 shadow-glow-yellow transition-all duration-200 hover:scale-105">
                Upgrade to Infinity
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <GraduationCap className="w-6 h-6 text-black" />
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
    </div>
  );
}
