"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Zap, Star, Gem, InfinityIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import PlanService, {
  type FrontendPlan,
} from "@/lib/services/core/plan.service";

// Icon mapping for dynamic icons
const iconMapping: Record<string, any> = {
  star: Star,
  zap: Zap,
  gem: Gem,
  crown: InfinityIcon,
  infinity: InfinityIcon,
  diamond: Gem,
};

interface DynamicPlan extends FrontendPlan {
  // Add UI-specific properties for rendering
  iconComponent?: any;
  displayPrice?: string;
  displayOriginalPrice?: string | null;
  displayAnnualPrice?: string;
  displayAnnualOriginalPrice?: string | null;
  cta?: string;
  href?: string;
}

export function PricingTiers() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [plans, setPlans] = useState<DynamicPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { profile } = useAuth();

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      const loadingTimeout = setTimeout(() => {
        if (isLoading) {
          console.warn("Plans API taking longer than expected...");
        }
      }, 5000);

      try {
        setIsLoading(true);
        setError(null);

        // Fetch subscription plans from backend with timeout
        const subscriptionPlans = await PlanService.getSubscriptionPlans();

        // Transform backend data for UI
        const transformedPlans: DynamicPlan[] = subscriptionPlans.map(
          (plan) => ({
            ...plan,
            iconComponent: iconMapping[plan.ui?.icon] || Star,
            displayPrice:
              plan.pricing?.monthly?.price === 0
                ? "Free"
                : `$${plan.pricing?.monthly?.price}`,
            displayOriginalPrice: plan.pricing?.monthly?.originalPrice
              ? `$${plan.pricing.monthly.originalPrice}`
              : null,
            displayAnnualPrice:
              plan.pricing?.annual?.price === 0
                ? "Free"
                : `$${plan.pricing?.annual?.price}`,
            displayAnnualOriginalPrice: plan.pricing?.annual?.originalPrice
              ? `$${plan.pricing.annual.originalPrice}`
              : null,
            cta:
              plan.pricing?.monthly?.price === 0
                ? "Get Started Free"
                : `Start ${plan.displayName}`,
            href:
              plan.pricing?.monthly?.price === 0
                ? "https://pe333tij.sibpages.com"
                : "/pricing",
          })
        );

        // Sort by sortOrder
        transformedPlans.sort((a, b) => a.sortOrder - b.sortOrder);
        setPlans(transformedPlans);
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError("Unable to load pricing plans at this time");

        // Use fallback static plans for production reliability
        const fallbackPlans: DynamicPlan[] = [
          {
            _id: "basic-fallback",
            name: "basic",
            displayName: "Basic Plan",
            description: "Educational resources and basic market information",
            planType: "subscription",
            category: "basic",
            pricing: {
              monthly: { price: 0, originalPrice: 0 },
              annual: { price: 0, originalPrice: 0 },
            },
            features: [
              "Market education content",
              "Chatroom for Free Users",
              "Basic market updates",
              "Email support",
            ],
            ui: {
              icon: "star",
              gradient: "from-gray-500 to-slate-600",
              color: "gray",
              badgeText: "Free",
              badgeColor: "gray",
            },
            isActive: true,
            isPopular: false,
            isRecommended: false,
            isFeatured: false,
            sortOrder: 1,
            accessLevel: 1,
            tags: ["free", "basic"],
            iconComponent: Star,
            displayPrice: "Free",
            displayAnnualPrice: "Free",
            cta: "Get Started Free",
            href: "https://pe333tij.sibpages.com",
          },
          {
            _id: "diamond-fallback",
            name: "diamond",
            displayName: "Diamond Plan",
            description: "Professional services for active investors",
            planType: "subscription",
            category: "diamond",
            pricing: {
              monthly: { price: 76, originalPrice: 97 },
              annual: { price: 760, originalPrice: 1164 },
            },
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
            ui: {
              icon: "diamond",
              gradient: "from-blue-500 to-purple-600",
              color: "blue",
              badgeText: "Most Popular",
              badgeColor: "blue",
            },
            isActive: true,
            isPopular: true,
            isRecommended: true,
            isFeatured: false,
            sortOrder: 2,
            accessLevel: 2,
            tags: ["premium", "trading"],
            iconComponent: Gem,
            displayPrice: "$76",
            displayOriginalPrice: "$97",
            displayAnnualPrice: "$760",
            displayAnnualOriginalPrice: "$1,164",
            cta: "Start Diamond Service",
            href: "/pricing",
          },
          {
            _id: "infinity-fallback",
            name: "infinity",
            displayName: "Infinity Plan",
            description: "Comprehensive investment service with advanced tools",
            planType: "subscription",
            category: "infinity",
            pricing: {
              monthly: { price: 127, originalPrice: 187 },
              annual: { price: 1270, originalPrice: 2244 },
            },
            features: [
              "All Diamond features",
              "Advanced market screening (20-25 securities)",
              "Professional Quant Trading Script Access",
              "Direct Infinity Advisory Tickets",
              "Bi-weekly Eagle Portfolios Review Stream (Recorded)",
              "Priority Challenge SMS Alerts",
              "AI Advisor (Enhanced)",
              "Complete education library",
              "Custom analysis tools",
              "VIP advisory support",
            ],
            ui: {
              icon: "infinity",
              gradient: "from-yellow-400 to-amber-600",
              color: "yellow",
              badgeText: "PREMIUM",
              badgeColor: "orange",
            },
            isActive: true,
            isPopular: false,
            isRecommended: false,
            isFeatured: true,
            sortOrder: 3,
            accessLevel: 3,
            tags: ["enterprise", "premium"],
            iconComponent: InfinityIcon,
            displayPrice: "$127",
            displayOriginalPrice: "$187",
            displayAnnualPrice: "$1,270",
            displayAnnualOriginalPrice: "$2,244",
            cta: "Start Infinity Service",
            href: "/pricing",
          },
        ];
        setPlans(fallbackPlans);
      } finally {
        clearTimeout(loadingTimeout);
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Check if user has a specific subscription type
  const hasSubscription = (subscriptionType: string) => {
    if (!profile?.contracts) return false;

    return profile.contracts.some((contract) => {
      const now = new Date();
      const endDate = contract.subscriptionEndDate
        ? new Date(contract.subscriptionEndDate)
        : null;

      let isActive = true;
      if (contract.status === "completed" && endDate) {
        isActive = endDate > now;
      } else {
        isActive =
          contract.status === "active" ||
          contract.status === "completed" ||
          contract.status === "signed" ||
          contract.status === "payment_pending";
      }

      if (subscriptionType === "diamond") {
        return (
          isActive &&
          (contract.productType === "diamond-subscription" ||
            contract.productType === "diamond")
        );
      } else if (subscriptionType === "infinity") {
        return (
          isActive &&
          (contract.productType === "infinity-subscription" ||
            contract.productType === "infinity")
        );
      } else if (subscriptionType === "basic") {
        return (
          isActive &&
          (contract.productType === "basic-subscription" ||
            contract.productType === "basic")
        );
      }

      return false;
    });
  };

  // Handle subscription purchase
  const handleSubscriptionPurchase = (plan: DynamicPlan) => {
    if (plan.name === "basic" || plan.displayPrice === "Free") {
      window.open(plan.href || "https://pe333tij.sibpages.com", "_blank");
      return;
    }

    // Check if user already has this subscription
    if (hasSubscription(plan.category)) {
      toast({
        title: "Already Subscribed",
        description: `You already have an active ${plan.displayName} subscription.`,
        variant: "destructive",
      });
      return;
    }

    // Create cart item for paid subscriptions
    const currentPrice = isAnnual
      ? plan.pricing?.annual?.price || 0
      : plan.pricing?.monthly?.price || 0;

    const originalPrice = isAnnual
      ? plan.pricing?.annual?.originalPrice || currentPrice
      : plan.pricing?.monthly?.originalPrice || currentPrice;

    console.log("🗑️ Clearing previous cart and discount data...");

    // ✅ Clear previous cart and discount data before adding new subscription
    localStorage.removeItem("cart");
    localStorage.removeItem("checkout_discount");
    document.cookie =
      "discount_code=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "discount_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    const subscriptionItem = {
      id: plan.name,
      name: `${plan.displayName} ${
        isAnnual ? "Annual" : "Monthly"
      } Subscription`,
      price: currentPrice,
      originalPrice: originalPrice,
      memberPrice: currentPrice,
      quantity: 1,
      subscriptionType: isAnnual ? "yearly" : "monthly",
      productType: plan.category,
    };

    localStorage.setItem("cart", JSON.stringify([subscriptionItem]));

    console.log("✅ Cart updated with new subscription:", subscriptionItem);

    toast({
      title: "Added to Cart",
      description: `${subscriptionItem.name} has been added to your cart`,
    });

    router.push("/checkout");
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Loading pricing plans...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-slate-900 py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold uppercase tracking-wide text-sm">
              Advisory Plans
            </span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Choose Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Advisory Service
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select the appropriate advisory service level to match your
            investment objectives and receive professional guidance tailored to
            your needs.
          </p>
          <p className="text-gray-400 text-sm mt-4 italic">
            Service tiers provide access to expanded features and tools but do
            not guarantee improved investment performance.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mt-12 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-600/50">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    !isAnnual
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                    isAnnual
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  Annual
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Save More
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="text-center mb-8">
            <p className="text-amber-400 text-sm">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.iconComponent;
            const hasActiveSubscription = hasSubscription(plan.category);
            const isInfinity = plan.category === "infinity";
            const currentPrice = isAnnual
              ? plan.displayAnnualPrice
              : plan.displayPrice;
            const originalPrice = isAnnual
              ? plan.displayAnnualOriginalPrice
              : plan.displayOriginalPrice;
            const discount = isAnnual
              ? plan.pricing?.annual?.discount
              : plan.pricing?.monthly?.discount;

            return (
              <div key={plan._id} className="relative group">
                {plan.isPopular && !isInfinity && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {plan.ui?.badgeText || "Most Popular"}
                    </div>
                  </div>
                )}
                {isInfinity && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg shadow-yellow-500/30">
                      {plan.ui?.badgeText || "PREMIUM"}
                    </div>
                  </div>
                )}

                <Card
                  className={`relative my-box2 hover:scale-105 transition-transform duration-300
                  ${
                    plan.isPopular && !isInfinity
                      ? "ring-2 ring-cyan-400/50 shadow-2xl shadow-cyan-500/20"
                      : ""
                  }
                  ${
                    isInfinity
                      ? "ring-2 ring-yellow-400 shadow-2xl shadow-yellow-500/30 border-yellow-400/70"
                      : "hover:border-cyan-500/50"
                  }`}
                >
                  <CardHeader className="text-center pb-8 pt-12">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${plan.ui?.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`w-10 h-10 text-white`} />
                    </div>
                    <CardTitle
                      className={`text-3xl font-bold mb-2 ${
                        isInfinity ? "text-yellow-400" : "text-white"
                      }`}
                    >
                      {plan.displayName}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      {plan.description}
                    </CardDescription>

                    <div className="mt-6">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="flex items-baseline space-x-2">
                          <span
                            className={`text-5xl font-bold ${
                              isInfinity ? "text-yellow-400" : "text-white"
                            }`}
                          >
                            {currentPrice}
                          </span>
                          {currentPrice !== "Free" && (
                            <span className="text-gray-300 text-xl">
                              {isAnnual ? "/year" : "/month"}
                            </span>
                          )}
                        </div>

                        {originalPrice && originalPrice !== currentPrice && (
                          <div className="flex flex-col items-center space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400 text-lg line-through">
                                {originalPrice}
                                {isAnnual ? "/year" : "/month"}
                              </span>
                            </div>
                            {discount && (
                              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                                Save {discount}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow justify-between space-y-8 pb-8">
                    <ul className="space-y-4 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start space-x-3"
                        >
                          <div
                            className={`w-6 h-6 bg-gradient-to-br ${
                              isInfinity
                                ? "from-yellow-400 to-amber-600"
                                : "from-cyan-500 to-blue-600"
                            } rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                          >
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-300 leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleSubscriptionPurchase(plan)}
                      disabled={hasActiveSubscription}
                      className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 
                      ${
                        hasActiveSubscription
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-not-allowed opacity-80"
                          : isInfinity
                          ? "bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-slate-900 shadow-lg hover:shadow-yellow-500/40 font-bold"
                          : plan.isPopular
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25"
                          : "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white"
                      }`}
                    >
                      {hasActiveSubscription
                        ? `Active: ${plan.displayName} Subscription`
                        : plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/50 max-w-2xl mx-auto">
            <p className="text-gray-300 mb-6 text-lg">
              New to Eagle Investors? Start with our free Basic plan and explore
              our platform risk-free.
            </p>
            <Link href="https://pe333tij.sibpages.com" target="_blank">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Start Free with Eagle Basic
              </Button>
            </Link>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-12 bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <p className="text-gray-400 text-sm text-center">
            <strong className="text-white">
              Investment Advisory Disclosure:
            </strong>{" "}
            Advisory services involve risk and may not be suitable for all
            investors. Fees and expenses will reduce returns. Please review our{" "}
            <Link
              href="/disclosures"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              Form ADV
            </Link>{" "}
            and other disclosures before engaging our services. Past performance
            does not guarantee future results.
          </p>
        </div>
      </div>
    </section>
  );
}
