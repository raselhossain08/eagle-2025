import { api, ApiResponse, PaginatedResponse } from '../core/api-client';

// Subscription Types
export type SubscriptionType = "None" | "Basic" | "Diamond" | "Infinity" | "Script";
export type SubscriptionStatus = "active" | "inactive" | "pending" | "cancelled" | "suspended" | "paused";

// Interface definitions
export interface Subscription {
  _id: string;
  userId: string;
  planId: string;
  planName: string;
  planCategory: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate?: string;
  nextBillingDate?: string;
  billingCycle: 'monthly' | 'yearly' | 'oneTime';
  amount: number;
  currency: string;
  features: string[];
  paymentMethod?: string;
  autoRenew: boolean;
  trialPeriod?: {
    isActive: boolean;
    startDate: string;
    endDate: string;
  };
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionStatusResponse {
  success: boolean;
  subscription: SubscriptionType;
  subscriptionDetails?: Subscription;
  features: string[];
  user?: {
    id: string;
    email: string;
    subscription: SubscriptionType;
  };
}

export interface UpdateSubscriptionResponse {
  success: boolean;
  message: string;
  subscription: string;
  subscriptionDetails?: Subscription;
}

export interface ScheduleDowngradeResponse {
  success: boolean;
  message: string;
  scheduledDowngrade: {
    targetSubscription: string;
    effectiveDate: string;
    currentSubscription: string;
  };
}

export interface CancelDowngradeResponse {
  success: boolean;
  message: string;
}

export interface SubscriptionAnalytics {
  totalSubscriptions: number;
  activeSubscriptions: number;
  revenue: {
    monthly: number;
    yearly: number;
    total: number;
  };
  byPlan: Record<string, {
    count: number;
    revenue: number;
  }>;
  churnRate: number;
  growthRate: number;
}

export interface CreateSubscriptionRequest {
  userId: string;
  planId: string;
  billingCycle: 'monthly' | 'yearly' | 'oneTime';
  paymentMethodId?: string;
  startDate?: string;
  autoRenew?: boolean;
  metadata?: Record<string, any>;
}

// === User-facing subscription endpoints ===

/**
 * Get current user's subscription status
 */
export const getSubscriptionStatus = async (): Promise<SubscriptionStatusResponse> => {
  try {
    const response = await api.get<SubscriptionStatusResponse>('/subscription/status');
    return response;
  } catch (error) {
    console.error("Get subscription status error:", error);
    throw error;
  }
};

/**
 * Get current user's subscriptions
 */
export const getUserSubscriptions = async (): Promise<ApiResponse<Subscription[]>> => {
  try {
    const response = await api.get<ApiResponse<Subscription[]>>('/subscription/my-subscriptions');
    return response;
  } catch (error) {
    console.error("Get user subscriptions error:", error);
    throw error;
  }
};

/**
 * Update user subscription
 */
export const updateSubscription = async (
  subscription: SubscriptionType
): Promise<UpdateSubscriptionResponse> => {
  try {
    const response = await api.put<UpdateSubscriptionResponse>('/subscription/update', { subscription });
    return response;
  } catch (error) {
    console.error("Update subscription error:", error);
    throw error;
  }
};

/**
 * Schedule subscription downgrade
 */
export const scheduleDowngrade = async (
  targetSubscription: SubscriptionType,
  effectiveDate?: string
): Promise<ScheduleDowngradeResponse> => {
  try {
    const response = await api.post<ScheduleDowngradeResponse>('/subscription/schedule-downgrade', {
      targetSubscription,
      effectiveDate
    });
    return response;
  } catch (error) {
    console.error("Schedule downgrade error:", error);
    throw error;
  }
};

/**
 * Cancel scheduled downgrade
 */
export const cancelDowngrade = async (): Promise<CancelDowngradeResponse> => {
  try {
    const response = await api.post<CancelDowngradeResponse>('/subscription/cancel-downgrade');
    return response;
  } catch (error) {
    console.error("Cancel downgrade error:", error);
    throw error;
  }
};

// === Admin-only endpoints ===

/**
 * Get all subscriptions (admin only)
 */
export const getAllSubscriptions = async (
  params?: {
    page?: number;
    limit?: number;
    status?: SubscriptionStatus;
    planId?: string;
  }
): Promise<PaginatedResponse<Subscription[]>> => {
  try {
    const response = await api.get<PaginatedResponse<Subscription[]>>('/subscription', { params });
    return response;
  } catch (error) {
    console.error("Get all subscriptions error:", error);
    throw error;
  }
};

/**
 * Get subscription analytics (admin only)
 */
export const getSubscriptionAnalytics = async (): Promise<ApiResponse<SubscriptionAnalytics>> => {
  try {
    const response = await api.get<ApiResponse<SubscriptionAnalytics>>('/subscription/analytics');
    return response;
  } catch (error) {
    console.error("Get subscription analytics error:", error);
    throw error;
  }
};

/**
 * Create new subscription (admin only)
 */
export const createSubscription = async (
  subscriptionData: CreateSubscriptionRequest
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await api.post<ApiResponse<Subscription>>('/subscription', subscriptionData);
    return response;
  } catch (error) {
    console.error("Create subscription error:", error);
    throw error;
  }
};

/**
 * Get subscriptions expiring soon (admin only)
 */
