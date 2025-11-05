import { api, ApiResponse } from '../core/api-client';
import type {
  Alert,
  CreateAlertRequest,
  UpdateAlertRequest,
  AlertFilters,
  AlertListResponse,
  AcknowledgeAlertRequest,
  ResolveAlertRequest,
  AlertStats,
  BulkAlertOperation,
  BulkAlertResult,
  AlertPreferences,
  AlertTemplate,
  AlertConfiguration,
  NotificationEvent,
  AlertResponse,
  AlertListApiResponse,
  AlertStatsResponse
} from '@/lib/types/notifications';

/**
 * Comprehensive notification and alert management service
 * Handles alert CRUD operations, acknowledgment, resolution,
 * and notification functionality.
 */
export class NotificationService {
  private readonly basePath = '/api/notifications';

  constructor() {
    // No parent constructor needed
  }

  // Alert CRUD Operations
  async createAlert(alert: CreateAlertRequest): Promise<ApiResponse<Alert>> {
    return api.post<ApiResponse<Alert>>(`${this.basePath}/alerts`, alert);
  }

  async getAlert(id: string): Promise<ApiResponse<Alert>> {
    return api.get<ApiResponse<Alert>>(`${this.basePath}/alerts/${id}`);
  }

  async updateAlert(alert: UpdateAlertRequest): Promise<ApiResponse<Alert>> {
    return api.put<ApiResponse<Alert>>(`${this.basePath}/alerts/${alert.id}`, alert);
  }

  async deleteAlert(id: string): Promise<ApiResponse<void>> {
    return api.delete<ApiResponse<void>>(`${this.basePath}/alerts/${id}`);
  }

