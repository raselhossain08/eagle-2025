# Analytics Service

A comprehensive analytics tracking service for the Eagle Frontend application.

## Features

- **Single Event Tracking**: Track individual user actions and events
- **Batch Event Tracking**: Send multiple events in a single request for better performance
- **Visitor Analytics**: Track anonymous visitor behavior
- **Event Type Configuration**: Get available event types and their requirements
- **TypeScript Support**: Full type safety with TypeScript interfaces
- **Server-side Enrichment**: Automatic addition of IP, user agent, and timestamp
- **No Authentication Required**: Public endpoints for easy integration

## API Endpoints

### Event Tracking

#### POST `/api/analytics/events/track`
Track a single analytics event.

**Request Body:**
```json
{
  "eventType": "interaction",
  "eventName": "button_click",
  "userId": "user123",
  "properties": {
    "element": "subscribe-button",
    "page": "/pricing"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Event tracked successfully",
  "eventId": "evt_1699123456789_abc123def"
}
```

#### POST `/api/analytics/events/batch`
Track multiple events in a single request.

**Request Body:**
```json
{
  "events": [
    {
      "eventType": "navigation",
      "eventName": "page_view",
      "userId": "user123",
      "properties": { "page": "/dashboard" }
    },
    {
      "eventType": "interaction",
      "eventName": "button_click",
      "userId": "user123",
      "properties": { "element": "create-contract" }
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Batch of 2 events tracked successfully",
  "batchId": "batch_1699123456789_xyz789abc"
}
```

### Configuration

#### GET `/api/analytics/config/event-types`
Get available event types and their configuration.

**Query Parameters:**
- `category` (optional): Filter by event category (e.g., "business", "interaction", "navigation")

**Response:**
```json
[
  {
    "name": "page_view",
    "category": "navigation",
    "description": "Track when users view a page",
    "requiredProperties": ["page"],
    "optionalProperties": ["referrer", "userAgent", "sessionId"]
  }
]
```

## Usage Examples

### Basic Event Tracking

```typescript
import { trackEvent, trackPageView, trackUserInteraction } from '@/lib/services/analytics';

// Track a page view
await trackPageView('/dashboard', 'user123');

// Track a button click
await trackUserInteraction('click', 'subscribe-button', 'user123', {
  planType: 'premium'
});

// Track a custom event
await trackEvent({
  eventType: 'business',
  eventName: 'contract_created',
  userId: 'user123',
  properties: {
    contractType: 'DiamondContract',
    value: 5000
  }
});
```

### Batch Tracking

```typescript
import { trackBatchEvents } from '@/lib/services/analytics';

const events = [
  {
    eventType: 'navigation',
    eventName: 'page_view',
    userId: 'user123',
    properties: { page: '/contracts' }
  },
  {
    eventType: 'interaction',
    eventName: 'button_click',
    userId: 'user123',
    properties: { element: 'create-contract-btn' }
  }
];

await trackBatchEvents(events);
```

### React Integration

```typescript
// Hook for page view tracking
function usePageViewTracking(userId?: string) {
  const trackCurrentPageView = async () => {
    if (typeof window !== 'undefined') {
      await trackPageView(window.location.pathname, userId);
    }
  };

  return { trackCurrentPageView };
}

// Component usage
function Dashboard() {
  const { trackCurrentPageView } = usePageViewTracking('user123');
  
  useEffect(() => {
    trackCurrentPageView();
  }, []);

  return <div>Dashboard Content</div>;
}
```

## Event Categories

### Navigation Events
- `page_view`: When users visit a page
- `page_exit`: When users leave a page

### Interaction Events
- `button_click`: Button interactions
- `form_submit`: Form submissions
- `link_click`: Link clicks
- `scroll`: Scroll behavior

### Business Events
- `contract_created`: Contract creation
- `payment_initiated`: Payment start
- `payment_completed`: Successful payments
- `subscription_started`: New subscriptions
- `subscription_cancelled`: Subscription cancellations

### Authentication Events
- `user_login`: Login attempts
- `user_logout`: User logout
- `user_registration`: New registrations

### Error Events
- `error_occurred`: Application errors
- `api_error`: API errors

### Performance Events
- `page_load_time`: Page performance
- `api_response_time`: API performance

### Visitor Events
- `visitor_session_start`: Session starts
- `visitor_session_end`: Session ends

## Data Structure

### AnalyticsEvent Interface
```typescript
interface AnalyticsEvent {
  eventType: string;        // Required: Category of the event
  eventName: string;        // Required: Specific event name
  properties?: Record<string, any>; // Optional: Custom properties
  userId?: string;          // Optional: User identifier
  sessionId?: string;       // Optional: Session identifier
  timestamp?: string;       // Optional: Event timestamp (auto-generated)
  page?: string;           // Optional: Current page
  referrer?: string;       // Optional: Referrer URL
  userAgent?: string;      // Optional: User agent (auto-enriched)
}
```

## Server-side Enrichment

The API automatically enriches events with:
- **Timestamp**: ISO 8601 format if not provided
- **IP Address**: From request headers
- **User Agent**: From request headers
- **Request ID**: Unique identifier for tracking

## Best Practices

1. **Use Batch Tracking**: For multiple events, use batch tracking for better performance
2. **Include User Context**: Always include `userId` when available
3. **Add Meaningful Properties**: Include relevant context in the properties object
4. **Handle Errors Gracefully**: The service returns error information for debugging
5. **Use Event Categories**: Follow the established event categories for consistency

## Error Handling

All analytics functions return a response object with error information:

```typescript
const result = await trackEvent(event);
if (!result.success) {
  console.error('Analytics error:', result.error);
}
```

## Configuration

The service can be configured with different base URLs:

```typescript
import { AnalyticsService } from '@/lib/services/analytics';

const customAnalytics = new AnalyticsService('/custom-api/analytics');
```

## Future Enhancements

- Database integration for persistent storage
- Real-time analytics dashboard
- Event filtering and validation
- Rate limiting and quotas
- Data export capabilities
- Privacy controls and GDPR compliance