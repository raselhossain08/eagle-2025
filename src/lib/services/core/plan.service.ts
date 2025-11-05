// Frontend Plan Service
// Simplified service for fetching plans from the backend API

export interface FrontendPlan {
  _id: string;
  name: string;
  displayName: string;
  description: string;
  planType: 'subscription' | 'mentorship' | 'script' | 'addon';
  category: 'basic' | 'diamond' | 'infinity' | 'ultimate' | 'script' | 'custom';
  pricing: {
    monthly?: {
      price: number;
      originalPrice?: number;
      discount?: string;
      savings?: number;
    };
    annual?: {
      price: number;
      originalPrice?: number;
      discount?: string;
      savings?: number;
    };
    oneTime?: {
      price: number;
      originalPrice?: number;
      memberPrice?: number;
      savings?: number;
    };
  };
  features: string[];
  ui: {
    icon: string;
    gradient: string;
    color: string;
    badgeText?: string;
    badgeColor: string;
  };
  isActive: boolean;
  isPopular: boolean;
  isRecommended: boolean;
  isFeatured: boolean;
  sortOrder: number;
  accessLevel: number;
  tags: string[];
}

export interface PlansResponse {
  success: boolean;
  data?: FrontendPlan[];
  count?: number;
  message?: string;
  error?: string;
}

