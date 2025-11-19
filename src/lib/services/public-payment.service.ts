/**
 * Public Payment Settings Service
 * Fetches dynamic payment gateway settings from backend (no authentication required)
 * Returns only public/publishable keys safe for frontend use
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface PublicPaymentSettings {
    paypal: {
        enabled: boolean;
        mode: 'sandbox' | 'live';
        clientId: string;
        configured: boolean;
    };
    stripe: {
        enabled: boolean;
        mode: 'test' | 'live';
        publishableKey: string;
        configured: boolean;
    };
}

interface ApiResponse {
    success: boolean;
    data?: PublicPaymentSettings;
    message?: string;
}

class PublicPaymentService {
    private cache: PublicPaymentSettings | null = null;
    private cacheTimestamp: number = 0;
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    /**
     * Get public payment settings (cached for 5 minutes)
     */
    async getPublicSettings(): Promise<PublicPaymentSettings> {
        // Return cached data if still valid
        const now = Date.now();
        if (this.cache && (now - this.cacheTimestamp) < this.CACHE_DURATION) {
            return this.cache;
        }

        try {
            const response = await fetch(`${API_URL}/payment-settings/public`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store', // Always fetch fresh data from server
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result: ApiResponse = await response.json();

            if (result.success && result.data) {
                // Update cache
                this.cache = result.data;
                this.cacheTimestamp = now;
                return result.data;
            }

            throw new Error(result.message || 'Failed to fetch payment settings');
        } catch (error) {
            console.error('Public Payment Settings Error:', error);

            // Return fallback settings from environment variables if API fails
            return this.getFallbackSettings();
        }
    }

    /**
     * Get Stripe publishable key (with fallback to env)
     */
    async getStripePublishableKey(): Promise<string | null> {
        try {
            const settings = await this.getPublicSettings();
            if (settings.stripe.enabled && settings.stripe.publishableKey) {
                return settings.stripe.publishableKey;
            }
        } catch (error) {
            console.error('Failed to get Stripe key from backend:', error);
        }

        // Fallback to environment variable
        return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null;
    }

    /**
     * Get PayPal client ID (with fallback to env)
     */
    async getPayPalClientId(): Promise<string | null> {
        try {
            const settings = await this.getPublicSettings();
            if (settings.paypal.enabled && settings.paypal.clientId) {
                return settings.paypal.clientId;
            }
        } catch (error) {
            console.error('Failed to get PayPal key from backend:', error);
        }

        // Fallback to environment variable
        return process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || null;
    }

    /**
     * Check if a payment provider is enabled
     */
    async isProviderEnabled(provider: 'paypal' | 'stripe'): Promise<boolean> {
        try {
            const settings = await this.getPublicSettings();
            return settings[provider].enabled;
        } catch (error) {
            console.error(`Failed to check ${provider} status:`, error);
            return false;
        }
    }

    /**
     * Clear the cache (useful after admin updates settings)
     */
    clearCache(): void {
        this.cache = null;
        this.cacheTimestamp = 0;
    }

    /**
     * Fallback settings from environment variables
     */
    private getFallbackSettings(): PublicPaymentSettings {
        return {
            paypal: {
                enabled: !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                mode: (process.env.NEXT_PUBLIC_PAYPAL_MODE as 'sandbox' | 'live') || 'sandbox',
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                configured: !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            },
            stripe: {
                enabled: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
                mode: 'live',
                publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
                configured: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
            },
        };
    }
}

// Export singleton instance
const publicPaymentService = new PublicPaymentService();
export default publicPaymentService;
