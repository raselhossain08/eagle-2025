import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PricingTiers } from "@/components/pricing/pricing-tiers-dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, InfinityIcon } from "lucide-react" // Added InfinityIcon

export default function PricingPage() {
  const infinityFeatures = [
    "Advanced market screening (20-25 securities daily)",
    "Professional Quant Trading Script Access via TradingView",
    "Direct Infinity Advisory Tickets for personalized support",
    "Bi-weekly Eagle Portfolios Review Stream (Recorded)",
    "Priority Challenge SMS Alerts for time-sensitive opportunities",
    "AI Advisor (Enhanced) with advanced market intelligence",
    "Complete education library with video archive access",
    "Custom analysis tools and chart level indicators",
    "VIP advisory support with priority response times",
    "Exclusive Infinity Discord channels and community access",
    "Private Infinity trading chat room",
    "Infinity challenge participation and trading competitions",
    "24/7 market monitoring and alert system",
  ]

  const diamondFeatures = [
    "Stock Trades Entry & Exit Alerts",
    "AI Advisor",
    "Option Day Trade Alerts",
    "Option Swing Trades Alerts",
    "24/7 Chat Room (Diamond Chat)",
    "Daily Live Trading Stream (Every Market Day)",
    "Investment Recommendations",
    "Daily & Weekly Watchlists",
    "Unusual Options Activity Cheat Sheet",
    "AI Stock Breakouts",
    "Analyst Grades & Insider Orders",
    "Darkpool and Scalp Ideas",
    "Small account challenges",
    "Custom notifications for key market events",
    "Priority customer support",
    "Access to exclusive trading webinars",
    "Community access to Diamond members",
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Trading Plan</h1>
          <p className="text-xl text-gray-300 mb-8">
            Select the perfect plan to match your trading goals and experience level
          </p>
        </div>
        <PricingTiers /> {/* This will now render the updated Infinity tier */}
        <div className="mt-20 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-8">Detailed Plan Features</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-400">Diamond Plan Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {diamondFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Updated Infinity Plan Card on Pricing Page */}
            <Card className="infinity-card">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center">
                    <InfinityIcon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-3xl text-yellow-400">Infinity Plan Features</CardTitle>
                </div>
                <p className="text-gray-300">Everything in Diamond, plus:</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {infinityFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-300">
                        {feature}
                        {(feature.includes("Advanced market screening") ||
                          feature.includes("VIP advisory support") ||
                          feature.includes("Custom analysis tools")) && (
                          <span className="block text-gray-400 text-xs mt-1 italic">
                            Refers to tools and services designed to support experienced investors. These features do
                            not guarantee superior results.
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-16 bg-slate-800 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Plan is Right for You?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Our team can help you choose the perfect plan based on your trading experience, goals, and budget. Join our
            platform to get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://pe333tij.sibpages.com"
              target="_blank"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-md font-semibold transition-colors"
              rel="noreferrer"
            >
              Join Our Platform
            </a>
            <a
              href="https://pe333tij.sibpages.com"
              target="_blank"
              className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-md font-semibold transition-colors"
              rel="noreferrer"
            >
              Start with Basic (Free)
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
