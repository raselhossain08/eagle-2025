/**
 * Analytics Provider
 * Context provider for analytics tracking
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { analyticsService } from '@/lib/services/analytics.service';
import { useAuth } from '@/context/authContext';

interface AnalyticsContextValue {
    isInitialized: boolean;
    trackPageView: (page: string, duration?: number) => Promise<void>;
    trackEvent: (
        eventType: string,
        eventCategory: string,
        eventAction: string,
        options?: any
    ) => Promise<void>;
    queueEvent: (event: any) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);
    const { user } = useAuth();

    // Update user ID when user changes
    useEffect(() => {
        if (user?.id) {
            analyticsService.setUserId(user.id);
        } else {
            analyticsService.clearUserId();
        }
        setIsInitialized(true);
    }, [user]);

    const trackPageView = async (page: string, duration?: number) => {
        await analyticsService.trackPageView(page, duration);
    };

    const trackEvent = async (
        eventType: string,
        eventCategory: string,
        eventAction: string,
        options?: any
    ) => {
        await analyticsService.trackEvent(eventType, eventCategory, eventAction, options);
    };

    const queueEvent = (event: any) => {
        analyticsService.queueEvent(event);
    };

    const value: AnalyticsContextValue = {
        isInitialized,
        trackPageView,
        trackEvent,
        queueEvent
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
}

export function useAnalyticsContext() {
    const context = useContext(AnalyticsContext);
    if (context === undefined) {
        throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
    }
    return context;
}
