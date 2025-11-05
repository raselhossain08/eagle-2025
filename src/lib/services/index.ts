// Export all API services
export * from './api/subscription';
export * from './api/plan';
export * from './api/contracts';
export * from './api/contract-templates';
export * from './api/functions';
export * from './api/user';
export * from './api/discount';
export * from './api/discounts';
export * from './api/notifications';
export * from './api/billing';

// Export analytics services
export * from './analytics';

// Export core services
export * from './core/api-client';
export * from './core/subscriberProfile.service';

// Re-export types for convenience
export type {
  Subscription,
  SubscriptionType,
  SubscriptionStatus,
  SubscriptionStatusResponse,
  SubscriptionAnalytics,
  CreateSubscriptionRequest,
} from './api/subscription';

export type {
  Plan,
  PlanStats,
  CreatePlanRequest,
  UpdatePlanRequest,
  PlanFilters,
} from './api/plan';

export type {
  ApiResponse,
  PaginatedResponse,
} from './core/api-client';

export type {
  SubscriberProfile,
  PersonalInfo,
  ContactInfo,
  Employment,
  FinancialProfile,
  KycStatus,
  ProfileCompletion,
  IdentityDocument,
} from './core/subscriberProfile.service';

export type {
  DiscountInfo,
  DiscountCalculation,
  DiscountUsageInfo,
  DiscountVerificationRequest,
  DiscountVerificationResponse,
  PublicDiscountsResponse,
} from './api/discount';

export type {
  Discount,
  DiscountType,
  SubscriptionTier,
  DiscountStatus,
  CreateDiscountRequest,
  UpdateDiscountRequest,
  DiscountFilters,
  ValidateDiscountCodeRequest,
  ValidateDiscountCodeResponse,
  PreviewDiscountRequest,
  PreviewDiscountResponse,
  DiscountPreviewCalculation,
} from './api/discounts';

export type {
  Alert,
  AlertSeverity,
  AlertCategory,
  AlertStatus,
  NotificationType,
  CreateAlertRequest,
  UpdateAlertRequest,
  AlertFilters,
  AcknowledgeAlertRequest,
  ResolveAlertRequest,
  AlertListResponse,
  AlertStats,
  BulkAlertOperation,
  BulkAlertResult,
  AlertPreferences,
  NotificationEvent
} from './api/notifications';

export type {
  AnalyticsEvent,
  BatchAnalyticsEvents,
  VisitorAnalytics,
  EventTypeConfig,
  AnalyticsResponse,
} from './analytics';

export type {
  Invoice,
  InvoiceItem,
  BillingAddress,
  CustomerLocation,
  InvoiceTemplate,
  Currency,
  TaxJurisdiction,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  TaxCalculationRequest,
  TaxCalculationResponse,
  InvoiceHistoryResponse,
  InvoiceFilters,
} from './api/billing';

// Export service instances for direct use
export { discountService } from './api/discount';
export { notificationService } from './api/notifications';
export { analyticsService } from './analytics';
export { billingService } from './api/billing';