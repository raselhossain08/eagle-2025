"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast";
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";
import {
  getContractTemplates,
  initiateContractSigning,
  getContractForSigning,
  startSigningSession,
  submitSignature,
  collectSigningEvidence,
  type ContractTemplate,
  type SignedContract,
} from "@/lib/services/api/contract-templates";

/**
 * Complete Contract Signing Flow Example
 *
 * This component demonstrates:
 * 1. Finding the right template for a subscription plan
 * 2. Initiating contract signing
 * 3. Displaying contract to user
 * 4. Collecting signature
 * 5. Submitting signed contract
 */

interface ContractSigningFlowProps {
  // Subscription/Plan details
  planId: string;
  planName: string; // e.g., "Diamond", "Basic", "Infinity"
  planPrice: number;
  billingCycle: "monthly" | "yearly";

  // User details
  userId?: string;
  userEmail: string;
  userFullName: string;
  userPhone?: string;

  // Callbacks
  onSigningComplete?: (contract: SignedContract) => void;
  onSigningError?: (error: Error) => void;
}

export function ContractSigningFlowExample({
  planId,
  planName,
  planPrice,
  billingCycle,
  userId,
  userEmail,
  userFullName,
  userPhone,
  onSigningComplete,
  onSigningError,
}: ContractSigningFlowProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState<ContractTemplate | null>(null);
  const [contract, setContract] = useState<SignedContract | null>(null);
  const [signatureData, setSignatureData] = useState<string>("");
  const [consents, setConsents] = useState({
    terms: false,
    privacy: false,
    electronic: false,
  });

  // Step 1: Find matching template on mount
  useEffect(() => {
    findMatchingTemplate();
  }, [planName]);

  const findMatchingTemplate = async () => {
    try {
      setLoading(true);

      // Search for template by plan name
      const response = await getContractTemplates({
        status: "active",
        search: planName, // Search by plan name
        limit: 10,
      });

      // Find exact match (case-insensitive)
      const matchingTemplate = response.templates.find(
        (t) => t.name.toLowerCase() === planName.toLowerCase()
      );

      if (matchingTemplate) {
        setTemplate(matchingTemplate);
        console.log(
          `✅ Found matching template: ${matchingTemplate.name} (${matchingTemplate.templateId})`
        );
      } else {
        // Try category-based fallback
        const categoryMap: Record<string, string> = {
          diamond: "investment_agreement",
          infinity: "subscription_agreement",
          basic: "service_agreement",
        };

        const category = categoryMap[planName.toLowerCase()];
        if (category) {
          const categoryTemplates = response.templates.filter(
            (t) => t.category === category
          );
          if (categoryTemplates.length > 0) {
            setTemplate(categoryTemplates[0]);
            console.log(
              `⚠️ Using category fallback template: ${categoryTemplates[0].name}`
            );
          }
        }
      }

      if (!template) {
        toast.error(`No contract template found for ${planName} plan`);
      }
    } catch (error) {
      console.error("Error finding template:", error);
      toast.error("Failed to load contract template");
      onSigningError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Initiate contract signing
  const handleInitiateContract = async () => {
    if (!template) {
      toast.error("No template available");
      return;
    }

    try {
      setLoading(true);

      // Prepare placeholder values for template variables
      const placeholderValues = {
        customerName: userFullName,
        customerEmail: userEmail,
        customerPhone: userPhone || "",
        productName: planName,
        productType: planId,
        amount: planPrice,
        subscriptionType: billingCycle,
        contractDate: new Date().toISOString().split("T")[0],
        signatureDate: new Date().toISOString().split("T")[0],
        companyName: "Eagle Investors LLC",
        companyAddress: "United States",
        companyEmail: "support@eagle-investors.com",
      };

      // Initiate contract signing
      const result = await initiateContractSigning({
        templateId: template.templateId || template._id,
        subscriberId: userId,
        planId: planId,
        language: "en",
        currency: "USD",
        placeholderValues,
        signers: [
          {
            fullName: userFullName,
            email: userEmail,
            phone: userPhone,
            title: "Subscriber",
          },
        ],
        expirationDays: 30,
        integrationProvider: "native",
      });

      setContract(result.contract);
      toast.success("Contract prepared successfully");

      // Start signing session for evidence tracking
      if (result.contract.signers[0]) {
        await startSigningSession(
          result.contractId,
          result.contract.signers[0].signerId
        );
      }
    } catch (error) {
      console.error("Error initiating contract:", error);
      toast.error("Failed to prepare contract");
      onSigningError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Handle signature submission
  const handleSubmitSignature = async () => {
    if (!contract || !signatureData) {
      toast.error("Please provide your signature");
      return;
    }

    if (!consents.terms || !consents.privacy || !consents.electronic) {
      toast.error("Please accept all required consents");
      return;
    }

    try {
      setLoading(true);

      const signer = contract.signers[0];
      if (!signer) {
        throw new Error("No signer found");
      }

      // Collect evidence (optional but recommended)
      await collectSigningEvidence(contract.contractId, signer.signerId, {
        timeOnPage:
          Date.now() - (window.performance.timing?.navigationStart || 0),
        scrollDepth:
          (window.scrollY / document.documentElement.scrollHeight) * 100,
        geolocationConsent: false,
        userAgent: navigator.userAgent,
      });

      // Submit signature
      const result = await submitSignature(
        contract.contractId,
        signer.signerId,
        {
          signature: {
            type: "drawn",
            data: signatureData,
          },
          consents: [
            {
              consentId: "terms",
              label: "Terms of Service",
              accepted: consents.terms,
            },
            {
              consentId: "privacy",
              label: "Privacy Policy",
              accepted: consents.privacy,
            },
            {
              consentId: "electronic",
              label: "Electronic Signature Consent",
              accepted: consents.electronic,
            },
          ],
        }
      );

      toast.success(result.message || "Contract signed successfully!");
      onSigningComplete?.(result.contract);
    } catch (error) {
      console.error("Error submitting signature:", error);
      toast.error("Failed to submit signature");
      onSigningError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Render loading state
  if (loading && !template && !contract) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Clock className="w-8 h-8 animate-spin mr-2" />
          <p>Loading contract...</p>
        </CardContent>
      </Card>
    );
  }

  // Render no template found
  if (!loading && !template) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            Contract Template Not Found
          </CardTitle>
          <CardDescription>
            No contract template is configured for the {planName} plan. Please
            contact support.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Render template found, ready to initiate
  if (template && !contract) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Contract Agreement Required
          </CardTitle>
          <CardDescription>
            Review and sign the {planName} service agreement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Template:</span>
              <Badge>{template.name}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Plan:</span>
              <span>{planName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Price:</span>
              <span>
                ${planPrice}/{billingCycle}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Subscriber:</span>
              <span>{userFullName}</span>
            </div>
          </div>

          <Button
            onClick={handleInitiateContract}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Preparing Contract..." : "Continue to Contract"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Render contract ready for signing
  if (contract) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Sign Contract Agreement
          </CardTitle>
          <CardDescription>
            Please review and sign the contract below
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contract Content Preview */}
          <div className="bg-muted p-6 rounded-lg max-h-96 overflow-y-auto">
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{
                __html:
                  contract.content?.renderedHtmlBody ||
                  contract.content?.renderedBody ||
                  "",
              }}
            />
          </div>

          {/* Signature Input */}
          <div className="space-y-2">
            <Label htmlFor="signature">Your Signature</Label>
            <Input
              id="signature"
              placeholder="Type your full name"
              value={signatureData}
              onChange={(e) => setSignatureData(e.target.value)}
              className="font-serif text-2xl"
            />
            <p className="text-xs text-muted-foreground">
              By typing your name, you agree to sign this document
              electronically
            </p>
          </div>

          {/* Consents */}
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={consents.terms}
                onCheckedChange={(checked) =>
                  setConsents({ ...consents, terms: checked as boolean })
                }
              />
              <label
                htmlFor="terms"
                className="text-sm leading-tight cursor-pointer"
              >
                I agree to the Terms of Service
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="privacy"
                checked={consents.privacy}
                onCheckedChange={(checked) =>
                  setConsents({ ...consents, privacy: checked as boolean })
                }
              />
              <label
                htmlFor="privacy"
                className="text-sm leading-tight cursor-pointer"
              >
                I agree to the Privacy Policy
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="electronic"
                checked={consents.electronic}
                onCheckedChange={(checked) =>
                  setConsents({ ...consents, electronic: checked as boolean })
                }
              />
              <label
                htmlFor="electronic"
                className="text-sm leading-tight cursor-pointer"
              >
                I consent to use electronic signatures
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmitSignature}
            disabled={
              loading ||
              !signatureData ||
              !consents.terms ||
              !consents.privacy ||
              !consents.electronic
            }
            className="w-full"
            size="lg"
          >
            {loading ? (
              "Submitting..."
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Sign Contract
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
}
