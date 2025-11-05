// This hook integrates with the dynamic plan API - modifying existing patterns
import { useState, useEffect } from 'react';
import { 
  getPublicPlans, 
  getPublicPlanById, 
  Plan, 
  filterPlans,
  formatPlanPrice 
} from '@/lib/services/api/plan';

interface UsePlansReturn {
  plans: Plan[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getPlanById: (id: string) => Plan | undefined;
  getPlansByCategory: (category: string) => Plan[];
  getPlansByType: (type: string) => Plan[];
  getActivePlans: () => Plan[];
  getFeaturedPlans: () => Plan[];
  getPopularPlans: () => Plan[];
}

// Enhanced hook that replaces static data with API calls
export const usePlans = (): UsePlansReturn => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const plansData = await getPublicPlans();
      setPlans(plansData);
    } catch (err) {
      console.error('Failed to fetch plans:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const getPlanById = (id: string): Plan | undefined => {
    return plans.find(plan => plan._id === id);
  };

  const getPlansByCategory = (category: string): Plan[] => {
    return filterPlans(plans, { category });
  };

  const getPlansByType = (type: string): Plan[] => {
    return filterPlans(plans, { planType: type as any });
  };

  const getActivePlans = (): Plan[] => {
    return filterPlans(plans, { isActive: true });
  };

  const getFeaturedPlans = (): Plan[] => {
    return filterPlans(plans, { isFeatured: true, isActive: true });
  };

  const getPopularPlans = (): Plan[] => {
    return filterPlans(plans, { isPopular: true, isActive: true });
  };

  return {
    plans,
    loading,
    error,
    refetch: fetchPlans,
    getPlanById,
    getPlansByCategory,
    getPlansByType,
    getActivePlans,
    getFeaturedPlans,
    getPopularPlans,
  };
};

interface UsePlanReturn {
  plan: Plan | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Individual plan hook for specific plan data
export const usePlan = (planId: string): UsePlanReturn => {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = async () => {
    if (!planId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const planData = await getPublicPlanById(planId);
      setPlan(planData);
    } catch (err) {
      console.error('Failed to fetch plan:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch plan');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [planId]);

  return {
    plan,
    loading,
    error,
    refetch: fetchPlan,
  };
};

// Helper hook for plan formatting and utilities
export const usePlanHelpers = () => {
  const formatPrice = (plan: Plan, billingCycle: 'monthly' | 'yearly' | 'oneTime' = 'monthly'): string => {
    return formatPlanPrice(plan, billingCycle);
  };

  const getPlanFeatures = (plan: Plan): string[] => {
    return plan.features || [];
  };

  const getPlanDisplayName = (plan: Plan): string => {
    return plan.displayName || plan.name || 'Unknown Plan';
  };

  const isPlanDowngrade = (currentPlan: Plan, targetPlan: Plan): boolean => {
    // Define plan hierarchy for downgrade logic
    const planHierarchy = {
      'basic': 1,
      'diamond': 2,
      'infinity': 3,
      'ultimate': 4,
      'script': 1,
      'custom': 5
    };

    const currentLevel = planHierarchy[currentPlan.category] || 0;
    const targetLevel = planHierarchy[targetPlan.category] || 0;

    return targetLevel < currentLevel;
  };

  const getPlanBadgeVariant = (plan: Plan) => {
    if (plan.isFeatured) return 'default';
    if (plan.isPopular) return 'secondary';
    if (plan.category === 'basic') return 'outline';
    return 'secondary';
  };

  const getPlanIcon = (plan: Plan) => {
    // Return appropriate icon based on plan category
    const iconMap = {
      'basic': 'User',
      'diamond': 'Crown',
      'infinity': 'Infinity',
      'ultimate': 'Star',
      'script': 'Code',
      'custom': 'Settings'
    };
    
    return iconMap[plan.category] || 'Package';
  };

  return {
    formatPrice,
    getPlanFeatures,
    getPlanDisplayName,
    isPlanDowngrade,
    getPlanBadgeVariant,
    getPlanIcon,
  };
};