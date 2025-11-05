import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
            <p className="text-xl text-gray-300">Legal terms governing the use of our services and platform</p>
          </div>

          {/* Terms Content */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-cyan-400 text-2xl">Eagle Investors, LLC Terms of Use</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-6 leading-relaxed">
              <p>
                Eagle Investors, LLC (sometimes known as, "Eagle Investors", or simply "Eagle"), requires all visitors
                to the Eagle Investors website to observe and follow the following terms and conditions.
              </p>

              <p>
                By accessing, viewing and/or using the Eagle Investors website and the information, content, forms,
                charts, graphs, photographs, graphics, software or other products or services available by or through
                the Eagle Investors website or online platforms (herein after referred to as "Content"), you acknowledge
                that you have read and agree to be bound by these Terms of Use, and that, to the extent applicable, the
                Terms of Use supplements any existing Client Agreement(s) and/or Engagement Letters, if any, with Eagle
                Investors. Please read the following terms and conditions carefully.
              </p>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Parties</h3>
                <p>
                  As used within the Terms of Use, the term "You" and "Your" shall mean You, the reader/viewer of the
                  Eagle Investors website and online platforms, individually, and each other party on whose behalf You
                  may Use the Eagle Investors platform at any time. All references to "We", "Us" or "Our" shall refer to
                  Eagle Investors (the Firm).
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Usage and Proprietary Rights</h3>
                <p>
                  All right, title and interest in this Website and the Content is the exclusive property of Eagle
                  Investors LLC, except as otherwise expressly stated. We grant You, for the term of this Terms of Use,
                  a personal, limited, non-exclusive, revocable (at any time), non-transferable license to access the
                  website and the Content subject to this Terms of Use. You have no ownership rights in the Content,
                  which is owned by Eagle Investors, and is protected under copyright, trademark and other intellectual
                  property laws and other applicable laws. You receive no copyright or any other intellectual property
                  right in or to the Content. You may use the Content only for Your personal and non-commercial use. You
                  may not modify, copy, distribute, transmit, display, perform, reproduce, publish, license, frame,
                  create derivative works from, transfer, or otherwise use in any other way for commercial or public
                  purposes in whole or in part any Content, including, but not limited to, any information, software,
                  products or services obtained from the website, except for the purposes expressly provided herein,
                  without Eagle Investors prior written approval.
                </p>
                <p>
                  You acknowledge that Eagle Investors LLC may provide certain portions of the Content under license
                  from Third Party Providers, and You agree to comply with any additional restrictions on Your usage
                  that Eagle Investors may communicate to You from time to time, or that are otherwise the subject of an
                  agreement between You and such licensors. We retain exclusive control over the Content, and reserve
                  the right, at any time and in our sole discretion, without prior notice to You, to change, suspend or
                  discontinue all or a portion of the Content; and/or impose limits on, restrict or terminate Your
                  access to all or a portion of the Content. You agree that Eagle Investors may monitor Your use of the
                  Content.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Restricted Content</h3>
                <p>
                  All trademarks, service marks, slogans, logos, trade dress and other identifiers ("Marks") displayed
                  on the Website are the property of Eagle Investors. The names of other companies and third party
                  products or services mentioned on the website may be the trademarks or service marks of their
                  respective owners. The Marks are protected by U.S. and foreign trademark, common law rights and
                  statutes. You are prohibited from using any Marks for any purpose including, but not limited to, use
                  on other materials, in presentations, as domain names, or as meta-tags, without the express written
                  permission of Eagle Investors or such other party that may own the marks.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Copyright Notifications</h3>
                <p>
                  Pursuant to Section 512(c)(2) of the Copyright Act, Eagle Investors designates the following agent to
                  receive notifications of claimed infringement: Ishaan K. Sandhir, Chief Compliance Officer.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Third Party Links</h3>
                <p>
                  Certain links may let you leave the Eagle Investors website. The linked websites are not under the
                  control of Eagle Investors and Eagle is not responsible for the content of any linked website or any
                  link contained in a linked website, or any changes or updates to such websites. Eagle provides these
                  links to you only as a convenience, and the inclusion of any link does not imply endorsement,
                  investigation, verification or monitoring by Eagle Investors LLC of such a third party website.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Change to Terms and Conditions</h3>
                <p>
                  Eagle Investors LLC reserves the right to add, delete or otherwise modify the Terms of Use (or any
                  Supplemental Agreements) at any time without notice to You. The most current version of the Terms of
                  Use can be reviewed by clicking on the "Terms & Conditions" link located at the bottom of this
                  website, or by clicking on the "Disclosures" link located at the top of this website. Any continued
                  use of the website after such additions, deletions or modifications shall be deemed to constitute
                  acceptance by you of the additions, deletions or modifications.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">DISCLAIMER OF WARRANTIES</h3>
                <p>
                  The Services on this website are provided on an "as is," "Where is" and "Where available" basis.
                  ALTHOUGH EAGLE INVESTORS TRIES TO PROVIDE ACCURATE AND TIMELY INFORMATION on its website, THERE MAY BE
                  INADVERTENT TECHNICAL OR FACTUAL INACCURACIES AND TYPOGRAPHICAL ERRORS. EAGLE SPECIFICALLY RESERVES
                  THE RIGHT TO MAKE CHANGES AND CORRECTIONS AT ANYTIME AND WITHOUT NOTICE. NEITHER WE NOR ANY THIRD
                  PARTY PROVIDER THAT CONTRIBUTES IN ANY MANNER TO THE CONTENT MAKES ANY REPRESENTATION OR WARRANTY
                  WHATSOEVER, INCLUDING WARRANTIES (A) WITH RESPECT TO THE ACCURACY, COMPLETENESS OR TIMELINESS OF THE
                  CONTENT; OR (B) THAT THE CONTENT SHALL BE UNINTERRUPTED OR ERROR FREE. FURTHER, EAGLE AND ANY THIRD
                  PARTY PROVIDER THAT CONTRIBUTES IN ANY MANNER TO THE CONTENT DISCLAIM ANY EXPRESS OR IMPLIED
                  WARRANTIES, INCLUDING ANY IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY OR FITNESS
                  FOR A PARTICULAR PURPOSE RELATING TO THE CONTENT. YOU ASSUME THE ENTIRE RISK TO THE USE OF THE WEBSITE
                  AND THE CONTENT.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">LIMITATION OF LIABILITY</h3>
                <p>
                  TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL EAGLE INVESTORS, LLC. OR ITS AFFILIATES,
                  SUBSIDIARIES OR CONTROLLING ENTITIES OR THEIR THIRD PARTY PROVIDERS, CONTRACTORS OR TECHNOLOGY OR
                  CONTENT PROVIDERS OR THEIR RESPECTIVE OFFICERS, DIRECTORS, OWNERS, AGENTS AND EMPLOYEES ("EAGLE
                  PARTIES") HAVE ANY LIABILITY TO YOU OR ANY OTHER PERSON FOR ANY COSTS, LIABILITIES OR DAMAGES OF ANY
                  KIND, WHETHER DIRECT, INDIRECT, (INCLUDING, BUT NOT LIMITED TO, LOST PROFITS, TRADING LOSSES OR
                  DAMAGES THAT RESULT FROM USE OR LOSS OF USE OF THE CONTENT, INCONVENIENCE OR DELAY), CONSEQUENTIAL OR
                  PUNITIVE (TOGETHER, "COSTS"), ARISING OUT OF, OR IN CONNECTION WITH, THIS TERMS OF USE OR THE
                  PERFORMANCE OR BREACH OF THIS TERMS OF USE, YOUR OR ANY OTHER PERSON'S USE OF, OR INABILITY TO ACCESS
                  THE CONTENT, OR FOR ANY INTERCEPTION BY THIRD PARTIES OF ANY INFORMATION OR SERVICE MADE AVAILABLE TO
                  YOU VIA THE WEBSITE. THESE LIMITATIONS SHALL APPLY REGARDLESS OF THE FORM OF ACTION, WHETHER BASED ON
                  STATUTE OR ARISING IN CONTRACT, INDEMNITY, WARRANTY, STRICT LIABILITY OR TORT (INCLUDING NEGLIGENCE),
                  REGARDLESS OF WHETHER ANY EAGLE INVESTORS PARTY KNOWS OR HAS REASON TO KNOW OF THE POSSIBILITY OF SUCH
                  DAMAGES, AND WHETHER OR NOT THE CIRCUMSTANCES GIVING RISE TO SUCH CAUSE MAY HAVE BEEN WITHIN THE
                  CONTROL OF EAGLE OR ANY THIRD PARTY PROVIDER OF SOFTWARE OR SERVICES. THIS LIMITATION OF LIABILITY IS
                  IN ADDITION TO ANY OTHER LIMITATION PROVIDED IN ANY APPLICABLE ACCOUNT SERVICE, SUPPLEMENTAL AGREEMENT
                  OR ANY OTHER AGREEMENT. This limitation of liability includes, but is not limited to, the transmission
                  of any viruses which may infect a user's equipment, failure of mechanical or electronic equipment or
                  communication lines, telephone or other interconnect problems (e.g., you cannot access your internet
                  service provider), unauthorized access, theft, operator errors, strikes or other labor problems or any
                  force majeure.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Your Indemnification Obligations</h3>
                <p>
                  You agree to defend, indemnify and hold Eagle Investors LLC and its directors, officers, employees,
                  and agents harmless from and against all claims and expenses, including attorneys' fees, arising out
                  of the use of the Online Platforms, Discord, Website, or its Content, by You.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Governing Law</h3>
                <p>
                  These Terms of Use will be governed by Ohio, Indiana, Virginia, California, Texas, New York, New
                  Jersey and Texas State law without giving effect to principles of conflict of law. Any party bringing
                  legal action or proceeding against the other for any dispute or controversy between the parties
                  arising out of or relating to this website, the Content, or the use thereof, shall bring the legal
                  action or proceeding (i) in the United States District Court for the Southern District of Indiana or
                  Ohio. You acknowledges that any violation of the terms of this Terms of Use, or misuse of the website
                  or the Content, or infringement of any Mark may cause Eagle Investors irreparable harm, the amount of
                  which may be difficult to ascertain, and therefore You agree that Eagle shall have the right to apply
                  to a court of competent jurisdiction for an order enjoining any such further misappropriation and for
                  such other relief as Eagle deems appropriate. This right of Eagle Investors is to be in addition to
                  the remedies otherwise available to Eagle Investors.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Severability</h3>
                <p>
                  If for any reason a court of competent jurisdiction finds any provision of this Terms of Use, or
                  portion thereof, to be unenforceable, that provision shall be enforced to the maximum extent
                  permissible so as to affect the intent of this Terms of Use, and the remainder of this Terms of Use
                  shall continue in full force and effect.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
