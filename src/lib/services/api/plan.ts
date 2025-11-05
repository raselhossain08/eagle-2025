import { api, ApiResponse, PaginatedResponse } from '../core/api-client';

// Public plans response structure
export interface PublicPlansResponse {
  script: Plan[];
  mentorship: Plan[];
  subscription: Plan[];
}

// Plan interfaces
export interface Plan {
  _id: string;
  name: string;
  displayName: string;
  category: 'basic' | 'diamond' | 'infinity' | 'ultimate' | 'script' | 'custom';
  planType: 'subscription' | 'mentorship' | 'script' | 'addon';
  pricing: {
    monthly?: {
      price?: number;
      originalPrice?: number;
      discount?: string;
      savings?: number;
    };
    annual?: {
      price?: number;
      originalPrice?: number;
      discount?: string;
      savings?: number;
    };
    oneTime?: {
      price?: number;
      originalPrice?: number;
      memberPrice?: number;
      savings?: number;
    };
    // Keep backward compatibility
    yearly?: number;
    currency?: string;
  };
  features: string[];
  advancedFeatures?: Array<{
    name: string;
    description?: string;
    isExclusive?: boolean;
  }>;
  ui?: {
    icon?: string;
    gradient?: string;
    color?: string;
    badgeText?: string;
    badgeColor?: string;
  };
  description?: string;
  isActive: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  sortOrder?: number;
  accessLevel?: number;
  tags?: string[];
  limits?: {
    maxUsers?: number;
    maxFeatures?: number;
    supportLevel?: string;
  };
  trial?: {
    isEnabled: boolean;
    durationDays?: number;
  };
  metadata?: Record<string, any>;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PlanStats {
  totalPlans: number;
  activePlans: number;
  featuredPlans: number;
  plansByCategory: Record<string, number>;
  plansByType: Record<string, number>;
  revenue: {
    monthly: number;
    yearly: number;
    total: number;
  };
}

export interface CreatePlanRequest {
  name: string;
  displayName: string;
  category: Plan['category'];
  planType: Plan['planType'];
  pricing: Plan['pricing'];
  features: string[];
  description?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  sortOrder?: number;
  limits?: Plan['limits'];
  trial?: Plan['trial'];
  metadata?: Record<string, any>;
}

export interface UpdatePlanRequest extends Partial<CreatePlanRequest> {
  _id: string;
}

export interface PlanFilters {
  category?: string;
  planType?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// === Public Plan endpoints (no authentication required) ===

/**
 * Get all active plans for public display
 */
export const getPublicPlans = async (): Promise<Plan[]> => {
  try {
    const response = await api.get<ApiResponse<PublicPlansResponse>>('/plans/public');

    // Handle the nested structure and flatten all plans into a single array
    if (response.data) {
      const allPlans: Plan[] = [
        ...(response.data.script || []),
        ...(response.data.mentorship || []),
        ...(response.data.subscription || [])
      ];
      return allPlans;
    }

    return [];
  } catch (error) {
    console.error("Get public plans error:", error);
    return [];
  }
};

/**
 * Get public plan by ID
 */
export const getPublicPlanById = async (planId: string): Promise<Plan> => {
  try {
    const response = await api.get<ApiResponse<Plan>>(`/plans/public/${planId}`);
    if (!response.data) throw new Error('Plan not found');
    return response.data;
  } catch (error) {
    console.error("Get public plan by ID error:", error);
    throw error;
  }
};

// === Protected Plan endpoints (authentication required) ===

/**
 * Get all plans with filtering and pagination (admin only)
 */
export const getAllPlans = async (filters?: PlanFilters): Promise<PaginatedResponse<Plan[]>> => {
  try {
    const response = await api.get<PaginatedResponse<Plan[]>>('/plans', { params: filters });
    return response;
  } catch (error) {
    console.error("Get all plans error:", error);
    throw error;
  }
};

/**
 * Get plan statistics (admin only)
 */
export const getPlanStats = async (): Promise<ApiResponse<PlanStats>> => {
  try {
    const response = await api.get<ApiResponse<PlanStats>>('/plans/stats');
    return response;
  } catch (error) {
    console.error("Get plan stats error:", error);
    throw error;
  }
};

/**
 * Get plan by ID (admin only)
 */
export const getPlanById = async (planId: string): Promise<Plan> => {
  try {
    const response = await api.get<ApiResponse<Plan>>(`/plans/${planId}`);
    if (!response.data) throw new Error('Plan not found');
    return response.data;
  } catch (error) {
    console.error("Get plan by ID error:", error);
    throw error;
  }
};

/**
 * Create new plan (admin only)
 */
export const createPlan = async (planData: CreatePlanRequest): Promise<Plan> => {
  try {
    const response = await api.post<ApiResponse<Plan>>('/plans', planData);
    if (!response.data) throw new Error('Failed to create plan');
    return response.data;
  } catch (error) {
    console.error("Create plan error:", error);
    throw error;
  }
};

/**
 * Update existing plan (admin only)
 */
export const updatePlan = async (planId: string, planData: Partial<CreatePlanRequest>): Promise<Plan> => {
  try {
    const response = await api.put<ApiResponse<Plan>>(`/plans/${planId}`, planData);
    if (!response.data) throw new Error('Failed to update plan');
    return response.data;
  } catch (error) {
    console.error("Update plan error:", error);
    throw error;
  }
};

/**
 * Delete plan (admin only)
 */
export const deletePlan = async (planId: string, permanent: boolean = false): Promise<void> => {
  try {
    await api.delete(`/plans/${planId}?permanent=${permanent}`);
  } catch (error) {
    console.error("Delete plan error:", error);
    throw error;
  }
};

/**
 * Bulk update plans (admin only)
 */
export const bulkUpdatePlans = async (updates: { id: string; data: Partial<Plan> }[]): Promise<void> => {
  try {
    await api.put('/plans/bulk', { updates });
  } catch (error) {
    console.error("Bulk update plans error:", error);
    throw error;
  }
};

/**
 * Duplicate plan (admin only)
 */
export const duplicatePlan = async (planId: string, newName?: string): Promise<Plan> => {
  try {
    const response = await api.post<ApiResponse<Plan>>(`/plans/${planId}/duplicate`, { newName });
    if (!response.data) throw new Error('Failed to duplicate plan');
    return response.data;
  } catch (error) {
    console.error("Duplicate plan error:", error);
    throw error;
  }
};

/**
 * Toggle plan archive status (admin only)
 */
export const toggleArchivePlan = async (planId: string): Promise<Plan> => {
  try {
    const response = await api.patch<ApiResponse<Plan>>(`/plans/${planId}/archive`);
    if (!response.data) throw new Error('Failed to toggle plan archive status');
    return response.data;
  } catch (error) {
    console.error("Toggle archive plan error:", error);
    throw error;
  }
};

/**
 * Get plans by type (admin only)
 */
export const getPlansByType = async (planType: Plan['planType']): Promise<Plan[]> => {
  try {
    const response = await api.get<ApiResponse<Plan[]>>(`/plans/type/${planType}`);
    return response.data || [];
  } catch (error) {
    console.error("Get plans by type error:", error);
    throw error;
  }
};

/**
 * Get plans by category (admin only)
 */
export const getPlansByCategory = async (category: Plan['category']): Promise<Plan[]> => {
  try {
    const response = await api.get<ApiResponse<Plan[]>>(`/plans/category/${category}`);
    return response.data || [];
  } catch (error) {
    console.error("Get plans by category error:", error);
    throw error;
  }
};

/**
 * Get featured and active plans
 */
export const getFeaturedActivePlans = async (): Promise<Plan[]> => {
  try {
    const response = await api.get<ApiResponse<Plan[]>>('/plans/featured/active');
    return response.data || [];
  } catch (error) {
    console.error("Get featured active plans error:", error);
    throw error;
  }
};

/**
 * Toggle plan featured status (admin only)
 */
export const togglePlanFeatured = async (planId: string): Promise<Plan> => {
  try {
    const response = await api.patch<ApiResponse<Plan>>(`/plans/${planId}/feature`);
    if (!response.data) throw new Error('Failed to toggle plan featured status');
    return response.data;
  } catch (error) {
    console.error("Toggle plan featured error:", error);
    throw error;
  }
};

/**
 * Toggle plan popular status (admin only)
 */
export const togglePlanPopular = async (planId: string): Promise<Plan> => {
  try {
    const response = await api.patch<ApiResponse<Plan>>(`/plans/${planId}/popular`);
    if (!response.data) throw new Error('Failed to toggle plan popular status');
    return response.data;
  } catch (error) {
    console.error("Toggle plan popular error:", error);
    throw error;
  }
};

/**
 * Reorder plans (admin only)
 */
export const reorderPlans = async (planOrders: { id: string; sortOrder: number }[]): Promise<void> => {
  try {
    await api.put('/plans/reorder', { planOrders });
  } catch (error) {
    console.error("Reorder plans error:", error);
    throw error;
  }
};

// === Helper functions ===

/**
 * Get active plans only
 */
export const getActivePlans = async (): Promise<Plan[]> => {
  try {
    const publicPlans = await getPublicPlans();
    return publicPlans.filter((plan: Plan) => plan.isActive !== false);
  } catch (error) {
    console.error("Get active plans error:", error);
    throw error;
  }
};

/**
 * Get public subscription plans only
 */
export const getPublicSubscriptionPlans = async (): Promise<Plan[]> => {
  try {
    const response = await api.get<ApiResponse<PublicPlansResponse>>('/plans/public');

    return response.data?.subscription || [];
  } catch (error) {
    console.error("Get public subscription plans error:", error);
    return [];
  }
};

/**
 * Get public mentorship plans only
 */
export const getPublicMentorshipPlans = async (): Promise<Plan[]> => {
  try {
    const response = await api.get<ApiResponse<PublicPlansResponse>>('/plans/public');

    return response.data?.mentorship || [];
  } catch (error) {
    console.error("Get public mentorship plans error:", error);
    return [];
  }
};

/**
 * Get public script plans only
 */
export const getPublicScriptPlans = async (): Promise<Plan[]> => {
  try {
    const response = await api.get<ApiResponse<PublicPlansResponse>>('/plans/public');

    return response.data?.script || [];
  } catch (error) {
    console.error("Get public script plans error:", error);
    return [];
  }
};

/**
 * Format plan pricing display
 */
export const formatPlanPrice = (plan: Plan, billingCycle: 'monthly' | 'yearly' | 'oneTime' = 'monthly'): string => {
  const pricing = plan.pricing;

  if (!pricing) return 'Contact for pricing';

  const price = pricing[billingCycle];
  const currency = pricing.currency || '$';

  if (price === undefined || price === null) {
    // Try fallback to monthly if requested cycle not available
    const fallbackPrice = pricing.monthly || pricing.yearly || pricing.oneTime;
    if (fallbackPrice !== undefined) {
      return `${currency}${fallbackPrice}`;
    }
    return 'Contact for pricing';
  }

  if (price === 0) return 'Free';

  return `${currency}${price}`;
};

/**
 * Get plan display name
 */
export const getPlanDisplayName = (plan: Plan): string => {
  return plan.displayName || plan.name || 'Unknown Plan';
};

/**
 * Check if plan has specific feature
 */
export const planHasFeature = (plan: Plan, feature: string): boolean => {
  if (!plan.features || !Array.isArray(plan.features)) return false;
  return plan.features.some((f: string) =>
    typeof f === 'string' && f.toLowerCase().includes(feature.toLowerCase())
  );
};

/**
 * Compare plans for sorting
 */
export const comparePlans = (a: Plan, b: Plan, sortBy: 'price' | 'name' = 'price'): number => {
  if (sortBy === 'price') {
    const priceA = (typeof a.pricing?.monthly === 'number' ? a.pricing.monthly : a.pricing?.monthly?.price) ||
      a.pricing?.yearly ||
      (typeof a.pricing?.oneTime === 'number' ? a.pricing.oneTime : a.pricing?.oneTime?.price) || 0;
    const priceB = (typeof b.pricing?.monthly === 'number' ? b.pricing.monthly : b.pricing?.monthly?.price) ||
      b.pricing?.yearly ||
      (typeof b.pricing?.oneTime === 'number' ? b.pricing.oneTime : b.pricing?.oneTime?.price) || 0;
    return (priceA as number) - (priceB as number);
  }

  if (sortBy === 'name') {
    const nameA = getPlanDisplayName(a).toLowerCase();
    const nameB = getPlanDisplayName(b).toLowerCase();
    return nameA.localeCompare(nameB);
  }

  return 0;
};

/**
 * Filter plans by criteria
 */
export const filterPlans = (plans: Plan[], filters: {
  category?: string;
  planType?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  priceRange?: { min: number; max: number };
}): Plan[] => {
  return plans.filter((plan: Plan) => {
    if (filters.category && plan.category !== filters.category) return false;
    if (filters.planType && plan.planType !== filters.planType) return false;
    if (filters.isActive !== undefined && plan.isActive !== filters.isActive) return false;
    if (filters.isFeatured !== undefined && plan.isFeatured !== filters.isFeatured) return false;
    if (filters.isPopular !== undefined && plan.isPopular !== filters.isPopular) return false;

    if (filters.priceRange) {
      const price = (typeof plan.pricing?.monthly === 'number' ? plan.pricing.monthly : plan.pricing?.monthly?.price) ||
        plan.pricing?.yearly ||
        (typeof plan.pricing?.oneTime === 'number' ? plan.pricing.oneTime : plan.pricing?.oneTime?.price) || 0;
      if ((price as number) < filters.priceRange.min || (price as number) > filters.priceRange.max) return false;
    }

    return true;
  });
};

/**
 * Get plan recommendations based on features
 */
export const getRecommendedPlans = async (requiredFeatures: string[]): Promise<Plan[]> => {
  try {
    const plans = await getPublicPlans();
    return plans
      .filter((plan: Plan) =>
        requiredFeatures.every((feature: string) => planHasFeature(plan, feature))
      )
      .sort((a: Plan, b: Plan) => comparePlans(a, b, 'price'));
  } catch (error) {
    console.error("Get recommended plans error:", error);
    throw error;
  }
};
