"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

export default function ADVPart2APage() {
  const tableOfContents = [
    { item: "Item 2", title: "Material Changes", page: 2 },
    { item: "Item 3", title: "Table of Contents", page: 3 },
    { item: "Item 4", title: "Advisory Business", page: 4 },
    { item: "Item 5", title: "Fees and Compensation", page: 5 },
    { item: "Item 6", title: "Performance-Based Fees and Side-By-Side Management", page: 6 },
    { item: "Item 7", title: "Types of Clients", page: 6 },
    { item: "Item 8", title: "Methods of Analysis, Investment Strategies, and Risk of Loss", page: 6 },
    { item: "Item 9", title: "Disciplinary Information", page: 9 },
    { item: "Item 10", title: "Other Financial Industry Activities and Affiliations", page: 9 },
    { item: "Item 11", title: "Code of Ethics, Client Transactions, and Personal Trading", page: 10 },
    { item: "Item 12", title: "Brokerage Practices", page: 13 },
    { item: "Item 13", title: "Review of Accounts and Research", page: 14 },
    { item: "Item 14", title: "Client Referrals and Other Compensation", page: 14 },
    { item: "Item 15", title: "Custody", page: 15 },
    { item: "Item 16", title: "Investment Discretion", page: 15 },
    { item: "Item 17", title: "Voting Client Securities", page: 15 },
    { item: "Item 18", title: "Financial Information", page: 15 },
    { item: "Item 19", title: "Requirements for State-Registered Advisers", page: 15 },
    { item: "Item 20", title: "Disaster Recovery Plan / Business Continuity Plan", page: 16 },
  ]

  const generatePDF = async (type: "firm" | "ishaan" | "maikel") => {
    // Dynamic import of jsPDF
    const { jsPDF } = await import("jspdf")

    const doc = new jsPDF()
    let filename = ""

    if (type === "firm") {
      filename = "Eagle_Investors_LLC_Form_ADV_Part_2A.pdf"

      // Title Page
      doc.setFontSize(20)
      doc.setFont("helvetica", "bold")
      doc.text("Eagle Investors LLC Form ADV Part 2A Brochure", 105, 30, { align: "center" })

      doc.setFontSize(14)
      doc.setFont("helvetica", "normal")
      doc.text("Eagle Investors LLC", 105, 60, { align: "center" })
      doc.text("CRD #: 316259", 105, 75, { align: "center" })

      doc.setFontSize(12)
      doc.text("8520 Allison Pointe Blvd, Ste 223, PMB 33259", 105, 95, { align: "center" })
      doc.text("Indianapolis, IN 46250-4299 US", 105, 110, { align: "center" })

      doc.text("March 2025", 105, 130, { align: "center" })

      // Disclaimer
      doc.setFontSize(10)
      const disclaimerText = `This "Brochure" provides information about the qualifications and business practices of Eagle Investors LLC (hereinafter "Eagle Investors," "we," "us," "our" or the "Firm"). If you have any questions about the contents of this Brochure, please contact our Chief Compliance Officer ("CCO"), Ishaan Kumar Sandhir, by email at info@eagle-investors.com. Information in this Brochure has not been approved or verified by the U.S. Securities and Exchange Commission (the "SEC") or by any state securities authority.

The firm's publicly available website address is: www.eagle-investors.com

Registration as an investment adviser does not imply that Eagle Investors or any of its principals or employees possesses a particular level of skill or training in the investment advisory business or any other business.

Additional information about Eagle Investors is also available on the SEC's website at www.adviserinfo.sec.gov.`

      const splitDisclaimer = doc.splitTextToSize(disclaimerText, 180)
      doc.text(splitDisclaimer, 15, 160)

      // Page 2 - Material Changes
      doc.addPage()
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Eagle Investors LLC Form ADV Part 2A Brochure", 105, 20, { align: "center" })
      doc.text("-2-", 105, 30, { align: "center" })

      doc.setFontSize(16)
      doc.text("Item 2: Material Changes", 15, 50)

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      const materialChangesText = `This Brochure is Eagle Investors LLC's annual amendment as of 3/25/2024. There have been no material updates to this Brochure since its amendment in March 2025. Clients and prospective clients should carefully review the disclosures contained herein. This amendment also includes adjustments with the firm switching from SEC registration to State based Registration beginning in fiscal year 2024.`
      const splitMaterialChanges = doc.splitTextToSize(materialChangesText, 180)
      doc.text(splitMaterialChanges, 15, 70)

      // Page 3 - Table of Contents
      doc.addPage()
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Eagle Investors LLC Form ADV Part 2A Brochure", 105, 20, { align: "center" })

      doc.setFontSize(16)
      doc.text("Item 3: Table of Contents", 15, 50)

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      let yPos = 70
      tableOfContents.forEach((item) => {
        doc.text(`${item.item}: ${item.title}`, 15, yPos)
        doc.text(`${item.page}`, 180, yPos, { align: "right" })
        yPos += 8
      })

      // Page 4 - Advisory Business
      doc.addPage()
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Eagle Investors LLC Form ADV Part 2A Brochure", 105, 20, { align: "center" })
      doc.text("-4-", 105, 30, { align: "center" })

      doc.setFontSize(16)
      doc.text("Item 4: Advisory Business", 15, 50)

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      const advisoryBusinessText1 = `Eagle Investors LLC (hereinafter "Eagle Investors," "we," "us," "our" or the "Firm") is organized as an Indiana limited liability company with a principal place of business in Indianapolis, Indiana. Eagle Investors is principally owned by Eagle Horizon Ventures LLC. The firm has been incorporated since 2019 and the firm first became registered to provide investment advisory services in 2021 through SEC registration. However, due to ownership changes the firm is no longer registered with the SEC. The firm first became approved to provide investment advisory services on the State level in February 2024.

Eagle Investors provides investment research, financial advice, trading recommendations and investment recommendations regarding options, stocks, digital assets, and cryptocurrency trading to fee-based Subscribers ("Subscribers") via the internet and through the firm's online platform. The online platform does not provide tailored investment advice to its Subscribers. The Firm does not manage subscriber accounts. Recommendations through the online platform are purely impersonal, and it is up to the client to decide if an investment is suitable.

Eagle Investors will also provide personalized financial advice and tailored investment advice through online voice and video calls to one-time fee-based Clients via the internet. This includes financial advice regarding options, stocks, fixed income, alternative assets, digital assets, and cryptocurrency trading and investment strategies. The Firm does not exercise discretion or custody of client funds, nor does the firm manage Subscribers or manage accounts.`

      const splitAdvisoryBusiness1 = doc.splitTextToSize(advisoryBusinessText1, 180)
      doc.text(splitAdvisoryBusiness1, 15, 70)

      // Continue Advisory Business on new page
      doc.addPage()
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Eagle Investors LLC Form ADV Part 2A Brochure", 105, 20, { align: "center" })
      doc.text("-5-", 105, 30, { align: "center" })

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      const advisoryBusinessText2 = `Eagle Investors LLC provides both impersonal investment recommendations and personalized financial advice. Our team of advisors consists of licensed Investment Adviser Representatives, each holding the Series 65 license. This designation aids our advisors in meeting the regulatory qualifications necessary to provide investment advice and act in a fiduciary capacity.

Advisors engage with clients through online voice and video calls to provide non-discretionary, personalized financial advice tailored to each client's specific goals, risk tolerance, and investment preferences. Additionally, impersonal advice is provided to Subscribers through our online platform.

Eagle Investors LLC's investment advice is non-discretionary as the firm does not make investment decisions on client's behalf. Rather, the firm provides recommendations and guidance, leaving the final decision-making process and execution to the client. This non-discretionary advice is available to our Subscribers via ongoing fee-based subscription. This non-discretionary advice is also available to Clients via a one-time based fee. Due to the client maintaining full control of their accounts, it is the client's decision if they want to impose restrictions on investing in certain securities or types of securities.

We do not currently participate in any Wrap Fee Programs. Currently, we do not have regulatory assets under management, and we do not expect to maintain client assets under management.

The firm uses online voice and video calls such as Google Meets and/or Zoom to conduct 1 on 1 advising sessions and free consultations. 1 on 1 sessions are limited to investing and trading mentorships conducted by an investment advisor representative. 1 on 1 sessions include personalized financial advice. Clients are required to fill out a risk assessment before taking part in any 1 on 1 session or consultation. Although advice is personalized, the client maintains full control of their accounts.

The firm is using a Discord Server as an Online Platform to issue impersonal recommendations which include channels hosting trade recommendations. Some of the channels are utilizing AI for impersonal analysis for securities and a few alternative investments. The firm's advisory services related to online trading and investment advice for day traders, option traders, swing traders and investors including day trade alerts, swing trade alerts, stock alerts, 24x7 advice and AI generated stock Ideas, Breakout scanners, Dark pool, Scalp Ideas, Analyst Grades & Insider Orders.

The firm is also conducting impersonal educational group live streams regarding stock and option trading through the server/online platform.`

      const splitAdvisoryBusiness2 = doc.splitTextToSize(advisoryBusinessText2, 180)
      doc.text(splitAdvisoryBusiness2, 15, 50)

      // Item 5: Fees and Compensation
      doc.addPage()
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.text("Item 5: Fees and Compensation", 15, 30)

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      const feesText = `The fees applicable to Subscribers are set forth in detail in each membership agreement. A summary of such fees is provided below.

Subscription Fee

Eagle Investors is paid a subscription fee ("Subscription Fees") for access to the online platform. The Fee will range from $67 monthly to $670 annually (not a % or for management but for the subscription. The fee includes recommendations of digital assets and cryptocurrencies. Eagle Investors does not currently charge a performance-based fee for any investment recommendations, including those related to digital assets and cryptocurrencies. Fees are non-negotiable.

Fees are to be billed to clients via either Stripe or PayPal (online payment processors) only through a secure checkout process. The firm does not deduct fees from clients' assets at any time. Clients will only be billed according to their subscription plan: monthly subscribers will be billed once monthly, and annual subscribers will be billed once annually. Lower fees for comparable services may be available from other sources.

One-Time Fee

Eagle Investors is paid a one-time fee ("One-Time Fees") for personalized financial advice and tailored investment advice through online voice and video calls.

The fee schedule is as follows:
• Investment Advising - $987, includes 3 Hours of 1 on 1 Advising & 3 Months of Eagle Premium
• Trading Tutoring - $987, includes 3 Hours of 1 on 1 Advising & 3 Months of Eagle Premium
• Eagle Ultimate - $2,497, includes 8 Hours of 1 on 1 Advising Sessions + Premium Annual
• 8 Hour 1 on 1 Advising Sessions: $1,827 – price for existing subscribers only
• 3 Hour 1 on 1 Advising Session: $786 - price for existing subscribers only`

      const splitFeesText = doc.splitTextToSize(feesText, 180)
      doc.text(splitFeesText, 15, 50)
    } else if (type === "ishaan") {
      filename = "Ishaan_Sandhir_Part_2B_Supplement.pdf"

      doc.setFontSize(20)
      doc.setFont("helvetica", "bold")
      doc.text("Eagle Investors LLC Form ADV Part 2B", 105, 30, { align: "center" })
      doc.text("Brochure Supplement", 105, 45, { align: "center" })

      doc.setFontSize(16)
      doc.text("Ishaan Kumar Sandhir", 105, 65, { align: "center" })

      doc.setFontSize(14)
      doc.setFont("helvetica", "normal")
      doc.text("Investment Adviser Representative", 105, 80, { align: "center" })
      doc.text("CRD #: 316259", 105, 95, { align: "center" })

      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("Professional Background:", 15, 120)

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      const ishaanText = `• Chief Executive Officer & Managing Member, Eagle Investors LLC
• Series 65 Licensed Investment Adviser Representative
• B.S. in Entrepreneurship & Corporate Innovation, Indiana University – Bloomington
• Currently pursuing CFA designation

Current Positions (Past 5 Years):
• Chief Executive Officer, Eagle Guardian Advisors LLC (2025 – Present)
• Executive Managing Partner, Eagle Horizon Ventures LLC (2025 – Present)
• Chairman, Board of Directors – Envision Capital Management Group (2023 – Present)
• Founder, Eagle Investors LLC (2023 – Present)

Other Business Activities:
Mr. Sandhir is also President of the Board of Directors of Summit Impact Trust, a 501(c)(3) nonprofit trust, and Executive Managing Partner of Eagle Horizon Ventures LLC, a private equity firm. These entities operate independently but are under common ownership. Mr. Sandhir devotes the majority of his professional time to Eagle Guardian Advisors LLC and related entities.

Performance-Based Fees: Mr. Sandhir does not charge performance-based fees at this time.
Disciplinary Information: Mr. Sandhir has no reportable disciplinary history.
Conflicts of Interest: Mr. Sandhir may refer clients between affiliated firms when appropriate and in a fiduciary capacity. No compensation or referral fees are exchanged. Policies are in place to mitigate potential conflicts.
Bankruptcy Disclosure: Mr. Sandhir has not been the subject of any bankruptcy petition.

Contact: info@eagle-investors.com`

      const splitIshaan = doc.splitTextToSize(ishaanText, 180)
      doc.text(splitIshaan, 15, 135)
    } else if (type === "maikel") {
      filename = "Maikel_den_Hertog_Part_2B_Supplement.pdf"

      doc.setFontSize(20)
      doc.setFont("helvetica", "bold")
      doc.text("Eagle Investors LLC Form ADV Part 2B", 105, 30, { align: "center" })
      doc.text("Brochure Supplement", 105, 45, { align: "center" })

      doc.setFontSize(16)
      doc.text("Maikel den Hertog", 105, 65, { align: "center" })

      doc.setFontSize(14)
      doc.setFont("helvetica", "normal")
      doc.text("Investment Adviser Representative", 105, 80, { align: "center" })
      doc.text("CRD #: 316259", 105, 95, { align: "center" })

      doc.setFontSize(12)
      doc.setFont("helvetica", "bold")
      doc.text("Professional Background:", 15, 120)

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      const maikelText = `• Investment Adviser Representative, Eagle Investors LLC
• Series 65 Licensed
• Specialized in Options & Derivatives Trading
• Technical Analysis Expert

Areas of Expertise:
• Options Trading Strategies
• Risk Management Techniques
• Market Technical Analysis
• Client Education & Trading Mentorship
• Derivatives and Complex Securities

Investment Advisory Services:
Mr. den Hertog provides personalized investment advice and trading education through Eagle Investors LLC's platform, specializing in options strategies and risk management for active traders. He focuses on helping clients understand complex trading strategies while maintaining appropriate risk management protocols.

Educational Background:
Mr. den Hertog has extensive experience in financial markets with particular expertise in options trading and technical analysis. He holds the Series 65 license and maintains continuing education requirements for investment adviser representatives.

Performance-Based Fees: Mr. den Hertog does not charge performance-based fees.
Disciplinary Information: Mr. den Hertog has no reportable disciplinary history.
Bankruptcy Disclosure: Mr. den Hertog has not been subject to any bankruptcy petition.

Contact: info@eagle-investors.com`

      const splitMaikel = doc.splitTextToSize(maikelText, 180)
      doc.text(splitMaikel, 15, 135)
    }

    // Save the PDF
    doc.save(filename)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link href="/disclosures" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Disclosures
          </Link>

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Form ADV Part 2A & 2B</h1>
            <p className="text-xl text-gray-300">Investment Adviser Brochure and Brochure Supplement</p>
          </div>

          {/* Firm Information Card */}
          <Card className="bg-slate-800 border-slate-700 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-2xl">Eagle Investors LLC</CardTitle>
              <p className="text-gray-300">CRD #: 316259</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Business Address</h4>
                  <p className="text-gray-300">
                    8520 Allison Pointe Blvd, Ste 223, PMB 33259
                    <br />
                    Indianapolis, IN 46250-4299 US
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Contact Information</h4>
                  <p className="text-gray-300">
                    Email: info@eagle-investors.com
                    <br />
                    Website: www.eagle-investors.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brochure Downloads */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card
              className="bg-slate-800 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 h-full group cursor-pointer"
              onClick={() => generatePDF("firm")}
            >
              <CardContent className="p-6 text-center">
                <Download className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-semibold mb-2">Firm Brochure</h3>
                <p className="text-gray-300 text-sm">Download Form ADV Part 2A</p>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-800 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 h-full group cursor-pointer"
              onClick={() => generatePDF("ishaan")}
            >
              <CardContent className="p-6 text-center">
                <Download className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-semibold mb-2">Ishaan Sandhir</h3>
                <p className="text-gray-300 text-sm">Download Part 2B Supplement</p>
              </CardContent>
            </Card>

            <Card
              className="bg-slate-800 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 h-full group cursor-pointer"
              onClick={() => generatePDF("maikel")}
            >
              <CardContent className="p-6 text-center">
                <Download className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-semibold mb-2">Maikel den Hertog</h3>
                <p className="text-gray-300 text-sm">Download Part 2B Supplement</p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/50 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Our ADV Filing?</h2>
            <p className="text-gray-300 mb-6">
              For questions about our Form ADV or to request additional documentation, please contact us.
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
