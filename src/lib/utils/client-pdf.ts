/**
 * Client-side PDF generation utilities using jsPDF
 * This replaces backend PDF generation with frontend PDF generation
 */

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface ClientContractPDFData {
  name: string;
  email: string;
  signature: string; // Base64 image string
  productType: string;
  productName: string;
  price: string;
  date: Date;
  subscriptionType?: 'monthly' | 'yearly';
}

/**
 * Generate a contract PDF on the client side
 * @param contractData Contract data for PDF generation
 * @returns Promise<string> Base64 PDF string
 */
export async function generateClientContractPDF(
  contractData: ClientContractPDFData
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);
      
      // Set up fonts and styling
      pdf.setFont('helvetica');
      
      // Title
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${getPackageDisplayName(contractData.productType)} Membership Agreement`, pageWidth / 2, 30, { align: 'center' });
      
      // Date
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const formattedDate = contractData.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      pdf.text(`Date: ${formattedDate}`, pageWidth - margin, 50, { align: 'right' });
      
      // Parties
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('BETWEEN:', margin, 70);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Eagle Investors ("Provider")', margin, 80);
      pdf.text(`AND: ${contractData.name} ("Client")`, margin, 90);
      
      // Services Section
      let yPos = 110;
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('1. SERVICES', margin, yPos);
      yPos += 15;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const servicesText = getServicesText(contractData.productType);
      const splitServices = pdf.splitTextToSize(servicesText, contentWidth);
      pdf.text(splitServices, margin, yPos);
      yPos += splitServices.length * 5 + 10;
      
      // Payment Section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('2. TERM & PAYMENT', margin, yPos);
      yPos += 15;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const paymentText = `The Client agrees to pay $${contractData.price} on a ${contractData.subscriptionType || 'monthly'} basis. The membership will continue until cancelled by either party.`;
      const splitPayment = pdf.splitTextToSize(paymentText, contentWidth);
      pdf.text(splitPayment, margin, yPos);
      yPos += splitPayment.length * 5 + 15;
      
      // Confidentiality Section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('3. CONFIDENTIALITY', margin, yPos);
      yPos += 15;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const confidentialityText = `The Client agrees not to share, distribute, or resell any content or materials provided as part of the ${getPackageDisplayName(contractData.productType)} membership.`;
      const splitConfidentiality = pdf.splitTextToSize(confidentialityText, contentWidth);
      pdf.text(splitConfidentiality, margin, yPos);
      yPos += splitConfidentiality.length * 5 + 15;
      
      // Disclaimer Section
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('4. DISCLAIMER', margin, yPos);
      yPos += 15;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      const disclaimerText = 'All investment and trading decisions are the responsibility of the Client. Eagle Investors does not guarantee any specific results or returns. Trading involves risk and past performance is not indicative of future results.';
      const splitDisclaimer = pdf.splitTextToSize(disclaimerText, contentWidth);
      pdf.text(splitDisclaimer, margin, yPos);
      yPos += splitDisclaimer.length * 5 + 20;
      
      // Signature Section
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Client Signature:', margin, yPos);
      yPos += 10;
      
      // Add signature if available
      if (contractData.signature) {
        try {
          // Add signature image (assuming it's a base64 image)
          pdf.addImage(contractData.signature, 'PNG', margin, yPos, 60, 20);
        } catch (error) {
          console.warn('Could not add signature image:', error);
          // Fallback to text
          pdf.setFont('helvetica', 'italic');
          pdf.text('[Digital Signature]', margin, yPos + 10);
        }
      }
      yPos += 30;
      
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(contractData.name, margin, yPos);
      pdf.text(`Date: ${formattedDate}`, margin, yPos + 10);
      
      // Convert to base64
      const pdfBase64 = pdf.output('datauristring');
      resolve(pdfBase64);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(error);
    }
  });
}

/**
 * Generate PDF from HTML element using html2canvas
 * @param element HTML element to convert to PDF
 * @param filename Optional filename for the PDF
 * @returns Promise<string> Base64 PDF string
 */
export async function generatePDFFromHTML(
  element: HTMLElement,
  filename?: string
): Promise<string> {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    return pdf.output('datauristring');
  } catch (error) {
    console.error('Error generating PDF from HTML:', error);
    throw new Error('Failed to generate PDF from HTML');
  }
}

/**
 * Download a base64 PDF string as a file
 * @param pdfBase64 Base64 PDF string
 * @param filename Filename for the download
 */
export function downloadPDFBase64(pdfBase64: string, filename: string): void {
  try {
    const link = document.createElement('a');
    link.href = pdfBase64;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw new Error('Failed to download PDF');
  }
}

/**
 * Get display name for package type
 */
function getPackageDisplayName(productType: string): string {
  switch (productType.toLowerCase()) {
    case 'diamond':
      return 'Diamond';
    case 'infinity':
      return 'Infinity';
    case 'basic':
    case 'basic-subscription':
      return 'Basic';
    case 'trading-tutor':
      return 'Trading Tutor';
    case 'eagle-ultimate':
    case 'ultimate':
      return 'Ultimate';
    case 'investment-advising':
      return 'Investment Advising';
    case 'script':
      return 'Script';
    case 'academy':
      return 'Academy';
    default:
      return productType.charAt(0).toUpperCase() + productType.slice(1);
  }
}

/**
 * Get services text based on product type
 */
function getServicesText(productType: string): string {
  switch (productType.toLowerCase()) {
    case 'diamond':
      return 'Eagle Investors agrees to provide the Client with access to the Diamond membership package including: Premium trading signals and alerts, Advanced market analysis tools, Educational resources and training materials, Priority customer support, Access to members-only webinars and events.';
    case 'infinity':
      return 'Eagle Investors agrees to provide the Client with access to the Infinity membership package including: Standard trading signals and alerts, Basic market analysis tools, Educational resources, Regular customer support.';
    case 'academy':
      return 'Eagle Investors agrees to provide the Client with access to the Academy membership package including: Educational courses and materials, Trading methodology training, Market analysis techniques, Access to recorded webinars and tutorials.';
    case 'basic':
    case 'basic-subscription':
      return 'Eagle Investors agrees to provide the Client with access to the Basic membership package including basic trading resources and educational materials.';
    default:
      return `Eagle Investors agrees to provide the Client with access to the ${getPackageDisplayName(productType)} membership package.`;
  }
}
