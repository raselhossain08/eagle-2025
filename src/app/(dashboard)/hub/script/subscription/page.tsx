"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Zap, Gem, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { mockUser as savedUser } from "@/lib/data/script.data";

const subscriptionTiers = [
  {
    name: "Basic",
    monthlyPrice: "Free",
    annualPrice: "Free",
    originalMonthlyPrice: null,
    originalAnnualPrice: null,
    monthlySavings: null,
    annualSavings: null,
    description: "Educational resources and basic market information",
    icon: Zap,
    iconBg: "bg-gray-600",
    borderColor: "border-gray-600",
    buttonColor: "bg-gray-600 hover:bg-gray-700",
    buttonText: "Downgrade to Eagle Basic",
    isPopular: false,
    isPremium: false,
    glowClass: "",
    features: [
      "Market education content",
      "Chatroom for Free Users",
      "Basic market updates",
      "Email support",
    ],
  },
  {
    name: "Diamond",
    monthlyPrice: "$76",
    annualPrice: "$760",
    originalMonthlyPrice: "$97",
    originalAnnualPrice: "$1,164",
    monthlySavings: "Save 21%",
    annualSavings: "Save 35%",
    description: "Investment services and educational resources*",
    icon: Gem,
    iconBg: "bg-blue-600",
    borderColor: "border-brand-cyan",
    buttonColor: "bg-brand-cyan hover:bg-brand-cyan/90",
    buttonText: "Current Plan",
    isPopular: true,
    isPremium: false,
    glowClass: "shadow-glow-cyan",
    features: [
      "Stock Trades Entry & Exit Alerts",
      "AI Advisor",
      "Option Day Trade Alerts",
      "Option Swing Trades Alerts",
      "24/7 Chat Room (Diamond Chat)",
      "Daily Live Trading Stream (Every Market Day)",
      "Investment Recommendations",
      "Daily & Weekly Watchlists",
      "Unusual Options Activity Cheat Sheet",
      "AI Stock Breakouts",
      "Analyst Grades & Insider Orders",
      "Darkpool and Scalp Ideas",
    ],
  },
  {
    name: "Infinity",
    monthlyPrice: "$127",
    annualPrice: "$1,270",
    originalMonthlyPrice: "$187",
    originalAnnualPrice: "$2,244",
    monthlySavings: "Save 32%",
    annualSavings: "Save 43%",
    description: "Comprehensive investment service with educational tools*",
    icon: Infinity,
    iconBg: "bg-orange-500",
    borderColor: "border-yellow-500",
    buttonColor:
      "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600",
    buttonText: "UPGRADE TO INFINITY NOW",
    isPopular: false,
    isPremium: true,
    glowClass: "shadow-glow-yellow",
    features: [
      "All Diamond features",
      "Advanced market screening (20-25 securities)",
      "Professional Quant Trading Script Access*",
      "Direct Infinity Advisory Tickets",
      "Bi-weekly Eagle Portfolios Review Stream (Recorded)",
      "Priority Challenge SMS Alerts",
      "AI Advisor (Enhanced)",
      "Complete education library",
      "Custom analysis tools",
      "VIP advisory support",
    ],
  },
];

