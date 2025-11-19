"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, ButtonProps } from "@/components/ui/button";
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
  ArrowUp,
  CheckCircle,
  Gem,
  Infinity as InfinityIcon,
  Zap,
  Sparkles,
  Crown,
  Star,
} from "lucide-react";
import { useAuth } from "@/context/authContext";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  formatPriceWithPeriod,
  getPricingInfo,
} from "@/lib/config/pricing.config";

interface UpgradeButtonProps {
  targetPackage: "diamond" | "infinity";
  currentPackage?: "basic" | "diamond" | "infinity" | "none";
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  showModal?: boolean;
  showBadge?: boolean;
  customText?: string;
  className?: string;
  disabled?: boolean;
}

const PACKAGE_INFO = {
  diamond: {
    name: "Diamond",
    price: "Contact Us", // Will be loaded dynamically
    icon: Gem,
    color: "from-blue-500 to-blue-600",
    hoverColor: "from-blue-600 to-blue-700",
    shadowColor: "shadow-glow-blue",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    features: [
      "Enhanced AI Advisor",
      "Premium Trading Scripts",
      "Advanced Market Analysis",
      "Priority Support",
      "Exclusive Discord Access",
      "Portfolio Management Tools",
    ],
    description: "Unlock premium features and advanced trading tools",
  },
  infinity: {
    name: "Infinity",
    price: "Contact Us", // Will be loaded dynamically
    icon: InfinityIcon,
    color: "from-yellow-500 to-orange-500",
    hoverColor: "from-yellow-600 to-orange-600",
    shadowColor: "shadow-glow-yellow",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    features: [
      "Everything in Diamond",
      "Personal AI Trading Assistant",
      "1-on-1 Coaching Sessions",
      "Custom Strategy Development",
      "VIP Community Access",
      "Unlimited Support",
    ],
    description: "The ultimate trading experience with personal guidance",
  },
};

