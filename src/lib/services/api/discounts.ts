import { api, ApiResponse } from '../core/api-client';
import type {
  Discount,
  CreateDiscountRequest,
  UpdateDiscountRequest,
  ValidateDiscountRequest,
  DiscountValidationResult,
  PreviewDiscountRequest,
  DiscountPreviewResult,
  DiscountFilters,
  DiscountListResponse,
  BulkDiscountOperation,
  BulkDiscountResult,
  DiscountUsageStats,
  DiscountReportRequest,
  DiscountReport,
  DiscountConfiguration,
  DiscountUsage
} from '@/lib/types/discount';

/**
 * Comprehensive discount management service
 * Handles discount CRUD operations, validation, preview calculations,
 * and reporting functionality.
 */
export class DiscountService {
  private readonly basePath = '/api/discounts';

  constructor() {
    // No parent constructor needed
  }

  // CRUD Operations
  async createDiscount(discount: CreateDiscountRequest): Promise<ApiResponse<Discount>> {
    return api.post<ApiResponse<Discount>>(`${this.basePath}`, discount);
  }

  async getDiscount(id: string): Promise<ApiResponse<Discount>> {
    return api.get<ApiResponse<Discount>>(`${this.basePath}/${id}`);
  }

  async getDiscountByCode(code: string): Promise<ApiResponse<Discount>> {
    return api.get<ApiResponse<Discount>>(`${this.basePath}/code/${code}`);
  }

  async updateDiscount(discount: UpdateDiscountRequest): Promise<ApiResponse<Discount>> {
    return api.put<ApiResponse<Discount>>(`${this.basePath}/${discount.id}`, discount);
  }

  async deleteDiscount(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/${id}`);
  }

  async getDiscounts(filters?: DiscountFilters): Promise<ApiResponse<DiscountListResponse>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const url = `${this.basePath}${params.toString() ? `?${params.toString()}` : ''}`;
    return api.get<ApiResponse<DiscountListResponse>>(url);
  }

  // Validation and Preview
  async validateDiscountCode(request: ValidateDiscountRequest): Promise<ApiResponse<DiscountValidationResult>> {
    return api.post<ApiResponse<DiscountValidationResult>>(
      `${this.basePath}/validate/${request.code}`,
      {
        userId: request.userId,
        subscriptionTier: request.subscriptionTier,
        cartTotal: request.cartTotal,
        currency: request.currency,
        products: request.products
      }
    );
  }

  async previewDiscount(request: PreviewDiscountRequest): Promise<ApiResponse<DiscountPreviewResult>> {
    return api.post<ApiResponse<DiscountPreviewResult>>(
      `${this.basePath}/${request.discountId}/preview`,
      {
        cartTotal: request.cartTotal,
        currency: request.currency,
        subscriptionTier: request.subscriptionTier,
        products: request.products,
        userId: request.userId
      }
    );
  }

  // Bulk Operations
  async bulkOperation(operation: BulkDiscountOperation): Promise<ApiResponse<BulkDiscountResult>> {
    return api.post<ApiResponse<BulkDiscountResult>>(`${this.basePath}/bulk`, operation);
  }

  // Analytics and Reporting
  async getDiscountStats(discountId: string): Promise<ApiResponse<DiscountUsageStats>> {
    return api.get<ApiResponse<DiscountUsageStats>>(`${this.basePath}/${discountId}/stats`);
  }

  async generateReport(request: DiscountReportRequest): Promise<ApiResponse<DiscountReport>> {
    return api.post<ApiResponse<DiscountReport>>(`${this.basePath}/reports`, request);
  }

  async getConfiguration(): Promise<ApiResponse<DiscountConfiguration>> {
    return api.get<ApiResponse<DiscountConfiguration>>(`${this.basePath}/config`);
  }

  async trackUsage(usage: Omit<DiscountUsage, '_id' | 'usedAt'>): Promise<ApiResponse<void>> {
    return api.post<ApiResponse<void>>(`${this.basePath}/usage`, {
      ...usage,
      usedAt: new Date().toISOString()
    });
  }

  // Utility methods for client-side discount calculations
  /**
   * Calculate discount amount for preview purposes
   * @param discount - Discount object
   * @param cartTotal - Cart total amount
   * @returns Calculated discount amount
   */
  calculateDiscountAmount(discount: Discount, cartTotal: number): number {
    if (discount.minimumPurchase && cartTotal < discount.minimumPurchase) {
      return 0;
    }

    switch (discount.type) {
      case 'percentage':
        return (cartTotal * discount.value) / 100;
      
      case 'fixed_amount':
        return Math.min(discount.value, cartTotal);
      
      case 'free_trial':
        return cartTotal; // Full discount for free trial
      
      default:
        return 0;
    }
  }

  /**
   * Check if discount is currently valid
   * @param discount - Discount object to validate
   * @returns Boolean indicating if discount is valid
   */
  isDiscountValid(discount: Discount): boolean {
    const now = new Date();
    const startDate = new Date(discount.startDate);
    const endDate = new Date(discount.endDate);

    return (
      discount.isActive &&
      now >= startDate &&
      now <= endDate &&
      (!discount.maxUses || discount.currentUses < discount.maxUses)
    );
  }
}

// Create and export singleton instance
export const discountService = new DiscountService();

// Export utility functions for standalone use
export const discountUtils = {
  calculateDiscountAmount: discountService.calculateDiscountAmount.bind(discountService),
  isDiscountValid: discountService.isDiscountValid.bind(discountService),
};

// Re-export types for convenience
export type {
  Discount,
  DiscountType,
  SubscriptionTier,
  DiscountStatus,
  CreateDiscountRequest,
  UpdateDiscountRequest,
  DiscountFilters,
  ValidateDiscountRequest as ValidateDiscountCodeRequest,
  DiscountValidationResult as ValidateDiscountCodeResponse,
  PreviewDiscountRequest,
  DiscountPreviewResult as PreviewDiscountResponse,
  DiscountPreviewResult as DiscountPreviewCalculation
} from '@/lib/types/discount';