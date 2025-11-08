/**
 * Example: Analytics Implementation for Authentication Flow
 */

'use client';

import { useAnalytics } from '@/hooks/use-analytics';
import { useState } from 'react';

export function AuthFlowExample() {
    const {
        trackSignup,
        trackLogin,
        trackLogout,
        trackError,
        trackFormSubmit,
        trackButtonClick
    } = useAnalytics();

    const [authMethod, setAuthMethod] = useState<'email' | 'google' | 'github'>('email');

    const handleSignup = async (formData: {
        email: string;
        password: string;
        name: string;
    }) => {
        try {
            // Track signup attempt
            await trackFormSubmit('signup_form', {
                method: authMethod,
                hasReferral: !!localStorage.getItem('referral_code')
            });

            // Process signup...
            const response = await signupUser(formData);

            if (response.success) {
                // Track successful signup
                await trackSignup(authMethod);

                // Track additional signup details
                await trackButtonClick('signup_completed', {
                    method: authMethod,
                    userId: response.userId,
                    source: 'signup_page',
                    timeToComplete: Date.now() - (window as any).signupStartTime
                });

                // Redirect to dashboard
                window.location.href = '/dashboard';
            }
        } catch (error: any) {
            // Track signup error
            await trackError('signup_error', error.message, {
                method: authMethod,
                errorCode: error.code,
                field: error.field
            });

            alert('Signup failed: ' + error.message);
        }
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            // Track login attempt
            await trackFormSubmit('login_form', {
                method: authMethod
            });

            // Process login...
            const response = await loginUser(email, password);

            if (response.success) {
                // Track successful login
                await trackLogin(authMethod);

                // Track user properties
                await trackButtonClick('login_completed', {
                    method: authMethod,
                    userId: response.userId,
                    lastLogin: response.lastLoginDate,
                    loginCount: response.loginCount
                });

                // Redirect
                window.location.href = '/dashboard';
            }
        } catch (error: any) {
            // Track login error
            await trackError('login_error', error.message, {
                method: authMethod,
                errorType: error.type,
                attempts: error.attemptCount
            });

            alert('Login failed: ' + error.message);
        }
    };

    const handleSocialAuth = async (provider: 'google' | 'github') => {
        // Track social auth click
        await trackButtonClick(`${provider}_auth_clicked`, {
            provider,
            page: 'login'
        });

        try {
            // Initiate OAuth flow...
            const response = await socialLogin(provider);

            if (response.success) {
                // Track successful social login
                await trackLogin(provider);

                // Track if it's a new user
                if (response.isNewUser) {
                    await trackSignup(provider);
                }
            }
        } catch (error: any) {
            await trackError('social_auth_error', error.message, {
                provider,
                errorCode: error.code
            });
        }
    };

    const handleLogout = async () => {
        // Track logout
        await trackLogout();

        // Track session duration
        const sessionStart = localStorage.getItem('session_start');
        if (sessionStart) {
            const sessionDuration = Date.now() - parseInt(sessionStart);
            await trackButtonClick('logout_completed', {
                sessionDuration: Math.floor(sessionDuration / 1000),
                pagesVisited: parseInt(localStorage.getItem('pages_visited') || '0')
            });
        }

        // Logout logic...
        localStorage.clear();
        window.location.href = '/';
    };

    const handlePasswordReset = async (email: string) => {
        // Track password reset request
        await trackFormSubmit('password_reset_request', {
            method: 'email'
        });

        try {
            await requestPasswordReset(email);

            await trackButtonClick('password_reset_sent', {
                method: 'email'
            });
        } catch (error: any) {
            await trackError('password_reset_error', error.message, {
                email
            });
        }
    };

    return (
        <div className="auth-page">
            <h1>Sign Up / Login</h1>

            {/* Email/Password Form */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    handleSignup({
                        email: formData.get('email') as string,
                        password: formData.get('password') as string,
                        name: formData.get('name') as string
                    });
                }}
            >
                <input name="name" type="text" placeholder="Full Name" required />
                <input name="email" type="email" placeholder="Email" required />
                <input name="password" type="password" placeholder="Password" required />
                <button type="submit">Sign Up</button>
            </form>

            {/* Social Auth */}
            <div className="social-auth">
                <button onClick={() => handleSocialAuth('google')}>
                    Continue with Google
                </button>
                <button onClick={() => handleSocialAuth('github')}>
                    Continue with GitHub
                </button>
            </div>

            {/* Password Reset */}
            <button onClick={() => {
                const email = prompt('Enter your email');
                if (email) handlePasswordReset(email);
            }}>
                Forgot Password?
            </button>
        </div>
    );
}

// Mock functions
async function signupUser(data: any) {
    return { success: true, userId: 'user_123' };
}

async function loginUser(email: string, password: string) {
    return {
        success: true,
        userId: 'user_123',
        lastLoginDate: new Date().toISOString(),
        loginCount: 5
    };
}

async function socialLogin(provider: string) {
    return { success: true, isNewUser: false };
}

async function requestPasswordReset(email: string) {
    return { success: true };
}
