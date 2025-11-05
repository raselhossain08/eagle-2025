import { Card, CardContent } from "@/components/ui/card"
import { Shield } from "lucide-react"

export default function CybersecurityPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-foreground">Physical Security & Cybersecurity Policy</h1>
          </div>
          <p className="text-muted-foreground mb-4">Eagle Investors LLC</p>
          <p className="text-sm text-muted-foreground">
            Always available at:{" "}
            <span className="font-mono bg-muted px-2 py-1 rounded text-foreground">
              https://eagle-investors.com/cybersecurity-policy/
            </span>
          </p>
        </div>

        {/* Content */}
        <Card className="border-border bg-card">
          <CardContent className="p-8">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="mb-6 text-muted-foreground">
                Eagle Investors LLC (Eagle) prioritizes the protection of our clients' confidential information. This
                policy establishes comprehensive physical and cybersecurity controls to:
              </p>
              <ul className="mb-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Maintain confidentiality:</strong> Restrict access to sensitive
                  data and prevent unauthorized disclosure.
                </li>
                <li>
                  <strong className="text-foreground">Preserve integrity:</strong> Ensure accuracy and completeness of
                  information, free from alteration or manipulation.
                </li>
                <li>
                  <strong className="text-foreground">Guarantee availability:</strong> Maintain continuous access to
                  essential systems and data for authorized users.
                </li>
              </ul>
              <p className="mb-8 text-muted-foreground">
                All Eagle employees, contractors, and third-party vendors must comply with this policy. A copy of this
                policy can always be found publicly at https://eagle-investors.com/cybersecurity-policy/
              </p>

              <h2 className="text-xl font-semibold text-foreground mb-4">2. Policy and Procedures</h2>

              <h3 className="text-lg font-medium text-primary mb-3">A. Risk Management</h3>
              <ul className="mb-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Threat Assessment:</strong> Eagle will conduct regular risk
                  assessments to identify, analyze, and prioritize potential threats to its information security.
                </li>
                <li>
                  <strong className="text-foreground">Vulnerability Management:</strong> Systems and applications will
                  be routinely assessed for vulnerabilities and promptly patched to address identified weaknesses.
                </li>
                <li>
                  <strong className="text-foreground">Business Continuity & Disaster Recovery (BCDR):</strong> A
                  comprehensive BCDR plan will be developed and tested to ensure timely recovery from potential
                  disruptions.
                </li>
              </ul>

              <h3 className="text-lg font-medium text-primary mb-3">B. Critical Infrastructure Protection</h3>
              <ul className="mb-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">System & Data Classification:</strong> Information assets will be
                  classified based on sensitivity level to determine appropriate security controls.
                </li>
                <li>
                  <strong className="text-foreground">Access Control:</strong> Access to critical systems and data will
                  be granted based on the principle of least privilege and monitored for suspicious activity.
                </li>
                <li>
                  <strong className="text-foreground">Network Security:</strong> Firewalls, intrusion
                  detection/prevention systems (IDS/IPS), and malware protection will be employed to safeguard network
                  resources.
                </li>
              </ul>

              <h3 className="text-lg font-medium text-primary mb-3">C. Security Event Identification</h3>
              <ul className="mb-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Log Monitoring:</strong> Logs from critical systems and devices
                  will be monitored for anomalies and suspicious activity indicative of potential security incidents.
                </li>
                <li>
                  <strong className="text-foreground">Security Information and Event Management (SIEM):</strong> A SIEM
                  solution will be implemented to aggregate and analyze security data from various sources for efficient
                  incident detection.
                </li>
                <li>
                  <strong className="text-foreground">Vulnerability Scanning:</strong> Regular vulnerability scans will
                  be conducted to identify and address potential weaknesses before attackers exploit them.
                </li>
              </ul>

              <h3 className="text-lg font-medium text-primary mb-3">D. Security Event Response</h3>
              <ul className="mb-6 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Incident Response Plan:</strong> A comprehensive incident response
                  plan will outline roles, responsibilities, and procedures for handling security incidents.
                </li>
                <li>
                  <strong className="text-foreground">Incident Reporting:</strong> All suspected security incidents must
                  be reported promptly to the designated incident response team.
                </li>
                <li>
                  <strong className="text-foreground">Incident Containment:</strong> Immediate action will be taken to
                  contain identified incidents, minimize damage, and prevent further exploitation.
                </li>
                <li>
                  <strong className="text-foreground">Investigation & Analysis:</strong> Thorough investigation will be
                  conducted to determine the cause, scope, and impact of the incident.
                </li>
                <li>
                  <strong className="text-foreground">Recovery & Remediation:</strong> Affected systems and data will be
                  restored, vulnerabilities patched, and lessons learned documented for future prevention.
                </li>
              </ul>

              <h3 className="text-lg font-medium text-primary mb-3">E. Resilience and Recovery</h3>
              <ul className="mb-8 space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-foreground">Backups & Data Archiving:</strong> Regular backups of critical
                  data will be maintained and stored securely off-site for disaster recovery purposes.
                </li>
                <li>
                  <strong className="text-foreground">System Redundancy & Failover:</strong> Critical systems will be
                  designed with redundancy and failover capabilities to ensure continuous operation in case of
                  disruptions.
                </li>
                <li>
                  <strong className="text-foreground">Testing & Drills:</strong> BCDR plans and incident response
                  procedures will be regularly tested and updated to ensure effectiveness.
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mb-4">
                3. Establishment, Implementation, Updates, and Enforcement
              </h2>

              <h3 className="text-lg font-medium text-primary mb-3">A. Establishment:</h3>
              <ul className="mb-4 space-y-2 text-muted-foreground">
                <li>This policy has been reviewed and approved by Eagle's management team.</li>
                <li>
                  The Chief Compliance Officer is always, and only if appointed, the Chief Information Security Officer
                  (CISO) is also responsible for the implementation and enforcement of this policy.
                </li>
              </ul>

              <h3 className="text-lg font-medium text-primary mb-3">B. Implementation:</h3>
              <ul className="mb-4 space-y-2 text-muted-foreground">
                <li>
                  This policy will be communicated and documented for all employees, contractors, and third-party
                  vendors.
                </li>
                <li>
                  Security awareness training will be provided to educate personnel on best practices and incident
                  reporting procedures.
                </li>
                <li>Necessary resources will be allocated to implement and maintain security controls.</li>
              </ul>

              <h3 className="text-lg font-medium text-primary mb-3">C. Updates:</h3>
              <ul className="mb-4 space-y-2 text-muted-foreground">
                <li>
                  This policy will be reviewed and updated annually, or more frequently as needed, to reflect changes in
                  technology, regulations, and threats.
                </li>
                <li>Updates will be communicated to all relevant personnel.</li>
              </ul>

              <h3 className="text-lg font-medium text-primary mb-3">D. Enforcement:</h3>
              <ul className="mb-8 space-y-2 text-muted-foreground">
                <li>
                  Non-compliance with this policy may result in disciplinary action, up to and including termination of
                  employment or contracts.
                </li>
                <li>Security incidents will be investigated, and appropriate corrective action will be taken.</li>
              </ul>

              <h2 className="text-xl font-semibold text-foreground mb-4">4. Conclusion</h2>
              <p className="text-muted-foreground">
                Eagle Investors LLC is committed to safeguarding client information through a comprehensive approach to
                physical and cybersecurity. This policy establishes a framework for continuous improvement and risk
                mitigation, ensuring the confidentiality, integrity, and availability of sensitive data. By adhering to
                this policy and fostering a culture of security awareness, Eagle can build trust and maintain its
                leading position in the financial services industry.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
