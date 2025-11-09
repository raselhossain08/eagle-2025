/**
 * Contract-Plan Matching Utilities
 * Helps match contract templates with subscription plans
 */

import { getContractTemplates, type ContractTemplate } from '@/lib/services/api/contract-templates';

export interface Plan {
    _id: string;
    displayName: string;
    planType: string;
    price: number;
    [key: string]: any;
}

/**
 * Find matching template for a plan by name
 */
export async function findTemplateForPlan(planName: string): Promise<ContractTemplate | null> {
    try {
        const response = await getContractTemplates({
            status: 'active',
            search: planName,
            limit: 20,
        });

        // Try exact name match first (case-insensitive)
        const exactMatch = response.templates.find(
            (t) => t.name.toLowerCase() === planName.toLowerCase()
        );

        if (exactMatch) {
            return exactMatch;
        }

        // Try partial match
        const partialMatch = response.templates.find(
            (t) => t.name.toLowerCase().includes(planName.toLowerCase()) ||
                planName.toLowerCase().includes(t.name.toLowerCase())
        );

        return partialMatch || null;
    } catch (error) {
        console.error('Error finding template for plan:', error);
        return null;
    }
}

/**
 * Find matching plan for a template by name
 */
export function findPlanForTemplate(
    templateName: string,
    plans: Plan[]
): Plan | null {
    // Try exact name match first (case-insensitive)
    const exactMatch = plans.find(
        (p) => p.displayName.toLowerCase() === templateName.toLowerCase()
    );

    if (exactMatch) {
        return exactMatch;
    }

    // Try partial match
    const partialMatch = plans.find(
        (p) => p.displayName.toLowerCase().includes(templateName.toLowerCase()) ||
            templateName.toLowerCase().includes(p.displayName.toLowerCase())
    );

    return partialMatch || null;
}

/**
 * Batch find templates for multiple plans
 */
export async function findTemplatesForPlans(
    plans: Plan[]
): Promise<Map<string, ContractTemplate | null>> {
    const templateMap = new Map<string, ContractTemplate | null>();

    // Get all active templates once
    const response = await getContractTemplates({
        status: 'active',
        limit: 100,
    });

    // Match each plan to a template
    for (const plan of plans) {
        const template = response.templates.find(
            (t) => t.name.toLowerCase() === plan.displayName.toLowerCase()
        );

        templateMap.set(plan._id, template || null);
    }

    return templateMap;
}

/**
 * Get template categories suitable for a plan type
 */
export function getCategoriesForPlanType(planType: string): string[] {
    const categoryMap: Record<string, string[]> = {
        'subscription': ['subscription_agreement', 'service_agreement'],
        'mentorship': ['consulting_agreement', 'service_agreement', 'mentorship_agreement'],
        'script': ['license_agreement', 'service_agreement', 'software_license'],
        'addon': ['service_agreement', 'addon_agreement'],
        'investment': ['investment_agreement', 'advisory_agreement'],
    };

    return categoryMap[planType.toLowerCase()] || ['service_agreement'];
}

/**
 * Validate if template is suitable for plan
 */
export function validateTemplateForPlan(
    template: ContractTemplate,
    plan: Plan
): {
    isValid: boolean;
    reason?: string;
    confidence: 'high' | 'medium' | 'low';
} {
    // Check name match
    const nameMatch = template.name.toLowerCase() === plan.displayName.toLowerCase();
    if (nameMatch) {
        return { isValid: true, confidence: 'high' };
    }

    // Check partial name match
    const partialMatch =
        template.name.toLowerCase().includes(plan.displayName.toLowerCase()) ||
        plan.displayName.toLowerCase().includes(template.name.toLowerCase());

    if (partialMatch) {
        return { isValid: true, confidence: 'medium' };
    }

    // Check category compatibility
    const suitableCategories = getCategoriesForPlanType(plan.planType);
    const categoryMatch = suitableCategories.includes(template.category);

    if (categoryMatch) {
        return {
            isValid: true,
            confidence: 'low',
            reason: 'Matched by category, but name does not match plan',
        };
    }

    return {
        isValid: false,
        confidence: 'low',
        reason: 'No suitable match found - create a template named exactly as the plan',
    };
}

/**
 * Generate placeholder values for a plan
 */
export function generatePlaceholdersForPlan(
    plan: Plan,
    user: {
        id?: string;
        fullName: string;
        email: string;
        phone?: string;
        address?: {
            line1?: string;
            city?: string;
            state?: string;
            postalCode?: string;
            country?: string;
        };
    },
    subscription?: {
        id?: string;
        billingCycle: 'monthly' | 'yearly';
        startDate?: string;
        endDate?: string;
    }
): Record<string, any> {
    return {
        // Customer Information
        customerName: user.fullName,
        customerEmail: user.email,
        customerPhone: user.phone || '',
        customerAddress: {
            line1: user.address?.line1 || '',
            line2: '',
            city: user.address?.city || '',
            state: user.address?.state || '',
            postalCode: user.address?.postalCode || '',
            country: user.address?.country || 'United States',
        },

        // Product/Plan Information
        productName: plan.displayName,
        productType: plan.planType,
        planId: plan._id,
        amount: plan.price,
        subscriptionType: subscription?.billingCycle || 'monthly',

        // Dates
        contractDate: new Date().toISOString().split('T')[0],
        signatureDate: new Date().toISOString().split('T')[0],
        subscriptionStartDate: subscription?.startDate || new Date().toISOString().split('T')[0],
        subscriptionEndDate: subscription?.endDate || '',

        // Company Information
        companyName: 'Eagle Investors LLC',
        companyAddress: 'United States',
        companyEmail: 'support@eagle-investors.com',
        companyWebsite: 'https://eagle-investors.com',

        // Subscription Information
        subscriptionId: subscription?.id || '',
        subscriberId: user.id || '',
    };
}

/**
 * Check if plan requires contract
 */
export function doesPlanRequireContract(plan: Plan): boolean {
    // All plans with these types typically require contracts
    const requiresContract = [
        'subscription',
        'mentorship',
        'investment',
        'advisory',
    ];

    return requiresContract.includes(plan.planType.toLowerCase());
}

/**
 * Get contract requirements for plan
 */
export function getContractRequirements(plan: Plan): {
    requiresContract: boolean;
    requiredSignatures: number;
    expirationDays: number;
    categories: string[];
} {
    const requiresContract = doesPlanRequireContract(plan);
    const categories = getCategoriesForPlanType(plan.planType);

    return {
        requiresContract,
        requiredSignatures: 1, // Customer signature
        expirationDays: 30,    // 30 days to sign
        categories,
    };
}
