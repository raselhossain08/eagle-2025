/**
 * Example: Analytics Implementation for Checkout Flow
 */

'use client';

import { useAnalytics } from '@/hooks/use-analytics';
import { useState } from 'react';

interface CheckoutData {
    plan: string;
    amount: number;
    currency: string;
    billingCycle: 'monthly' | 'annual';
}

export function CheckoutFlowExample() {
    const {
        trackPaymentStarted,
        trackPaymentCompleted,
        trackError,
        trackButtonClick,
        trackFormSubmit
    } = useAnalytics();

    const [checkoutData, setCheckoutData] = useState<CheckoutData>({
        plan: 'premium',
        amount: 99.99,
        currency: 'USD',
        billingCycle: 'monthly'
    });

    const handleBillingCycleChange = async (cycle: 'monthly' | 'annual') => {
        // Track billing cycle selection
        await trackButtonClick('change_billing_cycle', {
            from: checkoutData.billingCycle,
            to: cycle,
            plan: checkoutData.plan
        });

        setCheckoutData({ ...checkoutData, billingCycle: cycle });
    };

    const handleApplyCoupon = async (couponCode: string) => {
        // Track coupon application attempt
        await trackFormSubmit('apply_coupon', {
            couponCode,
            plan: checkoutData.plan,
            originalAmount: checkoutData.amount
        });

        try {
            // Apply coupon logic...
            const discountedAmount = checkoutData.amount * 0.8; // 20% off

            // Track successful coupon application
            await trackButtonClick('coupon_applied', {
                couponCode,
                discount: 20,
                originalAmount: checkoutData.amount,
                newAmount: discountedAmount
            });

            setCheckoutData({ ...checkoutData, amount: discountedAmount });
        } catch (error: any) {
            // Track failed coupon
            await trackError('coupon_error', error.message, {
                couponCode,
                errorType: 'invalid_coupon'
            });
        }
    };

    const handlePayment = async () => {
        try {
            // Track payment started
            await trackPaymentStarted(checkoutData.amount, checkoutData.currency);

            // Process payment...
            const response = await processPayment(checkoutData);

            if (response.success) {
                // Track payment completed
                await trackPaymentCompleted(
                    checkoutData.amount,
                    checkoutData.currency,
                    response.transactionId
                );

                // Redirect to success page
                window.location.href = '/payment-success';
            }
        } catch (error: any) {
            // Track payment error
            await trackError('payment_error', error.message, {
                amount: checkoutData.amount,
                plan: checkoutData.plan,
                errorCode: error.code,
                paymentMethod: 'stripe'
            });

            alert('Payment failed. Please try again.');
        }
    };

    return (
        <div className="checkout-page">
            <h1>Complete Your Purchase</h1>

            {/* Plan Summary */}
            <div className="plan-summary">
                <h3>{checkoutData.plan} Plan</h3>
                <p>
                    ${checkoutData.amount} / {checkoutData.billingCycle}
                </p>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="billing-toggle">
                <button
                    onClick={() => handleBillingCycleChange('monthly')}
                    className={checkoutData.billingCycle === 'monthly' ? 'active' : ''}
                >
                    Monthly
                </button>
                <button
                    onClick={() => handleBillingCycleChange('annual')}
                    className={checkoutData.billingCycle === 'annual' ? 'active' : ''}
                >
                    Annual (Save 20%)
                </button>
            </div>

            {/* Coupon Code */}
            <div className="coupon-section">
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    id="coupon-input"
                />
                <button
                    onClick={() => {
                        const input = document.getElementById('coupon-input') as HTMLInputElement;
                        handleApplyCoupon(input.value);
                    }}
                >
                    Apply
                </button>
            </div>

            {/* Payment Button */}
            <button onClick={handlePayment} className="btn-pay">
                Pay ${checkoutData.amount}
            </button>
        </div>
    );
}

// Mock payment function
async function processPayment(data: CheckoutData) {
    return new Promise<{ success: boolean; transactionId: string }>((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                transactionId: `txn_${Date.now()}`
            });
        }, 1000);
    });
}
