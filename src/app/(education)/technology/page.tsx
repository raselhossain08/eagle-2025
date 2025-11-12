"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Code,
  GraduationCap,
  MessageSquare,
  TrendingUp,
  Zap,
  Brain,
  BarChart3,
  Target,
  Clock,
  Activity,
  Users,
  Bell,
  Video,
  BookOpen,
  Award,
  Star,
  Infinity,
  Play,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import {
  DiamondUpgradeButton,
  InfinityUpgradeButton,
} from "@/components/subscription/upgrade-button";
import {
  getPricingInfo,
  formatPriceWithPeriod,
} from "@/lib/config/pricing.config";

export default function TechnologyPage() {
  const router = useRouter();
  const [infinityPrice, setInfinityPrice] = useState<string>("$127");

  useEffect(() => {
    const loadPricing = async () => {
      try {
        const pricing = await getPricingInfo("infinity", "monthly");
        setInfinityPrice(formatPriceWithPeriod(pricing.price));
      } catch (error) {
        console.error("Failed to load pricing:", error);
      }
    };
    loadPricing();
  }, []);

  return (
    <div className="min-h-screen bg-eagle-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Zap className="w-12 h-12 text-eagle-primary mr-4" />
            <h1 className="text-5xl font-bold text-eagle-foreground">
              Eagle Technology Suite
            </h1>
          </div>
          <p className="text-xl text-eagle-muted-foreground max-w-3xl mx-auto mb-8">
            Cutting-edge trading technology, AI-powered insights, and
            comprehensive education tools designed to give you the competitive
            edge in today's markets.
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Badge variant="secondary" className="text-sm ">
              Proprietary Technology
            </Badge>
            <Badge variant="outline" className="text-sm text-[#f7f9fb]">
              AI-Powered
            </Badge>
            <Badge variant="outline" className="text-sm text-[#f7f9fb]">
              Real-Time Analytics
            </Badge>
          </div>
        </div>
      </section>

      {/* Technology Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Custom Trading Scripts */}
            <Card className="bg-eagle-card border-eagle-border flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Code className="w-8 h-8 text-eagle-primary" />
                  <div>
                    <CardTitle className="text-2xl text-eagle-card-foreground">
                      Custom Trading Scripts
                    </CardTitle>
                    <CardDescription className="text-eagle-muted-foreground">
                      Professional-grade algorithmic trading signals with 3+
                      powerful scripts
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="grid grid-cols-1 gap-4">
                  <img
                    src="/images/trading-scripts-overview.png"
                    alt="Eagle Trading Scripts Overview - 3 Powerful Algorithms"
                    className="rounded-lg border border-eagle-border shadow-md"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <img
                      src="/images/meta-trading-signals.png"
                      alt="Meta Trading Signals with Profit Targets"
                      className="rounded-lg border border-eagle-border"
                    />
                    <img
                      src="/images/tesla-trading-setup.png"
                      alt="Tesla Trading Setup with Risk Management"
                      className="rounded-lg border border-eagle-border"
                    />
                  </div>
                  <img
                    src="/images/multi-asset-trading.png"
                    alt="Multi-Asset Trading Analysis"
                    className="rounded-lg border border-eagle-border"
                  />
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-2xl font-bold text-eagle-primary">
                        $47/month
                      </span>
                      <Badge
                        variant="outline"
                        className="border-amber-500 text-amber-500 bg-amber-500/10 text-xs mt-1 w-fit font-semibold"
                      >
                        Included in Infinity
                      </Badge>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-500/20 text-green-400 font-semibold"
                    >
                      3+ Scripts Included
                    </Badge>
                  </div>

                  <div className="bg-gradient-to-br from-eagle-primary/10 to-green-500/10 p-4 rounded-lg border border-eagle-primary/20">
                    <h4 className="font-semibold text-eagle-card-foreground mb-2">
                      🚀 Included Scripts:
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-sm text-eagle-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Target className="w-3 h-3 text-green-400" />
                        <span>
                          <strong>Eagle Algo Contrarian</strong> - Advanced
                          momentum indicators
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3 text-blue-400" />
                        <span>
                          <strong>Swing King</strong> - Optimal swing trading
                          setups
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-3 h-3 text-purple-400" />
                        <span>
                          <strong>Momentum Scalper</strong> - High-frequency
                          scalping signals
                        </span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 text-eagle-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-eagle-primary" />
                      <span>
                        Real-time buy/sell signals across all timeframes
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-eagle-primary" />
                      <span>Automated profit targets & stop loss levels</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-eagle-primary" />
                      <span>
                        Multi-asset compatibility (Stocks, Crypto, Forex)
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-eagle-primary" />
                      <span>Advanced risk management algorithms</span>
                    </li>
                  </ul>

                  <div className="pt-4 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Button
                        onClick={() => {
                          router.push("/scripts");
                        }}
                        variant="outline"
                        className="w-full border-2 border-eagle-primary text-eagle-primary hover:bg-eagle-primary/10 bg-eagle-primary/5 font-semibold py-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        View All Scripts
                      </Button>
                      <Button
                        onClick={() => {
                          try {
                            // Create cart item from the package
                            const cartItem = {
                              id: "quantitative-trading-script",
                              name: "Quantitative Trading Script",
                              price: 47,
                              originalPrice: 47,
                              description:
                                "Powerful algorithmic trading script with advanced features",
                              type: "script-purchase",
                            };

                            // Save to localStorage
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([cartItem])
                            );

                            // Navigate to checkout using Next.js router
                            router.push("/checkout");
                          } catch (error) {
                            console.error("Error in script purchase:", error);
                          }
                        }}
                        className="w-full bg-gradient-to-r from-eagle-primary to-eagle-primary/80 hover:from-eagle-primary/90 hover:to-eagle-primary/70 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        Add to Basket - $47/month
                      </Button>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-eagle-muted-foreground mb-2">
                        Or get better value with:
                      </p>
                      <InfinityUpgradeButton
                        currentPackage="basic"
                        size="lg"
                        variant="outline"
                        customText={`Purchase Infinity - ${infinityPrice} - Includes Scripts + More`}
                        className="w-full border-2 border-amber-500 text-amber-500 hover:bg-amber-500/20 bg-amber-500/5 font-semibold py-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Advisor */}
            <Card className="bg-eagle-card border-eagle-border flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Bot className="w-8 h-8 text-eagle-primary" />
                  <div>
                    <CardTitle className="text-2xl text-eagle-card-foreground">
                      Eagle AI Advisor
                    </CardTitle>
                    <CardDescription className="text-eagle-muted-foreground">
                      Enhanced AI-powered investment intelligence and real-time
                      market analysis
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-4">
                  <img
                    src="/images/enhanced-ai-advisor-chat.png"
                    alt="Enhanced AI Advisor Chat Interface"
                    className="rounded-lg border border-eagle-border w-full shadow-lg"
                  />

                  <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-4 rounded-lg border border-amber-500/20">
                    <h4 className="font-semibold text-eagle-card-foreground mb-2 flex items-center">
                      <Brain className="w-4 h-4 text-amber-500 mr-2" />
                      🤖 AI-Powered Features:
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-sm text-eagle-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="w-3 h-3 text-amber-500" />
                        <span>Interactive investment strategy discussions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3 text-amber-500" />
                        <span>Real-time market trend analysis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="w-3 h-3 text-amber-500" />
                        <span>Portfolio optimization recommendations</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <img
                      src="/images/eagle-ai-app-interface.png"
                      alt="Eagle AI Advisor App Interface"
                      className="rounded-lg border border-eagle-border w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/20 text-blue-400 font-semibold"
                    >
                      Diamond Chat Exclusive
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-amber-500 text-amber-500 font-semibold"
                    >
                      Diamond & Infinity
                    </Badge>
                  </div>

                  <ul className="space-y-2 text-eagle-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-eagle-primary" />
                      <span>24/7 AI investment advisor availability</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <MessageSquare className="w-4 h-4 text-eagle-primary" />
                      <span>Natural language market queries</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-eagle-primary" />
                      <span>Personalized stock analysis & insights</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-eagle-primary" />
                      <span>Instant portfolio optimization suggestions</span>
                    </li>
                  </ul>

                  <div className="pt-4 space-y-3">
                    <p className="text-sm text-eagle-muted-foreground text-center mb-3">
                      🚀 Available exclusively with premium subscriptions:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <DiamondUpgradeButton
                        currentPackage="basic"
                        size="lg"
                        variant="outline"
                        customText="Purchase Diamond"
                        className="w-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500/20 bg-blue-500/5 font-semibold py-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      />
                      <InfinityUpgradeButton
                        currentPackage="basic"
                        size="lg"
                        variant="outline"
                        customText={`Purchase Infinity - ${infinityPrice} - Best Value`}
                        className="w-full border-2 border-amber-500 text-amber-500 hover:bg-amber-500/20 bg-amber-500/5 font-semibold py-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comprehensive Education */}
            <Card className="bg-eagle-card border-eagle-border flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <GraduationCap className="w-8 h-8 text-eagle-primary" />
                  <div>
                    <CardTitle className="text-2xl text-eagle-card-foreground">
                      Comprehensive Education
                    </CardTitle>
                    <CardDescription className="text-eagle-muted-foreground">
                      Complete trading education with 13+ specialized modules &
                      video courses
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-4">
                  <img
                    src="/images/eagle-academy-curriculum.png"
                    alt="Eagle Academy Curriculum Overview"
                    className="rounded-lg border border-eagle-border w-full shadow-lg"
                  />

                  <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 p-4 rounded-lg border border-amber-500/20">
                    <h4 className="font-semibold text-eagle-card-foreground mb-2 flex items-center">
                      <Award className="w-4 h-4 text-amber-500 mr-2" />
                      🎓 Infinity Exclusive Modules:
                    </h4>
                    <div className="grid grid-cols-1 gap-2 text-sm text-eagle-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-3 h-3 text-amber-500" />
                        <span>
                          Advanced Options Strategies & Volatility Concepts
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-3 h-3 text-amber-500" />
                        <span>Technical Analysis & Elliott Waves</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Brain className="w-3 h-3 text-amber-500" />
                        <span>Trading Psychology & Risk Management</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <img
                      src="/images/eagle-academy-infinity-modules.png"
                      alt="Eagle Academy Infinity Exclusive Modules"
                      className="rounded-lg border border-eagle-border w-full"
                    />

                    <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-3 rounded-lg border border-green-500/20">
                      <h5 className="font-semibold text-eagle-card-foreground mb-2 flex items-center text-sm">
                        <Play className="w-3 h-3 text-green-500 mr-2" />
                        📹 Day Trading & Short-Term Strategies:
                      </h5>
                      <img
                        src="/images/day-trading-strategies-modules.png"
                        alt="Day Trading and Short-Term Strategy Video Modules"
                        className="rounded-lg border border-eagle-border w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-amber-500/20 text-amber-500 font-semibold"
                    >
                      13+ Course Modules
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-amber-500 text-amber-500 font-semibold"
                    >
                      Infinity Exclusive
                    </Badge>
                  </div>

                  <ul className="space-y-2 text-eagle-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-eagle-primary" />
                      <span>Market Structure & Environment Analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-eagle-primary" />
                      <span>Fundamental & Macro Economic Analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-eagle-primary" />
                      <span>Day Trading & Short-Term Video Strategies</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-eagle-primary" />
                      <span>Futures Trading & Long-Term Income Planning</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-eagle-primary" />
                      <span>Complete Account Management Essentials</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-eagle-primary" />
                      <span>Earnings & Credit Trading Strategy Videos</span>
                    </li>
                  </ul>

                  <div className="pt-4 space-y-3">
                    <p className="text-sm text-eagle-muted-foreground text-center mb-3">
                      🏆 Access the complete curriculum:
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      <Link href="/education">
                        <Button className="w-full bg-gradient-to-r from-eagle-primary to-eagle-primary/80 hover:from-eagle-primary/90 hover:to-eagle-primary/70 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                          Explore Academy
                        </Button>
                      </Link>
                      <InfinityUpgradeButton
                        currentPackage="basic"
                        size="lg"
                        variant="outline"
                        customText={`Get Infinity Access - ${infinityPrice}`}
                        className="w-full border-2 border-amber-500 text-amber-500 hover:bg-amber-500/20 bg-amber-500/5 font-semibold py-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Online Platform */}
            <Card className="bg-eagle-card border-eagle-border flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-8 h-8 text-eagle-primary" />
                  <div>
                    <CardTitle className="text-2xl text-eagle-card-foreground">
                      Online Platform
                    </CardTitle>
                    <CardDescription className="text-eagle-muted-foreground">
                      Comprehensive Discord-based trading community with AI
                      tools & resources
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 flex-1 flex flex-col">
                <div className="space-y-4">
                  <img
                    src="/images/discord-welcome-main.png"
                    alt="Eagle Investors Discord Welcome Interface"
                    className="rounded-lg border border-eagle-border w-full shadow-lg"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <img
                      src="/images/discord-infinity-channels.png"
                      alt="Discord Infinity Premium Channels"
                      className="rounded-lg border border-eagle-border"
                    />
                    <img
                      src="/images/discord-ai-tools-channels.png"
                      alt="Discord AI Tools and Resources Channels"
                      className="rounded-lg border border-eagle-border"
                    />
                  </div>
                  <img
                    src="/images/discord-trading-channels.png"
                    alt="Discord Trading and Discussion Channels"
                    className="rounded-lg border border-eagle-border"
                  />
                </div>

                <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-4 rounded-lg border border-indigo-500/20">
                  <h4 className="font-semibold text-eagle-card-foreground mb-2 flex items-center">
                    <Users className="w-4 h-4 text-indigo-500 mr-2" />
                    💬 Platform Features:
                  </h4>
                  <div className="grid grid-cols-1 gap-2 text-sm text-eagle-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-3 h-3 text-indigo-500" />
                      <span>AI-powered trading tools & analysis channels</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-3 h-3 text-indigo-500" />
                      <span>Real-time market alerts & stock breakouts</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Video className="w-3 h-3 text-indigo-500" />
                      <span>Live trading streams & educational content</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="w-3 h-3 text-indigo-500" />
                      <span>
                        Dedicated channels for scalping & swing trading
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 flex-1 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="bg-green-500/20 text-green-400 font-semibold"
                    >
                      24/7 Active Community
                    </Badge>
                    <Badge
                      variant="outline"
                      className="font-semibold text-eagle-foreground"
                    >
                      All Membership Tiers
                    </Badge>
                  </div>

                  <ul className="space-y-2 text-eagle-muted-foreground">
                    <li className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-eagle-primary" />
                      <span>AI tools: Bullseye, Darkpool, Analyst Grades</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-eagle-primary" />
                      <span>Stock breakouts & insider order tracking</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-eagle-primary" />
                      <span>Scalp ideas & trading flow analysis</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-eagle-primary" />
                      <span>Beginner guides & trading terminology</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <GraduationCap className="w-4 h-4 text-eagle-primary" />
                      <span>Exclusive Infinity education & video archive</span>
                    </li>
                  </ul>

                  <div className="pt-4">
                    <Link href="/pricing">
                      <Button className="w-full bg-gradient-to-r from-eagle-primary to-eagle-primary/80 hover:from-eagle-primary/90 hover:to-eagle-primary/70 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                        Join Platform
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-eagle-secondary/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-eagle-foreground mb-4">
            Ready to Experience Eagle Technology?
          </h2>
          <p className="text-xl text-eagle-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of traders who trust Eagle's cutting-edge technology
            to enhance their trading performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button
                size="lg"
                className="bg-gradient-to-r from-eagle-primary to-eagle-primary/80 hover:from-eagle-primary/90 hover:to-eagle-primary/70 text-white font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.05]"
              >
                View All Plans
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 bg-transparent border-2 hover:bg-eagle-secondary/50 font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.05] text-eagle-foreground"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
