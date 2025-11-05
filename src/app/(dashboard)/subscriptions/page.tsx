"use client";

import SubscriptionManager from '@/components/subscription/subscription-manager';
import { useSubscriptionStatus } from '@/hooks/use-subscription-status';
import { SubscriptionType } from '@/lib/services/api/subscription';

export default function SubscriptionsPage() {
  const { subscriptionStatus, loading } = useSubscriptionStatus();
  
  // Get the current subscription, defaulting to "Basic" if not found
  const currentSubscription: SubscriptionType = subscriptionStatus?.subscription || "Basic";

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Subscription Management</h1>
          <p className="text-muted-foreground">
            Loading subscription information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <p className="text-muted-foreground">
          Manage your subscriptions, view usage, and upgrade or downgrade plans.
        </p>
      </div>
      
      <SubscriptionManager currentSubscription={currentSubscription} />
    </div>
  );
}