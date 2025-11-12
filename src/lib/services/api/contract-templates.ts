import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface ContractTemplateVariable {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'select' | 'textarea' | 'email' | 'phone' | 'currency';
  required: boolean;
  defaultValue?: any;
  options?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
  };
  description?: string;
  placeholder?: string;
  group?: string;
}

export interface ContractTemplate {
  _id: string;
  name: string;
  templateId: string;
  category: string;
  version: {
    major: number;
    minor: number;
    patch: number;
  };
  versionString: string;
  locale: string;
  language: string;
  content: {
    body: string;
    htmlBody?: string;
    header?: string;
    footer?: string;
    variables: ContractTemplateVariable[];
    style: {
      font: {
        family: string;
        size: number;
      };
      margins: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      };
      pageSize: 'A4' | 'Letter' | 'Legal';
      orientation: 'portrait' | 'landscape';
    };
  };
  metadata: {
    title?: string;
    description?: string;
    tags: string[];
    keywords: string[];
    author?: string;
    jurisdiction?: string;
    applicableLaw?: string;
    effectiveDate?: string;
    expiryDate?: string;
  };
  status: 'draft' | 'review' | 'approved' | 'active' | 'deprecated' | 'archived';
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetTemplatesParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  locale?: string;
  search?: string;
}

export interface TemplateRenderRequest {
  variables: Record<string, any>;
  locale?: string;
}

export interface TemplateRenderResponse {
  renderedContent: {
    body: string;
    htmlBody?: string;
    header?: string;
    footer?: string;
  };
  usedVariables: string[];
  missingVariables: string[];
}

/**
 * Get all contract templates
 */
export const getContractTemplates = async (params: GetTemplatesParams = {}): Promise<{
  templates: ContractTemplate[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_URL}/contract-templates?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch contract templates");
  }

  return {
    templates: data.data || [],
    total: data.pagination?.total || 0,
    page: data.pagination?.page || 1,
    totalPages: data.pagination?.totalPages || 1,
  };
};

/**
 * Get all contract templates (PUBLIC - no authentication required)
 * Use this for public-facing pages like checkout
 */
export const getPublicContractTemplates = async (params: GetTemplatesParams = {}): Promise<{
  templates: ContractTemplate[];
  total: number;
  page: number;
  totalPages: number;
}> => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_URL}/contracts/public/templates?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch contract templates");
  }

  return {
    templates: data.data || [],
    total: data.pagination?.total || 0,
    page: data.pagination?.page || 1,
    totalPages: data.pagination?.totalPages || 1,
  };
};

/**
 * Get a specific contract template by ID (Public - no auth required)
 */
export const getContractTemplateById = async (templateId: string): Promise<ContractTemplate> => {
  const response = await fetch(`${API_URL}/contract-templates/${templateId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch contract template");
  }

  return data.data;
};

/**
 * Get a specific contract template by ID (PUBLIC - no authentication required)
 * Use this for public-facing pages like checkout
 */
export const getPublicContractTemplateById = async (templateId: string): Promise<ContractTemplate> => {
  const response = await fetch(`${API_URL}/contracts/public/templates/${templateId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch contract template");
  }

  return data.data;
};

/**
 * Get template categories (Public)
 */
export const getTemplateCategories = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/contract-templates/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch template categories");
  }

  return data.data || [];
};

/**
 * Render a template with variables (Public for viewing/signing)
 */
export const renderTemplate = async (
  templateId: string,
  renderData: TemplateRenderRequest
): Promise<TemplateRenderResponse> => {
  const response = await fetch(`${API_URL}/contract-templates/${templateId}/render`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(renderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to render template");
  }

  return data.data;
};

/**
 * Validate template content and variables
 */
export const validateTemplate = async (templateId: string): Promise<{
  isValid: boolean;
  errors: string[];
  warnings: string[];
}> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contract-templates/${templateId}/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to validate template");
  }

  return data.data;
};

/**
 * Export template
 */
