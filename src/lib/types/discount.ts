/**
 * TypeScript interfaces for discount management system
 * Defines comprehensive types for discounts, validation, and API responses
 */

export type DiscountType = 'percentage' | 'fixed_amount' | 'free_trial' | 'buy_one_get_one' | 'tiered';
export type DiscountStatus = 'active' | 'inactive' | 'expired' | 'scheduled';
export type SubscriptionTier = 'basic' | 'script' | 'infinity' | 'diamond';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'CAD';

// Base discount interface
export interface Discount {
  _id: string;
  code: string;
  name: string;
  description?: string;
  type: DiscountType;
  value: number;
  currency?: Currency;
  
  // Usage limits
  maxUses?: number;
  maxUsesPerUser?: number;
  currentUses: number;
  
  // Time validity
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  
  // Purchase requirements
  minimumPurchase?: number;
  
  // Applicability
  applicableSubscriptions?: SubscriptionTier[];
  applicableProducts?: string[];
  
  // Rules
  stackable: boolean;
  isActive: boolean;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  tags?: string[];
  
  // Calculated fields
  isExpired: boolean;
  remainingUses?: number;
  usagePercentage: number;
}

// Request interfaces for API operations
export interface CreateDiscountRequest {
  code: string;
  name: string;
  description?: string;
  type: DiscountType;
  value: number;
  currency?: Currency;
  maxUses?: number;
  maxUsesPerUser?: number;
  startDate: string;
  endDate: string;
  minimumPurchase?: number;
  applicableSubscriptions?: SubscriptionTier[];
  applicableProducts?: string[];
  stackable?: boolean;
  isActive?: boolean;
  tags?: string[];
}

export interface UpdateDiscountRequest {
  id: string;
  name?: string;
  description?: string;
  value?: number;
  maxUses?: number;
  maxUsesPerUser?: number;
  endDate?: string;
  minimumPurchase?: number;
  applicableSubscriptions?: SubscriptionTier[];
  applicableProducts?: string[];
  stackable?: boolean;
  isActive?: boolean;
  tags?: string[];
}

// Discount validation interfaces
export interface ValidateDiscountRequest {
  code: string;
  userId?: string;
  subscriptionTier?: SubscriptionTier;
  cartTotal: number;
  currency: Currency;
  products?: string[];
}

export interface DiscountValidationResult {
  isValid: boolean;
  discount?: Discount;
  applicableAmount: number;
  discountAmount: number;
  finalTotal: number;
  errors?: string[];
  warnings?: string[];
  restrictions?: {
    minimumPurchaseNotMet?: boolean;
    subscriptionNotEligible?: boolean;
    productNotEligible?: boolean;
    usageLimitReached?: boolean;
    userLimitReached?: boolean;
    expired?: boolean;
    notActive?: boolean;
  };
}

// Preview calculation interfaces
export interface PreviewDiscountRequest {
  discountId: string;
  cartTotal: number;
  currency: Currency;
  subscriptionTier?: SubscriptionTier;
  products?: string[];
  userId?: string;
}

export interface DiscountPreviewResult {
  discount: Discount;
  originalTotal: number;
  discountAmount: number;
  finalTotal: number;
  savings: number;
  savingsPercentage: number;
  breakdown: {
    subtotal: number;
    discountApplied: number;
    tax?: number;
    shipping?: number;
    total: number;
  };
  applicability: {
    eligible: boolean;
    reasons?: string[];
  };
}

// List and filter interfaces
export interface DiscountFilters {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive' | 'expired' | 'all';
  type?: DiscountType;
  search?: string;
  sortBy?: 'createdAt' | 'name' | 'code' | 'endDate' | 'usageCount';
  sortOrder?: 'asc' | 'desc';
  tags?: string[];
  subscriptionTier?: SubscriptionTier;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface DiscountListResponse {
  discounts: Discount[];
  pagination: {
    current: number;
    pages: number;
    total: number;
    limit: number;
  };
  summary: {
    totalActive: number;
    totalInactive: number;
    totalExpired: number;
    totalUsage: number;
  };
}

// Bulk operations
export interface BulkDiscountOperation {
  action: 'activate' | 'deactivate' | 'delete';
  discountIds: string[];
}

export interface BulkDiscountResult {
  successful: string[];
  failed: Array<{
    id: string;
    error: string;
  }>;
  summary: {
    total: number;
    successful: number;
    failed: number;
  };
}

// Analytics and reporting
export interface DiscountUsageStats {
  discountId: string;
  code: string;
  name: string;
  totalUses: number;
  totalSavings: number;
  averageOrderValue: number;
  conversionRate: number;
  popularProducts: Array<{
    productId: string;
    productName: string;
    uses: number;
  }>;
  usageBySubscription: Array<{
    tier: SubscriptionTier;
    uses: number;
    savings: number;
  }>;
  usageOverTime: Array<{
    date: string;
    uses: number;
    savings: number;
  }>;
}

export interface DiscountReportRequest {
  discountIds?: string[];
  dateRange: {
    start: string;
    end: string;
  };
  groupBy?: 'day' | 'week' | 'month';
  includeDetails?: boolean;
}

export interface DiscountReport {
  summary: {
    totalDiscounts: number;
    totalUses: number;
    totalSavings: number;
    averageDiscount: number;
    topPerformingDiscount: {
      id: string;
      code: string;
      uses: number;
    };
  };
  discounts: DiscountUsageStats[];
  trends: Array<{
    period: string;
    totalUses: number;
    totalSavings: number;
    uniqueUsers: number;
  }>;
}

// API response wrappers
export interface DiscountApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  requestId?: string;
}

// Error types
export interface DiscountError {
  code: string;
  message: string;
  field?: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
  type: string;
}

// Usage tracking
export interface DiscountUsage {
  _id: string;
  discountId: string;
  discountCode: string;
  userId?: string;
  orderId?: string;
  originalAmount: number;
  discountAmount: number;
  finalAmount: number;
  currency: Currency;
  subscriptionTier?: SubscriptionTier;
  products?: string[];
  usedAt: string;
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    referrer?: string;
  };
}

// Configuration and settings
export interface DiscountConfiguration {
  maxActiveDiscounts: number;
  maxDiscountPercentage: number;
  maxDiscountAmount: number;
  allowStackableDiscounts: boolean;
  requireMinimumPurchase: boolean;
  defaultCurrency: Currency;
  supportedCurrencies: Currency[];
  autoExpireInactiveDays: number;
  maxUsesPerDiscount: number;
  maxUsesPerUser: number;
  enableAnalytics: boolean;
  enableNotifications: boolean;
}

// Frontend component props
export interface DiscountListProps {
  filters?: DiscountFilters;
  onDiscountSelect?: (discount: Discount) => void;
  onDiscountEdit?: (discount: Discount) => void;
  onDiscountDelete?: (discountId: string) => void;
  readonly?: boolean;
}

export interface DiscountFormProps {
  discount?: Discount;
  onSubmit: (discount: CreateDiscountRequest | UpdateDiscountRequest) => void;
  onCancel: () => void;
  loading?: boolean;
  error?: string;
}

export interface DiscountCardProps {
  discount: Discount;
  onSelect?: (discount: Discount) => void;
  onEdit?: (discount: Discount) => void;
  onDelete?: (discountId: string) => void;
  showActions?: boolean;
  compact?: boolean;
}

export interface ApplyDiscountProps {
  onApplyDiscount: (code: string) => Promise<DiscountValidationResult>;
  loading?: boolean;
  appliedDiscount?: Discount;
  onRemoveDiscount?: () => void;
}