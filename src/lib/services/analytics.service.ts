/**
 * Analytics Service
 * Frontend service for tracking analytics events
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface PageViewData {
    sessionId: string;
    userId?: string;
    page: string;
    referrer?: string;
    userAgent?: string;
    deviceType: 'desktop' | 'mobile' | 'tablet';
    trafficSource: string;
    duration?: number;
}

export interface EventData {
    sessionId: string;
    userId?: string;
    eventType: string;
    eventCategory: string;
    eventAction: string;
    eventLabel?: string;
    eventValue?: number;
    page?: string;
    properties?: Record<string, any>;
}

export interface SessionData {
    sessionId: string;
    userId?: string;
    startTime?: Date;
    endTime?: Date;
    duration?: number;
    deviceInfo?: {
        type: string;
        browser: string;
        os: string;
        screenResolution: string;
    };
    location?: {
        country?: string;
        city?: string;
        timezone?: string;
    };
    trafficSource?: string;
}

export interface BatchEvent {
    type: string;
    userId?: string;
    sessionId?: string;
    timestamp?: string | Date;
    properties?: Record<string, any>;
    metadata?: Record<string, any>;
}

export interface AnalyticsResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
    warnings?: string[];
}

export interface ConversionData {
    visitorId: string;
    sessionId: string;
    userId?: string;
    conversionType: string;
    conversionValue?: number;
    currency?: string;
    transactionId?: string;
    products?: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
    }>;
    properties?: Record<string, any>;
    metadata?: Record<string, any>;
}

export interface InteractionData {
    visitorId: string;
    sessionId: string;
    userId?: string;
    interactionType: 'click' | 'hover' | 'scroll' | 'focus' | 'input' | 'submit' | 'custom';
    elementType: string;
    elementId?: string;
    elementClass?: string;
    elementText?: string;
    value?: string | number;
    duration?: number;
    properties?: Record<string, any>;
    metadata?: Record<string, any>;
}

export interface ConsentPreferences {
    analytics?: boolean;
    marketing?: boolean;
    functional?: boolean;
}

export interface ConsentData {
    visitorId: string;
    jurisdiction?: 'EU' | 'US' | 'GLOBAL';
    consentGiven: boolean;
    preferences: ConsentPreferences;
    timestamp: string;
    metadata?: Record<string, any>;
}

class AnalyticsService {
    private sessionId: string | null = null;
    private userId: string | null = null;
    private visitorId: string | null = null;
    private isInitialized = false;
    private eventQueue: BatchEvent[] = [];
    private batchTimeout: NodeJS.Timeout | null = null;
    private readonly BATCH_DELAY = 2000; // Send batch every 2 seconds
    private readonly BATCH_SIZE = 10; // Or when 10 events are queued

    constructor() {
        if (typeof window !== 'undefined') {
            this.initialize();
        }
    }

    /**
     * Initialize analytics service
     */
    private initialize() {
        console.log('🔧 Analytics Service Initializing...', {
            apiUrl: API_BASE_URL
        });

        // Generate or retrieve visitor ID
        this.visitorId = this.getOrCreateVisitorId();

        // Generate or retrieve session ID
        this.sessionId = this.getOrCreateSessionId();

        console.log('✅ Analytics Initialized:', {
            visitorId: this.visitorId,
            sessionId: this.sessionId,
            apiUrl: API_BASE_URL
        });

        // Get user ID from localStorage if available
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                this.userId = user._id || user.id || null;
            } catch (e) {
                console.error('Failed to parse stored user:', e);
            }
        }

        this.isInitialized = true;

        // Track initial page view
        if (typeof window !== 'undefined') {
            console.log('📊 Tracking initial page view:', window.location.pathname);
            this.trackPageView(window.location.pathname);
        }

        // Setup beforeunload to flush events
        if (typeof window !== 'undefined') {
            window.addEventListener('beforeunload', () => {
                this.flushEvents();
            });
        }
    }

    /**
     * Get or create visitor ID (permanent across sessions)
     */
    private getOrCreateVisitorId(): string {
        const VISITOR_KEY = 'eagle_visitor_id';

        let visitorId = localStorage.getItem(VISITOR_KEY);

        if (visitorId) {
            return visitorId;
        }

        // Create new visitor ID
        const newVisitorId = this.generateId();
        localStorage.setItem(VISITOR_KEY, newVisitorId);
        return newVisitorId;
    }

    /**
     * Get or create session ID
     */
    private getOrCreateSessionId(): string {
        const SESSION_KEY = 'eagle_session_id';
        const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

        let sessionData = localStorage.getItem(SESSION_KEY);

        if (sessionData) {
            try {
                const { id, timestamp } = JSON.parse(sessionData);
                // Check if session is still valid
                if (Date.now() - timestamp < SESSION_DURATION) {
                    return id;
                }
            } catch (e) {
                console.error('Failed to parse session data:', e);
            }
        }

        // Create new session
        const newSessionId = this.generateId();
        const newSessionData = {
            id: newSessionId,
            timestamp: Date.now()
        };

        localStorage.setItem(SESSION_KEY, JSON.stringify(newSessionData));
        return newSessionId;
    }

    /**
     * Generate unique ID
     */
    private generateId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get device type
     */
    private getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
        if (typeof window === 'undefined') return 'desktop';

        const ua = navigator.userAgent;
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'mobile';
        }
        return 'desktop';
    }

    /**
     * Get device info
     */
    private getDeviceInfo(): {
        type: string;
        browser: string;
        os: string;
        screenResolution: string;
    } {
        if (typeof window === 'undefined') {
            return {
                type: 'desktop',
                browser: 'Unknown',
                os: 'Unknown',
                screenResolution: '0x0'
            };
        }

        const ua = navigator.userAgent;
        let browser = 'Unknown';
        let os = 'Unknown';

        // Detect browser
        if (ua.indexOf('Firefox') > -1) browser = 'Firefox';
        else if (ua.indexOf('Chrome') > -1) browser = 'Chrome';
        else if (ua.indexOf('Safari') > -1) browser = 'Safari';
        else if (ua.indexOf('Edge') > -1) browser = 'Edge';
        else if (ua.indexOf('MSIE') > -1 || ua.indexOf('Trident/') > -1) browser = 'IE';

        // Detect OS
        if (ua.indexOf('Win') > -1) os = 'Windows';
        else if (ua.indexOf('Mac') > -1) os = 'MacOS';
        else if (ua.indexOf('Linux') > -1) os = 'Linux';
        else if (ua.indexOf('Android') > -1) os = 'Android';
        else if (ua.indexOf('iOS') > -1) os = 'iOS';

        return {
            type: this.getDeviceType(),
            browser,
            os,
            screenResolution: `${window.screen.width}x${window.screen.height}`
        };
    }

    /**
     * Get traffic source
     */
    private getTrafficSource(): string {
        if (typeof window === 'undefined') return 'direct';

        const referrer = document.referrer;
        if (!referrer) return 'direct';

        const url = new URL(referrer);
        const hostname = url.hostname;

        if (hostname.includes('google')) return 'google';
        if (hostname.includes('facebook')) return 'facebook';
        if (hostname.includes('twitter') || hostname.includes('t.co')) return 'twitter';
        if (hostname.includes('linkedin')) return 'linkedin';
        if (hostname.includes('youtube')) return 'youtube';

        return 'referral';
    }

    /**
     * Set user ID
     */
    setUserId(userId: string) {
        this.userId = userId;
    }

    /**
     * Clear user ID (on logout)
     */
    clearUserId() {
        this.userId = null;
    }

    /**
     * Track page view
     */
    async trackPageView(page: string, duration: number = 0): Promise<AnalyticsResponse> {
        if (!this.isInitialized || !this.sessionId || !this.visitorId) {
            console.warn('⚠️ Analytics not initialized');
            return { success: false, message: 'Analytics not initialized' };
        }

        console.log('📄 Tracking page view:', page, 'duration:', duration);

        try {
            // Use batch events endpoint which has simpler validation
            const events = [{
                type: 'page_view',
                userId: this.userId || undefined,
                sessionId: this.sessionId,
                timestamp: new Date().toISOString(),
                properties: {
                    page: typeof window !== 'undefined' ? window.location.href : page,
                    path: page,
                    title: typeof document !== 'undefined' ? document.title : page,
                    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
                    duration,
                    deviceType: this.getDeviceType(),
                    trafficSource: this.getTrafficSource()
                },
                metadata: {
                    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
                    viewport: typeof window !== 'undefined' ? {
                        width: window.innerWidth,
                        height: window.innerHeight
                    } : undefined
                }
            }];

            console.log('🚀 Sending to:', `${API_BASE_URL}/analytics/events/batch`);
            console.log('📦 Payload:', JSON.stringify(events, null, 2));

            const response = await fetch(`${API_BASE_URL}/analytics/events/batch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ events })
            });

            const result = await response.json();
            console.log('✅ Response:', result);
            return result;
        } catch (error) {
            console.error('Failed to track page view:', error);
            return {
                success: false,
                message: 'Failed to track page view',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Track custom event
     */
    async trackEvent(
        eventType: string,
        eventCategory: string,
        eventAction: string,
        options?: {
            eventLabel?: string;
            eventValue?: number;
            page?: string;
            properties?: Record<string, any>;
        }
    ): Promise<AnalyticsResponse> {
        if (!this.isInitialized || !this.sessionId || !this.visitorId) {
            console.warn('Analytics not initialized');
            return { success: false, message: 'Analytics not initialized' };
        }

        try {
            // Use batch events endpoint
            const events = [{
                type: eventType,
                userId: this.userId || undefined,
                sessionId: this.sessionId,
                timestamp: new Date().toISOString(),
                properties: {
                    category: eventCategory,
                    action: eventAction,
                    label: options?.eventLabel,
                    value: options?.eventValue,
                    page: options?.page || (typeof window !== 'undefined' ? window.location.pathname : '/'),
                    ...options?.properties
                },
                metadata: {
                    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
                }
            }];

            const response = await fetch(`${API_BASE_URL}/analytics/events/batch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ events })
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to track event:', error);
            return {
                success: false,
                message: 'Failed to track event',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Update session
     */
    async updateSession(sessionData: Partial<SessionData>): Promise<AnalyticsResponse> {
        if (!this.isInitialized || !this.sessionId) {
            console.warn('Analytics not initialized');
            return { success: false, message: 'Analytics not initialized' };
        }

        try {
            const data: SessionData = {
                sessionId: this.sessionId,
                userId: this.userId || undefined,
                deviceInfo: this.getDeviceInfo(),
                trafficSource: this.getTrafficSource(),
                ...sessionData
            };

            const response = await fetch(`${API_BASE_URL}/analytics/track/session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to update session:', error);
            return {
                success: false,
                message: 'Failed to update session',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Add event to batch queue
     */
    queueEvent(event: BatchEvent) {
        if (!this.sessionId) {
            console.warn('Analytics not initialized');
            return;
        }

        // Add session ID if not present
        if (!event.sessionId) {
            event.sessionId = this.sessionId;
        }

        // Add user ID if available and not present
        if (!event.userId && this.userId) {
            event.userId = this.userId;
        }

        // Add timestamp if not present
        if (!event.timestamp) {
            event.timestamp = new Date().toISOString();
        }

        this.eventQueue.push(event);

        // Send batch if size limit reached
        if (this.eventQueue.length >= this.BATCH_SIZE) {
            this.flushEvents();
        } else {
            // Schedule batch send
            this.scheduleBatchSend();
        }
    }

    /**
     * Schedule batch send
     */
    private scheduleBatchSend() {
        if (this.batchTimeout) {
            clearTimeout(this.batchTimeout);
        }

        this.batchTimeout = setTimeout(() => {
            this.flushEvents();
        }, this.BATCH_DELAY);
    }

    /**
     * Send batch events
     */
    async sendBatchEvents(events: BatchEvent[]): Promise<AnalyticsResponse> {
        if (events.length === 0) {
            return { success: true, message: 'No events to send' };
        }

        try {
            const response = await fetch(`${API_BASE_URL}/analytics/events/batch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ events })
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to send batch events:', error);
            return {
                success: false,
                message: 'Failed to send batch events',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Send single event
     */
    async sendSingleEvent(event: BatchEvent): Promise<AnalyticsResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}/analytics/events/single`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event)
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to send single event:', error);
            return {
                success: false,
                message: 'Failed to send single event',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Flush queued events
     */
    async flushEvents() {
        if (this.batchTimeout) {
            clearTimeout(this.batchTimeout);
            this.batchTimeout = null;
        }

        if (this.eventQueue.length === 0) {
            return;
        }

        const eventsToSend = [...this.eventQueue];
        this.eventQueue = [];

        await this.sendBatchEvents(eventsToSend);
    }

    /**
     * ========================================
     * SESSION LIFECYCLE METHODS
     * ========================================
     */

    /**
     * Initialize visitor session (explicit initialization)
     */
    async initializeSession(): Promise<AnalyticsResponse> {
        if (!this.sessionId || !this.visitorId) {
            console.warn('Analytics not initialized');
            return { success: false, message: 'Analytics not initialized' };
        }

        try {
            const data = {
                visitorId: this.visitorId,
                sessionId: this.sessionId,
                userId: this.userId || undefined,
                startTime: new Date().toISOString(),
                deviceInfo: this.getDeviceInfo(),
                trafficSource: this.getTrafficSource(),
                referrer: typeof document !== 'undefined' ? document.referrer : undefined,
                landingPage: typeof window !== 'undefined' ? window.location.pathname : '/',
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined
            };

            const response = await fetch(`${API_BASE_URL}/analytics/session/init`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to initialize session:', error);
            return {
                success: false,
                message: 'Failed to initialize session',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * End visitor session (call on page unload or explicit logout)
     */
    async endSession(reason: 'unload' | 'logout' | 'timeout' = 'unload'): Promise<AnalyticsResponse> {
        if (!this.sessionId || !this.visitorId) {
            console.warn('Analytics not initialized');
            return { success: false, message: 'Analytics not initialized' };
        }

        try {
            // First, flush any pending events
            await this.flushEvents();

            const data = {
                visitorId: this.visitorId,
                sessionId: this.sessionId,
                userId: this.userId || undefined,
                endTime: new Date().toISOString(),
                reason,
                metadata: {
                    pagesViewed: typeof window !== 'undefined' ? window.history.length : 0
                }
            };

            const response = await fetch(`${API_BASE_URL}/analytics/session/end`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            // Clear session ID if logout or timeout
            if (reason === 'logout' || reason === 'timeout') {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('analytics_session_id');
                    localStorage.removeItem('analytics_session_start');
                }
                this.sessionId = null;
            }

            return result;
        } catch (error) {
            console.error('Failed to end session:', error);
            return {
                success: false,
                message: 'Failed to end session',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * ========================================
     * CONVERSION TRACKING METHODS
     * ========================================
     */

    /**
     * Track conversion event
     */
    async trackConversion(
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
    ): Promise<AnalyticsResponse> {
        if (!this.isInitialized || !this.sessionId || !this.visitorId) {
            console.warn('Analytics not initialized');
            return { success: false, message: 'Analytics not initialized' };
        }

        try {
            const data = {
                visitorId: this.visitorId,
                sessionId: this.sessionId,
                userId: this.userId || undefined,
                conversionType,
                conversionValue,
                currency: options?.currency || 'USD',
                transactionId: options?.transactionId,
                products: options?.products,
                properties: {
                    page: typeof window !== 'undefined' ? window.location.pathname : '/',
                    timestamp: new Date().toISOString(),
                    ...options?.properties
                },
                metadata: {
                    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
                    deviceType: this.getDeviceType()
                }
            };

            const response = await fetch(`${API_BASE_URL}/analytics/track/conversion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to track conversion:', error);
            return {
                success: false,
                message: 'Failed to track conversion',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * ========================================
     * INTERACTION TRACKING METHODS
     * ========================================
     */

    /**
     * Track user interaction (clicks, hovers, scrolls, etc.)
     */
    async trackInteraction(
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
    ): Promise<AnalyticsResponse> {
        if (!this.isInitialized || !this.sessionId || !this.visitorId) {
            console.warn('Analytics not initialized');
            return { success: false, message: 'Analytics not initialized' };
        }

        try {
            const data = {
                visitorId: this.visitorId,
                sessionId: this.sessionId,
                userId: this.userId || undefined,
                interactionType,
                elementType,
                elementId: options?.elementId,
                elementClass: options?.elementClass,
                elementText: options?.elementText,
                value: options?.value,
                duration: options?.duration,
                properties: {
                    page: typeof window !== 'undefined' ? window.location.pathname : '/',
                    timestamp: new Date().toISOString(),
                    ...options?.properties
                },
                metadata: {
                    viewport: typeof window !== 'undefined' ? {
                        width: window.innerWidth,
                        height: window.innerHeight
                    } : undefined
                }
            };

            const response = await fetch(`${API_BASE_URL}/analytics/track/interaction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to track interaction:', error);
            return {
                success: false,
                message: 'Failed to track interaction',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Track batch events to visitorAnalytics endpoint
     */
    async trackBatchEvents(events: Array<{
        eventType: string;
        eventData: Record<string, any>;
        timestamp?: string;
    }>): Promise<AnalyticsResponse> {
        if (!this.isInitialized || !this.sessionId || !this.visitorId) {
            console.warn('Analytics not initialized');
            return { success: false, message: 'Analytics not initialized' };
        }

        try {
            const data = {
                visitorId: this.visitorId,
                sessionId: this.sessionId,
                userId: this.userId || undefined,
                events: events.map(event => ({
                    ...event,
                    timestamp: event.timestamp || new Date().toISOString()
                }))
            };

            const response = await fetch(`${API_BASE_URL}/analytics/track/batch`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Failed to track batch events:', error);
            return {
                success: false,
                message: 'Failed to track batch events',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * ========================================
     * CONSENT & PRIVACY METHODS
     * ========================================
     */

    /**
     * Initialize consent tracking
     */
    async initializeConsent(
        jurisdiction: 'EU' | 'US' | 'GLOBAL' = 'GLOBAL',
        consentGiven: boolean = false,
        preferences?: {
            analytics?: boolean;
            marketing?: boolean;
            functional?: boolean;
        }
    ): Promise<AnalyticsResponse> {
        if (!this.visitorId) {
            console.warn('Visitor ID not available');
            return { success: false, message: 'Visitor ID not available' };
        }

        try {
            const data = {
                visitorId: this.visitorId,
                jurisdiction,
                consentGiven,
                preferences: preferences || {
                    analytics: consentGiven,
                    marketing: false,
                    functional: true
                },
                timestamp: new Date().toISOString(),
                metadata: {
                    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
                    language: typeof navigator !== 'undefined' ? navigator.language : undefined
                }
            };

            const response = await fetch(`${API_BASE_URL}/analytics/consent/init`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            // Store consent preferences locally
            if (typeof window !== 'undefined') {
                localStorage.setItem('analytics_consent', JSON.stringify({
                    given: consentGiven,
                    preferences,
                    timestamp: new Date().toISOString()
                }));
            }

            return result;
        } catch (error) {
            console.error('Failed to initialize consent:', error);
            return {
                success: false,
                message: 'Failed to initialize consent',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Update consent preferences
     */
    async updateConsentPreferences(preferences: {
        analytics?: boolean;
        marketing?: boolean;
        functional?: boolean;
    }): Promise<AnalyticsResponse> {
        if (!this.visitorId) {
            console.warn('Visitor ID not available');
            return { success: false, message: 'Visitor ID not available' };
        }

        try {
            const data = {
                visitorId: this.visitorId,
                preferences,
                timestamp: new Date().toISOString()
            };

            const response = await fetch(`${API_BASE_URL}/analytics/consent/preferences`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            // Update stored consent preferences
            if (typeof window !== 'undefined') {
                const stored = localStorage.getItem('analytics_consent');
                const current = stored ? JSON.parse(stored) : {};
                localStorage.setItem('analytics_consent', JSON.stringify({
                    ...current,
                    preferences,
                    timestamp: new Date().toISOString()
                }));
            }

            return result;
        } catch (error) {
            console.error('Failed to update consent preferences:', error);
            return {
                success: false,
                message: 'Failed to update consent preferences',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Withdraw consent (GDPR right to withdraw)
     */
    async withdrawConsent(reason?: string): Promise<AnalyticsResponse> {
        if (!this.visitorId) {
            console.warn('Visitor ID not available');
            return { success: false, message: 'Visitor ID not available' };
        }

        try {
            const data = {
                visitorId: this.visitorId,
                reason,
                timestamp: new Date().toISOString()
            };

            const response = await fetch(`${API_BASE_URL}/analytics/consent/withdraw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            // Clear consent from localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('analytics_consent');
            }

            // Stop tracking
            this.isInitialized = false;

            return result;
        } catch (error) {
            console.error('Failed to withdraw consent:', error);
            return {
                success: false,
                message: 'Failed to withdraw consent',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Enable cookieless tracking mode
     */
    async enableCookielessMode(): Promise<AnalyticsResponse> {
        if (!this.visitorId) {
            console.warn('Visitor ID not available');
            return { success: false, message: 'Visitor ID not available' };
        }

        try {
            const data = {
                visitorId: this.visitorId,
                enabled: true,
                timestamp: new Date().toISOString()
            };

            const response = await fetch(`${API_BASE_URL}/analytics/consent/cookieless`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            // Mark as cookieless mode
            if (typeof window !== 'undefined') {
                localStorage.setItem('analytics_cookieless', 'true');
            }

            return result;
        } catch (error) {
            console.error('Failed to enable cookieless mode:', error);
            return {
                success: false,
                message: 'Failed to enable cookieless mode',
                error: error instanceof Error ? error.message : 'Unknown error'
            };
        }
    }

    /**
     * Check if user has given tracking consent
     */
    hasTrackingConsent(): boolean {
        if (typeof window === 'undefined') return false;

        const stored = localStorage.getItem('analytics_consent');
        if (!stored) return false;

        try {
            const consent = JSON.parse(stored);
            return consent.given === true && consent.preferences?.analytics === true;
        } catch {
            return false;
        }
    }

    /**
     * ========================================
     * CONVENIENCE METHODS FOR COMMON EVENTS
     * ========================================
     */

    // Track button click
    trackButtonClick(buttonName: string, properties?: Record<string, any>) {
        return this.trackEvent('user_action', 'user_interaction', 'button_click', {
            eventLabel: buttonName,
            properties
        });
    }

    // Track form submission
    trackFormSubmit(formName: string, properties?: Record<string, any>) {
        return this.trackEvent('user_action', 'user_interaction', 'form_submit', {
            eventLabel: formName,
            properties
        });
    }

    // Track signup
    trackSignup(method: string = 'email') {
        return this.trackEvent('signup_completed', 'conversion', 'signup', {
            eventLabel: method,
            properties: { method }
        });
    }

    // Track login
    trackLogin(method: string = 'email') {
        return this.trackEvent('login', 'user_interaction', 'login', {
            eventLabel: method,
            properties: { method }
        });
    }

    // Track logout
    trackLogout() {
        return this.trackEvent('logout', 'user_interaction', 'logout');
    }

    // Track subscription view
    trackSubscriptionView(planName: string) {
        return this.trackEvent('subscription_viewed', 'engagement', 'view_subscription', {
            eventLabel: planName,
            properties: { plan: planName }
        });
    }

    // Track payment
    trackPaymentStarted(amount: number, currency: string = 'USD') {
        return this.trackEvent('payment_started', 'conversion', 'payment_started', {
            eventValue: amount,
            properties: { amount, currency }
        });
    }

    trackPaymentCompleted(amount: number, currency: string = 'USD', transactionId?: string) {
        return this.trackEvent('payment_completed', 'conversion', 'payment_completed', {
            eventValue: amount,
            properties: { amount, currency, transactionId }
        });
    }

    // Track error
    trackError(errorType: string, errorMessage: string, properties?: Record<string, any>) {
        return this.trackEvent('error_occurred', 'error', 'error', {
            eventLabel: errorType,
            properties: {
                errorType,
                errorMessage,
                ...properties
            }
        });
    }

    // Track search
    trackSearch(query: string, resultsCount?: number) {
        return this.trackEvent('search', 'engagement', 'search', {
            eventLabel: query,
            properties: { query, resultsCount }
        });
    }

    // Track download
    trackDownload(fileName: string, fileType?: string) {
        return this.trackEvent('download', 'engagement', 'download', {
            eventLabel: fileName,
            properties: { fileName, fileType }
        });
    }

    // Track video play
    trackVideoPlay(videoId: string, videoTitle?: string) {
        return this.trackEvent('video_play', 'engagement', 'video_play', {
            eventLabel: videoId,
            properties: { videoId, videoTitle }
        });
    }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
export default analyticsService;
