export * from './analytics.service';

// Re-export commonly used functions for convenience
export {
  analyticsService,
  trackEvent,
  trackBatchEvents,
  trackVisitor,
  trackPageView,
  trackUserInteraction,
  trackBusinessEvent,
  getEventTypesConfig,
} from './analytics.service';

// Export types for external use
export type {
  AnalyticsEvent,
  BatchAnalyticsEvents,
  VisitorAnalytics,
  EventTypeConfig,
  AnalyticsResponse,
} from './analytics.service';