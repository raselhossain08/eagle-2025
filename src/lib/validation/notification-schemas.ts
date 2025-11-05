import Joi from 'joi';

/**
 * Comprehensive Joi validation schemas for notification and alert operations
 */

// Alert Severity validation
const alertSeveritySchema = Joi.string()
  .valid('low', 'medium', 'high', 'critical')
  .required()
  .messages({
    'any.only': 'Severity must be one of: low, medium, high, critical',
    'any.required': 'Severity is required'
  });

// Alert Category validation
const alertCategorySchema = Joi.string()
  .valid('system', 'trading', 'account', 'security', 'payment', 'subscription', 'contract', 'market', 'maintenance')
  .required()
  .messages({
    'any.only': 'Category must be one of: system, trading, account, security, payment, subscription, contract, market, maintenance',
    'any.required': 'Category is required'
  });

// Alert Status validation
const alertStatusSchema = Joi.string()
  .valid('active', 'acknowledged', 'resolved', 'dismissed')
  .messages({
    'any.only': 'Status must be one of: active, acknowledged, resolved, dismissed'
  });

// Notification Type validation
const notificationTypeSchema = Joi.string()
  .valid('alert', 'message', 'reminder', 'update')
  .default('alert')
  .messages({
    'any.only': 'Type must be one of: alert, message, reminder, update'
  });

// Metadata validation
const metadataSchema = Joi.object({
  source: Joi.string().optional(),
  reference_id: Joi.string().optional(),
  action_url: Joi.string().uri().optional(),
}).unknown(true).optional();

// Create Alert Schema
export const createAlertSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required'
    }),
  
  title: Joi.string()
    .min(1)
    .max(200)
    .trim()
    .required()
    .messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title cannot be empty',
      'string.max': 'Title cannot exceed 200 characters',
      'any.required': 'Title is required'
    }),
  
  message: Joi.string()
    .min(1)
    .max(1000)
    .trim()
    .required()
    .messages({
      'string.base': 'Message must be a string',
      'string.min': 'Message cannot be empty',
      'string.max': 'Message cannot exceed 1000 characters',
      'any.required': 'Message is required'
    }),
  
  category: alertCategorySchema,
  severity: alertSeveritySchema,
  type: notificationTypeSchema,
  metadata: metadataSchema,
  
  expiresAt: Joi.date()
    .iso()
    .min('now')
    .optional()
    .messages({
      'date.base': 'Expires at must be a valid date',
      'date.format': 'Expires at must be in ISO 8601 format',
      'date.min': 'Expires at cannot be in the past'
    })
}).messages({
  'object.base': 'Request body must be a valid object'
});

// Update Alert Schema
export const updateAlertSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      'string.base': 'Alert ID must be a string',
      'any.required': 'Alert ID is required'
    }),
  
  title: Joi.string()
    .min(1)
    .max(200)
    .trim()
    .optional()
    .messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title cannot be empty',
      'string.max': 'Title cannot exceed 200 characters'
    }),
  
  message: Joi.string()
    .min(1)
    .max(1000)
    .trim()
    .optional()
    .messages({
      'string.base': 'Message must be a string',
      'string.min': 'Message cannot be empty',
      'string.max': 'Message cannot exceed 1000 characters'
    }),
  
  category: alertCategorySchema.optional(),
  severity: alertSeveritySchema.optional(),
  metadata: metadataSchema,
  
  expiresAt: Joi.date()
    .iso()
    .min('now')
    .allow(null)
    .optional()
    .messages({
      'date.base': 'Expires at must be a valid date',
      'date.format': 'Expires at must be in ISO 8601 format',
      'date.min': 'Expires at cannot be in the past'
    })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
  'object.base': 'Request body must be a valid object'
});

// Acknowledge Alert Schema
export const acknowledgeAlertSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required'
    }),
  
  acknowledgedBy: Joi.string()
    .optional()
    .messages({
      'string.base': 'Acknowledged by must be a string'
    }),
  
  notes: Joi.string()
    .max(500)
    .trim()
    .optional()
    .messages({
      'string.base': 'Notes must be a string',
      'string.max': 'Notes cannot exceed 500 characters'
    })
}).messages({
  'object.base': 'Request body must be a valid object'
});

// Resolve Alert Schema
export const resolveAlertSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required'
    }),
  
  resolvedBy: Joi.string()
    .optional()
    .messages({
      'string.base': 'Resolved by must be a string'
    }),
  
  resolution: Joi.string()
    .max(1000)
    .trim()
    .optional()
    .messages({
      'string.base': 'Resolution must be a string',
      'string.max': 'Resolution cannot exceed 1000 characters'
    }),
  
  notes: Joi.string()
    .max(500)
    .trim()
    .optional()
    .messages({
      'string.base': 'Notes must be a string',
      'string.max': 'Notes cannot exceed 500 characters'
    })
}).messages({
  'object.base': 'Request body must be a valid object'
});

