import { getCookie } from 'cookies-next';

export interface PersonalInfo {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  nationality?: string;
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed' | 'separated' | 'other';
  dependents?: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  type: 'home' | 'work' | 'billing' | 'shipping' | 'other';
  isPrimary?: boolean;
}

export interface ContactInfo {
  primaryPhone?: string;
  alternatePhone?: string;
  addresses?: Address[];
}

export interface Employment {
  employmentStatus?: 'employed' | 'self_employed' | 'unemployed' | 'student' | 'retired' | 'other';
  employer?: string;
  jobTitle?: string;
  industry?: string;
  annualIncome?: {
    amount: number;
    currency: string;
  };
}

export interface FinancialProfile {
  investmentExperience?: 'none' | 'limited' | 'moderate' | 'extensive' | 'professional';
  riskTolerance?: 'conservative' | 'moderate' | 'aggressive' | 'very_aggressive';
  timeHorizon?: 'short_term' | 'medium_term' | 'long_term';
}

export interface CommunicationPreferences {
  preferredLanguage?: string;
  timezone?: string;
  emailNotifications?: {
    marketing: boolean;
    transactional: boolean;
    security: boolean;
    newsletter: boolean;
    promotions: boolean;
  };
}

export interface PrivacyPreferences {
  profileVisibility?: 'private' | 'contacts_only' | 'public';
  dataSharing?: {
    analytics: boolean;
    marketing: boolean;
    thirdParty: boolean;
  };
}

export interface IdentityDocument {
  type: 'passport' | 'drivers_license' | 'national_id' | 'ssn_last4' | 'tax_id' | 'other';
  number?: string;
  issuingCountry?: string;
  issuingState?: string;
  issueDate?: string;
  expiryDate?: string;
  isVerified?: boolean;
  verifiedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
}

export interface KycStatus {
  status: 'not_started' | 'in_progress' | 'completed' | 'rejected' | 'expired';
  level: 'none' | 'basic' | 'intermediate' | 'full';
  completedSteps?: string[];
  rejectionReasons?: string[];
  completedAt?: string;
  expiryDate?: string;
}

export interface ComplianceData {
  amlStatus?: 'not_checked' | 'cleared' | 'flagged' | 'under_review';
  sanctionsStatus?: 'not_checked' | 'cleared' | 'flagged' | 'under_review';
  pepStatus?: 'not_checked' | 'cleared' | 'flagged' | 'under_review';
  riskScore?: number;
  lastComplianceCheck?: string;
  watchlistMatches?: Array<{
    list: string;
    matchScore: number;
    details: string;
  }>;
}

export interface ProfileCompletion {
  percentage: number;
  completedSections: string[];
  missingFields: Array<{
    field: string;
    section: string;
    importance: 'required' | 'recommended' | 'optional';
  }>;
}

