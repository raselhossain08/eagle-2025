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
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Target,
  AlertTriangle,
} from "lucide-react";

interface TradingAlert {
  id: number;
  type: string;
  symbol: string;
  action: string;
  price?: number;
  target?: number;
  stopLoss?: number;
  strike?: number;
  expiry?: string;
  premium?: number;
  currentPrice?: number;
  originalEntry?: number;
  profit?: string;
  timestamp: string;
  confidence: string;
  timeframe: string;
  reasoning: string;
}

export default function DiamondTradingAlerts() {
  const [alerts, setAlerts] = useState<TradingAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTradingAlerts();
    // Set up real-time updates (polling every 30 seconds)
    const interval = setInterval(fetchTradingAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTradingAlerts = async () => {
    try {
      const response = await fetch("/api/diamond/alerts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAlerts(data.alerts || []);
      }
    } catch (error) {
      console.error("Error fetching trading alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "stock_entry":
      case "option_day_trade":
      case "option_swing_trade":
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case "stock_exit":
        return <TrendingDown className="w-5 h-5 text-blue-400" />;
      default:
        return <ArrowUpRight className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes("BUY")) return "text-green-400";
    if (action.includes("SELL")) return "text-red-400";
    return "text-blue-400";
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "High":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
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
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Trading Alerts</h2>
        <Button
          onClick={fetchTradingAlerts}
          variant="outline"
          size="sm"
          className="border-brand-border text-white hover:bg-brand-bg-dark"
        >
          Refresh
        </Button>
      </div>

      {alerts.length === 0 ? (
        <Card className="bg-brand-bg-light border-brand-border">
          <CardContent className="p-6 text-center">
            <p className="text-gray-400">
              No trading alerts available at the moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card
              key={alert.id}
              className="bg-brand-bg-light border-brand-border hover:bg-brand-bg-dark transition-colors"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getAlertIcon(alert.type)}
                    <div>
                      <CardTitle className="text-lg text-white">
                        {alert.symbol}
                      </CardTitle>
                      <CardDescription className="text-gray-400">
                        {alert.type
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={`${getConfidenceColor(
                        alert.confidence
                      )} text-white`}
                    >
                      {alert.confidence}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-brand-border text-gray-300"
                    >
                      {alert.timeframe}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">Action</p>
                    <p
                      className={`font-bold text-lg ${getActionColor(
                        alert.action
                      )}`}
                    >
                      {alert.action}
                    </p>
                  </div>

                  {alert.price && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="font-bold text-lg text-white">
                        ${alert.price.toFixed(2)}
                      </p>
                    </div>
                  )}

                  {alert.target && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400 flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        Target
                      </p>
                      <p className="font-bold text-lg text-green-400">
                        ${alert.target.toFixed(2)}
                      </p>
                    </div>
                  )}

                  {alert.stopLoss && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Stop Loss
                      </p>
                      <p className="font-bold text-lg text-red-400">
                        ${alert.stopLoss.toFixed(2)}
                      </p>
                    </div>
                  )}

                  {alert.strike && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Strike</p>
                      <p className="font-bold text-lg text-white">
                        ${alert.strike}
                      </p>
                    </div>
                  )}

                  {alert.expiry && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Expiry</p>
                      <p className="font-bold text-lg text-white">
                        {alert.expiry}
                      </p>
                    </div>
                  )}

                  {alert.premium && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Premium</p>
                      <p className="font-bold text-lg text-white">
                        ${alert.premium.toFixed(2)}
                      </p>
                    </div>
                  )}

                  {alert.profit && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Profit</p>
                      <p className="font-bold text-lg text-green-400">
                        {alert.profit}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-brand-bg-dark rounded-lg p-4 mb-3">
                  <p className="text-sm text-gray-400 mb-1">Reasoning</p>
                  <p className="text-gray-200">{alert.reasoning}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(alert.timestamp)}
                  </span>
                  <span>Diamond Alert</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
