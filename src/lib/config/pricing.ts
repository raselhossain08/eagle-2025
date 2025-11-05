// Dynamic pricing configuration using Plan API
import { getPublicPlans, formatPlanPrice, Plan } from '../services/api/plan';

// Export functions to get dynamic pricing
export { getPublicPlans, formatPlanPrice } from '../services/api/plan';

// Get plan by category
export const getPlanByCategory = async (category: string): Promise<Plan | null> => {
  try {
    const plans = await getPublicPlans();
    return plans.find(plan => plan.category === category && plan.isActive) || null;
  } catch (error) {
    console.error('Error fetching plan by category:', error);
    return null;
  }
};

// Get subscription plans only
export const getSubscriptionPlans = async (): Promise<Plan[]> => {
  try {
    const plans = await getPublicPlans();
    return plans.filter(plan => plan.planType === 'subscription' && plan.isActive);
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return [];
  }
};

// Get mentorship plans only
export const getMentorshipPlans = async (): Promise<Plan[]> => {
  try {
    const plans = await getPublicPlans();
    return plans.filter(plan => plan.planType === 'mentorship' && plan.isActive);
  } catch (error) {
    console.error('Error fetching mentorship plans:', error);
    return [];
  }
};

// Default export for convenience
export default {
  getPublicPlans,
  formatPlanPrice,
  getPlanByCategory,
  getSubscriptionPlans,
  getMentorshipPlans,
};