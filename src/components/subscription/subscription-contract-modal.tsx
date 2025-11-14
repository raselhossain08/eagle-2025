"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  FileText,
  Pen,
  CreditCard,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PaymentMethodSelector } from "@/components/payments/payment-method-selector";
import {
  signContract,
  getUserContracts,
  type SignedContractData,
} from "@/lib/services/api/contracts";
import { discountService } from "@/lib/services/api/discount";
import { getPublicPlans, type Plan } from "@/lib/services/api/plan";
import { useAuth } from "@/context/authContext";
import DiamondContract from "@/components/contracts/DiamondContract";
import InfinityContract from "@/components/contracts/InfinityContract";
import BasicContract from "@/components/contracts/BasicContract";
import TradingTutorContract from "@/components/contracts/TradingTutorContract";
import InvestmentAdvisingContract from "@/components/contracts/InvestmentAdvisingContract";
import UltimateContract from "@/components/contracts/UltimateContract";
import SignatureCanvas from "@/components/contracts/signature-canvas";

interface SubscriptionContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriptionType: "monthly" | "yearly";
  packageType: "diamond" | "infinity" | "basic" | string;
  onPaymentSuccess?: (paymentData: any) => void;
  upgradeMode?: boolean;
}

interface SignatureData {
  name: string;
  email: string;
  phone: string;
  country: string;
  streetAddress: string;
  flatSuiteUnit: string;
  townCity: string;
  stateCounty: string;
  postcodeZip: string;
  discordUsername: string;
  signature: string;
}

interface PaymentData {
  paymentMethod: "stripe" | "paypal";
  amount: number;
  subscriptionType: "monthly" | "yearly";
}

type Step = "review" | "contract" | "signature" | "payment" | "complete";

const steps = [
  { id: 1, title: "Review Package", icon: ShoppingCart, key: "review" },
  { id: 2, title: "Sign Contract", icon: FileText, key: "contract" },
  { id: 3, title: "Contact Info", icon: Pen, key: "signature" },
  { id: 4, title: "Payment", icon: CreditCard, key: "payment" },
  { id: 5, title: "Complete", icon: Sparkles, key: "complete" },
];

