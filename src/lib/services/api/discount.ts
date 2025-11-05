import { api, ApiResponse } from '../core/api-client';
import Cookies from 'js-cookie';

export interface DiscountVerificationRequest {
  code: string;
  orderAmount?: number;
  quantity?: number;
}

export interface DiscountInfo {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed_amount' | 'buy_x_get_y' | 'free_shipping';
  value: number;
  currency: string;
  constraints: {
    minimumOrderAmount?: number;
    maximumOrderAmount?: number;
    validUntil?: string;
    maxUsesPerUser?: number;
  };
}

// Raw API discount response interface (matches actual API structure)
interface ApiDiscountData {
  id: string;
  code: string;
  name: string;
  description: string;
  type: string;
  value: number;
  discountAmount?: number | null;
  finalPrice?: number | null;
  maxDiscount?: number | null;
  remainingUses?: number | null;
  currency?: string;
  constraints?: any;
  analytics?: {
    totalUses: number;
  };
  maxTotalUses?: number;
}

export interface DiscountCalculation {
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  savings: number;
  savingsPercentage: number;
}

export interface DiscountUsageInfo {
  totalUses: number;
  maxTotalUses?: number;
  remainingUses?: number;
}

export interface DiscountVerificationResponse {
  valid: boolean;
  discount: DiscountInfo;
  calculation: DiscountCalculation;
  usageInfo: DiscountUsageInfo;
}

export interface PublicDiscountsResponse {
  success: boolean;
  data: {
    docs: Array<{
      id: string;
      code: string;
      name: string;
      description: string;
      type: string;
      value: number;
      constraints: {
        minimumOrderAmount?: number;
        validUntil?: string;
      };
      analytics: {
        totalUses: number;
      };
    }>;
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
  };
  message: string;
}

class DiscountService {
  private readonly baseUrl = '/payments/discounts';

  /**
   * Check if user is authenticated
   */
  private isAuthenticated(): boolean {
    const token = Cookies.get('token');
    return !!token && token.trim() !== '';
  }

  /**
   * Transform raw API discount response to expected interface format
   */
  private transformDiscountResponse(
    apiData: any,
    orderAmount: number = 0
  ): DiscountVerificationResponse {
    if (!apiData || !apiData.valid || !apiData.discount) {
      throw new Error('Invalid discount response format');
    }

    const discount: ApiDiscountData = apiData.discount;

    // Calculate discount amount and final price if not provided by API
    let discountAmount = discount.discountAmount;
    let finalAmount = discount.finalPrice;

    if (discountAmount === null || finalAmount === null) {
      const calculation = this.calculateDiscountPreview(
        orderAmount,
        discount.type as 'percentage' | 'fixed_amount',
        discount.value,
        discount.maxDiscount || undefined
      );
      discountAmount = calculation.discountAmount;
      finalAmount = calculation.finalAmount;
    }

    return {
      valid: apiData.valid,
      discount: {
        id: discount.id,
        code: discount.code,
        name: discount.name,
        description: discount.description,
        type: discount.type as 'percentage' | 'fixed_amount' | 'buy_x_get_y' | 'free_shipping',
        value: discount.value,
        currency: discount.currency || 'USD',
        constraints: discount.constraints || {}
      },
      calculation: {
        originalAmount: orderAmount,
        discountAmount: discountAmount || 0,
        finalAmount: finalAmount || orderAmount,
        savings: discountAmount || 0,
        savingsPercentage: orderAmount > 0 ? Math.round(((discountAmount || 0) / orderAmount) * 100) : 0,
      },
      usageInfo: {
        totalUses: discount.analytics?.totalUses || 0,
        maxTotalUses: discount.maxTotalUses || undefined,
        remainingUses: discount.remainingUses || undefined,
      }
    };
  }

  /**
   * Get current user token
   */
  private getAuthToken(): string | null {
    return Cookies.get('token') || null;
  }

  /**
   * Verify a discount code publicly (no authentication required)
   */
  async verifyDiscountCode(data: DiscountVerificationRequest): Promise<DiscountVerificationResponse> {
    try {
      const response = await api.post<ApiResponse<any>>(
        `${this.baseUrl}/public/verify`,
        data
      );

      if (!response.success) {
        throw new Error(response.message || 'Failed to verify discount code');
      }

      // Transform API response using helper method
      return this.transformDiscountResponse(response.data, data.orderAmount || 0);
    } catch (error: any) {
      // Handle API errors gracefully
      if (error.message) {
        throw new Error(error.message);
      }
      throw new Error('Failed to verify discount code. Please try again.');
    }
  }

