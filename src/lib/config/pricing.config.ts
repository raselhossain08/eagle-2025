// Dynamic pricing configuration - now uses Plan API for real-time pricing
import { getPublicPlans, formatPlanPrice, Plan } from '../services/api/plan';

// Cache for pricing data to avoid repeated API calls
let pricingCache: Plan[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper functions for price formatting
export const formatPrice = (price: number | string) => {
  if (typeof price === 'string') return price;
  return `$${price}`;
};

export const formatPriceWithPeriod = (price: number | string, period: 'monthly' | 'annual' = 'monthly') => {
  if (typeof price === 'string') return price;
  return `$${price}/${period === 'monthly' ? 'month' : 'year'}`;
};

// Get dynamic pricing info for a specific plan and billing cycle
export const getPricingInfo = async (planName: string, billing: 'monthly' | 'annual' = 'monthly') => {
  try {
    // Check cache
    const now = Date.now();
    if (pricingCache && (now - cacheTimestamp) < CACHE_DURATION) {
      const plan = pricingCache.find((p: Plan) =>
        p.name.toLowerCase() === planName.toLowerCase() ||
        p.displayName?.toLowerCase() === planName.toLowerCase() ||
        p.category.toLowerCase() === planName.toLowerCase()
      );
      if (plan) {
        let pricingData;
        if (billing === 'monthly') {
          pricingData = typeof plan.pricing?.monthly === 'number' ?
            plan.pricing.monthly :
            plan.pricing?.monthly?.price || 0;
        } else {
          pricingData = plan.pricing?.yearly ||
            (typeof plan.pricing?.annual === 'number' ?
              plan.pricing.annual :
              plan.pricing?.annual?.price) || 0;
        }

        return {
          price: pricingData,
          originalPrice: pricingData,
          discount: "0%",
          savings: 0
        };
      }
    }

    // Fetch fresh data from API
    const apiPlans = await getPublicPlans();
    pricingCache = apiPlans;
    cacheTimestamp = now;

    const plan = apiPlans.find((p: Plan) =>
      p.name.toLowerCase() === planName.toLowerCase() ||
      p.displayName?.toLowerCase() === planName.toLowerCase() ||
      p.category.toLowerCase() === planName.toLowerCase()
    );

    if (plan) {
      let pricingData;
      if (billing === 'monthly') {
        pricingData = typeof plan.pricing?.monthly === 'number' ?
          plan.pricing.monthly :
          plan.pricing?.monthly?.price || 0;
      } else {
        pricingData = plan.pricing?.yearly ||
          (typeof plan.pricing?.annual === 'number' ?
            plan.pricing.annual :
            plan.pricing?.annual?.price) || 0;
      }

      return {
        price: pricingData,
        originalPrice: pricingData,
        discount: "0%",
        savings: 0
      };
    }

    throw new Error(`Plan ${planName} not found`);
  } catch (error) {
    console.error('Error fetching pricing info:', error);
    // Fallback to default values
    return {
      price: 0,
      originalPrice: 0,
      discount: "0%",
      savings: 0
    };
  }
};

// Get all active subscription plans
export const getSubscriptionPlans = async () => {
  try {
    const { getPublicSubscriptionPlans } = await import('../services/api/plan');
    const plans = await getPublicSubscriptionPlans();
    return plans.filter(plan => plan.isActive);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return [];
  }
};

// Get all active mentorship plans
export const getMentorshipPlans = async () => {
  try {
    const { getPublicMentorshipPlans } = await import('../services/api/plan');
    const plans = await getPublicMentorshipPlans();
    return plans.filter(plan => plan.isActive);
  } catch (error) {
    console.error('Error fetching mentorship plans:', error);
    return [];
  }
};

// Legacy PRICING_CONFIG for backward compatibility - now deprecated
// @deprecated Use getPricingInfo() instead for dynamic pricing
export const PRICING_CONFIG = {
  infinity: {
    monthly: { price: 127, originalPrice: 187, discount: "32%", savings: 60 },
    annual: { price: 1270, originalPrice: 2244, discount: "43%", savings: 974 }
  },
  diamond: {
    monthly: { price: 76, originalPrice: 97, discount: "21%", savings: 21 },
    annual: { price: 760, originalPrice: 1164, discount: "35%", savings: 404 }
  }
} as const;
