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
 * Get a specific contract template by ID
 */
export const getContractTemplateById = async (templateId: string): Promise<ContractTemplate> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contract-templates/${templateId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch contract template");
  }

  return data.data;
};

/**
 * Get template categories
 */
export const getTemplateCategories = async (): Promise<string[]> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contract-templates/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch template categories");
  }

  return data.data || [];
};

/**
 * Render a template with variables
 */
export const renderTemplate = async (
  templateId: string,
  renderData: TemplateRenderRequest
): Promise<TemplateRenderResponse> => {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/contract-templates/${templateId}/render`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
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