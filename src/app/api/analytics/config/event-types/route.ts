import { NextRequest, NextResponse } from 'next/server';
import { EventTypeConfig } from '@/lib/services/analytics/analytics.service';

// Define event types configuration
const eventTypesConfig: EventTypeConfig[] = [
  // Navigation Events
  {
    name: 'page_view',
    category: 'navigation',
    description: 'Track when users view a page',
    requiredProperties: ['page'],
    optionalProperties: ['referrer', 'userAgent', 'sessionId'],
  },
  {
    name: 'page_exit',
    category: 'navigation',
    description: 'Track when users leave a page',
    requiredProperties: ['page'],
    optionalProperties: ['timeOnPage', 'sessionId'],
  },

  // User Interaction Events
  {
    name: 'button_click',
    category: 'interaction',
    description: 'Track button clicks',
    requiredProperties: ['element'],
    optionalProperties: ['page', 'elementText', 'elementPosition'],
  },
  {
    name: 'form_submit',
    category: 'interaction',
    description: 'Track form submissions',
    requiredProperties: ['formName'],
    optionalProperties: ['page', 'formFields', 'success'],
  },
  {
    name: 'link_click',
    category: 'interaction',
    description: 'Track link clicks',
    requiredProperties: ['url'],
    optionalProperties: ['linkText', 'isExternal'],
  },
  {
    name: 'scroll',
    category: 'interaction',
    description: 'Track scroll behavior',
    requiredProperties: ['scrollDepth'],
    optionalProperties: ['page', 'maxScroll'],
  },

  // Business Events
  {
    name: 'contract_created',
    category: 'business',
    description: 'Track contract creation',
    requiredProperties: ['contractType'],
    optionalProperties: ['contractId', 'userId', 'value'],
  },
  {
    name: 'payment_initiated',
    category: 'business',
    description: 'Track payment initiation',
    requiredProperties: ['amount', 'currency'],
    optionalProperties: ['paymentMethod', 'contractId', 'userId'],
  },
  {
    name: 'payment_completed',
    category: 'business',
    description: 'Track successful payments',
    requiredProperties: ['amount', 'currency', 'transactionId'],
    optionalProperties: ['paymentMethod', 'contractId', 'userId'],
  },
  {
    name: 'subscription_started',
    category: 'business',
    description: 'Track subscription activations',
    requiredProperties: ['planType'],
    optionalProperties: ['userId', 'amount', 'billingCycle'],
  },
  {
    name: 'subscription_cancelled',
    category: 'business',
    description: 'Track subscription cancellations',
    requiredProperties: ['planType'],
    optionalProperties: ['userId', 'reason', 'refund'],
  },

  // Authentication Events
  {
    name: 'user_login',
    category: 'authentication',
    description: 'Track user login attempts',
    requiredProperties: ['success'],
    optionalProperties: ['userId', 'method', 'errorReason'],
  },
  {
    name: 'user_logout',
    category: 'authentication',
    description: 'Track user logout',
    requiredProperties: [],
    optionalProperties: ['userId', 'sessionDuration'],
  },
  {
    name: 'user_registration',
    category: 'authentication',
    description: 'Track new user registrations',
    requiredProperties: ['success'],
    optionalProperties: ['userId', 'method', 'referralSource'],
  },

  // Error Events
  {
    name: 'error_occurred',
    category: 'error',
    description: 'Track application errors',
    requiredProperties: ['errorType', 'errorMessage'],
    optionalProperties: ['page', 'userId', 'stack', 'severity'],
  },
  {
    name: 'api_error',
    category: 'error',
    description: 'Track API errors',
    requiredProperties: ['endpoint', 'statusCode'],
    optionalProperties: ['errorMessage', 'userId', 'requestId'],
  },

  // Performance Events
  {
    name: 'page_load_time',
    category: 'performance',
    description: 'Track page loading performance',
    requiredProperties: ['page', 'loadTime'],
    optionalProperties: ['userId', 'deviceType', 'connectionType'],
  },
  {
    name: 'api_response_time',
    category: 'performance',
    description: 'Track API response times',
    requiredProperties: ['endpoint', 'responseTime'],
    optionalProperties: ['statusCode', 'userId', 'cacheHit'],
  },

  // Visitor Events
  {
    name: 'visitor_session_start',
    category: 'visitor',
    description: 'Track visitor session starts',
    requiredProperties: ['visitorId'],
    optionalProperties: ['referrer', 'landingPage', 'deviceInfo'],
  },
  {
    name: 'visitor_session_end',
    category: 'visitor',
    description: 'Track visitor session ends',
    requiredProperties: ['visitorId', 'sessionDuration'],
    optionalProperties: ['pagesViewed', 'interactions', 'exitPage'],
  },
];

export async function GET(request: NextRequest): Promise<NextResponse<EventTypeConfig[]>> {
  try {
    // You could add query parameters for filtering
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    let filteredConfig = eventTypesConfig;

    if (category) {
      filteredConfig = eventTypesConfig.filter(
        config => config.category.toLowerCase() === category.toLowerCase()
      );
    }

    return NextResponse.json(filteredConfig);

  } catch (error) {
    console.error('Error fetching event types config:', error);
    
    return NextResponse.json([], { status: 500 });
  }
}