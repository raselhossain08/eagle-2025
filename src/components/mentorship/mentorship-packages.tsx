"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Crown,
  TrendingUp,
  Gem,
  CheckCircle,
  Star,
  Tag,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getPublicPlans, type Plan } from "@/lib/services/api/plan";
import { discountService } from "@/lib/services/api/discount";
import toast from "react-hot-toast";

interface MentorshipPackage {
  id: string;
  name: string;
  price: string;
  memberPrice: string;
  description: string;
  icon: any;
  gradient: string;
  features: string[];
  popular: boolean;
  savings: string;
}

export function MentorshipPackages() {
  const router = useRouter();
  const [mentorshipPackages, setMentorshipPackages] = useState<
    MentorshipPackage[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [verifiedDiscount, setVerifiedDiscount] = useState<{
    code: string;
    percentage: number;
    type: string;
  } | null>(null);
  const [verifyingDiscount, setVerifyingDiscount] = useState(false);

  useEffect(() => {
    const loadMentorshipPackages = async () => {
      try {
        setLoading(true);
        const plans = await getPublicPlans();
        const mentorshipPlans = plans
          .filter(
            (plan: Plan) => plan.planType === "mentorship" && plan.isActive
          )
          .sort((a: Plan, b: Plan) => (a.sortOrder || 0) - (b.sortOrder || 0));

        const packages: MentorshipPackage[] = mentorshipPlans.map(
          (plan: Plan) => {
            const pricing = plan.pricing?.oneTime;
            const price =
              typeof pricing === "number"
                ? pricing
                : (pricing as any)?.price || 0;
            const memberPrice = (pricing as any)?.memberPrice || price;
            const savings = (pricing as any)?.savings || price - memberPrice;

            // Determine icon based on category
            let icon = Gem;
            let gradient = "from-blue-500 to-purple-600";

            if (plan.category === "ultimate") {
              icon = Crown;
              gradient = "from-yellow-500 to-orange-600";
            } else if (plan.name.toLowerCase().includes("advising")) {
              icon = TrendingUp;
              gradient = "from-green-500 to-emerald-600";
            }

            return {
              id: plan._id,
              name: plan.displayName || plan.name,
              price: `$${price.toLocaleString()}`,
              memberPrice: `$${memberPrice.toLocaleString()}`,
              description:
                plan.description || "Professional mentorship program",
              icon,
              gradient,
              features: plan.features || [],
              popular: plan.isPopular || false,
              savings: `$${savings.toLocaleString()}`,
            };
          }
        );

        setMentorshipPackages(packages);
      } catch (error) {
        console.error("Failed to load mentorship packages:", error);
        toast.error("Failed to load mentorship packages");
      } finally {
        setLoading(false);
      }
    };

    loadMentorshipPackages();
  }, []);

  const handleVerifyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a discount code");
      return;
    }

    setVerifyingDiscount(true);
    try {
      const response = await discountService.verifyDiscountCode({
        code: discountCode.trim(),
      });

      if (response.valid) {
        setVerifiedDiscount({
          code: discountCode.trim(),
          percentage: response.discount?.value || 0,
          type: response.discount?.type || "percentage",
        });
        toast.success(
          `Discount code applied: ${response.discount?.value}% off!`
        );
      } else {
        toast.error("Invalid discount code");
        setVerifiedDiscount(null);
      }
    } catch (error) {
      console.error("Discount verification error:", error);
      toast.error("Failed to verify discount code");
      setVerifiedDiscount(null);
    } finally {
      setVerifyingDiscount(false);
    }
  };

  const calculateDiscountedPrice = (priceString: string) => {
    if (!verifiedDiscount) return priceString;

    const price = parseFloat(priceString.replace(/[$,]/g, ""));
    const discountedPrice = price * (1 - verifiedDiscount.percentage / 100);
    return `$${discountedPrice.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  if (loading) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-cyan-400 mx-auto mb-4" />
            <p className="text-gray-400">Loading mentorship packages...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold uppercase tracking-wide text-sm">
              1 ON 1 MENTORSHIP
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Personalized
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Mentorship Programs
            </span>
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Take your investment skills to the next level with personalized
            1-on-1 mentorship from our experienced professionals. Choose the
            perfect program for your investment journey.
          </p>
        </div>



        {/* Mentorship Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {mentorshipPackages.map((pkg, index) => (
            <div key={index} className="relative group">
              {pkg.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Comprehensive
                  </div>
                </div>
              )}

              <Card
                className={`relative my-box2  ${
                  pkg.popular
                    ? "ring-2 ring-yellow-400/50 shadow-2xl shadow-yellow-500/20"
                    : ""
                }`}
              >
                <CardHeader className="text-center pb-8 pt-12">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${pkg.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <pkg.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-white mb-2">
                    {pkg.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300 text-lg mb-6">
                    {pkg.description}
                  </CardDescription>

                  <div className="space-y-3">
                    <div className="flex flex-col items-center">
                      <div className="flex items-baseline space-x-2">
                        {verifiedDiscount ? (
                          <>
                            <span className="text-2xl font-bold text-gray-400 line-through">
                              {pkg.price}
                            </span>
                            <span className="text-4xl font-bold text-cyan-400">
                              {calculateDiscountedPrice(pkg.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-4xl font-bold text-white">
                            {pkg.price}
                          </span>
                        )}
                      </div>
                      <div className="text-gray-400 text-sm">Regular Price</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-baseline space-x-2">
                        {verifiedDiscount ? (
                          <>
                            <span className="text-xl font-bold text-gray-400 line-through">
                              {pkg.memberPrice}
                            </span>
                            <span className="text-3xl font-bold text-green-400">
                              {calculateDiscountedPrice(pkg.memberPrice)}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-3xl font-bold text-cyan-400">
                              {pkg.memberPrice}
                            </span>
                            <span className="text-gray-300">for Members</span>
                          </>
                        )}
                      </div>
                      {verifiedDiscount ? (
                        <Badge className="bg-green-500/20 text-green-400 mt-2">
                          Extra {verifiedDiscount.percentage}% off with code
                        </Badge>
                      ) : (
                        <Badge className="bg-green-500/20 text-green-400 mt-2">
                          Save {pkg.savings}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow justify-between space-y-6 pb-8">
                  <ul className="space-y-3 flex-grow">
                    {pkg.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => {
                      // Calculate final prices with discount
                      const regularPrice = pkg.price.replace(/[$,]/g, "");
                      const memberPrice = pkg.memberPrice.replace(/[$,]/g, "");
                      const finalRegularPrice = verifiedDiscount
                        ? calculateDiscountedPrice(pkg.price).replace(
                            /[$,]/g,
                            ""
                          )
                        : regularPrice;
                      const finalMemberPrice = verifiedDiscount
                        ? calculateDiscountedPrice(pkg.memberPrice).replace(
                            /[$,]/g,
                            ""
                          )
                        : memberPrice;

                      // Create cart item from the package
                      const cartItem = {
                        id: pkg.id,
                        name: pkg.name,
                        price: finalRegularPrice,
                        memberPrice: finalMemberPrice,
                        originalPrice: regularPrice,
                        originalMemberPrice: memberPrice,
                        description: pkg.description,
                        features: pkg.features,
                        type: "mentorship-package",
                        discountCode: verifiedDiscount?.code || null,
                        discountPercentage: verifiedDiscount?.percentage || 0,
                      };

                      // Save to localStorage
                      localStorage.setItem("cart", JSON.stringify([cartItem]));

                      // Navigate to checkout using Next.js router
                      router.push("/checkout");
                    }}
                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                      pkg.popular
                        ? "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg hover:shadow-yellow-500/25"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25"
                    }`}
                  >
                    {verifiedDiscount
                      ? "Add to basket with discount"
                      : "Add to basket"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
