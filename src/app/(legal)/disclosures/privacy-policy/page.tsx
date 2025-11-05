import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, ArrowLeft, Shield, Lock, Users, FileText, AlertTriangle, Mail } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  const dataTypes = [
    {
      icon: Users,
      title: "Contact Information",
      description: "Name, email address, phone number, postal address",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileText,
      title: "Financial Information",
      description: "Investment account details, bank information, tax information",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Users,
      title: "Demographic Information",
      description: "Age, gender, income level, occupation",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Eye,
      title: "Usage Data",
      description: "Browsing history, IP address, device information, cookie data",
      color: "from-orange-500 to-red-500",
    },
  ]

  const userRights = [
    {
      title: "Access",
      description: "You have the right to access your personal information that we hold",
      icon: Eye,
    },
    {
      title: "Correction",
      description: "You have the right to correct any inaccurate personal information",
      icon: FileText,
    },
    {
      title: "Deletion",
      description: "You have the right to request that we delete your personal information",
      icon: AlertTriangle,
    },
    {
      title: "Restriction",
      description: "You have the right to restrict our processing of your personal information",
      icon: Lock,
    },
    {
      title: "Objection",
      description: "You have the right to object to our processing for marketing purposes",
      icon: Shield,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/disclosures" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Disclosures
          </Link>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-300">How we collect, use, and protect your personal information</p>
            <p className="text-gray-400 text-sm mt-4">
              <strong>Effective Date:</strong> January 1st, 2024
            </p>
          </div>

          {/* Introduction */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">Our Commitment to Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed">
              <p>
                Eagle Investors LLC ("Eagle") is committed to protecting the privacy of our clients and potential
                clients. This Privacy Policy explains how we collect, use, share, and protect your personal information.
              </p>
              <p className="mt-4">
                A copy of this policy can always be found publicly at{" "}
                <Link
                  href="https://eagle-investors.com/privacy-policy"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://eagle-investors.com/privacy-policy
                </Link>
              </p>
            </CardContent>
          </Card>

          {/* Types of Information Collected */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">1. Types of Information Collected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">We may collect the following types of personal information from you:</p>
              <div className="grid md:grid-cols-2 gap-6">
                {dataTypes.map((type, index) => (
                  <div key={index} className="bg-slate-900/50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${type.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                      >
                        <type.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">{type.title}</h4>
                        <p className="text-gray-300 text-sm">{type.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-slate-900/50 rounded-lg p-4">
                <h4 className="text-white font-semibold mb-2">Communications with Eagle</h4>
                <p className="text-gray-300 text-sm">
                  Recordings of phone calls, emails, and other communications for quality assurance and compliance
                  purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Purposes of Collection and Use */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">2. Purposes of Collection and Use</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed">
              <p className="mb-4">We use your personal information for the following purposes:</p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To provide investment advisory services</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To communicate with you about your accounts and services</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To personalize your experience on our website and applications</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To analyze and improve our services</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To comply with legal and regulatory requirements</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>To market our services to you, unless you have opted out of receiving such communications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Sharing of Information */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">3. Sharing of Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed">
              <p className="mb-4">We may share your personal information with the following third parties:</p>
              <div className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Government Agencies</h4>
                  <p className="text-gray-300 text-sm">
                    We may be required to disclose your information to government agencies in response to a subpoena,
                    court order, or other legal process.
                  </p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Regulators</h4>
                  <p className="text-gray-300 text-sm">
                    We may share your information with regulators as required by law.
                  </p>
                </div>
              </div>
              <div className="mt-6 bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-semibold">
                  We will not share your personal information with any third-party marketers without your consent.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Rights and Choices */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">4. User Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">You have the following rights regarding your personal information:</p>
              <div className="space-y-4">
                {userRights.map((right, index) => (
                  <div key={index} className="bg-slate-900/50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <right.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">{right.title}</h4>
                        <p className="text-gray-300 text-sm">{right.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-300 mt-6">
                To exercise any of these rights, please contact us at the address or email address provided below.
              </p>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">5. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed">
              <p>
                We will retain your personal information for as long as necessary to fulfill the purposes for which it
                was collected and to comply with applicable laws and regulations.
              </p>
            </CardContent>
          </Card>

          {/* Security Measures */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">6. Security Measures</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed">
              <p className="mb-4">
                We have implemented physical and cybersecurity measures to protect your personal information from
                unauthorized access, disclosure, alteration, or destruction. These measures include:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-white font-semibold">Access Controls</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Limits on who can access your information</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-white font-semibold">Security Audits</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Regular security audits and penetration testing</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Lock className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-white font-semibold">Data Encryption</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Encryption of your data at rest and in transit</p>
                </div>
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <h4 className="text-white font-semibold">AI Encryption</h4>
                  </div>
                  <p className="text-gray-300 text-sm">Artificial Intelligence encryption solutions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance with Laws */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">7. Compliance with Laws</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed">
              <p>
                We comply with applicable privacy laws and regulations, including the Gramm-Leach-Bliley Act (GLBA) and
                the California Consumer Privacy Act (CCPA).
              </p>
              <p className="mt-4">
                This Privacy Policy is intended to be consistent with the requirements of 21 VAC 5-80-260, Information
                Security and Privacy. We encourage you to review the full text of this regulation for more information
                about your rights and our responsibilities regarding your personal information.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">8. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed">
              <p className="mb-4">If you have any questions about this Privacy Policy, please contact us at:</p>
              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-white font-semibold">Eagle Investors LLC</p>
                    <p className="text-gray-300">info@eagle-investors.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400">9. Changes to this Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on our website and notifying clients based on their jurisdiction. You are advised to
                review this Privacy Policy periodically for any changes.
              </p>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-600/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Your Privacy?</h2>
            <p className="text-gray-300 mb-6">
              We hope this Privacy Policy clarifies how we handle your personal information. Please don't hesitate to
              contact us if you have any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
                  Contact Us
                </Button>
              </Link>
              <Link href="mailto:info@eagle-investors.com">
                <Button
                  variant="outline"
                  className="bg-transparent border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-3 rounded-xl font-semibold"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Privacy Team
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
