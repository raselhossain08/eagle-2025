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
import {
  CheckCircle,
  AlertTriangle,
  Zap,
  Gem,
  Infinity,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import { getPublicPlans, formatPlanPrice, Plan } from "@/lib/services/api/plan";
import { updateSubscription } from "@/lib/services/api/subscription";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { SubscriptionContractModal } from "@/components/subscription/subscription-contract-modal";

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
  const { profile, refreshProfile } = useAuth();
  const [isAnnual, setIsAnnual] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<
    "basic" | "diamond" | "infinity"
  >("diamond");
  const [plansLoading, setPlansLoading] = useState(true);

  // Initialize subscription tiers from API
  useEffect(() => {
    const initializeSubscriptionTiers = async () => {
      try {
        setPlansLoading(true);
        const plans = await getPublicPlans();
        const subscriptionPlans = plans.filter(plan => plan.planType === 'subscription' && plan.isActive)
                                       .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0));
        
        subscriptionTiers = subscriptionPlans.map((plan: Plan) => {
          const isBasic = plan.category === 'basic';
          const isDiamond = plan.category === 'diamond';
          const isInfinity = plan.category === 'infinity';
          
          return {
            name: plan.displayName || plan.name,
            monthlyPrice: plan.pricing?.monthly?.price ? `$${plan.pricing.monthly.price}` : 
                         plan.pricing?.monthly ? `$${plan.pricing.monthly}` : 'Free',
            annualPrice: plan.pricing?.annual?.price ? `$${plan.pricing.annual.price}` : 
                        plan.pricing?.yearly ? `$${plan.pricing.yearly}` : 'Free',
            originalMonthlyPrice: plan.pricing?.monthly?.originalPrice ? `$${plan.pricing.monthly.originalPrice}` : null,
            originalAnnualPrice: plan.pricing?.annual?.originalPrice ? `$${plan.pricing.annual.originalPrice}` : null,
            monthlySavings: plan.pricing?.monthly?.savings ? `Save $${plan.pricing.monthly.savings}` : null,
            annualSavings: plan.pricing?.annual?.savings ? `Save $${plan.pricing.annual.savings}` : null,
            description: plan.description || "Professional investment service",
            icon: isBasic ? Zap : isDiamond ? Gem : Infinity,
            iconBg: isBasic ? "bg-gray-600" : isDiamond ? "bg-blue-600" : "bg-orange-500",
            borderColor: isBasic ? "border-gray-600" : isDiamond ? "border-brand-cyan" : "border-yellow-500",
            buttonColor: isBasic ? "bg-gray-600 hover:bg-gray-700" : 
                         isDiamond ? "bg-brand-cyan hover:bg-brand-cyan/90" :
                         "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600",
            buttonText: isDiamond ? "Current Plan" : 
                       isBasic ? "Downgrade to Basic" : 
                       "UPGRADE NOW",
            isPopular: plan.isPopular || false,
            isPremium: isInfinity,
            glowClass: isDiamond ? "shadow-glow-cyan" : isInfinity ? "shadow-glow-yellow" : "",
            features: plan.features || [],
          };
        });
      } catch (error) {
        console.error('Failed to fetch subscription tiers:', error);
        // Fallback static data
        subscriptionTiers = [
          {
            name: "Diamond",
            monthlyPrice: "Contact",
            annualPrice: "Contact",
            originalMonthlyPrice: null,
            originalAnnualPrice: null,
            monthlySavings: null,
            annualSavings: null,
            description: "Professional investment service",
            icon: Gem,
            iconBg: "bg-blue-600",
            borderColor: "border-brand-cyan",
            buttonColor: "bg-brand-cyan hover:bg-brand-cyan/90",
            buttonText: "Current Plan",
            isPopular: true,
            isPremium: false,
            glowClass: "shadow-glow-cyan",
            features: ["Contact us for current features"],
          }
        ];
      } finally {
        setPlansLoading(false);
      }
    };

    initializeSubscriptionTiers();
  }, []);

  if (!profile || plansLoading) {
    return (
      <div className="min-h-screen bg-brand-bg-dark flex items-center justify-center">
        <Card className="bg-brand-bg-light border-brand-border p-8 text-center">
          <div className="flex items-center gap-3 justify-center mb-4">
            <Loader2 className="w-6 h-6 animate-spin text-brand-primary" />
            <span className="text-white font-semibold">
              {!profile ? "Loading profile..." : "Loading subscription plans..."}
            </span>
          </div>
        </Card>
      </div>
    );
  }

  // Convert profile to user format
  const user = {
    name: `${profile.firstName} ${profile.lastName}`,
    email: profile.email,
    avatarUrl: "/placeholder-user.jpg",
    subscription: profile.subscription as
      | "Diamond"
      | "Infinity"
      | "None"
      | "Basic"
      | "Script",
  };

  const handleSubscriptionUpdate = async (
    newSubscription: "None" | "Basic" | "Diamond" | "Infinity" | "Script"
  ) => {
    if (newSubscription === user.subscription) return;

    // Check if this is an upgrade to a paid tier
    const paidTiers = ["Diamond", "Infinity", "Script"];
    const currentTier = user.subscription;
    const isUpgrade =
      paidTiers.includes(newSubscription) &&
      (currentTier === "None" ||
        currentTier === "Basic" ||
        (currentTier === "Diamond" && newSubscription === "Infinity"));

    if (isUpgrade) {
      // Open payment modal for paid upgrades
      setSelectedPackage(
        newSubscription.toLowerCase() as "basic" | "diamond" | "infinity"
      );
      setPaymentModalOpen(true);
      return;
    }

    // Handle free downgrades (Basic/None) without payment
    setIsUpdating(true);

    try {
      await updateSubscription(newSubscription);
      await refreshProfile(); // Refresh profile to get updated subscription
      toast.success(`Successfully updated to ${newSubscription}!`);
    } catch (error) {
      console.error("Subscription update error:", error);
      toast.error((error as Error).message || "Failed to update subscription");
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    try {
      // Update subscription after successful payment
      await updateSubscription(
        (selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)) as
          | "Diamond"
          | "Infinity"
      );
      await refreshProfile();
      toast.success(
        `Successfully upgraded to ${
          selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)
        }!`
      );
      setPaymentModalOpen(false);
    } catch (error) {
      console.error("Subscription update error:", error);
      toast.error(
        "Payment successful but failed to update subscription. Please contact support."
      );
    }
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
                    onClick={() =>
                      handleSubscriptionUpdate(
                        tier.name as
                          | "None"
                          | "Basic"
                          | "Diamond"
                          | "Infinity"
                          | "Script"
                      )
                    }
                    disabled={isUpdating}
                    className={cn(
                      "w-full text-white font-bold transition-all duration-200 hover:scale-105",
                      tier.buttonColor
                    )}
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      tier.buttonText
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Separator className="bg-brand-border" />

      {/* Downgrade/Cancel Section */}
      <Card className="bg-brand-bg-light border-brand-border border-amber-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            Downgrade Subscription
          </CardTitle>
          <CardDescription className="text-gray-400">
            Need to downgrade your subscription? We're here to help.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300">
            You can downgrade your subscription at any time. Your current
            benefits will remain active until the end of your billing period.
            Downgrading to Basic will give you free access to educational
            content.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => handleSubscriptionUpdate("Basic")}
              disabled={isUpdating || user.subscription === "Basic"}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent disabled:opacity-50"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Downgrade to Basic"
              )}
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-gray-500">
            Having trouble?{" "}
            <span className="text-brand-primary cursor-pointer hover:underline">
              Contact our support team
            </span>{" "}
            for assistance.
          </p>
        </CardFooter>
      </Card>

      {/* Payment Modal */}
      <SubscriptionContractModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        packageType={selectedPackage}
        onPaymentSuccess={handlePaymentSuccess}
        subscriptionType={isAnnual ? "yearly" : "monthly"}
      />
    </div>
  );
}