// Alert Filters Schema
export const alertFiltersSchema = Joi.object({
  userId: Joi.string().optional(),
  
  category: Joi.alternatives()
    .try(
      alertCategorySchema.optional(),
      Joi.array().items(alertCategorySchema).min(1).max(10)
    )
    .optional()
    .messages({
      'alternatives.match': 'Category must be a valid category string or array of categories'
    }),
  
  severity: Joi.alternatives()
    .try(
      alertSeveritySchema.optional(),
      Joi.array().items(alertSeveritySchema).min(1).max(4)
    )
    .optional()
    .messages({
      'alternatives.match': 'Severity must be a valid severity string or array of severities'
    }),
  
  status: Joi.alternatives()
    .try(
      alertStatusSchema.optional(),
      Joi.array().items(alertStatusSchema).min(1).max(4)
    )
    .optional()
    .messages({
      'alternatives.match': 'Status must be a valid status string or array of statuses'
    }),
  
  type: Joi.alternatives()
    .try(
      notificationTypeSchema.optional(),
      Joi.array().items(notificationTypeSchema).min(1).max(4)
    )
    .optional()
    .messages({
      'alternatives.match': 'Type must be a valid type string or array of types'
    }),
  
  dateFrom: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'Date from must be a valid date',
      'date.format': 'Date from must be in ISO 8601 format'
    }),
  
  dateTo: Joi.date()
    .iso()
    .min(Joi.ref('dateFrom'))
    .optional()
    .messages({
      'date.base': 'Date to must be a valid date',
      'date.format': 'Date to must be in ISO 8601 format',
      'date.min': 'Date to must be after date from'
    }),
  
  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(20)
    .optional()
    .messages({
      'number.base': 'Limit must be a number',
      'number.integer': 'Limit must be an integer',
      'number.min': 'Limit must be at least 1',
      'number.max': 'Limit cannot exceed 100'
    }),
  
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .optional()
    .messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1'
    }),
  
  sortBy: Joi.string()
    .valid('createdAt', 'updatedAt', 'severity', 'category')
    .default('createdAt')
    .optional()
    .messages({
      'any.only': 'Sort by must be one of: createdAt, updatedAt, severity, category'
    }),
  
  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
    .optional()
    .messages({
      'any.only': 'Sort order must be either asc or desc'
    })
}).messages({
  'object.base': 'Query parameters must be a valid object'
});

// Bulk Alert Operation Schema
export const bulkAlertOperationSchema = Joi.object({
  action: Joi.string()
    .valid('acknowledge', 'resolve', 'dismiss', 'delete')
    .required()
    .messages({
      'any.only': 'Action must be one of: acknowledge, resolve, dismiss, delete',
      'any.required': 'Action is required'
    }),
  
  alertIds: Joi.array()
    .items(Joi.string())
    .min(1)
    .max(50)
    .unique()
    .required()
    .messages({
      'array.base': 'Alert IDs must be an array',
      'array.min': 'At least one alert ID is required',
      'array.max': 'Cannot process more than 50 alerts at once',
      'array.unique': 'Alert IDs must be unique',
      'any.required': 'Alert IDs are required'
    }),
  
  userId: Joi.string()
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required'
    }),
  
  performedBy: Joi.string()
    .optional()
    .messages({
      'string.base': 'Performed by must be a string'
    }),
  
  notes: Joi.string()
    .max(500)
    .trim()
    .optional()
    .messages({
      'string.base': 'Notes must be a string',
      'string.max': 'Notes cannot exceed 500 characters'
    }),
  
  resolution: Joi.string()
    .max(1000)
    .trim()
    .when('action', {
      is: 'resolve',
      then: Joi.optional(),
      otherwise: Joi.forbidden()
    })
    .messages({
      'string.base': 'Resolution must be a string',
      'string.max': 'Resolution cannot exceed 1000 characters',
      'any.forbidden': 'Resolution is only allowed for resolve action'
    })
}).messages({
  'object.base': 'Request body must be a valid object'
});

// Alert Preferences Schema
export const alertPreferencesSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required'
    }),
  
  emailNotifications: Joi.boolean().default(true),
  pushNotifications: Joi.boolean().default(true),
  smsNotifications: Joi.boolean().default(false),
  
  categories: Joi.object().pattern(
    Joi.string().valid('system', 'trading', 'account', 'security', 'payment', 'subscription', 'contract', 'market', 'maintenance'),
    Joi.object({
      enabled: Joi.boolean().required(),
      minSeverity: alertSeveritySchema.required(),
      methods: Joi.array()
        .items(Joi.string().valid('email', 'push', 'sms'))
        .unique()
        .default(['email'])
    })
  ).optional(),
  
  quietHours: Joi.object({
    enabled: Joi.boolean().required(),
    start: Joi.string()
      .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .messages({
        'string.pattern.base': 'Start time must be in HH:mm format'
      }),
    end: Joi.string()
      .pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .messages({
        'string.pattern.base': 'End time must be in HH:mm format'
      }),
    timezone: Joi.string().required()
  }).optional()
}).messages({
  'object.base': 'Request body must be a valid object'
});

/**
 * Validation utility functions
 */

// Validate alert ID parameter
export const validateAlertId = (alertId: string): { isValid: boolean; error?: string } => {
  const schema = Joi.string().required().messages({
    'string.base': 'Alert ID must be a string',
    'any.required': 'Alert ID is required'
  });

  const { error } = schema.validate(alertId);
  return {
    isValid: !error,
    error: error?.details[0]?.message
  };
};

// Validate user ID parameter
export const validateUserId = (userId: string): { isValid: boolean; error?: string } => {
  const schema = Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'any.required': 'User ID is required'
  });

  const { error } = schema.validate(userId);
  return {
    isValid: !error,
    error: error?.details[0]?.message
  };
};

// Generic validation function
export const validateSchema = <T>(data: T, schema: Joi.ObjectSchema): { isValid: boolean; error?: string; value?: T } => {
  const { error, value } = schema.validate(data, { 
    abortEarly: false, 
    allowUnknown: false,
    stripUnknown: true 
  });

  return {
    isValid: !error,
    error: error?.details?.map(d => d.message).join(', '),
    value: error ? undefined : value
  };
};