function SubscriptionContractModal({
  isOpen,
  onClose,
  subscriptionType,
  packageType,
  onPaymentSuccess,
  upgradeMode = false,
}: SubscriptionContractModalProps) {
  const router = useRouter();
  const { refreshProfile } = useAuth();

  // Helper function to format product type for backend
  const getProductType = () => {
    const type = packageType.toLowerCase();

    // First check if we have plan details with a category
    if (planDetails && planDetails.category) {
      const category = planDetails.category.toLowerCase();
      // Map plan categories to backend product types
      const categoryMap: { [key: string]: string } = {
        basic: "basic-subscription",
        diamond: "diamond-subscription",
        infinity: "infinity-subscription",
        script: "script",
      };

      if (categoryMap[category]) {
        return categoryMap[category];
      }
    }

    // Fallback: Map frontend package names to backend product types
    const productTypeMap: { [key: string]: string } = {
      diamond: "diamond-subscription",
      "diamond plan": "diamond-subscription",
      infinity: "infinity-subscription",
      "infinity plan": "infinity-subscription",
      basic: "basic-subscription",
      "basic plan": "basic-subscription",
      script: "script",
      "script plan": "script",
      "trading-tutor": "trading-tutor",
      "trading-tutoring": "trading-tutoring",
      "investment-advising": "investment-advising",
      "eagle-ultimate": "eagle-ultimate",
      ultimate: "eagle-ultimate",
    };

    return productTypeMap[type] || type;
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    streetAddress: "",
    flatSuiteUnit: "",
    townCity: "",
    stateCounty: "",
    postcodeZip: "",
    discordUsername: "",
    signature: "",
  });
  const [paymentData, setPaymentData] = useState<PaymentData>({
    paymentMethod: "stripe",
    amount: 0,
    subscriptionType,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [contractId, setContractId] = useState<string>("");
  const [existingContract, setExistingContract] = useState<any>(null);

  // Discount and dynamic pricing state
  const [discountCode, setDiscountCode] = useState("");
  const [isVerifyingDiscount, setIsVerifyingDiscount] = useState(false);
  const [discountInfo, setDiscountInfo] = useState<any>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  // Fetch plans from backend on mount
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadingPlans(true);
        const fetchedPlans = await getPublicPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error("Error fetching plans:", error);
        toast({
          title: "Error",
          description: "Failed to load subscription plans",
          variant: "destructive",
        });
      } finally {
        setLoadingPlans(false);
      }
    };

    if (isOpen) {
      fetchPlans();
    }
  }, [isOpen]);

  // Get plan details from backend
  const getPlanDetails = () => {
    const plan = plans.find(
      (p) =>
        p.name?.toLowerCase() === packageType.toLowerCase() ||
        p.displayName?.toLowerCase() === packageType.toLowerCase()
    );

    if (!plan) return null;

    const pricingData = plan.pricing?.[subscriptionType];
    const currentPrice =
      typeof pricingData === "number" ? pricingData : pricingData?.price || 0;
    const originalPrice =
      typeof pricingData === "object"
        ? pricingData?.originalPrice || currentPrice
        : currentPrice;

    return {
      ...plan,
      currentPrice,
      originalPrice,
    };
  };

  const planDetails = getPlanDetails();

  // Get package price from backend or fallback
  const getPackagePrice = () => {
    if (planDetails) {
      return planDetails.currentPrice;
    }
    // Fallback prices
    const prices = {
      diamond: subscriptionType === "monthly" ? 76 : 760,
      infinity: subscriptionType === "monthly" ? 127 : 1270,
      script: subscriptionType === "monthly" ? 50 : 500,
      basic: subscriptionType === "monthly" ? 0 : 0,
    };
    return prices[packageType as keyof typeof prices] || 76;
  };

  // Calculate discount amount
  const getDiscountAmount = () => {
    if (!discountInfo) return 0;

    const subtotal = getPackagePrice();
    if (discountInfo.discount.type === "percentage") {
      return (subtotal * discountInfo.discount.value) / 100;
    }
    return discountInfo.discount.value;
  };

  // Calculate final price with discount
  const calculateFinalPrice = () => {
    const subtotal = getPackagePrice();
    const discountAmount = getDiscountAmount();
    return Math.max(0, subtotal - discountAmount);
  };

  // Verify discount code
  const handleVerifyDiscount = async () => {
    if (!discountCode) {
      toast({
        title: "No Discount Code",
        description: "Please enter a discount code",
        variant: "destructive",
      });
      return;
    }

    setIsVerifyingDiscount(true);
    try {
      const result = await discountService.verifyDiscountCode({
        code: discountCode,
        orderAmount: getPackagePrice(),
        quantity: 1,
      });

      if (result.valid) {
        setDiscountInfo(result);
        toast({
          title: "Discount Applied!",
          description: `You saved $${result.calculation.discountAmount.toFixed(
            2
          )}`,
        });
      }
    } catch (error: any) {
      console.error("Discount verification error:", error);
      setDiscountInfo(null);
      toast({
        title: "Invalid Discount Code",
        description: error.message || "The discount code is invalid or expired",
        variant: "destructive",
      });
    } finally {
      setIsVerifyingDiscount(false);
    }
  };

  // Remove discount
  const handleRemoveDiscount = () => {
    setDiscountCode("");
    setDiscountInfo(null);
    toast({
      title: "Discount Removed",
      description: "The discount has been removed from your order",
    });
  };

  const resetModal = () => {
    setCurrentStep(1);
    setSignatureData({
      name: "",
      email: "",
      phone: "",
      country: "",
      streetAddress: "",
      flatSuiteUnit: "",
      townCity: "",
      stateCounty: "",
      postcodeZip: "",
      discordUsername: "",
      signature: "",
    });
    setContractId("");
    setExistingContract(null);
    setDiscountCode("");
    setDiscountInfo(null);
  };

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    } else {
      // Check if user already has a contract for this product
      checkExistingContract();
    }
  }, [isOpen]);

  const checkExistingContract = async () => {
    try {
      const contracts = await getUserContracts();
      const productType = getProductType();
      const existing = contracts.find(
        (contract) =>
          contract.productType === productType &&
          contract.status !== "cancelled"
      );

      if (existing) {
        setExistingContract(existing);
        setContractId(existing._id);
        // For existing contracts, skip to payment
        setCurrentStep(4);
      }
    } catch (error) {
      // If there's an error fetching contracts, just proceed normally
      console.log("Could not check existing contracts:", error);
    }
  };

  const handleSignContract = async () => {
    if (
      !signatureData.name ||
      !signatureData.email ||
      !signatureData.signature
    ) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in all required fields and provide a signature.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Store the signed contract (no PDF generation needed)
      const signedContractData: SignedContractData = {
        name: signatureData.name,
        email: signatureData.email,
        phone: signatureData.phone,
        country: signatureData.country,
        streetAddress: signatureData.streetAddress,
        flatSuiteUnit: signatureData.flatSuiteUnit,
        townCity: signatureData.townCity,
        stateCounty: signatureData.stateCounty,
        postcodeZip: signatureData.postcodeZip,
        discordUsername: signatureData.discordUsername,
        signature: signatureData.signature,
        productType: getProductType(),
        subscriptionType,
      };

      const result = await signContract(signedContractData);
      setContractId(result._id);

      if (result.isExisting) {
        toast({
          title: "Existing Contract Found",
          description:
            "Using your existing contract for this package. Proceeding to payment.",
        });
      } else {
        toast({
          title: "Success",
          description: "Contract signed successfully",
        });
      }

      setCurrentStep(4); // Payment step
    } catch (error: any) {
      console.error("Error signing contract:", error);

      // Handle existing contract errors
      if (
        error.message === "Contract already exists for this product" &&
        error.existingContract
      ) {
        setExistingContract(error.existingContract);
        setContractId(error.existingContract._id);

        toast({
          title: "Contract Found",
          description: "Using your existing contract. Proceeding to payment.",
        });
        setCurrentStep(4);
        return;
      }

      // Handle active subscription error
      if (
        error.hasActiveSubscription ||
        error.message ===
          "You already have an active subscription for this product"
      ) {
        toast({
          title: "Active Subscription",
          description:
            "You already have an active subscription for this product.",
          variant: "destructive",
        });
        onClose();
        return;
      }

      toast({
        title: "Error",
        description: error.message || "Failed to sign contract",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (data: any) => {
    console.log("💳 Subscription payment success", {
      packageType,
      subscriptionType,
      originalPrice: getPackagePrice(),
      discountAmount: discountInfo ? getDiscountAmount() : 0,
      finalPrice: discountInfo ? calculateFinalPrice() : getPackagePrice(),
      discountCode: discountInfo ? discountCode : null,
      paymentData: data,
    });

    setCurrentStep(5);

    try {
      // Refresh user profile to get updated subscription
      await refreshProfile();

      // Map package types to their dashboard routes
      const dashboardRoutes: Record<string, string> = {
        diamond: "/hub/diamond",
        infinity: "/hub/infinity/subscription",
        script: "/hub/script/subscription",
        basic: "/hub/basic/subscription",
      };

      const normalizedPackageType = packageType
        .toLowerCase()
        .replace(" plan", "")
        .trim();
      const dashboardRoute =
        dashboardRoutes[normalizedPackageType] || "/dashboard";

      toast({
        title: "Payment Successful!",
        description: `Redirecting to your ${packageType} dashboard...`,
        duration: 2000,
      });

      if (onPaymentSuccess) {
        onPaymentSuccess(data);
      }

      // Redirect to appropriate dashboard after brief delay
      setTimeout(() => {
        router.push(dashboardRoute);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error refreshing profile:", error);

      // Show success message even if profile refresh fails
      toast({
        title: "Payment Successful!",
        description: "Your subscription has been updated.",
        duration: 2000,
      });

      if (onPaymentSuccess) {
        onPaymentSuccess(data);
      }

      // Still redirect even if refresh fails
      const dashboardRoutes: Record<string, string> = {
        diamond: "/hub/diamond",
        infinity: "/hub/infinity/subscription",
        script: "/hub/script/subscription",
        basic: "/hub/basic/subscription",
      };

      const normalizedPackageType = packageType
        .toLowerCase()
        .replace(" plan", "")
        .trim();
      const dashboardRoute =
        dashboardRoutes[normalizedPackageType] || "/dashboard";

      setTimeout(() => {
        router.push(dashboardRoute);
        onClose();
      }, 2000);
    }
  };

  const getContractComponent = () => {
    const contractProps = {
      customerName: signatureData.name || "Customer Name",
      contractDate: new Date().toLocaleDateString(),
      price: `$${paymentData.amount.toString()}`,
    };

    switch (packageType.toLowerCase()) {
      case "diamond":
        return <DiamondContract {...contractProps} />;
      case "infinity":
        return <InfinityContract {...contractProps} />;
      case "basic":
        return <BasicContract {...contractProps} />;
      case "trading-tutor":
      case "trading-tutoring":
        return <TradingTutorContract {...contractProps} />;
      case "investment-advising":
        return <InvestmentAdvisingContract {...contractProps} />;
      case "eagle-ultimate":
      case "ultimate":
        return <UltimateContract {...contractProps} />;
      default:
        return <BasicContract {...contractProps} />;
    }
  };

  const currentStepData = steps.find((step) => step.id === currentStep);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700 text-white">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl text-center text-white">
            {upgradeMode ? "Upgrade to" : "Subscribe to"}{" "}
            {packageType.charAt(0).toUpperCase() + packageType.slice(1)} Plan
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      isCompleted
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white"
                        : isCurrent
                        ? "border-purple-500 text-purple-400 bg-purple-500/10"
                        : "border-slate-600 text-slate-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-2 ${
                        isCompleted
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : "bg-slate-600"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs">
            {steps.map((step) => (
              <span
                key={step.id}
                className={`${
                  currentStep >= step.id ? "text-purple-400" : "text-slate-400"
                } text-center max-w-[80px]`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {currentStepData && (
                <>
                  <currentStepData.icon className="w-6 h-6 text-purple-400" />
                  Step {currentStep}: {currentStepData.title}
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Review Package */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      {packageType.charAt(0).toUpperCase() +
                        packageType.slice(1)}{" "}
                      Subscription
                    </h3>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Premium Package
                    </Badge>
                  </div>

                  <div className="space-y-3 text-slate-300 mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>Premium market analysis and insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>Exclusive investment opportunities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>Advanced trading strategies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>Personalized portfolio recommendations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>24/7 premium support</span>
                    </div>
                  </div>

                  {/* Discount Code Section */}
                  <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                    <Label className="text-slate-300 mb-2 block">
                      Discount Code
                    </Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          type="text"
                          value={discountCode}
                          onChange={(e) =>
                            setDiscountCode(e.target.value.toUpperCase())
                          }
                          placeholder="Enter discount code"
                          disabled={!!discountInfo}
                          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                        />
                        {discountInfo && (
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400">
                            ✓
                          </span>
                        )}
                      </div>
                      {!discountInfo ? (
                        <Button
                          type="button"
                          onClick={handleVerifyDiscount}
                          disabled={!discountCode || isVerifyingDiscount}
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          {isVerifyingDiscount ? "Verifying..." : "Apply"}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={handleRemoveDiscount}
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                    {discountInfo && (
                      <div className="text-sm text-green-400 mt-2">
                        {discountInfo.discount.type === "percentage"
                          ? `${discountInfo.discount.value}% off`
                          : `$${discountInfo.discount.value} off`}{" "}
                        - You save ${getDiscountAmount().toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-slate-600 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Subscription Type:</span>
                      <span className="text-white font-semibold capitalize">
                        {subscriptionType}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-slate-300">Subtotal:</span>
                      <span
                        className={
                          discountInfo
                            ? "line-through text-slate-400"
                            : "text-white"
                        }
                      >
                        ${getPackagePrice().toLocaleString()}
                      </span>
                    </div>
                    {discountInfo && (
                      <>
                        <div className="flex justify-between items-center mt-2 text-green-400">
                          <span className="text-sm">Discount:</span>
                          <span>-${getDiscountAmount().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-600">
                          <span className="text-slate-300">Total:</span>
                          <span className="text-2xl font-bold text-white">
                            ${calculateFinalPrice().toLocaleString()}
                            <span className="text-sm text-slate-400 ml-1">
                              /
                              {subscriptionType === "yearly" ? "year" : "month"}
                            </span>
                          </span>
                        </div>
                      </>
                    )}
                    {!discountInfo && (
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-slate-300">Total:</span>
                        <span className="text-2xl font-bold text-white">
                          ${getPackagePrice().toLocaleString()}
                          <span className="text-sm text-slate-400 ml-1">
                            /{subscriptionType === "yearly" ? "year" : "month"}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(2)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex-1"
                  >
                    Continue to Contract
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Sign Contract */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Contract Agreement
                  </h3>
                  <div className="max-h-64 overflow-y-auto bg-slate-800 p-4 rounded border border-slate-600">
                    {getContractComponent()}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex-1"
                  >
                    I Agree - Continue to Sign
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info & Signature */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Contact Information & Signature
                  </h3>

                  {/* Personal Information */}
                  <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                    <h4 className="text-md font-medium text-purple-300 mb-3">
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-slate-300">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={signatureData.name}
                          onChange={(e) =>
                            setSignatureData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Enter your full name"
                          required
                          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-slate-300">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={signatureData.email}
                          onChange={(e) =>
                            setSignatureData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          placeholder="Enter your email address"
                          required
                          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-slate-300">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={signatureData.phone}
                          onChange={(e) =>
                            setSignatureData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          placeholder="Enter your phone number"
                          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="discordUsername"
                          className="text-slate-300"
                        >
                          Discord Username
                        </Label>
                        <Input
                          id="discordUsername"
                          value={signatureData.discordUsername}
                          onChange={(e) =>
                            setSignatureData((prev) => ({
                              ...prev,
                              discordUsername: e.target.value,
                            }))
                          }
                          placeholder="username#1234"
                          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="bg-slate-800/50 rounded-lg p-4 mb-6">
                    <h4 className="text-md font-medium text-purple-300 mb-3">
                      Address Information
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="country" className="text-slate-300">
                          Country *
                        </Label>
                        <Input
                          id="country"
                          value={signatureData.country}
                          onChange={(e) =>
                            setSignatureData((prev) => ({
                              ...prev,
                              country: e.target.value,
                            }))
                          }
                          placeholder="Enter your country"
                          required
                          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="streetAddress"
                          className="text-slate-300"
                        >
                          Street Address *
                        </Label>
                        <Input
                          id="streetAddress"
                          value={signatureData.streetAddress}
                          onChange={(e) =>
                            setSignatureData((prev) => ({
                              ...prev,
                              streetAddress: e.target.value,
                            }))
                          }
                          placeholder="Enter your street address"
                          required
                          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="flatSuiteUnit"
                          className="text-slate-300"
                        >
                          Flat, Suite, Unit, etc. (Optional)
                        </Label>
                        <Input
                          id="flatSuiteUnit"
                          value={signatureData.flatSuiteUnit}
                          onChange={(e) =>
                            setSignatureData((prev) => ({
                              ...prev,
                              flatSuiteUnit: e.target.value,
                            }))
                          }
                          placeholder="Apartment, suite, unit, building, floor, etc."
                          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="townCity" className="text-slate-300">
                            Town/City *
                          </Label>
                          <Input
                            id="townCity"
                            value={signatureData.townCity}
                            onChange={(e) =>
                              setSignatureData((prev) => ({
                                ...prev,
                                townCity: e.target.value,
                              }))
                            }
                            placeholder="Enter your city"
                            required
                            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor="stateCounty"
                            className="text-slate-300"
                          >
                            State/County *
                          </Label>
                          <Input
                            id="stateCounty"
                            value={signatureData.stateCounty}
                            onChange={(e) =>
                              setSignatureData((prev) => ({
                                ...prev,
                                stateCounty: e.target.value,
                              }))
                            }
                            placeholder="Enter your state or county"
                            required
                            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="postcodeZip" className="text-slate-300">
                          Postcode/Zip *
                        </Label>
                        <Input
                          id="postcodeZip"
                          value={signatureData.postcodeZip}
                          onChange={(e) =>
                            setSignatureData((prev) => ({
                              ...prev,
                              postcodeZip: e.target.value,
                            }))
                          }
                          placeholder="Enter your postal/zip code"
                          required
                          className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-slate-300">
                      Digital Signature *
                    </Label>
                    <div className="mt-2 bg-slate-800 p-2 rounded border border-slate-600">
                      <SignatureCanvas
                        onSignatureChange={(signature) =>
                          setSignatureData((prev) => ({ ...prev, signature }))
                        }
                        width={400}
                        height={200}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSignContract}
                    disabled={
                      isLoading ||
                      !signatureData.name ||
                      !signatureData.email ||
                      !signatureData.signature ||
                      !signatureData.country ||
                      !signatureData.streetAddress ||
                      !signatureData.townCity ||
                      !signatureData.stateCounty ||
                      !signatureData.postcodeZip
                    }
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex-1"
                  >
                    {isLoading
                      ? "Signing Contract..."
                      : "Sign Contract & Continue"}
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <div className="bg-slate-700/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Complete Your Payment
                  </h3>
                  <p className="text-slate-300 mb-4">
                    Complete your payment to activate your {packageType}{" "}
                    subscription.
                  </p>

                  <div className="bg-slate-800 p-4 rounded border border-slate-600 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Package:</span>
                      <span className="text-white font-medium">
                        {packageType.charAt(0).toUpperCase() +
                          packageType.slice(1)}{" "}
                        Subscription
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-slate-300">Billing:</span>
                      <span className="text-white font-medium capitalize">
                        {subscriptionType}
                      </span>
                    </div>
                    {discountInfo && (
                      <>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-slate-300">Subtotal:</span>
                          <span className="text-slate-400 line-through">
                            ${getPackagePrice().toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-2 text-green-400">
                          <span className="text-sm">
                            Discount ({discountCode}):
                          </span>
                          <span>-${getDiscountAmount().toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-600">
                      <span className="text-slate-300 font-semibold">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-white">
                        $
                        {(discountInfo
                          ? calculateFinalPrice()
                          : getPackagePrice()
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <PaymentMethodSelector
                    amount={(discountInfo
                      ? calculateFinalPrice()
                      : getPackagePrice()
                    ).toString()}
                    subscriptionType={subscriptionType}
                    contractId={contractId}
                    productName={`${
                      packageType.charAt(0).toUpperCase() + packageType.slice(1)
                    } Subscription`}
                    onPaymentSuccess={handlePaymentSuccess}
                    discountCode={discountInfo ? discountCode : undefined}
                    discountAmount={
                      discountInfo ? getDiscountAmount() : undefined
                    }
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Step 5: Complete */}
            {currentStep === 5 && (
              <div className="text-center py-12">
                <div className="bg-slate-700/50 rounded-lg p-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Subscription Activated!
                  </h3>
                  <p className="text-slate-300 mb-2 text-lg">
                    Welcome to{" "}
                    {packageType.charAt(0).toUpperCase() + packageType.slice(1)}
                    ! Your subscription is now active.
                  </p>
                  <p className="text-slate-400 text-sm">
                    This window will close automatically in a few seconds...
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

// Export both default and named export for compatibility
export { SubscriptionContractModal };
export default SubscriptionContractModal;
