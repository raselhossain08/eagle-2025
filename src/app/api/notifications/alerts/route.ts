import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/config/auth.config';
import { 
  alertFiltersSchema, 
  createAlertSchema,
  validateSchema
} from '@/lib/validation/notification-schemas';
import type { 
  Alert, 
  AlertListResponse, 
  CreateAlertRequest,
  AlertFilters,
  AlertCategory,
  AlertSeverity,
  AlertStatus,
  NotificationType
} from '@/lib/types/notifications';

// Extended token type for our use
interface ExtendedTokenPayload {
  role?: string;
  exp?: number;
  userId?: string;
  id?: string;
  sub?: string;
}

/**
 * GET /api/notifications/alerts
 * Retrieve user's alerts with optional filtering
 */
export async function GET(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token) as ExtendedTokenPayload;
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    // Extract userId from token
    const userId = decoded.userId || decoded.id || decoded.sub || 'unknown';

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const filters: AlertFilters = {
      userId,
      category: searchParams.get('category') as AlertCategory || undefined,
      severity: searchParams.get('severity') as AlertSeverity || undefined,
      status: searchParams.get('status') as AlertStatus || undefined,
      type: searchParams.get('type') as NotificationType || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      sortBy: (searchParams.get('sortBy') as any) || 'createdAt',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc'
    };

    // Validate filters
    const validation = validateSchema(filters, alertFiltersSchema);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid query parameters',
          error: validation.error 
        },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database query
    // This would normally fetch from your database
    const mockResponse: AlertListResponse = {
      alerts: [
        // Sample alert structure - replace with actual data
        {
          _id: 'alert_001',
          userId,
          title: 'Sample Alert',
          message: 'This is a sample alert for demonstration',
          category: 'system',
          severity: 'medium',
          status: 'active',
          type: 'alert',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      pagination: {
        page: validation.value?.page || 1,
        limit: validation.value?.limit || 20,
        total: 1,
        pages: 1
      },
      stats: {
        total: 1,
        active: 1,
        acknowledged: 0,
        resolved: 0,
        dismissed: 0,
        bySeverity: {
          low: 0,
          medium: 1,
          high: 0,
          critical: 0
        },
        byCategory: {
          system: 1,
          trading: 0,
          account: 0,
          security: 0,
          payment: 0,
          subscription: 0,
          contract: 0,
          market: 0,
          maintenance: 0
        },
        recentActivity: {
          created_24h: 1,
          acknowledged_24h: 0,
          resolved_24h: 0
        }
      }
    };

    return NextResponse.json({
      success: true,
      data: mockResponse,
      message: 'Alerts retrieved successfully'
    });

  } catch (error: any) {
    console.error('Error retrieving alerts:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to retrieve alerts',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/notifications/alerts
 * Create a new alert
 */
export async function POST(request: Request) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = await verifyToken(token) as ExtendedTokenPayload;
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    // Extract userId from token
    const userId = decoded.userId || decoded.id || decoded.sub || 'unknown';

    // Parse and validate request body
    const body = await request.json();
    const alertData: CreateAlertRequest = {
      ...body,
      userId // Ensure userId is set from token
    };

    const validation = validateSchema(alertData, createAlertSchema);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid alert data',
          error: validation.error 
        },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database creation
    // This would normally save to your database
    const newAlert: Alert = {
      _id: `alert_${Date.now()}`,
      ...validation.value!,
      type: validation.value!.type || 'alert', // Ensure type is always set
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: newAlert,
      message: 'Alert created successfully'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating alert:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to create alert',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}