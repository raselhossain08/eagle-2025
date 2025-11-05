import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TrendingUp, Bell, Headphones, Zap, Shield, Target, Brain, Calendar } from "lucide-react"
import { DisclosureTooltip } from "./disclosure-tooltip"

const features = [
  {
    icon: TrendingUp,
    title: "Institutional Flow Analysis",
    description: "Track large-scale trading patterns and institutional activity with professional-grade analytics.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Brain,
    title: "Quantitative Research",
    description: "Advanced algorithms analyze market patterns to identify potential trading opportunities.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Curated Market Alerts",
    description: "Receive notifications when market conditions align with predetermined criteria and strategies.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    title: "Risk Management Tools",
    description: "Professional-grade tools designed to help assess and manage portfolio risk exposure.",
    gradient: "from-blue-500 to-cyan-500",
  },
]

const stats = [
  { label: "Years in Business", value: "5+", icon: Calendar },
  { label: "Daily Alerts", value: "25+", icon: Zap },
  { label: "Response Time", value: "<2min", icon: Bell },
  { label: "Advisory Support", value: "24/7", icon: Headphones },
]

export function Features() {
  return (
    <section className="relative bg-slate-800 py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full px-6 py-3 mb-6">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-semibold uppercase tracking-wide text-sm">Advisory Services</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Professional Investment
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Advisory Services
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access{" "}
            <DisclosureTooltip
              trigger="institutional-grade research"
              content="Refers to tools and services designed to support experienced investors. These features do not guarantee superior results."
            />{" "}
            and analysis tools designed to help inform your investment decisions in today's dynamic markets.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/50 text-center group hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/50 h-full hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                {(feature.title.includes("professional-grade") || feature.title.includes("Professional")) && (
                  <p className="text-gray-400 text-xs mt-3 italic">
                    Refers to tools and services designed to support experienced investors. These features do not
                    guarantee superior results.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-600/50">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Enhance Your Investment Strategy?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join clients who rely on Eagle Investors for professional investment services and market intelligence.
              Start free today.
            </p>
            <Link href="https://pe333tij.sibpages.com" target="_blank">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                Start Free with Eagle Basic
              </Button>
            </Link>
          </div>
        </div>

        {/* Compliance Notice */}
        <div className="mt-12 bg-slate-900/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
          <p className="text-gray-400 text-sm text-center">
            <strong className="text-white">Advisory Services Disclosure:</strong> Investment advisory services are
            provided by Eagle Investors LLC, a registered investment advisor. All{" "}
            <DisclosureTooltip
              trigger="performance data"
              content="Performance data presented is for informational purposes only and represents past performance, which does not guarantee future results. Individual client results may vary based on market conditions, investment objectives, and risk tolerance. All investments carry risk of loss."
            />{" "}
            and market analysis are based on historical information and current market conditions, which may change.
          </p>
        </div>
      </div>
    </section>
  )
}
