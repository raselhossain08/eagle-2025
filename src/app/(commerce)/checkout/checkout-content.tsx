"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle,
  CreditCard,
  FileText,
  User,
  ShoppingCart,
  Sparkles,
  Pen,
  Loader2,
} from "lucide-react";
import { PaymentMethodSelector } from "@/components/payments/payment-method-selector";
import SignatureCanvas from "@/components/contracts/signature-canvas";
import DiscountSection from "@/components/checkout/discount-section";
import { toast } from "@/hooks/use-toast";
import {
  signContract,
  updatePaymentStatus,
  getUserContracts,
  createContractWithContact,
  type CreateContractWithContactData,
} from "@/lib/services/api/contracts";
import {
  getPublicContractTemplates,
  type ContractTemplate,
} from "@/lib/services/api/contract-templates";
import {
  createTransaction,
  type TransactionData,
} from "@/lib/services/api/transactions";
import { useAuth } from "@/context/authContext";
import { mockUser } from "@/lib/data";
import DiamondContract from "@/components/contracts/DiamondContract";
import InfinityContract from "@/components/contracts/InfinityContract";
import BasicContract from "@/components/contracts/BasicContract";
import ScriptContract from "@/components/contracts/ScriptContract";
import TradingTutorContract from "@/components/contracts/TradingTutorContract";
import UltimateContract from "@/components/contracts/UltimateContract";
import InvestmentAdvisingContract from "@/components/contracts/InvestmentAdvisingContract";

interface CartItem {
  id: string;
  name: string;
  price: string | number;
  memberPrice?: string | number;
  quantity?: number;
  type?: string;
  description?: string;
  features?: string[];
  originalPrice?: number;
  savings?: number;
}

