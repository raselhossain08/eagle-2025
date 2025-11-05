export interface AnalyticsEvent {
  eventType: string;
  eventName: string;
  properties?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  timestamp?: string;
  page?: string;
  referrer?: string;
  userAgent?: string;
}

export interface BatchAnalyticsEvents {
  events: AnalyticsEvent[];
}

export interface VisitorAnalytics {
  visitorId: string;
  page: string;
  referrer?: string;
  timestamp?: string;
  sessionDuration?: number;
  interactions?: Record<string, any>;
}

export interface EventTypeConfig {
  name: string;
  category: string;
  description: string;
  requiredProperties?: string[];
  optionalProperties?: string[];
}

export interface AnalyticsResponse {
  success: boolean;
  message?: string;
  eventId?: string;
  batchId?: string;
  error?: string;
}

export class AnalyticsService {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/analytics') {
    this.baseUrl = baseUrl;
  }

  /**
   * Track a single analytics event
   */
  async trackEvent(event: AnalyticsEvent): Promise<AnalyticsResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/events/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          timestamp: event.timestamp || new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error tracking event:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Track multiple analytics events in batch
   */
  async trackBatchEvents(events: AnalyticsEvent[]): Promise<AnalyticsResponse> {
    try {
      const eventsWithTimestamp = events.map(event => ({
        ...event,
        timestamp: event.timestamp || new Date().toISOString(),
      }));

      const response = await fetch(`${this.baseUrl}/events/batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: eventsWithTimestamp }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error tracking batch events:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Track visitor analytics
   */
  async trackVisitor(visitorData: VisitorAnalytics): Promise<AnalyticsResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/events/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventType: 'visitor',
          eventName: 'page_visit',
          properties: visitorData,
          timestamp: visitorData.timestamp || new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error tracking visitor:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get event types configuration
   */
  async getEventTypesConfig(): Promise<EventTypeConfig[]> {
    try {
      const response = await fetch(`${this.baseUrl}/config/event-types`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching event types config:', error);
      return [];
    }
  }

  /**
   * Helper method to track page views
   */
  async trackPageView(page: string, userId?: string, additionalProperties?: Record<string, any>): Promise<AnalyticsResponse> {
    return this.trackEvent({
      eventType: 'navigation',
      eventName: 'page_view',
      properties: {
        page,
        referrer: typeof window !== 'undefined' ? document.referrer : undefined,
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
        ...additionalProperties,
      },
      userId,
      page,
    });
  }

  /**
   * Helper method to track user interactions
   */
  async trackUserInteraction(
    action: string, 
    element: string, 
    userId?: string, 
    additionalProperties?: Record<string, any>
  ): Promise<AnalyticsResponse> {
    return this.trackEvent({
      eventType: 'interaction',
      eventName: action,
      properties: {
        element,
        page: typeof window !== 'undefined' ? window.location.pathname : undefined,
        ...additionalProperties,
      },
      userId,
    });
  }

  /**
   * Helper method to track business events
   */
  async trackBusinessEvent(
    eventName: string, 
    userId?: string, 
    properties?: Record<string, any>
  ): Promise<AnalyticsResponse> {
    return this.trackEvent({
      eventType: 'business',
      eventName,
      properties,
      userId,
    });
  }
}

// Create singleton instance
export const analyticsService = new AnalyticsService();

// Export helper functions for easier usage
export const trackEvent = (event: AnalyticsEvent) => analyticsService.trackEvent(event);
export const trackBatchEvents = (events: AnalyticsEvent[]) => analyticsService.trackBatchEvents(events);
export const trackVisitor = (visitorData: VisitorAnalytics) => analyticsService.trackVisitor(visitorData);
export const trackPageView = (page: string, userId?: string, properties?: Record<string, any>) => 
  analyticsService.trackPageView(page, userId, properties);
export const trackUserInteraction = (action: string, element: string, userId?: string, properties?: Record<string, any>) => 
  analyticsService.trackUserInteraction(action, element, userId, properties);
export const trackBusinessEvent = (eventName: string, userId?: string, properties?: Record<string, any>) => 
  analyticsService.trackBusinessEvent(eventName, userId, properties);
export const getEventTypesConfig = () => analyticsService.getEventTypesConfig();