import { useState, useCallback, useEffect } from 'react';
import { discountService, DiscountVerificationResponse, DiscountVerificationRequest } from '@/lib/services/api/discount';
import { toast } from './use-toast';
import { saveDiscountCookie, getDiscountCookie, removeDiscountCookie } from '@/lib/utils/cookies';

interface UseDiscountReturn {
  // State
  discountCode: string;
  appliedDiscount: DiscountVerificationResponse | null;
  isVerifying: boolean;
  isApplying: boolean;
  error: string | null;

  // Actions
  setDiscountCode: (code: string) => void;
  verifyDiscount: (orderAmount?: number, quantity?: number) => Promise<DiscountVerificationResponse | null>;
  clearDiscount: () => void;
  applyDiscount: (orderId?: string, originalAmount?: number) => Promise<boolean>;

  // Calculated values
  hasValidDiscount: boolean;
  discountAmount: number;
  finalAmount: number;
  savingsPercentage: number;
}

/**
 * Custom hook for managing discount codes in checkout process
 */
export const useDiscount = (initialOrderAmount = 0): UseDiscountReturn => {
  const [discountCode, setDiscountCodeState] = useState<string>('');
  const [appliedDiscount, setAppliedDiscount] = useState<DiscountVerificationResponse | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load discount from cookies on mount
  useEffect(() => {
    const savedDiscount = getDiscountCookie();
    if (savedDiscount && savedDiscount.code) {
      console.log('📦 Loading saved discount from cookies in hook:', savedDiscount);
      setDiscountCodeState(savedDiscount.code);
    }
  }, []);

  /**
   * Set discount code and clear any previous discount
   */
  const setDiscountCode = useCallback((code: string) => {
    setDiscountCodeState(code.toUpperCase().trim());

    // Clear previous discount if code changes
    if (appliedDiscount && appliedDiscount.discount.code !== code.toUpperCase().trim()) {
      setAppliedDiscount(null);
    }

    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  }, [appliedDiscount, error]);

  /**
   * Verify discount code without applying it (uses smart verification)
   * Returns the verification result object on success, or null on failure
   */
  const verifyDiscount = useCallback(async (
    orderAmount: number = initialOrderAmount,
    quantity: number = 1
  ): Promise<DiscountVerificationResponse | null> => {
    if (!discountCode.trim()) {
      setError('Please enter a discount code');
      return null;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const verificationData: DiscountVerificationRequest = {
        code: discountCode,
        orderAmount,
        quantity
      };

      // Use smart verification method that chooses appropriate endpoint based on auth status
      const result = await discountService.smartVerifyDiscount(verificationData);

      setAppliedDiscount(result);

      // Get auth status for enhanced messaging
      const authStatus = discountService.getUserAuthStatus();

      // Show success message with auth-aware information
      toast({
        title: "Discount Applied!",
        description: `${result.discount.name} - Save ${discountService.formatCurrency(result.calculation.savings)}${authStatus.isAuthenticated ? ' (Authenticated user)' : ' (Guest)'
          }`,
        variant: "default",
      });

      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to verify discount code';
      setError(errorMessage);
      setAppliedDiscount(null);

      // Show error toast with auth-aware information
      const authStatus = discountService.getUserAuthStatus();
      toast({
        title: "Invalid Discount Code",
        description: `${errorMessage}${!authStatus.isAuthenticated ? '. Log in for additional discount options.' : ''
          }`,
        variant: "destructive",
      });

      return null;
    } finally {
      setIsVerifying(false);
    }
  }, [discountCode, initialOrderAmount]);

  /**
   * Apply discount code (for authenticated users)
   */
  const applyDiscount = useCallback(async (
    orderId?: string,
    originalAmount?: number
  ): Promise<boolean> => {
    if (!appliedDiscount) {
      setError('Please verify the discount code first');
      return false;
    }

    setIsApplying(true);
    setError(null);

    try {
      const applyData = {
        discountCode,
        orderId,
        originalAmount: originalAmount || appliedDiscount.calculation.originalAmount,
        quantity: 1
      };

      await discountService.applyDiscount(applyData);

      toast({
        title: "Discount Applied Successfully!",
        description: `Your order total has been updated with the ${appliedDiscount.discount.name} discount`,
        variant: "default",
      });

      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to apply discount';
      setError(errorMessage);

      toast({
        title: "Failed to Apply Discount",
        description: errorMessage,
        variant: "destructive",
      });

      return false;
    } finally {
      setIsApplying(false);
    }
  }, [appliedDiscount, discountCode]);

  /**
   * Clear applied discount
   */
  const clearDiscount = useCallback(() => {
    setDiscountCode('');
    setAppliedDiscount(null);
    setError(null);

    // Clear discount from cookies
    removeDiscountCookie();

    toast({
      title: "Discount Removed",
      description: "The discount has been removed from your order",
      variant: "default",
    });
  }, []);

  // Calculated values
  const hasValidDiscount = appliedDiscount !== null;
  const discountAmount = appliedDiscount?.calculation.discountAmount || 0;
  const finalAmount = appliedDiscount?.calculation.finalAmount || initialOrderAmount;
  const savingsPercentage = appliedDiscount?.calculation.savingsPercentage || 0;

  return {
    // State
    discountCode,
    appliedDiscount,
    isVerifying,
    isApplying,
    error,

    // Actions
    setDiscountCode,
    verifyDiscount,
    clearDiscount,
    applyDiscount,

    // Calculated values
    hasValidDiscount,
    discountAmount,
    finalAmount,
    savingsPercentage,
  };
};

export default useDiscount;