"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, ArrowLeft, Crown, Zap, Code2 } from "lucide-react";

interface AccessDeniedProps {
  requiredSubscription: "Basic" | "Diamond" | "Infinity" | "Script";
  currentSubscription?: string;
  message?: string;
}

export default function AccessDenied({
  requiredSubscription,
  currentSubscription = "None",
  message,
}: AccessDeniedProps) {
  const router = useRouter();

  const getSubscriptionIcon = (subscription: string) => {
    switch (subscription) {
      case "Diamond":
        return <Crown className="w-8 h-8 text-yellow-400" />;
      case "Infinity":
        return <Zap className="w-8 h-8 text-purple-400" />;
      case "Script":
        return <Code2 className="w-8 h-8 text-green-400" />;
      default:
        return <Shield className="w-8 h-8 text-blue-400" />;
    }
  };

  const goToCorrectDashboard = () => {
    switch (currentSubscription) {
      case "Diamond":
        router.push("/hub/diamond");
        break;
      case "Infinity":
        router.push("/hub/infinity");
        break;
      case "Script":
        router.push("/hub/script");
        break;
      case "Basic":
      case "None":
      default:
        router.push("/hub/basic");
        break;
    }
  };

  const goToPricing = () => {
    router.push("/pricing");
  };

  return (
    <div className="min-h-screen bg-brand-bg-dark flex items-center justify-center p-4">
      <Card className="bg-brand-bg-light border-brand-border p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          {getSubscriptionIcon(requiredSubscription)}
        </div>

        <h1 className="text-2xl font-bold text-white mb-4">
          Access Restricted
        </h1>

        <p className="text-gray-300 mb-6">
          {message ||
            `This dashboard requires a ${requiredSubscription} subscription. Your current plan (${currentSubscription}) doesn't have access to this content.`}
        </p>

        <div className="space-y-4">
          <Button
            onClick={goToPricing}
            className="w-full bg-brand-primary hover:bg-brand-primary/80 text-white"
          >
            Upgrade to {requiredSubscription}
          </Button>

          <Button
            variant="outline"
            onClick={goToCorrectDashboard}
            className="w-full border-brand-border text-gray-300 hover:bg-brand-bg-dark/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go to My Dashboard
          </Button>
        </div>

        <div className="mt-6 pt-6 border-t border-brand-border">
          <p className="text-sm text-gray-400">
            Current Plan:{" "}
            <span className="text-brand-primary font-semibold">
              {currentSubscription}
            </span>
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Required Plan:{" "}
            <span className="text-yellow-400 font-semibold">
              {requiredSubscription}
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}
