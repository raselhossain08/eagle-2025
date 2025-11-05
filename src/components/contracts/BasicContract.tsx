import React from 'react';

interface BasicContractProps {
  customerName: string;
  contractDate: string;
  price: string;
  preview?: boolean;
  signature?: string;
  email?: string;
}

export const BasicContract: React.FC<BasicContractProps> = ({
  customerName,
  contractDate,
  price,
  preview = false,
  signature,
  email,
}) => {

  return (
    <div className="contract-container  text-white text-sm space-y-4">
      <h1 className="text-2xl font-bold text-center mb-6">Advisory Contract</h1>
      
      <p className="indent">
        This contract is made and entered into as of the <span className="underline">{contractDate}</span> by and between Eagle Investors LLC, an investment adviser (the "Adviser"), and <span className="underline">{customerName}</span>, the "Client."
      </p>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">1. Services to be Provided</h2>
        <p className="indent">
          Eagle Investors will provide basic investment research and financial
          guidance regarding options, stock, digital assets, and cryptocurrency
          trading to Basic Subscribers ("Subscribers") via the internet and
          through the firm's online platform.
        </p>
        <p className="indent mt-2">
          This basic membership provides access to educational content and general
          market insights. No personalized investment advice is provided.
        </p>
        <p className="indent mt-2">
          Eagle Investors LLC's investment advice is non-discretionary as the firm does not make investment decisions on the client's behalf. Rather, the firm provides impersonal recommendations and guidance, leaving the final decision-making process and execution to the client.
        </p>
        <p className="indent mt-2">
          We do not currently participate in any Wrap Fee Programs.
        </p>
        <p className="indent mt-2">
          Currently, we do not have regulatory assets under management, and we do not expect to maintain client assets under management.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">2. Term of the Contract</h2>
        <p className="indent">
          This contract shall commence on <span className="underline">{contractDate}</span> and shall renew on a monthly basis, unless sooner terminated as provided herein.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">3. Fee Schedule</h2>
        <p className="indent">
          The Fee will be <strong>$35 monthly</strong> for the basic subscription. The fee includes access to basic educational content and general market insights.
        </p>
        <p className="indent mt-2">
          Fees are to be billed to clients via either Stripe or PayPal (online payment processors) only through a secure checkout process. The firm does not deduct fees from clients' assets at any time. Clients will only be billed on a monthly basis.
        </p>
        <p className="indent mt-2">
          Fees are to be collected via either Stripe or PayPal (online payment processors) only through a secure checkout process on <a href={process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://eagle-investors.com"} className="underline text-blue-600">{process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://eagle-investors.com"}</a>.
        </p>
        <p className="indent mt-2">
          In light of CCR Section 260.238(j) - Investment Advisers: Fair, equitable and ethical principles, Eagle Investors LLC charges a fair and reasonable fee for the services provided. Lower fees for comparable services may be available from other sources. Fees are non-negotiable.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">4. Acceptance of Disclosures</h2>
        <p className="indent">
          The Client acknowledges the review and acceptance of the additional disclosures related to fiduciary duty, options and leverage trading risks, impersonal investment advice, individual financial guidance, advisor positions, paper or simulated trades, no guarantees, code of ethics and compliance as well as questions and contact information always available online at <a href={process.env.NEXT_PUBLIC_WORDPRESS_DISCLAIMER_URL || "https://eagle-investors.com/disclaimer"} className="underline text-blue-600">{process.env.NEXT_PUBLIC_WORDPRESS_DISCLAIMER_URL || "https://eagle-investors.com/disclaimer"}</a>
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">5. Form ADV Acknowledgement</h2>
        <p className="indent">
          Client acknowledges receipt of Form ADV Part 2A & 2B prior to signing this agreement; a disclosure statement containing the equivalent information; or a disclosure statement containing at least the information required by Part 2A Appendix 1 of Form ADV, if the client is entering into a wrap fee program sponsored by the investment adviser.
        </p>
        <p className="indent mt-2">
          If the appropriate disclosure statement was not delivered to the client at least 48 hours prior to the client entering into any written or oral advisory contract with this investment adviser, then the client has the right to terminate the contract without penalty within five business days after entering into the contract.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">6. Refund Policy</h2>
        <p className="indent">
          In the event of termination of this contract by either party or nonperformance by the Adviser, the Adviser shall refund to the Client a prorated portion of any prepaid fees for services not yet rendered.
        </p>
        <p className="indent mt-2">
          Processing Fees:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Stripe: 2.9% + $0.30 per transaction</li>
          <li>PayPal: 3.49% + $0.49 per transaction, plus up to an additional 2% fee on refunds</li>
        </ul>
        <p className="indent mt-2">
          Eagle Investors LLC may, at its sole discretion, waive or modify the Subscription Fee for any Subscriber.
        </p>
        <p className="indent mt-2">
          Clients are entitled to a full refund within five business days if the Form ADV was not provided 48 hours prior to signing this agreement, as per California Code of Regulation, Section 260.235.4(c).
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">7. Discretionary Authority</h2>
        <p className="indent">
          This contract does not grant discretionary authority to the Adviser or its representatives. The Client retains full control over all investment decisions and trade executions.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">8. Assignment</h2>
        <p className="indent">
          This contract may not be assigned by the Adviser without the prior written consent of the Client.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">9. Client Permission</h2>
        <p className="indent">
          The Adviser will never affect transactions for the client in the client's broker-dealer account(s).
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">10. Change in Control</h2>
        <p className="indent">
          The Adviser will inform the client of any significant changes in ownership, management, or business operations within 3 months via written communication.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">11. Conflict of Interest</h2>
        <p className="indent">
          Eagle Investors LLC follows strict ethics and compliance policies. It does not earn performance-based compensation and does not provide personalized investment advice. All investment recommendations are impersonal and general in nature.
        </p>
        <p className="indent mt-2">
          Eagle Investors LLC and Eagle Guardian Advisors LLC are affiliated but legally distinct entities under common ownership. While they share leadership—including Ishaan K. Sandhir and Maikel Den Hertog—no referral fees, commissions, or compensation arrangements exist between Eagle Investors and Eagle Guardian Advisors for client referrals or engagements.
        </p>
        <p className="indent mt-2">
          Eagle Guardian Advisors LLC is a state-registered investment adviser (RIA) that provides fiduciary portfolio management and financial planning services through a separate engagement. All advisory services involving asset management, financial planning, or fiduciary obligations are conducted solely through Eagle Guardian Advisors LLC, with custody of client assets held at independent custodians such as Charles Schwab, Interactive Brokers, or other qualified institutions.
        </p>
        <p className="indent mt-2">
          Clients referred by Eagle Investors are under no obligation to engage Eagle Guardian Advisors. Any references to estate planning professionals, tax professionals, or other third-party service providers are for educational purposes only and are entirely optional.
        </p>
        <p className="indent mt-2">
          Additionally, Ishaan K. Sandhir serves on the board of directors of 501(c)(3) nonprofit organizations that are independently operated and unaffiliated with either Eagle Investors LLC or Eagle Guardian Advisors LLC.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">12. Termination</h2>
        <p className="indent">
          This contract may be terminated at any time by either party with written notice.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">13. Governing Law</h2>
        <p className="indent">
          This contract is governed by the laws of California, Texas, Virginia, New Jersey, New York, and Indiana.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">14. Entire Agreement</h2>
        <p className="indent">
          This document constitutes the full agreement between the parties.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">15. Amendment</h2>
        <p className="indent">
          Amendments must be made in writing and signed by both parties.
        </p>
      </div>

      <div className="mt-6">
        <p>
          IN WITNESS WHEREOF, the parties have executed this contract as of the date first written above.
        </p>

        <p className="mt-4">
          Eagle Investors LLC<br />
          By: Ishaan K Sandhir<br />
          Chief Compliance Officer<br />
          Eagle Investors<br />
          Eagle Horizon Ventures
        </p>

        {!preview && signature && (
          <div className="mt-4 border-t border-slate-600 pt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <p><strong>Client:</strong> {customerName}</p>
                {email && <p><strong>Email:</strong> {email}</p>}
                <p><strong>Date:</strong> {contractDate}</p>
              </div>
              <div className="signature-container mt-4 md:mt-0">
                <p className="mb-2"><strong>Signature:</strong></p>
                <div 
                  className="signature-image border border-slate-600 p-2 rounded"
                  style={{ 
                    minHeight: '60px',
                    minWidth: '200px',
                    backgroundImage: `url(${signature})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BasicContract;
