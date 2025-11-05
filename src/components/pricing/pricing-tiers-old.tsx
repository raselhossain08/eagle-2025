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
import PlanService, { type FrontendPlan } from "@/lib/services/core/plan.service";

// Extended interface for UI compatibility
interface TierData {
  _id?: string;
  name: string;
  displayName: string;
  description: string;
  price?: string;
  originalPrice?: string | null;
  annualPrice?: string;
  annualOriginalPrice?: string | null;
  features: string[];
  icon?: any;
  gradient?: string;
  cta?: string;
  href?: string;
  popular?: boolean;
  discount?: string | null;
  annualDiscount?: string | null;
  isInfinity?: boolean;
  category: string;
  sortOrder: number;
  isPopular?: boolean;
  pricing?: any;
  ui?: any;
}

export function PricingTiers() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [plans, setPlans] = useState<TierData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { profile } = useAuth();

  // Fetch plans from backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch subscription plans from backend
        const subscriptionPlans = await PlanService.getSubscriptionPlans();
        
        // Transform backend data to match your existing UI expectations
        const transformedPlans: TierData[] = subscriptionPlans.map(plan => {
          // Map backend plan to your existing tier structure
          return {
            _id: plan._id,
            name: plan.name,
            displayName: plan.displayName,
            description: plan.description,
            features: plan.features,
            category: plan.category,
            sortOrder: plan.sortOrder,
            pricing: plan.pricing,
            ui: plan.ui,
            isPopular: plan.isPopular,
            // Add UI properties from backend or use defaults
            icon: plan.ui?.icon === 'diamond' ? Gem : 
                  plan.ui?.icon === 'crown' ? InfinityIcon :
                  plan.ui?.icon === 'infinity' ? InfinityIcon : Zap,
            gradient: plan.ui?.gradient || "from-blue-500 to-purple-600",
            popular: plan.isPopular || false,
            discount: plan.pricing?.monthly?.discount || null,
            annualDiscount: plan.pricing?.annual?.discount || null,
            isInfinity: plan.category === 'infinity',
            // Map pricing
            price: plan.pricing?.monthly?.price ? `$${plan.pricing.monthly.price}` : "Free",
            originalPrice: plan.pricing?.monthly?.originalPrice ? `$${plan.pricing.monthly.originalPrice}` : null,
            annualPrice: plan.pricing?.annual?.price ? `$${plan.pricing.annual.price}` : "Free",
            annualOriginalPrice: plan.pricing?.annual?.originalPrice ? `$${plan.pricing.annual.originalPrice}` : null,
            cta: plan.pricing?.monthly?.price === 0 ? "Get Started Free" : `Start ${plan.displayName}`,
            href: plan.pricing?.monthly?.price === 0 ? "https://pe333tij.sibpages.com" : "/pricing",
          };
        });

        // Sort by sortOrder
        transformedPlans.sort((a, b) => a.sortOrder - b.sortOrder);
        setPlans(transformedPlans);
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('Failed to load plans');
        // Keep existing hardcoded plans as fallback
        setPlans([]);
      } finally {
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

      // Check if subscription is active (either no end date or end date in future)
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

      // Match subscription types
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
      } else if (
        subscriptionType === "mentorship" ||
        subscriptionType === "mentorship-package"
      ) {
        return (
          isActive &&
          (contract.productType === "mentorship-package" ||
            contract.productType === "eagle-ultimate" ||
            contract.productType === "investment-advising" ||
            contract.productType === "trading-tutor")
        );
      }

      return false;
    });
  // Function to handle subscription purchase
  const handleSubscriptionPurchase = (tier: TierData) => {
    if (tier.name === "basic" || tier.price === "Free") {
      // Free tier - redirect to external signup
      window.open(tier.href || "https://pe333tij.sibpages.com", "_blank");
      return;
    }

    // Check if user already has this subscription
    const tierType = tier.name.toLowerCase();
    if (hasSubscription(tierType)) {
      toast({
        title: "Already Subscribed",
        description: `You already have an active ${tier.name} subscription.`,
        variant: "destructive",
      });
      return;
    }

    // Create cart item for paid subscriptions
    const currentPrice = isAnnual 
      ? (tier.pricing?.annual?.price || parseFloat(tier.annualPrice?.replace('$', '') || '0'))
      : (tier.pricing?.monthly?.price || parseFloat(tier.price?.replace('$', '') || '0'));
      
    const originalPrice = isAnnual 
      ? (tier.pricing?.annual?.originalPrice || parseFloat(tier.annualOriginalPrice?.replace('$', '') || '0'))
      : (tier.pricing?.monthly?.originalPrice || parseFloat(tier.originalPrice?.replace('$', '') || '0'));

    const subscriptionItem = {
      id: tier.name.toLowerCase(),
      name: `${tier.displayName} ${isAnnual ? "Annual" : "Monthly"} Subscription`,
      price: currentPrice,
      originalPrice: originalPrice || currentPrice,
      memberPrice: currentPrice,
      quantity: 1,
      subscriptionType: isAnnual ? "yearly" : "monthly",
      productType: tier.category,
    };

    // Save to localStorage and navigate to checkout
    localStorage.setItem("cart", JSON.stringify([subscriptionItem]));

    toast({
      title: "Added to Cart",
      description: `${subscriptionItem.name} has been added to your cart`,
    });

    router.push("/checkout");
  };

  // Use dynamic plans or fallback to hardcoded for demo
  const tiers: TierData[] = plans.length > 0 ? plans : [
    {
      name: "Basic",
      displayName: "Basic Plan",
      price: "Free",
      originalPrice: null,
      annualPrice: "Free",
      annualOriginalPrice: null,
      description: "Educational resources and basic market information",
      icon: Zap,
      gradient: "from-gray-500 to-slate-600",
      features: [
        "Market education content",
        "Chatroom for Free Users",
        "Basic market updates",
        "Email support",
      ],
      cta: "Get Started Free",
      href: "https://pe333tij.sibpages.com",
      popular: false,
      discount: null,
      annualDiscount: null,
      isInfinity: false,
      category: "basic",
      sortOrder: 1,
      isPopular: false,
    },
    {
      name: "Diamond",
      displayName: "Diamond Plan", 
      price: "$76",
      originalPrice: "$97",
      annualPrice: "$760",
      annualOriginalPrice: "$1,164",
      description: "Professional services for active investors",
      icon: Gem,
      gradient: "from-blue-500 to-purple-600",
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
      cta: "Start Diamond Service",
      href: "/pricing",
      popular: true,
      discount: "21%",
      annualDiscount: "35%",
      isInfinity: false,
      category: "diamond",
      sortOrder: 2,
      isPopular: true,
    },
    {
      name: "Infinity",
      displayName: "Infinity Plan",
      price: "$127",
      originalPrice: "$187",
      annualPrice: "$1,270",
      annualOriginalPrice: "$2,244",
      description: "Comprehensive investment service with advanced tools",
      icon: InfinityIcon,
      gradient: "from-yellow-400 to-amber-600",
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
      cta: "Start Infinity Service",
      href: "/pricing",
      popular: false,
      discount: "32%",
      annualDiscount: "43%",
      isInfinity: true,
      category: "infinity",
      sortOrder: 3,
      isPopular: false,
    },
  ];

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

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mx-auto mb-4" />
              <p className="text-gray-300 text-lg">Loading pricing plans...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-red-400" />
              </div>
              <p className="text-gray-300 text-lg mb-4">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        {!isLoading && !error && (
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {tiers.map((tier, index) => (
            <div key={index} className="relative group">
              {tier.popular &&
                !tier.isInfinity && ( // Ensure popular badge doesn't overlap with Infinity's special styling if it's also popular
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
              {tier.isInfinity && ( // Special "PREMIUM" badge for Infinity
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg shadow-yellow-500/30">
                    PREMIUM
                  </div>
                </div>
              )}

              <Card
                className={`relative my-box2
                ${
                  tier.popular && !tier.isInfinity
                    ? "ring-2 ring-cyan-400/50 shadow-2xl shadow-cyan-500/20"
                    : ""
                }
                ${
                  tier.isInfinity
                    ? "ring-2 ring-yellow-400 shadow-2xl shadow-yellow-500/30 border-yellow-400/70"
                    : "hover:border-cyan-500/50"
                }`}
              >
                <CardHeader className="text-center pb-8 pt-12">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${tier.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <tier.icon
                      className={`w-10 h-10 ${
                        tier.isInfinity ? "text-white" : "text-white"
                      }`}
                    />
                  </div>
                  <CardTitle
                    className={`text-3xl font-bold mb-2 ${
                      tier.isInfinity ? "text-yellow-400" : "text-white"
                    }`}
                  >
                    {tier.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg">
                    {tier.description}
                  </CardDescription>

                  <div className="mt-6">
                    <div className="flex flex-col items-center space-y-2">
                      {/* Current Price */}
                      <div className="flex items-baseline space-x-2">
                        <span
                          className={`text-5xl font-bold ${
                            tier.isInfinity ? "text-yellow-400" : "text-white"
                          }`}
                        >
                          {isAnnual ? tier.annualPrice : tier.price}
                        </span>
                        {tier.price !== "Free" && (
                          <span className="text-gray-300 text-xl">
                            {isAnnual ? "/year" : "/month"}
                          </span>
                        )}
                      </div>

                      {/* Original Price & Discount */}
                      {tier.price !== "Free" && (
                        <div className="flex flex-col items-center space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-400 text-lg line-through">
                              {isAnnual
                                ? tier.annualOriginalPrice
                                : tier.originalPrice}
                              {isAnnual ? "/year" : "/month"}
                            </span>
                          </div>
                          <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                            Save{" "}
                            {isAnnual ? tier.annualDiscount : tier.discount}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow justify-between space-y-8 pb-8">
                  <ul className="space-y-4 flex-grow">
                    {tier.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <div
                          className={`w-6 h-6 bg-gradient-to-br ${
                            tier.isInfinity
                              ? "from-yellow-400 to-amber-600"
                              : "from-cyan-500 to-blue-600"
                          } rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}
                        >
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 leading-relaxed">
                          {feature}
                          {(feature.includes("VIP") ||
                            feature.includes("Advanced market screening")) && (
                            <span className="block text-gray-400 text-xs mt-1 italic">
                              Refers to tools and services designed to support
                              experienced investors. These features do not
                              guarantee superior results.
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => handleSubscriptionPurchase(tier)}
                    disabled={
                      tier.name !== "basic" && tier.price !== "Free" &&
                      hasSubscription(tier.category.toLowerCase())
                    }
                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 
                    ${
                      tier.name !== "basic" && tier.price !== "Free" &&
                      hasSubscription(tier.category.toLowerCase())
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-not-allowed opacity-80"
                        : tier.isInfinity
                        ? "bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-slate-900 shadow-lg hover:shadow-yellow-500/40 font-bold"
                        : tier.popular
                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25"
                        : "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white"
                    }`}
                  >
                    {tier.name !== "basic" && tier.price !== "Free" &&
                    hasSubscription(tier.category.toLowerCase())
                      ? `Active: ${tier.displayName} Subscription`
                      : tier.cta}
                  </Button>
                </CardContent>
              </Card>
            </div>
            ))}
          </div>
        )}

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
