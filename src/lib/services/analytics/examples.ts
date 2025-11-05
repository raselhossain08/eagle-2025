/**
 * Analytics Service Usage Examples
 * 
 * This file demonstrates how to use the analytics service
 * to track various events in your application.
 */

import {
  analyticsService,
  trackEvent,
  trackPageView,
  trackUserInteraction,
  trackBusinessEvent,
  trackBatchEvents,
  getEventTypesConfig,
  type AnalyticsEvent,
} from '@/lib/services/analytics';

// 1. Track a page view
export async function trackPageViewExample() {
  await trackPageView('/dashboard', 'user123', {
    source: 'navigation',
    previousPage: '/login',
  });
}

// 2. Track user interactions
export async function trackUserInteractionExample() {
  // Track button click
  await trackUserInteraction('click', 'subscribe-button', 'user123', {
    planType: 'premium',
    location: 'pricing-page',
  });

  // Track form submission
  await trackEvent({
    eventType: 'interaction',
    eventName: 'form_submit',
    userId: 'user123',
    properties: {
      formName: 'contact-form',
      success: true,
      fields: ['name', 'email', 'message'],
    },
  });
}

// 3. Track business events
export async function trackBusinessEventExample() {
  // Track contract creation
  await trackBusinessEvent('contract_created', 'user123', {
    contractType: 'DiamondContract',
    contractId: 'contract_789',
    value: 5000,
  });

  // Track payment
  await trackBusinessEvent('payment_completed', 'user123', {
    amount: 99.99,
    currency: 'USD',
    transactionId: 'txn_456',
    paymentMethod: 'stripe',
    contractId: 'contract_789',
  });
}

// 4. Track multiple events in batch
export async function trackBatchEventsExample() {
  const events: AnalyticsEvent[] = [
    {
      eventType: 'navigation',
      eventName: 'page_view',
      userId: 'user123',
      properties: { page: '/contracts' },
    },
    {
      eventType: 'interaction',
      eventName: 'button_click',
      userId: 'user123',
      properties: { element: 'create-contract-btn' },
    },
    {
      eventType: 'business',
      eventName: 'contract_created',
      userId: 'user123',
      properties: { contractType: 'UltimateContract' },
    },
  ];

  await trackBatchEvents(events);
}

// 5. Track visitor analytics (for anonymous users)
export async function trackVisitorExample() {
  await analyticsService.trackVisitor({
    visitorId: 'visitor_456',
    page: '/pricing',
    referrer: 'https://google.com',
    sessionDuration: 300, // 5 minutes
    interactions: {
      scrollDepth: 75,
      clickCount: 3,
    },
  });
}

// 6. Get event types configuration
export async function getEventConfigExample() {
  const eventTypes = await getEventTypesConfig();
  console.log('Available event types:', eventTypes);
  
  // Filter by category (optional query parameter)
  const response = await fetch('/api/analytics/config/event-types?category=business');
  const businessEvents = await response.json();
  console.log('Business event types:', businessEvents);
}

// 7. Track errors
export async function trackErrorExample() {
  await trackEvent({
    eventType: 'error',
    eventName: 'api_error',
    userId: 'user123',
    properties: {
      endpoint: '/api/contracts/create',
      statusCode: 500,
      errorMessage: 'Internal server error',
      requestId: 'req_123',
    },
  });
}

// 8. Track performance metrics
export async function trackPerformanceExample() {
  await trackEvent({
    eventType: 'performance',
    eventName: 'page_load_time',
    properties: {
      page: '/dashboard',
      loadTime: 1200, // milliseconds
      deviceType: 'desktop',
      connectionType: 'wifi',
    },
  });
}

// 9. React Hook for tracking page views
export function usePageViewTracking(userId?: string) {
  const trackCurrentPageView = async (additionalProperties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      await trackPageView(window.location.pathname, userId, additionalProperties);
    }
  };

  return { trackCurrentPageView };
}

// 10. React Hook for tracking interactions
export function useInteractionTracking(userId?: string) {
  const trackClick = async (element: string, additionalProperties?: Record<string, any>) => {
    await trackUserInteraction('click', element, userId, additionalProperties);
  };

  const trackFormSubmit = async (formName: string, success: boolean, additionalProperties?: Record<string, any>) => {
    await trackEvent({
      eventType: 'interaction',
      eventName: 'form_submit',
      userId,
      properties: {
        formName,
        success,
        ...additionalProperties,
      },
    });
  };

  return { trackClick, trackFormSubmit };
}

// 11. Utility function for automatic page tracking
export function initializePageTracking(userId?: string) {
  if (typeof window !== 'undefined') {
    // Track initial page load
    trackPageView(window.location.pathname, userId);

    // Track page changes (for SPA routing)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setTimeout(() => trackPageView(window.location.pathname, userId), 0);
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      setTimeout(() => trackPageView(window.location.pathname, userId), 0);
    };

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
      trackPageView(window.location.pathname, userId);
    });
  }
}

// 12. Batch tracking for better performance
class AnalyticsBatcher {
  private events: AnalyticsEvent[] = [];
  private batchSize = 10;
  private flushInterval = 5000; // 5 seconds
  private timer: NodeJS.Timeout | null = null;

  constructor(batchSize = 10, flushInterval = 5000) {
    this.batchSize = batchSize;
    this.flushInterval = flushInterval;
  }

  addEvent(event: AnalyticsEvent) {
    this.events.push(event);

    if (this.events.length >= this.batchSize) {
      this.flush();
    } else if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), this.flushInterval);
    }
  }

  async flush() {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    try {
      await trackBatchEvents(eventsToSend);
    } catch (error) {
      console.error('Failed to send analytics batch:', error);
      // Could implement retry logic here
    }
  }
}

// Create a global batcher instance
export const analyticsBatcher = new AnalyticsBatcher();