"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { DynamicContract } from './dynamic-contract';
import { 
  getContractTemplates, 
  getTemplateCategories,
  type ContractTemplate 
} from '@/lib/services/api/contract-templates';

interface SmartContractSelectorProps {
  productType?: string;
  defaultVariables?: Record<string, any>;
  onContractSelected?: (template: ContractTemplate, variables: Record<string, any>) => void;
  onContractRendered?: (renderedContract: any) => void;
  className?: string;
}

interface ContractVariableInput {
  name: string;
  label: string;
  type: string;
  required: boolean;
  value: any;
  options?: string[];
  validation?: any;
  placeholder?: string;
}

export const SmartContractSelector: React.FC<SmartContractSelectorProps> = ({
  productType,
  defaultVariables = {},
  onContractSelected,
  onContractRendered,
  className = "",
}) => {
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [variables, setVariables] = useState<Record<string, any>>(defaultVariables);
  const [variableInputs, setVariableInputs] = useState<ContractVariableInput[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [showVariables, setShowVariables] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Auto-select template based on productType
  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (productType && templates.length > 0) {
      autoSelectTemplate();
    }
  }, [productType, templates]);

  useEffect(() => {
    if (selectedTemplate) {
      setupVariableInputs();
      if (onContractSelected) {
        onContractSelected(selectedTemplate, variables);
      }
    }
  }, [selectedTemplate]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      
      // Load templates and categories concurrently
      const [templatesResponse, categoriesResponse] = await Promise.all([
        getContractTemplates({ 
          status: 'active',
          limit: 50 
        }),
        getTemplateCategories()
      ]);
      
      setTemplates(templatesResponse.templates);
      setCategories(categoriesResponse);
      
    } catch (error: any) {
      console.error('Error loading initial data:', error);
      toast.error('Failed to load contract templates');
    } finally {
      setLoading(false);
    }
  };

  const autoSelectTemplate = () => {
    if (!productType) return;

    // Map productTypes to template categories/IDs
    const productTypeMapping: Record<string, string[]> = {
      'diamond-advisory': ['advisory_agreement', 'investment_agreement'],
      'infinity-membership': ['subscription_agreement', 'service_agreement'],
      'basic-package': ['service_agreement', 'subscription_agreement'],
      'script-access': ['license_agreement', 'service_agreement'],
      'trading-tutor': ['education_agreement', 'consulting_agreement'],
      'investment-advisory': ['advisory_agreement', 'investment_agreement'],
      'ultimate-package': ['subscription_agreement', 'advisory_agreement'],
    };

    const possibleCategories = productTypeMapping[productType] || [];
    
    // Find best matching template
    const matchingTemplate = templates.find(template => 
      possibleCategories.includes(template.category) ||
      template.templateId.toLowerCase().includes(productType.toLowerCase()) ||
      template.name.toLowerCase().includes(productType.toLowerCase())
    );

    if (matchingTemplate) {
      setSelectedTemplate(matchingTemplate);
      setSelectedCategory(matchingTemplate.category);
    } else {
      // Fallback to first template
      if (templates.length > 0) {
        setSelectedTemplate(templates[0]);
      }
    }
  };

  const setupVariableInputs = () => {
    if (!selectedTemplate) return;

    const inputs: ContractVariableInput[] = selectedTemplate.content.variables.map(variable => ({
      name: variable.name,
      label: variable.label,
      type: variable.type,
      required: variable.required,
      value: variables[variable.name] || variable.defaultValue || '',
      options: variable.options,
      validation: variable.validation,
      placeholder: variable.placeholder,
    }));

    setVariableInputs(inputs);
  };

  const handleVariableChange = (variableName: string, value: any) => {
    const newVariables = { ...variables, [variableName]: value };
    setVariables(newVariables);

    // Update variable inputs
    setVariableInputs(prev => prev.map(input => 
      input.name === variableName ? { ...input, value } : input
    ));
  };

  const handleTemplateSelect = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    
    // Reset variables for new template
    const newVariables = { ...defaultVariables };
    setVariables(newVariables);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = !searchTerm || 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.templateId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const renderVariableInput = (input: ContractVariableInput) => {
    const { name, label, type, required, value, options, validation, placeholder } = input;

    switch (type) {
      case 'select':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="flex items-center gap-1">
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <select
              id={name}
              value={value}
              onChange={(e) => handleVariableChange(name, e.target.value)}
              className="w-full p-2 border rounded-md"
              required={required}
            >
              <option value="">Select {label.toLowerCase()}...</option>
              {options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        );
        
      case 'textarea':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="flex items-center gap-1">
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <textarea
              id={name}
              value={value}
              onChange={(e) => handleVariableChange(name, e.target.value)}
              placeholder={placeholder}
              className="w-full p-2 border rounded-md min-h-[80px]"
              required={required}
              minLength={validation?.minLength}
              maxLength={validation?.maxLength}
            />
          </div>
        );
        
      case 'boolean':
        return (
          <div key={name} className="flex items-center space-x-2">
            <input
              id={name}
              type="checkbox"
              checked={value}
              onChange={(e) => handleVariableChange(name, e.target.checked)}
              className="rounded"
            />
            <Label htmlFor={name} className="flex items-center gap-1">
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
          </div>
        );
        
      case 'date':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="flex items-center gap-1">
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={name}
              type="date"
              value={value}
              onChange={(e) => handleVariableChange(name, e.target.value)}
              required={required}
            />
          </div>
        );
        
      case 'number':
      case 'currency':
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="flex items-center gap-1">
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={name}
              type="number"
              value={value}
              onChange={(e) => handleVariableChange(name, parseFloat(e.target.value) || '')}
              placeholder={placeholder}
              required={required}
              min={validation?.min}
              max={validation?.max}
              step={type === 'currency' ? '0.01' : '1'}
            />
          </div>
        );
        
      default:
        return (
          <div key={name} className="space-y-2">
            <Label htmlFor={name} className="flex items-center gap-1">
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={name}
              type={type === 'email' ? 'email' : type === 'phone' ? 'tel' : 'text'}
              value={value}
              onChange={(e) => handleVariableChange(name, e.target.value)}
              placeholder={placeholder}
              required={required}
              minLength={validation?.minLength}
              maxLength={validation?.maxLength}
              pattern={validation?.pattern}
            />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Contract Template Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Search Templates</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, ID, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Category</Label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <Card 
                key={template._id}
                className={`cursor-pointer transition-colors ${
                  selectedTemplate?._id === template._id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                      >
                        v{template.versionString}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-gray-600">
                      ID: {template.templateId}
                    </p>
                    
                    <Badge variant="secondary" className="text-xs">
                      {template.category.replace('_', ' ')}
                    </Badge>
                    
                    {template.metadata.description && (
                      <p className="text-xs text-gray-700 line-clamp-2">
                        {template.metadata.description}
                      </p>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      {template.content.variables.length} variable(s)
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No templates found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Variable Configuration */}
      {selectedTemplate && variableInputs.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Contract Variables
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowVariables(!showVariables)}
              >
                {showVariables ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardHeader>
          
          {showVariables && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {variableInputs.map(renderVariableInput)}
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{variableInputs.filter(v => v.required).length}</span> required variables,{' '}
                  <span className="font-medium">{variableInputs.filter(v => !v.required).length}</span> optional
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Dynamic Contract Preview */}
      {selectedTemplate && Object.keys(variables).length > 0 && (
        <DynamicContract
          templateId={selectedTemplate.templateId}
          variables={variables}
          preview={true}
          onContractReady={onContractRendered}
        />
      )}
    </div>
  );
};

export default SmartContractSelector;