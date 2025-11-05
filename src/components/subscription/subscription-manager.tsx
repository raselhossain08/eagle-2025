"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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

interface SubscriptionManagerProps {
  currentSubscription: SubscriptionType;
}

// Helper function to get subscription info from API data
const getSubscriptionInfo = (subscription: string, subscriptionStatus: any) => {
  // Default fallback values
  const defaults: Record<string, any> = {
    None: { color: "secondary", description: "No subscription", price: "Free" },
    Basic: { color: "default", description: "Basic features", price: "Free" },
    Diamond: { color: "default", description: "Premium features", price: "Contact Sales" },
    Infinity: { color: "default", description: "All features + AI", price: "Contact Sales" },
    Script: { color: "default", description: "Script access", price: "Contact Sales" },
  };

  const defaultInfo = defaults[subscription] || { color: "default", description: "Unknown subscription", price: "Contact Sales" };

  // If we have API data, use it, otherwise fall back to defaults
  if (subscriptionStatus?.subscriptionDetails) {
    return {
      color: subscriptionStatus.subscriptionDetails.status === 'active' ? "default" : "secondary",
      description: subscriptionStatus.subscriptionDetails.planName || defaultInfo.description,
      price: subscriptionStatus.subscriptionDetails.amount ? 
        `${subscriptionStatus.subscriptionDetails.currency || '$'}${subscriptionStatus.subscriptionDetails.amount}` : 
        defaultInfo.price,
      billingCycle: subscriptionStatus.subscriptionDetails.billingCycle,
    };
  }

  return defaultInfo;
};

export default function SubscriptionManager({
  currentSubscription,
}: SubscriptionManagerProps) {
  const [selectedSubscription, setSelectedSubscription] = useState<SubscriptionType>(currentSubscription);
  const { refreshProfile } = useAuth();
  const router = useRouter();
  const { subscriptionStatus, loading: statusLoading, refetch } = useSubscriptionStatus();
  const { updateUserSubscription, isLoading } = useSubscriptionActions();

  // Update selected subscription when current subscription changes
  useEffect(() => {
    setSelectedSubscription(currentSubscription);
  }, [currentSubscription]);

  // Get current subscription info from API
  const currentSubInfo = getSubscriptionInfo(currentSubscription, subscriptionStatus);

  const handleSubscriptionPurchase = (subscriptionType: string) => {
    if (subscriptionType === currentSubscription) {
      toast({
        title: "Already Subscribed",
        description: "You already have this subscription",
        variant: "destructive",
      });
      return;
    }

    if (subscriptionType === "None" || subscriptionType === "Basic") {
      // Free options - handle without payment
      handleUpdateSubscription();
      return;
    }

    // Create cart item for paid subscriptions - use API data if available
    const subInfo = getSubscriptionInfo(subscriptionType, subscriptionStatus);
    const subscriptionItem = {
      id: subscriptionType.toLowerCase(),
      name: `${subscriptionType} Monthly Subscription`,
      price: subInfo.price || "Contact Sales",
      memberPrice: subInfo.price || "Contact Sales",
      quantity: 1,
      subscriptionType: "monthly",
      productType: subscriptionType.toLowerCase(),
    };

    // Save to localStorage and navigate to checkout
    localStorage.setItem("cart", JSON.stringify([subscriptionItem]));

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
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Change Subscription</label>
          <Select
            value={selectedSubscription}
            onValueChange={(value) => setSelectedSubscription(value as SubscriptionType)}
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

        <Button
          onClick={handleUpdateSubscription}
          disabled={isLoading || selectedSubscription === currentSubscription || statusLoading}
          className="w-full"
        >
          {isLoading ? "Updating..." : "Update Subscription"}
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>
            • Changing subscription will redirect you to the appropriate
            dashboard
          </p>
          <p>
            • Make sure you have purchased the subscription before activating
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
