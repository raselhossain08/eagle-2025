"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDown,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Crown,
  Infinity as InfinityIcon,
  User,
  Shield,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useSubscriptionActions } from "@/hooks/use-subscription-actions";
import { useSubscriptionStatus } from "@/hooks/use-subscription-status";
import { SubscriptionType } from "@/lib/services/api/subscription";

interface DowngradeButtonProps {
  currentSubscription: "diamond" | "infinity";
  targetSubscription: "basic" | "diamond";
  contractId: string;
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "destructive" | "secondary";
  className?: string;
  disabled?: boolean;
}

// Helper function to get subscription info - this should come from API in real implementation
const getDowngradeSubscriptionInfo = (subscriptionType: string) => {
  // Basic fallback info - in production, this should come from API
  const fallbackInfo: Record<string, any> = {
    basic: {
      name: "Eagle Basic",
      price: "Free",
      icon: User,
      color: "from-gray-500 to-gray-600",
      badgeColor: "bg-gray-500/20 text-gray-400 border-gray-500/30",
      features: ["Basic features available"],
      description: "Essential tools for getting started",
    },
    diamond: {
      name: "Eagle Diamond",
      price: "Contact Sales",
      icon: Crown,
      color: "from-blue-500 to-blue-600",
      badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      features: ["Premium features available"],
      description: "Premium features and advanced trading tools",
    },
    infinity: {
      name: "Eagle Infinity",
      price: "Contact Sales",
      icon: InfinityIcon,
      color: "from-yellow-500 to-orange-500",
      badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      features: ["All features available"],
      description: "The ultimate trading experience with personal guidance",
    },
  };

  return fallbackInfo[subscriptionType] || fallbackInfo.basic;
};

export function DowngradeButton({
  currentSubscription,
  targetSubscription,
  contractId,
  size = "md",
  variant = "outline",
  className,
  disabled = false,
}: DowngradeButtonProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const router = useRouter();
  const { profile, refreshProfile } = useAuth();
  const { scheduleSubscriptionDowngrade, isLoading } = useSubscriptionActions();
  const { subscriptionStatus, refetch } = useSubscriptionStatus();

  const currentInfo = getDowngradeSubscriptionInfo(currentSubscription);
  const targetInfo = getDowngradeSubscriptionInfo(targetSubscription);

  // Check if downgrade is valid
  const canDowngrade = () => {
    if (currentSubscription === "infinity" && targetSubscription === "diamond")
      return true;
    if (currentSubscription === "infinity" && targetSubscription === "basic")
      return true;
    if (currentSubscription === "diamond" && targetSubscription === "basic")
      return true;
    return false;
  };

  // Get features that will be lost
  const getLostFeatures = () => {
    const currentFeatures = currentInfo.features || [];
    const targetFeatures = targetInfo.features || [];
    return currentFeatures.filter(
      (feature: string) => !targetFeatures.includes(feature)
    );
  };

  // Get button styles
  const getButtonStyles = () => {
    const baseStyles =
      "font-medium transition-all duration-300 hover:scale-105 rounded-lg";

    const sizeStyles = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const variantStyles = {
      outline:
        "border-2 border-red-500/50 bg-transparent hover:bg-red-500/10 text-red-400 hover:text-red-300",
      destructive: "bg-red-600 hover:bg-red-700 text-white",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    };

    return cn(baseStyles, sizeStyles[size], variantStyles[variant], className);
  };

  const handleDowngradeClick = async () => {
    if (!canDowngrade() || disabled) return;

    try {
      // Convert target subscription to API format
      const apiTargetSubscription: SubscriptionType =
        targetSubscription === "basic" ? "Basic" : "Diamond";

      // Call the API to schedule downgrade
      const response = await scheduleSubscriptionDowngrade(apiTargetSubscription);

      if (response?.success) {
        setIsConfirmOpen(false);

        // Refresh user profile and subscription data to reflect changes
        await Promise.all([
          refreshProfile && refreshProfile(),
          refetch()
        ]);
      }
    } catch (error) {
      console.error("Downgrade error:", error);
    }
  };

  const CurrentIcon = currentInfo.icon;
  const TargetIcon = targetInfo.icon;
  const lostFeatures = getLostFeatures();

  return (
    <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled || !canDowngrade()}
          className={getButtonStyles()}
        >
          <ArrowDown className="h-4 w-4 mr-2" />
          Downgrade to {targetInfo.name}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
              <ArrowDown className="w-4 h-4 text-white" />
            </div>
            Confirm Subscription Downgrade
          </DialogTitle>
          <DialogDescription>
            You're about to schedule a downgrade from {currentInfo.name} to{" "}
            {targetInfo.name}. This change will take effect at the end of your
            current billing cycle.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current vs Target Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Current Subscription */}
            <Card className="border-2 border-blue-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <CurrentIcon className="h-4 w-4" />
                  Current: {currentInfo.name}
                  <Badge className={currentInfo.badgeColor}>Active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold mb-2">
                  {currentInfo.price}
                </div>
                <ul className="text-sm space-y-1">
                  {currentInfo.features?.slice(0, 3).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                  {currentInfo.features.length > 3 && (
                    <li className="text-gray-500">
                      +{currentInfo.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Target Subscription */}
            <Card className="border-2 border-gray-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <TargetIcon className="h-4 w-4" />
                  Downgrading to: {targetInfo.name}
                  <Badge variant="outline">Scheduled</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold mb-2">
                  {targetInfo.price}
                </div>
                <ul className="text-sm space-y-1">
                  {targetInfo.features?.slice(0, 3).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </li>
                  ))}
                  {targetInfo.features.length > 3 && (
                    <li className="text-gray-500">
                      +{targetInfo.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Features You'll Lose */}
          {lostFeatures.length > 0 && (
            <Card className="border-2 border-red-500/30 bg-red-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                  Features You'll Lose Access To
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lostFeatures.map((feature: string, index: number) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-red-300"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Timing Information */}
          <Card className="border border-yellow-500/30 bg-yellow-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-1">
                    When will this take effect?
                  </h4>
                  <p className="text-sm text-yellow-200">
                    Your downgrade will be processed at the end of your current
                    billing cycle. You'll continue to have access to all{" "}
                    {currentInfo.name} features until then.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protection Notice */}
          <Card className="border border-blue-500/30 bg-blue-500/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-400 mb-1">
                    Change Your Mind?
                  </h4>
                  <p className="text-sm text-blue-200">
                    You can cancel this downgrade request anytime before your
                    billing cycle ends. Contact support or visit your
                    subscription settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsConfirmOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDowngradeClick}
              disabled={isLoading}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <ArrowDown className="h-4 w-4 mr-2" />
                  Confirm Downgrade
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Convenience components for specific downgrades
export function DowngradeToBasicButton(
  props: Omit<DowngradeButtonProps, "targetSubscription">
) {
  return <DowngradeButton {...props} targetSubscription="basic" />;
}

export function DowngradeToDiamondButton(
  props: Omit<DowngradeButtonProps, "targetSubscription">
) {
  return <DowngradeButton {...props} targetSubscription="diamond" />;
}