export const getExpiringSoon = async (
  days: number = 7
): Promise<ApiResponse<Subscription[]>> => {
  try {
    const response = await api.get<ApiResponse<Subscription[]>>(`/subscription/expiring-soon?days=${days}`);
    return response;
  } catch (error) {
    console.error("Get expiring subscriptions error:", error);
    throw error;
  }
};

/**
 * Get subscriptions due for renewal (admin only)
 */
export const getDueForRenewal = async (): Promise<ApiResponse<Subscription[]>> => {
  try {
    const response = await api.get<ApiResponse<Subscription[]>>('/subscription/due-for-renewal');
    return response;
  } catch (error) {
    console.error("Get due for renewal subscriptions error:", error);
    throw error;
  }
};

/**
 * Get user's subscriptions by user ID (admin only)
 */
export const getUserSubscriptionsByUserId = async (
  userId: string
): Promise<ApiResponse<Subscription[]>> => {
  try {
    const response = await api.get<ApiResponse<Subscription[]>>(`/subscription/user/${userId}`);
    return response;
  } catch (error) {
    console.error("Get user subscriptions by ID error:", error);
    throw error;
  }
};

/**
 * Get subscriptions by plan ID (admin only)
 */
export const getSubscriptionsByPlanId = async (
  planId: string
): Promise<ApiResponse<Subscription[]>> => {
  try {
    const response = await api.get<ApiResponse<Subscription[]>>(`/subscription/plan/${planId}`);
    return response;
  } catch (error) {
    console.error("Get subscriptions by plan ID error:", error);
    throw error;
  }
};

/**
 * Get subscription by ID (admin only)
 */
export const getSubscriptionById = async (
  subscriptionId: string
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await api.get<ApiResponse<Subscription>>(`/subscription/${subscriptionId}`);
    return response;
  } catch (error) {
    console.error("Get subscription by ID error:", error);
    throw error;
  }
};

/**
 * Update subscription by ID (admin only)
 */
export const updateSubscriptionById = async (
  subscriptionId: string,
  updateData: Partial<Subscription>
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await api.put<ApiResponse<Subscription>>(`/subscription/${subscriptionId}`, updateData);
    return response;
  } catch (error) {
    console.error("Update subscription by ID error:", error);
    throw error;
  }
};

/**
 * Delete subscription (admin only)
 */
export const deleteSubscription = async (
  subscriptionId: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await api.delete<ApiResponse<void>>(`/subscription/${subscriptionId}`);
    return response;
  } catch (error) {
    console.error("Delete subscription error:", error);
    throw error;
  }
};

// === Subscription lifecycle actions (admin only) ===

/**
 * Cancel subscription (admin only)
 */
export const cancelSubscription = async (
  subscriptionId: string,
  reason?: string
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await api.post<ApiResponse<Subscription>>(`/subscription/${subscriptionId}/cancel`, { reason });
    return response;
  } catch (error) {
    console.error("Cancel subscription error:", error);
    throw error;
  }
};

/**
 * Reactivate subscription (admin only)
 */
export const reactivateSubscription = async (
  subscriptionId: string
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await api.post<ApiResponse<Subscription>>(`/subscription/${subscriptionId}/reactivate`);
    return response;
  } catch (error) {
    console.error("Reactivate subscription error:", error);
    throw error;
  }
};

/**
 * Suspend subscription (admin only)
 */
export const suspendSubscription = async (
  subscriptionId: string,
  reason?: string
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await api.post<ApiResponse<Subscription>>(`/subscription/${subscriptionId}/suspend`, { reason });
    return response;
  } catch (error) {
    console.error("Suspend subscription error:", error);
    throw error;
  }
};

/**
 * Resume subscription (admin only)
 */
export const resumeSubscription = async (
  subscriptionId: string
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await api.post<ApiResponse<Subscription>>(`/subscription/${subscriptionId}/resume`);
    return response;
  } catch (error) {
    console.error("Resume subscription error:", error);
    throw error;
  }
};

/**
 * Pause subscription (admin only)
 */
export const pauseSubscription = async (
  subscriptionId: string,
  pauseDuration?: number
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await api.post<ApiResponse<Subscription>>(`/subscription/${subscriptionId}/pause`, { pauseDuration });
    return response;
  } catch (error) {
    console.error("Pause subscription error:", error);
    throw error;
  }
};

/**
 * Schedule subscription downgrade (admin only)
 */
export const scheduleSubscriptionDowngrade = async (
  subscriptionId: string,
  targetPlanId: string,
  effectiveDate?: string
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await api.post<ApiResponse<Subscription>>(`/subscription/${subscriptionId}/schedule-downgrade`, {
      targetPlanId,
      effectiveDate
    });
    return response;
  } catch (error) {
    console.error("Schedule subscription downgrade error:", error);
    throw error;
  }
};

/**
 * Process subscription renewal (admin only)
 */
export const processRenewal = async (
  subscriptionId: string,
  paymentMethodId?: string
): Promise<ApiResponse<Subscription>> => {
  try {
    const response = await api.post<ApiResponse<Subscription>>(`/subscription/${subscriptionId}/renew`, { paymentMethodId });
    return response;
  } catch (error) {
    console.error("Process renewal error:", error);
    throw error;
  }
};
