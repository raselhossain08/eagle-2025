import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

export default function FormCRSPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Client Relationship Summary (Form CRS)
            </h1>
            <p className="text-xl text-muted-foreground">Summary of our services, fees, and conflicts of interest</p>
            <p className="text-sm text-muted-foreground mt-2">April 2024</p>
          </div>

          {/* Content */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-primary text-2xl">Eagle Investors LLC</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Introduction */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduction</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    Our name is Eagle Investors LLC ("Eagle"). We are registered with the State of Indiana, California,
                    and Virginia. We were previously registered with the U.S. Securities and Exchange Commission ("SEC")
                    as an investment adviser. We changed registration during our 2024 annual amendment due to falling
                    under the de minimis requirements for multi-state advisors.
                  </p>
                  <p>
                    The services offered and fees charged by an investment adviser differ from those of broker-dealers
                    and it is important that you understand the differences. Free and simple tools are available to
                    research investment adviser firms, broker-dealers, and their financial professionals at{" "}
                    <a href="http://www.Investor.gov/CRS" className="text-primary hover:underline">
                      www.Investor.gov/CRS
                    </a>
                    , which also provides educational materials about broker-dealers, investment advisers, and
                    investing.
                  </p>
                </div>
              </div>

              {/* Relationships and Services */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Relationships and Services</h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-primary">
                    A. What investment services and advice can you provide me?
                  </h3>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      <strong className="text-foreground">Description of Services:</strong> Eagle provides investment
                      advisory services to retail investors. Specifically, the firm provides investment research,
                      financial advice, trading recommendations and investment recommendations regarding options,
                      stocks, digital assets, and cryptocurrency trading to fee-based Subscribers ("Subscribers") via
                      the internet through the firm's online platform. In addition, the firm provides personalized
                      financial advice and tailored financial advice through online voice and video calls to one-time,
                      fee-based clients via the internet.
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li>
                        <strong className="text-foreground">(i) Monitoring:</strong> Eagle does not have regulatory
                        assets under management, and we do not expect to maintain client assets under management.
                      </li>
                      <li>
                        <strong className="text-foreground">(ii) Investment Authority:</strong> Our investment services
                        are non-discretionary and available to our Subscribers via an ongoing fee-based subscription and
                        one-time fees. This means that the retail investor makes the ultimate decision regarding the
                        purchase or sale of investments.
                      </li>
                      <li>
                        <strong className="text-foreground">(iii) Limited Investment Offerings:</strong> Eagle only
                        provides its Subscriber-based service and one-time fee based services.
                      </li>
                      <li>
                        <strong className="text-foreground">(iv) Account Minimums and Other Requirements:</strong> There
                        are no account minimums to become a Subscriber.
                      </li>
                    </ul>
                    <p>
                      <strong className="text-foreground">Additional Information:</strong> Please see the more detailed
                      disclosure on the investment services and advice that we can provide to you in Items 4 and 7 of
                      our Form ADV Part 2A. In addition, please find our full public disclosures and policies here:{" "}
                      <a href="https://eagle-investors.com/disclaimer/" className="text-primary hover:underline">
                        https://eagle-investors.com/disclaimer/
                      </a>
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="font-medium text-foreground mb-2">Conversation Starters:</p>
                      <ul className="space-y-1 text-sm">
                        <li>
                          • Given my financial situation, should I choose an investment advisory service? Why or why
                          not?
                        </li>
                        <li>• How will you choose investments to recommend to me?</li>
                        <li>
                          • What is your relevant experience, including your licenses, education and other
                          qualifications? What do these qualifications mean?
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fees, Costs, Conflicts, and Standard of Conduct */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  3. Fees, Costs, Conflicts, and Standard of Conduct
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-3">A. What fees will I pay?</h3>
                    <div className="text-muted-foreground space-y-4">
                      <p>
                        <strong className="text-foreground">(i) Description of Principal Fees and Costs:</strong> The
                        fees applicable to Subscribers are set forth in detail in each Subscriber's "Advisory Contract."
                        Subscribers pay Eagle a "Subscription Fee" that will range from $67 Monthly to $670 Annually for
                        the Premium Membership. In addition, the fees applicable to Fixed Fee Based Customers are set
                        forth in detail in each Customers "Advisory Contract." Customers pay Eagle a "Fixed Fee" that
                        will range from $786 to $2,497 for 1on1 advising.
                      </p>
                      <p>
                        <strong className="text-foreground">(ii) Description of Other Fees and Costs:</strong> There are
                        no other fees or expenses charged to Subscribers and Clients.
                      </p>
                      <p>
                        <strong className="text-foreground">(iii) Additional Information:</strong> You will pay fees and
                        costs whether you make or lose money on your investments. Fees and costs will reduce any amount
                        of money you make on your investments over time. Please make sure you understand what fees and
                        costs you are paying. Subscribers pay only the Subscription Fee. One-Time Customers pay only the
                        Fixed Fee.
                      </p>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-medium text-foreground mb-2">Conversation Starter:</p>
                        <p className="text-sm">
                          • Help me understand how these fees and costs might affect my investments. If I give you
                          $10,000 to invest, how much will go to fees and costs, and how much will be invested for me?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-primary mb-3">
                      B. What are your legal obligations to me when acting as my investment adviser? How else does your
                      firm make money and what conflicts of interest do you have?
                    </h3>
                    <div className="text-muted-foreground space-y-4">
                      <p>
                        When we act as your investment adviser, we have to act in your best interest and not put our
                        interest ahead of yours. At the same time, the way we make money creates some conflicts with
                        your interests. You should understand and ask us about these conflicts because they can affect
                        the investment advice we provide you.
                      </p>
                      <p>
                        <strong className="text-foreground">
                          Examples of Ways We Make Money and Conflicts of Interest:
                        </strong>{" "}
                        Eagle has no affiliations with any parties other than our Subscribers and Customers. We
                        continuously monitor and analyze the research we provide to ensure that it conforms with the
                        internal guidelines of each Advisory Contract. Currently, subscriptions and fixed fees are the
                        only way by which the Adviser makes any profit. The subscription fee will not be materially
                        raised without discussion and agreement with the Subscribers.
                      </p>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="font-medium text-foreground mb-2">Conversation Starter:</p>
                        <p className="text-sm">
                          • How might your conflicts of interest affect me, and how will you address them?
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-primary mb-3">
                      C. How do your financial professionals make money?
                    </h3>
                    <p className="text-muted-foreground">
                      Eagle does not employ financial professionals that are compensated separately from the
                      Subscription Fee or Fixed Fee paid by our Subscribers and Customers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Disciplinary History */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">Disciplinary History</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    <strong className="text-foreground">
                      A. Do you or your financial professionals have legal or disciplinary history?
                    </strong>{" "}
                    Yes, Ishaan Sandhir has been subject to minor criminal proceedings in the past. Specifically, in
                    late 2017 he was charged in the State of Indiana with the following crimes: 35-48-4-2(a)(2)/F6:
                    Dealing in a Schedule II Controlled Substance 35-48-4-11(a)(1)/MB: Possession of Marijuana. In early
                    2018, the first charge was dismissed, and the second charge was a guilty plea resulting in a
                    misdemeanor conviction.
                  </p>
                  <p>However, it is important to note that:</p>
                  <ul className="ml-4 space-y-1">
                    <li>• This conviction was not related to any investment or securities activities.</li>
                    <li>• He has never been convicted of any felony charges.</li>
                    <li>• He is committed to upholding the highest ethical standards in all business dealings.</li>
                    <li>
                      • We strongly believe in transparency and ethical conduct. Ishaan Sandhir has provided full
                      disclosure of this historical event to the firm and regulators.
                    </li>
                    <li>
                      • This past event does not impact the principal's ability to effectively manage Eagle Investors
                      LLC or provide investment guidance.
                    </li>
                  </ul>
                  <p>
                    Please visit{" "}
                    <a href="http://www.Investor.gov/CRS" className="text-primary hover:underline">
                      www.Investor.gov/CRS
                    </a>{" "}
                    for a free and simple search tool to research us and our financial professionals.
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium text-foreground mb-2">Conversation Starter:</p>
                    <p className="text-sm">
                      • As a financial professional, do you have any disciplinary history? For what type of conduct?
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Additional Information</h2>
                <div className="text-muted-foreground space-y-4">
                  <p>
                    <strong className="text-foreground">A.</strong> You can find additional information about our
                    investment advisory services on the SEC's website and on our website. Our website is{" "}
                    <a href="https://eagle-investors.com/" className="text-primary hover:underline">
                      https://eagle-investors.com/
                    </a>
                    .
                  </p>
                  <p>
                    <strong className="text-foreground">B.</strong> You can request up to date information and a copy of
                    our relationship summary by contacting us at (248) 703-9394 or by email at{" "}
                    <a href="mailto:samuel@eagle-investors.com" className="text-primary hover:underline">
                      samuel@eagle-investors.com
                    </a>
                    .
                  </p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="font-medium text-foreground mb-2">Conversation Starter:</p>
                    <p className="text-sm">
                      • Who is my primary contact person? Is he or she a representative of an investment adviser or a
                      broker-dealer? Who can I talk to if I have concerns about how this person is treating me?
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