  /**
   * Get all public discount codes
   */
  async getPublicDiscounts(params?: {
    page?: number;
    limit?: number;
    type?: string;
    minOrderAmount?: number;
  }): Promise<PublicDiscountsResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());
      if (params?.type) queryParams.append('type', params.type);
      if (params?.minOrderAmount) queryParams.append('minOrderAmount', params.minOrderAmount.toString());

      const response = await api.get<PublicDiscountsResponse>(
        `${this.baseUrl}/public?${queryParams.toString()}`
      );

      if (!response.success) {
        throw new Error(response.message || 'Failed to fetch discount codes');
      }

      return response;
    } catch (error: any) {
      if (error.message) {
        throw new Error(error.message);
      }
      throw new Error('Failed to fetch discount codes. Please try again.');
    }
  }

  /**
   * Validate discount code (requires authentication)
   */
  async validateDiscountCode(data: DiscountVerificationRequest): Promise<DiscountVerificationResponse> {
    if (!this.isAuthenticated()) {
      throw new Error('Authentication required. Please log in to validate discount codes.');
    }

    try {
      const response = await api.post<ApiResponse<any>>(
        `${this.baseUrl}/validate`,
        data
      );

      if (!response.success) {
        throw new Error(response.message || 'Failed to validate discount code');
      }

      // Transform API response using helper method
      return this.transformDiscountResponse(response.data, data.orderAmount || 0);
    } catch (error: any) {
      if (error.message) {
        throw new Error(error.message);
      }
      throw new Error('Failed to validate discount code. Please try again.');
    }
  }

  /**
   * Apply discount code (requires authentication)
   */
  async applyDiscount(data: {
    discountCode: string;
    orderId?: string;
    originalAmount: number;
    quantity?: number;
  }): Promise<{
    discountId: string;
    code: string;
    name: string;
    originalAmount: number;
    discountAmount: number;
    finalAmount: number;
    savings: number;
    usageId: string;
  }> {
    if (!this.isAuthenticated()) {
      throw new Error('Authentication required. Please log in to apply discount codes.');
    }

    try {
      const response = await api.post<ApiResponse<any>>(
        `${this.baseUrl}/apply`,
        data
      );

      if (!response.success) {
        throw new Error(response.message || 'Failed to apply discount');
      }

      return response.data;
    } catch (error: any) {
      if (error.message) {
        throw new Error(error.message);
      }
      throw new Error('Failed to apply discount. Please try again.');
    }
  }

  /**
   * Format currency amount for display
   */
  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }

  /**
   * Calculate discount preview without API call
   */
  calculateDiscountPreview(
    originalAmount: number,
    discountType: 'percentage' | 'fixed_amount',
    discountValue: number,
    maxDiscount?: number
  ): DiscountCalculation {
    let discountAmount = 0;

    if (discountType === 'percentage') {
      discountAmount = (originalAmount * discountValue) / 100;
    } else if (discountType === 'fixed_amount') {
      discountAmount = discountValue;
    }

    // Apply maximum discount limit if specified
    if (maxDiscount && discountAmount > maxDiscount) {
      discountAmount = maxDiscount;
    }

    // Ensure discount doesn't exceed original amount
    discountAmount = Math.min(discountAmount, originalAmount);

    const finalAmount = Math.max(0, originalAmount - discountAmount);
    const savingsPercentage = originalAmount > 0 ? Math.round((discountAmount / originalAmount) * 100) : 0;

    return {
      originalAmount,
      discountAmount,
      finalAmount,
      savings: discountAmount,
      savingsPercentage,
    };
  }

  /**
   * Smart verification method that uses appropriate endpoint based on authentication
   */
  async smartVerifyDiscount(data: DiscountVerificationRequest): Promise<DiscountVerificationResponse> {
    if (this.isAuthenticated()) {
      // Use authenticated endpoint for better features and user-specific validation
      return this.validateDiscountCode(data);
    } else {
      // Use public endpoint for guest users
      return this.verifyDiscountCode(data);
    }
  }

  /**
   * Get user authentication status for UI components
   */
  getUserAuthStatus(): {
    isAuthenticated: boolean;
    hasToken: boolean;
    tokenPreview?: string;
  } {
    const token = this.getAuthToken();
    const isAuthenticated = this.isAuthenticated();

    return {
      isAuthenticated,
      hasToken: !!token,
      tokenPreview: token ? `${token.substring(0, 10)}...` : undefined
    };
  }

  /**
   * Get available discount methods based on user authentication
   */
  getAvailableMethods(): {
    canVerifyPublic: boolean;
    canValidateWithAuth: boolean;
    canApplyDiscount: boolean;
    recommendedMethod: 'public' | 'authenticated';
  } {
    const isAuth = this.isAuthenticated();

    return {
      canVerifyPublic: true, // Always available
      canValidateWithAuth: isAuth,
      canApplyDiscount: isAuth,
      recommendedMethod: isAuth ? 'authenticated' : 'public'
    };
  }
}

export const discountService = new DiscountService();
export default discountService;