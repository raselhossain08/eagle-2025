import Joi from 'joi';

/**
 * Validation schemas for discount management system
 * Implements comprehensive validation rules for discount codes, 
 * creation, updates, and application logic.
 */

// Base discount schema with common validation rules
export const createDiscountSchema = Joi.object({
  code: Joi.string()
    .alphanum()
    .uppercase()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.alphanum': 'Discount code can only contain alphanumeric characters',
      'string.uppercase': 'Discount code must be uppercase',
      'string.min': 'Discount code must be at least 3 characters long',
      'string.max': 'Discount code cannot exceed 50 characters',
      'any.required': 'Discount code is required'
    }),

  name: Joi.string()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.min': 'Discount name must be at least 3 characters long',
      'string.max': 'Discount name cannot exceed 100 characters',
      'any.required': 'Discount name is required'
    }),

  description: Joi.string()
    .max(500)
    .optional()
    .allow('')
    .messages({
      'string.max': 'Description cannot exceed 500 characters'
    }),

  type: Joi.string()
    .valid('percentage', 'fixed_amount', 'free_trial', 'buy_one_get_one', 'tiered')
    .required()
    .messages({
      'any.only': 'Discount type must be one of: percentage, fixed_amount, free_trial, buy_one_get_one, tiered',
      'any.required': 'Discount type is required'
    }),

  value: Joi.number()
    .min(0)
    .when('type', {
      is: 'percentage',
      then: Joi.number().max(100).messages({
        'number.max': 'Percentage discount cannot exceed 100%'
      }),
      otherwise: Joi.number().max(999999).messages({
        'number.max': 'Fixed amount cannot exceed 999,999'
      })
    })
    .required()
    .messages({
      'number.min': 'Discount value must be a positive number',
      'any.required': 'Discount value is required'
    }),

  currency: Joi.string()
    .length(3)
    .uppercase()
    .when('type', {
      is: 'fixed_amount',
      then: Joi.required(),
      otherwise: Joi.optional()
    })
    .messages({
      'string.length': 'Currency must be a 3-letter ISO code',
      'string.uppercase': 'Currency must be uppercase',
      'any.required': 'Currency is required for fixed amount discounts'
    }),

  // Usage limits
  maxUses: Joi.number()
    .integer()
    .min(1)
    .max(999999)
    .optional()
    .messages({
      'number.integer': 'Maximum uses must be a whole number',
      'number.min': 'Maximum uses must be at least 1',
      'number.max': 'Maximum uses cannot exceed 999,999'
    }),

  maxUsesPerUser: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .optional()
    .messages({
      'number.integer': 'Maximum uses per user must be a whole number',
      'number.min': 'Maximum uses per user must be at least 1',
      'number.max': 'Maximum uses per user cannot exceed 100'
    }),

  // Time validity
  startDate: Joi.date()
    .iso()
    .min('now')
    .required()
    .messages({
      'date.min': 'Start date cannot be in the past',
      'any.required': 'Start date is required'
    }),

  endDate: Joi.date()
    .iso()
    .greater(Joi.ref('startDate'))
    .required()
    .messages({
      'date.greater': 'End date must be after start date',
      'any.required': 'End date is required'
    }),

  // Minimum purchase requirements
  minimumPurchase: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.min': 'Minimum purchase amount must be positive'
    }),

  // Applicable subscription tiers
  applicableSubscriptions: Joi.array()
    .items(Joi.string().valid('basic', 'script', 'infinity', 'diamond'))
    .min(1)
    .optional()
    .messages({
      'array.min': 'At least one subscription tier must be selected',
      'any.only': 'Invalid subscription tier specified'
    }),

  // Applicable products/services
  applicableProducts: Joi.array()
    .items(Joi.string())
    .optional(),

  // Stackability
  stackable: Joi.boolean()
    .default(false)
    .optional(),

  // Status
  isActive: Joi.boolean()
    .default(true)
    .optional(),

  // Metadata
  createdBy: Joi.string()
    .optional(),

  tags: Joi.array()
    .items(Joi.string().max(50))
    .max(10)
    .optional()
    .messages({
      'array.max': 'Cannot have more than 10 tags',
      'string.max': 'Tag length cannot exceed 50 characters'
    })
});

