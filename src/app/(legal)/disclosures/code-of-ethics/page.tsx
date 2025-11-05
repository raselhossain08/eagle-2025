import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale, Shield, Users, AlertTriangle, FileText, Eye, CheckCircle, XCircle, Clock, Download } from "lucide-react"
import Link from "next/link"

export default function CodeOfEthicsPage() {
  const tableOfContents = [
    { section: "1", title: "Introduction", href: "#introduction" },
    { section: "2", title: "Oversight of the Code", href: "#oversight" },
    { section: "3", title: "Employee Supervision", href: "#supervision" },
    { section: "4", title: "Oversight of Key Service Providers", href: "#service-providers" },
    { section: "5", title: "Whistleblower Policy", href: "#whistleblower" },
    { section: "6", title: "Conflicts of Interest Generally", href: "#conflicts" },
    { section: "7", title: "Gifts and Entertainment", href: "#gifts" },
    { section: "8", title: "Anti-Bribery Policy and Procedures", href: "#anti-bribery" },
    { section: "9", title: "Political Contributions and Pay to Play", href: "#political" },
    { section: "10", title: "Personal Trading Policy", href: "#personal-trading" },
    { section: "11", title: "Outside Business Activities", href: "#outside-business" },
    { section: "12", title: "Insider Trading", href: "#insider-trading" },
    { section: "13", title: "Paid Expert Policy and Procedures", href: "#paid-expert" },
    { section: "14", title: "Alternative Data Providers", href: "#alternative-data" },
  ]

  const keyPolicies = [
    {
      title: "Personal Trading Policy",
      description: "Comprehensive guidelines for employee securities transactions and reporting requirements",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      restrictions: [
        "Pre-approval required for IPOs",
        "30-day minimum holding for crypto",
        "Quarterly reporting required",
      ],
    },
    {
      title: "Insider Trading Prevention",
      description: "Strict procedures to prevent misuse of material non-public information",
      icon: Shield,
      color: "from-red-500 to-orange-500",
      restrictions: ["Immediate reporting of MNPI", "Restricted list maintenance", "Channel checking procedures"],
    },
    {
      title: "Gifts & Entertainment",
      description: "Clear limits on gifts and entertainment to avoid conflicts of interest",
      icon: AlertTriangle,
      color: "from-yellow-500 to-orange-500",
      restrictions: [
        "$250 annual limit per person",
        "No cash or cash equivalents",
        "Pre-approval for excessive entertainment",
      ],
    },
    {
      title: "Political Contributions",
      description: "Pay-to-play restrictions on political contributions and activities",
      icon: Scale,
      color: "from-purple-500 to-pink-500",
      restrictions: ["Pre-approval required", "Two-year lookback period", "Family member restrictions"],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Scale className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Code of Ethics</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Comprehensive ethical standards and compliance procedures governing Eagle Investors LLC and all supervised
              persons
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Badge variant="outline" className="bg-purple-500/10 border-purple-400 text-purple-300 px-4 py-2">
                <Clock className="w-4 h-4 mr-2" />
                Effective: April 2024
              </Badge>
              <Badge variant="outline" className="bg-cyan-500/10 border-cyan-400 text-cyan-300 px-4 py-2">
                <FileText className="w-4 h-4 mr-2" />
                Public Document
              </Badge>
            </div>
          </div>

          {/* Quick Access Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Link href="https://eagle-investors.com/code-of-ethics/" target="_blank" rel="noopener noreferrer">
              <Card className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 h-full group">
                <CardContent className="p-6 text-center">
                  <Eye className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-white font-semibold mb-2">View Full Document</h3>
                  <p className="text-gray-400 text-sm">Access complete code online</p>
                </CardContent>
              </Card>
            </Link>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6 text-center">
                <Download className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Download PDF</h3>
                <p className="text-gray-400 text-sm">Get offline copy</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Employee Training</h3>
                <p className="text-gray-400 text-sm">Bi-monthly compliance training</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold mb-2">Report Violations</h3>
                <p className="text-gray-400 text-sm">Whistleblower protection</p>
              </CardContent>
            </Card>
          </div>

          {/* Table of Contents */}
          <Card className="bg-slate-800 border-slate-700 mb-16">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-2xl flex items-center">
                <FileText className="w-6 h-6 mr-3" />
                Table of Contents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {tableOfContents.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 group">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 text-white text-sm font-bold group-hover:scale-110 transition-transform duration-200">
                        {item.section}
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-200">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Policies Overview */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Policy Areas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {keyPolicies.map((policy, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${policy.color} rounded-xl flex items-center justify-center mr-4`}
                      >
                        <policy.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-white text-xl">{policy.title}</CardTitle>
                    </div>
                    <p className="text-gray-300">{policy.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {policy.restrictions.map((restriction, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                          <span className="text-gray-300">{restriction}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content Sections */}
          <div className="space-y-12">
            {/* Introduction */}
            <Card id="introduction" className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">1. Introduction</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4 leading-relaxed">
                <p className="text-lg font-semibold text-white">
                  This Code of Ethics establishes standards of conduct for all "Supervised Persons" of Eagle Investors
                  LLC.
                </p>
                <p>
                  The Code sets forth the Adviser's and each Employee's fiduciary duty to separately managed accounts
                  and addresses possible conflicts of interest, including our employee personal trading policy. This
                  Code should be read in conjunction with the Adviser's Supervisory Procedures and Compliance Manual
                  dated April 2024.
                </p>
                <div className="bg-slate-700/50 p-6 rounded-lg border-l-4 border-purple-500">
                  <h4 className="text-white font-semibold mb-3">Fundamental Standards of Business Conduct:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>The interests of Clients must always be placed first</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>All transactions must avoid actual or perceived conflicts of interest</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Employees must not misrepresent the Adviser or their role</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Compliance with all applicable State & Federal Securities Laws</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Oversight of the Code */}
            <Card id="oversight" className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">2. Oversight of the Code</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-6 leading-relaxed">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-cyan-400" />
                      Employee Acknowledgement
                    </h4>
                    <p className="text-sm">
                      Each employee must execute and return the Employee Acknowledgement form upon hire and annually
                      thereafter, certifying understanding of the Code's contents.
                    </p>
                  </div>
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h4 className="text-white font-semibold mb-3 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-green-400" />
                      Training Requirements
                    </h4>
                    <p className="text-sm">
                      All employees receive bi-monthly compliance training covering regulatory requirements, personal
                      trading responsibilities, and fiduciary duties.
                    </p>
                  </div>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-3 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Sanctions for Non-Compliance
                  </h4>
                  <p>
                    Violations may result in disgorgement of profits, criminal or civil penalties, suspension,
                    termination, and/or notification to regulatory authorities.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Whistleblower Policy */}
            <Card id="whistleblower" className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">5. Whistleblower Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-6 leading-relaxed">
                <p>
                  All employees have the responsibility to comply with policies and procedures and to report violations
                  or suspected violations, including financial impropriety, dishonest activity, or any prohibited
                  conduct.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
                    <h4 className="text-green-400 font-semibold mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2" />
                      Non-Retaliation Protection
                    </h4>
                    <p className="text-sm">
                      Eagle Investors forbids retaliation against anyone who, in good faith, reports violations, assists
                      in complaints, or cooperates in investigations.
                    </p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                    <h4 className="text-blue-400 font-semibold mb-3 flex items-center">
                      <Scale className="w-5 h-5 mr-2" />
                      SEC Whistleblower Program
                    </h4>
                    <p className="text-sm">
                      Eligible whistleblowers may receive 10-30% of monetary sanctions for information leading to
                      successful SEC actions exceeding $1 million.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Trading Policy */}
            <Card id="personal-trading" className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">10. Personal Trading Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-6 leading-relaxed">
                <p>
                  All employees are considered "Access Persons" and must comply with comprehensive personal trading
                  restrictions and reporting requirements under the Advisers Act Code of Ethics Rule.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Reporting Requirements</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Initial Holdings Report
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Annual Holdings Report
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        Quarterly Transaction Reports
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Pre-Approval Required</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-orange-400 mr-2" />
                        Initial Public Offerings (IPOs)
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-orange-400 mr-2" />
                        Limited Offerings
                      </li>
                      <li className="flex items-center">
                        <AlertTriangle className="w-4 h-4 text-orange-400 mr-2" />
                        Cryptocurrency Trading
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Prohibited Activities</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <XCircle className="w-4 h-4 text-red-400 mr-2" />
                        Trading on MNPI
                      </li>
                      <li className="flex items-center">
                        <XCircle className="w-4 h-4 text-red-400 mr-2" />
                        Restricted List Securities
                      </li>
                      <li className="flex items-center">
                        <XCircle className="w-4 h-4 text-red-400 mr-2" />
                        Hypothetical Recommendations
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">Cryptocurrency Policy</h4>
                  <p>
                    All cryptocurrency transactions require CCO pre-approval and are subject to a minimum 30-day holding
                    period. The CCO determines what qualifies as "Cryptocurrency" under this policy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Insider Trading */}
            <Card id="insider-trading" className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">12. Insider Trading</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-6 leading-relaxed">
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Strict Prohibition
                  </h4>
                  <p>
                    Eagle Investors forbids any employee from engaging in activities that would be considered illegal
                    insider trading, extending to activities outside the scope of duties at the Adviser.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Material Non-Public Information (MNPI)</h4>
                    <p className="text-sm mb-3">
                      Information is material if a reasonable investor would consider it important in making investment
                      decisions.
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• Earnings information</li>
                      <li>• Merger and acquisition data</li>
                      <li>• Significant asset changes</li>
                      <li>• New products or discoveries</li>
                    </ul>
                  </div>

                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Severe Penalties</h4>
                    <p className="text-sm mb-3">Violations can result in:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Criminal fines and jail terms</li>
                      <li>• 3x penalty of illicit profits</li>
                      <li>• Permanent securities industry ban</li>
                      <li>• Employment termination</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-lg">
                  <h4 className="text-blue-400 font-semibold mb-3">Channel Checking Procedures</h4>
                  <p>
                    Field research activities require CCO pre-approval. Employees are prohibited from using fraud or
                    deception to obtain information and must immediately report potential MNPI receipt.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Gifts and Entertainment */}
            <Card id="gifts" className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">7. Gifts and Entertainment</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-6 leading-relaxed">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-lg">
                    <h4 className="text-green-400 font-semibold mb-3">Permissible Gifts</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Conference accommodation expenses</li>
                      <li>• Corporate gift list items</li>
                      <li>• Transaction celebration gifts</li>
                      <li>• Wedding/graduation gifts from clients</li>
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
                    <h4 className="text-red-400 font-semibold mb-3">Prohibited Items</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Cash or cash equivalents</li>
                      <li>• Gift cards or certificates</li>
                      <li>• Solicited gifts/entertainment</li>
                      <li>• Personal loans (except from banks)</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">$250 Annual Limit</h4>
                  <p>
                    Pre-approval required for gifts exceeding $250 per year on a cumulative basis from each person or
                    firm. Entertainment over $500 requires pre-approval.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Political Contributions */}
            <Card id="political" className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">9. Political Contributions and Pay to Play</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-6 leading-relaxed">
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-3 flex items-center">
                    <Scale className="w-5 h-5 mr-2" />
                    Strict Pay-to-Play Restrictions
                  </h4>
                  <p>
                    The Adviser and employees are prohibited from making political contributions to state/local
                    candidates, federal candidates holding state/local office, or related political parties/PACs.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Pre-Approval Required</h4>
                    <p className="text-sm mb-3">
                      All political contributions by employees and immediate family members require written CCO
                      pre-approval, including:
                    </p>
                    <ul className="space-y-1 text-sm">
                      <li>• Campaign contributions</li>
                      <li>• Volunteer services</li>
                      <li>• Fundraising activities</li>
                      <li>• PAC contributions</li>
                    </ul>
                  </div>

                  <div className="bg-slate-700/30 p-6 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Lookback Periods</h4>
                    <p className="text-sm mb-3">New employee certification requirements:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• 2 years: Client solicitation roles</li>
                      <li>• 6 months: Non-solicitation roles</li>
                      <li>• Immediate family member restrictions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anti-Bribery Policy */}
            <Card id="anti-bribery" className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-2xl">8. Anti-Bribery Policy and Procedures</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-6 leading-relaxed">
                <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-lg">
                  <h4 className="text-red-400 font-semibold mb-3 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Zero Tolerance Policy
                  </h4>
                  <p>
                    Employees are prohibited from offering payments or anything of value to government officials to
                    assist in obtaining business or securing improper advantages.
                  </p>
                </div>

                <div className="bg-slate-700/30 p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Foreign Corrupt Practices Act (FCPA)</h4>
                  <p className="mb-3">The FCPA prohibits corrupt payments to "Foreign Officials" including:</p>
                  <ul className="space-y-1 text-sm">
                    <li>• Government employees and officials</li>
                    <li>• State-owned enterprise employees</li>
                    <li>• Political party officials and candidates</li>
                    <li>• Court system employees</li>
                  </ul>
                </div>

                <div className="bg-yellow-500/10 border border-yellow-500/30 p-6 rounded-lg">
                  <h4 className="text-yellow-400 font-semibold mb-3">FCPA Red Flags</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <ul className="space-y-1">
                      <li>• Country reputation for corruption</li>
                      <li>• Unusual payment method requests</li>
                      <li>• Refusal to certify FCPA compliance</li>
                    </ul>
                    <ul className="space-y-1">
                      <li>• Apparent lack of qualifications</li>
                      <li>• Non-transparent accounting</li>
                      <li>• "Required" by foreign official</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Code of Ethics Compliance</h2>
            <p className="text-gray-300 mb-6">
              For questions about ethical standards, compliance requirements, or to report violations, contact our Chief
              Compliance Officer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold">
                  Contact CCO
                </Button>
              </Link>
              <Link href="https://eagle-investors.com/code-of-ethics/" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-xl font-semibold"
                >
                  View Full Document
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
