import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsEvent, AnalyticsResponse } from '@/lib/services/analytics/analytics.service';

export async function POST(request: NextRequest): Promise<NextResponse<AnalyticsResponse>> {
  try {
    const event: AnalyticsEvent = await request.json();

    // Validate required fields
    if (!event.eventType || !event.eventName) {
      return NextResponse.json(
        {
          success: false,
          error: 'eventType and eventName are required fields',
        },
        { status: 400 }
      );
    }

    // Add server-side enrichment
    const enrichedEvent = {
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
      userAgent: event.userAgent || request.headers.get('user-agent') || undefined,
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown',
    };

    // Here you would typically save to your analytics database
    // For now, we'll just log it and return success
    console.log('Analytics Event Tracked:', {
      eventId: generateEventId(),
      ...enrichedEvent,
    });

    // Simulate database save
    const eventId = generateEventId();

    return NextResponse.json({
      success: true,
      message: 'Event tracked successfully',
      eventId,
    });

  } catch (error) {
    console.error('Error processing analytics event:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while processing event',
      },
      { status: 500 }
    );
  }
}

// Helper function to generate unique event ID
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}