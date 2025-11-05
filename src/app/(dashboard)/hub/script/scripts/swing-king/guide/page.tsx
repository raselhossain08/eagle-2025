import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Target,
  Activity,
} from "lucide-react";

export default function SwingKingGuidePage() {
  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div className="flex items-center gap-3">
        <Link href="/hub/script/scripts">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-brand-bg-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Scripts
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/20 via-brand-bg-dark to-brand-bg-light border border-blue-500/30">
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
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

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-blue-700 text-white border border-blue-800 text-sm font-bold px-3 py-1.5 rounded-lg">
              Swing Trading
            </div>
            <div className="bg-blue-700 text-white border border-blue-800 text-sm font-bold px-3 py-1.5 rounded-lg">
              Most Traders
            </div>
            <div className="bg-yellow-400 text-black border border-yellow-500 text-sm font-bold px-3 py-1.5 rounded-lg">
              ⚡ 30min, 1hr
            </div>
          </div>
        </div>
      </div>

      {/* Educational Tool Warning */}
      <Card className="bg-yellow-600/10 border-2 border-yellow-500/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-yellow-400 font-bold text-lg mb-3">
                Educational Tool - Trading Risk Warning
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                This script is designed for educational purposes to teach swing
                trading concepts. Swing trading involves holding positions for
                days to weeks and requires patience and risk management. This
                tool does not guarantee profits and should only be used for
                learning market analysis concepts.
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Practice with paper trading first</li>
                <li>• Swing trading requires patience and discipline</li>
                <li>• Never risk more than you can afford to lose</li>
                <li>• Past performance does not predict future results</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Script Overview */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Script Overview</h2>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                  CATEGORY
                </p>
                <p className="text-white font-semibold">Swing Trading</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                  CATERS TO
                </p>
                <p className="text-white font-semibold">Most Traders</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                  TIMEFRAMES
                </p>
                <p className="text-cyan-400 font-semibold">30min, 1hr</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                  ANALYSIS TYPE
                </p>
                <p className="text-cyan-400 font-semibold">
                  Advanced algorithms
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">
                Key Learning Features:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Trend identification concepts
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Support/resistance level analysis
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Volume analysis education
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Risk/reward profile calculation
                  </span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Educational Objectives */}
        <Card className="bg-brand-bg-light border-brand-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">
                Educational Objectives
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Learn Swing Trading
                </h3>
                <p className="text-gray-400 text-sm">
                  Understand medium-term trading strategies and concepts
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Risk Management
                </h3>
                <p className="text-gray-400 text-sm">
                  Study proper stop loss and take profit placement
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Technical Analysis
                </h3>
                <p className="text-gray-400 text-sm">
                  Learn to identify trends and key levels
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Educational Strategy Concepts */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-400" />
          <h2 className="text-3xl font-bold text-white">
            Educational Strategy Concepts
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Swing Setup Education */}
          <div className="space-y-4">
            <h3 className="text-blue-400 font-bold text-xl">
              Swing Setup Education
            </h3>

            <Card className="bg-blue-900/20 border border-blue-700/50">
              <CardContent className="p-4">
                <h4 className="text-blue-400 font-bold mb-2">
                  Trend Following
                </h4>
                <p className="text-gray-300 text-sm">
                  Learn to identify and follow market trends
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/20 border border-blue-700/50">
              <CardContent className="p-4">
                <h4 className="text-blue-400 font-bold mb-2">
                  Pullback Entries
                </h4>
                <p className="text-gray-300 text-sm">
                  Study how to enter on trend pullbacks
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/20 border border-blue-700/50">
              <CardContent className="p-4">
                <h4 className="text-blue-400 font-bold mb-2">
                  Breakout Patterns
                </h4>
                <p className="text-gray-300 text-sm">
                  Understand breakout confirmation signals
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Risk Management Education */}
          <div className="space-y-4">
            <h3 className="text-cyan-400 font-bold text-xl">
              Risk Management Education
            </h3>

            <Card className="bg-cyan-900/20 border border-cyan-700/50">
              <CardContent className="p-4">
                <h4 className="text-cyan-400 font-bold mb-2">
                  Stop Loss Placement
                </h4>
                <p className="text-gray-300 text-sm">
                  Learn optimal stop loss positioning
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cyan-900/20 border border-cyan-700/50">
              <CardContent className="p-4">
                <h4 className="text-cyan-400 font-bold mb-2">
                  Take Profit Levels
                </h4>
                <p className="text-gray-300 text-sm">
                  Study profit target identification
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cyan-900/20 border border-cyan-700/50">
              <CardContent className="p-4">
                <h4 className="text-cyan-400 font-bold mb-2">
                  Position Sizing
                </h4>
                <p className="text-gray-300 text-sm">
                  Understand appropriate position sizes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* How to Access Section */}
      <Card className="bg-yellow-600/10 border-2 border-yellow-500/50">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <BookOpen className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">
              How to Access This Educational Script
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                Membership Required
              </h3>
              <p className="text-gray-400 text-sm">
                Access requires Eagle Investors Infinity membership
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                Invite-Only Access
              </h3>
              <p className="text-gray-400 text-sm">
                Scripts are provided via TradingView invite within 24 hours
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                Educational Use
              </h3>
              <p className="text-gray-400 text-sm">
                Start with paper trading to learn the concepts
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/hub/script/scripts/access-guide">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3">
                Complete Access Guide
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Learning Path */}
      <Card className="bg-brand-bg-light border-brand-border">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-white"></div>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Recommended Learning Path
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-bg-dark border-2 border-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Step 1: Learn Swing Trading Basics
                </h3>
                <p className="text-gray-400 text-sm">
                  Complete our swing trading education modules before using this
                  script
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-bg-dark border-2 border-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Step 2: Practice with Paper Trading
                </h3>
                <p className="text-gray-400 text-sm">
                  Use virtual money to practice swing trading concepts
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-bg-dark border-2 border-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Step 3: Risk Management
                </h3>
                <p className="text-gray-400 text-sm">
                  Learn proper position sizing and patience for swing trades
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="bg-brand-bg-light rounded-2xl p-8 border border-brand-border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/eagle-investors-logo.png"
                alt="Eagle Investors"
                className="w-8 h-8"
              />
              <span className="text-lg font-bold text-white">
                Eagle Investors
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Eagle Investors is an investment adviser registered in applicable
              jurisdictions. Registration does not imply a certain level of
              skill or training.
            </p>
            <div className="flex text-yellow-400 mb-2">{"★".repeat(5)}</div>
            <p className="text-xs text-gray-500">Rated 5 stars by Benzinga</p>
            <p className="text-xs text-gray-500 mt-2">
              This rating is based on independent third-party reviews. No
              compensation was paid. Testimonials may not be representative of
              other clients and are not a guarantee of future performance.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Advisory Plans</li>
              <li>AI Advisor</li>
              <li>Trading Scripts</li>
              <li>Education Library</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          {/* Legal & Disclosures */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              Legal & Disclosures
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>ADV Part 2A & 2B</li>
              <li>Form CRS</li>
              <li>Risk Disclosure</li>
              <li>Code of Ethics</li>
              <li>AI Advisor Disclosure</li>
              <li>Testimonials Disclosure</li>
              <li>Cybersecurity Policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
