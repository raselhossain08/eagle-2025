// Contract Sending Service - Send contracts from frontend to others
// Enables sharing and signature requests for contracts

// Contract sending service - handles email and sharing functionality

interface ContractSendOptions {
  contractId: string;
  recipients: {
    name: string;
    email: string;
    role: 'signer' | 'viewer' | 'approver';
    message?: string;
  }[];
  subject?: string;
  message?: string;
  dueDate?: string;
  reminderInterval?: number; // days
  requireSignature: boolean;
}

interface ContractSendResponse {
  success: boolean;
  message: string;
  data?: {
    sentCount: number;
    recipients: string[];
    trackingId: string;
  };
  error?: string;
}

class ContractSendingService {
  private readonly apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
  }

  /**
   * Send contract to recipients for signature or review
   */
  async sendContract(options: ContractSendOptions): Promise<ContractSendResponse> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/contracts/${options.contractId}/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({
          recipients: options.recipients,
          subject: options.subject || `Contract Signature Request - ${options.contractId}`,
          message: options.message || 'Please review and sign the attached contract.',
          dueDate: options.dueDate,
          reminderInterval: options.reminderInterval || 3,
          requireSignature: options.requireSignature,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send contract: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log(`Contract sent to ${result.data.sentCount} recipient(s)`);
      }
      
      return result;
    } catch (error) {
      console.error('Send contract error:', error);
      console.error('Failed to send contract');
      return {
        success: false,
        message: 'Failed to send contract',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Send contract via email (simplified version)
   */
  async sendContractByEmail(contractId: string, emails: string[], message?: string): Promise<ContractSendResponse> {
    const recipients = emails.map(email => ({
      name: email.split('@')[0],
      email,
      role: 'signer' as const,
      message
    }));

    return this.sendContract({
      contractId,
      recipients,
      requireSignature: true,
      message
    });
  }

  /**
   * Share contract for view-only access
   */
  async shareContractForReview(contractId: string, emails: string[], message?: string): Promise<ContractSendResponse> {
    const recipients = emails.map(email => ({
      name: email.split('@')[0],
      email,
      role: 'viewer' as const,
      message
    }));

    return this.sendContract({
      contractId,
      recipients,
      requireSignature: false,
      message: message || 'Please review the attached contract.'
    });
  }

  /**
   * Send reminder for pending signatures
   */
  async sendReminder(contractId: string, recipientEmail: string): Promise<ContractSendResponse> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/contracts/${contractId}/remind`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({
          recipientEmail,
          message: 'Reminder: Please complete your signature for the pending contract.'
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send reminder: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Reminder sent successfully');
      }
      
      return result;
    } catch (error) {
      console.error('Send reminder error:', error);
      console.error('Failed to send reminder');
      return {
        success: false,
        message: 'Failed to send reminder',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get contract sharing status and tracking
   */
  async getContractSendingStatus(contractId: string): Promise<{
    success: boolean;
    data?: {
      sent: Array<{
        recipient: string;
        status: 'sent' | 'viewed' | 'signed' | 'declined';
        sentAt: string;
        viewedAt?: string;
        signedAt?: string;
      }>;
      totalSent: number;
      totalSigned: number;
      pendingSignatures: number;
    };
  }> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/contracts/${contractId}/send-status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to get status: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Get sending status error:', error);
      return {
        success: false
      };
    }
  }

  /**
   * Cancel pending signature requests
   */
  async cancelSendingRequest(contractId: string, recipientEmail?: string): Promise<ContractSendResponse> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/contracts/${contractId}/cancel-send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({
          recipientEmail // If provided, cancel only for this recipient
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to cancel: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Signature request cancelled');
      }
      
      return result;
    } catch (error) {
      console.error('Cancel request error:', error);
      console.error('Failed to cancel request');
      return {
        success: false,
        message: 'Failed to cancel request',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate shareable link for contract
   */
  async generateShareableLink(contractId: string, options: {
    expiresIn?: number; // hours
    requiresPassword?: boolean;
    allowDownload?: boolean;
    allowSignature?: boolean;
  } = {}): Promise<{
    success: boolean;
    data?: {
      shareUrl: string;
      expiresAt: string;
      password?: string;
    };
    error?: string;
  }> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/contracts/${contractId}/share-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`,
        },
        body: JSON.stringify({
          expiresIn: options.expiresIn || 72, // 3 days default
          requiresPassword: options.requiresPassword || false,
          allowDownload: options.allowDownload || true,
          allowSignature: options.allowSignature || false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate link: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.success) {
        console.log('Shareable link generated');
      }
      
      return result;
    } catch (error) {
      console.error('Generate link error:', error);
      console.error('Failed to generate shareable link');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get authentication token
   */
  private getAuthToken(): string {
    // For cookie-based auth, this might return empty string
    // Backend will validate using cookies
    return typeof window !== 'undefined' 
      ? localStorage.getItem('auth_token') || ''
      : '';
  }

  /**
   * Validate email addresses
   */
  private validateEmails(emails: string[]): { valid: string[]; invalid: string[] } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid: string[] = [];
    const invalid: string[] = [];

    emails.forEach(email => {
      if (emailRegex.test(email.trim())) {
        valid.push(email.trim());
      } else {
        invalid.push(email.trim());
      }
    });

    return { valid, invalid };
  }

  /**
   * Bulk send contracts to multiple recipients
   */
  async bulkSendContract(contractId: string, emailsList: string, message?: string): Promise<ContractSendResponse> {
    try {
      // Parse email list (comma, semicolon, or newline separated)
      const emails = emailsList
        .split(/[,;\n]/)
        .map(email => email.trim())
        .filter(email => email.length > 0);

      const { valid, invalid } = this.validateEmails(emails);

      if (invalid.length > 0) {
        console.error(`Invalid email addresses: ${invalid.join(', ')}`);
        return {
          success: false,
          message: `Invalid email addresses found: ${invalid.join(', ')}`,
          error: 'validation_error'
        };
      }

      if (valid.length === 0) {
        console.error('No valid email addresses provided');
        return {
          success: false,
          message: 'No valid email addresses provided',
          error: 'no_emails'
        };
      }

      return await this.sendContractByEmail(contractId, valid, message);
    } catch (error) {
      console.error('Bulk send error:', error);
      console.error('Failed to send contracts in bulk');
      return {
        success: false,
        message: 'Failed to send contracts in bulk',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Export singleton instance
export const contractSending = new ContractSendingService();

// Export types
export type { ContractSendOptions, ContractSendResponse };

// Export class for custom implementations
export { ContractSendingService };