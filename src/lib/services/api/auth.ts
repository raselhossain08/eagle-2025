/**
 * Authentication API Service
 * Handles user registration, login, password reset, and account activation
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface ForgotPasswordData {
    email: string;
}

export interface ResetPasswordData {
    password: string;
    confirmPassword: string;
}

export interface SetPasswordData {
    token: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    authType?: string;
    message?: string;
}

export interface MessageResponse {
    success: boolean;
    message: string;
}

/**
 * Register a new user
 */
export async function register(data: RegisterData): Promise<AuthResponse> {
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Registration failed");
        }

        return result;
    } catch (error: any) {
        console.error("Registration error:", error);
        throw new Error(error.message || "Failed to register user");
    }
}

/**
 * Login user
 */
export async function login(data: LoginData): Promise<AuthResponse> {
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Login failed");
        }

        return result;
    } catch (error: any) {
        console.error("Login error:", error);
        throw new Error(error.message || "Failed to login");
    }
}

/**
 * Request password reset email
 */
export async function forgotPassword(
    data: ForgotPasswordData
): Promise<MessageResponse> {
    try {
        const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to send reset email");
        }

        return result;
    } catch (error: any) {
        console.error("Forgot password error:", error);
        throw new Error(error.message || "Failed to process forgot password request");
    }
}

/**
 * Reset password with token
 */
export async function resetPassword(
    token: string,
    data: ResetPasswordData
): Promise<MessageResponse> {
    try {
        const response = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Password reset failed");
        }

        return result;
    } catch (error: any) {
        console.error("Reset password error:", error);
        throw new Error(error.message || "Failed to reset password");
    }
}

/**
 * Activate account with token
 */
export async function activateAccount(token: string): Promise<AuthResponse> {
    try {
        const response = await fetch(`${API_URL}/api/auth/activate/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Account activation failed");
        }

        return result;
    } catch (error: any) {
        console.error("Activate account error:", error);
        throw new Error(error.message || "Failed to activate account");
    }
}

/**
 * Set password for pending user
 */
export async function setPassword(
    data: SetPasswordData
): Promise<AuthResponse> {
    try {
        const response = await fetch(`${API_URL}/api/auth/set-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to set password");
        }

        return result;
    } catch (error: any) {
        console.error("Set password error:", error);
        throw new Error(error.message || "Failed to set password");
    }
}

/**
 * Resend activation email
 */
export async function resendActivation(
    email: string
): Promise<MessageResponse> {
    try {
        const response = await fetch(`${API_URL}/api/auth/resend-activation`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to resend activation email");
        }

        return result;
    } catch (error: any) {
        console.error("Resend activation error:", error);
        throw new Error(error.message || "Failed to resend activation email");
    }
}

/**
 * Check if user exists (for WordPress migration)
 */
export async function checkUserExists(email: string): Promise<{
    success: boolean;
    exists: boolean;
    user?: any;
}> {
    try {
        const response = await fetch(
            `${API_URL}/api/auth/check-user-exists?email=${encodeURIComponent(email)}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to check user existence");
        }

        return result;
    } catch (error: any) {
        console.error("Check user exists error:", error);
        throw new Error(error.message || "Failed to check if user exists");
    }
}

/**
 * Validate current session/token
 */
export async function validateToken(token: string): Promise<{
    success: boolean;
    valid: boolean;
    user?: any;
}> {
    try {
        const response = await fetch(`${API_URL}/api/auth/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const result = await response.json();

        return {
            success: response.ok,
            valid: response.ok,
            user: result.user || result,
        };
    } catch (error: any) {
        console.error("Validate token error:", error);
        return {
            success: false,
            valid: false,
        };
    }
}
