"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  AlertCircle,
  Lock,
  ShoppingCart,
} from "lucide-react";
import { mockUser } from "@/lib/data/script.data";
import Link from "next/link";
import { useMentorshipAccess } from "@/hooks/use-mentorship-access";

export default function PrivateSessionDashboard() {
  const user = mockUser;
  const { hasAnyMentorshipAccess } = useMentorshipAccess();

  if (!hasAnyMentorshipAccess) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-brand-border shadow-glow-cyan">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-cyan/10" />
          <div className="relative p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center shadow-glow-cyan">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white">
                  Private Session Dashboard
                </h1>
                <p className="text-brand-cyan font-semibold text-lg">
                  Welcome Back
                </p>
              </div>
            </div>
            <p className="text-gray-300 max-w-3xl">
              This is where you would track your mentorship progress, manage
              upcoming sessions, and access your personalized learning
              materials.
            </p>
          </div>
        </div>

        {/* Clean Dashboard Preview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>

          {/* Stats Preview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-brand-bg-light border-brand-border relative">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">12</div>
                    <div className="text-sm text-gray-400">Total Sessions</div>
                  </div>
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Lock className="w-8 h-8 text-brand-cyan" />
              </div>
            </Card>

            <Card className="bg-brand-bg-light border-brand-border relative">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-green to-green-600 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">8</div>
                    <div className="text-sm text-gray-400">Completed</div>
                  </div>
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Lock className="w-8 h-8 text-brand-cyan" />
              </div>
            </Card>

            <Card className="bg-brand-bg-light border-brand-border relative">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">2</div>
                    <div className="text-sm text-gray-400">Upcoming</div>
                  </div>
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Lock className="w-8 h-8 text-brand-cyan" />
              </div>
            </Card>

            <Card className="bg-brand-bg-light border-brand-border relative">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">14.5</div>
                    <div className="text-sm text-gray-400">Total Hours</div>
                  </div>
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Lock className="w-8 h-8 text-brand-cyan" />
              </div>
            </Card>
          </div>

          {/* Access Required Message */}
          <Card className="bg-brand-bg-light border-2 border-dashed border-brand-cyan/50">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center mx-auto mb-6 shadow-glow-cyan">
                <Lock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Dashboard Access Required
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Purchase a private session package to unlock your personalized
                dashboard with session tracking, progress monitoring, and mentor
                communications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/hub/script/private-sessions">
                  <Button className="bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-bold px-8 py-3 shadow-glow-cyan transition-all duration-200 hover:scale-105">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Purchase Package
                  </Button>
                </Link>
                <Link href="/hub/script/private-sessions">
                  <Button
                    variant="outline"
                    className="border-brand-border text-white hover:bg-brand-bg-dark bg-transparent px-8 py-3"
                  >
                    View All Packages
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get Section */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardHeader>
            <CardTitle className="text-white font-bold">
              What You'll Get With Private Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
                  <span className="text-gray-300">
                    Session progress tracking
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
                  <span className="text-gray-300">
                    Upcoming session management
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
                  <span className="text-gray-300">
                    Session notes and recordings
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
                  <span className="text-gray-300">
                    Direct mentor communication
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
                  <span className="text-gray-300">Performance analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
                  <span className="text-gray-300">
                    Personalized learning materials
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
                  <span className="text-gray-300">
                    Session scheduling tools
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0" />
                  <span className="text-gray-300">
                    Progress milestone tracking
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/hub/script/private-sessions">
                <Button className="bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-semibold text-lg px-8 py-3 shadow-glow-cyan transition-all duration-200 hover:scale-105">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Purchase Private Session Package
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // This would be the actual dashboard for users who have purchased private sessions
  // (Currently unreachable since hasPrivateSessionAccess is always false)
  return (
    <div className="space-y-8">
      {/* Full dashboard content would go here */}
    </div>
  );
}
