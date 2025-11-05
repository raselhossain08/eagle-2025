import { useState, useEffect } from 'react';
import { 
  getSubscriptionStatus, 
  getUserSubscriptions,
  SubscriptionStatusResponse,
  Subscription 
} from '@/lib/services/api/subscription';
import { useAuth } from '@/context/authContext';

interface UseSubscriptionStatusReturn {
  subscriptionStatus: SubscriptionStatusResponse | null;
  userSubscriptions: {
    active: Subscription[];
    inactive: Subscription[];
    total: number;
  } | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useSubscriptionStatus = (): UseSubscriptionStatusReturn => {
  const { isAuthenticated } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatusResponse | null>(null);
  const [userSubscriptions, setUserSubscriptions] = useState<{
    active: Subscription[];
    inactive: Subscription[];
    total: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscriptionData = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch both subscription status and user subscriptions in parallel
      const [statusResponse, subscriptionsResponse] = await Promise.all([
        getSubscriptionStatus(),
        getUserSubscriptions()
      ]);

      setSubscriptionStatus(statusResponse);
      
      // Handle the subscriptions response - it could be an array or an object
      const subscriptionsData = subscriptionsResponse.data;
      if (Array.isArray(subscriptionsData)) {
        // If it's an array, separate active and inactive
        const active = subscriptionsData.filter(sub => sub.status === 'active');
        const inactive = subscriptionsData.filter(sub => sub.status !== 'active');
        setUserSubscriptions({
          active,
          inactive,
          total: subscriptionsData.length
        });
      } else if (subscriptionsData && typeof subscriptionsData === 'object') {
        // If it's already in the expected format
        setUserSubscriptions(subscriptionsData);
      } else {
        // Default fallback
        setUserSubscriptions({
          active: [],
          inactive: [],
          total: 0
        });
      }
    } catch (err) {
      console.error('Failed to fetch subscription data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
  }, [isAuthenticated]);

  return {
    subscriptionStatus,
    userSubscriptions,
    loading,
    error,
    refetch: fetchSubscriptionData
  };
};