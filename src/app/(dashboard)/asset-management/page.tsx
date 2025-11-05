"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingUp, Users, Award, Target, Heart, Building, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function AssetManagementPage() {
  const [showDisclosure, setShowDisclosure] = useState(false)

  const services = [
    {
      icon: Shield,
      title: "Fiduciary Duty",
      description: "We act in your best interest with complete transparency and legal obligation",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: TrendingUp,
      title: "Active Portfolio Management",
      description: "Dynamic portfolio management adapted to changing market conditions",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      icon: Users,
      title: "Personalized Wealth Planning",
      description: "Tailored investment strategies designed for your unique financial goals",
      gradient: "from-purple-500 to-pink-600",
    },
    {
      icon: Award,
      title: "Proven Expertise",
      description: "Years of experience in comprehensive wealth management and financial planning",
      gradient: "from-orange-500 to-red-600",
    },
  ]

  const specializations = [
    {
      icon: Building,
      title: "Estate Planning",
      description: "Comprehensive estate planning strategies to preserve and transfer wealth efficiently",
    },
    {
      icon: Heart,
      title: "Intergenerational Wealth Transfer",
      description: "Specialized guidance for passing wealth to future generations",
    },
    {
      icon: Target,
      title: "Reinvestment Strategy",
      description: "Strategic reinvestment approaches to maximize long-term growth potential",
    },
    {
      icon: TrendingUp,
      title: "Long-term Portfolio Growth",
      description: "Focus on sustainable, long-term portfolio growth and wealth preservation",
    },
  ]

  const comparisonData = [
    {
      category: "Legal Standard",
      eagleGuardian: "Fiduciary duty - legally required to act in your best interest, always.",
      traditional: "Suitability standard - recommendations must be 'suitable,' not necessarily best.",
    },
    {
      category: "Fee Structure",
      eagleGuardian: "Transparent, fee-only model with no hidden costs or commissions.",
      traditional: "Complex fee structures with commissions and potential conflicts of interest.",
    },
    {
      category: "Approach",
      eagleGuardian: "Long-term partnership focused on your financial success and peace of mind.",
      traditional: "Transaction-focused with emphasis on product sales over holistic planning.",
    },
  ]

  const complianceText =
    "Eagle Guardian Advisors LLC is a registered investment advisor. Registration does not imply a certain level of skill or training. All investment advisory services are provided in accordance with applicable federal and state regulations."

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-slate-900">
        <Header />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900 py-20 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-8">
                <img
                  src="/images/eagle-guardian-logo.png"
                  alt="Eagle Guardian Advisors Logo"
                  className="w-20 h-20 mr-4"
                />
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-white">Eagle Guardian Advisors</h1>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-green-400 font-semibold cursor-help underline decoration-dotted hover:text-green-300 transition-colors">
                        Registered Investment Advisor
                      </p>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-slate-800 border-slate-700 text-white max-w-xs p-3 shadow-lg rounded-md"
                    >
                      <div className="flex items-start">
                        <Info className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm">{complianceText}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Your Future.
                </span>
                <br />
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                  Protected.
                </span>
              </h2>

              <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">Built on integrity. Rooted in trust.</p>

              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <Link href="https://www.eagleguardianadvisors.com" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                      Visit Eagle Guardian Advisors
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDisclosure(true)}
                    className="text-gray-400 hover:text-white text-sm underline"
                  >
                    Partnership Disclosure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white">Our Mission</h2>
                  </div>
                  <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                    <p>
                      Eagle Guardian Advisors LLC specializes in personalized wealth management solutions, including
                      financial planning with a focus on estate planning, intergenerational wealth transfer,
                      reinvestment strategy, and long-term portfolio growth.
                    </p>
                    <p>
                      We serve clients seeking transparent, conflict-free advice and fiduciary management, particularly
                      clients from the baby boomer generation preparing to pass down wealth to future generations.
                    </p>
                  </div>

                  <div className="mt-8">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className="bg-green-500/20 text-green-400 px-4 py-2 text-sm font-semibold cursor-help hover:bg-green-500/30 transition-colors">
                          Texas State-Registered Investment Advisor
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-slate-800 border-slate-700 text-white max-w-xs p-3 shadow-lg rounded-md"
                      >
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{complianceText}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {specializations.map((spec, index) => (
                    <Card
                      key={index}
                      className="bg-slate-700/50 border-slate-600 hover:border-green-500/50 transition-all duration-300"
                    >
                      <CardHeader className="pb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3">
                          <spec.icon className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle className="text-white text-lg">{spec.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 text-sm">{spec.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Why Choose Eagle Guardian Advisors</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the difference of working with a true fiduciary committed to your financial success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 group"
                >
                  <CardHeader className="text-center pb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-xl group-hover:text-green-400 transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-center leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-20 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">The Eagle Guardian Difference</h2>
                <p className="text-xl text-gray-300">See how our fiduciary standard compares to traditional brokers</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Eagle Guardian Column */}
                <Card className="bg-transparent rounded-lg border text-card-foreground shadow-sm bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50">
                  <CardHeader className="text-center pb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Eagle Guardian</h3>
                        <p className="text-green-400 font-semibold">Fiduciary Standard</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-green-400 font-semibold">{item.category}</h4>
                        <p className="text-gray-300 text-sm leading-relaxed">{item.eagleGuardian}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Traditional Brokers Column */}
                <Card className="bg-slate-700/30 border-slate-600">
                  <CardHeader className="text-center pb-6">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center mr-3">
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-400">Traditional Brokers</h3>
                        <p className="text-gray-500 font-semibold">Suitability Standard</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {comparisonData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="text-gray-400 font-semibold">{item.category}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{item.traditional}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Philosophy */}
        <section className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-6">Our Investment Philosophy</h2>
                <p className="text-xl text-gray-300">
                  A comprehensive approach to wealth management built on proven principles
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-green-400 text-xl flex items-center">
                      <Target className="w-6 h-6 mr-3" />
                      Investment Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 leading-relaxed">
                    <p>
                      Our investment approach combines fundamental analysis with comprehensive financial planning,
                      focusing on long-term wealth preservation and growth while managing downside risk through
                      diversified portfolio construction.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-green-400 text-xl flex items-center">
                      <Users className="w-6 h-6 mr-3" />
                      Client-Centric Focus
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 leading-relaxed">
                    <p>
                      We build personalized portfolios tailored to your risk tolerance, time horizon, and financial
                      objectives, with special expertise in serving baby boomers planning intergenerational wealth
                      transfer.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Protect Your Future?</h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Contact Eagle Guardian Advisors to learn more about our comprehensive wealth management services and
                schedule a consultation to discuss your financial goals.
              </p>
              <div className="flex flex-col items-center gap-4">
                <Link href="https://www.eagleguardianadvisors.com" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                    Visit Eagle Guardian Advisors
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDisclosure(true)}
                  className="text-gray-400 hover:text-white text-sm underline"
                >
                  Partnership Disclosure
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Eagle Relationship Disclosure */}
        <section className="py-16 bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-lg">🔎</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Eagle Relationship Disclosure</h2>
                </div>

                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    <strong className="text-white">Eagle Investors LLC</strong> and{" "}
                    <strong className="text-white">Eagle Guardian Advisors LLC</strong> are affiliated but legally
                    distinct entities under common ownership.
                  </p>

                  <p>
                    <strong className="text-cyan-400">Eagle Investors LLC</strong> is an education and advisory platform
                    providing investment-related content, trading alerts, community access, and mentorship. It is not a
                    registered investment advisor and does not provide personalized investment advice.
                  </p>

                  <p>
                    <strong className="text-green-400">Eagle Guardian Advisors LLC</strong> is a{" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-green-400 cursor-help underline decoration-dotted">
                          Texas state-registered investment adviser (RIA)
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-slate-700 border-slate-600 text-white max-w-sm p-4">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 mr-2 text-blue-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm">{complianceText}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>{" "}
                    providing fiduciary portfolio management and financial planning services to clients. It is
                    independently registered and adheres to fiduciary obligations under state law.
                  </p>

                  <p>
                    Both firms are majority-owned and operated by the same individuals, including{" "}
                    <strong className="text-white">Ishaan Sandhir & Maikel Den Hertog</strong>, who serve in a
                    leadership capacity across both entities. However,{" "}
                    <strong className="text-yellow-400">
                      no referral fees, commissions, or compensation arrangements exist between Eagle Investors and
                      Eagle Guardian Advisors for client referrals or engagements.
                    </strong>
                  </p>

                  <p>
                    All portfolio management services are offered solely through Eagle Guardian Advisors LLC, and
                    custody of client assets is held at independent custodians, including{" "}
                    <strong className="text-white">
                      Charles Schwab, Interactive Brokers, or other qualified custodians.
                    </strong>
                  </p>

                  <div className="bg-slate-900/50 rounded-lg p-6 mt-6">
                    <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                      Key Disclosures from Eagle Guardian's Brochure:
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>
                          Eagle Guardian does not accept compensation for the sale of securities or other investment
                          products.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Clients are never obligated to engage Eagle Guardian after being referred.</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>
                          Eagle Guardian may recommend estate planning services (including POAs), insurance
                          professionals, or tax professionals; such services are separate from investment advisory
                          services and always optional.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>
                          Fees are fully disclosed and may be based on flat fees or assets under management (AUM) as
                          agreed upon with each client.
                        </span>
                      </li>
                    </ul>

                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg">
                      <p className="text-blue-300 font-semibold">
                        For full details, see Eagle Guardian's most recent Form ADV Part 2A at:{" "}
                        <a
                          href="https://eagleguardianadvisors.com/disclosures"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 underline"
                        >
                          eagleguardianadvisors.com/disclosures
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        {/* Partnership Disclosure Modal */}
        <Dialog open={showDisclosure} onOpenChange={setShowDisclosure}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                Partnership Disclosure
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-gray-300">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <p className="text-yellow-300 font-semibold mb-2">Important Disclosure:</p>
                <p className="text-sm">
                  Eagle Investors LLC and Eagle Guardian Advisors LLC are affiliated entities under common ownership.
                  This referral is made in accordance with applicable securities regulations.
                </p>
              </div>

              <div className="space-y-3 text-sm">
                <p>
                  <strong className="text-white">Eagle Investors LLC</strong> is an educational platform and is not a
                  registered investment advisor.
                </p>
                <p>
                  <strong className="text-green-400">Eagle Guardian Advisors LLC</strong> is a Texas state-registered
                  investment adviser providing fiduciary portfolio management services.
                </p>
                <p>
                  <strong className="text-cyan-400">No Compensation:</strong> Eagle Investors receives no referral fees,
                  commissions, or other compensation from Eagle Guardian Advisors for client referrals.
                </p>
                <p>
                  <strong className="text-white">Your Choice:</strong> You are under no obligation to engage Eagle
                  Guardian Advisors' services, and you may work with any investment advisor of your choosing.
                </p>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-4 mt-4">
                <p className="text-xs text-gray-400">
                  For complete details about this relationship and Eagle Guardian's services, fees, and conflicts of
                  interest, please review the full disclosure section below and Eagle Guardian's Form ADV Part 2A
                  available at
                  <a
                    href="https://eagleguardianadvisors.com/disclosures"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline ml-1"
                  >
                    eagleguardianadvisors.com/disclosures
                  </a>
                  .
                </p>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setShowDisclosure(false)} className="bg-green-500 hover:bg-green-600 text-white">
                  I Understand
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
