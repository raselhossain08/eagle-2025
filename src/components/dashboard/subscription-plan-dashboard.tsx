"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity,
  Users, 
  DollarSign, 
  TrendingUp,
  Package,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  getSubscriptionStatus, 
  getSubscriptionAnalytics,
  getAllSubscriptions,
  getExpiringSoon
} from '@/lib/services/api/subscription';
import { 
  getPublicPlans, 
  getPlanStats 
} from '@/lib/services/api/plan';
import { toast } from '@/hooks/use-toast';
import type { 
  SubscriptionAnalytics, 
  Subscription,
  SubscriptionStatusResponse 
} from '@/lib/services/api/subscription';
import type { Plan, PlanStats } from '@/lib/services/api/plan';

// Stats card component
interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: React.ElementType;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon 
}) => {
  const getChangeIcon = () => {
    if (changeType === 'positive') return <ArrowUpRight className="w-4 h-4 text-green-600" />;
    if (changeType === 'negative') return <ArrowDownRight className="w-4 h-4 text-red-600" />;
    return null;
  };

  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-green-600';
    if (changeType === 'negative') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-400" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${getChangeColor()} flex items-center gap-1`}>
            {getChangeIcon()}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// Recent activity item
interface RecentActivityItemProps {
  subscription: Subscription;
}

const RecentActivityItem: React.FC<RecentActivityItemProps> = ({ subscription }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Package className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="font-medium">{subscription.planName}</p>
          <p className="text-sm text-gray-600">{subscription.planCategory}</p>
        </div>
      </div>
      <div className="text-right">
        <Badge className={getStatusColor(subscription.status)}>
          {subscription.status}
        </Badge>
        <p className="text-sm text-gray-600 mt-1">
          ${subscription.amount}/{subscription.billingCycle}
        </p>
      </div>
    </div>
  );
};

// Main dashboard component
export default function SubscriptionPlanDashboard() {
  const [loading, setLoading] = useState(true);
  const [userSubscription, setUserSubscription] = useState<SubscriptionStatusResponse | null>(null);
  const [subscriptionAnalytics, setSubscriptionAnalytics] = useState<SubscriptionAnalytics | null>(null);
  const [planStats, setPlanStats] = useState<PlanStats | null>(null);
  const [recentSubscriptions, setRecentSubscriptions] = useState<Subscription[]>([]);
  const [expiringSubscriptions, setExpiringSubscriptions] = useState<Subscription[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch user subscription status
      try {
        const userSubData = await getSubscriptionStatus();
        setUserSubscription(userSubData);
      } catch (error) {
        console.log("User subscription fetch failed - might not be logged in");
      }

      // Fetch public plans
      try {
        const plansData = await getPublicPlans();
        setPlans(plansData);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }

      // Try to fetch admin data (will fail gracefully if not admin)
      try {
        const [analyticsData, statsData, subscriptionsData, expiringData] = await Promise.allSettled([
          getSubscriptionAnalytics(),
          getPlanStats(),
          getAllSubscriptions({ limit: 5 }),
          getExpiringSoon(7)
        ]);

        if (analyticsData.status === 'fulfilled') {
          setSubscriptionAnalytics(analyticsData.value.data || null);
        }

        if (statsData.status === 'fulfilled') {
          setPlanStats(statsData.value.data || null);
        }

        if (subscriptionsData.status === 'fulfilled') {
          setRecentSubscriptions(subscriptionsData.value.data || []);
        }

        if (expiringData.status === 'fulfilled') {
          setExpiringSubscriptions(expiringData.value.data || []);
        }
      } catch (error) {
        console.log("Admin data fetch failed - user might not have admin permissions");
      }

    } catch (error) {
      console.error('Dashboard data fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Subscription & Plans Dashboard</h1>
        <p className="text-gray-600">Manage subscriptions, plans, and view analytics</p>
      </div>

      {/* User Subscription Status */}
      {userSubscription && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Your Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Badge variant={userSubscription.subscription === 'None' ? 'secondary' : 'default'}>
                  {userSubscription.subscription}
                </Badge>
                <p className="text-sm text-gray-600 mt-2">
                  {userSubscription.features.length} features available
                </p>
              </div>
              <Button>Manage Subscription</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      {(subscriptionAnalytics || planStats) && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {subscriptionAnalytics && (
            <>
              <StatsCard
                title="Total Subscriptions"
                value={subscriptionAnalytics.totalSubscriptions.toString()}
                icon={Users}
              />
              <StatsCard
                title="Active Subscriptions"
                value={subscriptionAnalytics.activeSubscriptions.toString()}
                icon={Activity}
              />
              <StatsCard
                title="Monthly Revenue"
                value={`$${subscriptionAnalytics.revenue.monthly.toLocaleString()}`}
                icon={DollarSign}
              />
              <StatsCard
                title="Growth Rate"
                value={`${subscriptionAnalytics.growthRate.toFixed(1)}%`}
                changeType={subscriptionAnalytics.growthRate > 0 ? 'positive' : 'negative'}
                icon={TrendingUp}
              />
            </>
          )}
          
          {planStats && !subscriptionAnalytics && (
            <>
              <StatsCard
                title="Total Plans"
                value={planStats.totalPlans.toString()}
                icon={Package}
              />
              <StatsCard
                title="Active Plans"
                value={planStats.activePlans.toString()}
                icon={CheckCircle}
              />
              <StatsCard
                title="Featured Plans"
                value={planStats.featuredPlans.toString()}
                icon={Activity}
              />
              <StatsCard
                title="Total Revenue"
                value={`$${planStats.revenue.total.toLocaleString()}`}
                icon={DollarSign}
              />
            </>
          )}
        </div>
      )}

      {/* Two Column Layout */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Subscriptions */}
        {recentSubscriptions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentSubscriptions.slice(0, 5).map((subscription) => (
                <RecentActivityItem 
                  key={subscription._id} 
                  subscription={subscription} 
                />
              ))}
            </CardContent>
          </Card>
        )}

        {/* Expiring Subscriptions Alert */}
        {expiringSubscriptions.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                Expiring Soon
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {expiringSubscriptions.map((subscription) => (
                <div key={subscription._id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div>
                    <p className="font-medium">{subscription.planName}</p>
                    <p className="text-sm text-gray-600">
                      Expires: {new Date(subscription.endDate || '').toLocaleDateString()}
                    </p>
                  </div>
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Available Plans */}
        {plans.length > 0 && (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Available Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {plans.slice(0, 6).map((plan) => (
                  <div key={plan._id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{plan.displayName || plan.name}</h3>
                      {plan.isFeatured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        {plan.pricing.monthly && (
                          <p className="font-bold text-lg">
                            ${plan.pricing.monthly}/mo
                          </p>
                        )}
                        {plan.pricing.yearly && (
                          <p className="text-sm text-gray-600">
                            or ${plan.pricing.yearly}/yr
                          </p>
                        )}
                      </div>
                      <Badge variant={plan.isActive ? 'default' : 'secondary'}>
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button>Create New Plan</Button>
            <Button variant="outline">View All Subscriptions</Button>
            <Button variant="outline">Generate Report</Button>
            <Button variant="outline">Export Data</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}