const steps = [
  { id: 1, title: "Review Order", icon: ShoppingCart },
  { id: 2, title: "Sign Contract", icon: FileText },
  { id: 3, title: "Contact Info", icon: User },
  { id: 4, title: "Payment", icon: CreditCard },
  { id: 5, title: "Complete", icon: Sparkles },
];

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  // State management
  const [currentStep, setCurrentStep] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [contractId, setContractId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [contractTemplate, setContractTemplate] =
    useState<ContractTemplate | null>(null);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false);

  // Discount state
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string>("");
  const [appliedDiscountAmount, setAppliedDiscountAmount] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  // Load discount from localStorage on mount
  useEffect(() => {
    const savedDiscount = localStorage.getItem("checkout_discount");
    if (savedDiscount) {
      try {
        const discount = JSON.parse(savedDiscount);
        console.log("📦 Loading saved discount from localStorage:", discount);

        // Directly set all discount states
        if (discount.code && discount.amount && discount.total) {
          setAppliedDiscountCode(discount.code);
          setAppliedDiscountAmount(discount.amount);
          setDiscountedTotal(discount.total);
          console.log("✅ Discount states restored:", {
            code: discount.code,
            amount: discount.amount,
            total: discount.total,
          });
        }
      } catch (error) {
        console.error("Error loading saved discount:", error);
      }
    }
  }, []);

  // Debug currentStep changes
  useEffect(() => {
    console.log("📍 Current Step Changed:", currentStep);
  }, [currentStep]);

  // Debug discount state changes
  useEffect(() => {
    console.log("🎫 Discount State Changed:", {
      appliedDiscountCode,
      appliedDiscountAmount,
      discountedTotal,
      currentStep,
    });

    // Also log what getTotalPrice would return
    if (cartItems.length > 0) {
      const totalPrice = getTotalPrice(useMemberPrice);
      console.log("💰 Current Total Price:", totalPrice);
    }
  }, [
    appliedDiscountCode,
    appliedDiscountAmount,
    discountedTotal,
    currentStep,
  ]);

  // Fetch contract template when reaching step 2 (Sign Contract)
  useEffect(() => {
    if (currentStep === 2 && !contractTemplate) {
      fetchContractTemplate();
    }
  }, [currentStep]);

  // Function to fetch contract template from backend
  const fetchContractTemplate = async () => {
    try {
      setIsLoadingTemplate(true);
      console.log("🔍 Fetching contract templates from backend...");

      const productType = getProductType();
      console.log("📦 Product Type:", productType);

      // Map product type to category for template search
      let category = "mentorship"; // default category

      if (
        productType.includes("subscription") ||
        productType.includes("diamond") ||
        productType.includes("infinity") ||
        productType.includes("basic")
      ) {
        category = "subscription";
      } else if (productType.includes("script")) {
        category = "script";
      } else if (productType.includes("investment-advising")) {
        category = "advisory";
      } else if (productType.includes("trading-tutor")) {
        category = "trading";
      } else if (productType.includes("ultimate")) {
        category = "premium";
      }

      console.log("🏷️ Template Category:", category);

      // Fetch templates - try with category first (using public API - no auth required)
      const response = await getPublicContractTemplates({
        category,
        status: "active",
        limit: 1,
      });

      console.log("📄 Template Response:", response);

      if (response.templates && response.templates.length > 0) {
        const template = response.templates[0];
        setContractTemplate(template);
        console.log("✅ Contract template loaded:", template.name);
        toast({
          title: "Contract Template Loaded",
          description: `Using template: ${template.name}`,
        });
      } else {
        console.log("⚠️ No template found, falling back to default component");
        // No template found - will use default hardcoded components
        setContractTemplate(null);
      }
    } catch (error) {
      console.error("❌ Error fetching contract template:", error);
      // On error, fall back to default hardcoded components
      setContractTemplate(null);
    } finally {
      setIsLoadingTemplate(false);
    }
  };

  const [formData, setFormData] = useState({
    contactInfo: {
      name: mockUser.name || "",
      email: mockUser.email || "",
      phone: "",
      company: "",
      country: "",
      streetAddress: "",
      flatSuiteUnit: "",
      townCity: "",
      stateCounty: "",
      postcodeZip: "",
      discordUsername: "",
    },
    contractAccepted: false,
    paymentMethod: "card",
  });

  const [signatureData, setSignatureData] = useState({
    customerName: mockUser.name || "",
    customerEmail: mockUser.email || "",
    signature: "",
  });

  // Ensure contactInfo and signatureData are in sync
  useEffect(() => {
    if (user) {
      // Set form data based on available user information
      setFormData((prev) => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          // Use mockUser as fallback since the user object might not have name/email
          name: mockUser.name || prev.contactInfo.name,
          email: mockUser.email || prev.contactInfo.email,
        },
      }));

      setSignatureData((prev) => ({
        ...prev,
        customerName: mockUser.name || prev.customerName,
        customerEmail: mockUser.email || prev.customerEmail,
      }));
    }
  }, [user]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateContactInfo = (field: string, value: string) => {
    console.log("📝 Updating contact info", { field, value });
    setFormData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }));

    // Keep signature data in sync with contact info
    if (field === "name") {
      setSignatureData((prev) => ({
        ...prev,
        customerName: value,
      }));
    } else if (field === "email") {
      setSignatureData((prev) => ({
        ...prev,
        customerEmail: value,
      }));
    }
  };

  const handleNext = () => {
    console.log("🔵 HandleNext called", {
      currentStep,
      nextStep: currentStep + 1,
    });
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    // Load cart data from localStorage
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      console.log("🛒 Cart Data Loaded:", cartData);
      setCartItems(cartData);

      // Check for existing contracts that might be pending payment
      checkForExistingContract(cartData);
    } else {
      // If no cart data, redirect back
      router.push("/advising");
    }
  }, [router]);

  // Check for existing contracts that are signed but pending payment
  const checkForExistingContract = async (cartData: CartItem[]) => {
    try {
      const contracts = await getUserContracts();
      console.log("🔍 Checking existing contracts:", contracts);

      // Determine product type from cart data
      const firstItem = cartData[0];
      if (!firstItem) return;

      let productType = "mentorship-package";

      // Handle subscription upgrades
      if (
        firstItem.id.includes("subscription-") ||
        firstItem.type?.includes("subscription")
      ) {
        if (
          firstItem.id.includes("diamond") ||
          firstItem.name?.toLowerCase().includes("diamond")
        ) {
          productType = "diamond-subscription";
        } else if (
          firstItem.id.includes("infinity") ||
          firstItem.name?.toLowerCase().includes("infinity")
        ) {
          productType = "infinity-subscription";
        } else {
          productType = "subscription-upgrade";
        }
      }

      console.log("🎯 Looking for product type:", productType);

      // Look for any contract with this product type
      const existingContract = contracts.find(
        (contract: any) => contract.productType === productType
      );

      console.log("📋 Found existing contract:", existingContract);

      if (existingContract) {
        // Check if it's an active completed subscription
        if (existingContract.status === "completed") {
          const now = new Date();
          const endDate = existingContract.subscriptionEndDate
            ? new Date(existingContract.subscriptionEndDate)
            : null;

          if (endDate && endDate > now) {
            // Active subscription found - redirect immediately
            toast({
              title: "Active Subscription Found",
              description:
                "You already have an active subscription for this product. Redirecting to your subscription dashboard...",
              variant: "destructive",
            });

            setTimeout(() => {
              router.push("/hub");
            }, 2000);
            return;
          }
        }

        // Check for signed or payment_pending contracts
        if (
          existingContract.status === "signed" ||
          existingContract.status === "payment_pending"
        ) {
          // Found an existing contract, skip to payment step
          setContractId(existingContract._id);
          setCurrentStep(4); // Payment step in new order

          toast({
            title: "Existing Contract Found",
            description:
              "Using your existing signed contract. Proceeding to payment.",
          });
        }
      }
    } catch (error) {
      console.error("Error checking for existing contracts:", error);
      // Don't show error to user, just proceed normally
    }
  };

  const currentSubscription = user?.subscription || "None";
  const useMemberPrice = currentSubscription !== "None";

  const getTotalPrice = (useMemberPrice: boolean = false) => {
    console.log("💰 Calculating Price:", {
      useMemberPrice,
      cartItems,
      discountedTotal,
      appliedDiscountAmount,
      appliedDiscountCode,
    });
    const subtotal = cartItems.reduce((total: number, item: CartItem) => {
      let priceValue =
        useMemberPrice && item.memberPrice ? item.memberPrice : item.price;
      console.log("📊 Item Price Calculation:", {
        itemName: item.name,
        itemPrice: item.price,
        memberPrice: item.memberPrice,
        originalPrice: item.originalPrice,
        useMemberPrice,
        selectedPriceValue: priceValue,
      });

      // Parse current price first
      let currentPrice = 0;
      if (typeof item.price === "string") {
        currentPrice = parseFloat(item.price.replace(/[$,]/g, ""));
      } else if (typeof item.price === "number") {
        currentPrice = item.price;
      }

      // Apply discount if original price exists
      if (item.originalPrice && !useMemberPrice) {
        // Parse original price
        const originalPriceStr = String(item.originalPrice);
        const originalPrice = parseFloat(originalPriceStr.replace(/[$,]/g, ""));

        console.log("🏷️ Discount Check:", {
          originalPrice,
          currentPrice,
          willUseDiscount: currentPrice < originalPrice,
          originalPriceStr,
          currentPriceStr: String(item.price),
        });

        // Use the discounted price if it's lower than original
        priceValue =
          currentPrice < originalPrice ? currentPrice : originalPrice;
      } else {
        // Handle member price or regular pricing
        if (typeof priceValue === "string") {
          priceValue = parseFloat(priceValue.replace(/[$,]/g, ""));
        } else if (typeof priceValue === "number") {
          priceValue = priceValue;
        } else {
          priceValue = 0;
        }
      }

      console.log("💲 Final Price Value for Item:", {
        itemName: item.name,
        finalPriceValue: priceValue,
      });

      const quantity = item.quantity || 1;
      return total + priceValue * quantity;
    }, 0);

    // Return discounted total if discount is applied, otherwise return subtotal
    const finalPrice = discountedTotal > 0 ? discountedTotal : subtotal;
    console.log("💵 Final Price Calculation:", {
      subtotal,
      discountedTotal,
      finalPrice,
      willUseDiscount: discountedTotal > 0,
    });
    return finalPrice;
  };

  // Get original price (before discount) for display
  const getOriginalPrice = () => {
    return cartItems.reduce((total: number, item: CartItem) => {
      if (item.originalPrice) {
        const originalPriceStr = String(item.originalPrice);
        const originalPrice = parseFloat(originalPriceStr.replace(/[$,]/g, ""));
        const quantity = item.quantity || 1;
        return total + originalPrice * quantity;
      } else {
        // If no original price, use current price
        const currentPriceStr = String(item.price);
        const currentPrice = parseFloat(currentPriceStr.replace(/[$,]/g, ""));
        const quantity = item.quantity || 1;
        return total + currentPrice * quantity;
      }
    }, 0);
  };

  // Check if any item has discount
  const hasDiscount = () => {
    const result = cartItems.some((item) => {
      if (!item.originalPrice) return false;

      // Parse original price
      const originalPriceStr = String(item.originalPrice);
      const originalPrice = parseFloat(originalPriceStr.replace(/[$,]/g, ""));

      // Parse current price
      const currentPriceStr = String(item.price);
      const currentPrice = parseFloat(currentPriceStr.replace(/[$,]/g, ""));

      console.log("🔍 Discount Detection:", {
        itemName: item.name,
        originalPriceStr,
        currentPriceStr,
        originalPrice,
        currentPrice,
        hasDiscount: originalPrice > currentPrice,
      });

      return originalPrice > currentPrice;
    });

    return result;
  };

  // Calculate total savings
  const getTotalSavings = () => {
    if (!hasDiscount()) return 0;
    return getOriginalPrice() - getTotalPrice(false);
  };

  // Calculate discount percentage
  const getDiscountPercentage = () => {
    if (!hasDiscount()) return 0;
    const original = getOriginalPrice();
    const current = getTotalPrice(false);
    if (original === 0) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  const getTotalItems = () => {
    return cartItems.reduce(
      (total: number, item: CartItem) => total + (item.quantity || 1),
      0
    );
  };

  // Handle discount application
  const handleDiscountApplied = (
    discountAmount: number,
    finalAmount: number,
    discountCode?: string
  ) => {
    console.log("🎯 Discount Applied in handleDiscountApplied:", {
      discountAmount,
      finalAmount,
      discountCode,
      discountAmountType: typeof discountAmount,
      finalAmountType: typeof finalAmount,
    });
    setAppliedDiscountAmount(discountAmount);
    setDiscountedTotal(finalAmount);
    if (discountCode) {
      setAppliedDiscountCode(discountCode);
    }

    // Save to localStorage for persistence across step navigation
    const discountData = {
      code: discountCode || "",
      amount: discountAmount,
      total: finalAmount,
      timestamp: Date.now(),
    };
    localStorage.setItem("checkout_discount", JSON.stringify(discountData));
    console.log("💾 Saved discount to localStorage:", discountData);
  };

  // Handle discount removal
  const handleDiscountRemoved = () => {
    setAppliedDiscountAmount(0);
    setDiscountedTotal(0);
    setAppliedDiscountCode("");

    // Clear from localStorage
    localStorage.removeItem("checkout_discount");
  };

  // Get subtotal before discount
  const getSubtotal = (useMemberPrice: boolean = false) => {
    return cartItems.reduce((total: number, item: CartItem) => {
      let priceValue =
        useMemberPrice && item.memberPrice ? item.memberPrice : item.price;

      // Parse current price first
      let currentPrice = 0;
      if (typeof item.price === "string") {
        currentPrice = parseFloat(item.price.replace(/[$,]/g, ""));
      } else if (typeof item.price === "number") {
        currentPrice = item.price;
      }

      // Apply discount if original price exists
      if (item.originalPrice && !useMemberPrice) {
        // Parse original price
        const originalPriceStr = String(item.originalPrice);
        const originalPrice = parseFloat(originalPriceStr.replace(/[$,]/g, ""));

        // Use the discounted price if it's lower than original
        priceValue =
          currentPrice < originalPrice ? currentPrice : originalPrice;
      } else {
        // Handle member price or regular pricing
        if (typeof priceValue === "string") {
          priceValue = parseFloat(priceValue.replace(/[$,]/g, ""));
        } else if (typeof priceValue === "number") {
          priceValue = priceValue;
        } else {
          priceValue = 0;
        }
      }

      const quantity = item.quantity || 1;
      return total + priceValue * quantity;
    }, 0);
  };

  const isDiamondPackage = () => {
    const firstItem = cartItems[0];
    if (!firstItem) return false;

    return (
      firstItem.id.includes("diamond") ||
      (firstItem.name && firstItem.name.toLowerCase().includes("diamond")) ||
      (firstItem.type && firstItem.type.toLowerCase().includes("diamond"))
    );
  };

  const isInfinityPackage = () => {
    const firstItem = cartItems[0];
    if (!firstItem) return false;

    return (
      firstItem.id.includes("infinity") ||
      (firstItem.name && firstItem.name.toLowerCase().includes("infinity")) ||
      (firstItem.type && firstItem.type.toLowerCase().includes("infinity"))
    );
  };

  const isBasicPackage = () => {
    const firstItem = cartItems[0];
    if (!firstItem) return false;

    return (
      firstItem.id.includes("basic") ||
      (firstItem.name && firstItem.name.toLowerCase().includes("basic")) ||
      (firstItem.type && firstItem.type.toLowerCase().includes("basic"))
    );
  };

  const isTradingTutorPackage = () => {
    const firstItem = cartItems[0];
    if (!firstItem) return false;

    return (
      firstItem.id === "trading-tutor" ||
      firstItem.name === "Trading Tutor" ||
      (firstItem.name &&
        firstItem.name.toLowerCase().includes("trading tutor")) ||
      (firstItem.type && firstItem.type.toLowerCase().includes("trading tutor"))
    );
  };

  const isInvestmentAdvisingPackage = () => {
    const firstItem = cartItems[0];
    if (!firstItem) return false;

    return (
      firstItem.id === "investment-advising" ||
      firstItem.name === "Investment Advising" ||
      (firstItem.name &&
        firstItem.name.toLowerCase().includes("investment advising")) ||
      (firstItem.type &&
        firstItem.type.toLowerCase().includes("investment advising"))
    );
  };

  const isUltimatePackage = () => {
    const firstItem = cartItems[0];
    if (!firstItem) return false;

    return (
      firstItem.id === "eagle-ultimate" ||
      firstItem.name === "Eagle Ultimate" ||
      (firstItem.name &&
        firstItem.name.toLowerCase().includes("eagle ultimate")) ||
      (firstItem.type && firstItem.type.toLowerCase().includes("ultimate"))
    );
  };

  const getProductType = () => {
    // Map cart items to product type based on ID patterns
    const firstItem = cartItems[0];
    if (!firstItem) return "mentorship-package";

    // Handle subscription upgrades
    if (
      firstItem.id.includes("subscription-") ||
      firstItem.type?.includes("subscription")
    ) {
      if (
        firstItem.id.includes("diamond") ||
        firstItem.name?.toLowerCase().includes("diamond")
      ) {
        return "diamond-subscription";
      } else if (
        firstItem.id.includes("infinity") ||
        firstItem.name?.toLowerCase().includes("infinity")
      ) {
        return "infinity-subscription";
      } else if (
        firstItem.id.includes("basic") ||
        firstItem.name?.toLowerCase().includes("basic")
      ) {
        return "basic-subscription";
      }
    }

    // Handle upgrade packages
    if (firstItem.id.includes("upgrade-")) {
      if (firstItem.id.includes("diamond")) {
        return "diamond-subscription";
      } else if (firstItem.id.includes("infinity")) {
        return "infinity-subscription";
      }
    }

    // Handle specific mentorship packages by exact name matching
    if (firstItem.name === "Eagle Ultimate") {
      return "eagle-ultimate";
    } else if (firstItem.name === "Investment Advising") {
      return "investment-advising";
    } else if (firstItem.name === "Trading Tutor") {
      return "trading-tutor";
    }

    // Handle specific mentorship packages by ID
    if (firstItem.id === "eagle-ultimate") {
      return "eagle-ultimate";
    } else if (firstItem.id === "investment-advising") {
      return "investment-advising";
    } else if (firstItem.id === "trading-tutor") {
      return "trading-tutor";
    }

    // Handle general mentorship packages
    if (
      firstItem.id.includes("mentorship-") ||
      firstItem.type === "mentorship-package"
    ) {
      return "mentorship-package";
    }

    // Handle product purchases
    if (firstItem.id.includes("product-")) {
      return firstItem.type || "product-purchase";
    }

    // Default fallback
    return "mentorship-package";
  };

  const handleSignContract = async () => {
    console.log("🔵 Sign Contract button clicked", {
      signature: !!signatureData.signature,
      contractAccepted: formData.contractAccepted,
      user: !!user,
      contractId,
    });

    if (!signatureData.signature.trim()) {
      toast({
        title: "Signature Required",
        description: "Please draw your digital signature",
        variant: "destructive",
      });
      return;
    }

    if (!formData.contractAccepted) {
      toast({
        title: "Agreement Required",
        description: "Please accept the service agreement to continue",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      // Guest user flow - proceed with guest contract creation
      console.log("👤 Guest user detected, proceeding with guest contract");

      // For guest users, we'll create a contract without authentication
      // but we need the contact info first, so let's move to step 3
      setCurrentStep(3);
      toast({
        title: "Contact Information Required",
        description: "Please provide your contact information to continue",
      });
      return;
    }

    setIsLoading(true);
    try {
      const productType = getProductType();
      const isDiamond = isDiamondPackage();
      const isInfinity = isInfinityPackage();
      const formattedDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Prepare contract data (no PDF generation needed - backend will store contract data only)
      const contractData = {
        name: signatureData.customerName,
        email: signatureData.customerEmail,
        signature: signatureData.signature,
        productType,
        subscriptionType: "monthly" as const,
        amount: getTotalPrice(useMemberPrice), // Keep as number
        isDiamondContract: isDiamond ? true : undefined,
        contractDate: formattedDate,
        productName: cartItems[0]?.name || "Mentorship Package",
      };

      const signedContract = await signContract(contractData);

      console.log("✅ Authenticated user contract signed:", signedContract);

      // Set contract ID from response
      const newContractId = signedContract._id;
      setContractId(newContractId);

      console.log(
        "📝 Setting contractId for authenticated user:",
        newContractId
      );

      // Update step progress based on contract status
      if (signedContract.isExisting) {
        // Existing contract - skip to payment
        setCurrentStep(4); // Skip to Payment step for existing contracts

        if (signedContract.status === "payment_pending") {
          toast({
            title: "Contract Ready",
            description: "Your contract is signed and ready for payment.",
          });
        } else {
          toast({
            title: "Contract Ready",
            description:
              "Using your existing contract for this package. Proceeding to payment.",
          });
        }
      } else {
        // New contract - go to contact info
        setCurrentStep(3); // Move to Contact Info step for new contracts
        toast({
          title: "Contract Signed Successfully",
          description: "Please fill in your contact information to continue",
        });
      }
    } catch (error: any) {
      console.error("Contract signing error:", error);

      // Handle active subscription error
      if (
        error.hasActiveSubscription ||
        error.message ===
          "You already have an active subscription for this product"
      ) {
        toast({
          title: "Active Subscription Found",
          description:
            "You already have an active subscription for this product. Redirecting to your subscription dashboard...",
          variant: "destructive",
        });

        // Redirect to subscription dashboard after a delay
        setTimeout(() => {
          router.push("/hub");
        }, 3000);
        return;
      }

      // Handle legacy error response for existing contracts or signed contracts with pending payment
      if (
        error.existingContract ||
        error.message === "Contract already exists for this product" ||
        error.message === "Contract signed but payment pending"
      ) {
        // Contract exists and is ready for payment, skip to payment step
        if (error.existingContract) {
          setContractId(error.existingContract._id);
        }

        setCurrentStep(4); // Move to Payment step for existing contracts

        toast({
          title: "Contract Ready",
          description:
            "Your contract is ready for payment. Proceeding to checkout.",
        });
      } else {
        // Show error only for actual failures, not for existing contracts
        toast({
          title: "Contract Signing Failed",
          description: error.message || "Failed to sign contract",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle guest contract signing after contact info is provided
  const handleGuestContractSigning = async () => {
    if (!signatureData.signature.trim()) {
      toast({
        title: "Signature Required",
        description: "Please go back and draw your digital signature",
        variant: "destructive",
      });
      return;
    }

    if (!formData.contractAccepted) {
      toast({
        title: "Agreement Required",
        description: "Please accept the service agreement",
        variant: "destructive",
      });
      return;
    }

    if (
      !formData.contactInfo.name.trim() ||
      !formData.contactInfo.email.trim() ||
      !formData.contactInfo.country.trim() ||
      !formData.contactInfo.streetAddress.trim() ||
      !formData.contactInfo.townCity.trim() ||
      !formData.contactInfo.stateCounty.trim() ||
      !formData.contactInfo.postcodeZip.trim()
    ) {
      toast({
        title: "Contact Information Required",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("🔵 Creating guest contract with new API");

      const productType = getProductType();

      // Prepare contract data for the new API
      const contractData: CreateContractWithContactData = {
        fullName: formData.contactInfo.name,
        email: formData.contactInfo.email,
        ...(formData.contactInfo.phone &&
          formData.contactInfo.phone.trim() && {
            phone: formData.contactInfo.phone.trim(),
          }),
        country: formData.contactInfo.country,
        streetAddress: formData.contactInfo.streetAddress,
        ...(formData.contactInfo.flatSuiteUnit &&
          formData.contactInfo.flatSuiteUnit.trim() && {
            flatSuiteUnit: formData.contactInfo.flatSuiteUnit.trim(),
          }),
        townCity: formData.contactInfo.townCity,
        stateCounty: formData.contactInfo.stateCounty,
        postcodeZip: formData.contactInfo.postcodeZip,
        ...(formData.contactInfo.discordUsername &&
          formData.contactInfo.discordUsername.trim() && {
            discordUsername: formData.contactInfo.discordUsername.trim(),
          }),
        signature: signatureData.signature,
        productType,
        subscriptionType: "monthly",
        contractData: {
          name: formData.contactInfo.name,
          email: formData.contactInfo.email,
          date: new Date(),
          signature: signatureData.signature,
          price: getTotalPrice(useMemberPrice).toLocaleString(),
          productName: cartItems[0]?.name || "Mentorship Package",
        },
      };

      const result = await createContractWithContact(contractData);

      console.log("✅ Guest contract created successfully:", result);

      // Set contract ID from response
      const newContractId = result.contractId;
      setContractId(newContractId);

      console.log("📝 Setting contractId:", newContractId);

      setCurrentStep(4); // Move to Payment step

      // Show success message based on user creation status
      let successMessage = "Contract signed successfully";
      if (result.userCreationStatus === "created_pending") {
        successMessage +=
          ". We've created an account for you and sent an activation email.";
      } else if (result.userCreationStatus === "updated_pending") {
        successMessage += ". We've resent your account activation email.";
      }

      toast({
        title: "Success",
        description: successMessage,
      });
    } catch (error: any) {
      console.error("Guest contract creation error:", error);

      // Handle validation errors
      if (error.validationErrors && Array.isArray(error.validationErrors)) {
        toast({
          title: "Validation Error",
          description: error.validationErrors.join(", "),
          variant: "destructive",
        });
        return;
      }

      // Handle active subscription error for guest users
      if (
        error.hasActiveSubscription ||
        error.message ===
          "You already have an active subscription for this product"
      ) {
        toast({
          title: "Active Subscription Found",
          description:
            "You already have an active subscription for this product. Please check your account or contact support.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Contract Creation Failed",
        description: error.message || "Failed to create contract",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentData: any) => {
    try {
      console.log("💳 Processing payment success...", paymentData);

      // IMPORTANT: Capture the final amount and discount info BEFORE clearing discount state
      const finalPaymentAmount = getTotalPrice(useMemberPrice);
      const capturedDiscountAmount = appliedDiscountAmount;
      const capturedDiscountCode = appliedDiscountCode;
      const capturedOriginalAmount = getSubtotal(useMemberPrice);

      console.log("💰 Captured payment details before clearing discount:", {
        finalPaymentAmount,
        capturedDiscountAmount,
        capturedDiscountCode,
        capturedOriginalAmount,
        calculation: `${capturedOriginalAmount} - ${capturedDiscountAmount} = ${finalPaymentAmount}`,
      });

      console.log("🔍 EXACT AMOUNT BEING SENT TO TRANSACTION:", {
        amountInDollars: finalPaymentAmount,
        amountWillBeConvertedToCents: finalPaymentAmount * 100,
        note: "Backend multiplies by 100 to convert to cents",
      });

      // Now clear discount from localStorage after capturing the values
      localStorage.removeItem("checkout_discount");
      console.log("✅ Cleared discount from localStorage after payment");

      // Update payment status in backend
      await updatePaymentStatus(contractId, {
        paymentId: paymentData.paymentId,
        paymentProvider: paymentData.paymentProvider,
        status: "completed",
      });

      // Create transaction record with captured values
      try {
        const transactionData: TransactionData = {
          amount: finalPaymentAmount, // Use captured amount
          currency: "USD",
          type: "charge",
          status: "completed",
          description: `Payment for ${
            cartItems[0]?.name || "Mentorship Package"
          }`,
          metadata: {
            contractId: contractId,
            productType: getProductType(),
            productName: cartItems[0]?.name || "Mentorship Package",
            plan: cartItems[0]?.name || "None",
            subscriptionType: cartItems[0]?.type || "one-time",
            paymentMethod: paymentData.paymentProvider,
            items: cartItems.map((item) => {
              // Parse the price correctly - handle both string and number formats
              let itemPrice = 0;
              if (typeof item.price === "string") {
                itemPrice = parseFloat(item.price.replace(/[$,]/g, ""));
              } else if (typeof item.price === "number") {
                itemPrice = item.price;
              }

              // Check if this is the actual discounted price or if we need to use originalPrice
              let finalItemPrice = itemPrice;
              if (item.originalPrice && !useMemberPrice) {
                const originalPriceStr = String(item.originalPrice);
                const originalPrice = parseFloat(
                  originalPriceStr.replace(/[$,]/g, "")
                );
                // Use the lower price (discounted)
                finalItemPrice =
                  itemPrice < originalPrice ? itemPrice : originalPrice;
              }

              return {
                id: item.id,
                name: item.name,
                type: item.type,
                quantity: item.quantity || 1,
                price: finalItemPrice, // Store as number in dollars (e.g., 70 = $70.00)
                originalPrice: item.originalPrice
                  ? parseFloat(String(item.originalPrice).replace(/[$,]/g, ""))
                  : undefined,
                memberPrice: item.memberPrice
                  ? typeof item.memberPrice === "string"
                    ? parseFloat(item.memberPrice.replace(/[$,]/g, ""))
                    : item.memberPrice
                  : undefined,
              };
            }),
            discountApplied: capturedDiscountAmount > 0, // Use captured value
            discountAmount: capturedDiscountAmount, // Use captured value in dollars
            originalAmount: capturedOriginalAmount, // Use captured original amount
          },
          psp: {
            provider:
              paymentData.paymentProvider === "paypal" ? "paypal" : "stripe",
            reference: {
              ...(paymentData.paymentProvider === "paypal"
                ? {
                    transactionId: paymentData.paymentId,
                    orderId: paymentData.orderId,
                  }
                : {
                    chargeId: paymentData.paymentId,
                    paymentIntentId: paymentData.paymentIntentId,
                  }),
            },
          },
          billingDetails: {
            name: formData.contactInfo.name || mockUser.name,
            email: formData.contactInfo.email || mockUser.email,
            phone: formData.contactInfo.phone,
            address: {
              line1: formData.contactInfo.streetAddress,
              line2: formData.contactInfo.flatSuiteUnit,
              city: formData.contactInfo.townCity,
              state: formData.contactInfo.stateCounty,
              postalCode: formData.contactInfo.postcodeZip,
              country: formData.contactInfo.country,
            },
          },
        };

        console.log("💾 Saving transaction...");
        console.log("📊 Transaction Details:", {
          finalPaymentAmount,
          capturedOriginalAmount,
          capturedDiscountAmount,
          capturedDiscountCode,
          items: transactionData.metadata?.items?.map((item: any) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
          })),
        });

        console.log("🎯 FINAL TRANSACTION DATA BEING SENT:", {
          amountInDollars: transactionData.amount,
          willBeStoredAsCents: Math.round(transactionData.amount * 100),
          metadata: {
            discountApplied: transactionData.metadata?.discountApplied,
            discountAmount: transactionData.metadata?.discountAmount,
            originalAmount: transactionData.metadata?.originalAmount,
          },
          verification: `Customer paid $${finalPaymentAmount.toFixed(
            2
          )} (Original: $${capturedOriginalAmount.toFixed(
            2
          )}, Discount: $${capturedDiscountAmount.toFixed(2)})`,
        });

        const transactionResult = await createTransaction(transactionData);
        console.log(
          "✅ Transaction saved:",
          transactionResult.transaction.transactionId
        );
        console.log("✅ Stored transaction amount:", {
          returnedAmount: transactionResult.transaction.amount,
          expectedAmountInDollars: finalPaymentAmount,
          sentAmountInDollars: transactionData.amount,
          note: "Frontend sends dollars, backend converts to cents for storage",
        });
      } catch (transactionError: any) {
        // Log error but don't fail the payment flow
        console.error("⚠️ Failed to save transaction:", transactionError);
        // Continue with the payment success flow even if transaction save fails
      }

      // Update step progress
      setCurrentStep(5);

      // Clear cart
      localStorage.removeItem("cart");

      // Dispatch custom event to notify other components
      window.dispatchEvent(
        new CustomEvent("mentorship-payment-success", {
          detail: { paymentData, contractId },
        })
      );

      toast({
        title: "Payment Successful!",
        description: "Your order has been completed successfully",
      });

      // Redirect to success page after delay
      setTimeout(() => {
        router.push("/hub");
      }, 2000);
    } catch (error: any) {
      console.error("Payment update error:", error);
      toast({
        title: "Payment Update Failed",
        description: "Payment was successful but failed to update status",
        variant: "destructive",
      });
    }
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive",
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Card className="max-w-md bg-slate-800 border-slate-700">
          <CardContent className="p-6 text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2 text-white">
              No Items to Checkout
            </h2>
            <p className="text-gray-400 mb-4">
              Your cart is empty. Please add items before proceeding to
              checkout.
            </p>
            <Button
              onClick={() => router.push("/advising")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Browse Packages
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl py-8">
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
                  className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    isCompleted
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 border-purple-500 text-white"
                      : isCurrent
                      ? "border-purple-500 text-purple-400 bg-purple-500/10"
                      : "border-slate-600 text-slate-400"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
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
        <div className="flex justify-between text-sm">
          {steps.map((step) => (
            <span
              key={step.id}
              className={`${
                currentStep >= step.id ? "text-purple-400" : "text-slate-400"
              }`}
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            {React.createElement(steps[currentStep - 1].icon, {
              className: "w-6 h-6 text-purple-400",
            })}
            Step {currentStep}: {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Review Order */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="bg-slate-700/50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    {cartItems[0]?.name || "Mentorship Package"}
                  </h3>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {getTotalItems() > 1
                      ? `${getTotalItems()} Items`
                      : "Premium Package"}
                  </Badge>
                </div>
                <div className="space-y-2 text-slate-300">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span>
                        {item.name}{" "}
                        {item.quantity && item.quantity > 1
                          ? `(x${item.quantity})`
                          : ""}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">
                      {appliedDiscountAmount > 0 ? "Subtotal:" : "Total:"}
                    </span>
                    <div className="text-right">
                      {/* Show original price if discount exists */}
                      {hasDiscount() && (
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-slate-400 line-through">
                            ${getOriginalPrice().toLocaleString()}
                          </span>
                          <Badge className="bg-red-500/20 text-red-400 text-xs">
                            Save {getDiscountPercentage()}%
                          </Badge>
                        </div>
                      )}
                      {/* Show member price discount if applicable and no regular discount */}
                      {useMemberPrice && !hasDiscount() && (
                        <div className="text-sm text-slate-400 line-through">
                          ${getSubtotal(false).toLocaleString()}
                        </div>
                      )}
                      <span
                        className={`${
                          appliedDiscountAmount > 0 ? "text-lg" : "text-2xl"
                        } font-bold text-white`}
                      >
                        ${getSubtotal(useMemberPrice).toLocaleString()}
                        {useMemberPrice && !hasDiscount() && (
                          <Badge className="ml-2 bg-green-500/20 text-green-400">
                            Member Price
                          </Badge>
                        )}
                        {hasDiscount() && (
                          <Badge className="ml-2 bg-green-500/20 text-green-400">
                            ${getTotalSavings().toLocaleString()} Off
                          </Badge>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Show discount line and final total if discount is applied */}
                  {appliedDiscountAmount > 0 && (
                    <>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-slate-300">Promo Discount:</span>
                        <span className="text-green-400 font-medium">
                          -${appliedDiscountAmount.toLocaleString()}
                        </span>
                      </div>
                      <Separator className="my-2 bg-slate-600" />
                      <div className="flex justify-between items-center">
                        <span className="text-white font-semibold">Total:</span>
                        <span className="text-2xl font-bold text-white">
                          ${getTotalPrice(useMemberPrice).toLocaleString()}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Discount Section */}
              <DiscountSection
                orderAmount={getSubtotal(useMemberPrice)}
                quantity={getTotalItems()}
                onDiscountApplied={handleDiscountApplied}
                onDiscountRemoved={handleDiscountRemoved}
                initialDiscountCode={appliedDiscountCode}
                className="mt-4"
              />
            </div>
          )}

          {/* Step 2: Sign Contract */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {isLoadingTemplate ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
                  <span className="ml-3 text-slate-300">
                    Loading contract template...
                  </span>
                </div>
              ) : contractTemplate ? (
                /* Display contract template from backend */
                <div className="bg-slate-700/50 rounded-lg p-6 max-h-[400px] overflow-y-auto">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {contractTemplate.name}
                  </h3>
                  {contractTemplate.metadata?.description && (
                    <p className="text-sm text-slate-400 mb-4">
                      {contractTemplate.metadata.description}
                    </p>
                  )}
                  <div
                    className="text-slate-300 text-sm space-y-2 prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{
                      __html:
                        contractTemplate.content.htmlBody ||
                        contractTemplate.content.body,
                    }}
                  />
                </div>
              ) : (
                /* Fallback to hardcoded contract components if no template found */
                (() => {
                  // Format the current date for all contracts
                  const formattedDate = new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });

                  // Common props for all contract components
                  const contractProps = {
                    customerName: signatureData.customerName || "[Client Name]",
                    contractDate: formattedDate,
                    price: getTotalPrice(useMemberPrice).toLocaleString(),
                    preview: true,
                  };

                  // Get the product type
                  const productType = getProductType();

                  // Determine which contract to show based on product type
                  if (isDiamondPackage()) {
                    return (
                      <div className="bg-slate-700/50 rounded-lg p-6 max-h-[400px] overflow-y-auto">
                        <DiamondContract {...contractProps} />
                      </div>
                    );
                  } else if (isInfinityPackage()) {
                    return (
                      <div className="bg-slate-700/50 rounded-lg p-6 max-h-[400px] overflow-y-auto">
                        <InfinityContract {...contractProps} />
                      </div>
                    );
                  } else if (
                    isBasicPackage() ||
                    productType === "basic-subscription"
                  ) {
                    return (
                      <div className="bg-slate-700/50 rounded-lg p-6 max-h-[400px] overflow-y-auto">
                        <BasicContract {...contractProps} />
                      </div>
                    );
                  } else if (isTradingTutorPackage()) {
                    return (
                      <div className="bg-slate-700/50 rounded-lg p-6 max-h-[400px] overflow-y-auto">
                        <TradingTutorContract {...contractProps} />
                      </div>
                    );
                  } else if (isUltimatePackage()) {
                    return (
                      <div className="bg-slate-700/50 rounded-lg p-6 max-h-[400px] overflow-y-auto">
                        <UltimateContract {...contractProps} />
                      </div>
                    );
                  } else if (isInvestmentAdvisingPackage()) {
                    return (
                      <div className="bg-slate-700/50 rounded-lg p-6 max-h-[400px] overflow-y-auto">
                        <InvestmentAdvisingContract {...contractProps} />
                      </div>
                    );
                  } else if (productType.includes("script")) {
                    return (
                      <div className="bg-slate-700/50 rounded-lg p-6 max-h-[400px] overflow-y-auto">
                        <ScriptContract {...contractProps} />
                      </div>
                    );
                  } else {
                    // Fallback for any other product types
                    return (
                      <div className="bg-slate-700/50 rounded-lg p-6 max-h-64 overflow-y-auto">
                        <h3 className="text-lg font-semibold text-white mb-4">
                          Service Agreement
                        </h3>
                        <div className="text-slate-300 text-sm space-y-2">
                          <p>
                            By subscribing to our{" "}
                            {cartItems[0]?.name || "Mentorship Package"}, you
                            agree to the following terms:
                          </p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>
                              Monthly subscription fee of $
                              {getTotalPrice(useMemberPrice).toLocaleString()}{" "}
                              will be charged automatically
                            </li>
                            <li>
                              Access to all trading scripts and AI-powered tools
                            </li>
                            <li>24/7 customer support and regular updates</li>
                            <li>
                              30-day money-back guarantee for new subscribers
                            </li>
                            <li>
                              You may cancel your subscription at any time
                            </li>
                            <li>
                              All trading involves risk - past performance
                              doesn't guarantee future results
                            </li>
                          </ul>
                          <p className="mt-4">
                            For complete terms and conditions, please visit our
                            website.
                          </p>
                        </div>
                      </div>
                    );
                  }
                })()
              )}

              <div>
                <Label htmlFor="signature" className="text-white">
                  Digital Signature
                </Label>
                <SignatureCanvas
                  onSignatureChange={(signature) => {
                    console.log("🖊️ Signature changed", {
                      hasSignature: !!signature,
                      length: signature?.length,
                    });
                    setSignatureData((prev) => ({
                      ...prev,
                      signature,
                    }));
                  }}
                  className="bg-slate-700 border-slate-600 rounded-md min-h-[120px] w-full"
                />
                <p className="text-sm text-gray-400 mt-1">
                  Please draw your signature above to agree to the terms and
                  conditions
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contract"
                  checked={formData.contractAccepted}
                  onCheckedChange={(checked) => {
                    console.log("✅ Checkbox changed", { checked });
                    updateFormData("contractAccepted", checked);
                  }}
                  className="bg-slate-700 border-slate-600 text-purple-500 focus:ring-purple-500"
                />
                <Label htmlFor="contract" className="text-slate-300">
                  I have read and agree to the service agreement
                </Label>
              </div>
            </div>
          )}

          {/* Step 3: Contact Info */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">
                Contact & Address Information
              </h3>

              {/* Personal Information */}
              <div className="bg-slate-700/30 rounded-lg p-4 space-y-4">
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
                      value={formData.contactInfo.name}
                      onChange={(e) =>
                        updateContactInfo("name", e.target.value)
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-slate-300">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.contactInfo.email}
                      onChange={(e) =>
                        updateContactInfo("email", e.target.value)
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.contactInfo.phone}
                      onChange={(e) =>
                        updateContactInfo("phone", e.target.value)
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-slate-300">
                      Company (Optional)
                    </Label>
                    <Input
                      id="company"
                      value={formData.contactInfo.company}
                      onChange={(e) =>
                        updateContactInfo("company", e.target.value)
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div className="bg-slate-700/30 rounded-lg p-4 space-y-4">
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
                      value={formData.contactInfo.country}
                      onChange={(e) =>
                        updateContactInfo("country", e.target.value)
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your country"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="streetAddress" className="text-slate-300">
                      Street Address *
                    </Label>
                    <Input
                      id="streetAddress"
                      value={formData.contactInfo.streetAddress}
                      onChange={(e) =>
                        updateContactInfo("streetAddress", e.target.value)
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your street address"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="flatSuiteUnit" className="text-slate-300">
                      Flat, Suite, Unit, etc. (Optional)
                    </Label>
                    <Input
                      id="flatSuiteUnit"
                      value={formData.contactInfo.flatSuiteUnit}
                      onChange={(e) =>
                        updateContactInfo("flatSuiteUnit", e.target.value)
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Apartment, suite, unit, building, floor, etc."
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="townCity" className="text-slate-300">
                        Town/City *
                      </Label>
                      <Input
                        id="townCity"
                        value={formData.contactInfo.townCity}
                        onChange={(e) =>
                          updateContactInfo("townCity", e.target.value)
                        }
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Enter your city"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stateCounty" className="text-slate-300">
                        State/County *
                      </Label>
                      <Input
                        id="stateCounty"
                        value={formData.contactInfo.stateCounty}
                        onChange={(e) =>
                          updateContactInfo("stateCounty", e.target.value)
                        }
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="Enter your state or county"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="postcodeZip" className="text-slate-300">
                      Postcode/Zip *
                    </Label>
                    <Input
                      id="postcodeZip"
                      value={formData.contactInfo.postcodeZip}
                      onChange={(e) =>
                        updateContactInfo("postcodeZip", e.target.value)
                      }
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Enter your postal/zip code"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Additional Contact Information */}
              <div className="bg-slate-700/30 rounded-lg p-4 space-y-4">
                <h4 className="text-md font-medium text-purple-300 mb-3">
                  Additional Information
                </h4>
                <div>
                  <Label htmlFor="discordUsername" className="text-slate-300">
                    Discord Username
                  </Label>
                  <Input
                    id="discordUsername"
                    value={formData.contactInfo.discordUsername}
                    onChange={(e) =>
                      updateContactInfo("discordUsername", e.target.value)
                    }
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Enter your Discord username (e.g., username#1234)"
                  />
                  <p className="text-xs text-slate-400 mt-1">
                    Optional: Provide your Discord username for community access
                    and support
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {currentStep === 4 && (
            <div className="space-y-4">
              {contractId ? (
                <>
                  {/* Price Summary */}
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Order Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-slate-300">
                        <span>Subtotal:</span>
                        <span>
                          $
                          {(discountedTotal > 0
                            ? discountedTotal + appliedDiscountAmount
                            : getSubtotal(useMemberPrice)
                          ).toLocaleString()}
                        </span>
                      </div>

                      {appliedDiscountAmount > 0 && (
                        <div className="flex justify-between text-green-400">
                          <span>Discount Applied:</span>
                          <span>
                            -${appliedDiscountAmount.toLocaleString()}
                          </span>
                        </div>
                      )}

                      <div className="border-t border-slate-600 pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span className="text-white text-lg">Total:</span>
                          <span className="text-white text-xl">
                            ${getTotalPrice(useMemberPrice).toLocaleString()}
                          </span>
                        </div>
                        {appliedDiscountAmount > 0 && (
                          <div className="text-sm text-green-400 text-right mt-1">
                            You saved ${appliedDiscountAmount.toLocaleString()}!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector with discount info */}
                  {(() => {
                    const totalPrice = getTotalPrice(useMemberPrice);

                    // If discountedTotal is already set (from discount application), use it directly
                    // Otherwise calculate: totalPrice - discount
                    let finalAmount;
                    if (discountedTotal > 0 && appliedDiscountAmount > 0) {
                      // discountedTotal is already the final amount after discount
                      finalAmount = discountedTotal;
                      console.log(
                        "💰 Using pre-calculated discountedTotal:",
                        finalAmount
                      );
                    } else if (appliedDiscountAmount > 0) {
                      // Calculate discount on the fly
                      finalAmount = totalPrice - appliedDiscountAmount;
                      console.log("💰 Calculating discount:", {
                        totalPrice,
                        appliedDiscountAmount,
                        finalAmount,
                      });
                    } else {
                      // No discount
                      finalAmount = totalPrice;
                    }

                    // Ensure finalAmount is never negative or zero
                    if (finalAmount <= 0) {
                      console.error("❌ Final amount is invalid!", {
                        totalPrice,
                        appliedDiscountAmount,
                        discountedTotal,
                        calculatedFinalAmount: finalAmount,
                        issue: "Discount exceeds total price",
                      });
                      // If discount is larger than price, the discount was calculated on wrong base
                      // Use totalPrice without discount to avoid negative amounts
                      finalAmount = Math.max(totalPrice, 0.01); // At least 1 cent
                      console.warn(
                        "⚠️ Reset finalAmount to totalPrice:",
                        finalAmount
                      );
                    }

                    console.log("💳 Payment Method Selector Props:", {
                      contractId,
                      originalAmount: totalPrice,
                      finalAmount,
                      discountedTotal,
                      discountCode: appliedDiscountCode,
                      discountAmount: appliedDiscountAmount,
                      willPassDiscount:
                        appliedDiscountAmount > 0 && finalAmount < totalPrice,
                      isValid: finalAmount > 0,
                    });

                    // Only pass discount info if it's valid (discount < totalPrice)
                    const validDiscount =
                      appliedDiscountAmount > 0 &&
                      appliedDiscountAmount < totalPrice;

                    return (
                      <PaymentMethodSelector
                        contractId={contractId}
                        amount={Math.abs(finalAmount).toFixed(2)}
                        productName={`${getTotalItems()} ${
                          cartItems[0]?.name || "Mentorship Package"
                        }${getTotalItems() > 1 ? "s" : ""}`}
                        subscriptionType="monthly"
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentError={handlePaymentError}
                        discountCode={
                          validDiscount ? appliedDiscountCode : undefined
                        }
                        discountAmount={
                          validDiscount ? appliedDiscountAmount : undefined
                        }
                      />
                    );
                  })()}
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mx-auto mb-4">
                      <FileText className="w-8 h-8 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Contract Required
                    </h3>
                    <p className="text-slate-300 mb-4">
                      {!user
                        ? "You need to complete the contract signing process before making a payment. Please go back to Step 2 and sign the contract, then provide your contact information."
                        : "Contract is required before payment. Please go back and complete the contract signing process."}
                    </p>
                    <Button
                      onClick={() => setCurrentStep(!user ? 2 : 3)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    >
                      {!user ? "Go to Contract Signing" : "Go to Contact Info"}
                    </Button>
                  </div>

                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">
                        {cartItems[0]?.name || "Mentorship Package"}
                        {hasDiscount()
                          ? " (Discounted)"
                          : useMemberPrice
                          ? " (Member Price)"
                          : " (Monthly)"}
                      </span>
                      <div className="text-right">
                        {/* Show original price if discount exists */}
                        {hasDiscount() && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-slate-400 line-through">
                              ${getOriginalPrice().toLocaleString()}
                            </span>
                            <Badge className="bg-red-500/20 text-red-400 text-xs">
                              {getDiscountPercentage()}% OFF
                            </Badge>
                          </div>
                        )}
                        <span className="text-white font-semibold">
                          ${getTotalPrice(useMemberPrice).toLocaleString()}
                        </span>
                        {hasDiscount() && (
                          <div className="text-xs text-green-400 mt-1">
                            You save ${getTotalSavings().toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-600">
                      <span className="text-white font-semibold">Total</span>
                      <span className="text-xl font-bold text-white">
                        ${getTotalPrice(useMemberPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Complete */}
          {currentStep === 5 && (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Order Complete!</h3>
              <p className="text-slate-300">
                Welcome to Eagle Investors! Your{" "}
                {cartItems[0]?.name || "Mentorship Package"} is now active.
              </p>
              <div className="bg-slate-700/50 rounded-lg p-4">
                <p className="text-slate-300 text-sm">
                  You'll receive an email confirmation shortly with your login
                  credentials and access instructions.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div
            className={`flex pt-6 ${
              currentStep === 1 ? "justify-end" : "justify-between"
            }`}
          >
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handlePrevious}
                className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              >
                Previous
              </Button>
            )}

            {currentStep < 5 ? (
              <Button
                onClick={() => {
                  console.log("🟡 Button clicked", {
                    currentStep,
                    contractId,
                    willCallSignContract:
                      currentStep === 2 && contractId === "",
                    formData: formData.contractAccepted,
                    signature: !!signatureData.signature,
                    user: !!user,
                  });

                  if (currentStep === 2 && contractId === "") {
                    // Step 2: Sign Contract
                    handleSignContract();
                  } else if (currentStep === 3 && !user && contractId === "") {
                    // Step 3: Guest user completing contact info - sign contract now
                    handleGuestContractSigning();
                  } else if (currentStep === 4) {
                    // Step 4: Cannot proceed - payment must complete through PaymentMethodSelector
                    toast({
                      title: "Complete Payment Required",
                      description:
                        "Please complete the payment process to continue",
                      variant: "destructive",
                    });
                  } else {
                    // Regular next step
                    handleNext();
                  }
                }}
                disabled={(() => {
                  // Simplified validation for debugging
                  let disabled = false;

                  if (currentStep === 2) {
                    // Step 2: Sign Contract validation
                    disabled =
                      !formData.contractAccepted ||
                      !signatureData.signature ||
                      (contractId === "" && isLoading);
                  } else if (currentStep === 3) {
                    // Step 3: Contact Info validation - check all required fields
                    const required = [
                      "name",
                      "email",
                      "country",
                      "streetAddress",
                      "townCity",
                      "stateCounty",
                      "postcodeZip",
                    ];
                    disabled = required.some(
                      (field) =>
                        !formData.contactInfo[
                          field as keyof typeof formData.contactInfo
                        ]?.trim()
                    );

                    // For guest users, we also need signature and contract acceptance from step 2
                    if (!user && contractId === "") {
                      disabled =
                        disabled ||
                        !formData.contractAccepted ||
                        !signatureData.signature ||
                        isLoading;
                    }
                  } else if (currentStep === 4) {
                    // Step 4: Payment validation - contract must exist, button should be disabled as payment happens in PaymentMethodSelector
                    disabled = true; // Always disabled - payment completion moves to step 5 automatically
                  }

                  return disabled;
                })()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {isLoading
                  ? "Processing..."
                  : currentStep === 2 && contractId === ""
                  ? "Sign Contract"
                  : currentStep === 3 && !user && contractId === ""
                  ? "Complete Contract & Continue"
                  : currentStep === 4 && contractId === ""
                  ? "Complete Contract First"
                  : currentStep === 4
                  ? "Processing Payment..."
                  : "Next"}
              </Button>
            ) : (
              <Button
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                onClick={() => router.push("/hub")}
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
