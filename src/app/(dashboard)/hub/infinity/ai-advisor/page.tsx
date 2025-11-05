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
  FileText,
} from "lucide-react";
import { mockUser } from "@/lib/data/infinity.data";
import Link from "next/link";
import { useState } from "react";
import { ComplianceTooltip } from "@/components/shared/compliance-tooltip";
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
                <ComplianceTooltip>
                  <h3 className="font-semibold text-white mb-2">
                    Real-time Analysis
                  </h3>
                </ComplianceTooltip>
                <p className="text-gray-400 text-sm">
                  Advanced algorithms analyze market conditions 24/7*
                </p>
              </div>
              <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-yellow-500/20">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <ComplianceTooltip content="Insights generated based on selected inputs. Not individualized investment advice. Past performance is not indicative of future results.">
                  <h3 className="font-semibold text-white mb-2">
                    Personalized Insights
                  </h3>
                </ComplianceTooltip>
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

        {/* Access Denied */}
        <div className="flex flex-col items-center justify-center text-center py-16 rounded-2xl bg-brand-bg-light border-2 border-dashed border-yellow-500/50">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6 shadow-glow-yellow">
            <Lock className="w-12 h-12 text-black" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">
            INFINITY FEATURE
          </h2>
          <p className="text-gray-400 mb-8 max-w-md">
            The Enhanced AI Advisor is an exclusive feature for Infinity
            members. Upgrade to access Investment research capabilities*.
          </p>
          <InfinityUpgradeButton
            currentPackage="infinity"
            size="lg"
            variant="primary"
            customText="Upgrade to Infinity"
          />
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

      <div className="relative">
        {/* Chat Container with Premium Styling */}
        <div className="h-[70vh] flex flex-col rounded-3xl border-2 border-yellow-500/30 bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light shadow-2xl shadow-yellow-500/20 backdrop-blur-sm overflow-hidden">
          {/* Chat Header */}
          <div className="relative px-8 py-6 border-b border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-orange-500/5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 p-0.5 shadow-lg shadow-yellow-500/30">
                  <div className="w-full h-full rounded-2xl bg-brand-bg-dark flex items-center justify-center">
                    <img
                      src="/eagle-investors-logo.png"
                      alt="Eagle AI Advisor"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-brand-bg-dark shadow-lg animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Enhanced AI Advisor
                </h3>
                <p className="text-sm text-gray-400">
                  Investment Intelligence • Online
                </p>
              </div>
            </div>
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-4 left-1/4 w-2 h-2 bg-yellow-400/20 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-1/3 w-1 h-1 bg-orange-400/30 rounded-full animate-ping"></div>
              <div className="absolute bottom-6 left-1/2 w-1.5 h-1.5 bg-yellow-300/25 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-yellow-500/20 hover:scrollbar-thumb-yellow-500/40">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 ${
                  message.sender === "user" ? "justify-end" : ""
                } animate-in slide-in-from-bottom-2 duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {message.sender === "ai" && (
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 p-0.5 shadow-lg shadow-yellow-500/30">
                      <div className="w-full h-full rounded-xl bg-brand-bg-dark flex items-center justify-center">
                        <img
                          src="/eagle-investors-logo.png"
                          alt="Eagle AI"
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full border border-brand-bg-dark"></div>
                  </div>
                )}
                <div
                  className={`group relative max-w-[75%] ${
                    message.sender === "user" ? "order-first" : ""
                  }`}
                >
                  <div
                    className={`relative p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] ${
                      message.sender === "ai"
                        ? "bg-gradient-to-br from-brand-bg-light to-brand-bg-dark border border-yellow-500/20 shadow-lg shadow-yellow-500/10 text-white"
                        : "bg-gradient-to-br from-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/30"
                    }`}
                  >
                    {/* Message content */}
                    <p className="text-sm leading-relaxed font-medium">
                      {message.text}
                    </p>

                    {/* AI message enhancements */}
                    {message.sender === "ai" && (
                      <>
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-orange-500/5 pointer-events-none"></div>
                        {/* Typing indicator dots for last message */}
                        {index === messages.length - 1 && (
                          <div className="flex items-center gap-1 mt-3 opacity-60">
                            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-1 h-1 bg-yellow-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        )}
                      </>
                    )}

                    {/* User message enhancements */}
                    {message.sender === "user" && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                    )}
                  </div>

                  {/* Message timestamp */}
                  <div
                    className={`text-xs text-gray-500 mt-2 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    Just now
                  </div>
                </div>

                {message.sender === "user" && (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="relative p-6 border-t border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 to-orange-500/5">
            <div className="relative">
              {/* Input container with premium styling */}
              <div className="relative rounded-2xl bg-gradient-to-r from-brand-bg-dark to-brand-bg-light border border-yellow-500/30 shadow-lg shadow-yellow-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5"></div>
                <Input
                  placeholder="Ask about market trends, stock analysis, portfolio optimization..."
                  className="relative z-10 bg-transparent border-0 px-6 py-4 text-white placeholder:text-gray-400 text-base font-medium focus:ring-0 focus:outline-none resize-none min-h-[60px]"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !e.shiftKey && handleSend()
                  }
                />

                {/* Send button with premium gold styling */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="group relative w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-yellow-500/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                  >
                    {/* Button background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>

                    {/* Send icon */}
                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                      <Send className="w-5 h-5 text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>

                    {/* Ripple effect on click */}
                    <div className="absolute inset-0 rounded-xl bg-white/20 scale-0 group-active:scale-100 transition-transform duration-150"></div>
                  </button>
                </div>
              </div>

              {/* Input helper text */}
              <div className="flex items-center justify-between mt-3 px-2">
                <p className="text-xs text-gray-500">
                  Press Enter to send, Shift + Enter for new line
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>AI Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient glow effects around the chat */}
        <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/10 via-transparent to-orange-500/10 rounded-3xl blur-xl pointer-events-none"></div>
        <div className="absolute -inset-8 bg-gradient-to-r from-yellow-500/5 via-transparent to-orange-500/5 rounded-3xl blur-2xl pointer-events-none"></div>
      </div>

      <div className="pt-6">
        <Link href="/hub/infinity/ai-advisor/disclosure">
          <div className="bg-brand-bg-light border border-brand-border rounded-xl p-6 cursor-pointer hover:bg-brand-bg-dark/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-glow-yellow">
                <FileText className="w-6 h-6 text-black" />
              </div>
              <div className="flex-1">
                <h4 className="text-white font-bold text-xl mb-1">
                  AI Advisor Disclaimer
                </h4>
                <p className="text-yellow-400 font-semibold text-sm mb-3">
                  Important Legal Information
                </p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Please read this disclaimer carefully before using the Eagle
                  Investors AI Advisor Bot. This information is essential for
                  understanding the limitations and proper use of our AI-powered
                  investment tool.
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
