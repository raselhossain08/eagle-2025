"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Megaphone,
  AlertCircle,
  Info,
  Clock,
  TrendingUp,
  Users,
  BarChart3,
  Star,
  Bot,
  Code,
  GraduationCap,
} from "lucide-react";
import { adminAnnouncements } from "@/lib/data/basic.data";
import { UpgradePromptCard } from "@/components/subscription/upgrade-button";
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";

export default function BasicPage() {
  const { profile } = useAuth();

  if (!profile) {
    return null;
  }

  // Convert profile to user format
  const user = {
    name: `${profile.firstName} ${profile.lastName}`,
    email: profile.email,
    avatarUrl: "/placeholder-user.jpg",
    subscription: profile.subscription as
      | "Diamond"
      | "Infinity"
      | "None"
      | "Basic"
      | "Script",
  };

  const getPriorityIcon = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "medium":
        return <Info className="w-4 h-4 text-yellow-400" />;
      case "low":
        return <Clock className="w-4 h-4 text-blue-400" />;
    }
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-blue-500";
    }
  };

  // Eagle Brand Color Palette with Enhanced Unique Names
  const eagleColorSystem = {
    // Primary Brand Colors
    primaryBlue: "text-brand-primary", // #58A6FF
    accentCyan: "text-brand-cyan", // #39D3D7  
    successGreen: "text-brand-green", // #3FB950
    dangerRed: "text-brand-red", // #F85149
    
    // Background System
    canvasMain: "bg-brand-bg-dark", // #0D1117
    surfaceCard: "bg-brand-bg-light", // #161B22
    dividerLine: "border-brand-border", // #30363D
    
    // New Eagle Theme Colors
    canvasWhite: "bg-eagle-canvas",
    charcoalText: "text-eagle-charcoal", 
    actionSlate: "bg-eagle-action",
    quietGray: "bg-eagle-quiet",
    highlightAccent: "bg-eagle-highlight",
    
    // Chart Colors with Unique Names
    chartOrange: "text-eagle-chart-orange",
    chartTeal: "text-eagle-chart-teal",
    chartBlue: "text-eagle-chart-blue",
    chartYellow: "text-eagle-chart-yellow",
    chartCoral: "text-eagle-chart-coral",
  };

  const eagleGlowSystem = {
    cyanAura: "shadow-glow-cyan",
    yellowRadiance: "shadow-glow-yellow", 
    blueHalo: "shadow-glow-blue",
    redGlow: "shadow-glow-red",
  };

  const stats = [
    {
      label: "Platform Users",
      value: "155K+",
      icon: Users,
      color: eagleColorSystem.accentCyan,
      bgColor: "bg-brand-cyan/10",
      glowEffect: eagleGlowSystem.cyanAura,
      chartColor: eagleColorSystem.chartTeal,
    },
    {
      label: "Market Monitoring", 
      value: "24/7",
      icon: BarChart3,
      color: eagleColorSystem.successGreen,
      bgColor: "bg-brand-green/10",
      glowEffect: eagleGlowSystem.blueHalo,
      chartColor: eagleColorSystem.chartBlue,
    },
    {
      label: "States Operating",
      value: "50", 
      icon: TrendingUp,
      color: eagleColorSystem.primaryBlue,
      bgColor: "bg-brand-primary/10",
      glowEffect: eagleGlowSystem.blueHalo,
      chartColor: eagleColorSystem.chartOrange,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-brand-border shadow-glow-blue">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-cyan/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center shadow-glow-cyan">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Welcome Back, {profile.firstName}!
              </h1>
              <p className="text-brand-cyan font-semibold">
                Eagle Investors Hub - Basic Access
              </p>
            </div>
          </div>
          <p className="text-gray-300 mb-6 max-w-2xl">
            Access your personalized investment dashboard with real-time market
            insights, trading tools and resources*, and exclusive advisory
            services designed to help you navigate every market cycle.
          </p>

          {/* Enhanced Stats with New Eagle Color System */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 rounded-xl p-4 border transition-all duration-300 hover:scale-105",
                  eagleColorSystem.surfaceCard,
                  eagleColorSystem.dividerLine,
                  stat.bgColor,
                  `hover:${stat.glowEffect}/20`
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center border relative",
                    eagleColorSystem.canvasMain,
                    eagleColorSystem.dividerLine,
                    stat.color
                  )}
                >
                  <stat.icon className="w-5 h-5" />
                  <div className={cn("absolute -top-1 -right-1 w-3 h-3 rounded-full", stat.chartColor.replace('text-', 'bg-'))}></div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className={cn("text-sm", eagleColorSystem.charcoalText.replace('text-eagle-charcoal', 'text-gray-400'))}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Action Buttons with New Eagle Color System */}
          <div className="flex flex-wrap gap-4">
            <Link href="/hub/basic/ai-advisor">
              <Button className={cn(
                "bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-bold px-6 py-3 transition-all duration-300 hover:scale-105 rounded-xl border border-brand-cyan/20",
                eagleGlowSystem.cyanAura,
                `hover:${eagleGlowSystem.cyanAura}/70`
              )}>
                <Bot className="w-5 h-5 mr-2" />
                Access AI Advisor
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/hub/basic/scripts">
              <Button className={cn(
                "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-6 py-3 transition-all duration-300 hover:scale-105 rounded-xl border border-yellow-400/30",
                eagleGlowSystem.yellowRadiance,
                `hover:${eagleGlowSystem.yellowRadiance}/70`
              )}>
                <Code className="w-5 h-5 mr-2" />
                View Trading Scripts
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/hub/basic/education">
              <Button className={cn(
                "bg-gradient-to-r from-brand-green to-emerald-600 hover:from-brand-green/90 hover:to-emerald-700 text-white font-bold px-6 py-3 transition-all duration-300 hover:scale-105 rounded-xl border border-brand-green/30",
                eagleGlowSystem.blueHalo,
                "hover:shadow-[0_0_20px_rgba(63,185,80,0.4)]"
              )}>
                <GraduationCap className="w-5 h-5 mr-2" />
                Access Education
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Admin Announcements */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-brand-bg-light border-brand-border shadow-glow-blue transition-all duration-300 hover:shadow-glow-blue/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-white font-bold">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center">
                    <Megaphone className="w-4 h-4 text-white" />
                  </div>
                  Community Announcements
                </CardTitle>
                <Link href="/hub/basic/community">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-brand-primary hover:text-brand-primary hover:bg-brand-primary/10 transition-all duration-200 hover:scale-105"
                  >
                    View All <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {adminAnnouncements.slice(0, 2).map((announcement) => (
                <div
                  key={announcement.id}
                  className={cn(
                    "border-l-4 pl-4 pb-6 last:pb-0 border-b border-brand-border last:border-b-0 transition-all duration-200 hover:bg-brand-bg-dark/30 rounded-r-lg p-4 -ml-4",
                    getPriorityColor(announcement.priority)
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(announcement.priority)}
                      <h3 className="font-semibold text-white">
                        {announcement.title}
                      </h3>
                    </div>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {announcement.timestamp}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {announcement.content}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500">
                      By {announcement.author}
                    </span>
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full font-semibold",
                        announcement.priority === "high" &&
                          "bg-red-500/20 text-red-400",
                        announcement.priority === "medium" &&
                          "bg-yellow-500/20 text-yellow-400",
                        announcement.priority === "low" &&
                          "bg-blue-500/20 text-blue-400"
                      )}
                    >
                      {announcement.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Subscription & Quick Links */}
        <div className="space-y-8">
          <UpgradePromptCard
            currentPackage={user.subscription === "Basic" ? "basic" : "none"}
            targetPackages={["diamond", "infinity"]}
            title="Your Plan: Eagle Basic"
            description="Upgrade to unlock premium features including Enhanced AI Advisor, Professional Trading Scripts, and complete Education Library."
          />

          {/* SEC Compliance Notice */}
          <Card className="bg-yellow-500/10 border-2 border-yellow-500/50">
            <CardContent className="p-4">
              <h4 className="text-yellow-400 font-semibold mb-2 text-sm">
                Important Notice
              </h4>
              <p className="text-gray-300 text-xs leading-relaxed">
                Eagle Investors is an investment adviser registered in
                applicable jurisdictions. Registration does not imply a certain
                level of skill or training. All investment strategies involve
                risk of loss.
              </p>
            </CardContent>
          </Card>

          {/* Quick Access Links */}
          <Card className="bg-brand-bg-light border-brand-border transition-all duration-300 hover:shadow-glow-blue/30">
            <CardHeader>
              <CardTitle className="text-white font-bold">
                Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/hub/basic/ai-advisor" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-white hover:bg-brand-bg-dark transition-all duration-200 hover:scale-105"
                >
                  🤖 Enhanced AI Advisor
                </Button>
              </Link>
              <Link href="/hub/basic/scripts" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-white hover:bg-brand-bg-dark transition-all duration-200 hover:scale-105"
                >
                  ⚡ Professional Trading Scripts
                </Button>
              </Link>
              <Link href="/hub/basic/education" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-white hover:bg-brand-bg-dark transition-all duration-200 hover:scale-105"
                >
                  📚 Complete Education Library
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FREE Discord Trial Access Section - Matching Subscription Page */}
      <div className="lg:col-span-3">
        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 shadow-glow-yellow " style={{ backgroundColor: "transparent" }}>
          <CardContent className="p-0">
            <a
              href="https://discord.gg/eagleinvestors"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform duration-300 hover:scale-105"
            >
              <img
                src="/JoinDiscord.png"
                alt="Join the Eagle Investors Discord Community"
                className="w-full h-auto object-cover rounded-t-lg"
              />
            </a>
            <div className="p-8">
              <h3 className="text-3xl font-bold text-yellow-400 mb-6 text-center flex items-center justify-center gap-3">
                🎉 FREE Discord Trial Access!
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Diamond Discord Features */}
                <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-brand-cyan/30 shadow-glow-cyan/20 transition-all duration-300 hover:scale-105 hover:shadow-glow-cyan/40">
                  <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                    <span className="text-2xl">💎</span>
                    <span className="text-brand-cyan">
                      Diamond Discord Features - FREE Trial
                    </span>
                  </h4>
                  <ul className="text-gray-300 space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-cyan rounded-full flex-shrink-0"></div>
                      <span>AI Advisor access in Discord</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-cyan rounded-full flex-shrink-0"></div>
                      <span>Diamond Chat Room access</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-cyan rounded-full flex-shrink-0"></div>
                      <span>Live trading stream notifications</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-brand-cyan rounded-full flex-shrink-0"></div>
                      <span>Daily watchlists and alerts</span>
                    </li>
                  </ul>
                </div>

                {/* Infinity Discord Features */}
                <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-yellow-500/30 shadow-glow-yellow/20 transition-all duration-300 hover:scale-105 hover:shadow-glow-yellow/40">
                  <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3">
                    <span className="text-2xl">♾️</span>
                    <span className="text-yellow-400">
                      Infinity Discord Features - FREE Trial
                    </span>
                  </h4>
                  <ul className="text-gray-300 space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span className="font-bold text-yellow-400">
                        ALL DIAMOND FEATURES +
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span>Advanced Market Screening (20-25 Securities)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span>Unusual Option Activity Alerts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span>Priority Challenge Accounts</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                      <span>Direct Infinity Advisory Tickets</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center">
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  Join our Discord community of{" "}
                  <span className="text-white font-bold">150,000+</span> traders
                  and get{" "}
                  <span className="text-yellow-400 font-bold">
                    FREE trial access
                  </span>{" "}
                  to premium features!
                </p>

                <a
                  href="https://discord.gg/eagleinvestors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-xl px-12 py-4 shadow-glow-yellow transition-all duration-300 hover:scale-110 hover:shadow-glow-yellow/80 rounded-xl">
                    Join Discord Community - FREE Trials!
                  </Button>
                </a>

                <p className="text-gray-500 text-sm mt-4 italic">
                  No credit card required • Instant access • 150,000+ active
                  traders
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
