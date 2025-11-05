/**
 * PDF utilities - Updated for backend without PDF generation
 * These utilities are maintained for backward compatibility but will return empty/default values
 * since the backend no longer generates or stores PDF files.
 */

export interface ContractPDFInfo {
  url: string;
  isCloudinary: boolean;
  downloadName?: string;
}

/**
 * Legacy function - Returns empty URL since backend no longer generates PDFs
 * @deprecated Backend no longer generates PDFs. Use client-side PDF generation instead.
 */
export function getContractPDFUrl(contract: {
  cloudinaryUrl?: string;
  pdfUrl?: string;
  pdfPath?: string;
  productType?: string;
  _id?: string;
}): ContractPDFInfo {
  // Return empty URL since backend no longer generates PDFs
  return {
    url: '',
    isCloudinary: false,
    downloadName: `contract-${contract._id || 'download'}.pdf`,
  };
}

/**
 * Legacy function - No longer downloads PDFs since backend doesn't generate them
 * @deprecated Backend no longer generates PDFs. Use client-side PDF generation instead.
 */
export async function downloadContractPDF(contract: {
  cloudinaryUrl?: string;
  pdfUrl?: string;
  pdfPath?: string;
  productType?: string;
  _id?: string;
}): Promise<void> {
  console.warn('downloadContractPDF is deprecated: Backend no longer generates PDFs. Use client-side PDF generation instead.');
  throw new Error('PDF download not available - backend no longer generates PDFs');
}

/**
 * Legacy function - Always returns false since backend no longer stores PDF URLs
 * @deprecated Backend no longer generates PDFs.
 */
export function hasValidPDFUrl(contract: {
  cloudinaryUrl?: string;
  pdfUrl?: string;
  pdfPath?: string;
}): boolean {
  return false; // Backend no longer stores PDF URLs
}

/**
 * Legacy function - Returns empty string since no PDFs are generated
 * @deprecated Backend no longer generates PDFs.
 */
export function getPDFDisplayUrl(contract: {
  cloudinaryUrl?: string;
  pdfUrl?: string;
  pdfPath?: string;
}): string {
  return ''; // No PDF URLs available
}
