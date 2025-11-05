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
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function MomentumScalperGuide() {
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-red-500/50 shadow-glow-red">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-glow-red">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Momentum Scalper
              </h1>
              <p className="text-red-400 font-semibold text-lg">
                Educational Scalping Tool
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl mb-6">
            Learn high-frequency scalping concepts with our educational
            algorithm designed for lower timeframes. This tool teaches quick
            trade identification and price target generation for educational
            purposes only.
          </p>

          <div className="flex flex-wrap gap-3">
            <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">
              Day Trading
            </Badge>
            <Badge className="bg-orange-500/20 text-orange-400 border border-orange-500/30">
              Scalpers
            </Badge>
            <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              1m, 3m, 5m
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
                Educational Tool - High Risk Warning
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                This script is designed for educational purposes to teach
                scalping concepts. Scalping is extremely high-risk and requires
                significant experience. This tool does not guarantee profits and
                should only be used for learning market analysis concepts.
              </p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Practice with paper trading first</li>
                <li>
                  • Scalping requires constant attention and quick decisions
                </li>
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
              <BarChart3 className="w-5 h-5 text-red-400" />
              Script Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Category
                </p>
                <p className="text-white font-semibold">Day Trading</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Caters To
                </p>
                <p className="text-white font-semibold">Scalpers</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Timeframes
                </p>
                <p className="text-white font-semibold">1m, 3m, 5m</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Analysis Type
                </p>
                <p className="text-brand-cyan font-semibold">Quick Trades</p>
              </div>
            </div>
            <div className="pt-4 border-t border-brand-border">
              <h4 className="text-white font-semibold mb-2">
                Key Learning Features:
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  Real-time signal identification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  Price target generation concepts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  Quick move identification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  Multi-timeframe analysis
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-brand-bg-light border-brand-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-red-400" />
              Educational Objectives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-brand-bg-dark/50 rounded-lg border border-red-500/20">
                <h4 className="text-white font-semibold mb-1">
                  Learn Scalping Basics
                </h4>
                <p className="text-gray-400 text-sm">
                  Understand the fundamentals of short-term trading
                </p>
              </div>
              <div className="p-3 bg-brand-bg-dark/50 rounded-lg border border-red-500/20">
                <h4 className="text-white font-semibold mb-1">
                  Quick Decision Making
                </h4>
                <p className="text-gray-400 text-sm">
                  Practice rapid analysis and trade execution concepts
                </p>
              </div>
              <div className="p-3 bg-brand-bg-dark/50 rounded-lg border border-red-500/20">
                <h4 className="text-white font-semibold mb-1">
                  Price Target Setting
                </h4>
                <p className="text-gray-400 text-sm">
                  Learn to identify realistic profit targets
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
            <Zap className="w-5 h-5 text-red-400" />
            Educational Strategy Concepts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-red-400 mb-3">
                Scalping Signal Education
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <p className="text-red-400 font-semibold text-sm">
                    Momentum Breaks
                  </p>
                  <p className="text-gray-300 text-xs">
                    Learn to identify sudden price movements
                  </p>
                </div>
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <p className="text-red-400 font-semibold text-sm">
                    Volume Spikes
                  </p>
                  <p className="text-gray-300 text-xs">
                    Understand volume's role in quick moves
                  </p>
                </div>
                <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <p className="text-red-400 font-semibold text-sm">
                    Level Breaks
                  </p>
                  <p className="text-gray-300 text-xs">
                    Study support and resistance breakouts
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-orange-400 mb-3">
                Risk Management Education
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <p className="text-orange-400 font-semibold text-sm">
                    Position Sizing
                  </p>
                  <p className="text-gray-300 text-xs">
                    Learn appropriate position sizes for scalping
                  </p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <p className="text-orange-400 font-semibold text-sm">
                    Quick Exits
                  </p>
                  <p className="text-gray-300 text-xs">
                    Understand when to exit losing positions
                  </p>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                  <p className="text-orange-400 font-semibold text-sm">
                    Profit Taking
                  </p>
                  <p className="text-gray-300 text-xs">
                    Learn to secure profits quickly
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
                  Step 1: Learn Scalping Fundamentals
                </h4>
                <p className="text-gray-400 text-sm">
                  Complete our scalping education modules before using this
                  script
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
                  Use virtual money to practice scalping concepts
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
                  Learn proper position sizing and quick exit strategies
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
