"use client";

import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Crown,
  Infinity,
  User,
  ArrowLeft,
  Settings,
  CreditCard,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  DowngradeToBasicButton,
  DowngradeToDiamondButton,
} from "@/components/subscription/downgrade-button";
import { SubscriptionStatusCard } from "@/components/subscription/subscription-status-card";
import { useSubscriptionStatus } from "@/hooks/use-subscription-status";
import { Subscription } from "@/lib/services/api/subscription";

interface SubscriptionInfo {
  type: string;
  status: "active" | "expired" | "pending";
  startDate: string;
  endDate: string;
  productType: string;
  displayName: string;
  icon: any;
  color: string;
  contractId: string;
}

export default function SubscriptionPage() {
  const { profile, loading } = useAuth();
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<SubscriptionInfo[]>([]);
  
  // Get API subscription data
  const { 
    subscriptionStatus, 
    userSubscriptions, 
    loading: subscriptionLoading, 
    error: subscriptionError,
    refetch 
  } = useSubscriptionStatus();

  useEffect(() => {
    if (!loading && !profile) {
      router.push("/login");
      return;
    }

    // Process both contract-based and API-based subscriptions
    const processedSubscriptions: SubscriptionInfo[] = [];

    // Process contract-based subscriptions (existing logic)
    if (profile?.contracts) {
      profile.contracts.forEach((contract) => {
        if (contract.status === "signed" && contract.subscriptionEndDate) {
          const endDate = new Date(contract.subscriptionEndDate);
          const now = new Date();
          const status = endDate > now ? "active" : "expired";

          let displayName = "";
          let icon = User;
          let color = "bg-blue-500";

          switch (contract.productType) {
            case "diamond":
              displayName = "Diamond Advisory";
              icon = Crown;
              color = "bg-purple-500";
              break;
            case "infinity":
              displayName = "Infinity Trading System";
              icon = Infinity;
              color = "bg-blue-500";
              break;
            case "mentorship-package":
              displayName = "Mentorship Package";
              icon = User;
              color = "bg-green-500";
              break;
            default:
              displayName = contract.productType || "Unknown Subscription";
          }

          processedSubscriptions.push({
            type: "subscription",
            status,
            startDate: contract.subscriptionStartDate,
            endDate: contract.subscriptionEndDate,
            productType: contract.productType,
            displayName,
            icon,
            color,
            contractId: contract._id,
          });
        }
      });
    }

    // Process API-based subscriptions
    if (userSubscriptions) {
      const apiSubscriptions = [...userSubscriptions.active, ...userSubscriptions.inactive];
      
      apiSubscriptions.forEach((subscription: Subscription) => {
        // Avoid duplicates by checking if we already have this subscription
        const exists = processedSubscriptions.find(
          sub => sub.contractId === subscription._id
        );
        
        if (!exists) {
          let displayName = "";
          let icon = User;
          let color = "bg-blue-500";

          switch (subscription.planCategory?.toLowerCase()) {
            case "diamond":
              displayName = "Diamond Subscription";
              icon = Crown;
              color = "bg-purple-500";
              break;
            case "infinity":
              displayName = "Infinity Subscription";
              icon = Infinity;
              color = "bg-blue-500";
              break;
            case "basic":
              displayName = "Basic Subscription";
              icon = User;
              color = "bg-green-500";
              break;
            default:
              displayName = subscription.planName || "Unknown Subscription";
          }

          processedSubscriptions.push({
            type: "subscription",
            status: subscription.status === "active" ? "active" : "expired",
            startDate: subscription.startDate,
            endDate: subscription.endDate || new Date().toISOString(),
            productType: subscription.planCategory?.toLowerCase() || "unknown",
            displayName,
            icon,
            color,
            contractId: subscription._id,
          });
        }
      });
    }

    setSubscriptions(processedSubscriptions);
  }, [profile, loading, router, userSubscriptions]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading || subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show error state if there's an API error (but still show contracts if available)
  if (subscriptionError && !profile?.contracts?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  Subscription Management
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Manage your active subscriptions and billing
                </p>
              </div>
            </div>
          </div>

          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Unable to Load Subscriptions
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    {subscriptionError}
                  </p>
                </div>
                <div className="flex gap-3 justify-center pt-4">
                  <Button onClick={() => refetch()}>
                    Try Again
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/hub")}>
                    Back to Hub
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Subscription Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Manage your active subscriptions and billing
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" size="sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </Button>
          </div>
        </div>

        {/* Current Subscription Status from API */}
        {subscriptionStatus && (
          <div className="mb-6">
            <SubscriptionStatusCard 
              subscriptionStatus={subscriptionStatus}
              onRefresh={refetch}
              isRefreshing={subscriptionLoading}
            />
          </div>
        )}

        {/* Subscriptions Grid */}
        {subscriptions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((subscription, index) => {
              const IconComponent = subscription.icon;
              const daysRemaining = getDaysRemaining(subscription.endDate);

              return (
                <Card key={index} className="relative overflow-hidden">
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 ${subscription.color}`}
                  />

                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${subscription.color} text-white`}
                        >
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">
                            {subscription.displayName}
                          </CardTitle>
                          <CardDescription className="capitalize">
                            {subscription.type}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={
                          subscription.status === "active"
                            ? "default"
                            : "destructive"
                        }
                        className="capitalize"
                      >
                        {subscription.status}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          Started: {formatDate(subscription.startDate)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <CalendarDays className="h-4 w-4" />
                        <span>Expires: {formatDate(subscription.endDate)}</span>
                      </div>
                    </div>

                    {subscription.status === "active" && (
                      <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="text-sm font-medium text-slate-900 dark:text-white">
                          {daysRemaining > 0 ? (
                            <>
                              <span className="text-green-600 dark:text-green-400">
                                {daysRemaining} days remaining
                              </span>
                            </>
                          ) : (
                            <span className="text-red-600 dark:text-red-400">
                              Expired {Math.abs(daysRemaining)} days ago
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            // Navigate to subscription details or manage page
                            if (subscription.productType === "diamond") {
                              router.push("/hub/diamond");
                            } else if (
                              subscription.productType === "infinity"
                            ) {
                              router.push("/hub/infinity");
                            } else {
                              router.push("/hub");
                            }
                          }}
                        >
                          View Details
                        </Button>
                        {subscription.status === "active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Handle subscription modification
                              router.push("/pricing");
                            }}
                          >
                            Upgrade
                          </Button>
                        )}
                      </div>

                      {/* Downgrade Buttons */}
                      {subscription.status === "active" && (
                        <div className="flex gap-2">
                          {/* Infinity users can downgrade to Diamond or Basic */}
                          {subscription.productType === "infinity" && (
                            <>
                              <DowngradeToDiamondButton
                                currentSubscription="infinity"
                                contractId={subscription.contractId}
                                size="sm"
                                className="flex-1"
                              />
                              <DowngradeToBasicButton
                                currentSubscription="infinity"
                                contractId={subscription.contractId}
                                size="sm"
                                className="flex-1"
                              />
                            </>
                          )}

                          {/* Diamond users can downgrade to Basic */}
                          {subscription.productType === "diamond" && (
                            <DowngradeToBasicButton
                              currentSubscription="diamond"
                              contractId={subscription.contractId}
                              size="sm"
                              className="w-full"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    No Active Subscriptions
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    You don't have any active subscriptions yet.
                  </p>
                </div>
                <div className="flex gap-3 justify-center pt-4">
                  <Button onClick={() => router.push("/pricing")}>
                    View Plans
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/hub")}>
                    Back to Hub
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        {subscriptions.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
                <CardDescription>
                  Common subscription management tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => router.push("/pricing")}
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade Plan
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => router.push("/contact")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => router.push("/hub")}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start"
                    onClick={() => {
                      // Handle billing history
                      router.push("/pricing");
                    }}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Billing History
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
