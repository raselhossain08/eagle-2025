"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown, TrendingUp, Gem, CheckCircle, Star, Users, Target, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import PlanService, { FrontendPlan } from "@/lib/services/core/plan.service";

// Icon mapping for mentorship packages
const iconMap = {
  crown: Crown,
  trending: TrendingUp,
  trendingup: TrendingUp,
  gem: Gem,
  diamond: Gem,
  star: Star,
  users: Users,
  target: Target,
  book: BookOpen,
  ultimate: Crown,
  advising: TrendingUp,
  trading: Gem,
  tutor: BookOpen,
};

export function MentorshipPackages() {
  const [packages, setPackages] = useState<FrontendPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Load mentorship packages from the API
  useEffect(() => {
    const loadPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const mentorshipPlans = await PlanService.getMentorshipPlans();
        
        // Sort packages by sortOrder and ensure they're active
        const activePackages = mentorshipPlans
          .filter(plan => plan.isActive)
          .sort((a, b) => a.sortOrder - b.sortOrder);
        
        setPackages(activePackages);
      } catch (err: any) {
        console.error('Error loading mentorship packages:', err);
        setError('Failed to load mentorship packages. Please try again later.');
        setPackages([]);
      } finally {
        setLoading(false);
      }
    };

    loadPackages();
  }, []);

  // Get package icon
  const getPackageIcon = (pkg: FrontendPlan) => {
    const iconName = pkg.ui.icon?.toLowerCase() || 
                   pkg.name.toLowerCase().replace(/\s+/g, '') ||
                   'star';
    return iconMap[iconName as keyof typeof iconMap] || Star;
  };

  // Get package pricing
  const getPackagePrice = (pkg: FrontendPlan) => {
    if (pkg.pricing.oneTime) {
      return pkg.pricing.oneTime.price;
    }
    if (pkg.pricing.monthly) {
      return pkg.pricing.monthly.price;
    }
    if (pkg.pricing.annual) {
      return pkg.pricing.annual.price;
    }
    return 0;
  };

  const getPackageMemberPrice = (pkg: FrontendPlan) => {
    return pkg.pricing.oneTime?.memberPrice || getPackagePrice(pkg);
  };

  const getPackageOriginalPrice = (pkg: FrontendPlan) => {
    if (pkg.pricing.oneTime?.originalPrice) {
      return pkg.pricing.oneTime.originalPrice;
    }
    if (pkg.pricing.monthly?.originalPrice) {
      return pkg.pricing.monthly.originalPrice;
    }
    if (pkg.pricing.annual?.originalPrice) {
      return pkg.pricing.annual.originalPrice;
    }
    return null;
  };

  const calculateSavings = (pkg: FrontendPlan) => {
    const memberPrice = getPackageMemberPrice(pkg);
    const originalPrice = getPackageOriginalPrice(pkg);
    
    if (!originalPrice || originalPrice <= memberPrice) return null;
    
    return originalPrice - memberPrice;
  };

  // Handle package purchase
  const handlePackagePurchase = (pkg: FrontendPlan) => {
    const price = getPackagePrice(pkg);
    const memberPrice = getPackageMemberPrice(pkg);
    
    // Create cart item from the package
    const cartItem = {
      id: pkg._id,
      name: pkg.displayName,
      price: price.toString(),
      memberPrice: memberPrice.toString(),
      description: pkg.description,
      features: pkg.features,
      type: "mentorship-package",
      productType: pkg.name.toLowerCase().replace(/\s+/g, '-'),
    };
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify([cartItem]));
    
    // Navigate to checkout
    router.push('/checkout');
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Loading Mentorship Programs...
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <Card className="my-box2 h-96">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-slate-700 rounded-2xl mx-auto mb-6"></div>
                    <div className="h-8 bg-slate-700 rounded mb-4"></div>
                    <div className="h-4 bg-slate-700 rounded mb-8"></div>
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="h-4 bg-slate-700 rounded"></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-300 mb-8">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // No packages available
  if (packages.length === 0) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">No Mentorship Programs Available</h2>
            <p className="text-gray-300">Please check back later for our mentorship packages.</p>
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
            Take your investment skills to the next level with personalized 1-on-1 mentorship from our experienced
            professionals. Choose the perfect program for your investment journey.
          </p>
        </div>

        {/* Mentorship Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {packages.map((pkg, index) => {
            const PackageIcon = getPackageIcon(pkg);
            const price = getPackagePrice(pkg);
            const memberPrice = getPackageMemberPrice(pkg);
            const originalPrice = getPackageOriginalPrice(pkg);
            const savings = calculateSavings(pkg);
            const isPopular = pkg.isPopular || pkg.isFeatured;
            
            return (
              <div key={pkg._id} className="relative group">
                {isPopular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {pkg.ui.badgeText || 'Most Comprehensive'}
                    </div>
                  </div>
                )}

                <Card
                  className={`relative my-box2 ${
                    isPopular ? "ring-2 ring-yellow-400/50 shadow-2xl shadow-yellow-500/20" : ""
                  }`}
                >
                  <CardHeader className="text-center pb-8 pt-12">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${pkg.ui.gradient || 'from-cyan-500 to-blue-600'} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <PackageIcon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-white mb-2">
                      {pkg.displayName}
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg mb-6">
                      {pkg.description}
                    </CardDescription>

                    <div className="space-y-3">
                      {/* Original/Regular Price */}
                      {originalPrice && (
                        <div className="flex flex-col items-center">
                          <div className="flex items-baseline space-x-2">
                            <span className="text-4xl font-bold text-white">
                              ${originalPrice}
                            </span>
                          </div>
                          <div className="text-gray-400 text-sm">Regular Price</div>
                        </div>
                      )}

                      {/* Member Price */}
                      <div className="flex flex-col items-center">
                        <div className="flex items-baseline space-x-2">
                          <span className={`text-3xl font-bold ${isPopular ? 'text-yellow-400' : 'text-cyan-400'}`}>
                            ${memberPrice}
                          </span>
                          {memberPrice !== price && (
                            <span className="text-gray-300">for Members</span>
                          )}
                        </div>
                        {savings && savings > 0 && (
                          <Badge className="bg-green-500/20 text-green-400 mt-2">
                            Save ${savings}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow justify-between space-y-6 pb-8">
                    <ul className="space-y-3 flex-grow">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <div className={`w-6 h-6 bg-gradient-to-br ${
                            isPopular 
                              ? 'from-yellow-500 to-orange-600' 
                              : 'from-cyan-500 to-blue-600'
                          } rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-300 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handlePackagePurchase(pkg)}
                      className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${
                        isPopular
                          ? "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg hover:shadow-yellow-500/25"
                          : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25"
                      }`}
                    >
                      Add to basket
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
