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

export default function SwingKingGuide() {
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-blue-500/50 shadow-glow-blue">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-glow-blue">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Swing King
              </h1>
              <p className="text-blue-400 font-semibold text-lg">
                Educational Swing Trading Tool
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl mb-6">
            Learn swing trading concepts with our educational system designed to
            teach take profit and stop loss level identification. This tool
            helps you understand optimal trade setups and is best used on 1-hour
            charts for educational purposes.
          </p>

          <div className="flex flex-wrap gap-3">
            <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Swing Trading
            </Badge>
            <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Most Traders
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
              30min, 1hr
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
                This script is designed for educational purposes to teach swing
                trading concepts. Swing trading involves holding positions for
                days to weeks and requires patience and risk management. This
                tool does not guarantee profits and should only be used for
                learning market analysis concepts.
              </p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Practice with paper trading first</li>
                <li>• Swing trading requires patience and discipline</li>
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
              <BarChart3 className="w-5 h-5 text-blue-400" />
              Script Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Category
                </p>
                <p className="text-white font-semibold">Swing Trading</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Caters To
                </p>
                <p className="text-white font-semibold">Most Traders</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Timeframes
                </p>
                <p className="text-white font-semibold">30min, 1hr</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Analysis Type
                </p>
                <p className="text-brand-cyan font-semibold">
                  Advanced algorithms
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-brand-border">
              <h4 className="text-white font-semibold mb-2">
                Key Learning Features:
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Trend identification concepts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Support/resistance level analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Volume analysis education
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  Risk/reward profile calculation
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-brand-bg-light border-brand-border">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              Educational Objectives
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-3 bg-brand-bg-dark/50 rounded-lg border border-blue-500/20">
                <h4 className="text-white font-semibold mb-1">
                  Learn Swing Trading
                </h4>
                <p className="text-gray-400 text-sm">
                  Understand medium-term trading strategies and concepts
                </p>
              </div>
              <div className="p-3 bg-brand-bg-dark/50 rounded-lg border border-blue-500/20">
                <h4 className="text-white font-semibold mb-1">
                  Risk Management
                </h4>
                <p className="text-gray-400 text-sm">
                  Study proper stop loss and take profit placement
                </p>
              </div>
              <div className="p-3 bg-brand-bg-dark/50 rounded-lg border border-blue-500/20">
                <h4 className="text-white font-semibold mb-1">
                  Technical Analysis
                </h4>
                <p className="text-gray-400 text-sm">
                  Learn to identify trends and key levels
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
            <Activity className="w-5 h-5 text-blue-400" />
            Educational Strategy Concepts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-400 mb-3">
                Swing Setup Education
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-blue-400 font-semibold text-sm">
                    Trend Following
                  </p>
                  <p className="text-gray-300 text-xs">
                    Learn to identify and follow market trends
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-blue-400 font-semibold text-sm">
                    Pullback Entries
                  </p>
                  <p className="text-gray-300 text-xs">
                    Study how to enter on trend pullbacks
                  </p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-blue-400 font-semibold text-sm">
                    Breakout Patterns
                  </p>
                  <p className="text-gray-300 text-xs">
                    Understand breakout confirmation signals
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-cyan-400 mb-3">
                Risk Management Education
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <p className="text-cyan-400 font-semibold text-sm">
                    Stop Loss Placement
                  </p>
                  <p className="text-gray-300 text-xs">
                    Learn optimal stop loss positioning
                  </p>
                </div>
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <p className="text-cyan-400 font-semibold text-sm">
                    Take Profit Levels
                  </p>
                  <p className="text-gray-300 text-xs">
                    Study profit target identification
                  </p>
                </div>
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                  <p className="text-cyan-400 font-semibold text-sm">
                    Position Sizing
                  </p>
                  <p className="text-gray-300 text-xs">
                    Understand appropriate position sizes
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
                  Step 1: Learn Swing Trading Basics
                </h4>
                <p className="text-gray-400 text-sm">
                  Complete our swing trading education modules before using this
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
                  Use virtual money to practice swing trading concepts
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
                  Learn proper position sizing and patience for swing trades
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
