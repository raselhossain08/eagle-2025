import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, BookOpen } from "lucide-react";
import Link from "next/link";

export default function ScriptsPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-yellow-500/50 shadow-glow-yellow">
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

      {/* How to Access Button */}
      <div className="text-center">
        <Link href="/hub/script/scripts/access-guide">
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-12 py-4 shadow-glow-yellow transition-all duration-300 hover:scale-105 rounded-xl border-2 border-yellow-400">
            <BookOpen className="w-6 h-6 mr-3" />
            HOW TO ACCESS YOUR SCRIPTS
          </Button>
        </Link>
      </div>

      {/* Educational Trading Scripts Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">
          Educational Trading Scripts
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Eagle Algo - Custom Contrarian */}
          <Card className="bg-[#1a1f2e] border border-gray-700 flex flex-col transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex flex-col flex-grow">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="bg-green-700 text-white border border-green-800 text-xs font-bold px-2 py-1 rounded-lg">
                  Real-Time
                </div>
                <div className="bg-blue-700 text-white border border-blue-800 text-xs font-bold px-2 py-1 rounded-lg">
                  All Assets/Tickers
                </div>
                <div className="bg-yellow-400 text-black border border-yellow-500 text-xs font-bold px-2 py-1 rounded-lg">
                  ⚡ All timeframes
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                Eagle Algo - Custom Contrarian
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Advanced Trading Algorithm with custom Eagle Advisor curated
                momentum indicators.
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 border border-gray-600 rounded-lg p-4 bg-[#151a26]">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    CATEGORY
                  </p>
                  <p className="text-white font-semibold text-sm">Stocks</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    CATERS TO
                  </p>
                  <p className="text-white font-semibold text-sm">Everyone</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    TIMEFRAME
                  </p>
                  <p className="text-cyan-400 font-semibold text-sm">
                    All timeframes
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    ANALYSIS TYPE
                  </p>
                  <p className="text-cyan-400 font-semibold text-sm">
                    Custom algorithms
                  </p>
                </div>
              </div>

              {/* Chart Image */}
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img
                  src="/eagle-algo-tsla-ibit-chart.png"
                  alt="Eagle Algo chart"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  Live
                </div>
                <div className="absolute bottom-3 left-3 bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  TSLA/IBIT 1hr
                </div>
                <div className="absolute bottom-3 right-3 bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  30 sensitivity
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-white font-bold text-base mb-4">
                  Key Features:
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Contrarian signals
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Momentum indicators
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Volatility analysis
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Market structure
                    </span>
                  </div>
                </div>
              </div>

              {/* View Guide Button */}
              <div className="mt-auto">
                <Link href="/hub/script/scripts/contrarian-momentum/guide">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 transition-all duration-200 hover:scale-105 rounded-xl">
                    <BookOpen className="w-5 h-5 mr-2" />
                    View Guide
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Swing King */}
          <Card className="bg-[#1a1f2e] border border-gray-700 flex flex-col transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex flex-col flex-grow">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="bg-green-700 text-white border border-green-800 text-xs font-bold px-2 py-1 rounded-lg">
                  Active Alerts
                </div>
                <div className="bg-blue-700 text-white border border-blue-800 text-xs font-bold px-2 py-1 rounded-lg">
                  Most Tickers
                </div>
                <div className="bg-yellow-400 text-black border border-yellow-500 text-xs font-bold px-2 py-1 rounded-lg">
                  ⚡ 30min, 1hr
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                Swing King
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Swing Trading System with Take Profit and Stop Loss Levels
                identifying optimal trades, best used on 1hour chart.
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 border border-gray-600 rounded-lg p-4 bg-[#151a26]">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    CATEGORY
                  </p>
                  <p className="text-white font-semibold text-sm">
                    Swing Trading
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    CATERS TO
                  </p>
                  <p className="text-white font-semibold text-sm">
                    Most Traders
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    TIMEFRAME
                  </p>
                  <p className="text-cyan-400 font-semibold text-sm">
                    30min, 1hr
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    ANALYSIS TYPE
                  </p>
                  <p className="text-cyan-400 font-semibold text-sm">
                    Advanced algorithms
                  </p>
                </div>
              </div>

              {/* Chart Image */}
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img
                  src="/swing-king-meta-chart.png"
                  alt="Swing King chart"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  Live
                </div>
                <div className="absolute bottom-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  META 1hr
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-white font-bold text-base mb-4">
                  Key Features:
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Trend identification
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Support/resistance levels
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Volume analysis
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Risk/Reward Profile
                    </span>
                  </div>
                </div>
              </div>

              {/* View Guide Button */}
              <div className="mt-auto">
                <Link href="/hub/script/scripts/swing-king/guide">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 transition-all duration-200 hover:scale-105 rounded-xl">
                    <BookOpen className="w-5 h-5 mr-2" />
                    View Guide
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Momentum Scalper */}
          <Card className="bg-[#1a1f2e] border border-gray-700 flex flex-col transition-all duration-300 hover:scale-[1.02] rounded-2xl overflow-hidden">
            <CardContent className="p-6 flex flex-col flex-grow">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <div className="bg-green-700 text-white border border-green-800 text-xs font-bold px-2 py-1 rounded-lg">
                  Live Signals
                </div>
                <div className="bg-blue-700 text-white border border-blue-800 text-xs font-bold px-2 py-1 rounded-lg">
                  Short Term
                </div>
                <div className="bg-yellow-400 text-black border border-yellow-500 text-xs font-bold px-2 py-1 rounded-lg">
                  ⚡ 1m, 3m, 5m
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                Momentum Scalper
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                High-Frequency scalping algorithm suited for lowertime frames
                with real time buy/sell signals and a take profit level.
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6 border border-gray-600 rounded-lg p-4 bg-[#151a26]">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    CATEGORY
                  </p>
                  <p className="text-white font-semibold text-sm">
                    Day Trading
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    CATERS TO
                  </p>
                  <p className="text-white font-semibold text-sm">Scalpers</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    TIMEFRAME
                  </p>
                  <p className="text-cyan-400 font-semibold text-sm">
                    1m, 3m, 5m
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                    ANALYSIS TYPE
                  </p>
                  <p className="text-cyan-400 font-semibold text-sm">
                    Quick Trades
                  </p>
                </div>
              </div>

              {/* Chart Image */}
              <div className="relative rounded-xl overflow-hidden mb-6">
                <img
                  src="/script-example-hood.png"
                  alt="Momentum Scalper chart"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                  Live
                </div>
                <div className="absolute bottom-3 right-3 bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-lg">
                  1m, 3m, 5m
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-white font-bold text-base mb-4">
                  Key Features:
                </h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Real-time signals
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Price Target Generation
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">Quick Moves</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0"></div>
                    <span className="text-sm text-gray-300">
                      Multi-timeframe analysis
                    </span>
                  </div>
                </div>
              </div>

              {/* View Guide Button */}
              <div className="mt-auto">
                <Link href="/hub/script/scripts/momentum-scalper/guide">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 transition-all duration-200 hover:scale-105 rounded-xl">
                    <BookOpen className="w-5 h-5 mr-2" />
                    View Guide
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
