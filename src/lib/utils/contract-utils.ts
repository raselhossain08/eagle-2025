/**
 * Contract utilities for mapping product types to template IDs
 * and handling dynamic contract selection
 */

export interface ProductTemplateMapping {
  productType: string;
  templateCategories: string[];
  templateIds: string[];
  defaultVariables: Record<string, any>;
}

/**
 * Product type to contract template mapping
 */
export const PRODUCT_TEMPLATE_MAPPING: Record<string, ProductTemplateMapping> = {
  'diamond-advisory': {
    productType: 'diamond-advisory',
    templateCategories: ['advisory_agreement', 'investment_agreement'],
    templateIds: ['diamond-advisory-v1', 'investment-advisory-v1'],
    defaultVariables: {
      productName: 'Diamond Advisory Service',
      subscriptionType: 'monthly',
      amount: 76,
    }
  },
  'infinity-membership': {
    productType: 'infinity-membership',
    templateCategories: ['subscription_agreement', 'service_agreement'],
    templateIds: ['infinity-membership-v1', 'service-agreement-v1'],
    defaultVariables: {
      productName: 'Infinity Membership',
      subscriptionType: 'yearly',
      amount: 1200,
    }
  },
  'basic-package': {
    productType: 'basic-package',
    templateCategories: ['service_agreement', 'subscription_agreement'],
    templateIds: ['basic-service-v1', 'subscription-agreement-v1'],
    defaultVariables: {
      productName: 'Basic Package',
      subscriptionType: 'monthly',
      amount: 29,
    }
  },
  'script-access': {
    productType: 'script-access',
    templateCategories: ['license_agreement', 'service_agreement'],
    templateIds: ['script-license-v1', 'software-license-v1'],
    defaultVariables: {
      productName: 'Script Access License',
      subscriptionType: 'monthly',
      amount: 50,
    }
  },
  'trading-tutor': {
    productType: 'trading-tutor',
    templateCategories: ['consulting_agreement', 'service_agreement'],
    templateIds: ['trading-tutor-v1', 'consulting-agreement-v1'],
    defaultVariables: {
      productName: 'Trading Tutor Service',
      subscriptionType: 'monthly',
      amount: 99,
    }
  },
  'investment-advisory': {
    productType: 'investment-advisory',
    templateCategories: ['advisory_agreement', 'investment_agreement'],
    templateIds: ['investment-advisory-v1', 'advisory-agreement-v1'],
    defaultVariables: {
      productName: 'Investment Advisory Service',
      subscriptionType: 'monthly',
      amount: 150,
    }
  },
  'ultimate-package': {
    productType: 'ultimate-package',
    templateCategories: ['subscription_agreement', 'advisory_agreement'],
    templateIds: ['ultimate-package-v1', 'premium-service-v1'],
    defaultVariables: {
      productName: 'Ultimate Package',
      subscriptionType: 'yearly',
      amount: 2400,
    }
  },
};

/**
 * Get template mapping for a product type
 */
export const getTemplateMapping = (productType: string): ProductTemplateMapping | null => {
  return PRODUCT_TEMPLATE_MAPPING[productType] || null;
};

/**
 * Get default variables for a product type
 */
export const getDefaultVariablesForProduct = (productType: string): Record<string, any> => {
  const mapping = getTemplateMapping(productType);
  return mapping?.defaultVariables || {};
};

/**
 * Convert contract data to template variables
 */
export const contractToTemplateVariables = (contract: any): Record<string, any> => {
  const baseVariables = {
    // Customer Information
    customerName: contract.name || contract.fullName || '',
    customerEmail: contract.email || '',
    customerPhone: contract.phone || '',
    
    // Address Information
    customerAddress: {
      line1: contract.streetAddress || '',
      line2: contract.flatSuiteUnit || '',
      city: contract.townCity || '',
      state: contract.stateCounty || '',
      postalCode: contract.postcodeZip || '',
      country: contract.country || 'United States',
    },
    
    // Contract Details
    contractDate: contract.contractDate || contract.signedDate || new Date().toISOString().split('T')[0],
    signatureDate: contract.signedDate || new Date().toISOString().split('T')[0],
    signature: contract.signature || '',
    
    // Product Information
    productType: contract.productType || '',
    productName: contract.productName || '',
    subscriptionType: contract.subscriptionType || 'monthly',
    amount: contract.amount || 0,
    
    // Payment Information
    paymentProvider: contract.paymentProvider || 'stripe',
    paymentId: contract.paymentId || '',
    
    // Subscription Dates
    subscriptionStartDate: contract.subscriptionStartDate || new Date().toISOString().split('T')[0],
    subscriptionEndDate: contract.subscriptionEndDate || '',
    
    // Additional Information
    discordUsername: contract.discordUsername || '',
    isDiamondContract: contract.isDiamondContract || false,
    
    // Company Information (can be overridden)
    companyName: 'Eagle Investors LLC',
    companyAddress: 'United States',
    companyWebsite: 'https://eagle-investors.com',
    companyEmail: 'support@eagle-investors.com',
  };

  // Add product-specific variables
  const productMapping = getTemplateMapping(contract.productType);
  if (productMapping) {
    Object.assign(baseVariables, productMapping.defaultVariables);
  }

  return baseVariables;
};

/**
 * Format product type for display
 */
export const formatProductType = (productType: string): string => {
  return productType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Get contract status color and label
 */
export const getContractStatusInfo = (status: string) => {
  switch (status) {
    case 'draft':
      return { color: 'gray', label: 'Draft', description: 'Contract is being prepared' };
    case 'pending_approval':
      return { color: 'yellow', label: 'Pending Approval', description: 'Awaiting approval workflow' };
    case 'approved':
      return { color: 'blue', label: 'Approved', description: 'Contract approved and ready' };
    case 'sent_for_signature':
      return { color: 'purple', label: 'Sent for Signature', description: 'Awaiting signatures' };
    case 'partially_signed':
      return { color: 'orange', label: 'Partially Signed', description: 'Some parties have signed' };
    case 'signed':
      return { color: 'blue', label: 'Signed', description: 'All parties have signed' };
    case 'payment_pending':
      return { color: 'yellow', label: 'Payment Pending', description: 'Awaiting payment' };
    case 'completed':
    case 'active':
      return { color: 'green', label: 'Active', description: 'Contract is active' };
    case 'cancelled':
      return { color: 'red', label: 'Cancelled', description: 'Contract cancelled' };
    case 'expired':
      return { color: 'red', label: 'Expired', description: 'Contract has expired' };
    case 'terminated':
      return { color: 'red', label: 'Terminated', description: 'Contract terminated' };
    default:
      return { color: 'gray', label: status, description: 'Unknown status' };
  }
};

/**
 * Check if contract is editable
 */
export const isContractEditable = (status: string): boolean => {
  return ['draft', 'pending_approval'].includes(status);
};

/**
 * Check if contract can be signed
 */
export const canContractBeSigned = (status: string): boolean => {
  return ['approved', 'sent_for_signature', 'partially_signed'].includes(status);
};

/**
 * Check if contract is active
 */
export const isContractActive = (status: string): boolean => {
  return ['signed', 'completed', 'active'].includes(status);
};