"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, RefreshCw, Info, Calendar, DollarSign } from "lucide-react";
import { SubscriptionStatusResponse } from "@/lib/services/api/subscription";

interface SubscriptionStatusCardProps {
  subscriptionStatus: SubscriptionStatusResponse;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function SubscriptionStatusCard({ 
  subscriptionStatus, 
  onRefresh, 
  isRefreshing = false 
}: SubscriptionStatusCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getBadgeVariant = (subscription: string) => {
    switch (subscription.toLowerCase()) {
      case "infinity":
        return "default";
      case "diamond":
        return "secondary";
      case "basic":
        return "outline";
      case "none":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="border-2 border-blue-500/20 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-blue-500" />
            Current Subscription Status
          </CardTitle>
          {onRefresh && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>
        <CardDescription>
          Your active subscription level and features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Subscription Level */}
        <div className="flex items-center justify-between">
          <div>
            <Badge 
              variant={getBadgeVariant(subscriptionStatus.subscription)}
              className="text-lg px-4 py-2 font-semibold"
            >
              {subscriptionStatus.subscription}
            </Badge>
          </div>
          
          {subscriptionStatus.subscriptionDetails && (
            <div className="text-right">
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <Info className="h-3 w-3" />
                <span>Plan: {subscriptionStatus.subscriptionDetails.planName}</span>
              </div>
              <Badge 
                variant={subscriptionStatus.subscriptionDetails.status === 'active' ? 'default' : 'secondary'}
                className="text-xs"
              >
                {subscriptionStatus.subscriptionDetails.status}
              </Badge>
            </div>
          )}
        </div>

        {/* Subscription Details */}
        {subscriptionStatus.subscriptionDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg border">
            <div className="space-y-3">
              {subscriptionStatus.subscriptionDetails.startDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-green-500" />
                  <span>Started: {formatDate(subscriptionStatus.subscriptionDetails.startDate)}</span>
                </div>
              )}
              
              {subscriptionStatus.subscriptionDetails.nextBillingDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span>Next billing: {formatDate(subscriptionStatus.subscriptionDetails.nextBillingDate)}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {subscriptionStatus.subscriptionDetails.amount && (
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-green-500" />
                  <span>{subscriptionStatus.subscriptionDetails.currency} {subscriptionStatus.subscriptionDetails.amount}</span>
                  {subscriptionStatus.subscriptionDetails.billingCycle && (
                    <span className="text-muted-foreground">
                      /{subscriptionStatus.subscriptionDetails.billingCycle}
                    </span>
                  )}
                </div>
              )}

              {subscriptionStatus.subscriptionDetails.autoRenew !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant={subscriptionStatus.subscriptionDetails.autoRenew ? "default" : "secondary"} className="text-xs">
                    Auto-renew: {subscriptionStatus.subscriptionDetails.autoRenew ? "ON" : "OFF"}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Features */}
        {subscriptionStatus.features && subscriptionStatus.features.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Active Features ({subscriptionStatus.features.length})</h4>
            <div className="flex flex-wrap gap-2">
              {subscriptionStatus.features.slice(0, 6).map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {subscriptionStatus.features.length > 6 && (
                <Badge variant="secondary" className="text-xs">
                  +{subscriptionStatus.features.length - 6} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* User Info */}
        {subscriptionStatus.user && (
          <div className="pt-2 border-t">
            <div className="text-xs text-muted-foreground">
              Account: {subscriptionStatus.user.email}
              {subscriptionStatus.user.subscription && (
                <> • Subscription Level: {subscriptionStatus.user.subscription}</>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}