import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, Users, Scale, AlertTriangle, Bot, HardDrive, Eye } from "lucide-react"
import Link from "next/link"

export default function DisclosuresPage() {
  const disclosureButtons = [
    {
      title: "ADV Part 2A & 2B",
      description: "Form ADV disclosure brochure and brochure supplement",
      icon: FileText,
      href: "/disclosures/adv-part-2a",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information",
      icon: Eye,
      href: "/disclosures/privacy-policy",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Code of Ethics",
      description: "Our ethical standards and professional conduct guidelines",
      icon: Scale,
      href: "/disclosures/code-of-ethics",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Cybersecurity Policy",
      description: "Information security measures and data protection protocols",
      icon: Shield,
      href: "/disclosures/cybersecurity-policy",
      color: "from-red-500 to-orange-500",
    },
    {
      title: "Terms & Conditions",
      description: "Legal terms governing the use of our services and platform",
      icon: FileText,
      href: "/disclosures/terms-conditions",
      color: "from-indigo-500 to-blue-500",
    },
    {
      title: "Client Relationship Summary (Form CRS)",
      description: "Summary of our services, fees, and conflicts of interest",
      icon: Users,
      href: "/disclosures/form-crs",
      color: "from-cyan-500 to-teal-500",
    },
    {
      title: "Testimonials Disclosure",
      description: "Important information about client testimonials and reviews",
      icon: AlertTriangle,
      href: "/disclosures/testimonials",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "AI Advisor Disclosure",
      description: "Information about artificial intelligence tools and limitations",
      icon: Bot,
      href: "/disclosures/ai-advisor",
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Disaster Recovery Plan",
      description: "Business continuity and disaster recovery procedures",
      icon: HardDrive,
      href: "/disclosures/disaster-recovery",
      color: "from-slate-500 to-gray-600",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Legal Disclosures</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Important legal information, regulatory disclosures, and policies governing our investment advisory
              services
            </p>
          </div>

          {/* Disclosure Buttons Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {disclosureButtons.map((item, index) => (
              <Link key={index} href={item.href}>
                <Card className="bg-slate-800 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 h-full group">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white text-lg group-hover:text-cyan-400 transition-colors duration-300">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Main Disclosure Content */}
          <div className="space-y-8">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">Investment Advisory Services</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p className="text-lg font-semibold text-white">
                  Investment Advisory Services offered through Eagle Investors, LLC, a Registered Investment Adviser.
                </p>
                <p>
                  Eagle Investors, LLC ("Eagle Investors," "Eagle," or "Adviser") is a registered investment adviser
                  with its principal place of business in the State of Indiana. Eagle Investors may only transact
                  business in those states in which it is registered or qualifies for an exemption or exclusion from
                  such requirements; Eagle Investors is in compliance with such requirements.
                </p>
                <p>
                  Eagle Investor's website is limited to the dissemination of general information pertaining to its
                  services, together with access to additional investment-related information, publications, and links.
                  The information available on this web site should not be construed as tax, accounting or legal advice.
                  Any subsequent, direct communication by Eagle Investors LLC with a prospective client shall be
                  conducted by an investment adviser representative that is either registered or qualifies for an
                  exemption or exclusion from registration in the state where the prospective client resides. Please
                  contact Eagle for information pertaining to its registration status. A copy of Eagle Investor's
                  current disclosure brochure discussing its business operations, services, and fees is available from
                  Eagle Investors LLC upon written request or at{" "}
                  <Link
                    href="https://adviserinfo.sec.gov/firm/summary/316259"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://adviserinfo.sec.gov/firm/summary/316259
                  </Link>
                  .
                </p>
                <p>
                  To the extent that any client or prospective client utilizes any economic calculator or similar device
                  contained within or linked to Adviser's web site, the client and/or prospective client acknowledges
                  and understands that the information resulting from the use of any such calculator/device, is not, and
                  should not be construed, in any manner whatsoever, as the receipt of, or a substitute for,
                  personalized individual advice from Adviser, or from any other investment professional.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Website Content and Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Certain portions of Eagle Investor's website (i.e. articles, commentaries, etc.) may contain a
                  discussion of, and/or provide access to, its (and those of other investment and non-investment
                  professionals, including unaffiliated third parties) prior positions and/or general recommendations.
                  Due to various factors, including changing market conditions, such discussion may no longer be
                  reflective of current position(s) and/or recommendation(s). Eagle Investors does not make any
                  representations or warranties as to the accuracy, timeliness, suitability, completeness, or relevance
                  of any information, whether linked to its web site or incorporated herein, and takes no responsibility
                  therefore. All such information is provided solely for convenience purposes only and all users thereof
                  should be guided accordingly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Testimonials and Reviews</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  All Discord Reviews, Testimonials and Google Reviews to which Eagle Investors has responded represent
                  testimonials provided by current or past Eagle Investors clients. No compensation, either direct or
                  indirect, was received in exchange for the testimonial, and there are no known additional conflicts of
                  interest between Eagle Investors LLC and the individual. None of the information provided in reviews
                  or testimonials should be construed as legal or investment advice or a recommendation of any
                  particular security or strategy. For additional information about the firm, including our Form ADV
                  Part 2A and any relevant conflicts of interest that may exist, please visit{" "}
                  <Link
                    href="https://adviserinfo.sec.gov"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://adviserinfo.sec.gov
                  </Link>{" "}
                  or contact us at info@eagle-investors.com
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Performance and Risk Disclaimers</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Past performance may not be indicative of future results. Therefore, no current or prospective client
                  should assume that future performance of any specific investment or investment strategy (including the
                  investments and/or investment strategies recommended or undertaken by Adviser) made reference to
                  directly or indirectly by Adviser in its web site, or indirectly via a link to an unaffiliated third
                  party web site, will be profitable or equal the corresponding indicated performance level(s).
                  Different types of investments involve varying degrees of risk, and there can be no assurance that any
                  specific investment will either be suitable or profitable for a client or prospective client's
                  investment portfolio. Historical performance results for investment indices and/or categories
                  generally do not reflect the deduction of transaction and/or custodial charges, the deduction of an
                  investment management fee, nor the impact of taxes, the incurrence of which would have the effect of
                  decreasing historical performance results.
                </p>
                <p>
                  Each client and prospective client agrees, as a condition precedent to his/her/its access to Adviser's
                  web site, to release and hold harmless Adviser, its officers, directors, owners, employees and agents
                  from any and all adverse consequences resulting from any of his/her/its actions and/or omissions which
                  are independent of his/her/its receipt of personalized individual advice from Adviser.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Advisor Positions</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  It's important to note that advisors at Eagle Investors LLC, who may be providing investment advice or
                  making alerts on the Eagle Investors platforms, may or may not have positions in the securities
                  discussed. The fact that an advisor holds a position in a security does not necessarily indicate that
                  the advice provided is influenced by their own positions. Advisors are subject to the same compliance
                  and ethical guidelines that apply to all RIA professionals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Paper or Simulated Trades</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Eagle Investors LLC employs the use of paper/simulated trading accounts to test, demonstrate and
                  recommend trades, investments and investment strategies on the Discord Server. Specifically, the
                  Ishaan, Stock Trades, Swings, Day Trades and Diamond Chat channels may contain recommendations issued
                  after the execution of a simulated trade. These simulated trades are intended for educational and
                  illustrative purposes and can also be interpreted as actual trading and investment recommendations.
                  Clients should exercise caution and consider the inherent limitations of simulated trading when
                  evaluating the potential outcomes of the strategies and recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Fiduciary Duty</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Eagle Investors is obligated to advise in the best interest of the client and owes its clients a duty
                  of undivided loyalty and utmost good faith. The Investor is solely responsible for any losses, damages
                  or costs from their use or reliance on data and/or content that Eagle Investors and its related
                  parties may provide in connection with the use of this platform. Eagle Investors is not responsible
                  for any investment losses incurred by any persons who have access to this platform. Nothing in these
                  terms limits or excludes any liability to the extent contrary to applicable laws or regulations. Under
                  no circumstances shall Eagle Investors and its related parties total liability for and all damages and
                  causes of action exceed the amount paid by the Investor if any, for the use of the platform and/or its
                  content.
                </p>
                <p>
                  The trading recommendations by Eagle Investors are impersonal investment advice meaning they are not
                  suitable for all and a general consideration would consider crypto trades and Options not suitable for
                  all investors as the special risks inherent to options and crypto trading may expose investors to
                  potentially rapid and substantial losses. Eagle Investors further assumes no responsibility for, and
                  makes no warranties that functions contained at the platform or content will be un-interrupted and/or
                  error free; that errors will be corrected; or that the platform or content or any method of access to
                  or storage will be free of viruses. Eagle Investors will not be liable for any damages or repairs to
                  your systems from viruses that may infect your services. The Registered Investment Advisor designation
                  does not imply the commission has passed on the accuracy or adequacy of information or endorses our
                  investment advice. The specific information on this platform has not been reviewed by, filed with, or
                  otherwise furnished to any governmental or similar authority.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Options and Leveraged Trading Disclaimer</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Options are not suitable for all investors as the special risks inherent to options trading may expose
                  investors to potentially rapid and substantial losses. Options involve risks and are not suitable for
                  everyone. Prior to buying or selling options, an investor must receive a copy of the Characteristics
                  and Risks of Standardized Options. Copies may be obtained by contacting your broker, The Options
                  Industry Council at One North Wacker Drive, Chicago, IL 60606, or by visiting{" "}
                  <Link
                    href="http://www.OptionsEducation.org"
                    className="text-cyan-400 hover:text-cyan-300 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.OptionsEducation.org
                  </Link>
                </p>
                <p>
                  All users of Eagle Investors LLC content and/or web platforms must determine for themselves what
                  specific investments to make or not to make and are urged to consult with their own independent
                  financial advisors with respect to any investment decision. The viewer bears responsibility for
                  his/her own investment research and decisions, should seek the advice of a qualified securities
                  professional before making any investment, and investigate and fully understand any and all risks
                  before investing. All opinions, analysis, and information included in this Content and on the website
                  are based on sources believed to be reliable and written or produced in good faith but should be
                  independently verified, and no representation or warranty of any kind, express or implied, is made,
                  including but not limited to any representation or warranty concerning accuracy, completeness,
                  correctness, timeliness or appropriateness.
                </p>
                <p>
                  In addition, Eagle Investors, LLC. undertake no responsibility to notify such opinions, analysis, or
                  information or to keep such opinions, analysis, or information current. Also be aware that owners,
                  employees, writers, or producers of and for Eagle Investors, LLC. may have long or short positions in
                  securities that may be discussed in the Content or on the website. Past results are not indicative of
                  future profits.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Impersonal Investment Advice</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Eagle Investors LLC is a registered investment advisor (RIA) providing investment advice and
                  information through online platforms. It is important to understand that the investment advice
                  provided via our channels is intended to be impersonal and general in nature. The advice offered is
                  not tailored to individual financial situations, objectives, or risk tolerances. Therefore, it is
                  crucial for all clients to exercise caution and perform due diligence before making investment
                  decisions based on the information we provide.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Individualized Financial Guidance</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  We strongly recommend that clients consult with their individual investment or financial advisor to
                  assess their specific financial goals and tolerance for risk. Your personal financial advisor is best
                  positioned to provide guidance tailored to your unique circumstances, taking into account factors such
                  as your financial goals, risk tolerance, and overall financial situation.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">No Guarantees</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Investing in the financial markets carries inherent risks, and there are no guarantees of profit. The
                  value of investments can fluctuate, and past performance is not indicative of future results. Clients
                  are responsible for their own investment decisions, and Eagle Investors LLC assumes no liability for
                  any losses incurred as a result of acting on information provided through our channels.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Code of Ethics and Compliance</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  Eagle Investors LLC adheres to a strict code of ethics and compliance standards designed to minimize
                  conflicts of interest and prioritize the best interests of clients. Our team is committed to providing
                  transparent, objective, and reliable financial advice. For more information on our practices please
                  visit Form ADV, ADV Brochures, Client Relationship Summary
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-xl">Questions and Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p>
                  If you have any questions or require further clarification regarding the information presented on the
                  Eagle Investors Platforms or any other aspect of our services, please do not hesitate to contact Eagle
                  Investors LLC. Our goal is to provide valuable insights and education to help you make informed
                  investment decisions that align with your financial objectives.
                </p>
                <p>
                  By engaging and/or using our services, you acknowledge that you have read and understood this
                  disclaimer and disclosure statement. This statement is subject to updates and revisions, and it is
                  advisable to review it periodically for any changes. Your continued use of our services constitutes
                  your agreement to be bound by the most current version of this disclaimer and disclosure.
                </p>
                <p className="font-semibold text-white">
                  Eagle Investors LLC appreciates your trust in our services and is committed to providing you with
                  valuable information and insights to enhance your investment knowledge and decision-making.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Need Additional Information?</h2>
            <p className="text-gray-300 mb-6">
              For questions about our disclosures or to request additional documentation, please contact our compliance
              team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
                  Contact Compliance
                </Button>
              </Link>
              <Link href="https://adviserinfo.sec.gov/firm/summary/316259" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-xl font-semibold"
                >
                  View SEC Filing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