export default function SubscriptionPage() {
  // Change the user subscription from "Diamond" to "None" to represent Eagle Basic
  // Allow subscription to be "None", "Diamond", or "Infinity"
  type SubscriptionType = "None" | "Diamond" | "Infinity";
  const user = { ...savedUser, subscription: "None" as SubscriptionType };
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-white">
          Subscription Management
        </h1>
        <p className="text-gray-400 mb-8">
          Choose the plan that's right for you.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center bg-brand-bg-light rounded-full p-1 border border-brand-border">
          <button
            onClick={() => setIsAnnual(false)}
            className={cn(
              "px-6 py-2 rounded-full text-sm transition-all duration-200",
              !isAnnual
                ? "bg-brand-bg-dark text-white font-bold shadow-sm"
                : "text-gray-300 hover:text-white font-semibold"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={cn(
              "px-6 py-2 rounded-full text-sm transition-all duration-200 relative",
              isAnnual
                ? "bg-gradient-to-r from-brand-cyan to-brand-green text-white font-bold shadow-glow-blue"
                : "text-gray-300 hover:text-white font-semibold"
            )}
          >
            Annual
            {isAnnual && (
              <span className="absolute -top-2 -right-2 bg-brand-green text-white text-xs px-2 py-1 rounded-full">
                Save More
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {subscriptionTiers.map((tier) => {
          const isCurrent =
            (tier.name === "Diamond" && user.subscription === "Diamond") ||
            (tier.name === "Infinity" && user.subscription === "Infinity") ||
            (tier.name === "Basic" && user.subscription === "None");

          const currentPrice = isAnnual ? tier.annualPrice : tier.monthlyPrice;
          const originalPrice = isAnnual
            ? tier.originalAnnualPrice
            : tier.originalMonthlyPrice;
          const savings = isAnnual ? tier.annualSavings : tier.monthlySavings;
          const priceUnit = isAnnual ? "/year" : "/month";

          let buttonText = tier.buttonText;
          if (tier.name === "Basic" && user.subscription === "None") {
            buttonText = "Current Plan";
          } else if (tier.name === "Diamond") {
            buttonText = "UPGRADE TO DIAMOND NOW";
          }

          return (
            <Card
              key={tier.name}
              className={cn(
                "bg-brand-bg-light flex flex-col relative transition-all duration-300 hover:scale-105",
                tier.borderColor,
                "border-2",
                tier.glowClass
              )}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-brand-cyan text-white px-4 py-1 rounded-full text-sm font-semibold shadow-glow-cyan">
                    Most Popular
                  </div>
                </div>
              )}
              {tier.isPremium && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold shadow-glow-yellow">
                    PREMIUM
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div
                  className={cn(
                    "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center",
                    tier.iconBg
                  )}
                >
                  <tier.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">
                  {tier.name}
                </CardTitle>
                <CardDescription className="text-gray-400 text-sm px-2">
                  {tier.description}
                </CardDescription>
                <div className="pt-4">
                  <div className="text-4xl font-bold text-white">
                    {currentPrice}
                    {currentPrice !== "Free" && (
                      <span className="text-lg font-normal text-gray-400">
                        {priceUnit}
                      </span>
                    )}
                  </div>
                  {originalPrice && (
                    <div className="text-gray-500 line-through text-sm">
                      {originalPrice}
                      {priceUnit}
                    </div>
                  )}
                  {savings && (
                    <div className="text-green-400 text-sm font-semibold mt-1">
                      {savings}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-grow px-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {tier.name === "Infinity" && (
                  <p className="text-xs text-gray-500 mt-4 italic">
                    Refers to tools and services designed to support experienced
                    investors. These features do not guarantee superior results.
                  </p>
                )}
              </CardContent>

              <CardFooter className="pt-6">
                {isCurrent ? (
                  <Button
                    disabled
                    variant="outline"
                    className="w-full bg-brand-bg-dark border-brand-border text-white"
                  >
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    className={cn(
                      "w-full text-white font-bold transition-all duration-200 hover:scale-105",
                      tier.buttonColor
                    )}
                  >
                    {buttonText}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Separator className="bg-brand-border" />

      {/* Remove the entire Card with "Downgrade Subscription" content and replace with: */}
      <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 shadow-glow-yellow">
        <CardContent className="p-0">
          <a
            href="https://discord.gg/eagleinvestors"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/JoinDiscord.png"
              alt="Join the Eagle Investors Discord Community"
              className="w-full h-auto object-cover rounded-lg"
            />
          </a>
          <div className="p-6">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
              🎉 FREE Discord Trial Access!
            </h3>
            <div className="space-y-4">
              <div className="bg-brand-bg-dark/50 rounded-xl p-4 border border-yellow-500/20">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="text-yellow-400">💎</span>
                  Diamond Discord Features - FREE Trial
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• AI Advisor access in Discord</li>
                  <li>• Diamond Chat Room access</li>
                  <li>• Live trading stream notifications</li>
                  <li>• Daily watchlists and alerts</li>
                </ul>
              </div>
              <div className="bg-brand-bg-dark/50 rounded-xl p-4 border border-yellow-500/20">
                <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                  <span className="text-yellow-400">♾️</span>
                  Infinity Discord Features - FREE Trial
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    • <strong>ALL DIAMOND FEATURES +</strong>
                  </li>
                  <li>• Advanced Market Screening (20-25 Securities)</li>
                  <li>• Unusual Option Activity Alerts</li>
                  <li>• Priority Challenge Accounts</li>
                  <li>• Direct Infinity Advisory Tickets</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm mb-4">
                Join our Discord community of 150,000+ traders and get FREE
                trial access to premium features!
              </p>
              <a
                href="https://discord.gg/eagleinvestors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold text-lg px-8 py-3 shadow-glow-yellow transition-all duration-200 hover:scale-105">
                  Join Discord Community - FREE Trials!
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
