'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Calculator, Save } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  CreateInvoiceRequest, 
  InvoiceItem, 
  Currency,
  TaxCalculationResponse,
  billingService 
} from '@/lib/services';

export function CreateInvoice() {
  const router = useRouter();
  const pathname = usePathname();

  // Get the current hub base path for navigation
  const getBasePath = () => {
    if (pathname.includes('/hub/diamond/billing')) return '/hub/diamond/billing';
    if (pathname.includes('/hub/infinity/billing')) return '/hub/infinity/billing';
    if (pathname.includes('/hub/basic/billing')) return '/hub/basic/billing';
    if (pathname.includes('/hub/script/billing')) return '/hub/script/billing';
    return '/billing'; // fallback
  };

  const [formData, setFormData] = useState<CreateInvoiceRequest>({
    items: [{ description: '', quantity: 1, unitPrice: 0, totalPrice: 0, taxable: true }],
    currency: 'USD',
    dueDate: '',
    notes: '',
    calculateTax: true,
  });

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [taxCalculation, setTaxCalculation] = useState<TaxCalculationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await billingService.getSupportedCurrencies();
        if (response.success && response.data) {
          setCurrencies(response.data);
        }
      } catch (err) {
        console.error('Error fetching currencies:', err);
      }
    };

    fetchCurrencies();

    // Set default due date (30 days from now)
    const defaultDueDate = new Date();
    defaultDueDate.setDate(defaultDueDate.getDate() + 30);
    setFormData(prev => ({
      ...prev,
      dueDate: defaultDueDate.toISOString().split('T')[0],
    }));
  }, []);

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    // Recalculate total price for this item
    if (field === 'quantity' || field === 'unitPrice') {
      newItems[index].totalPrice = newItems[index].quantity * newItems[index].unitPrice;
    }
    
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, totalPrice: 0, taxable: true }]
    }));
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const calculateTax = async () => {
    try {
      setLoading(true);
      const subtotal = formData.items.reduce((sum, item) => sum + item.totalPrice, 0);
      
      const response = await billingService.calculateTax({
        amount: subtotal,
        currency: formData.currency,
        customerLocation: {
          country: 'US',
          region: 'CA',
          postalCode: '94105'
        },
        items: formData.items,
      });

      if (response.success && response.data) {
        setTaxCalculation(response.data);
      }
    } catch (err) {
      console.error('Error calculating tax:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      const response = await billingService.createInvoice(formData);
      
      if (response.success && response.data) {
        // Success! Redirect to the created invoice
        router.push(`${getBasePath()}/${response.data._id}`);
      } else {
        setError(response.error || 'Failed to create invoice');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const subtotal = formData.items.reduce((sum, item) => sum + item.totalPrice, 0);
  const taxAmount = taxCalculation?.taxAmount || 0;
  const total = subtotal + taxAmount;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Invoice</h1>
        <p className="text-gray-600">Generate a new invoice for your services</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Details</CardTitle>
            <CardDescription>Basic invoice information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.currency} onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name} ({currency.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                placeholder="Add any additional notes or terms..."
                value={formData.notes || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Invoice Items</CardTitle>
                <CardDescription>Add products or services to this invoice</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={addItem}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-end p-4 border border-gray-200 rounded-lg">
                  <div className="col-span-5">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Input
                      placeholder="Service or product description"
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                    <Input
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value) || 1)}
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor={`unitPrice-${index}`}>Unit Price</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <Label>Total</Label>
                    <div className="h-10 flex items-center font-semibold">
                      {formatCurrency(item.totalPrice, formData.currency)}
                    </div>
                  </div>

                  <div className="col-span-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      disabled={formData.items.length === 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Invoice Summary</CardTitle>
                <CardDescription>Review totals and calculate tax</CardDescription>
              </div>
              <Button type="button" variant="outline" onClick={calculateTax} disabled={loading}>
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Tax
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>{formatCurrency(subtotal, formData.currency)}</span>
              </div>
              
              {taxCalculation && (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Tax ({taxCalculation.taxRate}% - {taxCalculation.jurisdiction}):
                    </span>
                    <span>{formatCurrency(taxCalculation.taxAmount, formData.currency)}</span>
                  </div>
                  
                  {taxCalculation.breakdown && Object.keys(taxCalculation.breakdown).length > 0 && (
                    <div className="text-sm text-gray-500 ml-4">
                      {taxCalculation.breakdown.stateTax && (
                        <div className="flex justify-between">
                          <span>State Tax:</span>
                          <span>{formatCurrency(taxCalculation.breakdown.stateTax, formData.currency)}</span>
                        </div>
                      )}
                      {taxCalculation.breakdown.localTax && (
                        <div className="flex justify-between">
                          <span>Local Tax:</span>
                          <span>{formatCurrency(taxCalculation.breakdown.localTax, formData.currency)}</span>
                        </div>
                      )}
                      {taxCalculation.breakdown.federalTax && (
                        <div className="flex justify-between">
                          <span>Federal Tax:</span>
                          <span>{formatCurrency(taxCalculation.breakdown.federalTax, formData.currency)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              
              <Separator />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>{formatCurrency(total, formData.currency)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" disabled={loading}>
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Creating...' : 'Create Invoice'}
          </Button>
        </div>
      </form>
    </div>
  );
}