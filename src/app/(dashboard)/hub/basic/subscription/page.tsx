"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Zap, Gem, Infinity, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { SubscriptionContractModal } from "@/components/subscription/subscription-contract-modal";
import { getPublicPlans, type Plan } from "@/lib/services/api/plan";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

// Dynamic subscription tiers interface
interface SubscriptionTier {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  originalMonthlyPrice: string | null;
  originalAnnualPrice: string | null;
  monthlySavings: string | null;
  annualSavings: string | null;
  description: string;
  icon: any;
  iconBg: string;
  borderColor: string;
  buttonColor: string;
  buttonText: string;
  isPopular: boolean;
  isPremium: boolean;
  glowClass: string;
  features: string[];
}

// Dynamic subscription tiers loaded from API
let subscriptionTiers: SubscriptionTier[] = [];

export default function SubscriptionPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<
    "diamond" | "infinity"
  >("diamond");
  const [plansLoading, setPlansLoading] = useState(true);

  // Initialize subscription tiers from API
  useEffect(() => {
    const initializeSubscriptionTiers = async () => {
      try {
        setPlansLoading(true);
        const plans = await getPublicPlans();
        const subscriptionPlans = plans
          .filter((plan) => plan.planType === "subscription" && plan.isActive)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));

        subscriptionTiers = subscriptionPlans.map((plan: Plan) => {
          const isBasic = plan.category === "basic";
          const isDiamond = plan.category === "diamond";
          const isInfinity = plan.category === "infinity";

          const monthlyPricing = plan.pricing?.monthly;
          const yearlyPricing = plan.pricing?.yearly;

          return {
            name: plan.displayName || plan.name,
            monthlyPrice:
              typeof monthlyPricing === "number"
                ? `$${monthlyPricing}`
                : (monthlyPricing as any)?.price
                ? `$${(monthlyPricing as any).price}`
                : "Free",
            annualPrice:
              typeof yearlyPricing === "number"
                ? `$${yearlyPricing}`
                : (yearlyPricing as any)?.price
                ? `$${(yearlyPricing as any).price}`
                : "Free",
            originalMonthlyPrice:
              typeof monthlyPricing === "object" &&
              (monthlyPricing as any)?.originalPrice
                ? `$${(monthlyPricing as any).originalPrice}`
                : null,
            originalAnnualPrice:
              typeof yearlyPricing === "object" &&
              (yearlyPricing as any)?.originalPrice
                ? `$${(yearlyPricing as any).originalPrice}`
                : null,
            monthlySavings:
              typeof monthlyPricing === "object"
                ? (monthlyPricing as any)?.discount || null
                : null,
            annualSavings:
              typeof yearlyPricing === "object"
                ? (yearlyPricing as any)?.discount || null
                : null,
            description: plan.description || "Professional investment service",
            icon: isBasic ? Zap : isDiamond ? Gem : Infinity,
            iconBg: isBasic
              ? "bg-gray-600"
              : isDiamond
              ? "bg-blue-600"
              : "bg-orange-500",
            borderColor: isBasic
              ? "border-gray-600"
              : isDiamond
              ? "border-brand-cyan"
              : "border-yellow-500",
            buttonColor: isBasic
              ? "bg-gray-600 hover:bg-gray-700"
              : isDiamond
              ? "bg-brand-cyan hover:bg-brand-cyan/90"
              : "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600",
            buttonText: isBasic
              ? "Current Plan"
              : isDiamond
              ? "UPGRADE TO DIAMOND NOW"
              : "UPGRADE TO INFINITY NOW",
            isPopular: plan.isPopular || isDiamond,
            isPremium: isInfinity,
            glowClass: isDiamond
              ? "shadow-glow-cyan"
              : isInfinity
              ? "shadow-glow-yellow"
              : "",
            features: plan.features || [],
          };
        });
      } catch (error) {
        console.error("Failed to fetch subscription tiers:", error);
        toast({
          title: "Error",
          description: "Failed to load subscription plans",
          variant: "destructive",
        });
      } finally {
        setPlansLoading(false);
      }
    };

    initializeSubscriptionTiers();
  }, []);

  if (plansLoading) {
    return (
      <div className="min-h-screen bg-brand-bg-dark flex items-center justify-center">
        <Card className="bg-brand-bg-light border-brand-border p-8 text-center">
          <div className="flex items-center gap-3 justify-center mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
            <span className="text-white text-lg">
              Loading subscription plans...
            </span>
          </div>
        </Card>
      </div>
    );
  }

  const handleUpgradeClick = (packageType: "diamond" | "infinity") => {
    setSelectedPackage(packageType);
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsModalOpen(false);
    toast({
      title: "Success!",
      description: "Subscription upgraded successfully!",
    });
  };

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
          const isCurrent = tier.name === "Basic"; // Currently on Basic/Free tier

          const currentPrice = isAnnual ? tier.annualPrice : tier.monthlyPrice;
          const originalPrice = isAnnual
            ? tier.originalAnnualPrice
            : tier.originalMonthlyPrice;
          const savings = isAnnual ? tier.annualSavings : tier.monthlySavings;
          const priceUnit = isAnnual ? "/year" : "/month";

          let buttonText = tier.buttonText;
          let isDowngrade = false;

          if (tier.name === "Basic") {
            buttonText = "Current Plan";
          } else if (tier.name === "Diamond") {
            buttonText = "UPGRADE TO DIAMOND NOW";
          } else if (tier.name === "Infinity") {
            buttonText = "UPGRADE TO INFINITY NOW";
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
                ) : isDowngrade ? (
                  <Button
                    variant="outline"
                    className="w-full border-yellow-600 text-yellow-400 hover:bg-yellow-700/20 hover:text-yellow-300"
                    onClick={() => {
                      // Handle downgrade logic here
                      alert(
                        "Downgrade functionality coming soon! Please contact support for downgrades."
                      );
                    }}
                  >
                    {buttonText}
                  </Button>
                ) : (
                  <Button
                    className={cn(
                      "w-full text-white font-bold transition-all duration-200 hover:scale-105",
                      tier.buttonColor
                    )}
                    onClick={() =>
                      handleUpgradeClick(
                        tier.name.toLowerCase() as "diamond" | "infinity"
                      )
                    }
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
      <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 shadow-glow-yellow bg-transparent">
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

      {/* Subscription Contract Modal */}
      <SubscriptionContractModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subscriptionType={isAnnual ? "yearly" : "monthly"}
        packageType={selectedPackage}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
