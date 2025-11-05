/**
 * Notification and Alert Types
 * Comprehensive TypeScript interfaces for notification system
 */

// Alert Severity Levels
export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';

// Alert Categories
export type AlertCategory = 
  | 'system'
  | 'trading'
  | 'account'
  | 'security'
  | 'payment'
  | 'subscription'
  | 'contract'
  | 'market'
  | 'maintenance';

// Alert Status
export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'dismissed';

// Notification Types
export type NotificationType = 'alert' | 'message' | 'reminder' | 'update';

// Base Alert Interface
export interface Alert {
  _id: string;
  userId: string;
  title: string;
  message: string;
  category: AlertCategory;
  severity: AlertSeverity;
  status: AlertStatus;
  type: NotificationType;
  metadata?: {
    [key: string]: any;
    source?: string;
    reference_id?: string;
    action_url?: string;
  };
  createdAt: string;
  updatedAt?: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  resolvedAt?: string;
  resolvedBy?: string;
  expiresAt?: string;
}

// Create Alert Request
export interface CreateAlertRequest {
  userId: string;
  title: string;
  message: string;
  category: AlertCategory;
  severity: AlertSeverity;
  type?: NotificationType;
  metadata?: Alert['metadata'];
  expiresAt?: string;
}

// Update Alert Request
export interface UpdateAlertRequest {
  id: string;
  title?: string;
  message?: string;
  category?: AlertCategory;
  severity?: AlertSeverity;
  metadata?: Alert['metadata'];
  expiresAt?: string;
}

// Alert Filters
export interface AlertFilters {
  userId?: string;
  category?: AlertCategory | AlertCategory[];
  severity?: AlertSeverity | AlertSeverity[];
  status?: AlertStatus | AlertStatus[];
  type?: NotificationType | NotificationType[];
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  page?: number;
  sortBy?: 'createdAt' | 'updatedAt' | 'severity' | 'category';
  sortOrder?: 'asc' | 'desc';
}

// Acknowledge Alert Request
export interface AcknowledgeAlertRequest {
  userId: string;
  acknowledgedBy?: string;
  notes?: string;
}

// Resolve Alert Request
export interface ResolveAlertRequest {
  userId: string;
  resolvedBy?: string;
  resolution?: string;
  notes?: string;
}

// Alert Statistics
export interface AlertStats {
  total: number;
  active: number;
  acknowledged: number;
  resolved: number;
  dismissed: number;
  bySeverity: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  byCategory: {
    [K in AlertCategory]: number;
  };
  recentActivity: {
    created_24h: number;
    acknowledged_24h: number;
    resolved_24h: number;
  };
}

// Alert List Response
export interface AlertListResponse {
  alerts: Alert[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  stats: AlertStats;
}

// Bulk Alert Operations
export interface BulkAlertOperation {
  action: 'acknowledge' | 'resolve' | 'dismiss' | 'delete';
  alertIds: string[];
  userId: string;
  performedBy?: string;
  notes?: string;
  resolution?: string; // For resolve action
}

// Bulk Alert Result
export interface BulkAlertResult {
  success: boolean;
  processed: number;
  failed: number;
  results: {
    alertId: string;
    success: boolean;
    error?: string;
  }[];
}

// Alert Subscription Preferences
export interface AlertPreferences {
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  categories: {
    [K in AlertCategory]: {
      enabled: boolean;
      minSeverity: AlertSeverity;
      methods: ('email' | 'push' | 'sms')[];
    };
  };
  quietHours: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string; // HH:mm format
    timezone: string;
  };
}

// Real-time Notification Event
export interface NotificationEvent {
  type: 'alert_created' | 'alert_updated' | 'alert_acknowledged' | 'alert_resolved';
  alert: Alert;
  userId: string;
  timestamp: string;
}

// Alert Template
export interface AlertTemplate {
  _id: string;
  name: string;
  category: AlertCategory;
  severity: AlertSeverity;
  titleTemplate: string;
  messageTemplate: string;
  defaultMetadata?: Alert['metadata'];
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

// Alert Configuration
export interface AlertConfiguration {
  maxAlertsPerUser: number;
  alertRetentionDays: number;
  autoAcknowledgeAfterDays: number;
  autoResolveAfterDays: number;
  enableRealTimeUpdates: boolean;
  rateLimiting: {
    enabled: boolean;
    maxAlertsPerHour: number;
    maxAlertsPerDay: number;
  };
  categories: {
    [K in AlertCategory]: {
      enabled: boolean;
      maxSeverityLevel: AlertSeverity;
      requireAcknowledgment: boolean;
    };
  };
}

// API Response Types
export interface AlertResponse {
  success: boolean;
  data?: Alert;
  message?: string;
  error?: string;
}

export interface AlertListApiResponse {
  success: boolean;
  data?: AlertListResponse;
  message?: string;
  error?: string;
}

export interface AlertStatsResponse {
  success: boolean;
  data?: AlertStats;
  message?: string;
  error?: string;
}