export function UpgradeButton({
  targetPackage,
  currentPackage = "basic",
  size = "md",
  variant = "primary",
  showModal = true,
  showBadge = true,
  customText,
  className,
  disabled = false,
}: UpgradeButtonProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [dynamicPrice, setDynamicPrice] = useState<string>("");
  const router = useRouter();
  const { profile } = useAuth();

  const packageInfo = PACKAGE_INFO[targetPackage];

  // Load dynamic pricing
  useEffect(() => {
    const loadPricing = async () => {
      try {
        const pricing = await getPricingInfo(targetPackage, "monthly");
        if (pricing.price && pricing.price > 0) {
          const formattedPrice = formatPriceWithPeriod(
            pricing.price,
            "monthly"
          );
          setDynamicPrice(formattedPrice);
        } else {
          setDynamicPrice("Contact Us");
        }
      } catch (error) {
        console.error("Error loading dynamic pricing:", error);
        // Keep the static price as fallback
        setDynamicPrice(packageInfo.price);
      }
    };
    loadPricing();
  }, [targetPackage, packageInfo.price]);

  // Check if user can upgrade to this package
  const canUpgrade = () => {
    // Check if user already has this subscription
    if (profile?.subscription?.toLowerCase() === targetPackage.toLowerCase()) {
      return false;
    }

    // Check upgrade path
    if (
      currentPackage === "basic" &&
      (targetPackage === "diamond" || targetPackage === "infinity")
    ) {
      return true;
    }
    if (currentPackage === "diamond" && targetPackage === "infinity") {
      return true;
    }
    return false;
  };

  // Get appropriate button text
  const getButtonText = () => {
    if (customText) return customText;

    // Check if user already has this subscription
    if (profile?.subscription?.toLowerCase() === targetPackage.toLowerCase()) {
      return `Active: ${packageInfo.name}`;
    }

    if (currentPackage === targetPackage) {
      return `Current: ${packageInfo.name}`;
    }

    if (!canUpgrade()) {
      return `${packageInfo.name} Package`;
    }

    return `Upgrade to ${packageInfo.name}`;
  };

  // Get button styles based on size and variant
  const getButtonStyles = () => {
    const baseStyles =
      "font-bold transition-all duration-300 hover:scale-105 rounded-xl relative overflow-hidden";

    const sizeStyles = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-base",
      lg: "px-6 py-3 text-lg",
      xl: "px-8 py-4 text-xl",
    };

    const variantStyles = {
      primary: `bg-gradient-to-r ${packageInfo.color} hover:${packageInfo.hoverColor} text-white ${packageInfo.shadowColor}`,
      secondary: `bg-gradient-to-r ${packageInfo.color}/20 hover:${packageInfo.color}/30 text-white border border-white/20`,
      outline: `border-2 ${packageInfo.badgeColor
        .replace("bg-", "border-")
        .replace("/20", "/50")} bg-transparent hover:${packageInfo.color}/10`,
      ghost: "bg-transparent hover:bg-white/10 text-white",
    };

    return cn(baseStyles, sizeStyles[size], variantStyles[variant], className);
  };

  const handleUpgradeClick = () => {
    if (disabled || currentPackage === targetPackage) return;

    if (!canUpgrade()) {
      setIsPreviewOpen(true);
      return;
    }

    // Check if user has any active subscription
    const hasActiveSubscription = () => {
      if (!profile?.contracts) return false;

      const now = new Date();
      return profile.contracts.some((contract) => {
        if (contract.status !== "signed" || !contract.subscriptionEndDate)
          return false;
        const endDate = new Date(contract.subscriptionEndDate);
        return endDate > now;
      });
    };

    // If user has active subscription, redirect to subscription management
    if (hasActiveSubscription()) {
      toast({
        title: "Active Subscription Detected",
        description: "Redirecting to subscription management...",
      });
      router.push("/hub/subscription");
      return;
    }

    console.log("🗑️ Clearing previous cart and discount data for upgrade...");

    // ✅ Clear previous cart data (removing old subscription)
    localStorage.removeItem("cart");

    // ✅ Clear any previous discount data (important when switching subscriptions)
    localStorage.removeItem("checkout_discount");

    // ✅ Clear discount cookies if they exist
    document.cookie =
      "discount_code=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "discount_data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Create cart item for this upgrade
    const priceToUse = dynamicPrice || packageInfo.price;
    const cartItem = {
      id: `upgrade-${targetPackage}`,
      name: `${packageInfo.name} Package`,
      price: parseFloat(priceToUse.replace(/[$\/month]/g, "")),
      type: `subscription-${targetPackage}`,
      description: packageInfo.description,
      features: packageInfo.features,
    };

    // Store new cart in localStorage (replaces old cart)
    localStorage.setItem("cart", JSON.stringify([cartItem]));

    console.log("✅ Cart updated with upgrade:", cartItem);

    toast({
      title: "Added to cart!",
      description: `${packageInfo.name} upgrade has been added to your cart.`,
    });

    // Navigate to checkout
    router.push("/checkout");
  };

  const IconComponent = packageInfo.icon;

  return (
    <>
      <div className="relative inline-block">
        <Button
          onClick={handleUpgradeClick}
          disabled={disabled || currentPackage === targetPackage}
          className={getButtonStyles()}
        >
          <IconComponent className="w-5 h-5 mr-2" />
          {getButtonText()}
        </Button>
      </div>

      {/* Preview Modal for non-upgradeable packages */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IconComponent className="w-6 h-6" />
              {packageInfo.name} Package
            </DialogTitle>
            <DialogDescription>{packageInfo.description}</DialogDescription>
          </DialogHeader>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                <span className="text-3xl font-bold">
                  {dynamicPrice || packageInfo.price}
                </span>
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  monthly
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {packageInfo.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-muted-foreground">
            {currentPackage === targetPackage
              ? "You already have this package!"
              : "This package is not available for direct upgrade from your current plan."}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Convenience components for specific packages
export function DiamondUpgradeButton(
  props: Omit<UpgradeButtonProps, "targetPackage">
) {
  return <UpgradeButton {...props} targetPackage="diamond" />;
}

export function InfinityUpgradeButton(
  props: Omit<UpgradeButtonProps, "targetPackage">
) {
  return <UpgradeButton {...props} targetPackage="infinity" />;
}

// Upgrade prompt card component
interface UpgradePromptCardProps {
  currentPackage?: "basic" | "diamond" | "infinity" | "none";
  targetPackages?: ("diamond" | "infinity")[];
  title?: string;
  description?: string;
  className?: string;
}

export function UpgradePromptCard({
  currentPackage = "basic",
  targetPackages = ["diamond", "infinity"],
  title = "Unlock Premium Features",
  description = "Upgrade your plan to access advanced tools and exclusive features.",
  className,
}: UpgradePromptCardProps) {
  return (
    <Card
      className={cn(
        "bg-gradient-to-br from-brand-bg-light to-brand-bg-dark border-brand-border shadow-glow-cyan",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white font-bold">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <Star className="w-4 h-4 text-black" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-6">{description}</p>
        <div className="flex flex-col gap-3">
          {targetPackages.includes("diamond") && (
            <DiamondUpgradeButton
              currentPackage={currentPackage}
              size="lg"
              className="w-full"
            />
          )}
          {targetPackages.includes("infinity") && (
            <InfinityUpgradeButton
              currentPackage={currentPackage}
              size="lg"
              className="w-full"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
