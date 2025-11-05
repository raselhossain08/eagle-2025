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
import { Check, Zap, Star, Gem, InfinityIcon, Crown, Sparkles } from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/authContext";
import PlanService, { FrontendPlan } from "@/lib/services/core/plan.service";

// Icon mapping for different plan types
const iconMap = {
  zap: Zap,
  star: Star,
  gem: Gem,
  infinity: InfinityIcon,
  crown: Crown,
  sparkles: Sparkles,
  diamond: Gem,
  basic: Zap,
  ultimate: Crown,
};

export function PricingTiers() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [plans, setPlans] = useState<FrontendPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { profile } = useAuth();

  // Load subscription plans from the API
  useEffect(() => {
    const loadPlans = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const subscriptionPlans = await PlanService.getSubscriptionPlans();
        
        // Sort plans by sortOrder and ensure they're active
        const activePlans = subscriptionPlans
          .filter(plan => plan.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder);
        
        setPlans(activePlans);
      } catch (err: any) {
        console.error('Error loading plans:', err);
        setError('Failed to load pricing plans. Please try again later.');
        
        // Fallback to empty array or could use hardcoded plans
        setPlans([]);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  // Check if user has a specific subscription type
  const hasSubscription = (subscriptionType: string) => {
    if (!profile?.contracts) return false;

    return profile.contracts.some((contract) => {
      const now = new Date();
      const endDate = contract.subscriptionEndDate
        ? new Date(contract.subscriptionEndDate)
        : null;

      // Check if subscription is active
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

      // Match subscription types (flexible matching)
      const planName = subscriptionType.toLowerCase();
      const contractType = (contract.productType || '').toLowerCase();
      
      return isActive && (
        contractType.includes(planName) ||
        contractType === planName ||
        contractType === `${planName}-subscription`
      );
    });
  };

  // Function to handle subscription purchase
  const handleSubscriptionPurchase = (plan: FrontendPlan) => {
    const planName = plan.name.toLowerCase();
    
    // Check for free plans
    const isFree = plan.pricing.monthly?.price === 0 || 
                   plan.pricing.annual?.price === 0 || 
                   plan.pricing.oneTime?.price === 0;
    
    if (isFree) {
      // Free tier - could redirect to signup or handle differently
      if (plan.name.toLowerCase().includes('basic')) {
        window.open("https://pe333tij.sibpages.com", "_blank");
        return;
      }
    }

    // Check if user already has this subscription
    if (hasSubscription(planName)) {
      toast({
        title: "Already Subscribed",
        description: `You already have an active ${plan.displayName} subscription.`,
        variant: "destructive",
      });
      return;
    }

    // Get pricing based on billing cycle
    let price = 0;
    let originalPrice = 0;
    
    if (isAnnual && plan.pricing.annual) {
      price = plan.pricing.annual.price;
      originalPrice = plan.pricing.annual.originalPrice || price;
    } else if (plan.pricing.monthly) {
      price = plan.pricing.monthly.price;
      originalPrice = plan.pricing.monthly.originalPrice || price;
    } else if (plan.pricing.oneTime) {
      price = plan.pricing.oneTime.price;
      originalPrice = plan.pricing.oneTime.originalPrice || price;
    }

    // Create cart item for paid subscriptions
    const subscriptionItem = {
      id: plan._id,
      name: `${plan.displayName} ${isAnnual ? "Annual" : "Monthly"} Subscription`,
      price: price,
      originalPrice: originalPrice,
      memberPrice: plan.pricing.oneTime?.memberPrice || price,
      quantity: 1,
      subscriptionType: isAnnual ? "yearly" : "monthly",
      productType: planName,
    };

    // Save to localStorage and navigate to checkout
    localStorage.setItem("cart", JSON.stringify([subscriptionItem]));

    toast({
      title: "Added to Cart",
      description: `${subscriptionItem.name} has been added to your cart`,
    });

    router.push("/checkout");
  };

  // Helper functions for plan data
  const getPlanPrice = (plan: FrontendPlan, annual: boolean = false) => {
    if (annual && plan.pricing.annual) {
      return plan.pricing.annual.price === 0 ? "Free" : `$${plan.pricing.annual.price}`;
    }
    if (plan.pricing.monthly) {
      return plan.pricing.monthly.price === 0 ? "Free" : `$${plan.pricing.monthly.price}`;
    }
    if (plan.pricing.oneTime) {
      return plan.pricing.oneTime.price === 0 ? "Free" : `$${plan.pricing.oneTime.price}`;
    }
    return "Free";
  };

  const getPlanOriginalPrice = (plan: FrontendPlan, annual: boolean = false) => {
    if (annual && plan.pricing.annual?.originalPrice) {
      return `$${plan.pricing.annual.originalPrice}`;
    }
    if (plan.pricing.monthly?.originalPrice) {
      return `$${plan.pricing.monthly.originalPrice}`;
    }
    if (plan.pricing.oneTime?.originalPrice) {
      return `$${plan.pricing.oneTime.originalPrice}`;
    }
    return null;
  };

  const getPlanDiscount = (plan: FrontendPlan, annual: boolean = false) => {
    const currentPrice = annual && plan.pricing.annual ? plan.pricing.annual.price : 
                        plan.pricing.monthly?.price || plan.pricing.oneTime?.price || 0;
    const originalPrice = annual && plan.pricing.annual?.originalPrice ? plan.pricing.annual.originalPrice :
                         plan.pricing.monthly?.originalPrice || plan.pricing.oneTime?.originalPrice;
    
    if (!originalPrice || originalPrice <= currentPrice) return null;
    
    const discount = Math.round((1 - currentPrice / originalPrice) * 100);
    return `${discount}%`;
  };

  const getPlanIcon = (plan: FrontendPlan) => {
    const iconName = plan.ui.icon?.toLowerCase() || plan.category?.toLowerCase() || 'star';
    return iconMap[iconName as keyof typeof iconMap] || Star;
  };

  const isFree = (plan: FrontendPlan) => {
    return (plan.pricing.monthly?.price || 0) === 0 && 
           (plan.pricing.annual?.price || 0) === 0 && 
           (plan.pricing.oneTime?.price || 0) === 0;
  };

  // Loading state
  if (loading) {
    return (
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Loading Pricing Plans...
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <Card className="my-box2 h-96">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-slate-700 rounded-2xl mx-auto mb-6"></div>
                    <div className="h-8 bg-slate-700 rounded mb-4"></div>
                    <div className="h-4 bg-slate-700 rounded mb-8"></div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-4 bg-slate-700 rounded"></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-300 mb-8">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // No plans available
  if (plans.length === 0) {
    return (
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">No Plans Available</h2>
            <p className="text-gray-300">Please check back later for our subscription plans.</p>
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

          {/* Billing Toggle - Only show if there are annual plans available */}
          {plans.some(plan => plan.pricing.annual) && (
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
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const PlanIcon = getPlanIcon(plan);
            const price = getPlanPrice(plan, isAnnual);
            const originalPrice = getPlanOriginalPrice(plan, isAnnual);
            const discount = getPlanDiscount(plan, isAnnual);
            const isPopular = plan.isPopular;
            const isFeatured = plan.isFeatured;
            const isUltimate = plan.category?.toLowerCase() === 'ultimate' || plan.category?.toLowerCase() === 'infinity';

            return (
              <div key={plan._id} className="relative group">
                {/* Popular Badge */}
                {isPopular && !isUltimate && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Premium Badge for Ultimate/Infinity plans */}
                {isUltimate && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-amber-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg shadow-yellow-500/30">
                      {plan.ui.badgeText || 'PREMIUM'}
                    </div>
                  </div>
                )}

                <Card
                  className={`relative my-box2 ${
                    isPopular && !isUltimate
                      ? "ring-2 ring-cyan-400/50 shadow-2xl shadow-cyan-500/20"
                      : ""
                  } ${
                    isUltimate
                      ? "ring-2 ring-yellow-400 shadow-2xl shadow-yellow-500/30 border-yellow-400/70"
                      : "hover:border-cyan-500/50"
                  }`}
                >
                  <CardHeader className="text-center pb-8 pt-12">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${plan.ui.gradient || 'from-blue-500 to-purple-600'} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <PlanIcon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle
                      className={`text-3xl font-bold mb-2 ${
                        isUltimate ? "text-yellow-400" : "text-white"
                      }`}
                    >
                      {plan.displayName}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      {plan.description}
                    </CardDescription>

                    <div className="mt-6">
                      <div className="flex flex-col items-center space-y-2">
                        {/* Current Price */}
                        <div className="flex items-baseline space-x-2">
                          <span
                            className={`text-5xl font-bold ${
                              isUltimate ? "text-yellow-400" : "text-white"
                            }`}
                          >
                            {price}
                          </span>
                          {price !== "Free" && (
                            <span className="text-gray-300 text-xl">
                              {isAnnual && plan.pricing.annual ? "/year" :
                               plan.pricing.monthly ? "/month" : ""}
                            </span>
                          )}
                        </div>

                        {/* Original Price & Discount */}
                        {originalPrice && price !== "Free" && (
                          <div className="flex flex-col items-center space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-400 text-lg line-through">
                                {originalPrice}
                                {isAnnual && plan.pricing.annual ? "/year" :
                                 plan.pricing.monthly ? "/month" : ""}
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
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <div
                            className={`w-6 h-6 bg-gradient-to-br ${
                              isUltimate
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
                      disabled={
                        !isFree(plan) && hasSubscription(plan.name.toLowerCase())
                      }
                      className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                        !isFree(plan) && hasSubscription(plan.name.toLowerCase())
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-not-allowed opacity-80"
                          : isUltimate
                          ? "bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-yellow-500 hover:to-amber-700 text-slate-900 shadow-lg hover:shadow-yellow-500/40 font-bold"
                          : isPopular
                          ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25"
                          : "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white"
                      }`}
                    >
                      {!isFree(plan) && hasSubscription(plan.name.toLowerCase())
                        ? `Active: ${plan.displayName} Subscription`
                        : isFree(plan)
                        ? "Get Started Free"
                        : `Start ${plan.displayName} Service`}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Free plan promotion - only show if there are free plans */}
        {plans.some(plan => isFree(plan)) && (
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
        )}

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
