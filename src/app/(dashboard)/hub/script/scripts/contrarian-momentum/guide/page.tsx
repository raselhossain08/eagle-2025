import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  BarChart3,
  AlertTriangle,
  BookOpen,
  Target,
  TrendingUp,
  Activity,
  Clock,
} from "lucide-react";

export default function EagleAlgoGuidePage() {
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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-900/20 via-brand-bg-dark to-brand-bg-light border border-green-500/30">
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
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

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            <div className="bg-green-700 text-white border border-green-800 text-sm font-bold px-3 py-1.5 rounded-lg">
              Stocks
            </div>
            <div className="bg-blue-700 text-white border border-blue-800 text-sm font-bold px-3 py-1.5 rounded-lg">
              Everyone
            </div>
            <div className="bg-blue-700 text-white border border-blue-800 text-sm font-bold px-3 py-1.5 rounded-lg">
              All Timeframes
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
                This script is designed for educational purposes to teach
                contrarian trading concepts. Contrarian strategies can be
                challenging and require experience. This tool does not guarantee
                profits and should only be used for learning market analysis
                concepts.
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Practice with paper trading first</li>
                <li>• Understand that contrarian trading requires patience</li>
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
              <BarChart3 className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">Script Overview</h2>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                  CATEGORY
                </p>
                <p className="text-white font-semibold">Stocks</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                  CATERS TO
                </p>
                <p className="text-white font-semibold">Everyone</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                  TIMEFRAMES
                </p>
                <p className="text-cyan-400 font-semibold">All timeframes</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                  ANALYSIS TYPE
                </p>
                <p className="text-cyan-400 font-semibold">Custom algorithms</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold text-lg mb-4">
                Key Learning Features:
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Contrarian signal identification
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Momentum indicator analysis
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Volatility analysis concepts
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></div>
                  <span className="text-gray-300">
                    Market structure education
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
              <Target className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">
                Educational Objectives
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Learn Contrarian Trading
                </h3>
                <p className="text-gray-400 text-sm">
                  Understand how to identify when markets may reverse direction
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Momentum Analysis
                </h3>
                <p className="text-gray-400 text-sm">
                  Study how momentum indicators can signal potential reversals
                </p>
              </div>

              <div>
                <h3 className="text-white font-bold text-lg mb-2">
                  Market Structure
                </h3>
                <p className="text-gray-400 text-sm">
                  Learn to analyze overall market structure and patterns
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Educational Strategy Concepts */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-green-400" />
          <h2 className="text-3xl font-bold text-white">
            Educational Strategy Concepts
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contrarian Signal Education */}
          <div className="space-y-4">
            <h3 className="text-green-400 font-bold text-xl">
              Contrarian Signal Education
            </h3>

            <Card className="bg-green-900/20 border border-green-700/50">
              <CardContent className="p-4">
                <h4 className="text-green-400 font-bold mb-2">
                  Oversold Conditions
                </h4>
                <p className="text-gray-300 text-sm">
                  Learn to identify when assets may be oversold
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border border-green-700/50">
              <CardContent className="p-4">
                <h4 className="text-green-400 font-bold mb-2">
                  Divergence Patterns
                </h4>
                <p className="text-gray-300 text-sm">
                  Study how price and indicators can diverge
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-900/20 border border-green-700/50">
              <CardContent className="p-4">
                <h4 className="text-green-400 font-bold mb-2">
                  Sentiment Extremes
                </h4>
                <p className="text-gray-300 text-sm">
                  Understand market sentiment and extreme readings
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Momentum Indicator Education */}
          <div className="space-y-4">
            <h3 className="text-cyan-400 font-bold text-xl">
              Momentum Indicator Education
            </h3>

            <Card className="bg-cyan-900/20 border border-cyan-700/50">
              <CardContent className="p-4">
                <h4 className="text-cyan-400 font-bold mb-2">RSI Analysis</h4>
                <p className="text-gray-300 text-sm">
                  Learn how RSI can indicate potential reversals
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cyan-900/20 border border-cyan-700/50">
              <CardContent className="p-4">
                <h4 className="text-cyan-400 font-bold mb-2">MACD Signals</h4>
                <p className="text-gray-300 text-sm">
                  Study MACD crossovers and divergences
                </p>
              </CardContent>
            </Card>

            <Card className="bg-cyan-900/20 border border-cyan-700/50">
              <CardContent className="p-4">
                <h4 className="text-cyan-400 font-bold mb-2">
                  Volume Confirmation
                </h4>
                <p className="text-gray-300 text-sm">
                  Understand volume's role in confirming signals
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
            <Target className="w-6 h-6 rounded-full bg-green-400 text-white flex items-center justify-center" />
            <h2 className="text-2xl font-bold text-white">
              Recommended Learning Path
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-bg-dark border-2 border-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Step 1: Learn Contrarian Basics
                </h3>
                <p className="text-gray-400 text-sm">
                  Complete our contrarian trading education modules before using
                  this script
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
                  Use virtual money to practice contrarian concepts
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-bg-dark border-2 border-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">
                  Step 3: Risk Management
                </h3>
                <p className="text-gray-400 text-sm">
                  Learn proper position sizing and patience for contrarian
                  trades
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
