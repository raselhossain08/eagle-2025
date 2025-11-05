"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Lock,
  Code,
  Zap,
  TrendingUp,
  BarChart3,
  CheckCircle,
  Star,
  BookOpen,
  Activity,
} from "lucide-react";
import { mockUser } from "@/lib/data/infinity.data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplianceTooltip } from "@/components/shared/compliance-tooltip";

export default function ScriptsPage() {
  const router = useRouter();
  const user = mockUser;
  const hasAccess = user.subscription === "Infinity";

  const scriptExamples = [
    {
      id: "contrarian-momentum",
      name: "Eagle Algo - Custom Contrarian",
      description:
        "Advanced Trading Algorithm with custom Eagle Advisor curated momentum indicators",
      image: "/contrarian-tsla-ibit-chart.png",
      symbol: "All Assets/Tickers",
      performance: "Real-Time",
      signals: "Custom algorithms",
      category: "Stocks",
      difficulty: "Everyone",
      timeframe: "All timeframes",
      features: [
        "Contrarian signals",
        "Momentum indicators",
        "Volatility analysis",
        "Market structure",
      ],
    },
    {
      id: "swing-king",
      name: "Swing King",
      description:
        "Swing Trading System with Take Profit and Stop Loss Levels identifying optimal trades, best used on 1hour chart",
      image: "/swing-king-meta-chart.png",
      symbol: "Most Tickers",
      performance: "Active Alerts",
      signals: "Advanced algorithms",
      category: "Swing Trading",
      difficulty: "Most Traders",
      timeframe: "30min, 1hr",
      features: [
        "Trend identification",
        "Support/resistance levels",
        "Volume analysis",
        "Risk/Reward Profile",
      ],
    },
    {
      id: "momentum-scalper",
      name: "Momentum Scalper",
      description:
        "High-Frequency scalping algorithm suited for lowertime frames with real time buy/sell signals and a take profit level",
      image: "/script-example-hood.png",
      symbol: "Short Term",
      performance: "Live Signals",
      signals: "Quick Trades",
      category: "Day Trading",
      difficulty: "Scalpers",
      timeframe: "1m, 3m, 5m",
      features: [
        "Real-time signals",
        "Price Target Generation",
        "Quick Moves",
        "Multi-timeframe analysis",
      ],
    },
  ];

  const scriptFeatures = [
    "Real-time buy/sell signals",
    "Advanced technical indicators",
    "Multi-timeframe analysis",
    "Custom momentum algorithms",
    "Risk management protocols",
    "Backtesting capabilities",
    "Performance analytics",
    "24/7 market monitoring",
  ];

  if (!hasAccess) {
    return (
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
          <div className="relative p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow">
                <Code className="w-8 h-8 text-black" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-white">
                  Algorithmic Trading Scripts
                </h1>
                <p className="text-yellow-400 font-semibold text-lg">
                  Educational Trading Tools
                </p>
              </div>
            </div>
            <p className="text-gray-300 max-w-3xl mb-8">
              Access our educational algorithmic trading scripts designed to
              help you learn market analysis and trading concepts. These tools
              are designed for educational purposes and to assist with market
              research.
            </p>

            {/* Performance Stats with Compliance Tooltips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-yellow-500/20">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <ComplianceTooltip>
                  <h3 className="font-semibold text-white mb-2">
                    Real-Time Analysis
                  </h3>
                </ComplianceTooltip>
                <p className="text-gray-400 text-sm">
                  Live market data analysis and signal generation
                </p>
              </div>
              <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-yellow-500/20">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <ComplianceTooltip content="Educational tools for learning market analysis. Past performance is not indicative of future results.">
                  <h3 className="font-semibold text-white mb-2">
                    Educational Focus
                  </h3>
                </ComplianceTooltip>
                <p className="text-gray-400 text-sm">
                  Learn market analysis and trading concepts
                </p>
              </div>
              <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-yellow-500/20">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-black" />
                </div>
                <h3 className="font-semibold text-white mb-2">
                  Multi-Asset Support
                </h3>
                <p className="text-gray-400 text-sm">
                  Stocks, crypto, forex, and commodities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEC Compliance Disclaimer */}
        <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-black text-sm font-bold">!</span>
            </div>
            <div>
              <h4 className="text-yellow-400 font-semibold mb-2">
                Important Educational Disclaimer
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                These scripts are educational tools designed to help you learn
                about market analysis and trading concepts. They do not
                guarantee profits or predict future market movements. All
                trading involves risk of loss. Past performance is not
                indicative of future results.
              </p>
            </div>
          </div>
        </div>

        {/* Script Examples */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Educational Script Examples
          </h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            {scriptExamples.map((script) => (
              <Card
                key={script.id}
                className="bg-brand-bg-light border-brand-border transition-all duration-300 hover:scale-105 hover:shadow-glow-blue"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="bg-brand-green/20 text-brand-green"
                    >
                      {script.performance}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-brand-cyan border-brand-cyan"
                    >
                      {script.symbol}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg text-white">
                    {script.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-sm">
                    {script.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={script.image || "/placeholder.svg"}
                      alt={`${script.name} trading signals`}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-white text-sm font-semibold">
                          Preview Mode
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Analysis Type:</span>
                    <span className="text-brand-cyan font-semibold">
                      {script.signals}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tab-based Pricing Section for Better Mobile UX */}
        <Tabs defaultValue="comparison" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-brand-bg-light border border-brand-border">
            <TabsTrigger
              value="comparison"
              className="text-white data-[state=active]:bg-brand-bg-dark"
            >
              Plan Comparison
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="text-white data-[state=active]:bg-brand-bg-dark"
            >
              Feature Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Standalone Option */}
              <Card className="bg-brand-bg-light border-brand-cyan border-2 shadow-glow-cyan">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">
                    Standalone Access
                  </CardTitle>
                  <div className="text-4xl font-bold text-brand-cyan">
                    $47
                    <span className="text-lg font-normal text-gray-400">
                      /month
                    </span>
                  </div>
                  <Badge className="bg-brand-cyan/20 text-brand-cyan">
                    Educational Tools
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-b border-brand-border pb-3">
                      <h4 className="font-bold text-white mb-2">
                        📊 Included Tools
                      </h4>
                      <div className="space-y-2">
                        {scriptFeatures.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                            <span className="text-gray-300 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-b border-brand-border pb-3">
                      <h4 className="font-bold text-white mb-2">
                        🎓 Mentorship
                      </h4>
                      <p className="text-gray-400 text-sm">Not included</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">
                        ⚡ Analysis Tools
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Basic analytics only
                      </p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      // Create cart item from the package
                      const cartItem = {
                        id: 'quantitative-trading-script',
                        name: 'Quantitative Trading Script',
                        price: '47',
                        description: 'Powerful algorithmic trading script with advanced features',
                        type: "script-purchase"
                      };
                      
                      // Save to localStorage
                      localStorage.setItem('cart', JSON.stringify([cartItem]));
                      
                      // Navigate to checkout using Next.js router
                      router.push('/checkout');
                    }}
                    className="w-full bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-bold text-lg py-3 shadow-glow-cyan transition-all duration-200 hover:scale-105"
                  >
                    Add to Basket - $47/month
                  </Button>
                </CardContent>
              </Card>

              {/* Infinity Option */}
              <Card className="bg-gradient-to-br from-brand-bg-light to-brand-bg-dark border-yellow-500 border-2 shadow-glow-yellow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-black" />
                  </div>
                  <CardTitle className="text-2xl text-white">
                    Infinity Membership
                  </CardTitle>
                  <div className="text-4xl font-bold text-yellow-400">
                    $127
                    <span className="text-lg font-normal text-gray-400">
                      /month
                    </span>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400">
                    Best Value - Includes Everything
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-b border-brand-border pb-3">
                      <h4 className="font-bold text-white mb-2">
                        📊 Included Tools
                      </h4>
                      <div className="space-y-2">
                        {scriptFeatures.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-b border-brand-border pb-3">
                      <h4 className="font-bold text-white mb-2">
                        🎓 Mentorship
                      </h4>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-yellow-400 text-sm font-semibold">
                          Private session discounts
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-2">
                        ⚡ Analysis Tools
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                          <span className="text-yellow-400 text-sm font-semibold">
                            Enhanced AI Advisor
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                          <span className="text-yellow-400 text-sm font-semibold">
                            Complete Education Library
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link href="/hub/infinity/subscription">
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg py-3 shadow-glow-yellow transition-all duration-200 hover:scale-105">
                      Upgrade to Infinity
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card className="bg-brand-bg-light border-brand-border">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Why Choose Eagle Investors Scripts?
                  </h3>
                  <p className="text-gray-400 max-w-3xl mx-auto">
                    Our educational trading scripts are developed by experienced
                    analysts to help you learn market analysis concepts. Each
                    script is designed to teach different aspects of technical
                    analysis and market behavior.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-green to-green-600 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">
                      Educational Focus
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Designed to teach market analysis concepts and trading
                      principles
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">
                      Real-Time Analysis
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Live market data analysis for learning and research
                      purposes
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">
                      Risk Awareness
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Built-in educational content about risk management
                      principles
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Infinity member view with enhanced design
  return (
    <div className="space-y-8">
      {/* Hero Section for Infinity Users */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-glow-yellow">
              <Code className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Algorithmic Trading Scripts
              </h1>
              <p className="text-yellow-400 font-semibold text-lg">
                Your Educational Trading Toolkit
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Access our exclusive library of educational algorithmic trading
            scripts designed to help you learn market analysis and trading
            concepts.
          </p>
        </div>
      </div>

      {/* How to Access Scripts Button */}
      <div className="flex justify-center">
        <Link href="/hub/infinity/scripts/access-guide">
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-xl py-4 px-8 shadow-glow-yellow transition-all duration-200 hover:scale-105 rounded-xl">
            <BookOpen className="w-6 h-6 mr-3" />
            HOW TO ACCESS YOUR SCRIPTS
          </Button>
        </Link>
      </div>

      {/* Enhanced Script Cards for Infinity Users */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">
          Educational Trading Scripts
        </h2>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {scriptExamples.map((script) => (
            <Card
              key={script.id}
              className="bg-gradient-to-br from-brand-bg-light to-brand-bg-dark border-brand-border transition-all duration-300 hover:scale-105 hover:shadow-glow-blue overflow-hidden"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-brand-green/20 text-brand-green"
                    >
                      {script.performance}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-brand-cyan border-brand-cyan"
                    >
                      {script.symbol}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-semibold">
                      {script.timeframe}
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl text-white mb-2">
                  {script.name}
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm leading-relaxed">
                  {script.description}
                </CardDescription>

                {/* Script Details */}
                <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-brand-bg-dark/50 rounded-lg border border-yellow-500/20">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Category
                    </p>
                    <p className="text-sm text-white font-semibold">
                      {script.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Caters To
                    </p>
                    <p className="text-sm text-white font-semibold">
                      {script.difficulty}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Timeframe
                    </p>
                    <p className="text-sm text-white font-semibold">
                      {script.timeframe}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Analysis Type
                    </p>
                    <p className="text-sm text-brand-cyan font-semibold">
                      {script.signals}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={script.image || "/placeholder.svg"}
                    alt={`${script.name} trading signals`}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                      Live
                    </Badge>
                  </div>
                  {script.id === "swing-king" && (
                    <div className="absolute bottom-2 left-2">
                      <Badge className="bg-brand-primary/90 text-white text-xs">
                        META 1hr
                      </Badge>
                    </div>
                  )}
                  {script.id === "contrarian-momentum" && (
                    <div className="absolute bottom-2 left-2 flex gap-2">
                      <Badge className="bg-brand-primary/90 text-white text-xs">
                        TSLA/IBIT 1hr
                      </Badge>
                      <Badge className="bg-purple-500/90 text-white text-xs">
                        30 sensitivity
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Key Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-white">
                    Key Features:
                  </h4>
                  <div className="grid grid-cols-2 gap-1">
                    {script.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <span className="text-xs text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/hub/infinity/scripts/${script.id}/guide`}
                    className="block"
                  >
                    <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-bold shadow-glow-cyan transition-all duration-200 hover:scale-105">
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Guide
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