// Schema for updating existing discounts (all fields optional except ID)
export const updateDiscountSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      'any.required': 'Discount ID is required for updates'
    }),

  name: Joi.string()
    .min(3)
    .max(100)
    .optional(),

  description: Joi.string()
    .max(500)
    .optional()
    .allow(''),

  value: Joi.number()
    .min(0)
    .optional(),

  maxUses: Joi.number()
    .integer()
    .min(1)
    .max(999999)
    .optional(),

  maxUsesPerUser: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .optional(),

  endDate: Joi.date()
    .iso()
    .optional(),

  minimumPurchase: Joi.number()
    .min(0)
    .optional(),

  applicableSubscriptions: Joi.array()
    .items(Joi.string().valid('basic', 'script', 'infinity', 'diamond'))
    .optional(),

  applicableProducts: Joi.array()
    .items(Joi.string())
    .optional(),

  stackable: Joi.boolean()
    .optional(),

  isActive: Joi.boolean()
    .optional(),

  tags: Joi.array()
    .items(Joi.string().max(50))
    .max(10)
    .optional()
});

// Schema for validating discount codes during application
export const validateDiscountCodeSchema = Joi.object({
  code: Joi.string()
    .required()
    .messages({
      'any.required': 'Discount code is required'
    }),

  userId: Joi.string()
    .optional(),

  subscriptionTier: Joi.string()
    .valid('basic', 'script', 'infinity', 'diamond')
    .optional(),

  cartTotal: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.min': 'Cart total must be a positive number',
      'any.required': 'Cart total is required'
    }),

  currency: Joi.string()
    .length(3)
    .uppercase()
    .required()
    .messages({
      'string.length': 'Currency must be a 3-letter ISO code',
      'any.required': 'Currency is required'
    }),

  products: Joi.array()
    .items(Joi.string())
    .optional()
});

// Schema for discount preview calculations
export const previewDiscountSchema = Joi.object({
  discountId: Joi.string()
    .required()
    .messages({
      'any.required': 'Discount ID is required'
    }),

  cartTotal: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.min': 'Cart total must be a positive number',
      'any.required': 'Cart total is required'
    }),

  currency: Joi.string()
    .length(3)
    .uppercase()
    .required(),

  subscriptionTier: Joi.string()
    .valid('basic', 'script', 'infinity', 'diamond')
    .optional(),

  products: Joi.array()
    .items(Joi.string())
    .optional(),

  userId: Joi.string()
    .optional()
});

// Schema for bulk discount operations
export const bulkDiscountSchema = Joi.object({
  action: Joi.string()
    .valid('activate', 'deactivate', 'delete')
    .required(),

  discountIds: Joi.array()
    .items(Joi.string())
    .min(1)
    .max(50)
    .required()
    .messages({
      'array.min': 'At least one discount ID is required',
      'array.max': 'Cannot process more than 50 discounts at once'
    })
});

// Query parameters schema for listing discounts
export const listDiscountsQuerySchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1),

  limit: Joi.number()
    .integer()
    .min(1)
    .max(100)
    .default(20),

  status: Joi.string()
    .valid('active', 'inactive', 'expired', 'all')
    .default('all'),

  type: Joi.string()
    .valid('percentage', 'fixed_amount', 'free_trial', 'buy_one_get_one', 'tiered')
    .optional(),

  search: Joi.string()
    .max(100)
    .optional(),

  sortBy: Joi.string()
    .valid('createdAt', 'name', 'code', 'endDate', 'usageCount')
    .default('createdAt'),

  sortOrder: Joi.string()
    .valid('asc', 'desc')
    .default('desc')
});

/**
 * Utility function to validate data against a schema
 * @param schema - Joi schema to validate against
 * @param data - Data to validate
 * @returns Validation result with error details if invalid
 */
export const validateData = (schema: Joi.ObjectSchema, data: any) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
    convert: true
  });

  if (error) {
    return {
      isValid: false,
      errors: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        type: detail.type
      })),
      value: null
    };
  }

  return {
    isValid: true,
    errors: [],
    value
  };
};

/**
 * Middleware function for Next.js API routes to validate request body
 * @param schema - Joi schema to validate against
 */
export const createValidationMiddleware = (schema: Joi.ObjectSchema) => {
  return (data: any) => {
    const result = validateData(schema, data);
    if (!result.isValid) {
      throw new Error(`Validation failed: ${result.errors.map(e => e.message).join(', ')}`);
    }
    return result.value;
  };
};