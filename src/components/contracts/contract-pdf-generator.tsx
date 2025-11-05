"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { 
  generateClientContractPDF, 
  downloadPDFBase64,
  type ClientContractPDFData 
} from '@/lib/utils/client-pdf';
import type { SignedContract } from '@/lib/api/contracts';

interface ContractPDFGeneratorProps {
  contract: SignedContract;
  className?: string;
}

/**
 * Optional component for generating contract PDFs on the client side
 * This allows users to generate and download PDFs if they need them
 */
export function ContractPDFGenerator({ contract, className }: ContractPDFGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    try {
      setIsGenerating(true);
      
      const contractData: ClientContractPDFData = {
        name: contract.name,
        email: contract.email,
        signature: contract.signature,
        productType: contract.productType,
        productName: contract.productName || `${contract.productType} Subscription`,
        price: contract.amount?.toString() || "0",
        date: new Date(contract.signedDate),
        subscriptionType: contract.subscriptionType,
      };

      const pdfBase64 = await generateClientContractPDF(contractData);
      const filename = `${contract.productType}-contract-${contract._id}.pdf`;
      
      downloadPDFBase64(pdfBase64, filename);
      
      toast({
        title: "PDF Generated",
        description: "Your contract PDF has been downloaded successfully.",
      });
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Contract PDF
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">
          Generate and download a PDF copy of your signed contract. This PDF is created 
          locally in your browser and contains all your contract details.
        </p>
        <Button 
          onClick={handleGeneratePDF} 
          disabled={isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Generate & Download PDF
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
