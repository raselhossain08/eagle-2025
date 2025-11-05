import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Clock,
  Target,
  Shield,
  Activity,
} from "lucide-react";
import Link from "next/link";

export default function ContrarianMomentumGuide() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/hub/infinity/scripts">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scripts
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-green-500/50 shadow-glow-green">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-cyan-500/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center shadow-glow-green">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Eagle Algo - Custom Contrarian
              </h1>
              <p className="text-green-400 font-semibold text-lg">
                Educational Multi-Asset Tool
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl mb-6">
            Learn contrarian trading concepts with our educational algorithm
            designed to teach momentum indicators and market structure analysis
            across all asset classes. This tool is for educational purposes
            only.
          </p>

          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
              Stocks
            </Badge>
            <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Everyone
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              All Timeframes
            </Badge>
          </div>
        </div>
      </div>

      {/* Important Disclaimer */}
      <Card className="bg-yellow-500/10 border-2 border-yellow-500/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-400 font-semibold mb-2">
                Educational Tool - Trading Risk Warning
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                This script is designed for educational purposes to teach
                contrarian trading concepts. Contrarian strategies can be
                challenging and require experience. This tool does not guarantee
                profits and should only be used for learning market analysis
                concepts.
              </p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Practice with paper trading first</li>
                <li>• Understand that contrarian trading requires patience</li>
                <li>• Never risk more than you can afford to lose</li>
                <li>• Past performance does not predict future results</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Script Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-brand-bg-light border-brand-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-400" />
              Script Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Category
                </p>
                <p className="text-white font-semibold">Stocks</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Caters To
                </p>
                <p className="text-white font-semibold">Everyone</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Timeframes
                </p>
                <p className="text-white font-semibold">All timeframes</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Analysis Type
                </p>
                <p className="text-brand-cyan font-semibold">
                  Custom algorithms
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-brand-border">
              <h4 className="text-white font-semibold mb-2">
                Key Learning Features:
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Contrarian signal identification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Momentum indicator analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Volatility analysis concepts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Market structure education
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-brand-bg-light border-brand-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-green-400" />
              Educational Objectives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-brand-bg-dark/50 rounded-lg border border-green-500/20">
                <h4 className="text-white font-semibold mb-1">
                  Learn Contrarian Trading
                </h4>
                <p className="text-gray-400 text-sm">
                  Understand how to identify when markets may reverse direction
                </p>
              </div>
              <div className="p-3 bg-brand-bg-dark/50 rounded-lg border border-green-500/20">
                <h4 className="text-white font-semibold mb-1">
                  Momentum Analysis
                </h4>
                <p className="text-gray-400 text-sm">
                  Study how momentum indicators can signal potential reversals
                </p>
              </div>
              <div className="p-3 bg-brand-bg-dark/50 rounded-lg border border-green-500/20">
                <h4 className="text-white font-semibold mb-1">
                  Market Structure
                </h4>
                <p className="text-gray-400 text-sm">
                  Learn to analyze overall market structure and patterns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Strategy Education */}
      <Card className="bg-brand-bg-light border-brand-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" />
            Educational Strategy Concepts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-green-400 mb-3">
                Contrarian Signal Education
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-green-400 font-semibold text-sm">
                    Oversold Conditions
                  </p>
                  <p className="text-gray-300 text-xs">
                    Learn to identify when assets may be oversold
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-green-400 font-semibold text-sm">
                    Divergence Patterns
                  </p>
                  <p className="text-gray-300 text-xs">
                    Study how price and indicators can diverge
                  </p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <p className="text-green-400 font-semibold text-sm">
                    Sentiment Extremes
                  </p>
                  <p className="text-gray-300 text-xs">
                    Understand market sentiment and extreme readings
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-cyan-400 mb-3">
                Momentum Indicator Education
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <p className="text-cyan-400 font-semibold text-sm">
                    RSI Analysis
                  </p>
                  <p className="text-gray-300 text-xs">
                    Learn how RSI can indicate potential reversals
                  </p>
                </div>
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <p className="text-cyan-400 font-semibold text-sm">
                    MACD Signals
                  </p>
                  <p className="text-gray-300 text-xs">
                    Study MACD crossovers and divergences
                  </p>
                </div>
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <p className="text-cyan-400 font-semibold text-sm">
                    Volume Confirmation
                  </p>
                  <p className="text-gray-300 text-xs">
                    Understand volume's role in confirming signals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How to Access */}
      <Card className="bg-gradient-to-br from-brand-bg-light to-brand-bg-dark border-yellow-500/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-yellow-400" />
            How to Access This Educational Script
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                <span className="text-black font-bold">1</span>
              </div>
              <h4 className="text-white font-semibold mb-2">
                Membership Required
              </h4>
              <p className="text-gray-400 text-sm">
                Access requires Eagle Investors Infinity membership
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                <span className="text-black font-bold">2</span>
              </div>
              <h4 className="text-white font-semibold mb-2">
                Invite-Only Access
              </h4>
              <p className="text-gray-400 text-sm">
                Scripts are provided via TradingView invite within 24 hours
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-3">
                <span className="text-black font-bold">3</span>
              </div>
              <h4 className="text-white font-semibold mb-2">Educational Use</h4>
              <p className="text-gray-400 text-sm">
                Start with paper trading to learn the concepts
              </p>
            </div>
          </div>

          <div className="text-center pt-4">
            <Link href="/hub/infinity/scripts/access-guide">
              <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold px-8 py-3">
                Complete Access Guide
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Educational Resources */}
      <Card className="bg-brand-bg-light border-brand-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-brand-green" />
            Recommended Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-brand-bg-dark/30 rounded-lg">
              <Clock className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-semibold">
                  Step 1: Learn Contrarian Basics
                </h4>
                <p className="text-gray-400 text-sm">
                  Complete our contrarian trading education modules before using
                  this script
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-brand-bg-dark/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-semibold">
                  Step 2: Practice with Paper Trading
                </h4>
                <p className="text-gray-400 text-sm">
                  Use virtual money to practice contrarian concepts
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-brand-bg-dark/30 rounded-lg">
              <Shield className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-semibold">
                  Step 3: Risk Management
                </h4>
                <p className="text-gray-400 text-sm">
                  Learn proper position sizing and patience for contrarian
                  trades
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
