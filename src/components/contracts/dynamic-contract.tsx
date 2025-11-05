"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Download, Eye, Edit, Calendar, User, MapPin } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { 
  getContractTemplates, 
  getContractTemplateById, 
  renderTemplate,
  type ContractTemplate,
  type ContractTemplateVariable 
} from '@/lib/services/api/contract-templates';

interface DynamicContractProps {
  templateId?: string;
  category?: string;
  variables?: Record<string, any>;
  preview?: boolean;
  onContractReady?: (renderedContent: any) => void;
  className?: string;
}

interface RenderedContract {
  template: ContractTemplate;
  renderedContent: {
    body: string;
    htmlBody?: string;
    header?: string;
    footer?: string;
  };
  usedVariables: string[];
  missingVariables: string[];
}

export const DynamicContract: React.FC<DynamicContractProps> = ({
  templateId,
  category,
  variables = {},
  preview = false,
  onContractReady,
  className = "",
}) => {
  const [contract, setContract] = useState<RenderedContract | null>(null);
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  // Load templates based on category or all templates
  useEffect(() => {
    loadTemplates();
  }, [category]);

  // Render contract when templateId and variables change
  useEffect(() => {
    if (templateId && Object.keys(variables).length > 0) {
      renderContract(templateId, variables);
    }
  }, [templateId, variables]);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const response = await getContractTemplates({
        category,
        status: 'active',
        limit: 50,
      });
      
      setTemplates(response.templates);
      
      // If templateId is provided, set it as selected
      if (templateId) {
        setSelectedTemplate(templateId);
      } else if (response.templates.length > 0) {
        // Select first template as default
        setSelectedTemplate(response.templates[0].templateId);
      }
    } catch (error: any) {
      console.error('Error loading templates:', error);
      setError(error.message || 'Failed to load contract templates');
      toast.error('Failed to load contract templates');
    } finally {
      setLoading(false);
    }
  };

  const renderContract = async (templateId: string, contractVariables: Record<string, any>) => {
    try {
      setLoading(true);
      setError("");

      // Get template details
      const template = await getContractTemplateById(templateId);
      
      // Render template with variables
      const renderResponse = await renderTemplate(templateId, {
        variables: contractVariables,
        locale: template.locale || 'en-US',
      });

      const renderedContract: RenderedContract = {
        template,
        renderedContent: renderResponse.renderedContent,
        usedVariables: renderResponse.usedVariables,
        missingVariables: renderResponse.missingVariables,
      };

      setContract(renderedContract);
      
      // Notify parent component
      if (onContractReady) {
        onContractReady(renderedContract);
      }

      // Show warnings for missing variables
      if (renderResponse.missingVariables.length > 0) {
        toast.error(`Missing variables: ${renderResponse.missingVariables.join(', ')}`);
      }

    } catch (error: any) {
      console.error('Error rendering contract:', error);
      setError(error.message || 'Failed to render contract');
      toast.error('Failed to render contract');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateChange = (newTemplateId: string) => {
    setSelectedTemplate(newTemplateId);
    if (Object.keys(variables).length > 0) {
      renderContract(newTemplateId, variables);
    }
  };

  const formatVariableValue = (variable: ContractTemplateVariable, value: any) => {
    if (!value) return '';

    switch (variable.type) {
      case 'date':
        return new Date(value).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(parseFloat(value) || 0);
      case 'phone':
        return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      case 'email':
        return value.toLowerCase();
      default:
        return value.toString();
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`border-red-200 bg-red-50 ${className}`}>
        <CardContent className="pt-6">
          <div className="text-center">
            <FileText className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Contract</h3>
            <p className="text-red-700">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!contract) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Contract Selected</h3>
            <p className="text-gray-600 mb-4">
              {templates.length > 0 
                ? 'Select a template and provide variables to generate contract'
                : 'No contract templates available'
              }
            </p>
            
            {templates.length > 0 && (
              <div className="space-y-4">
                <select
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select a template...</option>
                  {templates.map((template) => (
                    <option key={template._id} value={template.templateId}>
                      {template.name} ({template.category})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  const { template, renderedContent, usedVariables, missingVariables } = contract;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Contract Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {template.metadata.title || template.name}
              </CardTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>Template: {template.templateId}</span>
                <span>Version: {template.versionString}</span>
                <Badge 
                  variant={template.status === 'active' ? 'default' : 'secondary'}
                  className="capitalize"
                >
                  {template.status}
                </Badge>
              </div>
            </div>
            
            {!preview && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {/* Variables Status */}
          {(usedVariables.length > 0 || missingVariables.length > 0) && (
            <div className="mb-6 space-y-2">
              <div className="flex items-center gap-4">
                {usedVariables.length > 0 && (
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    ✅ {usedVariables.length} Variables Applied
                  </Badge>
                )}
                {missingVariables.length > 0 && (
                  <Badge variant="destructive">
                    ⚠️ {missingVariables.length} Missing Variables
                  </Badge>
                )}
              </div>
              
              {missingVariables.length > 0 && (
                <div className="text-sm text-red-600">
                  Missing: {missingVariables.join(', ')}
                </div>
              )}
            </div>
          )}

          {/* Contract Content */}
          <div className="space-y-6">
            {/* Header */}
            {renderedContent.header && (
              <div className="border-b pb-4">
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderedContent.header }}
                />
              </div>
            )}

            {/* Main Body */}
            <div className="contract-body">
              {renderedContent.htmlBody ? (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderedContent.htmlBody }}
                />
              ) : (
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {renderedContent.body}
                </div>
              )}
            </div>

            {/* Footer */}
            {renderedContent.footer && (
              <div className="border-t pt-4">
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderedContent.footer }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Template Metadata */}
      {template.metadata && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Contract Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {template.metadata.author && (
                <div className="space-y-1">
                  <p className="font-medium text-gray-600 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    Author
                  </p>
                  <p>{template.metadata.author}</p>
                </div>
              )}
              
              {template.metadata.jurisdiction && (
                <div className="space-y-1">
                  <p className="font-medium text-gray-600 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Jurisdiction
                  </p>
                  <p>{template.metadata.jurisdiction}</p>
                </div>
              )}
              
              {template.metadata.effectiveDate && (
                <div className="space-y-1">
                  <p className="font-medium text-gray-600 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Effective Date
                  </p>
                  <p>{new Date(template.metadata.effectiveDate).toLocaleDateString()}</p>
                </div>
              )}
              
              <div className="space-y-1">
                <p className="font-medium text-gray-600">Language</p>
                <p>{template.language || template.locale}</p>
              </div>
            </div>
            
            {template.metadata.description && (
              <div className="pt-3 border-t">
                <p className="font-medium text-gray-600 mb-1">Description</p>
                <p className="text-sm text-gray-700">{template.metadata.description}</p>
              </div>
            )}
            
            {template.metadata.tags.length > 0 && (
              <div className="pt-3 border-t">
                <p className="font-medium text-gray-600 mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {template.metadata.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DynamicContract;