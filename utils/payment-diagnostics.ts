/**
 * Payment Diagnostics Utility
 * 
 * This utility provides functions to diagnose payment-related issues.
 */

export interface PaymentDiagnosticResult {
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string;
  timestamp: string;
}

/**
 * Checks if a payment processor is available and properly configured
 */
export const checkPaymentProcessor = async (processor: 'stripe' | 'paypal'): Promise<PaymentDiagnosticResult> => {
  try {
    // In a real implementation, you would make actual API calls to test the payment processor
    // For now, we'll just return mock diagnostic results
    
    const now = new Date().toISOString();
    
    if (processor === 'stripe') {
      const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      
      if (!stripeKey) {
        return {
          status: 'error',
          message: 'Stripe API key is missing',
          details: 'The Stripe publishable key is not configured in your environment variables.',
          timestamp: now
        };
      }
      
      return {
        status: 'success',
        message: 'Stripe is properly configured',
        timestamp: now
      };
    }
    
    if (processor === 'paypal') {
      const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
      
      if (!paypalClientId) {
        return {
          status: 'error',
          message: 'PayPal client ID is missing',
          details: 'The PayPal client ID is not configured in your environment variables.',
          timestamp: now
        };
      }
      
      return {
        status: 'success',
        message: 'PayPal is properly configured',
        timestamp: now
      };
    }
    
    return {
      status: 'error',
      message: `Unknown payment processor: ${processor}`,
      timestamp: now
    };
  } catch (error) {
    return {
      status: 'error',
      message: `Failed to check ${processor} configuration`,
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Diagnoses common payment issues
 */
export const diagnosePaymentIssues = async (): Promise<PaymentDiagnosticResult[]> => {
  const results: PaymentDiagnosticResult[] = [];
  
  // Check payment processors
  results.push(await checkPaymentProcessor('stripe'));
  results.push(await checkPaymentProcessor('paypal'));
  
  // Check API connectivity
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    results.push({
      status: 'error',
      message: 'API URL is missing',
      details: 'The API URL is not configured in your environment variables.',
      timestamp: new Date().toISOString()
    });
  } else {
    results.push({
      status: 'success',
      message: 'API URL is configured',
      timestamp: new Date().toISOString()
    });
  }
  
  return results;
};

/**
 * Get payment configuration status
 */
export const getPaymentConfigStatus = (): Record<string, boolean | string> => {
  return {
    stripeConfigured: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    paypalConfigured: !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'Not configured',
    environment: process.env.NODE_ENV || 'development'
  };
};
