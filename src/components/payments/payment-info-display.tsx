import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, CreditCard, Shield, Phone, Mail } from "lucide-react";

interface PaymentInfoProps {
  productName: string;
  amount: number;
  subscriptionType: "monthly" | "yearly";
  businessInfo?: {
    name?: string;
    supportEmail?: string;
    phone?: string;
    website?: string;
  };
  discountCode?: string;
  discountAmount?: number;
  originalAmount?: number;
}

export function PaymentInfoDisplay({
  productName,
  amount,
  subscriptionType,
  businessInfo,
  discountCode,
  discountAmount,
  originalAmount,
}: PaymentInfoProps) {
  const businessName = businessInfo?.name || "Eagle Investors";
  const supportEmail =
    businessInfo?.supportEmail || "support@eagle-investors.com";
  const website = businessInfo?.website || "https://eagle-investors.com";

  const hasDiscount = discountAmount && discountAmount > 0;
  const displayOriginalAmount = hasDiscount
    ? originalAmount || amount + discountAmount
    : amount;

  console.log("💳 PaymentInfoDisplay Props:", {
    amount,
    discountCode,
    discountAmount,
    originalAmount,
    hasDiscount,
    displayOriginalAmount,
  });

  return (
    <div className="space-y-4">
      {/* Payment Summary */}
      <Card className="bg-brand-bg-light border-brand-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Service:</span>
            <span className="text-white font-medium">{productName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Billing:</span>
            <span className="text-white font-medium">
              {subscriptionType === "yearly" ? "Annual" : "Monthly"}{" "}
              Subscription
            </span>
          </div>
          {hasDiscount && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Original Price:</span>
                <span className="text-gray-400 line-through">
                  ${displayOriginalAmount.toFixed(2)} USD
                </span>
              </div>
              <div className="flex justify-between items-center text-green-400">
                <span className="font-medium">Discount ({discountCode}):</span>
                <span className="font-medium">
                  -${discountAmount.toFixed(2)} USD
                </span>
              </div>
            </>
          )}
          <div className="border-t border-brand-border pt-3 mt-3"></div>
          <div className="flex justify-between items-center text-lg font-semibold">
            <span className="text-gray-400">Total:</span>
            <span className="text-white">${amount.toFixed(2)} USD</span>
          </div>
        </CardContent>
      </Card>

      {/* Merchant Information */}
      <Card className="bg-brand-bg-light border-brand-border">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Merchant Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <p className="text-white font-medium">{businessName}</p>
            <p className="text-gray-400 text-sm">
              Your payment will appear as "
              <strong className="text-white">EAGLE INVESTORS</strong>" on your
              bank/credit card statement.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-medium">Contact Information:</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <a
                  href={`mailto:${supportEmail}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {supportEmail}
                </a>
              </div>
              {businessInfo?.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300">{businessInfo.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-4 w-4 text-gray-400" />
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {website}
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="bg-blue-500/10 border-blue-500/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="text-blue-400 font-medium">
                Secure Payment Processing
              </h4>
              <p className="text-gray-300 text-sm">
                Your payment is processed securely through industry-leading
                payment processors. We never store your payment information on
                our servers.
              </p>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• SSL encrypted data transmission</li>
                <li>• PCI DSS compliant payment processing</li>
                <li>• 256-bit encryption for all transactions</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Information */}
      <Card className="bg-yellow-500/10 border-yellow-500/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="text-yellow-400 font-medium">
                Billing Information
              </h4>
              <div className="text-gray-300 text-sm space-y-1">
                <p>
                  • Automatic renewal:{" "}
                  {subscriptionType === "yearly" ? "Annual" : "Monthly"}
                </p>
                <p>• Cancel anytime through your account settings</p>
                <p>• Email receipts will be sent to your registered email</p>
                <p>• For billing support, contact us at {supportEmail}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
