import { ProductPurchaseCard } from "@/components/pricing/product-purchase-card";

const PRODUCTS = [
  {
    productType: "basic",
    productName: "Basic Package",
    price: "99.00",
    description: "Essential trading tools and basic advisory services",
    features: [
      "Basic market analysis",
      "Weekly trading signals",
      "Email support",
      "Basic risk management tools",
    ],
  },
  {
    productType: "script",
    productName: "Script Package",
    price: "199.00",
    description: "Advanced scripting tools and trading automation",
    features: [
      "Custom trading scripts",
      "Automated signals",
      "Script customization",
      "Priority support",
    ],
  },
  {
    productType: "diamond",
    productName: "Diamond Package",
    price: "499.00",
    description: "Premium advisory services with personalized guidance",
    features: [
      "Personal trading advisor",
      "Real-time market alerts",
      "Monthly strategy sessions",
      "Advanced portfolio analysis",
      "24/7 support",
    ],
  },
  {
    productType: "infinity",
    productName: "Infinity Package",
    price: "999.00",
    description: "Ultimate trading package with unlimited access",
    features: [
      "All premium features",
      "Unlimited advisory sessions",
      "Custom strategy development",
      "Direct advisor contact",
      "VIP support",
      "Exclusive market insights",
    ],
  },
];

export default function PurchasePage() {
  return (
    <div className="min-h-screen bg-brand-bg-dark py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Choose Your Advisory Package
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select the perfect advisory package for your trading journey. Each
            purchase includes a secure digital contract signing process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PRODUCTS.map((product) => (
            <ProductPurchaseCard
              key={product.productType}
              productType={product.productType}
              productName={product.productName}
              price={product.price}
              description={product.description}
              features={product.features}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-brand-bg-light border border-brand-border rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="text-white font-medium mb-2">Review Contract</h4>
                <p className="text-gray-400">
                  Read through the advisory contract for your selected package
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="text-white font-medium mb-2">
                  Digital Signature
                </h4>
                <p className="text-gray-400">
                  Provide your digital signature to legally bind the contract
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="text-white font-medium mb-2">Secure Payment</h4>
                <p className="text-gray-400">
                  Complete your purchase using PayPal&apos;s secure payment
                  system
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
