"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, TrendingUp, Gem, CheckCircle, Star } from "lucide-react"
import { useRouter } from "next/navigation"

export function MentorshipPackages() {
  const router = useRouter();

  const mentorshipPackages = [
    {
      name: "Eagle Ultimate",
      price: "$2,497",
      memberPrice: "$1,827",
      description: "Comprehensive 8-hour mentorship program with premium access",
      icon: Crown,
      gradient: "from-yellow-500 to-orange-600",
      features: [
        "8 Hours of 1-on-1 Sessions",
        "1 Year Diamond ($1,164 value)",
        "All Inclusive Package",
        "8 Hours of Trading Tutor OR 8 Hours of Advising",
        "Personalized strategy development",
        "Complete portfolio review",
        "Advanced risk management techniques",
        "Long-term mentorship relationship",
      ],
      popular: true,
      savings: "$1,164",
    },
    {
      name: "Investment Advising",
      price: "$987",
      memberPrice: "$786",
      description: "Focus on long-term investment strategies and portfolio building",
      icon: TrendingUp,
      gradient: "from-green-500 to-emerald-600",
      features: [
        "3 Hours of 1-on-1 Sessions",
        "3 Months Diamond",
        "Setup Tax Advantaged Account",
        "Learn How To Invest",
        "Financial Plan Creation",
        "Portfolio optimization strategies",
        "Tax-efficient investing guidance",
        "Retirement planning assistance",
      ],
      popular: false,
      savings: "$201",
    },
    {
      name: "Trading Tutor",
      price: "$987",
      memberPrice: "$786",
      description: "Master active trading strategies and market timing",
      icon: Gem,
      gradient: "from-blue-500 to-purple-600",
      features: [
        "3 Hours of 1-on-1 Sessions",
        "3 Months Diamond",
        "Learn to day trade/swing trade + options trade",
        "Tune your trading strategy",
        "Risk management for active trading",
        "Technical analysis mastery",
        "Entry and exit timing strategies",
        "Psychology of trading",
      ],
      popular: false,
      savings: "$201",
    },
  ]

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold uppercase tracking-wide text-sm">1 ON 1 MENTORSHIP</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Personalized</span>
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
                className={`relative my-box2  ${pkg.popular ? "ring-2 ring-yellow-400/50 shadow-2xl shadow-yellow-500/20" : ""
                  }`}
              >
                <CardHeader className="text-center pb-8 pt-12">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${pkg.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <pkg.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-white mb-2">{pkg.name}</CardTitle>
                  <CardDescription className="text-gray-300 text-lg mb-6">{pkg.description}</CardDescription>

                  <div className="space-y-3">
                    <div className="flex flex-col items-center">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-bold text-white">{pkg.price}</span>
                      </div>
                      <div className="text-gray-400 text-sm">Regular Price</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold text-cyan-400">{pkg.memberPrice}</span>
                        <span className="text-gray-300">for Members</span>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400 mt-2">
                        Save {typeof pkg.savings === 'number' ? `$${pkg.savings}` : pkg.savings || '$0'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col flex-grow justify-between space-y-6 pb-8">
                  <ul className="space-y-3 flex-grow">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-300 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={() => {
                      // Create cart item from the package
                      const cartItem = {
                        id: pkg.name.toLowerCase().replace(/\s+/g, '-'),
                        name: pkg.name,
                        price: pkg.price.replace('$', ''),
                        memberPrice: pkg.memberPrice.replace('$', ''),
                        description: pkg.description,
                        features: pkg.features,
                        type: "mentorship-package"
                      };

                      // Save to localStorage
                      localStorage.setItem('cart', JSON.stringify([cartItem]));

                      // Navigate to checkout using Next.js router
                      router.push('/checkout');
                    }}
                    className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-300 ${pkg.popular
                        ? "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white shadow-lg hover:shadow-yellow-500/25"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg hover:shadow-cyan-500/25"
                      }`}
                  >
                    Add to basket
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