export const exportTemplate = async (templateId: string): Promise<Blob> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contract-templates/${templateId}/export`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to export template");
  }

  return await response.blob();
};

// =============================================================================
// PUBLIC CONTRACT SIGNING API (No Authentication Required)
// =============================================================================

export interface ContractSigner {
  fullName: string;
  email: string;
  phone?: string;
  title?: string;
  company?: string;
}

export interface InitiateContractData {
  templateId: string;
  subscriberId?: string;
  subscriptionId?: string;
  planId?: string;
  language?: string;
  currency?: string;
  placeholderValues: Record<string, any>;
  signers: ContractSigner[];
  expirationDays?: number;
  metadata?: Record<string, any>;
  integrationProvider?: 'native' | 'docusign' | 'adobe_sign' | 'dropbox_sign';
  integrationConfig?: Record<string, any>;
}

export interface SignedContract {
  _id: string;
  id: string;
  contractId: string;
  templateId: string;
  subscriberId?: string;
  subscriptionId?: string;
  planId?: string;
  status: 'draft' | 'sent' | 'partially_signed' | 'fully_signed' | 'completed' | 'declined' | 'expired' | 'voided';
  signers: Array<{
    signerId: string;
    fullName: string;
    email: string;
    status: 'pending' | 'sent' | 'opened' | 'signed' | 'declined' | 'expired';
    signedAt?: string;
    signature?: any;
  }>;
  content: {
    renderedBody: string;
    renderedHtmlBody?: string;
  };
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

/**
 * Initiate contract signing process (Requires auth for admin/user)
 */
export const initiateContractSigning = async (
  contractData: InitiateContractData
): Promise<{
  success: boolean;
  contractId: string;
  signingUrl: string;
  contract: SignedContract;
}> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contracts/initiate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(contractData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to initiate contract signing");
  }

  return data;
};

/**
 * Get contract for signing (Public - no auth required)
 */
export const getContractForSigning = async (
  contractId: string,
  signerId: string,
  token: string
): Promise<SignedContract> => {
  const response = await fetch(
    `${API_URL}/contracts/sign/${contractId}?signerId=${signerId}&token=${token}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get contract for signing");
  }

  return data.data;
};

/**
 * Start signing session (Public - tracks evidence)
 */
export const startSigningSession = async (
  contractId: string,
  signerId: string,
  token?: string
): Promise<{ success: boolean; sessionId: string }> => {
  const response = await fetch(`${API_URL}/contracts/${contractId}/sign-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ signerId, token }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to start signing session");
  }

  return data;
};

/**
 * Collect signing evidence (Public - optional but recommended)
 */
export const collectSigningEvidence = async (
  contractId: string,
  signerId: string,
  evidence: {
    mouseMovements?: Array<{ x: number; y: number; timestamp: number }>;
    keystrokePattern?: number[];
    scrollDepth?: number;
    timeOnPage?: number;
    geolocationConsent?: boolean;
    ipAddress?: string;
    userAgent?: string;
  }
): Promise<{ success: boolean }> => {
  const response = await fetch(`${API_URL}/contracts/${contractId}/evidence`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ signerId, ...evidence }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to collect signing evidence");
  }

  return data;
};

/**
 * Submit signature (Public - completes signing)
 */
export const submitSignature = async (
  contractId: string,
  signerId: string,
  signatureData: {
    signature: {
      type: 'typed' | 'drawn' | 'uploaded';
      data: string;
      coordinates?: Array<{ x: number; y: number }>;
    };
    consents: Array<{
      consentId: string;
      label: string;
      accepted: boolean;
    }>;
    identityVerification?: {
      method?: 'email' | 'sms' | 'id_document' | 'selfie';
      verified?: boolean;
    };
  }
): Promise<{
  success: boolean;
  contract: SignedContract;
  message: string;
}> => {
  const response = await fetch(`${API_URL}/contracts/${contractId}/signatures`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ signerId, ...signatureData }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to submit signature");
  }

  return data;
};

/**
 * Get all contracts (Requires auth)
 */
export const getAllContracts = async (params: {
  page?: number;
  limit?: number;
  subscriberId?: string;
  templateId?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
} = {}): Promise<{
  contracts: SignedContract[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalContracts: number;
    limit: number;
  };
  statistics: {
    total: number;
    draft: number;
    sent: number;
    signed: number;
    completed: number;
  };
}> => {
  const token = Cookies.get("token");

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });

  const response = await fetch(`${API_URL}/contracts/all?${searchParams.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch contracts");
  }

  return data.data;
};

/**
 * Get contract by ID (Requires auth or valid signing token)
 */
export const getContractById = async (contractId: string): Promise<SignedContract> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contracts/${contractId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch contract");
  }

  return data.data;
};

/**
 * Download contract certificate (Public if completed)
 */
export const downloadContractCertificate = async (contractId: string): Promise<Blob> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contracts/${contractId}/certificate`, {
    method: "GET",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to download certificate");
  }

  return await response.blob();
};

/**
 * Verify evidence integrity (Public verification)
 */
export const verifyEvidenceIntegrity = async (
  contractId: string,
  hash: string
): Promise<{
  isValid: boolean;
  contract: SignedContract;
  timestamp: string;
}> => {
  const response = await fetch(`${API_URL}/contracts/${contractId}/verify/${hash}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to verify evidence integrity");
  }

  return data.data;
};