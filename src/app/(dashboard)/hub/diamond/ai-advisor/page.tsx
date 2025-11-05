"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  Lock,
  Bot,
  Sparkles,
  TrendingUp,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { mockUser } from "@/lib/data/diamond.data";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InfinityUpgradeButton } from "@/components/subscription/upgrade-button";

type Message = {
  sender: "user" | "ai";
  text: string;
};

export default function AiAdvisorPage() {
  const user = mockUser;
  const hasAccess = user.subscription === "Infinity";
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hello! I am your Enhanced AI Advisor. How can I assist with your investment strategy today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "user", text: input }]);
      // In a real app, you'd call your AI API here.
      // For now, we'll simulate a response.
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "Analyzing your query using advanced market algorithms... Based on current market trends and institutional data, I suggest considering diversified positions in technology and healthcare sectors. Would you like me to provide specific stock recommendations?",
          },
        ]);
      }, 1000);
      setInput("");
    }
  };

  if (!hasAccess) {
    return (
      <div className="space-y-8">
        {/* Hero Section with AI Image */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
          <div className="absolute inset-0">
            <img
              src="/ai-advisor-hero-new.png"
              alt="Eagle AI Advisor"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20" />
          </div>
          <div className="relative p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow">
                <Bot className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white">
                  Enhanced AI Advisor
                </h1>
                <p className="text-yellow-400 font-semibold text-lg">
                  Investment Research Assistant
                </p>
              </div>
            </div>
            <p className="text-gray-300 max-w-3xl mb-8">
              Access our advanced AI-powered investment research assistant with
              real-time market analysis, personalized portfolio recommendations,
              and professional-level insights designed for experienced
              investors.
            </p>

            {/* Features Preview with Compliance Tooltips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-yellow-500/20">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Real-time Analysis
                </h3>
                <p className="text-gray-400 text-sm">
                  Advanced algorithms analyze market conditions 24/7*
                </p>
              </div>
              <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-yellow-500/20">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Personalized Insights
                </h3>
                <p className="text-gray-400 text-sm">
                  Insights generated based on selected inputs
                </p>
              </div>
              <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-yellow-500/20">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Risk Assessment
                </h3>
                <p className="text-gray-400 text-sm">
                  Comprehensive risk analysis and management tools
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEC Compliance Disclaimer */}
        <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-black text-sm font-bold">*</span>
            </div>
            <div>
              <h4 className="text-yellow-400 font-semibold mb-2">
                Important Disclaimer
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                *Backtested results are hypothetical, do not reflect actual
                trading, and are not guarantees of future results. Individual
                outcomes will vary. Eagle Investors makes no guarantee of
                profitability. Eagle Investors is an investment adviser
                registered in applicable jurisdictions. Registration does not
                imply a certain level of skill or training.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced AI Advisor Preview with Lock Overlay */}
        <div className="relative">
          {/* Chat Interface Preview */}
          <div className="h-[70vh] flex flex-col rounded-2xl border border-yellow-500/50 bg-brand-bg-light shadow-glow-yellow overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-4 p-6 border-b border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
              <div className="relative">
                <Avatar className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 shadow-glow-yellow">
                  <AvatarFallback>
                    <Bot className="w-7 h-7 text-black" />
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-green rounded-full border-2 border-brand-bg-light"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white">
                  Enhanced AI Advisor
                </h3>
                <p className="text-yellow-400 text-sm font-semibold">
                  Investment Intelligence • Online
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">Status</div>
                <div className="text-sm text-brand-green font-semibold">
                  AI Online
                </div>
              </div>
            </div>

            {/* Chat Messages Preview */}
            <div className="flex-1 p-6 space-y-6 overflow-hidden relative">
              {/* AI Welcome Message */}
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 shadow-glow-yellow flex-shrink-0">
                  <AvatarFallback>
                    <Bot className="w-6 h-6 text-black" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-md p-4 rounded-2xl bg-brand-bg-dark border border-yellow-500/20 shadow-lg">
                  <p className="text-white text-sm leading-relaxed">
                    Hello! I am your Enhanced AI Advisor. How can I assist with
                    your investment strategy today?
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span>Just now</span>
                  </div>
                </div>
              </div>

              {/* Sample AI Response Preview */}
              <div className="flex items-start gap-4 opacity-60">
                <Avatar className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 shadow-glow-yellow flex-shrink-0">
                  <AvatarFallback>
                    <Bot className="w-6 h-6 text-black" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-lg p-4 rounded-2xl bg-brand-bg-dark border border-yellow-500/20">
                  <p className="text-white text-sm leading-relaxed">
                    Based on current market conditions and your risk profile, I
                    recommend considering a diversified approach with 60%
                    equities, 30% bonds, and 10% alternative investments. The
                    technology sector shows strong momentum with...
                  </p>
                  <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-600">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>Market Analysis</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <BarChart3 className="w-3 h-3" />
                      <span>Portfolio Optimization</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Message Preview */}
              <div className="flex items-start gap-4 justify-end opacity-40">
                <div className="max-w-md p-4 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-cyan text-white shadow-glow-cyan">
                  <p className="text-sm leading-relaxed">
                    What are your thoughts on the current tech sector outlook
                    for Q4?
                  </p>
                </div>
              </div>
            </div>

            {/* Input Area Preview */}
            <div className="p-6 border-t border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-orange-500/5">
              <div className="relative">
                <Input
                  placeholder="Ask about market trends, stock analysis, portfolio optimization..."
                  className="bg-brand-bg-dark border-yellow-500/30 pr-12 py-4 text-white placeholder:text-gray-400 text-sm"
                  disabled
                />
                <Button
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 shadow-glow-yellow h-8 w-8"
                  disabled
                >
                  <Send className="w-4 h-4 text-black" />
                </Button>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span>Press Enter to send, Shift + Enter for new line</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                  <span>AI Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lock Overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-8">
              {/* Lock Icon */}
              <div className="relative mb-8">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto shadow-glow-yellow">
                  <Lock className="w-12 h-12 text-black" />
                </div>
              </div>

              {/* Upgrade Message */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-3">
                    INFINITY FEATURE
                  </h3>
                  <div className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-glow-yellow mb-4">
                    Enhanced AI Advisor
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed text-lg">
                  Experience the future of investment intelligence with our
                  Enhanced AI Advisor. Get real-time market analysis,
                  personalized portfolio recommendations, and professional-level
                  insights.
                </p>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 gap-3 text-left">
                  <div className="flex items-center gap-3 bg-brand-bg-dark/50 rounded-lg p-3 border border-yellow-500/20">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-white text-sm font-semibold">
                      Real-time market analysis & insights
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-brand-bg-dark/50 rounded-lg p-3 border border-yellow-500/20">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-white text-sm font-semibold">
                      Personalized portfolio optimization
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-brand-bg-dark/50 rounded-lg p-3 border border-yellow-500/20">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-black" />
                    </div>
                    <span className="text-white text-sm font-semibold">
                      24/7 AI-powered investment assistant
                    </span>
                  </div>
                </div>

                {/* Upgrade Button */}
                <div className="pt-4">
                  <InfinityUpgradeButton
                    currentPackage="diamond"
                    size="xl"
                    variant="primary"
                    customText="Upgrade to Infinity Now"
                    className="w-full"
                  />
                </div>

                <p className="text-xs text-gray-500 leading-relaxed">
                  Join thousands of investors already using our Enhanced AI
                  Advisor to make smarter investment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section for Infinity Users */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
        <div className="absolute inset-0">
          <img
            src="/ai-advisor-hero-new.png"
            alt="Eagle AI Advisor"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-orange-500/20" />
        </div>
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow">
              <Bot className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Enhanced AI Advisor
              </h1>
              <p className="text-yellow-400 font-semibold text-lg">
                Your Personal Investment Intelligence
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Welcome to your enhanced AI-powered investment research assistant
            with real-time market analysis and personalized recommendations.
          </p>
        </div>
      </div>

      <div className="h-[60vh] flex flex-col rounded-2xl border border-brand-border bg-brand-bg-light shadow-glow-blue">
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                message.sender === "user" ? "justify-end" : ""
              }`}
            >
              {message.sender === "ai" && (
                <Avatar className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 shadow-glow-yellow">
                  <AvatarFallback>
                    <Bot className="w-6 h-6 text-black" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-md p-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] ${
                  message.sender === "ai"
                    ? "bg-brand-bg-dark border border-yellow-500/20"
                    : "bg-gradient-to-r from-brand-primary to-brand-cyan text-white shadow-glow-cyan"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t border-brand-border">
          <div className="relative">
            <Input
              placeholder="Ask about market trends, stock analysis, portfolio optimization..."
              className="bg-brand-bg-dark border-brand-border pr-12 py-3 text-white placeholder:text-gray-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button
              size="icon"
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 shadow-glow-cyan transition-all duration-200 hover:scale-105"
              onClick={handleSend}
            >
              <Send className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
