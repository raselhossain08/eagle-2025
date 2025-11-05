import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Download,
  Lock,
  Code,
  Zap,
  TrendingUp,
  BarChart3,
  CheckCircle,
  Star,
} from "lucide-react";
import { mockUser } from "@/lib/data/basic.data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplianceTooltip } from "@/components/shared/compliance-tooltip";

export default function ScriptsPage() {
  const user = mockUser;
  const hasAccess = user.subscription === "Infinity";

  const scriptExamples = [
    {
      id: "momentum-scalper",
      name: "Momentum Scalper Pro",
      description:
        "High-frequency scalping algorithm with real-time buy/sell signals for volatile markets",
      image: "/script-example-hood.png",
      symbol: "HOOD",
      performance: "Live Signals",
      signals: "Real-time alerts",
    },
    {
      id: "swing-king",
      name: "Swing King",
      description:
        "Long-term swing trading system identifying optimal entry and exit points",
      image: "/script-example-msft.png",
      symbol: "MSFT",
      performance: "Active Alerts",
      signals: "Multi-timeframe analysis",
    },
    {
      id: "crypto-momentum",
      name: "Contrarian Momentum",
      description:
        "Advanced crypto trading algorithm with custom momentum indicators",
      image: "/script-example-btc.png",
      symbol: "BTC/USD",
      performance: "Real-Time",
      signals: "Custom algorithms",
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
                  Algorithmic Trading Excellence
                </p>
              </div>
            </div>
            <p className="text-gray-300 max-w-3xl mb-8">
              Access our exclusive, high-performance algorithmic trading
              scripts* designed by our quantitative research team. These tools
              generate real-time buy/sell signals and optimize trading
              performance across all markets.
            </p>

            {/* Performance Stats with Compliance Tooltips */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-yellow-500/20">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <ComplianceTooltip>
                  <h3 className="font-semibold text-white mb-2">
                    Real-Time Signals
                  </h3>
                </ComplianceTooltip>
                <p className="text-gray-400 text-sm">
                  Instant buy/sell alerts with proven reliability
                </p>
              </div>
              <div className="bg-brand-bg-dark/50 rounded-xl p-6 border border-yellow-500/20">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-black" />
                </div>
                <ComplianceTooltip content="Historical backtested data available. This feature is designed for experienced investors. Past performance is not indicative of future results.">
                  <h3 className="font-semibold text-white mb-2">
                    Historical backtested data available*
                  </h3>
                </ComplianceTooltip>
                <p className="text-gray-400 text-sm">
                  Consistent performance tracking
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
              <span className="text-black text-sm font-bold">*</span>
            </div>
            <div>
              <h4 className="text-yellow-400 font-semibold mb-2">
                Important Performance Disclaimer
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                *Backtested results are hypothetical, do not reflect actual
                trading, and are not guarantees of future results. Individual
                outcomes will vary. Eagle Investors makes no guarantee of
                profitability.
              </p>
            </div>
          </div>
        </div>

        {/* Script Examples */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Live Script Examples
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
                    <span className="text-gray-400">Signals:</span>
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
                    Standalone Available
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div className="border-b border-brand-border pb-4">
                      <h4 className="font-bold text-white mb-3">
                        📊 Included Tools
                      </h4>
                      <div className="space-y-3">
                        {scriptFeatures.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                            <span className="text-gray-300 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            Multiple Trading Scripts
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            Custom Coded by Eagle Advisors
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-brand-border pb-4">
                      <h4 className="font-bold text-white mb-3">
                        🎓 Support & Guides
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            Guides and On Demand Support Available
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            Shared Through TradingView Invite Only Scripts
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pb-2">
                      <h4 className="font-bold text-white mb-3">
                        ⚡ Platform Integration
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            ThinkOrSwim Scripts in Development
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" />
                          <span className="text-gray-300 text-sm">
                            Basic analytics included
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-bold text-lg py-3 shadow-glow-cyan transition-all duration-200 hover:scale-105">
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
                <CardContent className="space-y-8">
                  <div className="space-y-6">
                    <div className="border-b border-brand-border pb-6">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <span>📊</span>
                        <span>Included Tools</span>
                      </h4>
                      <div className="space-y-3">
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
                    <div className="border-b border-brand-border pb-6">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <span>🎓</span>
                        <span>Mentorship</span>
                      </h4>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-yellow-400 text-sm font-semibold">
                          Private session discounts
                        </span>
                      </div>
                    </div>
                    <div className="pb-2">
                      <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                        <span>⚡</span>
                        <span>Performance Tools</span>
                      </h4>
                      <div className="space-y-3">
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
                  <div className="pt-4">
                    <Link href="/hub/basic/subscription">
                      <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg py-4 shadow-glow-yellow transition-all duration-200 hover:scale-105">
                        Upgrade to Infinity
                      </Button>
                    </Link>
                  </div>
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
                    Our algorithmic trading scripts are developed by
                    quantitative analysts with decades of market experience.
                    Each script undergoes rigorous backtesting and real-market
                    validation before release.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-green to-green-600 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">
                      Historical Performance Data*
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Historical backtested data available* - results are
                      hypothetical
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">
                      Real-Time Execution
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Lightning-fast signal generation with sub-second market
                      analysis
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-black" />
                    </div>
                    <h4 className="font-semibold text-white mb-2">
                      Risk Management
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Built-in stop-loss and position sizing for optimal risk
                      control
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

  // Infinity member view remains the same but with enhanced content
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
                Your Algorithmic Trading Arsenal
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl">
            Access our exclusive library of algorithmic trading scripts* with
            real-time signals and proven performance.
          </p>
        </div>
      </div>

      {/* Live Examples for Infinity Users */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">
          Active Trading Scripts
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
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Signals:</span>
                  <span className="text-brand-cyan font-semibold">
                    {script.signals}
                  </span>
                </div>
                <Button className="w-full bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-bold shadow-glow-cyan transition-all duration-200 hover:scale-105">
                  <Download className="w-4 h-4 mr-2" />
                  Download Script
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
