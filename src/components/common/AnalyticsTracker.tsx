/**
 * Analytics Tracker Component
 * Automatic page view tracking component
 */

'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analyticsService } from '@/lib/services/analytics.service';

export function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pageLoadTime = useRef<number>(Date.now());
    const lastPathname = useRef<string>('');

    useEffect(() => {
        // Construct full URL with search params
        const url = searchParams?.toString()
            ? `${pathname}?${searchParams.toString()}`
            : pathname;

        // Track page view only if pathname changed
        if (pathname !== lastPathname.current) {
            // Track time on previous page
            if (lastPathname.current) {
                const duration = Math.floor((Date.now() - pageLoadTime.current) / 1000);
                analyticsService.trackPageView(lastPathname.current, duration);
            }

            // Track new page view
            analyticsService.trackPageView(url);

            // Update refs
            pageLoadTime.current = Date.now();
            lastPathname.current = pathname;
        }
    }, [pathname, searchParams]);

    // Track time on page when component unmounts (page closes)
    useEffect(() => {
        return () => {
            if (lastPathname.current) {
                const duration = Math.floor((Date.now() - pageLoadTime.current) / 1000);
                analyticsService.trackPageView(lastPathname.current, duration);
                analyticsService.flushEvents();
            }
        };
    }, []);

    return null; // This component doesn't render anything
}