class FrontendPlanService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  }

  /**
   * Fetch all public plans grouped by type
   */
  async getPublicPlans(): Promise<Record<string, FrontendPlan[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/plans/public`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache', // Always fetch fresh data
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        // Handle the nested response structure - data is already grouped by type
        const nestedData = data.data;

        return {
          subscription: nestedData.subscription || [],
          mentorship: nestedData.mentorship || [],
          script: nestedData.script || [],
          addon: [] // No addon category in current API response
        };
      } else {
        throw new Error(data.error || 'Failed to fetch plans');
      }
    } catch (error) {
      console.error('Error fetching public plans:', error);

      // Return fallback data structure
      return {
        subscription: [],
        mentorship: [],
        script: [],
        addon: []
      };
    }
  }  /**
   * Fetch plans by specific type
   */
  async getPlansByType(planType: 'subscription' | 'mentorship' | 'script' | 'addon'): Promise<FrontendPlan[]> {
    const maxRetries = 3;
    const timeout = 10000; // 10 seconds

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(`${this.baseUrl}/plans/public`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-cache',
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          // Handle the nested response structure
          const nestedData = data.data;

          // Return plans from the appropriate category
          switch (planType) {
            case 'subscription':
              return nestedData.subscription || [];
            case 'mentorship':
              return nestedData.mentorship || [];
            case 'script':
              return nestedData.script || [];
            case 'addon':
              // Addons might be mixed in with scripts or other categories
              // For now, return empty array since no addon category exists in the response
              return [];
            default:
              return [];
          }
        } else {
          throw new Error(data.error || 'Failed to fetch plans');
        }
      } catch (error) {
        console.error(`Error fetching ${planType} plans (attempt ${attempt}):`, error);

        // If this is the last attempt or it's not a network error, break
        if (attempt === maxRetries || (error instanceof Error && error.name === 'AbortError')) {
          break;
        }

        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }

    return [];
  }

  /**
   * Fetch subscription plans only
   */
  async getSubscriptionPlans(): Promise<FrontendPlan[]> {
    // Check cache first
    const cacheKey = 'subscription_plans';
    const cached = this.getCachedPlans(cacheKey);
    if (cached && cached.length > 0) {
      return cached;
    }

    const plans = await this.getPlansByType('subscription');

    // Cache the results
    if (plans && plans.length > 0) {
      this.setCachedPlans(cacheKey, plans);
    }

    return plans;
  }

  /**
   * Fetch mentorship plans only
   */
  async getMentorshipPlans(): Promise<FrontendPlan[]> {
    return this.getPlansByType('mentorship');
  }

  /**
   * Fetch script plans only
   */
  async getScriptPlans(): Promise<FrontendPlan[]> {
    return this.getPlansByType('script');
  }

  /**
   * Fetch addon plans only
   */
  async getAddonPlans(): Promise<FrontendPlan[]> {
    return this.getPlansByType('addon');
  }

  /**
   * Fetch featured plans across all types
   */
  async getFeaturedPlans(): Promise<FrontendPlan[]> {
    try {
      const allPlans = await this.getPublicPlans();
      const featuredPlans: FrontendPlan[] = [];

      // Collect featured plans from all categories
      Object.values(allPlans).forEach(planArray => {
        if (Array.isArray(planArray)) {
          featuredPlans.push(...planArray.filter(plan => plan.isFeatured));
        }
      });

      // Sort by sortOrder
      return featuredPlans.sort((a, b) => a.sortOrder - b.sortOrder);
    } catch (error) {
      console.error('Error fetching featured plans:', error);
      return [];
    }
  }

  /**
   * Fetch popular plans across all types
   */
  async getPopularPlans(): Promise<FrontendPlan[]> {
    try {
      const allPlans = await this.getPublicPlans();
      const popularPlans: FrontendPlan[] = [];

      // Collect popular plans from all categories
      Object.values(allPlans).forEach(planArray => {
        if (Array.isArray(planArray)) {
          popularPlans.push(...planArray.filter(plan => plan.isPopular));
        }
      });

      // Sort by sortOrder
      return popularPlans.sort((a, b) => a.sortOrder - b.sortOrder);
    } catch (error) {
      console.error('Error fetching popular plans:', error);
      return [];
    }
  }  /**
   * Get a single plan by ID (public route)
   */
  async getPlanById(id: string): Promise<FrontendPlan | null> {
    try {
      const response = await fetch(`${this.baseUrl}/plans/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        return data.data;
      } else {
        throw new Error(data.error || 'Plan not found');
      }
    } catch (error) {
      console.error(`Error fetching plan ${id}:`, error);
      return null;
    }
  }

  /**
   * Transform plan data for compatibility with existing frontend code
   */
  transformPlanForFrontend(plan: FrontendPlan) {
    return {
      id: plan._id,
      name: plan.name,
      displayName: plan.displayName,
      description: plan.description,
      type: plan.planType,
      category: plan.category,
      price: this.getPrimaryPrice(plan),
      originalPrice: this.getOriginalPrice(plan),
      memberPrice: plan.pricing.oneTime?.memberPrice,
      features: plan.features,
      icon: plan.ui.icon,
      gradient: plan.ui.gradient,
      color: plan.ui.color,
      badge: plan.ui.badgeText,
      badgeColor: plan.ui.badgeColor,
      isPopular: plan.isPopular,
      isRecommended: plan.isRecommended,
      isFeatured: plan.isFeatured,
      accessLevel: plan.accessLevel,
      tags: plan.tags,
      // Add pricing details for different billing cycles
      monthlyPrice: plan.pricing.monthly?.price,
      annualPrice: plan.pricing.annual?.price,
      oneTimePrice: plan.pricing.oneTime?.price,
    };
  }

  /**
   * Get the primary price for display
   */
  private getPrimaryPrice(plan: FrontendPlan): number {
    if (plan.pricing.monthly) return plan.pricing.monthly.price;
    if (plan.pricing.annual) return plan.pricing.annual.price;
    if (plan.pricing.oneTime) return plan.pricing.oneTime.price;
    return 0;
  }

  /**
   * Get the original price (for showing discounts)
   */
  private getOriginalPrice(plan: FrontendPlan): number | undefined {
    if (plan.pricing.monthly?.originalPrice) return plan.pricing.monthly.originalPrice;
    if (plan.pricing.annual?.originalPrice) return plan.pricing.annual.originalPrice;
    if (plan.pricing.oneTime?.originalPrice) return plan.pricing.oneTime.originalPrice;
    return undefined;
  }

  /**
   * Cache key for localStorage
   */
  private getCacheKey(key: string): string {
    return `eagle_plans_${key}`;
  }

  /**
   * Cache plans in localStorage for performance
   */
  private setCachedPlans(key: string, data: any): void {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + (5 * 60 * 1000), // 5 minutes cache
      };
      localStorage.setItem(this.getCacheKey(key), JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache plans:', error);
    }
  }

  /**
   * Get cached plans from localStorage
   */
  private getCachedPlans(key: string): any | null {
    try {
      const cached = localStorage.getItem(this.getCacheKey(key));
      if (!cached) return null;

      const cacheData = JSON.parse(cached);
      if (Date.now() > cacheData.expiry) {
        localStorage.removeItem(this.getCacheKey(key));
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.warn('Failed to get cached plans:', error);
      return null;
    }
  }

  /**
   * Clear all cached plans
   */
  clearCache(): void {
    try {
      const keys = ['public', 'subscription', 'mentorship', 'script', 'addon', 'featured', 'popular'];
      keys.forEach(key => {
        localStorage.removeItem(this.getCacheKey(key));
      });
    } catch (error) {
      console.warn('Failed to clear plans cache:', error);
    }
  }
}

// Export singleton instance
export default new FrontendPlanService();
