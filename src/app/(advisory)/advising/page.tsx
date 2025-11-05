"use client";

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, MessageCircle, TrendingUp, Star } from "lucide-react"
import { MentorshipPackages } from "@/components/mentorship/mentorship-packages-dynamic"
import { useRouter } from "next/navigation"

export default function AdvisingPage() {
  const router = useRouter();

  const advisingServices = [
    {
      icon: Users,
      title: "Personal Trading Coach",
      description: "One-on-one sessions with experienced trading professionals",
      features: ["Personalized trading strategy", "Risk assessment", "Performance review", "Goal setting"],
    },
    {
      icon: Calendar,
      title: "Scheduled Consultations",
      description: "Regular meetings to track progress and adjust strategies",
      features: ["Weekly/monthly sessions", "Flexible scheduling", "Progress tracking", "Strategy refinement"],
    },
    {
      icon: MessageCircle,
      title: "Direct Communication",
      description: "Direct access to advisors for immediate guidance",
      features: ["Priority support", "Quick responses", "Market insights", "Trade validation"],
    },
    {
      icon: TrendingUp,
      title: "Portfolio Analysis",
      description: "Comprehensive review of your trading performance",
      features: ["Performance metrics", "Risk analysis", "Optimization suggestions", "Diversification advice"],
    },
  ]

  const mentorshipAreas = [
    "Investing - Active & Passive Investing",
    "Day Trading & Scalping - Active Trading",
    "Swing Trading (Options, Stocks and More) - Active Trading",
    "Buying Option Premium - Intraday, Multi-Day & Leaps",
    "Selling Premium & Multi-Leg Option Strategies - Speculation + Hedging",
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-6 py-3 mb-6">
            <Star className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold uppercase tracking-wide text-sm">
              1 ON 1 ADVISING PACKAGES
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              1 on 1 Sessions
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Investment Advice
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Trading Advice
            </span>
          </h1>

          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Ishaan is a seasoned professional with an eleven-year track record in stock and commodities markets. He
              believes that thorough research, technical analysis and thoughtful trading are the key skills needed to
              become a successful investor. Ishaan's expertise spans various sectors and strategies:
            </p>

            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50">
              <h3 className="text-2xl font-semibold text-white mb-6">Mentorships:</h3>
              <div className="space-y-3">
                {mentorshipAreas.map((area, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                    <span className="text-gray-300 text-lg">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Mentorship Packages */}
        <MentorshipPackages />

        {/* Additional Services */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Advisory Services</h2>
            <p className="text-xl text-gray-300">Comprehensive support for your investment journey</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {advisingServices.map((service, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-gray-300">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-600/50 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Trading?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Take your investment skills to the next level with personalized 1-on-1 mentorship from our experienced
            professionals. Choose the package that fits your goals and start your journey today.
          </p>
          <div className="flex justify-center">
            <Button 
              onClick={() => router.push('/login')}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              Join Our Platform
            </Button>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-12 bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <p className="text-gray-400 text-sm text-center">
            <strong className="text-white">Investment Advisory Disclosure:</strong> All mentorship and advisory services
            involve risk and may not be suitable for all investors. Past performance does not guarantee future results.
            Please review our{" "}
            <a href="/disclosures" className="text-cyan-400 hover:text-cyan-300 underline">
              disclosures
            </a>{" "}
            before engaging our services.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
