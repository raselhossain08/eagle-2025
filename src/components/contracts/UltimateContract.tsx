import React from 'react';

interface UltimateContractProps {
  customerName: string;
  contractDate: string;
  price: string;
  preview?: boolean;
  signature?: string;
  email?: string;
}

export const UltimateContract: React.FC<UltimateContractProps> = ({
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
          The Adviser will provide the following services to the Client:
        </p>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Ultimate Membership Access to Eagle Investors Discord Server</li>
          <li>Access to proprietary trading alerts and signals</li>
          <li>Access to fundamental and technical analysis</li>
          <li>Access to options flow analysis and indicators</li>
          <li>Educational content on investing strategies and market analysis</li>
          <li>Access to community forums and discussions</li>
          <li>Priority customer support</li>
          <li>Access to all community trade signals, with position sizing and clear entry/exit parameters</li>
          <li>Full access to the AI Advisory panel, which provides quantitative and fundamental analysis</li>
          <li>Access to weekly watch lists</li>
          <li>Access to Eagle's Trading Systems, a collection of proprietary trading strategies</li>
        </ul>
        <p className="indent mt-2">
          The firm does not provide individualized investment advice and does not have discretion over client funds.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">2. Term of the Contract</h2>
        <p className="indent">
          This contract shall commence on <span className="underline">{contractDate}</span> and shall continue month-to-month until terminated as provided herein. The Ultimate Membership is billed at {price} per month.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">3. Fee Schedule</h2>
        <p className="indent">
          The Client agrees to pay the Adviser {price} per month for the Ultimate Membership. Fees are billed on a recurring monthly basis through the payment processor selected by the Client.
        </p>
        <p className="indent mt-2">
          All fees are non-negotiable, in accordance with CCR Section 260.238(j).
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">4. Acceptance of Disclosures</h2>
        <p className="indent">
          The Client acknowledges the review and acceptance of the additional disclosures related to fiduciary duty, options and leverage trading risks, impersonal investment advice, individual financial guidance, advisor positions, paper or simulated trades, no guarantees, code of ethics and compliance as well as questions and contact information always available online at <a href="https://eagle-investors.com/disclaimer" className="underline text-blue-600">https://eagle-investors.com/disclaimer</a>
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
          No refunds are issued for subscription payments for services already provided. If a refund is necessary due to duplication or if the Adviser materially fails to deliver the services, a refund may be issued at the Adviser's discretion, less any payment processing fees.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">7. Discretionary Authority</h2>
        <p className="indent">
          The Adviser does not have discretionary authority over the Client's assets. The Client is solely responsible for implementing any recommendations or signals provided by the Adviser.
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
          Eagle Investors LLC and Eagle Guardian Advisors LLC are affiliated but legally distinct entities under common ownership. While they share leadership—including Ishaan K. Sandhir and Maikel Den Hertog—no referral fees, commissions, or compensation arrangements exist between the two entities for client referrals or engagements.
        </p>
        <p className="indent mt-2">
          Eagle Guardian Advisors LLC is a state-registered investment adviser (RIA) that offers fiduciary portfolio management and financial planning services under separate engagement. All such services are conducted exclusively through Eagle Guardian Advisors LLC and held in custody with independent custodians such as Charles Schwab, Interactive Brokers, or other qualified institutions.
        </p>
        <p className="indent mt-2">
          Clients referred from Eagle Investors are under no obligation to engage Eagle Guardian Advisors. Any reference to estate planners, tax professionals, or third-party providers is purely educational and optional.
        </p>
        <p className="indent mt-2">
          Ishaan K. Sandhir also serves on the board of 501(c)(3) nonprofit organizations that are fully independent and unaffiliated with Eagle Investors LLC or Eagle Guardian Advisors LLC.
        </p>
      </div>

      <div className="border-b border-slate-600 pb-4">
        <h2 className="section-title font-medium mb-2">12. Termination</h2>
        <p className="indent">
          This contract may be terminated by the Client at any time by cancelling the subscription through the Client's account on the Adviser's website. The Adviser may terminate this contract with written notice to the Client.
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
          This contract constitutes the full agreement and supersedes all prior agreements.
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

export default UltimateContract;
