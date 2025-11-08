/**
 * Analytics Hook
 * Custom React hook for analytics tracking
 */

import { useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { analyticsService } from '@/lib/services/analytics.service';

interface UseAnalyticsOptions {
    trackPageViews?: boolean;
    trackTimeOnPage?: boolean;
}

export function useAnalytics(options: UseAnalyticsOptions = {}) {
    const {
        trackPageViews = true,
        trackTimeOnPage = true
    } = options;

    const pathname = usePathname();
    const pageLoadTime = useRef<number>(Date.now());

    // Track page views automatically
    useEffect(() => {
        if (!trackPageViews) return;

        // Track page view when pathname changes
        analyticsService.trackPageView(pathname);

        // Update page load time
        pageLoadTime.current = Date.now();

        // Cleanup: track time on page when leaving
        return () => {
            if (trackTimeOnPage) {
                const duration = Math.floor((Date.now() - pageLoadTime.current) / 1000);
                analyticsService.trackPageView(pathname, duration);
            }
        };
    }, [pathname, trackPageViews, trackTimeOnPage]);

    // Track events
    const trackEvent = useCallback(
        (
            eventType: string,
            eventCategory: string,
            eventAction: string,
            options?: {
                eventLabel?: string;
                eventValue?: number;
                properties?: Record<string, any>;
            }
        ) => {
            return analyticsService.trackEvent(eventType, eventCategory, eventAction, options);
        },
        []
    );

    // Track button click
    const trackButtonClick = useCallback(
        (buttonName: string, properties?: Record<string, any>) => {
            return analyticsService.trackButtonClick(buttonName, properties);
        },
        []
    );

    // Track form submission
    const trackFormSubmit = useCallback(
        (formName: string, properties?: Record<string, any>) => {
            return analyticsService.trackFormSubmit(formName, properties);
        },
        []
    );

    // Track conversion events
    const trackSignup = useCallback((method?: string) => {
        return analyticsService.trackSignup(method);
    }, []);

    const trackLogin = useCallback((method?: string) => {
        return analyticsService.trackLogin(method);
    }, []);

    const trackLogout = useCallback(() => {
        return analyticsService.trackLogout();
    }, []);

    // Track engagement events
    const trackSubscriptionView = useCallback((planName: string) => {
        return analyticsService.trackSubscriptionView(planName);
    }, []);

    const trackSearch = useCallback((query: string, resultsCount?: number) => {
        return analyticsService.trackSearch(query, resultsCount);
    }, []);

    const trackDownload = useCallback((fileName: string, fileType?: string) => {
        return analyticsService.trackDownload(fileName, fileType);
    }, []);

    // Track payment events
    const trackPaymentStarted = useCallback((amount: number, currency?: string) => {
        return analyticsService.trackPaymentStarted(amount, currency);
    }, []);

    const trackPaymentCompleted = useCallback(
        (amount: number, currency?: string, transactionId?: string) => {
            return analyticsService.trackPaymentCompleted(amount, currency, transactionId);
        },
        []
    );

    // Track errors
    const trackError = useCallback(
        (errorType: string, errorMessage: string, properties?: Record<string, any>) => {
            return analyticsService.trackError(errorType, errorMessage, properties);
        },
        []
    );

    // Queue event for batch processing
    const queueEvent = useCallback((event: any) => {
        analyticsService.queueEvent(event);
    }, []);

    // Session lifecycle
    const initializeSession = useCallback(() => {
        return analyticsService.initializeSession();
    }, []);

    const endSession = useCallback((reason?: 'unload' | 'logout' | 'timeout') => {
        return analyticsService.endSession(reason);
    }, []);

    // Conversion tracking (advanced)
    const trackConversion = useCallback(
        (
            conversionType: string,
            conversionValue?: number,
            options?: {
                transactionId?: string;
                currency?: string;
                products?: Array<{
                    id: string;
                    name: string;
                    price: number;
                    quantity: number;
                }>;
                properties?: Record<string, any>;
            }
        ) => {
            return analyticsService.trackConversion(conversionType, conversionValue, options);
        },
        []
    );

    // Interaction tracking
    const trackInteraction = useCallback(
        (
            interactionType: 'click' | 'hover' | 'scroll' | 'focus' | 'input' | 'submit' | 'custom',
            elementType: string,
            options?: {
                elementId?: string;
                elementClass?: string;
                elementText?: string;
                value?: string | number;
                duration?: number;
                properties?: Record<string, any>;
            }
        ) => {
            return analyticsService.trackInteraction(interactionType, elementType, options);
        },
        []
    );

    // Consent management
    const initializeConsent = useCallback(
        (
            jurisdiction?: 'EU' | 'US' | 'GLOBAL',
            consentGiven?: boolean,
            preferences?: {
                analytics?: boolean;
                marketing?: boolean;
                functional?: boolean;
            }
        ) => {
            return analyticsService.initializeConsent(jurisdiction, consentGiven, preferences);
        },
        []
    );

    const updateConsentPreferences = useCallback(
        (preferences: {
            analytics?: boolean;
            marketing?: boolean;
            functional?: boolean;
        }) => {
            return analyticsService.updateConsentPreferences(preferences);
        },
        []
    );

    const withdrawConsent = useCallback((reason?: string) => {
        return analyticsService.withdrawConsent(reason);
    }, []);

    const enableCookielessMode = useCallback(() => {
        return analyticsService.enableCookielessMode();
    }, []);

    const hasTrackingConsent = useCallback(() => {
        return analyticsService.hasTrackingConsent();
    }, []);

    return {
        // Core tracking
        trackEvent,
        trackButtonClick,
        trackFormSubmit,

        // Conversion tracking
        trackSignup,
        trackLogin,
        trackLogout,
        trackConversion,

        // Engagement tracking
        trackSubscriptionView,
        trackSearch,
        trackDownload,

        // Payment tracking
        trackPaymentStarted,
        trackPaymentCompleted,

        // Interaction tracking
        trackInteraction,

        // Error tracking
        trackError,

        // Batch tracking
        queueEvent,

        // Session lifecycle
        initializeSession,
        endSession,

        // Consent management
        initializeConsent,
        updateConsentPreferences,
        withdrawConsent,
        enableCookielessMode,
        hasTrackingConsent,

        // Direct access to service
        analytics: analyticsService
    };
}

export default useAnalytics;
