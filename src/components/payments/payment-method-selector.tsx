"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PayPalPayment } from "@/components/payments/paypal-payment";
import { StripeElementsPayment } from "@/components/payments/stripe-elements-payment";
import { CreditCard, DollarSign } from "lucide-react";

interface PaymentMethodSelectorProps {
  contractId: string;
  amount: string;
  productName: string;
  subscriptionType?: "monthly" | "yearly";
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError?: (error: string) => void;
  discountCode?: string;
  discountAmount?: number;
}

type PaymentMethod = "paypal" | "stripe" | null;

export function PaymentMethodSelector({
  contractId,
  amount,
  productName,
  subscriptionType = "monthly",
  onPaymentSuccess,
  onPaymentError = () => {},
  discountCode,
  discountAmount,
}: PaymentMethodSelectorProps) {
  // All transactions require payment method selection
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);

  const handlePaymentSuccess = (paymentData: any) => {
    console.log("Payment success in selector:", paymentData);
    onPaymentSuccess({
      ...paymentData,
      paymentProvider: selectedMethod,
    });
  };

  const handlePaymentError = (error: string) => {
    console.error("Payment error in selector:", error);
    onPaymentError(error);
  };

  if (selectedMethod === "paypal") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              PayPal
            </Badge>
            <span className="text-sm text-gray-600">
              Selected Payment Method
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMethod(null)}
          >
            Change Method
          </Button>
        </div>

        <PayPalPayment
          contractId={contractId}
          amount={amount}
          productName={productName}
          subscriptionType={subscriptionType}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
          discountCode={discountCode}
          discountAmount={discountAmount}
        />
      </div>
    );
  }

  if (selectedMethod === "stripe") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Credit Card
            </Badge>
            <span className="text-sm text-gray-600">
              Selected Payment Method
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMethod(null)}
          >
            Change Method
          </Button>
        </div>

        <StripeElementsPayment
          contractId={contractId}
          amount={amount}
          productName={productName}
          subscriptionType={subscriptionType}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
          discountCode={discountCode}
          discountAmount={discountAmount}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2 text-white">
          Choose Your Payment Method
        </h3>
        <p className="text-white">
          Select how you'd like to pay for {productName}
        </p>
      </div>

      <div className="grid gap-4">
        {/* PayPal Option */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
          onClick={() => setSelectedMethod("paypal")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">PayPal</div>
                  <div className="text-sm text-gray-500 font-normal">
                    Pay with your PayPal account
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Available
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => setSelectedMethod("paypal")}
            >
              Pay with PayPal
            </Button>
          </CardContent>
        </Card>

        {/* Stripe/Credit Card Option */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-300"
          onClick={() => setSelectedMethod("stripe")}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Credit / Debit Card</div>
                  <div className="text-sm text-gray-500 font-normal">
                    Pay with Visa, Mastercard, or American Express
                  </div>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                Secure
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => setSelectedMethod("stripe")}
            >
              Pay with Card
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-4">
        <div className="text-2xl font-bold mb-2 text-white">
          Total: ${amount}
        </div>
        <p className="text-sm text-gray-500">
          All payments are secure and encrypted
        </p>
      </div>
    </div>
  );
}
