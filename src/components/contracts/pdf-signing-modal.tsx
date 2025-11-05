"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, FileText, Pen, CreditCard } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PayPalPayment } from "@/components/paypal-payment";
import { signContract, type SignedContractData } from "@/lib/services/api/contracts";

interface PDFSigningModalProps {
  isOpen: boolean;
  onClose: () => void;
  productType: string;
  productName: string;
  onPaymentSuccess?: (paymentData: any) => void;
}

export interface SignedDocument {
  name: string;
  email: string;
  signature: string;
  date: string;
  productType: string;
  pdfPath: string;
}

const PDF_CONTRACTS = {
  basic: "/PDF/Script Advisory Contract (1).pdf",
  diamond: "/PDF/Diamond Advisory Contract (2).pdf",
  infinity: "/PDF/Infinity Advisory Contract (1).pdf",
  script: "/PDF/Script Advisory Contract (1).pdf",
  "investment-advising": "/PDF/Investment Advising Advisory Contract.pdf",
  "trading-tutor": "/PDF/Trading Tutor Advisory Contract (1).pdf",
  ultimate: "/PDF/Ultimate Advisory Contract (2).pdf",
};

const PRODUCT_PRICING = {
  basic: { price: "99.00", name: "Basic Package" },
  script: { price: "199.00", name: "Script Package" },
  diamond: { price: "499.00", name: "Diamond Package" },
  infinity: { price: "999.00", name: "Infinity Package" },
  "investment-advising": { price: "799.00", name: "Investment Advising" },
  "trading-tutor": { price: "299.00", name: "Trading Tutor" },
  ultimate: { price: "1999.00", name: "Ultimate Advisory" },
};

export function PDFSigningModal({
  isOpen,
  onClose,
  productType,
  productName,
  onPaymentSuccess,
}: PDFSigningModalProps) {
  const [step, setStep] = useState<"pdf" | "sign" | "payment">("pdf");
  const [signedData, setSignedData] = useState<Partial<SignedDocument>>({});
  const [signature, setSignature] = useState("");
  const [contractId, setContractId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pdfPath =
    PDF_CONTRACTS[productType as keyof typeof PDF_CONTRACTS] ||
    PDF_CONTRACTS.basic;
  
  // Use the static PDF path for contract display
  const effectivePdfPath = pdfPath;
  
  const productInfo =
    PRODUCT_PRICING[productType as keyof typeof PRODUCT_PRICING] ||
    PRODUCT_PRICING.basic;

  const handleSignSubmit = async () => {
    if (!signedData.name || !signedData.email || !signature) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const contractData: SignedContractData = {
        name: signedData.name!,
        email: signedData.email!,
        signature,
        productType,
        subscriptionType: "yearly", // Default to yearly for PDF contracts
      };

      const result = await signContract(contractData);
      setContractId(result._id);
      setStep("payment");

      toast({
        title: "Contract Signed",
        description:
          "Your contract has been signed successfully. Please proceed with payment.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign contract",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    toast({
      title: "Purchase Complete!",
      description: `Your ${productInfo.name} subscription is now active.`,
    });

    if (onPaymentSuccess) {
      onPaymentSuccess(paymentData);
    }

    resetModal();
    onClose();
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  const resetModal = () => {
    setStep("pdf");
    setSignedData({});
    setSignature("");
    setContractId("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-brand-bg-dark border-brand-border">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            {step === "pdf" && <FileText className="w-5 h-5" />}
            {step === "sign" && <Pen className="w-5 h-5" />}
            {step === "payment" && <CreditCard className="w-5 h-5" />}

            {step === "pdf" && "Review Advisory Contract"}
            {step === "sign" && "Sign Contract"}
            {step === "payment" && "Complete Payment"}
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-2 ${
                step === "pdf"
                  ? "text-brand-primary"
                  : step === "sign" || step === "payment"
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "pdf"
                    ? "bg-brand-primary"
                    : step === "sign" || step === "payment"
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                {step === "sign" || step === "payment" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  "1"
                )}
              </div>
              <span className="text-sm font-medium">Review</span>
            </div>

            <div className="w-8 h-0.5 bg-gray-600"></div>

            <div
              className={`flex items-center space-x-2 ${
                step === "sign"
                  ? "text-brand-primary"
                  : step === "payment"
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "sign"
                    ? "bg-brand-primary"
                    : step === "payment"
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`}
              >
                {step === "payment" ? <CheckCircle className="w-5 h-5" /> : "2"}
              </div>
              <span className="text-sm font-medium">Sign</span>
            </div>

            <div className="w-8 h-0.5 bg-gray-600"></div>

            <div
              className={`flex items-center space-x-2 ${
                step === "payment" ? "text-brand-primary" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "payment" ? "bg-brand-primary" : "bg-gray-600"
                }`}
              >
                3
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {step === "pdf" && (
          <div className="space-y-4">
            <Card className="bg-brand-bg-light border-brand-border">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Advisory Contract - {productType.toUpperCase()}
                  </h3>
                  <p className="text-gray-400">
                    Please review the contract terms before proceeding
                  </p>
                </div>

                {/* PDF Viewer */}
                <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={effectivePdfPath}
                    width="100%"
                    height="100%"
                    title="Advisory Contract"
                    className="border-0"
                  />
                </div>

                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    📋 Please read through the entire contract carefully. By
                    proceeding, you acknowledge that you have read and agree to
                    the terms and conditions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "sign" && (
          <div className="space-y-6">
            <Card className="bg-brand-bg-light border-brand-border">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Digital Signature Required
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={signedData.name || ""}
                      onChange={(e) =>
                        setSignedData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      placeholder="Enter your full name"
                      className="bg-brand-bg-dark border-brand-border text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={signedData.email || ""}
                      onChange={(e) =>
                        setSignedData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Enter your email"
                      className="bg-brand-bg-dark border-brand-border text-white"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Label htmlFor="signature" className="text-white">
                    Digital Signature *
                  </Label>
                  <Input
                    id="signature"
                    value={signature}
                    onChange={(e) => setSignature(e.target.value)}
                    placeholder="Type your full name as digital signature"
                    className="bg-brand-bg-dark border-brand-border text-white"
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    By typing your name above, you are providing your legal
                    digital signature
                  </p>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-blue-400 text-sm">
                    ✍️ This digital signature has the same legal effect as a
                    handwritten signature. Please ensure all information is
                    accurate.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-6">
            <PayPalPayment
              contractId={contractId}
              amount={productInfo.price}
              productName={productInfo.name}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
          </div>
        )}

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              if (step === "pdf") {
                resetModal();
                onClose();
              } else if (step === "sign") {
                setStep("pdf");
              } else {
                setStep("sign");
              }
            }}
            className="border-brand-border text-white hover:bg-brand-bg-dark"
            disabled={isSubmitting}
          >
            {step === "pdf" ? "Cancel" : "Back"}
          </Button>

          {step !== "payment" && (
            <Button
              onClick={() => {
                if (step === "pdf") {
                  setStep("sign");
                } else if (step === "sign") {
                  handleSignSubmit();
                }
              }}
              className="bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white"
              disabled={isSubmitting}
            >
              {step === "pdf" && "I Agree - Continue to Sign"}
              {step === "sign" &&
                (isSubmitting ? "Signing..." : "Sign Contract")}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
