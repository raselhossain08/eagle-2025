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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Star,
  Target,
  AlertTriangle,
} from "lucide-react";

interface WatchlistStock {
  symbol: string;
  name: string;
  currentPrice: number;
  change: string;
  changePercent: string;
  volume: string;
  marketCap: string;
  sector: string;
  reason: string;
  rating: string;
  targetPrice: number;
  risk: string;
  timeframe?: string;
}

interface UnusualOptionsActivity {
  symbol: string;
  type: string;
  strike: number;
  expiry: string;
  volume: string;
  openInterest: string;
  impliedVolatility: string;
  premium: number;
  sentiment: string;
  significance: string;
}

export default function DiamondWatchlists() {
  const [watchlistData, setWatchlistData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const fetchWatchlists = async () => {
    try {
      const response = await fetch("/api/diamond/watchlists", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWatchlistData(data.watchlists);
      }
    } catch (error) {
      console.error("Error fetching watchlists:", error);
    } finally {
      setLoading(false);
    }
  };

  const getChangeColor = (change: string) => {
    return change.startsWith("+") ? "text-green-400" : "text-red-400";
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "High":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "Strong Buy":
        return "text-green-400";
      case "Buy":
        return "text-green-300";
      case "Hold":
        return "text-yellow-400";
      case "Sell":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const renderStockCard = (stock: WatchlistStock) => (
    <Card
      key={stock.symbol}
      className="bg-brand-bg-light border-brand-border hover:bg-brand-bg-dark transition-colors"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg text-white">{stock.symbol}</CardTitle>
            <CardDescription className="text-gray-400">
              {stock.name}
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-white">
              ${stock.currentPrice.toFixed(2)}
            </p>
            <p
              className={`text-sm font-semibold ${getChangeColor(
                stock.change
              )}`}
            >
              {stock.change} ({stock.changePercent})
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-400">Volume</p>
            <p className="text-sm font-semibold text-white">{stock.volume}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Market Cap</p>
            <p className="text-sm font-semibold text-white">
              {stock.marketCap}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Sector</p>
            <p className="text-sm font-semibold text-white">{stock.sector}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Target</p>
            <p className="text-sm font-semibold text-green-400">
              ${stock.targetPrice.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <Badge
            className={`${getRatingColor(stock.rating)} bg-transparent border`}
          >
            {stock.rating}
          </Badge>
          <Badge className={`${getRiskColor(stock.risk)} text-white`}>
            {stock.risk} Risk
          </Badge>
          {stock.timeframe && (
            <Badge
              variant="outline"
              className="border-brand-border text-gray-300"
            >
              {stock.timeframe}
            </Badge>
          )}
        </div>

        <div className="bg-brand-bg-dark rounded-lg p-3">
          <p className="text-xs text-gray-400 mb-1">Analysis</p>
          <p className="text-sm text-gray-200">{stock.reason}</p>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-600 rounded w-1/3 animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card
              key={i}
              className="bg-brand-bg-light border-brand-border animate-pulse"
            >
              <CardContent className="p-6">
                <div className="h-4 bg-gray-600 rounded w-1/4 mb-2"></div>
                <div className="h-6 bg-gray-600 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-600 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!watchlistData) {
    return (
      <Card className="bg-brand-bg-light border-brand-border">
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">
            Failed to load watchlist data. Please try again.
          </p>
          <Button
            onClick={fetchWatchlists}
            className="mt-4 bg-brand-cyan text-white hover:bg-brand-cyan/90"
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Market Watchlists</h2>
        <Button
          onClick={fetchWatchlists}
          variant="outline"
          size="sm"
          className="border-brand-border text-white hover:bg-brand-bg-dark"
        >
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-brand-bg-light">
          <TabsTrigger
            value="daily"
            className="data-[state=active]:bg-brand-cyan"
          >
            Daily Picks
          </TabsTrigger>
          <TabsTrigger
            value="weekly"
            className="data-[state=active]:bg-brand-cyan"
          >
            Weekly Strategy
          </TabsTrigger>
          <TabsTrigger
            value="options"
            className="data-[state=active]:bg-brand-cyan"
          >
            Options Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="mt-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {watchlistData.daily.title}
            </h3>
            <p className="text-gray-400">{watchlistData.daily.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Updated: {watchlistData.daily.date}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {watchlistData.daily.stocks.map(renderStockCard)}
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {watchlistData.weekly.title}
            </h3>
            <p className="text-gray-400">{watchlistData.weekly.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              {watchlistData.weekly.week}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {watchlistData.weekly.stocks.map(renderStockCard)}
          </div>
        </TabsContent>

        <TabsContent value="options" className="mt-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2">
              {watchlistData.unusual_options.title}
            </h3>
            <p className="text-gray-400">
              {watchlistData.unusual_options.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {watchlistData.unusual_options.activities.map(
              (activity: UnusualOptionsActivity, index: number) => (
                <Card
                  key={index}
                  className="bg-brand-bg-light border-brand-border"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-white">
                          {activity.symbol}
                        </CardTitle>
                        <CardDescription className="text-gray-400">
                          {activity.type} ${activity.strike} • {activity.expiry}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge
                          className={`${
                            activity.sentiment === "Bullish"
                              ? "bg-green-500"
                              : "bg-red-500"
                          } text-white`}
                        >
                          {activity.sentiment}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400">Volume</p>
                        <p className="text-sm font-semibold text-white">
                          {activity.volume}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Open Interest</p>
                        <p className="text-sm font-semibold text-white">
                          {activity.openInterest}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">IV</p>
                        <p className="text-sm font-semibold text-white">
                          {activity.impliedVolatility}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Premium</p>
                        <p className="text-sm font-semibold text-white">
                          ${activity.premium.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <Badge
                      className={`${
                        activity.significance === "High"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      } text-white`}
                    >
                      {activity.significance} Significance
                    </Badge>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 bg-brand-bg-light rounded-lg p-4 border border-brand-border">
        <p className="text-xs text-gray-400 text-center">
          <strong>Disclaimer:</strong> {watchlistData.disclaimer}
        </p>
      </div>
    </div>
  );
}
