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
import { mockUser, adminAnnouncements } from "@/lib/data/infinity.data";
import { cn } from "@/lib/utils";

export default function HubPage() {
  const user = mockUser;

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

  const stats = [
    {
      label: "Platform Users",
      value: "155K+",
      icon: Users,
      color: "text-brand-cyan",
    },
    {
      label: "Market Monitoring",
      value: "24/7",
      icon: BarChart3,
      color: "text-brand-green",
    },
    {
      label: "States Operating",
      value: "50",
      icon: TrendingUp,
      color: "text-yellow-400",
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
                Welcome Back!
              </h1>
              <p className="text-brand-cyan font-semibold">
                Eagle Investors Hub
              </p>
            </div>
          </div>
          <p className="text-gray-300 mb-6 max-w-2xl">
            Access your personalized investment dashboard with real-time market
            insights, trading tools and resources*, and exclusive advisory
            services designed to help you navigate every market cycle.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-brand-bg-dark/50 rounded-xl p-4 border border-brand-border/50"
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg bg-brand-bg-light flex items-center justify-center",
                    stat.color
                  )}
                >
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/hub/infinity/ai-advisor">
              <Button className="bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-semibold px-6 py-3 shadow-glow-cyan transition-all duration-200 hover:scale-105 flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Access AI Advisor
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/hub/infinity/scripts">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-6 py-3 shadow-glow-yellow transition-all duration-200 hover:scale-105 flex items-center gap-2">
                <Code className="w-5 h-5" />
                View Trading Scripts
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/hub/infinity/education">
              <Button className="bg-gradient-to-r from-brand-green to-green-600 hover:from-brand-green/90 hover:to-green-600/90 text-white font-semibold px-6 py-3 shadow-glow-blue transition-all duration-200 hover:scale-105 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Access Education
                <ArrowRight className="w-4 h-4" />
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
                <Link href="/hub/infinity/community">
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
          <Card className="bg-gradient-to-br from-brand-bg-light to-brand-bg-dark border-brand-border shadow-glow-cyan transition-all duration-300 hover:shadow-glow-cyan/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white font-bold text-lg">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                  <Star className="w-4 h-4 text-black" />
                </div>
                <span className="text-white">Your Plan: </span>
                <span className="text-yellow-400 font-extrabold">
                  {user.subscription}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">
                You have full access to all premium features including Enhanced
                AI Advisor, Professional Trading Scripts and Full Infinity
                Education Library.
              </p>
              <Link href="/hub/infinity/ai-advisor">
                <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold shadow-glow-yellow transition-all duration-200 hover:scale-105">
                  Explore Infinity!
                </Button>
              </Link>
            </CardContent>
          </Card>

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
              <Link href="/hub/infinity/ai-advisor" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-white hover:bg-brand-bg-dark transition-all duration-200 hover:scale-105"
                >
                  🤖 Enhanced AI Advisor
                </Button>
              </Link>
              <Link href="/hub/infinity/scripts" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left text-white hover:bg-brand-bg-dark transition-all duration-200 hover:scale-105"
                >
                  ⚡ Professional Trading Scripts
                </Button>
              </Link>
              <Link href="/hub/infinity/education" className="block">
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
    </div>
  );
}
