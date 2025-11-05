// Dashboard Signature Integration Service
// Connects frontend contracts to dashboard signature workflow

interface DashboardSignatureService {
  openSignatureWorkflow(contractId: string): void;
  openAuditTrail(contractId: string): void;
  openContractInDashboard(contractId: string): void;
  createSimilarContract(templateType: string): void;
  initiateSignatureProcess(contractId: string): void;
}

interface SignatureStatus {
  isSigned: boolean;
  signedDate?: string;
  signatoryName?: string;
  method: 'electronic' | 'wet_signature';
  auditTrailAvailable: boolean;
  witnessRequired: boolean;
  notaryRequired: boolean;
}

class DashboardSignatureIntegration implements DashboardSignatureService {
  private readonly dashboardBaseUrl: string;

  constructor() {
    this.dashboardBaseUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || '/dashboard';
  }

  /**
   * Open signature workflow dialog in dashboard
   */
  openSignatureWorkflow(contractId: string): void {
    const url = `${this.dashboardBaseUrl}/contracts?signature=${contractId}`;
    this.openInNewTab(url);
  }

  /**
   * View complete signature audit trail
   */
  openAuditTrail(contractId: string): void {
    const url = `${this.dashboardBaseUrl}/contracts?audit=${contractId}`;
    this.openInNewTab(url);
  }

  /**
   * Open contract details in dashboard
   */
  openContractInDashboard(contractId: string): void {
    const url = `${this.dashboardBaseUrl}/contracts/${contractId}`;
    this.openInNewTab(url);
  }

  /**
   * Create new contract with similar template
   */
  createSimilarContract(templateType: string): void {
    const url = `${this.dashboardBaseUrl}/contracts/create?template=${templateType}`;
    this.openInNewTab(url);
  }

  /**
   * Initiate signature process for unsigned contract
   */
  initiateSignatureProcess(contractId: string): void {
    const url = `${this.dashboardBaseUrl}/contracts?sign=${contractId}`;
    this.openInNewTab(url);
  }

  /**
   * Get signature status for display
   */
  getSignatureStatus(contract: any): SignatureStatus {
    return {
      isSigned: !!contract.signature,
      signedDate: contract.signedDate,
      signatoryName: contract.name,
      method: 'electronic',
      auditTrailAvailable: !!contract.signature,
      witnessRequired: false, // Can be determined from contract metadata
      notaryRequired: false,  // Can be determined from contract metadata
    };
  }

  /**
   * Check if dashboard signature features are available
   */
  isSignatureAvailable(): boolean {
    return !!this.dashboardBaseUrl && this.dashboardBaseUrl !== '/dashboard';
  }

  /**
   * Get dashboard signature capabilities
   */
  getSignatureCapabilities() {
    return {
      electronicSignature: true,
      multiPartySignature: true,
      witnessSupport: true,
      notarySupport: true,
      auditTrail: true,
      geolocationTracking: true,
      deviceFingerprinting: true,
      legalCompliance: true,
      pdfGeneration: true,
      signatureReminders: true,
    };
  }

  /**
   * Validate signature requirements
   */
  validateSignatureRequirements(contract: any): {
    canSign: boolean;
    requirements: string[];
    warnings: string[];
  } {
    const requirements: string[] = [];
    const warnings: string[] = [];
    let canSign = true;

    // Check if contract is already signed
    if (contract.signature) {
      canSign = false;
      warnings.push('Contract is already signed');
    }

    // Check contract status
    if (contract.status === 'cancelled') {
      canSign = false;
      requirements.push('Contract is cancelled and cannot be signed');
    }

    // Check if payment is required before signing
    if (contract.amount && !contract.paymentStatus) {
      warnings.push('Payment may be required before signature completion');
    }

    return { canSign, requirements, warnings };
  }

  /**
   * Generate signature workflow URL with parameters
   */
  generateSignatureUrl(contractId: string, options: {
    partyType?: 'primary' | 'secondary' | 'additional';
    partyIndex?: number;
    requireWitness?: boolean;
    requireNotary?: boolean;
    returnUrl?: string;
  } = {}): string {
    const params = new URLSearchParams({
      signature: contractId,
      ...options.partyType && { party: options.partyType },
      ...options.partyIndex !== undefined && { index: options.partyIndex.toString() },
      ...options.requireWitness && { witness: 'true' },
      ...options.requireNotary && { notary: 'true' },
      ...options.returnUrl && { return: options.returnUrl },
    });

    return `${this.dashboardBaseUrl}/contracts?${params.toString()}`;
  }

  /**
   * Private helper to open URL in new tab
   */
  private openInNewTab(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Export singleton instance
export const dashboardSignature = new DashboardSignatureIntegration();

// Export types for TypeScript support
export type { SignatureStatus, DashboardSignatureService };

// Export class for custom implementations
export { DashboardSignatureIntegration };

// Utility functions for components
export const SignatureUtils = {
  /**
   * Get signature status badge properties
   */
  getStatusBadge(contract: any) {
    const status = dashboardSignature.getSignatureStatus(contract);
    
    if (status.isSigned) {
      return {
        variant: 'default' as const,
        className: 'bg-green-500',
        text: 'Signed',
        icon: '✓'
      };
    }
    
    return {
      variant: 'secondary' as const,
      className: 'bg-yellow-500/10 text-yellow-600',
      text: 'Pending Signature',
      icon: '⏳'
    };
  },

  /**
   * Check if contract can be signed
   */
  canSign(contract: any): boolean {
    const validation = dashboardSignature.validateSignatureRequirements(contract);
    return validation.canSign;
  },

  /**
   * Format signature date for display
   */
  formatSignatureDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  /**
   * Get signature method display text
   */
  getSignatureMethodText(method: string): string {
    switch (method) {
      case 'electronic':
        return 'Electronic Signature';
      case 'wet_signature':
        return 'Wet Signature';
      default:
        return 'Unknown Method';
    }
  }
};