import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsEvent, BatchAnalyticsEvents, AnalyticsResponse } from '@/lib/services/analytics/analytics.service';

export async function POST(request: NextRequest): Promise<NextResponse<AnalyticsResponse>> {
  try {
    const batchData: BatchAnalyticsEvents = await request.json();

    // Validate required fields
    if (!batchData.events || !Array.isArray(batchData.events)) {
      return NextResponse.json(
        {
          success: false,
          error: 'events array is required',
        },
        { status: 400 }
      );
    }

    if (batchData.events.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'events array cannot be empty',
        },
        { status: 400 }
      );
    }

    // Validate each event
    const invalidEvents = batchData.events.filter(
      (event, index) => !event.eventType || !event.eventName
    );

    if (invalidEvents.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'All events must have eventType and eventName fields',
        },
        { status: 400 }
      );
    }

    // Add server-side enrichment to all events
    const enrichedEvents = batchData.events.map((event: AnalyticsEvent) => ({
      ...event,
      timestamp: event.timestamp || new Date().toISOString(),
      userAgent: event.userAgent || request.headers.get('user-agent') || undefined,
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          'unknown',
    }));

    // Generate batch ID
    const batchId = generateBatchId();

    // Here you would typically save all events to your analytics database
    // For now, we'll just log them and return success
    console.log('Analytics Batch Events Tracked:', {
      batchId,
      eventCount: enrichedEvents.length,
      events: enrichedEvents,
    });

    return NextResponse.json({
      success: true,
      message: `Batch of ${enrichedEvents.length} events tracked successfully`,
      batchId,
    });

  } catch (error) {
    console.error('Error processing batch analytics events:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while processing batch events',
      },
      { status: 500 }
    );
  }
}

// Helper function to generate unique batch ID
function generateBatchId(): string {
  return `batch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}