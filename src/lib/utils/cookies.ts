import Cookies from 'js-cookie';

/**
 * Cookie utility functions for client-side cookie management
 */

export interface CookieOptions {
    expires?: number | Date; // Days until expiration or exact date
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}

const defaultOptions: CookieOptions = {
    expires: 7, // 7 days default
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
};

/**
 * Set a cookie with a value
 */
export const setCookie = (
    name: string,
    value: string | object,
    options?: CookieOptions
): void => {
    const cookieValue = typeof value === 'object' ? JSON.stringify(value) : value;
    Cookies.set(name, cookieValue, { ...defaultOptions, ...options });
};

/**
 * Get a cookie value
 */
export const getCookie = <T = string>(name: string): T | null => {
    const value = Cookies.get(name);

    if (!value) return null;

    // Try to parse as JSON
    try {
        return JSON.parse(value) as T;
    } catch {
        return value as T;
    }
};

/**
 * Remove a cookie
 */
export const removeCookie = (name: string, options?: CookieOptions): void => {
    Cookies.remove(name, { ...defaultOptions, ...options });
};

/**
 * Check if a cookie exists
 */
export const hasCookie = (name: string): boolean => {
    return Cookies.get(name) !== undefined;
};

/**
 * Get all cookies
 */
export const getAllCookies = (): { [key: string]: string } => {
    return Cookies.get();
};

// Discount-specific cookie functions
export interface DiscountCookieData {
    code: string;
    amount: number;
    total: number;
    timestamp: number;
}

/**
 * Save discount data to cookie
 */
export const saveDiscountCookie = (data: DiscountCookieData): void => {
    setCookie('checkout_discount', data, {
        expires: 1, // 1 day expiration for checkout discount
        path: '/',
    });
};

/**
 * Get discount data from cookie
 */
export const getDiscountCookie = (): DiscountCookieData | null => {
    return getCookie<DiscountCookieData>('checkout_discount');
};

/**
 * Remove discount cookie
 */
export const removeDiscountCookie = (): void => {
    removeCookie('checkout_discount');
};

/**
 * Check if discount cookie exists
 */
export const hasDiscountCookie = (): boolean => {
    return hasCookie('checkout_discount');
};
