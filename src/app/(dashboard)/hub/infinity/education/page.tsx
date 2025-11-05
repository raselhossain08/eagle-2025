"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { GraduationCap, Star, ArrowRight, CheckCircle } from "lucide-react";
import { mockUser } from "@/lib/data/infinity.data";
import { EducationCurriculum } from "@/components/hub/education-curriculum";

export default function EducationPage() {
  const user = mockUser;
  const hasInfinityAccess = user.subscription === "Infinity";

  return (
    <div className="space-y-8">
      {/* Hero Section - Matching Screenshot */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left side - Logo */}
            <div className="flex-shrink-0">
              <img
                src="/eagle-academy-logo.jpeg"
                alt="Eagle Investors Academy"
                className="w-32 h-32 lg:w-40 lg:h-40 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Right side - Content */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
                  Eagle Academy
                </h1>
                <p className="text-yellow-400 font-semibold text-xl">
                  Investment Education Excellence
                </p>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed max-w-4xl">
                Expand your investment knowledge with our comprehensive Eagle
                Academy. From beginner fundamentals to advanced trading
                strategies, our education library covers everything you need to
                succeed in the markets.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/hub/infinity/education/library">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-3 shadow-glow-yellow transition-all duration-200 hover:scale-105">
                    Access Full Academy Library{" "}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/hub/infinity/education/infinity">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-bold text-lg px-8 py-3 shadow-glow-cyan transition-all duration-200 hover:scale-105">
                    Access Full Infinity Education{" "}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two Cards Section - Matching Screenshot */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Eagle Academy Card */}
        <Card className="bg-brand-bg-light border-brand-border relative">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center mx-auto mb-6 shadow-glow-cyan">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-4">
              Eagle Academy
            </CardTitle>
            {hasInfinityAccess && (
              <div className="absolute -top-3 -right-3">
                <div className="bg-gradient-to-r from-brand-green to-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-glow-blue">
                  FULL ACCESS
                </div>
              </div>
            )}
            <p className="text-gray-400 mb-6 leading-relaxed">
              Short, focused educational segments covering essential trading and
              investing concepts. Perfect for quick learning and skill building
              across all experience levels.
            </p>
            <div className="space-y-3 text-left">
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
        <Card className="bg-brand-bg-light border-yellow-500 border-2 shadow-glow-yellow relative">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-6 shadow-glow-yellow">
              <Star className="w-8 h-8 text-black" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-4">
              Infinity Education
            </CardTitle>
            {hasInfinityAccess && (
              <div className="absolute -top-3 -right-3">
                <div className="bg-gradient-to-r from-brand-green to-green-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-glow-blue">
                  FULL ACCESS
                </div>
              </div>
            )}
            <p className="text-gray-400 mb-6 leading-relaxed">
              University-style, comprehensive educational content on the most
              important topics for successful traders and investors. Deep-dive
              learning for serious market participants.
            </p>
            <div className="space-y-3 text-left">
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

      {/* Eagle Academy Curriculum Section */}
      <div className="py-8">
        <EducationCurriculum />
      </div>

      {/* Additional Info Section */}
      <Card className="bg-brand-bg-light border-brand-border">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-4">
              Why Choose Eagle Academy?
            </h3>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Our educational content is created by experienced market
              professionals and covers everything from basic investment
              principles to advanced trading strategies. Learn at your own pace
              with our structured curriculum.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-green to-green-600 flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">
                Expert Instructors
              </h4>
              <p className="text-gray-400 text-sm">
                Learn from seasoned professionals with decades of market
                experience
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">
                Comprehensive Content
              </h4>
              <p className="text-gray-400 text-sm">
                From beginner basics to advanced strategies, we cover all skill
                levels
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-black" />
              </div>
              <h4 className="font-semibold text-white mb-2">
                Practical Application
              </h4>
              <p className="text-gray-400 text-sm">
                Real-world examples and actionable investment strategies
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
  );
}