export interface SubscriberProfile {
  _id?: string;
  userId?: string;
  personalInfo?: PersonalInfo;
  contactInfo?: ContactInfo;
  employment?: Employment;
  financialProfile?: FinancialProfile;
  communicationPreferences?: CommunicationPreferences;
  privacyPreferences?: PrivacyPreferences;
  tradingPreferences?: any;
  identityDocuments?: IdentityDocument[];
  kycStatus?: KycStatus;
  compliance?: ComplianceData;
  profileCompletion?: ProfileCompletion;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateIdentityDocumentData {
  type: 'passport' | 'drivers_license' | 'national_id' | 'ssn_last4' | 'tax_id' | 'other';
  number: string;
  issuingCountry?: string;
  issuingState?: string;
  issueDate?: string;
  expiryDate?: string;
}

export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class SubscriberProfileService {
  private baseUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/subscriber-profiles`;

  private async makeRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      const token = getCookie('token');
      
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data || data };
    } catch (error) {
      console.error(`API Error (${endpoint}):`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  // Get user's own profile
  async getMyProfile(): Promise<APIResponse<SubscriberProfile>> {
    return this.makeRequest('/my-profile');
  }

  // Update user's own profile
  async updateMyProfile(data: Partial<SubscriberProfile>): Promise<APIResponse<SubscriberProfile>> {
    return this.makeRequest('/my-profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Upload identity document with file
  async uploadDocument(file: File, documentType: string, description?: string): Promise<APIResponse<any>> {
    try {
      const token = getCookie('token');
      const formData = new FormData();
      formData.append('document', file);
      formData.append('documentType', documentType);
      if (description) formData.append('description', description);

      const response = await fetch(`${this.baseUrl}/upload-document`, {
        method: 'POST',
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
        throw new Error(errorData.message || `Upload failed with status ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data: data.data || data };
    } catch (error) {
      console.error('Document upload error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      };
    }
  }

  // Get user's uploaded documents
  async getMyDocuments(): Promise<APIResponse<any[]>> {
    return this.makeRequest('/documents');
  }

  // Get secure document URL
  async getDocumentUrl(documentId: string): Promise<APIResponse<{ url: string; expiresIn: number }>> {
    return this.makeRequest(`/documents/${documentId}/url`);
  }

  // Delete uploaded document
  async deleteDocument(documentId: string): Promise<APIResponse<any>> {
    return this.makeRequest(`/documents/${documentId}`, {
      method: 'DELETE',
    });
  }

  // Add identity document to user's profile
  async addIdentityDocument(data: CreateIdentityDocumentData): Promise<APIResponse<SubscriberProfile>> {
    return this.makeRequest('/identity-documents', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Complete KYC step
  async completeKycStep(step: string): Promise<APIResponse<SubscriberProfile>> {
    return this.makeRequest('/kyc/complete-step', {
      method: 'POST',
      body: JSON.stringify({ step }),
    });
  }

  // Export user's profile data
  async exportMyProfile(): Promise<APIResponse<any>> {
    return this.makeRequest('/my-profile/export');
  }

  // Utility functions for UI formatting
  formatKycStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'not_started': 'Not Started',
      'in_progress': 'In Progress',
      'completed': 'Completed',
      'rejected': 'Rejected',
      'expired': 'Expired'
    };
    return statusMap[status] || status;
  }

  formatKycLevel(level: string): string {
    const levelMap: Record<string, string> = {
      'none': 'None',
      'basic': 'Basic',
      'intermediate': 'Intermediate',
      'full': 'Full'
    };
    return levelMap[level] || level;
  }

  getKycStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
      'not_started': 'bg-gray-100 text-gray-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'rejected': 'bg-red-100 text-red-800',
      'expired': 'bg-orange-100 text-orange-800'
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  }

  getKycLevelColor(level: string): string {
    const colorMap: Record<string, string> = {
      'none': 'bg-gray-100 text-gray-800',
      'basic': 'bg-blue-100 text-blue-800',
      'intermediate': 'bg-purple-100 text-purple-800',
      'full': 'bg-green-100 text-green-800'
    };
    return colorMap[level] || 'bg-gray-100 text-gray-800';
  }

  formatAddress(address: Address): string {
    const parts = [address.street, address.city, address.state, address.postalCode];
    return parts.filter(Boolean).join(', ');
  }

  calculateProfileCompletion(profile: SubscriberProfile): number {
    if (profile.profileCompletion?.percentage) {
      return profile.profileCompletion.percentage;
    }

    let completedFields = 0;
    let totalFields = 0;

    // Personal Info (weight: 30%)
    const personalFields = ['firstName', 'lastName', 'dateOfBirth'];
    personalFields.forEach(field => {
      totalFields++;
      if (profile.personalInfo?.[field as keyof PersonalInfo]) completedFields++;
    });

    // Contact Info (weight: 25%)
    totalFields++;
    if (profile.contactInfo?.primaryPhone) completedFields++;
    
    totalFields++;
    if (profile.contactInfo?.addresses?.length) completedFields++;

    // Employment (weight: 20%)
    totalFields++;
    if (profile.employment?.employmentStatus) completedFields++;

    // Financial Profile (weight: 15%)
    totalFields++;
    if (profile.financialProfile?.investmentExperience) completedFields++;

    // Identity Documents (weight: 10%)
    totalFields++;
    if (profile.identityDocuments?.length) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  }
}

export const subscriberProfileService = new SubscriberProfileService();
export default subscriberProfileService;