  async getAlerts(filters?: AlertFilters): Promise<ApiResponse<AlertListResponse>> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            params.append(key, value.join(','));
          } else {
            params.append(key, value.toString());
          }
        }
      });
    }

    const url = `${this.basePath}/alerts${params.toString() ? `?${params.toString()}` : ''}`;
    return api.get<ApiResponse<AlertListResponse>>(url);
  }

  // Alert Actions
  async acknowledgeAlert(
    alertId: string, 
    request: AcknowledgeAlertRequest
  ): Promise<ApiResponse<Alert>> {
    return api.post<ApiResponse<Alert>>(
      `${this.basePath}/alerts/${alertId}/acknowledge`,
      request
    );
  }

  async resolveAlert(
    alertId: string, 
    request: ResolveAlertRequest
  ): Promise<ApiResponse<Alert>> {
    return api.post<ApiResponse<Alert>>(
      `${this.basePath}/alerts/${alertId}/resolve`,
      request
    );
  }

  async dismissAlert(alertId: string, userId: string): Promise<ApiResponse<Alert>> {
    return api.post<ApiResponse<Alert>>(
      `${this.basePath}/alerts/${alertId}/dismiss`,
      { userId }
    );
  }

  // Bulk Operations
  async bulkAlertOperation(operation: BulkAlertOperation): Promise<ApiResponse<BulkAlertResult>> {
    return api.post<ApiResponse<BulkAlertResult>>(`${this.basePath}/alerts/bulk`, operation);
  }

  // Statistics and Analytics
  async getAlertStats(userId?: string): Promise<ApiResponse<AlertStats>> {
    const url = userId 
      ? `${this.basePath}/alerts/stats?userId=${userId}`
      : `${this.basePath}/alerts/stats`;
    return api.get<ApiResponse<AlertStats>>(url);
  }

  async getUserAlerts(
    userId: string, 
    filters?: Omit<AlertFilters, 'userId'>
  ): Promise<ApiResponse<AlertListResponse>> {
    return this.getAlerts({ ...filters, userId });
  }

  async getActiveAlerts(userId: string): Promise<ApiResponse<AlertListResponse>> {
    return this.getAlerts({ 
      userId, 
      status: 'active',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  }

  async getCriticalAlerts(userId: string): Promise<ApiResponse<AlertListResponse>> {
    return this.getAlerts({ 
      userId, 
      severity: 'critical',
      status: 'active',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  }

  // Alert Preferences
  async getAlertPreferences(userId: string): Promise<ApiResponse<AlertPreferences>> {
    return api.get<ApiResponse<AlertPreferences>>(`${this.basePath}/preferences/${userId}`);
  }

  async updateAlertPreferences(preferences: AlertPreferences): Promise<ApiResponse<AlertPreferences>> {
    return api.put<ApiResponse<AlertPreferences>>(
      `${this.basePath}/preferences/${preferences.userId}`,
      preferences
    );
  }

  // Alert Templates
  async getAlertTemplates(): Promise<ApiResponse<AlertTemplate[]>> {
    return api.get<ApiResponse<AlertTemplate[]>>(`${this.basePath}/templates`);
  }

  async getAlertTemplate(id: string): Promise<ApiResponse<AlertTemplate>> {
    return api.get<ApiResponse<AlertTemplate>>(`${this.basePath}/templates/${id}`);
  }

  async createAlertTemplate(template: Omit<AlertTemplate, '_id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<AlertTemplate>> {
    return api.post<ApiResponse<AlertTemplate>>(`${this.basePath}/templates`, template);
  }

  // Configuration
  async getAlertConfiguration(): Promise<ApiResponse<AlertConfiguration>> {
    return api.get<ApiResponse<AlertConfiguration>>(`${this.basePath}/config`);
  }

  async updateAlertConfiguration(config: Partial<AlertConfiguration>): Promise<ApiResponse<AlertConfiguration>> {
    return api.put<ApiResponse<AlertConfiguration>>(`${this.basePath}/config`, config);
  }

  // Real-time Notifications (WebSocket integration)
  subscribeToNotifications(userId: string, callback: (event: NotificationEvent) => void): () => void {
    // TODO: Implement WebSocket connection for real-time notifications
    // This would be implemented when connecting to actual WebSocket server
    console.log(`Subscribing to notifications for user: ${userId}`);
    
    // Return unsubscribe function
    return () => {
      console.log(`Unsubscribing from notifications for user: ${userId}`);
    };
  }

  // Utility Methods
  /**
   * Check if an alert should be auto-acknowledged based on configuration
   */
  shouldAutoAcknowledge(alert: Alert): boolean {
    const daysSinceCreated = Math.floor(
      (new Date().getTime() - new Date(alert.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // This would normally come from configuration
    const autoAcknowledgeAfterDays = 7;
    
    return alert.status === 'active' && daysSinceCreated >= autoAcknowledgeAfterDays;
  }

  /**
   * Check if an alert should be auto-resolved based on configuration
   */
  shouldAutoResolve(alert: Alert): boolean {
    const daysSinceCreated = Math.floor(
      (new Date().getTime() - new Date(alert.createdAt).getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // This would normally come from configuration
    const autoResolveAfterDays = 30;
    
    return (alert.status === 'active' || alert.status === 'acknowledged') && 
           daysSinceCreated >= autoResolveAfterDays;
  }

  /**
   * Format alert for display
   */
  formatAlert(alert: Alert): string {
    const timestamp = new Date(alert.createdAt).toLocaleString();
    return `[${alert.severity.toUpperCase()}] ${alert.title} - ${alert.message} (${timestamp})`;
  }

  /**
   * Get alert priority score for sorting
   */
  getAlertPriority(alert: Alert): number {
    const severityScores = {
      critical: 4,
      high: 3,
      medium: 2,
      low: 1
    };
    
    const statusScores = {
      active: 3,
      acknowledged: 2,
      resolved: 1,
      dismissed: 0
    };
    
    return (severityScores[alert.severity] * 10) + statusScores[alert.status];
  }

  /**
   * Check if alert is expired
   */
  isAlertExpired(alert: Alert): boolean {
    if (!alert.expiresAt) return false;
    return new Date() > new Date(alert.expiresAt);
  }

  /**
   * Get alerts by category for a user
   */
  async getAlertsByCategory(
    userId: string, 
    category: Alert['category']
  ): Promise<ApiResponse<AlertListResponse>> {
    return this.getAlerts({
      userId,
      category,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  }

  /**
   * Mark multiple alerts as read (acknowledged)
   */
  async markAlertsAsRead(alertIds: string[], userId: string): Promise<ApiResponse<BulkAlertResult>> {
    return this.bulkAlertOperation({
      action: 'acknowledge',
      alertIds,
      userId,
      performedBy: userId,
      notes: 'Marked as read'
    });
  }

  /**
   * Get unread alert count for user
   */
  async getUnreadAlertCount(userId: string): Promise<number> {
    try {
      const response = await this.getAlerts({
        userId,
        status: 'active',
        limit: 1 // We only need the count
      });

      if (response.success && response.data) {
        return response.data.pagination.total;
      }
      return 0;
    } catch (error) {
      console.error('Error getting unread alert count:', error);
      return 0;
    }
  }
}

// Create and export singleton instance
export const notificationService = new NotificationService();

// Export utility functions for standalone use
export const notificationUtils = {
  shouldAutoAcknowledge: notificationService.shouldAutoAcknowledge.bind(notificationService),
  shouldAutoResolve: notificationService.shouldAutoResolve.bind(notificationService),
  formatAlert: notificationService.formatAlert.bind(notificationService),
  getAlertPriority: notificationService.getAlertPriority.bind(notificationService),
  isAlertExpired: notificationService.isAlertExpired.bind(notificationService),
};

// Re-export types for convenience
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
  NotificationEvent,
  AlertTemplate,
  AlertConfiguration
} from '@/lib/types/notifications';