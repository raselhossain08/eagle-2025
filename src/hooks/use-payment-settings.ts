/**
 * Example: How to use dynamic payment settings in your components
 */

import { useEffect, useState } from 'react';
import publicPaymentService from '@/lib/services/public-payment.service';
import { loadStripe, Stripe } from '@stripe/stripe-js';

// Example 1: Load Stripe dynamically
export function useStripeLoader() {
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initStripe = async () => {
            try {
                const publishableKey = await publicPaymentService.getStripePublishableKey();

                if (!publishableKey) {
                    throw new Error('Stripe is not configured');
                }

                const stripeInstance = await loadStripe(publishableKey);
                setStripe(stripeInstance);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        initStripe();
    }, []);

    return { stripe, loading, error };
}

// Example 2: Load PayPal dynamically
export function usePayPalLoader() {
    const [paypalReady, setPaypalReady] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initPayPal = async () => {
            try {
                const clientId = await publicPaymentService.getPayPalClientId();

                if (!clientId) {
                    throw new Error('PayPal is not configured');
                }

                // Load PayPal SDK script
                const script = document.createElement('script');
                script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
                script.onload = () => setPaypalReady(true);
                script.onerror = () => setError('Failed to load PayPal SDK');
                document.body.appendChild(script);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        initPayPal();
    }, []);

    return { paypalReady, loading, error };
}

// Example 3: Check which payment methods are available
export function useAvailablePaymentMethods() {
    const [methods, setMethods] = useState<{
        stripe: boolean;
        paypal: boolean;
    }>({
        stripe: false,
        paypal: false,
    });

    useEffect(() => {
        const checkMethods = async () => {
            const [stripeEnabled, paypalEnabled] = await Promise.all([
                publicPaymentService.isProviderEnabled('stripe'),
                publicPaymentService.isProviderEnabled('paypal'),
            ]);

            setMethods({
                stripe: stripeEnabled,
                paypal: paypalEnabled,
            });
        };

        checkMethods();
    }, []);

    return methods;
}

// Example 4: Get all payment settings
export function usePaymentSettings() {
    const [settings, setSettings] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await publicPaymentService.getPublicSettings();
                setSettings(data);
            } catch (error) {
                console.error('Failed to fetch payment settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    return { settings, loading };
}
