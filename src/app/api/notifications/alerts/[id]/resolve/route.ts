import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/config/auth.config';
import { 
  resolveAlertSchema,
  validateSchema
} from '@/lib/validation/notification-schemas';
import type { 
  Alert, 
  ResolveAlertRequest
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
 * POST /api/notifications/alerts/:id/resolve
 * Resolve a specific alert
 */
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Get the alert ID from the route parameters
    const { id: alertId } = params;
    if (!alertId) {
      return NextResponse.json(
        { success: false, message: 'Alert ID is required' },
        { status: 400 }
      );
    }

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
    const resolveData: ResolveAlertRequest = {
      ...body,
      userId // Ensure userId is set from token
    };

    const validation = validateSchema(resolveData, resolveAlertSchema);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid resolve data',
          error: validation.error 
        },
        { status: 400 }
      );
    }

    // TODO: Replace with actual database query and update
    // This would normally:
    // 1. Verify the alert exists and belongs to the user
    // 2. Check if alert is already resolved
    // 3. Update the alert status to 'resolved'
    // 4. Set resolvedAt timestamp and resolvedBy field

    // Mock alert lookup and update
    const existingAlert: Alert = {
      _id: alertId,
      userId,
      title: 'Sample Alert',
      message: 'This alert has been resolved',
      category: 'system',
      severity: 'medium',
      status: 'acknowledged', // Could be 'active' or 'acknowledged'
      type: 'alert',
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      updatedAt: new Date().toISOString(),
      acknowledgedAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      acknowledgedBy: userId,
      metadata: {}
    };

    // TODO: Replace with actual database query
    // const existingAlert = await AlertModel.findOne({ _id: alertId, userId });

    // Check if alert exists (in real implementation, this would be null from database)
    if (!existingAlert) {
      return NextResponse.json(
        { success: false, message: 'Alert not found' },
        { status: 404 }
      );
    }

    // Check if user owns the alert
    if (existingAlert.userId !== userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized to modify this alert' },
        { status: 403 }
      );
    }

    // Check if alert is already resolved or dismissed
    if (existingAlert.status === 'resolved') {
      return NextResponse.json(
        { success: false, message: 'Alert is already resolved' },
        { status: 400 }
      );
    }

    if (existingAlert.status === 'dismissed') {
      return NextResponse.json(
        { success: false, message: 'Cannot resolve a dismissed alert' },
        { status: 400 }
      );
    }

    // Update alert (mock implementation)
    const updatedAlert: Alert = {
      ...existingAlert,
      status: 'resolved',
      resolvedAt: new Date().toISOString(),
      resolvedBy: validation.value!.resolvedBy || userId,
      updatedAt: new Date().toISOString(),
      metadata: {
        ...existingAlert.metadata,
        resolution: validation.value!.resolution,
        resolution_notes: validation.value!.notes
      }
    };

    return NextResponse.json({
      success: true,
      data: updatedAlert,
      message: 'Alert resolved successfully'
    });

  } catch (error: any) {
    console.error('Error resolving alert:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Failed to resolve alert',
        error: 'Internal server error'
      },
      { status: 500 }
    );
  }
}