/**
 * Example: Analytics Implementation for Pricing Page
 */

'use client';

import { useAnalytics } from '@/hooks/use-analytics';
import { useEffect } from 'react';
import { TrackClick } from '@/components/common/TrackClick';

export function PricingPageExample() {
    const {
        trackSubscriptionView,
        trackButtonClick,
        trackFormSubmit
    } = useAnalytics();

    // Track when user views a specific plan
    useEffect(() => {
        trackSubscriptionView('premium');
    }, [trackSubscriptionView]);

    const handleSelectPlan = async (planName: string, price: number) => {
        // Track plan selection
        await trackButtonClick('select_plan', {
            plan: planName,
            price,
            location: 'pricing_page'
        });

        // Navigate to checkout...
    };

    const handleContactSales = async (formData: any) => {
        // Track form submission
        await trackFormSubmit('contact_sales', {
            plan: 'enterprise',
            companySize: formData.companySize,
            industry: formData.industry
        });

        // Submit form...
    };

    return (
        <div className="pricing-page">
            <h1>Choose Your Plan</h1>

            {/* Basic Plan */}
            <div className="plan-card">
                <h3>Basic - $29/mo</h3>
                <TrackClick
                    eventName="select_basic_plan"
                    eventCategory="conversion"
                    eventAction="click"
                    properties={{ plan: 'basic', price: 29 }}
                    as="button"
                    className="btn-primary"
                >
                    Select Basic
                </TrackClick>
            </div>

            {/* Premium Plan */}
            <div className="plan-card">
                <h3>Premium - $99/mo</h3>
                <button
                    onClick={() => handleSelectPlan('premium', 99)}
                    className="btn-primary"
                >
                    Select Premium
                </button>
            </div>

            {/* Enterprise */}
            <div className="plan-card">
                <h3>Enterprise - Custom</h3>
                <button
                    onClick={() => handleContactSales({ companySize: '500+' })}
                    className="btn-primary"
                >
                    Contact Sales
                </button>
            </div>
        </div>
    );
}
