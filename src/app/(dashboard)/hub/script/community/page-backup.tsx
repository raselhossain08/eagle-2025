import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Megaphone,
  AlertCircle,
  Info,
  Clock,
  Users,
  TrendingUp,
} from "lucide-react";
import { adminAnnouncements } from "@/lib/data/script.data";
import { cn } from "@/lib/utils";

export default function CommunityPage() {
  const getPriorityIcon = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case "medium":
        return <Info className="w-5 h-5 text-yellow-400" />;
      case "low":
        return <Clock className="w-5 h-5 text-blue-400" />;
    }
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "border-l-red-500 shadow-glow-red";
      case "medium":
        return "border-l-yellow-500 shadow-glow-yellow";
      case "low":
        return "border-l-blue-500 shadow-glow-blue";
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-brand-border shadow-glow-cyan">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-cyan/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center shadow-glow-cyan">
              <Megaphone className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Community Announcements
              </h1>
              <p className="text-brand-cyan font-semibold text-lg">
                Eagle Investors Official Updates
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Stay informed with the latest updates, market insights, and
            important announcements from the Eagle Investors team. Our
            registered investment advisors provide timely information to help
            guide your investment decisions.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-brand-bg-light border border-brand-border rounded-xl p-6 shadow-glow-blue">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Members</p>
              <p className="text-2xl font-bold text-white">2,847</p>
            </div>
          </div>
        </div>
        <div className="bg-brand-bg-light border border-brand-border rounded-xl p-6 shadow-glow-green">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Script Downloads</p>
              <p className="text-2xl font-bold text-white">18,321</p>
            </div>
          </div>
        </div>
        <div className="bg-brand-bg-light border border-brand-border rounded-xl p-6 shadow-glow-yellow">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Announcements</p>
              <p className="text-2xl font-bold text-white">
                {adminAnnouncements.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {adminAnnouncements.map((announcement, index) => (
          <Card
            key={announcement.id}
            className={cn(
              "bg-brand-bg-light border-brand-border transition-all duration-300 hover:scale-[1.02]",
              getPriorityColor(announcement.priority)
            )}
          >
            <CardHeader>
              <div
                className={cn(
                  "border-l-4 pl-4 -ml-6 -mt-6 pt-6 pb-2",
                  getPriorityColor(announcement.priority).split(" ")[0]
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {getPriorityIcon(announcement.priority)}
                    <CardTitle className="text-xl text-white">
                      {announcement.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border",
                        announcement.priority === "high" &&
                          "bg-red-500/20 text-red-300 border-red-500/30",
                        announcement.priority === "medium" &&
                          "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
                        announcement.priority === "low" &&
                          "bg-blue-500/20 text-blue-300 border-blue-500/30"
                      )}
                    >
                      {announcement.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-sm text-gray-400">
                      {announcement.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-300 leading-relaxed mb-4">
                {announcement.content}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-sm text-gray-400">
                    {announcement.author}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
