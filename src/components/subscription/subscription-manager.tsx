"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/authContext";
import { toast } from "@/hooks/use-toast";
import { useSubscriptionStatus } from "@/hooks/use-subscription-status";
import { useSubscriptionActions } from "@/hooks/use-subscription-actions";
import { SubscriptionType } from "@/lib/services/api/subscription";
import { discountService } from "@/lib/services/api/discount";
import { getPublicPlans, type Plan } from "@/lib/services/api/plan";
import {
  Loader2,
  Tag,
  Percent,
  DollarSign,
  CheckCircle,
  X,
} from "lucide-react";

interface SubscriptionManagerProps {
  currentSubscription: SubscriptionType;
}

export default function SubscriptionManager({
  currentSubscription,
}: SubscriptionManagerProps) {
  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionType>(currentSubscription);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<
    "monthly" | "yearly"
  >("monthly");
  const [discountCode, setDiscountCode] = useState("");
  const [isVerifyingDiscount, setIsVerifyingDiscount] = useState(false);
  const [discountInfo, setDiscountInfo] = useState<any>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  const { refreshProfile } = useAuth();
  const router = useRouter();
  const {
    subscriptionStatus,
    loading: statusLoading,
    refetch,
  } = useSubscriptionStatus();
  const { updateUserSubscription, isLoading } = useSubscriptionActions();

  // Fetch plans from backend on mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadingPlans(true);
        const fetchedPlans = await getPublicPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast({
          title: "Error",
          description: "Failed to load subscription plans",
          variant: "destructive",
        });
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  // Update selected subscription when current subscription changes
  useEffect(() => {
    setSelectedSubscription(currentSubscription);
  }, [currentSubscription]);

  // Get selected plan details from backend data
  const getSelectedPlanDetails = () => {
    const plan = plans.find(
      (p) =>
        p.name?.toLowerCase() === selectedSubscription.toLowerCase() ||
        p.displayName?.toLowerCase() === selectedSubscription.toLowerCase()
    );

    if (!plan) return null;

    const pricingData = plan.pricing?.[selectedBillingCycle];
    const currentPrice =
      typeof pricingData === "number" ? pricingData : pricingData?.price || 0;
    const originalPrice =
      typeof pricingData === "object"
        ? pricingData?.originalPrice || currentPrice
        : currentPrice;

    return {
      ...plan,
      currentPrice,
      originalPrice,
    };
  };

  const selectedPlanDetails = getSelectedPlanDetails();

  // Get current subscription info
  const getCurrentSubInfo = () => {
    const plan = plans.find(
      (p) =>
        p.name?.toLowerCase() === currentSubscription.toLowerCase() ||
        p.displayName?.toLowerCase() === currentSubscription.toLowerCase()
    );

    if (plan) {
      return {
        color: "default",
        description: plan.description || "Active subscription",
      };
    }

    // Fallback for when plan not found
    const defaults: Record<string, any> = {
      None: { color: "secondary", description: "No active subscription" },
      Basic: { color: "default", description: "Basic features" },
      Diamond: { color: "default", description: "Premium features" },
      Infinity: { color: "default", description: "All features + AI" },
      Script: { color: "default", description: "Script access" },
    };

    return (
      defaults[currentSubscription] || {
        color: "default",
        description: "Active subscription",
      }
    );
  };

  const currentSubInfo = getCurrentSubInfo();

  // Calculate price with discount
  const calculateFinalPrice = () => {
    if (!selectedPlanDetails) return 0;

    const basePrice = selectedPlanDetails.currentPrice;

    if (discountInfo?.calculation) {
      return discountInfo.calculation.finalAmount;
    }

    return basePrice;
  };

  // Get discount amount
  const getDiscountAmount = () => {
    if (discountInfo?.calculation) {
      return discountInfo.calculation.discountAmount;
    }
    return 0;
  };

  // Handle discount verification
  const handleVerifyDiscount = async () => {
    if (!discountCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a discount code",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPlanDetails) {
      toast({
        title: "Error",
        description: "Please select a subscription plan first",
        variant: "destructive",
      });
      return;
    }

    setIsVerifyingDiscount(true);

    try {
      const result = await discountService.verifyDiscountCode({
        code: discountCode,
        orderAmount: selectedPlanDetails.currentPrice,
        quantity: 1,
      });

      if (result.valid) {
        setDiscountInfo(result);
        toast({
          title: "Discount Applied!",
          description: `You saved $${result.calculation.discountAmount.toFixed(
            2
          )}`,
        });
      }
    } catch (error: any) {
      console.error("Discount verification error:", error);
      setDiscountInfo(null);
      toast({
        title: "Invalid Discount Code",
        description: error.message || "The discount code is invalid or expired",
        variant: "destructive",
      });
    } finally {
      setIsVerifyingDiscount(false);
    }
  };

  // Remove discount
  const handleRemoveDiscount = () => {
    setDiscountCode("");
    setDiscountInfo(null);
    toast({
      title: "Discount Removed",
      description: "The discount has been removed from your order",
    });
  };

  const handleSubscriptionPurchase = () => {
    if (selectedSubscription === currentSubscription) {
      toast({
        title: "Already Subscribed",
        description: "You already have this subscription",
        variant: "destructive",
      });
      return;
    }

    if (selectedSubscription === "None" || selectedSubscription === "Basic") {
      // Free options - handle without payment
      handleUpdateSubscription();
      return;
    }

    if (!selectedPlanDetails) {
      toast({
        title: "Error",
        description: "Please select a valid subscription plan",
        variant: "destructive",
      });
      return;
    }

    // Create cart item for paid subscriptions with discount if applied
    const finalPrice = calculateFinalPrice();
    const originalPrice = selectedPlanDetails.currentPrice;

    const subscriptionItem: any = {
      id: `subscription-${selectedSubscription.toLowerCase()}-${selectedBillingCycle}`,
      name: `${selectedPlanDetails.displayName || selectedSubscription} ${
        selectedBillingCycle === "monthly" ? "Monthly" : "Yearly"
      } Subscription`,
      price: finalPrice,
      originalPrice: originalPrice > finalPrice ? originalPrice : undefined,
      quantity: 1,
      type: "subscription",
      subscriptionType: selectedBillingCycle,
      productType: `${selectedSubscription.toLowerCase()}-subscription`,
      description: selectedPlanDetails.description,
      features: selectedPlanDetails.features,
    };

    // If discount is applied, save it to pass through checkout
    if (discountInfo && discountCode) {
      subscriptionItem.appliedDiscount = {
        code: discountCode,
        amount: getDiscountAmount(),
        type: discountInfo.discount.type,
      };
    }

    // Save to localStorage and navigate to checkout
    localStorage.setItem("cart", JSON.stringify([subscriptionItem]));

    // Save discount code separately if applied
    if (discountCode && discountInfo) {
      localStorage.setItem("appliedDiscountCode", discountCode);
    }

    toast({
      title: "Added to Cart",
      description: `${subscriptionItem.name} has been added to your cart`,
    });

    router.push("/checkout");
  };

  const handleUpdateSubscription = async () => {
    if (selectedSubscription === currentSubscription) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a different subscription",
      });
      return;
    }

    try {
      const response = await updateUserSubscription(selectedSubscription);

      if (response?.success) {
        // Refresh profile and subscription data
        await Promise.all([refreshProfile(), refetch()]);

        // Small delay then reload to show new dashboard
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.error("Subscription update error:", error);
    }
  };

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Subscription Management
          <Badge variant={currentSubInfo.color as any}>
            {currentSubscription}
          </Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {currentSubInfo.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subscription Selection */}
        <div>
          <label className="text-sm font-medium">Change Subscription</label>
          <Select
            value={selectedSubscription}
            onValueChange={(value) =>
              setSelectedSubscription(value as SubscriptionType)
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select subscription" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
              <SelectItem value="Diamond">Diamond</SelectItem>
              <SelectItem value="Infinity">Infinity</SelectItem>
              <SelectItem value="Script">Script</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Billing Cycle Selection (only for paid plans) */}
        {selectedSubscription !== "None" &&
          selectedSubscription !== "Basic" && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Billing Cycle
              </label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={
                    selectedBillingCycle === "monthly" ? "default" : "outline"
                  }
                  onClick={() => setSelectedBillingCycle("monthly")}
                  className="flex-1"
                >
                  Monthly
                </Button>
                <Button
                  type="button"
                  variant={
                    selectedBillingCycle === "yearly" ? "default" : "outline"
                  }
                  onClick={() => setSelectedBillingCycle("yearly")}
                  className="flex-1"
                >
                  Yearly
                  {(() => {
                    const yearlyPricing = selectedPlanDetails?.pricing?.yearly;
                    if (
                      yearlyPricing &&
                      typeof yearlyPricing === "object" &&
                      "discount" in yearlyPricing &&
                      (yearlyPricing as any).discount
                    ) {
                      return (
                        <Badge variant="secondary" className="ml-2">
                          {String((yearlyPricing as any).discount)}
                        </Badge>
                      );
                    }
                    return null;
                  })()}
                </Button>
              </div>
            </div>
          )}

        {/* Discount Code Section (only for paid plans) */}
        {selectedSubscription !== "None" &&
          selectedSubscription !== "Basic" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Discount Code</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) =>
                      setDiscountCode(e.target.value.toUpperCase())
                    }
                    placeholder="Enter discount code"
                    className="w-full px-3 py-2 border rounded-md"
                    disabled={!!discountInfo}
                  />
                  {discountInfo && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
                      ✓
                    </span>
                  )}
                </div>
                {!discountInfo ? (
                  <Button
                    type="button"
                    onClick={handleVerifyDiscount}
                    disabled={!discountCode || isVerifyingDiscount}
                    variant="outline"
                  >
                    {isVerifyingDiscount ? "Verifying..." : "Apply"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleRemoveDiscount}
                    variant="outline"
                  >
                    Remove
                  </Button>
                )}
              </div>
              {discountInfo && (
                <div className="text-sm text-green-600">
                  {discountInfo.discount.type === "percentage"
                    ? `${discountInfo.discount.value}% off`
                    : `$${discountInfo.discount.value} off`}{" "}
                  - You save ${getDiscountAmount().toFixed(2)}
                </div>
              )}
            </div>
          )}

        {/* Price Display (only for paid plans) */}
        {selectedSubscription !== "None" &&
          selectedSubscription !== "Basic" &&
          selectedPlanDetails && (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Subtotal:</span>
                <span
                  className={
                    discountInfo
                      ? "line-through text-muted-foreground"
                      : "font-medium"
                  }
                >
                  ${selectedPlanDetails.currentPrice.toFixed(2)}
                </span>
              </div>
              {discountInfo && (
                <>
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-sm">Discount:</span>
                    <span>-${getDiscountAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>${calculateFinalPrice().toFixed(2)}</span>
                  </div>
                </>
              )}
            </div>
          )}

        {/* Plan Features (if available) */}
        {selectedPlanDetails?.features &&
          selectedPlanDetails.features.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Features:</label>
              <ul className="text-sm text-muted-foreground space-y-1">
                {selectedPlanDetails.features
                  .slice(0, 5)
                  .map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>
          )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {selectedSubscription === "None" ||
          selectedSubscription === "Basic" ? (
            <Button
              onClick={handleUpdateSubscription}
              disabled={
                isLoading ||
                selectedSubscription === currentSubscription ||
                statusLoading
              }
              className="w-full"
            >
              {isLoading ? "Updating..." : "Update Subscription"}
            </Button>
          ) : (
            <Button
              onClick={handleSubscriptionPurchase}
              disabled={
                isLoading ||
                selectedSubscription === currentSubscription ||
                statusLoading ||
                loadingPlans
              }
              className="w-full"
            >
              {loadingPlans
                ? "Loading..."
                : isLoading
                ? "Processing..."
                : `Proceed to Checkout - $${calculateFinalPrice().toFixed(2)}`}
            </Button>
          )}
        </div>

        {/* Info Messages */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            • Changing subscription will redirect you to the appropriate
            dashboard
          </p>
          <p>
            • Make sure you have purchased the subscription before activating
          </p>
          {selectedSubscription !== "None" &&
            selectedSubscription !== "Basic" && (
              <p>
                • You will be redirected to checkout to complete your purchase
              </p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
