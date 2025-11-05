"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  UserCheck,
  Crown,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { mentorshipPackages } from "@/lib/data/diamond.data";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

export default function PrivateSessionsPage() {
  const router = useRouter();

  const handleAddToBasket = (pkg: any) => {
    // Create cart item for this mentorship package
    const cartItem = {
      id: `mentorship-${pkg.id}`,
      name: pkg.name,
      price: pkg.memberPrice,
      type: "mentorship-package",
      description: pkg.description,
      features: pkg.features,
      originalPrice: pkg.regularPrice,
      savings: pkg.savings,
    };

    // Store in localStorage
    localStorage.setItem("cart", JSON.stringify([cartItem]));

    toast({
      title: "Added to basket!",
      description: `${pkg.name} has been added to your cart.`,
    });

    // Navigate to checkout
    router.push("/checkout");
  };
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-bg-light via-brand-bg-dark to-brand-bg-light border border-brand-border shadow-glow-cyan">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-cyan/10" />
        <div className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center shadow-glow-cyan">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-white">
                Private Sessions
              </h1>
              <p className="text-brand-cyan font-semibold text-lg">
                Personalized Investment Mentorship
              </p>
            </div>
          </div>
          <p className="text-gray-300 max-w-3xl mb-8">
            Take your investment journey to the next level with our exclusive
            one-on-one mentorship programs. Get personalized guidance from our
            expert advisors and accelerate your path to financial success.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/hub/diamond/private-sessions/dashboard">
              <Button className="bg-gradient-to-r from-brand-primary to-brand-cyan hover:from-brand-primary/90 hover:to-brand-cyan/90 text-white font-semibold shadow-glow-cyan transition-all duration-200 hover:scale-105">
                View Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mentorship Packages Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Mentorship Packages
        </h2>
        <p className="text-gray-400 text-lg">
          Choose the perfect mentorship program for your investment journey
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {mentorshipPackages.map((pkg) => (
          <Card
            key={pkg.id}
            className={cn(
              "bg-brand-bg-light flex flex-col relative transition-all duration-300 hover:scale-105",
              pkg.borderColor,
              "border-2",
              pkg.glowClass
            )}
          >
            {pkg.badge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div
                  className={cn(
                    "px-4 py-1 rounded-full text-sm font-bold shadow-glow-yellow",
                    pkg.badgeColor === "orange"
                      ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                      : "bg-brand-cyan text-white"
                  )}
                >
                  {pkg.badge}
                </div>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center",
                  pkg.iconBg
                )}
              >
                <span className="text-2xl">{pkg.icon}</span>
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                {pkg.name}
              </CardTitle>
              <CardDescription className="text-gray-400 text-sm px-2">
                {pkg.description}
              </CardDescription>
              <div className="pt-4">
                <div className="text-lg text-gray-500 line-through">
                  ${pkg.regularPrice.toLocaleString()}
                </div>
                <div className="text-4xl font-bold text-brand-cyan">
                  ${pkg.memberPrice.toLocaleString()}
                  <span className="text-lg font-normal text-gray-400">
                    {" "}
                    for Members
                  </span>
                </div>
                <div className="text-brand-green text-sm font-semibold mt-1">
                  Save ${(pkg.savings || 0).toLocaleString()}
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-grow px-6">
              <ul className="space-y-3">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-cyan mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="pt-6">
              <Button
                onClick={() => handleAddToBasket(pkg)}
                className={cn(
                  "w-full text-white font-bold transition-all duration-200 hover:scale-105",
                  pkg.buttonColor
                )}
              >
                Add to basket
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Additional Info Section - Updated Content */}
      <div className="bg-brand-bg-light rounded-2xl p-8 border border-brand-border">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Why Choose Private Sessions?
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Our private mentorship sessions provide personalized guidance
            tailored to your specific investment goals and risk tolerance. Work
            directly with our expert advisors to develop strategies that align
            with your financial objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-cyan flex items-center justify-center mx-auto mb-4 shadow-glow-cyan">
              <UserCheck className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Personalized Approach
            </h4>
            <p className="text-gray-400 text-sm">
              Every session is tailored to your unique financial situation and
              investment goals.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-green to-green-600 flex items-center justify-center mx-auto mb-4 shadow-glow-blue">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Educational Support
            </h4>
            <p className="text-gray-400 text-sm">
              Our mentorship sessions are designed to support personalized
              investment education and strategy development*
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-glow-yellow">
              <Crown className="w-8 h-8 text-black" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">
              Expert Guidance
            </h4>
            <p className="text-gray-400 text-sm">
              Learn from seasoned professionals with decades of combined
              investment experience.
            </p>
          </div>
        </div>
      </div>

      {/* SEC Compliance Disclaimer */}
      <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-black text-sm font-bold">*</span>
          </div>
          <div>
            <h4 className="text-yellow-400 font-semibold mb-2">
              Important Disclaimer
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              *Results from mentorship programs may vary significantly between
              individuals. Past client experiences are not indicative of future
              results. Eagle Investors makes no guarantee of investment success
              or profitability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
